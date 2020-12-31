import Router from 'react'
import '../App.css'

export const CrearNota = () => (
    <div className="login-form">
        <nav className="navbar navbar-light bg-noteapp mb-3">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Crear Nota</span>
            </div>
        </nav>
        <div className="mb-3">
            <input className="form-control" id="exampleFormControlInput1" placeholder="Título" />
        </div>
        <div className="mb-3">
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={5} defaultValue={""} placeholder="Descripción" />
        </div>
        <div className="text-right">
            <button type="button" class="btn btn-danger mx-2" data-toggle="modal">Cancelar</button>
            <button type="button" class="btn btn-info" data-toggle="modal">Crear Nota</button>
        </div>
    </div>
)