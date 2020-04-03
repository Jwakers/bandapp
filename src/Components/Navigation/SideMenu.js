import React from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "./Hamburger";
import Backdrop from "../Modal/Backdrop";

const sideMenu = props => {
    const classes = ['side-menu']
    props.active && classes.push('side-menu--active')
    return (
        <>
            <Backdrop active={props.active} style="purple" close={props.toggle} />
            <div className={classes.join(' ')}>
                <div className="side-menu__top">
                    <div className="side-menu__head">Bandapp</div>
                    <Hamburger light click={props.toggle} />
                </div>
                <div className="side-menu__list">
                    <NavLink
                        to="/"
                        exact
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/projects"
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        Projects
                        <span className="side-menu__item__index">
                            {props.projects}
                        </span>
                    </NavLink>
                    <NavLink
                        to="/songs"
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        Songs
                    </NavLink>
                    <NavLink
                        to="/bands"
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        Bands
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        Settings
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        About
                    </NavLink>
                    <div className="side-menu__bottom">
                        <button className="button-subtle">Account</button>
                        <button className="button-subtle">Sign out</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default sideMenu;
