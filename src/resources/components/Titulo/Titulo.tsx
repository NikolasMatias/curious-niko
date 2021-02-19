import React from 'react';
import './Titulo.scss';

function tipoTitulo(props : any) {
    switch (props.tipo) {
        case 'classico':
            return (
                <h1 className={props.tipo}>{props.children}</h1>
            );
        case 'subtitulo':
            return (
                <h2 className={props.tipo}>{props.children}</h2>
            );
        case 'titulo-ul':
            return (
                <h3 className={props.tipo}>{props.children}</h3>
            );
        default:
            return (
                <h1 className="classico">{props.children}</h1>
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
