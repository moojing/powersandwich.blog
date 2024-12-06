import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  onScroll?: () => void; // 可選的 onScroll 回調函數
};

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

const StarBackground: React.FC<Props> = ({ onScroll }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const speedRef = useRef(0.05);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 初始化 renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setClearColor(new THREE.Color("#171717"));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 初始化 scene 和 camera
    const scene = new THREE.Scene();
    const fov = 75,
      aspect = window.innerWidth / window.innerHeight,
      near = 0.1,
      far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    // 添加光源
    const light = new THREE.AmbientLight(0xffffff, 2);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    scene.add(pointLight);

    // 加載材質
    const textureLoader = new THREE.TextureLoader();
    const dotTexture = textureLoader.load("/dot.svg");

    // 創建粒子
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const vertices = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      vertices[i * 3] = (Math.random() - 0.5) * 20; // X 軸
      vertices[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y 軸
      vertices[i * 3 + 2] = (Math.random() - 0.5) * 50; // Z 軸
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

    // 調整窗口大小
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // 動畫邏輯
    let currentSpeed = 0.01;

    const layoutContent = document.getElementById("layout-container");
    let idleTimer: ReturnType<typeof setTimeout>;

    layoutContent?.addEventListener(
      "scroll",
      throttle(() => {
        console.log("scroll detected");

        // 滾動時減速
        if (speedRef.current !== 0.0005) {
          speedRef.current = 0.0005;
        }

        // 滾動停止後恢復正常速度
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          if (speedRef.current !== 0.05) {
            speedRef.current = 0.05;
          }
        }, 3000); // 3 秒無滾動後恢復
      }, 100), // 每 100ms 觸發一次
    );

    const animate = () => {
      currentSpeed += (speedRef.current - currentSpeed) * 0.1;

      if (Math.abs(speedRef.current - currentSpeed) < 0.00001) {
        console.log("currentSpeed :", currentSpeed);
        console.log("particleSpeed :", speedRef.current);
        console.log("Math.abs(particleSpeed - currentSpeed) :", Math.abs(speedRef.current - currentSpeed));
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
    console.log("animate :", animate);
    if (canvasRef.current) {
      canvasRef.current.style.opacity = "1";
    }

    // 清理函數
    return () => {
      window.removeEventListener("resize", handleResize);
      layoutContent?.removeEventListener("scroll", () => {});
      clearTimeout(idleTimer);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []); // particleSpeed 為依賴，用於控制速度

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
