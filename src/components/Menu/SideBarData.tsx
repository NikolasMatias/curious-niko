import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export default [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Sobre',
        path: '/sobre',
        icon: <FaIcons.FaInfo />,
        cName: 'nav-text'
    },
    {
        title: 'Curioso',
        path: '/curioso',
        icon: <FaIcons.FaBinoculars />,
        cName: 'nav-text'
    }
];