import React from 'react';
import '../../App.scss';
import { Link } from 'react-router-dom';

function Curioso() {
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Erro <code>404</code>: Você tentou acessar uma página que não existe.
                </p>
                <Link to="/">
                    <a
                        className="App-link"
                        rel="noopener noreferrer">
                        Página Inicial
                    </a>
                </Link>
            </header>
        </div>
    );
}

export default Curioso;
