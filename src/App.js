import './App.css';
import Login from './login/login';
import Cookies from 'universal-cookie';
import {BrowserRouter , Route} from 'react-router-dom';
import Dashboard from "./dashboard/dashboard";
import Project from "./project/project";
import { Component } from 'react';

const api = 'https://project-management-heroko.herokuapp.com';
//const api='';


class App extends Component{

  


  constructor(){
    super();
    this.state={
      login_status:false
    }
  }

  componentDidMount(){

    this.checklogin();

  }

  checklogin(){

    const cookies = new Cookies();
    

    let reqoption={
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({token : cookies.get('token')})
  }

    fetch(api+'/auth/check_login',reqoption)
    .then(response => response.json())
    .then(result =>{

      
      let message=result.message;
     
      
      if(message=='login'){

        this.setState({
          login_status : true
        });

      }else{

        this.setState({
          login_status : false
        });

      }


    })

  }


  render(){

    

    return (
      <div className="App">
      
      <BrowserRouter>
      
      <Route exact path='/' component={this.state.login_status ? Dashboard : Login}></Route>
      <Route path='/dashboard' component={this.state.login_status ? Dashboard : Login}></Route>
      <Route path='/project/:id' component={this.state.login_status ? Project : Login}></Route>
      
      
      </BrowserRouter>
  
  
      </div>
    )

    }

  
 
  

  
}

export default App;
