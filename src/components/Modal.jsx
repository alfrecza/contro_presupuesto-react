import { useState, useEffect } from 'react'
import cerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState(false)
    const [id, setId] = useState('')

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            const {nombre, cantidad, categoria} = gastoEditar
            setNombre(nombre)
            setCantidad(cantidad)
            setCategoria(categoria)
            setId(gastoEditar.id)
        }
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleFormulario = (e) => {
        e.preventDefault()

        if([nombre, cantidad, categoria].includes('')) {
            setMensaje(true)

            setTimeout(() => {
                setMensaje(false)
            }, 2000);
            return
        }

        guardarGasto({nombre, cantidad, categoria, id})


    }


    return(
        <div className="modal">
            <div className="cerrar-modal">
                <img src={cerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
            </div>
            <form className={`formulario ${animarModal ? "animar" : 'cerrar'}`} onSubmit={handleFormulario}>
                <legend>{Object.keys(gastoEditar).length > 0 ? 'Editar gasto' : 'Nuevo gasto'}</legend>
                
                {mensaje && <Mensaje tipo="error">Todos los campos son obligatorios</Mensaje>}

                <div className='campo'>
                    <label htmlFor="nombre">Nombre del gasto</label>
                    <input value={nombre} type="text" placeholder='Añade el nombre del gasto' onChange={e => setNombre(e.target.value)}/>
                </div>
                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input value={cantidad} type="number" placeholder='Añade la cantidad del gasto: ej.200' onChange={e => setCantidad(Number(e.target.value))}/>
                </div>
                <div className='campo'>
                    <label htmlFor="categoria">Categoría</label>
                    <select value={categoria} name="" id="categoria" onChange={e => setCategoria(e.target.value)}>
                        <option value="seleccione">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit"  value={Object.keys(gastoEditar).length > 0 ? 'Guardar cambios' : 'Añadir gasto'}/>
            </form>
        </div>

    )
}

export default Modal