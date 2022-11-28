//import logo from './logo.svg';
import './App.css';
import React from 'react';
import AuthorList from './components/Author.js';
import ProjectList from './components/Project.js';
import TODOList from './components/Todo.js';
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        'authors': [],
        'projects': [],
        'todos': [],
    }
  }

  componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/authors')
        .then(response => {
            const authors = response.data
                this.setState(
                    {
                        'authors':authors
                    }
                )

        }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects')
        .then(response => {
            const projects = response.data
                this.setState(
                    {
                        'projects':projects
                    }
                )

        }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo')
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

                </nav>
                <Routes>
                    <Route exact path='/' element={<AuthorList authors={this.state.authors}/>}/>
                    <Route exact path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                    <Route exact path='/todos' elements={<TODOList todos={this.state.todos}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
  }

}

export default App;
