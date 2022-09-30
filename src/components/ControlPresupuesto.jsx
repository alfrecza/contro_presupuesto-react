import { useState, useEffect } from "react"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, gastos,setPresupuesto, setGastos, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorsentaje] = useState(0)
    

    useEffect(() => {
        
        const totalGastado = gastos.reduce((total, gasto) => total+gasto.cantidad, 0)
        const totalDisponible = presupuesto - totalGastado
        
        //Calcular el porcentaje gastado 

        const nuevoPorcentaje  = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setTimeout(() => {
            setPorsentaje(nuevoPorcentaje)
        }, 600);

        
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        
    }, [gastos])


    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar tu presupuesto y gastos?')

        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return(
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <p>
                    <CircularProgressbar
                        value={porcentaje}
                        styles={buildStyles({
                            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6', 
                            trailColor: '#F5F5F5',
                            textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                        })}
                        text={`${porcentaje}% Gastado`}
                    >
                    </CircularProgressbar>
                </p>
            </div>
            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetApp}>
                    Resetear App
                </button>
                <p><span>Presupuesto:</span> {`${formatearCantidad(presupuesto)}`}</p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}><span>Disponible:</span> {formatearCantidad(disponible)}</p>
                <p><span>Gastado:</span> {formatearCantidad(gastado)}</p>
            </div>
        </div>
    )
}

export default ControlPresupuesto