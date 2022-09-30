import { useState } from "react"
import Mensaje from "./Mensaje"

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault()

        if(isNaN(presupuesto) || presupuesto <= 0 ) {
            setMensaje('El presupuesto ingresado no es válido')
            return
        }

        
        setIsValidPresupuesto(true)
        setMensaje('')
    }

    return (

        <div className="contenedor-presupuesto contenedor sombra">
            <form className="formulario" onSubmit={handlePresupuesto}>
                <div className="campo">
                    <label htmlFor="">Definir presupuesto</label>
                    <input type="number" className="nuevo-presupuesto" placeholder="Añade tu presupuesto" value={presupuesto} onChange={e => setPresupuesto(Number(e.target.value))}/>
                    <input type="submit" value="Añadir"/>
                    {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
                </div>
            </form>
        </div>

    )


}

export default NuevoPresupuesto