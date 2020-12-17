import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/index"
import Hamburger from "./Hamburger";
import Backdrop from "../Modal/Backdrop";

const sideMenu = (props) => {
    const classes = ["side-menu"];
    props.active && classes.push("side-menu--active");
    return (
        <>
            <Backdrop
                active={props.active}
                theme="purple"
                close={props.toggle}
            />
            <div className={classes.join(" ")}>
                <div className="side-menu__top">
                    <div className="side-menu__head">Bandapp</div>
                    <Hamburger light click={props.toggle} />
                </div>
                <div className="side-menu__list">
                    <NavLink
                        to="/"
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
                        <NavLink
                            to="/account"
                            className="button-subtle"
                            onClick={props.toggle}
                        >
                            Account
                        </NavLink>
                        <button className="button-subtle" onClick={() => props.logout()}>Sign out</button>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(sideMenu);
