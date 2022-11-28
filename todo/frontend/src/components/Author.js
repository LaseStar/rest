import React from "react";



const AuthorItem = ({author}) => {
    return (
        <tr>
            <td>
                {author.user_name}
            </td>
            <td>
                {author.first_name}
            </td>
            <td>
                {author.last_name}
            </td>
            <td>
                {author.email}
            </td>
        </tr>
    )
}

const AuthorList = ({authors}) => {
    return (
        <table>
            <th>
                User name
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
             <th>
                Email
            </th>
            {authors.map((author) => <AuthorItem author={author} />)}
        </table>

    )

}

export default AuthorList