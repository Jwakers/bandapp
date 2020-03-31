import React, { Component } from "react";

import Project from "../../Components/Project/Project";

class Projects extends Component {
    state = {
        projects: [
            {
                heading: "Snakeskin",
                description:
                    "This is an example description. It is purely for instruction only and adding superfluous words to make a convincing looking bit of text, any good?",
                subtasks: { total: 9, complete: 3 },
                dueDate: "30/03/20"
            }
        ]
    };

    render() {
        return (
            <main className="container">
                {this.state.projects.map(project => (
                    <Project
                        heading={project.heading}
                        description={project.description}
                        subtasks={project.subtasks}
                        dueDate={project.dueDate}
                    />
                ))}
            </main>
        );
    }
}

export default Projects;
