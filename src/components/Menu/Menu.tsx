import React, {useContext, useState} from 'react';
import './Menu.scss';
import * as FaIcons from 'react-icons/fa';
import {IconContext} from 'react-icons';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import sideBarData from './SideBarData';
import Dropdown from "../Dropdown/Dropdown";


function Menu(props : any) {
    const [sidebar, setSidebar] = useState(false);
    const [enterSidebar, setEnterSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const handleMouseEnter = () => setEnterSidebar(true);
    const handleMouseLeave = () => setEnterSidebar(false);

    return (
        <div className="menu">
            <IconContext.Provider value={{color: '#fff'}}>
                <div className="layout">
                    <div className={(sidebar || enterSidebar) ? "navbar active" : "navbar"}>
                        <div className="navbar-left">
                            <Link to="#" className="menu-bars">
                                <FaIcons.FaBars onClick={showSidebar}/>
                            </Link>
                        </div>
                        <div className={(sidebar || enterSidebar) ? "navbar-center desactive" : "navbar-center"}>
                            <h1>CURIOUS</h1>
                        </div>
                        <div className={(sidebar || enterSidebar) ? "navbar-right desactive" : "navbar-right"}>
                            <Avatar className="navbar-avatar" name={`Usuário Comum`} round={true} size={`40`}/>
                            <p className="navbar-avatar-name">{`Usuário Comum`}</p>
                            <Dropdown><FaIcons.FaCog className="dropdown-icon"/></Dropdown>
                        </div>
                    </div>
                    <div className={(sidebar || enterSidebar) ? "layout-content active" : "layout-content"}>
                        {props.children}
                    </div>
                </div>
                <nav className={(sidebar || enterSidebar) ? 'nav-menu active' : 'nav-menu'} id="nav-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <ul className="nav-menu-items">
                        <li key={`10000`} className="nav-titulo">
                            <Link to="/">
                                <span>CURIOUS NIKO</span>
                            </Link>
                        </li>
                        {sideBarData.map((item : any, index : any) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path.replace(':company_id', props.company_id)}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    );
}

export default Menu;