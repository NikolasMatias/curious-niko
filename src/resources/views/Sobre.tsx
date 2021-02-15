import React from 'react';
import '../../App.scss';
import {Helmet} from 'react-helmet';
import Titulo from '../components/Titulo/Titulo';
import Menu from '../components/Menu/Menu';

function Sobre() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Curious Niko - Sobre</title>
                <link rel="curious-niko" href="http://curious-niko.com/sobre" />
            </Helmet>
            <Menu />
            <div>
                <Titulo tipo="classico">Sobre</Titulo>
            </div>
        </>
    );
}

export default Sobre;
