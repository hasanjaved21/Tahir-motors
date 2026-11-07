import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  RotateCw, 
  Layers, 
  Volume2, 
  VolumeX, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  Gauge, 
  Cog, 
  Disc, 
  Zap,
  RotateCcw
} from 'lucide-react';
import { sound } from '../utils/audio';

type ModelType = 'gears' | 'pistons' | 'rotor';

interface ThreeHeaderProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const ThreeHeader: React.FC<ThreeHeaderProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModel, setActiveModel] = useState<ModelType>('gears');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [explodedVal, setExplodedVal] = useState<number>(0);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isHudCollapsed, setIsHudCollapsed] = useState<boolean>(false);

  // References to keep mutable state accessible inside render loop without re-triggering effects
  const stateRef = useRef({
    activeModel: 'gears' as ModelType,
    isRotating: true,
    explodedVal: 0,
    isWireframe: false,
    speedMultiplier: 1,
    targetRotationX: 0.15,
    targetRotationY: 0,
    currentRotationX: 0.15,
    currentRotationY: 0,
    isDragging: false,
    previousMouseX: 0,
    previousMouseY: 0,
  });

  // Keep stateRef in sync with React state
  useEffect(() => {
    stateRef.current.activeModel = activeModel;
  }, [activeModel]);
  useEffect(() => {
    stateRef.current.isRotating = isRotating;
  }, [isRotating]);
  useEffect(() => {
    stateRef.current.explodedVal = explodedVal;
  }, [explodedVal]);
  useEffect(() => {
    stateRef.current.speedMultiplier = speedMultiplier;
  }, [speedMultiplier]);

  // Model references to animate
  const modelsGroupRef = useRef<THREE.Group | null>(null);
  const gearsGroupRef = useRef<THREE.Group | null>(null);
  const topGearRef = useRef<THREE.Group | null>(null);
  const bottomGearRef = useRef<THREE.Group | null>(null);
  const centerPlateRef = useRef<THREE.Group | null>(null);

  const pistonsGroupRef = useRef<THREE.Group | null>(null);
  const piston1Ref = useRef<THREE.Group | null>(null);
  const piston2Ref = useRef<THREE.Group | null>(null);
  const crankRef = useRef<THREE.Group | null>(null);

  const rotorGroupRef = useRef<THREE.Group | null>(null);
  const discRef = useRef<THREE.Group | null>(null);
  const caliperRef = useRef<THREE.Group | null>(null);
  const hubRef = useRef<THREE.Group | null>(null);

  const materialsListRef = useRef<THREE.Material[]>([]);

  // Update wireframe mode across all materials
  useEffect(() => {
    stateRef.current.isWireframe = isWireframe;
    materialsListRef.current.forEach((mat) => {
      if ('wireframe' in mat) {
        (mat as THREE.MeshStandardMaterial).wireframe = isWireframe;
      }
    });
  }, [isWireframe]);

  // Build Procedural Gear Geometry with clean teeth profile
  const createGearShape = useCallback((teeth: number, outerRadius: number, innerRadius: number, rootRadius: number) => {
    const shape = new THREE.Shape();
    const angleStep = (Math.PI * 2) / teeth;
    const halfTooth = angleStep * 0.22;
    const quarterTooth = angleStep * 0.12;

    for (let i = 0; i < teeth; i++) {
      const angle = i * angleStep;
      
      const r1 = rootRadius;
      const r2 = outerRadius;
      
      const a0 = angle - halfTooth;
      const a1 = angle - quarterTooth;
      const a2 = angle + quarterTooth;
      const a3 = angle + halfTooth;
      const a4 = angle + angleStep * 0.5;

      const p0 = new THREE.Vector2(Math.cos(a0) * r1, Math.sin(a0) * r1);
      const p1 = new THREE.Vector2(Math.cos(a1) * r2, Math.sin(a1) * r2);
      const p2 = new THREE.Vector2(Math.cos(a2) * r2, Math.sin(a2) * r2);
      const p3 = new THREE.Vector2(Math.cos(a3) * r1, Math.sin(a3) * r1);
      const p4 = new THREE.Vector2(Math.cos(a4) * r1, Math.sin(a4) * r1);

      if (i === 0) {
        shape.moveTo(p0.x, p0.y);
      } else {
        shape.lineTo(p0.x, p0.y);
      }
      shape.lineTo(p1.x, p1.y);
      shape.lineTo(p2.x, p2.y);
      shape.lineTo(p3.x, p3.y);
      shape.lineTo(p4.x, p4.y);
    }
    shape.closePath();

    // Central axle hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    return shape;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Setup Scene, Camera & Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070d19, 0.045);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.3, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map (PMREM + RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Warm Key, Cool Fill, Dual Rim Lights)
    const keyLight = new THREE.DirectionalLight(0xff7700, 2.8);
    keyLight.position.set(5, 6, 4);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x00b4d8, 2.4);
    fillLight.position.set(-5, -3, 3);
    scene.add(fillLight);

    const rimLight1 = new THREE.PointLight(0x00f0ff, 3.2, 14);
    rimLight1.position.set(-4, 3, -2);
    scene.add(rimLight1);

    const rimLight2 = new THREE.PointLight(0xff5500, 3.5, 14);
    rimLight2.position.set(4, -3, -2);
    scene.add(rimLight2);

    const hemiLight = new THREE.HemisphereLight(0x0284c7, 0x1e1b4b, 0.9);
    scene.add(hemiLight);

    // Grounding contact shadow plane
    const shadowGeo = new THREE.PlaneGeometry(12, 12);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d')!;
    const grad = shadowCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.5, 'rgba(2, 6, 23, 0.35)');
    grad.addColorStop(1, 'rgba(7, 13, 25, 0)');
    shadowCtx.fillStyle = grad;
    shadowCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.3;
    scene.add(shadowPlane);

    // Track materials for wireframe toggle & disposal
    const registeredMaterials: THREE.Material[] = [];
    const registerMat = <T extends THREE.Material>(m: T): T => {
      registeredMaterials.push(m);
      return m;
    };

    // Shared High-End Automotive Materials
    const orangeAnodizedMat = registerMat(new THREE.MeshStandardMaterial({
      color: 0xff5400,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0x551100,
      emissiveIntensity: 0.3,
    }));

    const blueAnodizedMat = registerMat(new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.90,
      roughness: 0.20,
      emissive: 0x002244,
      emissiveIntensity: 0.3,
    }));

    const darkCarbonMat = registerMat(new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.65,
      roughness: 0.45,
    }));

    const chromeMat = registerMat(new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.98,
      roughness: 0.12,
    }));

    const titaniumGoldMat = registerMat(new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.92,
      roughness: 0.25,
    }));

    const rotorSteelMat = registerMat(new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.32,
    }));

    materialsListRef.current = registeredMaterials;

    // Master Group holding all procedural automotive mechanisms
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    modelsGroupRef.current = masterGroup;

    // ==========================================
    // 1. GEAR MECHANISM (Iconic Tahir Autos Logo)
    // ==========================================
    const gearsGroup = new THREE.Group();
    gearsGroupRef.current = gearsGroup;
    masterGroup.add(gearsGroup);

    // Extrude settings for high-precision bevel gears
    const extrudeSettings = {
      depth: 0.38,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    // Top Orange Gear
    const topGear = new THREE.Group();
    topGearRef.current = topGear;
    const gearShape10 = createGearShape(10, 1.45, 0.45, 1.08);
    const topGearGeo = new THREE.ExtrudeGeometry(gearShape10, extrudeSettings);
    topGearGeo.computeVertexNormals();
    const topGearMesh = new THREE.Mesh(topGearGeo, orangeAnodizedMat);
    topGearMesh.castShadow = !isSoftwareGl;
    topGearMesh.receiveShadow = !isSoftwareGl;
    topGear.add(topGearMesh);

    // Top Gear Inner Chamfer Ring & Chrome Axle Pin
    const innerRingGeo = new THREE.TorusGeometry(0.72, 0.07, 16, 48);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, titaniumGoldMat);
    innerRingMesh.position.z = 0.22;
    topGear.add(innerRingMesh);

    const axleGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.6, 32);
    axleGeo.rotateX(Math.PI / 2);
    const axleMesh = new THREE.Mesh(axleGeo, chromeMat);
    topGear.add(axleMesh);

    // Hex nut in center
    const hexNutGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.3, 6);
    hexNutGeo.rotateX(Math.PI / 2);
    const hexNutMesh = new THREE.Mesh(hexNutGeo, darkCarbonMat);
    hexNutMesh.position.z = 0.22;
    topGear.add(hexNutMesh);

    topGear.position.set(0, 0.98, 0);
    gearsGroup.add(topGear);

    // Bottom Electric Blue Gear
    const bottomGear = new THREE.Group();
    bottomGearRef.current = bottomGear;
    const bottomGearGeo = new THREE.ExtrudeGeometry(gearShape10, extrudeSettings);
    bottomGearGeo.computeVertexNormals();
    const bottomGearMesh = new THREE.Mesh(bottomGearGeo, blueAnodizedMat);
    bottomGearMesh.castShadow = !isSoftwareGl;
    bottomGearMesh.receiveShadow = !isSoftwareGl;
    bottomGear.add(bottomGearMesh);

    // Bottom inner ring
    const bottomRingMesh = new THREE.Mesh(innerRingGeo, chromeMat);
    bottomRingMesh.position.z = 0.22;
    bottomGear.add(bottomRingMesh);

    const bottomAxleMesh = new THREE.Mesh(axleGeo, chromeMat);
    bottomGear.add(bottomAxleMesh);

    const bottomHexNutMesh = new THREE.Mesh(hexNutGeo, darkCarbonMat);
    bottomHexNutMesh.position.z = 0.22;
    bottomGear.add(bottomHexNutMesh);

    bottomGear.position.set(0, -0.98, 0);
    bottomGear.rotation.z = Math.PI / 10; // offset teeth so they mesh perfectly!
    gearsGroup.add(bottomGear);

    // Center Aerodynamic Split Bar & Side Hex Bolts (Matching the uploaded logo badge!)
    const centerPlate = new THREE.Group();
    centerPlateRef.current = centerPlate;

    const barGeo = new THREE.BoxGeometry(3.6, 0.44, 0.24);
    const barMesh = new THREE.Mesh(barGeo, darkCarbonMat);
    barMesh.position.z = 0.32;
    centerPlate.add(barMesh);

    // Orange top edge line
    const orangeEdgeGeo = new THREE.BoxGeometry(3.6, 0.04, 0.26);
    const orangeEdgeMesh = new THREE.Mesh(orangeEdgeGeo, orangeAnodizedMat);
    orangeEdgeMesh.position.set(0, 0.22, 0.32);
    centerPlate.add(orangeEdgeMesh);

    // Blue bottom edge line
    const blueEdgeGeo = new THREE.BoxGeometry(3.6, 0.04, 0.26);
    const blueEdgeMesh = new THREE.Mesh(blueEdgeGeo, blueAnodizedMat);
    blueEdgeMesh.position.set(0, -0.22, 0.32);
    centerPlate.add(blueEdgeMesh);

    // Left Hex Bolt (Hex nut with inner socket)
    const leftBoltGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.28, 6);
    leftBoltGeo.rotateX(Math.PI / 2);
    const leftBolt = new THREE.Mesh(leftBoltGeo, blueAnodizedMat);
    leftBolt.position.set(-1.42, 0, 0.38);
    const leftSocketGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.32, 16);
    leftSocketGeo.rotateX(Math.PI / 2);
    const leftSocket = new THREE.Mesh(leftSocketGeo, darkCarbonMat);
    leftBolt.add(leftSocket);
    centerPlate.add(leftBolt);

    // Right Hex Bolt
    const rightBolt = new THREE.Mesh(leftBoltGeo, orangeAnodizedMat);
    rightBolt.position.set(1.42, 0, 0.38);
    const rightSocket = new THREE.Mesh(leftSocketGeo, darkCarbonMat);
    rightBolt.add(rightSocket);
    centerPlate.add(rightBolt);

    gearsGroup.add(centerPlate);

    // Ambient floating orbital particles (sparks/velocity dust in orange and cyan)
    const sparkCount = 45;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    const sparkColor = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
      const radius = 2.0 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const zOffset = (Math.random() - 0.5) * 1.8;

      sparkPos[i * 3] = Math.cos(angle) * radius;
      sparkPos[i * 3 + 1] = Math.sin(angle) * radius;
      sparkPos[i * 3 + 2] = zOffset;

      if (Math.random() > 0.5) {
        // Orange spark
        sparkColor[i * 3] = 1.0;
        sparkColor[i * 3 + 1] = 0.45;
        sparkColor[i * 3 + 2] = 0.05;
      } else {
        // Cyan-blue spark
        sparkColor[i * 3] = 0.05;
        sparkColor[i * 3 + 1] = 0.75;
        sparkColor[i * 3 + 2] = 1.0;
      }
    }

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    sparkGeo.setAttribute('color', new THREE.BufferAttribute(sparkColor, 3));

    const sparkMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const sparkParticles = new THREE.Points(sparkGeo, sparkMat);
    gearsGroup.add(sparkParticles);

    // ==========================================
    // 2. V-TWIN PERFORMANCE PISTON ASSEMBLY
    // ==========================================
    const pistonsGroup = new THREE.Group();
    pistonsGroupRef.current = pistonsGroup;
    pistonsGroup.visible = false;
    masterGroup.add(pistonsGroup);

    // Piston 1 (Left bank - Orange accented)
    const piston1 = new THREE.Group();
    piston1Ref.current = piston1;
    const pistonCrownGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.95, 32);
    const pistonCrown1 = new THREE.Mesh(pistonCrownGeo, chromeMat);
    pistonCrown1.castShadow = !isSoftwareGl;
    piston1.add(pistonCrown1);

    // Top ring (Orange combustion seal)
    const ringGeo = new THREE.TorusGeometry(0.725, 0.025, 8, 32);
    ringGeo.rotateX(Math.PI / 2);
    const ring1 = new THREE.Mesh(ringGeo, orangeAnodizedMat);
    ring1.position.y = 0.32;
    piston1.add(ring1);

    const ring1B = new THREE.Mesh(ringGeo, titaniumGoldMat);
    ring1B.position.y = 0.22;
    piston1.add(ring1B);

    // Wrist Pin & Connecting Rod 1
    const rodGeo = new THREE.CylinderGeometry(0.12, 0.16, 1.6, 16);
    const rod1 = new THREE.Mesh(rodGeo, darkCarbonMat);
    rod1.position.y = -1.1;
    piston1.add(rod1);

    const rodCapGeo = new THREE.TorusGeometry(0.24, 0.08, 12, 24);
    const rodCap1 = new THREE.Mesh(rodCapGeo, orangeAnodizedMat);
    rodCap1.position.y = -1.8;
    piston1.add(rodCap1);

    piston1.position.set(-0.9, 0.5, 0);
    piston1.rotation.z = 0.18;
    pistonsGroup.add(piston1);

    // Piston 2 (Right bank - Electric Blue accented)
    const piston2 = new THREE.Group();
    piston2Ref.current = piston2;
    const pistonCrown2 = new THREE.Mesh(pistonCrownGeo, chromeMat);
    pistonCrown2.castShadow = !isSoftwareGl;
    piston2.add(pistonCrown2);

    const ring2 = new THREE.Mesh(ringGeo, blueAnodizedMat);
    ring2.position.y = 0.32;
    piston2.add(ring2);

    const ring2B = new THREE.Mesh(ringGeo, titaniumGoldMat);
    ring2B.position.y = 0.22;
    piston2.add(ring2B);

    const rod2 = new THREE.Mesh(rodGeo, darkCarbonMat);
    rod2.position.y = -1.1;
    piston2.add(rod2);

    const rodCap2 = new THREE.Mesh(rodCapGeo, blueAnodizedMat);
    rodCap2.position.y = -1.8;
    piston2.add(rodCap2);

    piston2.position.set(0.9, -0.4, 0);
    piston2.rotation.z = -0.18;
    pistonsGroup.add(piston2);

    // Engine Crankshaft Journal & Counterweight
    const crank = new THREE.Group();
    crankRef.current = crank;
    const crankShaftGeo = new THREE.CylinderGeometry(0.32, 0.32, 2.8, 32);
    crankShaftGeo.rotateZ(Math.PI / 2);
    const crankShaftMesh = new THREE.Mesh(crankShaftGeo, chromeMat);
    crank.add(crankShaftMesh);

    const counterweightGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.3, 32, 1, false, 0, Math.PI);
    counterweightGeo.rotateZ(Math.PI / 2);
    const counterweightMesh = new THREE.Mesh(counterweightGeo, darkCarbonMat);
    counterweightMesh.position.y = -0.1;
    crank.add(counterweightMesh);

    crank.position.set(0, -1.6, 0);
    pistonsGroup.add(crank);

    // Engine Cylinder Liners / Cooling Fins (Wire & Glass structure)
    const sleeveGeo = new THREE.CylinderGeometry(0.95, 0.95, 1.8, 24, 6, true);
    const sleeve1 = new THREE.Mesh(sleeveGeo, registerMat(new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })));
    sleeve1.position.set(-0.9, 0.5, 0);
    sleeve1.rotation.z = 0.18;
    pistonsGroup.add(sleeve1);

    const sleeve2 = new THREE.Mesh(sleeveGeo, registerMat(new THREE.MeshStandardMaterial({
      color: 0xff5400,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })));
    sleeve2.position.set(0.9, 0.5, 0);
    sleeve2.rotation.z = -0.18;
    pistonsGroup.add(sleeve2);

    // ==========================================
    // 3. PERFORMANCE BRAKE ROTOR & CALIPER
    // ==========================================
    const rotorGroup = new THREE.Group();
    rotorGroupRef.current = rotorGroup;
    rotorGroup.visible = false;
    masterGroup.add(rotorGroup);

    // Drilled & Slotted Disc
    const disc = new THREE.Group();
    discRef.current = disc;

    const discPlateGeo = new THREE.CylinderGeometry(1.9, 1.9, 0.08, 64);
    discPlateGeo.rotateX(Math.PI / 2);
    const discPlate = new THREE.Mesh(discPlateGeo, rotorSteelMat);
    discPlate.castShadow = !isSoftwareGl;
    disc.add(discPlate);

    // Inner ventilation vanes
    const innerDiscGeo = new THREE.CylinderGeometry(1.9, 1.9, 0.08, 64);
    innerDiscGeo.rotateX(Math.PI / 2);
    const innerDisc = new THREE.Mesh(innerDiscGeo, rotorSteelMat);
    innerDisc.position.z = -0.16;
    disc.add(innerDisc);

    // Cross-drilled holes ring (procedural dark indent cylinders)
    const holeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 8);
    holeGeo.rotateX(Math.PI / 2);
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const r = 1.35 + (i % 3) * 0.18;
      const holeMesh = new THREE.Mesh(holeGeo, darkCarbonMat);
      holeMesh.position.set(Math.cos(angle) * r, Math.sin(angle) * r, -0.08);
      disc.add(holeMesh);
    }

    // Heat stress thermal glow ring (glowing orange track where brake pads bite)
    const heatTrackGeo = new THREE.RingGeometry(1.2, 1.78, 48);
    const heatTrackMat = registerMat(new THREE.MeshStandardMaterial({
      color: 0xff4500,
      emissive: 0xff3300,
      emissiveIntensity: 0.65,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    }));
    const heatTrack = new THREE.Mesh(heatTrackGeo, heatTrackMat);
    heatTrack.position.z = 0.045;
    disc.add(heatTrack);

    rotorGroup.add(disc);

    // Center Bell / Hat Hub with Wheel Studs
    const hub = new THREE.Group();
    hubRef.current = hub;
    const hubHatGeo = new THREE.CylinderGeometry(0.85, 0.95, 0.38, 32);
    hubHatGeo.rotateX(Math.PI / 2);
    const hubHat = new THREE.Mesh(hubHatGeo, darkCarbonMat);
    hubHat.position.z = 0.14;
    hub.add(hubHat);

    // 5 Wheel Lug Studs & Hex Lug Nuts
    const studGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.5, 12);
    studGeo.rotateX(Math.PI / 2);
    const nutGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.22, 6);
    nutGeo.rotateX(Math.PI / 2);

    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const r = 0.55;
      const stud = new THREE.Mesh(studGeo, chromeMat);
      stud.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0.25);
      const nut = new THREE.Mesh(nutGeo, titaniumGoldMat);
      nut.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0.35);
      hub.add(stud);
      hub.add(nut);
    }

    // Center axle cap
    const capGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.3, 32);
    capGeo.rotateX(Math.PI / 2);
    const cap = new THREE.Mesh(capGeo, blueAnodizedMat);
    cap.position.z = 0.35;
    hub.add(cap);

    rotorGroup.add(hub);

    // Multi-Piston Racing Brake Caliper (Electric Blue with Orange Logo)
    const caliper = new THREE.Group();
    caliperRef.current = caliper;

    const caliperBodyGeo = new THREE.BoxGeometry(1.2, 2.1, 0.72);
    const caliperBody = new THREE.Mesh(caliperBodyGeo, blueAnodizedMat);
    caliperBody.castShadow = !isSoftwareGl;
    caliper.add(caliperBody);

    // Fluid crossover pipe
    const pipeGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.5, 12);
    const pipe = new THREE.Mesh(pipeGeo, orangeAnodizedMat);
    pipe.position.set(-0.52, 0, 0.28);
    caliper.add(pipe);

    // Caliper Emblem Badge ("TAHIR" laser etched plaque)
    const badgeGeo = new THREE.BoxGeometry(0.18, 0.95, 0.04);
    const badge = new THREE.Mesh(badgeGeo, orangeAnodizedMat);
    badge.position.set(0.55, 0, 0.37);
    caliper.add(badge);

    // Caliper Bleed Screws & Mounting Brackets
    const bleedGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.3, 8);
    const bleed = new THREE.Mesh(bleedGeo, chromeMat);
    bleed.position.set(0, 1.15, 0);
    caliper.add(bleed);

    caliper.position.set(1.55, 0.35, 0);
    rotorGroup.add(caliper);

    // ==========================================
    // Interaction Handlers (Pointer Drag & Tilt)
    // ==========================================
    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.previousMouseX = e.clientX;
      stateRef.current.previousMouseY = e.clientY;
      container.style.cursor = 'grabbing';
      if (sound.enabled) {
        sound.playClick(520);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.previousMouseX;
        const deltaY = e.clientY - stateRef.current.previousMouseY;

        stateRef.current.targetRotationY += deltaX * 0.007;
        stateRef.current.targetRotationX += deltaY * 0.007;

        // Clamp vertical tilt to prevent awkward flipping
        stateRef.current.targetRotationX = Math.max(-0.85, Math.min(0.85, stateRef.current.targetRotationX));

        stateRef.current.previousMouseX = e.clientX;
        stateRef.current.previousMouseY = e.clientY;
      }
    };

    const onPointerUp = () => {
      stateRef.current.isDragging = false;
      container.style.cursor = 'grab';
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // ==========================================
    // Main Animation Loop with Software-WebGL Pacing
    // ==========================================
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const speed = delta * 1.5 * stateRef.current.speedMultiplier;

      // 1. Exponential damping for smooth camera / model rotation
      stateRef.current.currentRotationX = THREE.MathUtils.damp(
        stateRef.current.currentRotationX,
        stateRef.current.targetRotationX,
        8,
        delta
      );
      stateRef.current.currentRotationY = THREE.MathUtils.damp(
        stateRef.current.currentRotationY,
        stateRef.current.targetRotationY,
        8,
        delta
      );

      if (masterGroup) {
        masterGroup.rotation.x = stateRef.current.currentRotationX;
        masterGroup.rotation.y = stateRef.current.currentRotationY;
      }

      // Auto-rotation when enabled and user is not actively dragging
      if (stateRef.current.isRotating && !stateRef.current.isDragging) {
        stateRef.current.targetRotationY += speed * 0.45;
      }

      // 2. Active Model Animation & Exploded View Transitions
      const currentMod = stateRef.current.activeModel;
      const expl = stateRef.current.explodedVal;

      // Switch visibility smoothly
      if (gearsGroupRef.current) gearsGroupRef.current.visible = currentMod === 'gears';
      if (pistonsGroupRef.current) pistonsGroupRef.current.visible = currentMod === 'pistons';
      if (rotorGroupRef.current) rotorGroupRef.current.visible = currentMod === 'rotor';

      // Animate Gears
      if (currentMod === 'gears') {
        if (topGearRef.current && bottomGearRef.current) {
          if (stateRef.current.isRotating) {
            topGearRef.current.rotation.z += speed * 1.2;
            bottomGearRef.current.rotation.z -= speed * 1.2; // perfect mechanical counter-rotation
          }
          // Exploded view separation along Y
          topGearRef.current.position.y = 0.98 + expl * 0.9;
          bottomGearRef.current.position.y = -0.98 - expl * 0.9;
        }
        if (centerPlateRef.current) {
          centerPlateRef.current.position.z = 0.32 + expl * 1.2;
        }
        // Rotate spark particles gently
        if (sparkParticles) {
          sparkParticles.rotation.z += speed * 0.2;
        }
      }

      // Animate Pistons
      if (currentMod === 'pistons') {
        const crankAngle = elapsed * 3.5 * stateRef.current.speedMultiplier;
        if (crankRef.current) {
          crankRef.current.rotation.x = crankAngle;
        }
        if (piston1Ref.current) {
          const travel1 = Math.sin(crankAngle) * 0.42;
          piston1Ref.current.position.y = 0.5 + travel1;
          // Explode along X bank
          piston1Ref.current.position.x = -0.9 - expl * 0.8;
        }
        if (piston2Ref.current) {
          const travel2 = Math.sin(crankAngle + Math.PI) * 0.42;
          piston2Ref.current.position.y = 0.5 + travel2;
          piston2Ref.current.position.x = 0.9 + expl * 0.8;
        }
      }

      // Animate Brake Rotor
      if (currentMod === 'rotor') {
        if (discRef.current) {
          if (stateRef.current.isRotating) {
            discRef.current.rotation.z += speed * 1.8;
          }
        }
        if (caliperRef.current) {
          caliperRef.current.position.x = 1.55 + expl * 1.2;
        }
        if (hubRef.current) {
          hubRef.current.position.z = 0.14 + expl * 0.9;
        }
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }

      // Dispose Geometries and Materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
        }
      });
      registeredMaterials.forEach((m) => m.dispose());
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [createGearShape]);

  // Model switch handler
  const handleModelSelect = (model: ModelType) => {
    setActiveModel(model);
    stateRef.current.activeModel = model;
    if (sound.enabled) {
      sound.playGearRatchet(model === 'gears' ? 1 : model === 'pistons' ? 1.25 : 0.85);
    }
  };

  const handleToggleSound = () => {
    const isNowOn = sound.toggle();
    setSoundEnabled(isNowOn);
  };

  const handleResetCamera = () => {
    stateRef.current.targetRotationX = 0.15;
    stateRef.current.targetRotationY = 0;
    setExplodedVal(0);
    stateRef.current.explodedVal = 0;
    if (sound.enabled) sound.playClick(720);
  };

  return (
    <div className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] overflow-hidden bg-gradient-to-b from-[#050b14] via-[#091322] to-[#070d19] select-none">
      {/* Background Lighting Bloom Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Subtle Grid Accent */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      {/* Semantic Hero Content Overlay (Positioned gracefully above/beside canvas) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-7xl mx-auto">
        {/* Top Header Row / Kicker */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto">
          <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-full px-4 py-1.5 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
            <span className="text-xs font-semibold tracking-wide text-slate-200">
              Interactive 3D Engineering Showcase
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-sky-400 font-mono">Tahir Autos Precision Lab</span>
          </div>

          {/* Quick Sound & Reset Utility */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              title={soundEnabled ? "Mute Mechanical Audio" : "Enable Mechanical Audio"}
              className={`p-2 rounded-xl border text-xs font-medium transition-all ${
                soundEnabled 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                  : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={handleResetCamera}
              title="Reset 3D Viewport"
              className="p-2 rounded-xl border bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center / Hero Branding Title Block */}
        <div className="max-w-2xl mt-4 sm:mt-0 pointer-events-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
            Precision Automotive Care. <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-sky-400 bg-clip-text text-transparent">
              Engineered For Power.
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
            From computerized engine tuning to master transmission rebuilds and track-grade brake systems. Drag the 3D model to inspect our precision standards.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onOpenBooking('Comprehensive Diagnostic')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Schedule Service Inspection
            </button>
            <a
              href="#services"
              className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-sm transition-all flex items-center gap-2"
            >
              <Cog className="w-4 h-4 text-sky-400" />
              <span>Explore Services</span>
            </a>
          </div>
        </div>

        {/* Bottom Helper Hint */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400/80 pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-slate-800/80 font-mono text-[11px] text-slate-300">Click &amp; Drag</span>
          <span>to orbit 360° · Use dock below to explode parts &amp; change mechanical components</span>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        tabIndex={0}
        aria-label="Interactive 3D automotive engineering viewport"
      />

      {/* Sleek Collapsible Bottom Dock (Three.js Directive Compliant) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-4xl transition-all duration-300">
        {/* Toggle Collapse Pill */}
        <div className="flex justify-center mb-1.5">
          <button
            onClick={() => setIsHudCollapsed(!isHudCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/70 text-xs font-medium text-slate-300 hover:text-white shadow-lg transition-colors"
          >
            {isHudCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-orange-400" />
                <span>Show 3D Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-sky-400" />
                <span>Hide Controls</span>
              </>
            )}
          </button>
        </div>

        {/* The Glassmorphic Dock */}
        {!isHudCollapsed && (
          <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Model Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800 w-full md:w-auto">
              <button
                onClick={() => handleModelSelect('gears')}
                className={`flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeModel === 'gears'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cog className="w-3.5 h-3.5" />
                <span>Dual Gears</span>
              </button>

              <button
                onClick={() => handleModelSelect('pistons')}
                className={`flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeModel === 'pistons'
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>V-Twin Pistons</span>
              </button>

              <button
                onClick={() => handleModelSelect('rotor')}
                className={`flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeModel === 'rotor'
                    ? 'bg-gradient-to-r from-orange-500 to-sky-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Disc className="w-3.5 h-3.5" />
                <span>Brake Rotor</span>
              </button>
            </div>

            {/* Interactive Sliders and Toggles */}
            <div className="flex items-center flex-wrap gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-end">
              {/* Exploded View Slider */}
              <div className="flex items-center gap-2.5">
                <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium whitespace-nowrap">Explode:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodedVal}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setExplodedVal(val);
                    if (sound.enabled && Math.random() > 0.8) sound.playClick(440);
                  }}
                  className="w-20 sm:w-28 accent-amber-500 cursor-pointer"
                  title="Exploded Assembly View"
                />
              </div>

              {/* Speed Multiplier Pill */}
              <div className="flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <div className="flex rounded-lg bg-slate-950 border border-slate-800 p-0.5 text-[11px]">
                  {[0.5, 1, 2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        setSpeedMultiplier(spd);
                        if (sound.enabled) sound.playClick(600);
                      }}
                      className={`px-2 py-0.5 rounded font-mono ${
                        speedMultiplier === spd
                          ? 'bg-sky-500 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Rotation & Wireframe Toggles */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setIsRotating(!isRotating);
                    if (sound.enabled) sound.playClick(500);
                  }}
                  title={isRotating ? 'Pause Rotation' : 'Start Rotation'}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    isRotating
                      ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setIsWireframe(!isWireframe);
                    if (sound.enabled) sound.playClick(580);
                  }}
                  title={isWireframe ? 'Solid PBR Render' : 'Wireframe Engineering Inspection'}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    isWireframe
                      ? 'bg-orange-500/20 border-orange-500/40 text-orange-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
