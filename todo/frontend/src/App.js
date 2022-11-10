import logo from './logo.svg';
import './App.css';
import React from 'react'
import AuthorList from './components/Author.js'
import axios from 'axios'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        'authors': []
    }
  }

  componentDidMount() {
        axios.get(url: 'http://127.0.0.1:8000/api/authors/').then(response => {
            this.setState(
                state:{
                    'authors':response.date
                }
            )

        }
        ).catch(error => console.log(error))

//    const authors = [
//        {
//            'fist_name':'Feder',
//            "last_name":'Dostaevski',
//            'birthday_year':1821,
//        },
//        {   'fist_name':'Aleksand',
//            "last_name":'Grin',
//            'birthday_year':1880,
//        }
//    ]
//    this.setState(
//        {
//            'authors': authors
//        }
//    )
  }


  render() {
    return (

        <div>
            <AuthorList authors={this.state.authors} />
        </div>
    );
  }

}

export default App;
