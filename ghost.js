import * as THREE from 'three';
import { PeppersGhostEffect } from 'three/addons/effects/PeppersGhostEffect.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
 
        // Se instancian las variables
        let container;
        let camera, scene, renderer, effect;
 
         //Cargar textura
         const textureLoader = new THREE.TextureLoader();
         const textura = textureLoader.load('textura.png');
 
        // Se crea un contenedor
        container = document.createElement('div');
        document.body.appendChild(container);
 
        // Render
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setAnimationLoop(animate);
        container.appendChild(renderer.domElement);
 
        // Se crea el efecto PeppersGhost
        effect = new PeppersGhostEffect(renderer);
        effect.setSize(window.innerWidth, window.innerHeight);
        effect.cameraDistance = 5;
 
        window.addEventListener('resize', onWindowResize);
 
        // Cámara
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000);
 
        // Escena
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x92c5fc);
 
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 3);
        hemiLight.color.setHSL(10, 10, 10);
        hemiLight.position.set(0, 0, 0);
        scene.add(hemiLight);
 
        // Cargar modelo FBX y aplicar textura
        const ObjRotacion = [];
        const fbxLoader = new FBXLoader();
        fbxLoader.load('chicken.fbx', (object) => {
            object.scale.set(0.03, 0.03, 0.03); // Escalar si es necesario
            object.position.set(0, -2, 0);
            scene.add(object);
            object.rotation.set(0,0,0);
            ObjRotacion.push(object);

            
             object.traverse((child) => {
                 if (child.isMesh) {
                     child.material = new THREE.MeshStandardMaterial({
                         map: textura,
                         roughness: 0.5,
                         metalness: 0.7
                     });
                }
            });
},
(xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% cargado'); },
(error) => { console.error('Error al cargar FBX:', error); });
 
    // Ajuste de pantalla
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        effect.setSize(window.innerWidth, window.innerHeight);
    }
 
    // Animaciones
    function animate() {
        ObjRotacion.forEach(object => object.rotation.y += 0.005);
        effect.render(scene, camera);
}
animate();