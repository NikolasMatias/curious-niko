import React, {useState} from 'react';
import * as FaIcons from "react-icons/fa";

function Button(props : any) {
    const carregadoresPadrao = false;
    const [carregador, setCarregador] = useState(carregadoresPadrao);

    const atualizarCarregador = data => {
        setCarregador(data);
    };

    const processamento = () => {
        atualizarCarregador(true);
        console.log(typeof props.onClick);
        props.onClick().then((result) => {
            atualizarCarregador(false);
        }).catch((error) => {
            atualizarCarregador(false);
        });
    };

    const processamentoSubmit = () => {
        atualizarCarregador(true);
        props.onSubmit().then((result) => {
            atualizarCarregador(false);
        }).catch((error) => {
            atualizarCarregador(false);
        });
    };

    return (
        <>
            {props.type === 'submit' ?
                <button type={props.type} className={props.classNames+' button'} onSubmit={() => processamentoSubmit()}>
                    <FaIcons.FaSpinner  className={carregador ? 'icn-spinner' : 'esconder'}/>
                    <span className={(carregador && props.esconder) ? 'esconder' : 'conteudo'}>{props.children}</span>
                </button> :
                <button type={props.type} className={props.classNames+ ' button'} onClick={() => processamento()}>
                    <FaIcons.FaSpinner  className={carregador ? 'icn-spinner' : 'esconder'}/>
                    <span className={(carregador && props.esconder) ? 'esconder' : 'conteudo'}>{props.children}</span>
                </button>
            }
        </>
    );
}

export default Button;