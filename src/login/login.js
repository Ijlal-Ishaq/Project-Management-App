import React, { Component } from 'react';
import './login.css';
import Cookies from 'universal-cookie';

//const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const api = 'https://project-management-heroko.herokuapp.com';
//const api='';

class Login extends Component {

    constructor(){

        super();
        this.state={
            page : 'login',
            msg : 'Enter username and password.',
            username : '',
            password : ''
        }

    }



        login=()=>{

            if(this.state.username=='' || this.state.password==''){
                this.setState({
                    msg:'Enter username and password'
                });
            }else{

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username : this.state.username , password: this.state.password })
                };
                fetch(api+'/auth/login', requestOptions)
                    .then(response => response.json())
                    .then(result =>{

                        let message=result.message;
                        

                        if(message=='Incorrect Password'){

                            this.setState({
                                msg : 'Incorrect Password. Try again.',
                            });

                        }
                        else if(message=='user not found'){

                            this.setState({
                                msg : 'Username not found. Try again.',
                            });

                        }
                        else if(message=='Login Successful'){

                            const cookies = new Cookies();
 
                            cookies.set('token', result.token,{maxAge: 3*24*60*60*1000});
                            

                            window.location.href='/';

                        }
                        else{

                            this.setState({
                                msg : 'Some error occurred. Try again.',
                            });

                        }

                    })
                    .catch(
                        error=>{
                            
                            this.setState({
                                msg : 'Some error occurred. Try again.',
                            });

                        }
                    );
               

            }

        }

        signup=()=>{

            if(this.state.username=='' || this.state.password==''){
                this.setState({
                    msg:'Enter username and password'
                });
            }else{
               
                
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username : this.state.username , password: this.state.password })
                };
                fetch(api+'/auth/register', requestOptions)
                    .then(response => response.json())
                    .then(result =>{

                        let message=result.message;

                        if(message=='username is taken'){

                            this.setState({
                                msg : 'That username is taken. Try another.',
                            });

                        }
                        else if(message=='User Added'){

                            this.login();

                        }
                        else{

                            this.setState({
                                msg : 'Some error occurred. Try again.',
                            });

                        }

                    })
                    .catch(
                        error=>{
                            
                            this.setState({
                                msg : 'Some error occurred. Try again.',
                            });

                        }
                    );



                
            }

        }
    
    

    render() {

        let{page,msg}=this.state;



        if(page=='login'){
            return (

                <div>
                
                <form className='body' >

                <h1 className='head1'>Log In</h1>

                <label htmlFor='username' className='label'>Username</label>
                <input id='username' type='name' placeholder='Enter Username' className="input" required onChange={(e)=>{this.state.username=e.target.value}}>{this.username}</input>
               
                <label htmlFor='password' className='label'>Password</label>
                <input id='password' type='password' placeholder='Enter Password' className="input" required onChange={(e)=>{this.state.password=e.target.value}}>{this.password}</input>
                
                <p className='msg'>{msg}</p>

                <input type='button' className='btn' value='LOGIN' onClick={this.login}></input>
                
                </form>

                <p className='p'>Don't have an account <a className='a' onClick={()=>{this.setState({page:'signup'})}}>Signup.</a></p>
                

                </div>
            
            )
        }
        else if(page=='signup'){
            return(

                <div>
                
                <form className='body'>

                <h1 className='head1'>Sign Up</h1>

                <label htmlFor='username' className='label'>Username</label>
                <input maxLength='15' id='username' type='name' placeholder='Enter Username' className="input" required onChange={(e)=>{this.state.username=e.target.value}}>{this.username}</input>
               
                <label htmlFor='password' className='label'>Password</label>
                <input id='password' type='password' placeholder='Enter Password' className="input" required onChange={(e)=>{this.state.password=e.target.value}}>{this.password}</input>
                
                <p className='msg'>{msg}</p>

                <input type='button' className='btn' value='SIGNUP' onClick={this.signup}></input>
                
                </form>

                <p className='p'>Already have an account <a className='a' onClick={()=>{this.setState({page:'login'})}}>Login.</a></p>
                

                </div>

            )

        }
        
    }
}


export default Login;
