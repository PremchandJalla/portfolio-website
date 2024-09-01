// neural-network.js

// Initialize the scene, camera, and renderer
const initNeuralNetwork = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true for transparency
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Create a geometry for nodes
    const nodeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nodes = [];

    // Generate nodes
    for (let i = 0; i < 100; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        nodes.push(node);
        scene.add(node);
    }

    // Create connections between nodes
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
    const connections = [];

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.95) { // Adjust connection density
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    nodes[i].position,
                    nodes[j].position
                ]);
                const line = new THREE.Line(geometry, lineMaterial);
                connections.push(line);
                scene.add(line);
            }
        }
    }

    // Set camera position
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        // Rotate the scene slightly for dynamic effect
        scene.rotation.x += 0.001;
        scene.rotation.y += 0.001;

        renderer.render(scene, camera);
    };

    // Handle window resize
    const onWindowResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    // Event listener for resizing
    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
};

// Initialize the neural network when the document is fully loaded
document.addEventListener('DOMContentLoaded', initNeuralNetwork);
