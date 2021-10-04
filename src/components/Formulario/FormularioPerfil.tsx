import React from 'react';
import './FormularioPerfil.scss';
import {useForm} from 'react-hook-form';
import Titulo from "../Titulo/Titulo";
import * as FaIcons from "react-icons/fa";

function FormularioPerfil(props : any) {
    return (
        <>
            <Titulo tipo="subtitulo">Selecionar Perfil</Titulo>
            <div className="formulario formulario_perfil">
                <form onSubmit={props.pesquisaPerfil.handleSubmit(props.curiousPerfil)}>
                    <input type="text" placeholder="Pesquisar Perfil" name="perfil" className={props.validacaoPerfil === 0 ? 'form-input-text' : (props.validacaoPerfil === 1 ? 'form-input-text validado' : 'form-input-text invalido')} ref={props.pesquisaPerfil.register}/>
                    <button type="submit" className="form-submit" onSubmit={props.pesquisaPerfil.handleSubmit(props.curiousPerfil)}><FaIcons.FaArrowLeft /></button>
                </form>
            </div>
        </>
    );
}

export default FormularioPerfil;
