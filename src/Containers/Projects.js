import React, { Component } from "react";

import Project from "../Components/Project";

class Projects extends Component {
    state = {
        projects: [
            {
                id: Math.random(),
                heading: "Snakeskin",
                description:
                    "This is an example description. It is purely for demonstration only. I've added superfluous words to make a convincing looking bit of text, any good?",
                subtasks: { total: 9, complete: 3 },
                dueDate: "30/03/20"
            },
            {
                id: Math.random(),
                heading: "Other example",
                description:
                    "This is yet another description, but this one is even longer. Oh yes, every word in this bears no use other than to illustrate what a purposeful description would look like. Imagine that, only to exist to save the place for another. Thats a miserable existence for a paragraph.",
                subtasks: { total: 20, complete: 16 },
                dueDate: "05/04/20"
            }
        ]
    };

    render() {
        return (
            <main className="container projects">
                <div>
                    <h1 className="heading heading--h1">Projects</h1>
                    <span className="projects__index">{this.state.projects.length}</span>
                </div>
            
                {this.state.projects.map(project => (
                    <Project
                        key={project.id}
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
