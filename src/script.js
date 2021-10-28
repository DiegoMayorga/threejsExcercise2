import * as THREE from '../module/three.module.js'
import { OrbitControls } from '../jsm/OrbitControls.js'
import { GUI } from '../jsm/dat.gui.module.js'
import Stats from '../jsm/stats.module.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x333333)
const lightDirectional = new THREE.DirectionalLight(0xffffff, 1)
lightDirectional.position.set(5, 5, 5)
scene.add(lightDirectional)

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const stats = Stats()
const createStats = () => {
    stats.setMode(2)
    stats.domElement.style.position = "absolute"
    stats.domElement.style.left = "100px"
    stats.domElement.style.top = "10px"
    document.getElementById("stats").appendChild(stats.domElement)
    return stats
}
document.body.appendChild(stats.dom)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener("resize", resize);

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 4
camera.position.z = 0
scene.add(camera)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 1, 1),
    new THREE.MeshPhongMaterial({
        color: 0xFFFFFF
    })
)

plane.rotation.x = -0.5 * Math.PI;
scene.add(plane)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const random = (limit) => {
    const variable = Math.floor(Math.random() * (limit)) + 1;
    return variable;
}

const mControls = new function () {
    this.addBuilding = () => {
        const height = random(15)
        const geometry = new THREE.BoxGeometry(1, height, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)
    }
}
const createDataGui = () => {
    const gui = new GUI()
    gui.add(mControls, "addBuilding")
}

const animate = () => {
    requestAnimationFrame(animate)

    stats.update()
    renderer.render(scene, camera)
}

animate()
createStats()
createDataGui()