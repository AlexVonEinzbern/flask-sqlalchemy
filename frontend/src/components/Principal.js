import { useState, useEffect } from 'react';
import '../App.css';

const URI = process.env.REACT_APP_URI;

export const Principal = () => {

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [alertError, setAlertError] = useState('')
    const [state, setState] = useState('')
    const [notas, setNotas] = useState([])

    const handleSutmit = async (e) => {

        try {
            e.preventDefault();
            const res = await fetch(`${URI}crearNotas`, {
                credentials: "include",
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo,
                    descripcion
                })
            })
            const data = await res.json();
            console.log(data);
            setState(true)
            setAlertError(false)
        } catch (error) {
            setState(true)
            setAlertError(true)
        }

    }

    const getNotas = async () => {
        const res = await fetch(`${URI}getNotas`, {credentials: "include",})
        const data = await res.json();
        setNotas(data)
    }

    useEffect(() => {
        getNotas();
    }, [])

    return (
        <div>
            <nav className="navbar navbar-light bg-noteapp">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1"><strong>Note app</strong></span>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col-4 pt-4">
                        <div >
                            <div>
                                <form className="crear-nota-form">
                                    <nav className="navbar navbar-light bg-noteapp mb-3 ">
                                        <div className="container-fluid">
                                            <span className="navbar-brand mb-0 h1"><strong>Crear Nota</strong></span>
                                        </div>
                                    </nav>
                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder="Título"
                                            onChange={e => setTitulo(e.target.value)}
                                            value={titulo}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            id="exampleFormControlTextarea1"
                                            rows={5}
                                            placeholder="Descripción"
                                            onChange={e => setDescripcion(e.target.value)}
                                            value={descripcion}
                                        />
                                    </div>
                                    <div className="text-right">

                                        <button
                                            className="btn btn-danger mx-2"
                                            type="submit"
                                            name="cancelar"
                                            value="cancelar"
                                            /*onClick={}*/>
                                            Cancelar
                                        </button>
                                        <button
                                            className="btn btn-info"
                                            type="submit"
                                            name="crear"
                                            value="crear"
                                            onClick={handleSutmit}>
                                            Crear Nota
                                        </button>
                                    </div>
                                </form>
                                {!state ? (
                                    <div></div>
                                ) : (
                                        alertError ?
                                            (<div className="pt-4">
                                                <div className="alert alertDanger">
                                                    Ha ocurrido un error
                                                <button
                                                        type="button"
                                                        className="close"
                                                        data-dismiss="alert"
                                                        aria-label="Close"
                                                        onClick={() => setState(false)}>
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                            </div>) : (
                                                <div className="pt-4">
                                                    <div className="alert alertSuccess">
                                                        Nueva nota creada
                                                    <button
                                                            type="button"
                                                            className="close"
                                                            data-dismiss="alert"
                                                            aria-label="Close"
                                                            onClick={() => setState(false)}>
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="col-8 pt-4">
                        <table className="table table-striped">
                            <thead>
                                <th>Título</th>
                                <th>Fecha</th>
                                <th>Operaciones</th>
                            </thead>
                            <tbody>
                                {notas.map(nota => (
                                    <tr>
                                        <td>{nota.titulo}</td>
                                        <td>{nota.fecha_nota}</td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}