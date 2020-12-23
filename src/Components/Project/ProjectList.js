import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProjectPreview from "../Project/ProjectPreview";
import Placeholder from "../Message/Placeholder";
import addIcon from "../../assets/icons/add.svg";

import urls from "../../shared/urls";
import filterIcon from "../../assets/icons/filter.svg";
import { render } from "@testing-library/react";
import { objectStatus } from "../../shared/strings";

class ProjectList extends Component {
    state = {
        projects: [],
        heading: this.props.heading,
        defaultFilter: this.props.filterType ? this.props.filterType : null,
        defaultValue: this.props.filterValue ? this.props.filterValue : null,
        showFilters: false,
    };

    componentDidMount() {
        if (this.state.defaultFilter && this.state.defaultValue)
            this.handleProjectFilters(
                null,
                this.state.defaultFilter,
                this.state.defaultValue
            );
    }

    handleProjectFilters = (event, filterType, filterValue) => {
        filterValue = event ? event.target.value : filterValue;
        if (filterValue === 'null') return this.setState({ projects: this.props.projects });
        let collection = this.props.projects.filter((el) => el[filterType] === filterValue);
        this.setState({ projects: [...collection] });
    };

    toggleFilterMenu = () => {
        this.setState((prevState) => ({showFilters: !prevState.showFilters}))        
    }

    render() {
        if (this.props.projects.length === 0)
            return (
                <Placeholder
                    heading="Looks like you have no projects"
                    icon={addIcon}
                    modifier="placeholder-message--center"
                />
            );
        if (this.props.projects.loading) return <div className="spinner"></div>;
        return (
            <>
                <div className="projects">
                    <div className="projects__head">
                        <h1 className="projects__head__title heading heading--h1">
                            {this.state.heading}
                        </h1>
                        <span className="projects__head__index">
                            {this.state.projects.length}
                        </span>
                        <div
                            onClick={this.toggleFilterMenu}
                            className="projects__head__filter"
                        >
                            <img src={filterIcon} alt="filter" />
                        </div>
                    </div>
                    {this.state.showFilters && 
                        <select className="form__select" onChange={(event) => this.handleProjectFilters(event, 'locationId')}>
                            <option value="null">All projects</option>
                            <option value={this.props.userId}>My projects</option>
                            {Object.entries(this.props.bands).map((band) => {
                                const [key, bandName] = [band[0], band[1].bandName];
                                return (
                                    <option key={key} value={key}>
                                        {bandName}
                                    </option>
                                );
                            })}
                        </select>
                    }
                    {this.state.projects.map((project) => (
                        <Link
                            to={`${urls.projects}/${project.id}`}
                            key={project.id}
                        >
                            <ProjectPreview
                                id={project.id}
                                heading={project.heading}
                                description={project.description}
                                dueDate={project.dueDate}
                            />
                        </Link>
                    ))}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projects: Object.entries(state.projects.projects).map(project => {
            const [key, val] = [...project]
            return {
                ...val,
                id: key
            }
        }),
        loading: state.projects.loading,
        bands: state.bands.bands,
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps)(ProjectList);
