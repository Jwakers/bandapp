import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions/index";
import Hamburger from "./Hamburger";
import Backdrop from "../Modal/Backdrop";
import urls from "../../shared/urls";

const sideMenu = (props) => {
    const classes = ["side-menu"];
    props.active && classes.push("side-menu--active");

    let bandLinks = null;
    if (props.bands.length) {
        bandLinks = (
            <>
                <div className="side-menu__item side-menu__item--sub">
                    Bands
                </div>
                {props.bands.map((band) => (
                    <NavLink
                        key={band.id}
                        to={`${urls.bands}/${band.id}`}
                        className="side-menu__item side-menu__item--subitem"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        {band.bandName}
                    </NavLink>
                ))}
            </>
        );
    }
    return (
        <>
            <Backdrop
                active={props.active}
                theme="purple"
                close={props.toggle}
            />
            <div className={classes.join(" ")}>
                <div className="side-menu__top">
                    <NavLink
                        to={urls.account}
                        onClick={props.toggle}
                        className="side-menu__head"
                    >
                        <img
                            className="profile-image"
                            src={props.profileImage}
                            alt=""
                        />
                        <span>{props.username}</span>
                    </NavLink>
                    <Hamburger
                        classes={["hamburger--light"]}
                        click={props.toggle}
                    />
                </div>
                <div className="side-menu__list">
                    <NavLink
                        to={urls.projects}
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        Projects
                        <span className="side-menu__item__index">
                            {props.projects}
                        </span>
                    </NavLink>
                    {bandLinks && bandLinks}
                    <NavLink
                        to={urls.createBand}
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        Create Band
                    </NavLink>
                    <NavLink
                        to={urls.home}
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        Songs
                    </NavLink>
                    <NavLink
                        to={urls.home}
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        Settings
                    </NavLink>
                    <NavLink
                        to={urls.home}
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        About
                    </NavLink>
                    <NavLink
                        to={urls.projectArchive}
                        className="side-menu__item"
                        activeClassName="side-menu__item--active"
                        onClick={props.toggle}
                    >
                        Archive
                    </NavLink>
                    <div className="side-menu__bottom">
                        <NavLink
                            to={urls.account}
                            className="button-subtle"
                            onClick={props.toggle}
                        >
                            Account
                        </NavLink>
                        <button
                            className="button-subtle"
                            onClick={() => {
                                props.handleSignOut();
                                props.toggle();
                            }}
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        username: state.user.user.username,
        profileImage: state.user.user.profileImage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleSignOut: () => dispatch(actions.authSignOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(sideMenu);
