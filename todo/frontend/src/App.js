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
                    <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                    <Route exact path='/todos' element={<TODOList todos={this.state.todos}/>}/>
                    <Route exact path='/login' element={<LoginForm get_token={(username, password) =>this.get_token(username, password)}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
  }

}

export default App;
