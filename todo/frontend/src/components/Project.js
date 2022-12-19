import React from "react";



const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.project_name}
            </td>
            <td>
                {project.project_link}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <th>
                Name
            </th>
            <th>
                Link
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>

    )

}

export default ProjectList
