import React from "react";
import { NavLink } from "react-router-dom";
import urls from "../../shared/urls";

const topnav = (props) => {
    return (
        <nav className="nav">
            <div className="container">
                <NavLink to={urls.projects} className="nav__head">
                    <div className="heading">{props.heading}</div>
                </NavLink>
                {props.isAuth && (
                    <i className="material-icons md-36" onClick={props.toggle}>menu</i>
                )}
            </div>
        </nav>
    );
};

export default topnav;
