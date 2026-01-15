'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface LiquidTextProps {
  text: string;
  className?: string;
}

// Vertex shader for the liquid distortion effect
const vertexShader = `
  attribute vec2 aPosition;
  attribute vec2 aUv;
  varying vec2 vUv;
  void main() {
    vUv = aUv;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// Fragment shader for liquid distortion effect
const fragmentShader = `
  precision mediump float;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform vec2 uResolution;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    // Calculate distance from mouse position
    vec2 mousePos = uMouse;
    float dist = distance(uv, mousePos);
    
    // Liquid wave parameters
    float waveStrength = 0.03 * uHover;
    float waveFrequency = 15.0;
    float waveSpeed = 2.0;
    
    // Create ripple effect from mouse position
    float ripple = sin(dist * waveFrequency - uTime * waveSpeed) * waveStrength;
    ripple *= smoothstep(0.5, 0.0, dist); // Fade out ripple with distance
    
    // Add subtle continuous wave animation
    float wave = sin(uv.x * 10.0 + uTime * 0.5) * 0.005;
    wave += sin(uv.y * 8.0 + uTime * 0.3) * 0.003;
    
    // Apply distortion
    vec2 distortedUv = uv;
    distortedUv.x += ripple * cos(atan(uv.y - mousePos.y, uv.x - mousePos.x));
    distortedUv.y += ripple * sin(atan(uv.y - mousePos.y, uv.x - mousePos.x));
    distortedUv += wave;
    
    // Sample the texture with distorted UV
    vec4 color = texture2D(uTexture, distortedUv);
    
    gl_FragColor = color;
  }
`;

export function LiquidText({ text, className = '' }: LiquidTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const hoverRef = useRef(0);
  const targetHoverRef = useRef(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const bufferRef = useRef<WebGLBuffer | null>(null);
  const vertexShaderRef = useRef<WebGLShader | null>(null);
  const fragmentShaderRef = useRef<WebGLShader | null>(null);

  const createTextTexture = useCallback((gl: WebGLRenderingContext, text: string, width: number, height: number) => {
    // Create a canvas for rendering text
    const textCanvas = document.createElement('canvas');
    const ctx = textCanvas.getContext('2d');
    if (!ctx) return null;

    // Set canvas size with higher resolution for crisp text
    const scale = 2;
    textCanvas.width = width * scale;
    textCanvas.height = height * scale;

    // Get computed styles
    const computedStyle = getComputedStyle(document.documentElement);
    const foregroundColor = computedStyle.getPropertyValue('--foreground').trim() || '#0a0a0a';
    const heroFont = computedStyle.getPropertyValue('--hero-font').trim() || 'Nohemi, system-ui, sans-serif';

    // Clear canvas
    ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);

    // Flip the canvas vertically for WebGL coordinate system
    ctx.save();
    ctx.translate(0, textCanvas.height);
    ctx.scale(1, -1);

    // Set text properties
    const fontSize = Math.min(width * 0.18, 200) * scale;
    ctx.font = `bold ${fontSize}px ${heroFont}`;
    ctx.fillStyle = foregroundColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw text
    ctx.fillText(text, textCanvas.width / 2, textCanvas.height / 2);
    ctx.restore();

    // Create WebGL texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    return texture;
  }, []);

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl', { 
      alpha: true, 
      premultipliedAlpha: false,
      antialias: true 
    });
    if (!gl) return;

    glRef.current = gl;

    // Set canvas size
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Create shaders
    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    gl.shaderSource(vs, vertexShader);
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(vs);
    gl.compileShader(fs);

    // Check shader compilation status
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error('Vertex shader compilation failed:', gl.getShaderInfoLog(vs));
      return;
    }
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation failed:', gl.getShaderInfoLog(fs));
      return;
    }

    // Store shader refs for cleanup
    vertexShaderRef.current = vs;
    fragmentShaderRef.current = fs;

    // Create program
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    // Check program linking status
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);
    programRef.current = program;

    // Create geometry (full screen quad)
    const vertices = new Float32Array([
      -1, -1, 0, 0,
       1, -1, 1, 0,
      -1,  1, 0, 1,
       1,  1, 1, 1,
    ]);

    const buffer = gl.createBuffer();
    bufferRef.current = buffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'aPosition');
    const uvLoc = gl.getAttribLocation(program, 'aUv');

    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 16, 8);

    // Enable transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Create text texture
    textureRef.current = createTextTexture(gl, text, rect.width, rect.height);
  }, [text, createTextTexture]);

  const render = useCallback(() => {
    const gl = glRef.current;
    const program = programRef.current;
    if (!gl || !program) return;

    // Smooth mouse movement
    mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
    mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;
    hoverRef.current += (targetHoverRef.current - hoverRef.current) * 0.05;

    // Clear with transparent background
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Update uniforms
    const timeLoc = gl.getUniformLocation(program, 'uTime');
    const mouseLoc = gl.getUniformLocation(program, 'uMouse');
    const hoverLoc = gl.getUniformLocation(program, 'uHover');
    const textureLoc = gl.getUniformLocation(program, 'uTexture');
    const resolutionLoc = gl.getUniformLocation(program, 'uResolution');

    gl.uniform1f(timeLoc, performance.now() * 0.001);
    gl.uniform2f(mouseLoc, mouseRef.current.x, 1.0 - mouseRef.current.y);
    gl.uniform1f(hoverLoc, hoverRef.current);
    gl.uniform1i(textureLoc, 0);
    if (canvasRef.current) {
      gl.uniform2f(resolutionLoc, canvasRef.current.width, canvasRef.current.height);
    }

    // Bind texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureRef.current);

    // Draw
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    animationRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    initWebGL();
    animationRef.current = requestAnimationFrame(render);

    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const gl = glRef.current;
      if (!canvas || !container || !gl) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);

      // Recreate text texture with new size
      textureRef.current = createTextTexture(gl, text, rect.width, rect.height);
    };

    // Watch for theme changes via data-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          // Theme changed, recreate texture with new colors
          const gl = glRef.current;
          const container = containerRef.current;
          if (gl && container) {
            const rect = container.getBoundingClientRect();
            textureRef.current = createTextTexture(gl, text, rect.width, rect.height);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clean up WebGL resources to prevent memory leaks
      const gl = glRef.current;
      if (gl) {
        if (textureRef.current) {
          gl.deleteTexture(textureRef.current);
          textureRef.current = null;
        }
        if (bufferRef.current) {
          gl.deleteBuffer(bufferRef.current);
          bufferRef.current = null;
        }
        if (programRef.current) {
          gl.deleteProgram(programRef.current);
          programRef.current = null;
        }
        if (vertexShaderRef.current) {
          gl.deleteShader(vertexShaderRef.current);
          vertexShaderRef.current = null;
        }
        if (fragmentShaderRef.current) {
          gl.deleteShader(fragmentShaderRef.current);
          fragmentShaderRef.current = null;
        }
      }
    };
  }, [initWebGL, render, createTextTexture, text]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    targetMouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    targetHoverRef.current = 1;
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetHoverRef.current = 0;
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </motion.div>
  );
}
