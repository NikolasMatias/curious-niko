import React from 'react';
import './Formulario.scss';
import {useForm} from 'react-hook-form';

function Formulario(props : any) {
    const { register, handleSubmit, errors} : {register : any, handleSubmit : any, errors : any} = useForm();

    return (
        <div className="formulario">

        </div>
    );
}

export default Formulario;
