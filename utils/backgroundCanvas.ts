import * as THREE from "three";

export const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  // resize only when necessary
  if (needResize) {
    //3rd parameter `false` to change the internal canvas size
    renderer.setSize(width, height, false);
  }
  return needResize;
};
 

export { THREE };