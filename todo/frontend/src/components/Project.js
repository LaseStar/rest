import React from "react";



const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.project_name}
            </td>
            <td>
                {project.project_link}
            </td>
            <td>
               <button onClick={()=>deleteProject(project.id)}
               type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Link
                    </th>
                    <th></th>
                </tr>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )

}

export default ProjectList
