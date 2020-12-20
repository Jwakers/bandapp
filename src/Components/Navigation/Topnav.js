import React from "react";
import  { NavLink } from "react-router-dom";
import urls from "../../shared/urls";

import Hamburger from "./Hamburger";

const topnav = (props) => {
    return (
        <nav className="nav">
            <div className="container">
                <NavLink to={urls.projects} className="nav__head">
                    <div className="heading">{props.heading}</div>
                </NavLink>
                {props.isAuth && (
                    <Hamburger open="false" click={props.toggle} />
                )}
            </div>
        </nav>
    );
};

export default topnav;
