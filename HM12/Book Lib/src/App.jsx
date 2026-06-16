import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import BookDetails from './pages/BookDetails'
import Categories from './pages/Categories'
import CategoryBooks from './pages/CategoryBooks'

function ShaderBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return

    const resize = () => {
      const w = canvas.clientWidth || 1280
      const h = canvas.clientHeight || 720
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h }
    }
    resize()
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(canvas)

    const vs = `attribute vec2 a_position;varying vec2 v_texCoord;void main(){v_texCoord=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`
    const fs = `precision highp float;varying vec2 v_texCoord;uniform float u_time;uniform vec2 u_resolution;void main(){vec2 uv=v_texCoord;vec3 bg=vec3(0.051,0.067,0.09);vec3 glow=vec3(0.345,0.651,1.0);vec2 c=vec2(0.5+0.2*sin(u_time*0.5),0.5+0.2*cos(u_time*0.4));float d=distance(uv,c);float g=smoothstep(0.8,0.0,d);float p=0.5+0.5*sin(uv.x*10.0+u_time)*cos(uv.y*10.0-u_time*0.7);g*=(0.8+0.2*p);gl_FragColor=vec4(mix(bg,glow,g*0.2),1.0);}`

    const prog = gl.createProgram()
    const addS = (t, s) => { const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh); gl.attachShader(prog, sh) }
    addS(gl.VERTEX_SHADER, vs); addS(gl.FRAGMENT_SHADER, fs)
    gl.linkProgram(prog); gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uRes = gl.getUniformLocation(prog, 'u_resolution')

    let id
    const render = (t) => {
      if (typeof ResizeObserver === 'undefined') resize()
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (uTime) gl.uniform1f(uTime, t * 0.001)
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      id = requestAnimationFrame(render)
    }
    id = requestAnimationFrame(render)
    return () => cancelAnimationFrame(id)
  }, [])

  return <canvas ref={canvasRef} className="fixed-top w-100 h-100" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      <ShaderBackground />
      <div className="position-relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main style={{ paddingTop: '64px' }} className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryBooks />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
