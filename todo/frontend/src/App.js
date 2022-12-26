//import logo from './logo.svg';
import './App.css';
import React from 'react';
import AuthorList from './components/Author.js';
import ProjectList from './components/Project.js';
import TODOList from './components/Todo.js';
import LoginForm from './components/Auth.js';
import axios from "axios";
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";
import Cookies from "universal-cookie"


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        'authors': [],
        'projects': [],
        'todos': [],
        'token': '',
    }
  }

  logout() {
        this.set_token('')
        this.setState({'authors':[]})
        this.setState({'projects':[]})
        this.setState({'todos':[]})
  }

  is_auth() {
       return !!this.state.token
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token':token}, ()=>this.load_data())
  }

  get_token_storage() {
      const cookies = new Cookies()
      const token = cookies.get('token')
      this.setState({'token':token}, () => this.load_data())
  }

  get_token(username, password) {
        const data = {username:username, password:password}
        axios.post('http://127.0.0.1:8000/api-token/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Wrong login or password'))
  }

  get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()){
            headers['Authorization'] = 'Token '+this.state.token
        }
        return headers
  }

  load_data() {

        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/authors/', {headers})
        .then(response => {
            const authors = response.data
                this.setState(
                    {
                        'authors':authors
                    }
                )

        }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            const projects = response.data
                this.setState(
                    {
                        'projects':projects
                    }
                )

        }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
        .then(response => {
            const todos = response.data
                this.setState(
                    {
                        'todos':todos
                    }
                )

        }
        ).catch(error => console.log(error))
  }

  componentDidMount() {
    this.load_data()
    }

  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers, headers}).then(response => {
        this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
    }).catch(error => console.log(error))
  }

  deleteTODO(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers, headers}).then(response => {
        this.setState({todos: this.state.todos.filter((item)=>item.id !== id)})
    }).catch(error => console.log(error))
  }

    createProject(name, project) {
        const headers = this.get_headers()
        const data = {name: name, link: link}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
            .then(response => {
                let new_book = response.data
                const author = this.state.authors.filter((item) => item.id ===
        new_project.author)[0]
            new_project.author = author
            this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))
    }

    createTodo(name, todo) {
        const headers = this.get_headers()
        const data = {name: name, link: link}
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers, headers})
            .then(response => {
                let new_book = response.data
                const author = this.state.authors.filter((item) => item.id ===
        new_todo.author)[0]
            new_project.author = author
            this.setState({todos: [...this.state.todos, new_todo]})
        }).catch(error => console.log(error))
    }

  render() {
    return (

        <div>
            <BrowserRouter>
                <nav>
                    <li>
                        <Link to='/'>Authors</Link>
                    </li>
                    <li>
                        <Link to='/projects'>Projects</Link>
                    </li>
                    <li>
                        <Link to='/todos'>ToDos</Link>
                    </li>
                    <li>
                        {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                    </li>
                </nav>
                <Routes>
                    <Route exact path='/' element={<AuthorList authors={this.state.authors}/>}/>
                    <Route exact path='/projects/create' component={() => <ProjectFrom />}/>
                    <Route exact path='/projects' component={() => <ProjectList
                    projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />} />
//                    <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                  <Route exact path='/todo/create' component={() => <TodoForm />}/>
                    <Route exact path='/todo' component={() => <TODOList
                    todos={this.state.todos} deleteTODO={(id)=>this.deleteTODO(id)} />} />
//                    <Route exact path='/todos' element={<TODOList todos={this.state.todos}/>}/>
                    <Route exact path='/login' element={<LoginForm get_token={(username, password) =>this.get_token(username, password)}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
  }

}

export default App;
