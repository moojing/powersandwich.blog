import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function throttle(func: Function, limit: number) {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
}

const StarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speedRef = useRef(0.05); // initial speed

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // initialize renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setClearColor(new THREE.Color("#171717"));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // initialize scene and camera
    const scene = new THREE.Scene();
    const fov = 75,
      aspect = window.innerWidth / window.innerHeight,
      near = 0.1,
      far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    // add light
    const light = new THREE.AmbientLight(0xffffff, 2);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    scene.add(pointLight);

    // load texture
    const textureLoader = new THREE.TextureLoader();
    const dotTexture = textureLoader.load("/dot.svg");

    // create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const vertices = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      vertices[i * 3] = (Math.random() - 0.5) * 20; // X axis
      vertices[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y axis
      vertices[i * 3 + 2] = (Math.random() - 0.5) * 50; // Z axis
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      map: dotTexture,
      size: 0.05,
      color: "#fff",
      transparent: true,
      depthWrite: false,
    });

    const stars = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(stars);

    // adjust window size
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // animation logic
    let currentSpeed = 0.01;
    let idleTimer: ReturnType<typeof setTimeout>;

    // mouse move trigger deceleration
    const handleMouseMove = throttle(() => {
      console.log("mouse moved");

      // deceleration
      if (speedRef.current !== 0.0005) {
        speedRef.current = 0.0005;
      }

      // stop moving restore speed
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (speedRef.current !== 0.05) {
          speedRef.current = 0.05;
        }
      }, 30000); // 30 seconds without movement
    }, 100); // trigger every 100ms

    window.addEventListener("mousemove", handleMouseMove);
    const layoutContainer = document.getElementById("layout-container");
    layoutContainer?.addEventListener("scroll", handleMouseMove);

    const animate = () => {
      currentSpeed += (speedRef.current - currentSpeed) * 0.1;

      if (Math.abs(speedRef.current - currentSpeed) < 0.00001) {
        currentSpeed = speedRef.current;
      }

      const positions = particlesGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] += currentSpeed;
        if (positions[i * 3 + 2] > 25) {
          positions[i * 3 + 2] = -25;
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    if (canvasRef.current) {
      canvasRef.current.style.opacity = "1";
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimer);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "absolute",
        inset: 0,
        zIndex: -1,
        width: "100%",
        height: "100vh",
        opacity: 0,
        transition: "opacity 1500ms ease-out",
      }}
    ></canvas>
  );
};

export default StarBackground;
