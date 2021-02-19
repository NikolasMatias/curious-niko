import React from 'react';
import './Descricao.scss';

function Descricao(props : any) {
    return (
        <div className="descricao">
            <div className="conteudo">
                {props.children}
            </div>
        </div>
    );
}

export default Descricao;
