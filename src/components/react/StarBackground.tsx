import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  onScroll?: () => void; // 可選的 onScroll 回調函數
};

const StarBackground: React.FC<Props> = ({ onScroll }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollIdle, setScrollIdle] = useState(false);
  console.log("scrollIdle :", scrollIdle);

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
    const particleCount = 1000;
    const vertices = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      vertices[i * 3] = (Math.random() - 0.5) * 20;
      vertices[i * 3 + 1] = (Math.random() - 0.5) * 20;
      vertices[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      map: dotTexture,
      size: 0.2,
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
    const animate = () => {
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] += scrollIdle ? 0.005 : 0.05;
        if (positions[i * 3 + 2] > 25) {
          positions[i * 3 + 2] = -25;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate(); // 啟動動畫
    if (canvasRef.current) {
      canvasRef.current.style.opacity = "1";
    }

    // 處理滾動事件
    const layoutContent = document.getElementById("layout-container");
    let debounceTimer: ReturnType<typeof setTimeout>;
    let idleTimer: ReturnType<typeof setTimeout>;

    layoutContent?.addEventListener("scroll", () => {
      clearTimeout(debounceTimer);
      clearTimeout(idleTimer);

      debounceTimer = setTimeout(() => {
        setScrollIdle(false);
      }, 100);

      idleTimer = setTimeout(() => {
        setScrollIdle(true);
      }, 3000);
    });

    // 清理函數
    return () => {
      window.removeEventListener("resize", handleResize);
      layoutContent?.removeEventListener("scroll", () => {});
      clearTimeout(debounceTimer);
      clearTimeout(idleTimer);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [scrollIdle]); // scrollIdle 被加入依賴，用於控制動畫速度

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
        filter: "blur(4px)",
      }}
    ></canvas>
  );
};

export default StarBackground;
