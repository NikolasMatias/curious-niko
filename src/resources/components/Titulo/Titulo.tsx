import React from 'react';
import './Titulo.scss';
import { Link } from 'react-router-dom';

function tipoTitulo(props : any) {
    switch (props.tipo) {
        case 'classico':
            return (
                <h1 className="classico">{props.children}</h1>
            );
        case 'subtitulo':
            return (
                <h2>{props.children}</h2>
            );
        default:
            return (
                <h1>{props.children}</h1>
            )
    }
}

function Titulo(props : any) {
    return (
        <div className="titulo">
            {tipoTitulo(props)}
        </div>
    );
}

export default Titulo;
