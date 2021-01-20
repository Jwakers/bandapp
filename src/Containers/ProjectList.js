import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProjectPreview from "../Components/Project/ProjectPreview";
import Placeholder from "../Components/Message/Placeholder";

import urls from "../shared/urls";

class ProjectList extends PureComponent {
    state = {
        projects: this.props.projects,
        defaultFilter: this.props.filterType ? this.props.filterType : null,
        defaultValue: this.props.filterValue ? this.props.filterValue : null,
        showFilters: false,
    };

    componentDidMount() {
        this.handleProjectFilters(
            null,
            this.state.defaultFilter,
            this.state.defaultValue,
            this.props.heading
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.filterValue !== prevProps.filterValue) {
            this.handleProjectFilters(
                null,
                this.props.filterType,
                this.props.filterValue,
                this.props.heading
            );
        }
        if (this.props.projects !== prevProps.projects) {
            this.handleProjectFilters(
                null,
                this.state.defaultFilter,
                this.state.defaultValue,
                this.props.heading
            );
        }
    }

    handleProjectFilters = (event, filterType, filterValue, heading) => {
        filterValue = event ? event.target.value : filterValue;
        if (filterValue === "null" || !filterValue) {
            return this.setState({
                projects: [...this.props.projects],
                heading: "All projects",
            });
        }
        let collection = this.props.projects.filter(
            (el) => el[filterType] === filterValue
        );
        this.setState({
            projects: [...collection],
            heading: heading
                ? heading
                : event.target.selectedOptions[0].innerText,
        });
    };

    toggleFilterMenu = () => {
        this.setState((prevState) => ({ showFilters: !prevState.showFilters }));
    };

    render() {
        if (this.props.projects.length === 0)
            return (
                <Placeholder
                    heading="Looks like you have no projects"
                    icon={<i className="material-icons">library_add</i>}
                    modifier="placeholder-message--center"
                />
            );
        if (this.props.loading) return <div className="spinner"></div>;
        return (
            <>
                <div className="projects">
                    <div className="projects__head">
                        <h1 className="projects__head__title heading heading--h1" onClick={this.toggleFilterMenu}>
                            {this.state.heading}
                        </h1>
                        <span className="projects__head__index">
                            {this.state.projects.length}
                        </span>
                        {this.props.canFilter && (
                            <div
                                onClick={this.toggleFilterMenu}
                                className="projects__head__filter"
                            >
                                <i className="material-icons">filter_list</i>
                            </div>
                        )}
                    </div>
                    {this.state.showFilters && this.props.canFilter && (
                        <select
                            className="form__select"
                            onChange={(event) =>
                                this.handleProjectFilters(event, "locationId")
                            }
                        >
                            <option value="null">All projects</option>
                            <option value={this.props.userId}>
                                My projects
                            </option>
                            {Object.entries(this.props.bands).map((band) => {
                                const [key, bandName] = [
                                    band[0],
                                    band[1].bandName,
                                ];
                                return (
                                    <option key={key} value={key}>
                                        {bandName} projects
                                    </option>
                                );
                            })}
                        </select>
                    )}
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
        projects: Object.entries(state.projects.projects).map((project) => {
            const [key, val] = [...project];
            return {
                ...val,
                id: key,
            };
        }),
        loading: state.projects.loading,
        bands: state.bands.bands,
        userId: state.auth.userId,
    };
};

export default connect(mapStateToProps)(ProjectList);
