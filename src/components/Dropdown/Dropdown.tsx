import React, {useContext, useState} from 'react';
import "./Dropdown.scss";
import * as FaIcons from "react-icons/fa";
import {Link, useHistory} from "react-router-dom";

export default function Dropdown(props) {
    let history = useHistory();
    let [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className="dropdown">
            <Link to="#" className="dropbtn" onClick={showSidebar}>
                {props.children}
            </Link>
            <div className={sidebar ? "dropdown-content active" : "dropdown-content"}>
                <Link to="/auth/profile" className="dropdown-item">Perfil</Link>
            </div>
        </div>
    );
}