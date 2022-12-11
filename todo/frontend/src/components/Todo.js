import React from "react";



const TODOItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.todo_text}
            </td>
            <td>
                {todo.todo_data_create}
            </td>
            <td>
                {todo.todo_data_update}
            </td>
            <td>
                {todo.todo_close}
            </td>
            <td>
                {todo.todo_project.project_name}
            </td>
            <td>
                {todo.todo_authors.user_name}
            </td>
        </tr>
    )
}

const TODOList = ({todos}) => {
    return (
        <table>
            <th>
                Id
            </th>
            <th>
                Text
            </th>
            <th>
                Data create
            </th>
             <th>
                Data update
            </th>
             <th>
                Close
            </th>
             <th>
                Project
            </th>
             <th>
                Authors
            </th>

            {todos.map((todo) => <TODOItem todo={todo} />)}
        </table>

    )

}

export default TODOList