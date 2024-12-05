import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  onScroll?: () => void; // 可選的 onScroll 回調函數
};

const StarBackground: React.FC<Props> = ({ onScroll }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    console.log("useEffect");
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setClearColor(new THREE.Color("#171717"));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();

    // 相機設置
    const fov = 75,
      aspect = window.innerWidth / window.innerHeight,
      near = 0.1,
      far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    // 添加光照
    const light = new THREE.AmbientLight(0xffffff, 2);
    scene.add(light);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    scene.add(pointLight);

    // 粒子設置
    const textureLoader = new THREE.TextureLoader();
    const dotTexture = textureLoader.load("/dot.svg");

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;

    const vertices = new Float32Array(particleCount * 3); // 每個粒子需要 x, y, z 三個座標
    for (let i = 0; i < particleCount; i++) {
      vertices[i * 3] = (Math.random() - 0.5) * 20; // X 座標
      vertices[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y 座標
      vertices[i * 3 + 2] = (Math.random() - 0.5) * 50; // Z 座標，分布在 -25 到 25 之間
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      map: dotTexture,
      size: 0.2,
      transparent: true,
      depthWrite: false, // 避免深度測試讓粒子被遮擋
    });

    const stars = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(stars);

    const animate = () => {
      console.log("animate :", animate);
      const positions = particlesGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 2] += 0.05; // 調整移動速度

        if (positions[i * 3 + 2] > 25) {
          positions[i * 3 + 2] = -25; // 重置 Z 座標到初始範圍
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true; // 告訴 Three.js 更新粒子位置

      if (rendererRef.current) {
        rendererRef.current.render(scene, camera);
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", handleResize);

    if (canvasRef?.current?.style.opacity) {
      canvasRef.current.style.opacity = "1";
    }
    // 清理函數
    return () => {
      window.removeEventListener("resize", handleResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="background-canvas"
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
