import React from "react";



const TODOItem = ({todo, deleteTODO}) => {
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
            <td>
               <button onClick={()=>deleteTODO(todo.id)}
               type='button'>Delete</button>
            </td>
        </tr>
    )
}

const TODOList = ({todos, deleteTODO}) => {
    return (
        <div>
            <table>
                <tr>
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
                    <th></th>
                </tr>
                {todos.map((todo) => <TODOItem todo={todo} deleteTODO={deleteTODO}/>)}
            </table>
            <Link to='/todo/create'>Create</Link>
        </div>

    )

}

export default TODOList