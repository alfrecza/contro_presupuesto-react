import { useState, useEffect } from "react"
import Header from "./components/Header"
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from "./components/Modal"
import ListadoGastos from "./components/ListadoGastos"
import Filtros from "./components/Filtros"

function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto' ?? 0))) 
  const [isValidPresupuesto, setIsValidPresupuesto] =useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')

  const [gastosFiltrados, setGastosFiltrados] = useState([])

  const fecha = Date.now()

  const generarId = () => {
    const timeCurrent =Date.now().toString(36);
    const numberRandom = (Math.random()).toString(36).slice(2)

    return timeCurrent + numberRandom
  }


  useEffect(()=> {

    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
    

      setTimeout(() => {
          setAnimarModal(true)
      }, 400);
    }

  },[gastoEditar])

  useEffect(() => {

    localStorage.setItem('presupuesto', presupuesto ?? 0)

  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])


  useEffect(() => {
    if(presupuesto > 0) {
      setIsValidPresupuesto(true)
      return
    }
  }, [])

  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)

      setGastosFiltrados(gastosFiltrados)     
    }

  }, [filtro])
  
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
        setAnimarModal(true)
    }, 400);
  }

  const guardarGasto = gasto => {

    if(gasto.id) {
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      gasto.fecha = formatearFecha(fecha)
      setGastoEditar({})
      setGastos(gastosActualizados)
      gasto.editado = true
    }else {
      gasto.id = generarId()

      gasto.fecha = formatearFecha(fecha)
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 400);
  }

  const eliminarGasto = (id) => {
      const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

      setGastos(gastosActualizados)
  }

  const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones)
  }
  
  return (
    <div className={modal ? 'fijar' : ''}>
        <Header
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
        gastos = {gastos}
        setGastos={setGastos}
        
        />

    {isValidPresupuesto && 
      <>
        <main>
          <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
            />
          <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}
          gastosFiltrados= {gastosFiltrados} filtro={filtro}/>
        </main>

        <div className="nuevo-gasto">
          <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto}/>
        </div>
      </>}
    {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto ={guardarGasto} gastoEditar={gastoEditar} setGastoEditar= {setGastoEditar}/>}
    </div>
    
  )
}

export default App
