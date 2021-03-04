import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import './dashboard.css';
import Cookies from 'universal-cookie';


const api = 'https://project-management-heroko.herokuapp.com';
//const api='';


const cookies = new Cookies();




class Dashboard extends Component {
    
    constructor(){
        super();
        this.state={
            username:'',
            projects:[]
        }
    }

    

    componentDidMount(){

        this.get_info();


    }


    get_info(){
        
        

    let reqoption={
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({token : cookies.get('token')})
     }

        fetch(api+'/auth/get_info',reqoption)
        .then(res=>res.json())
        .then(result=>{

            

            this.setState({

                username:result.username,
                projects:result.projects.reverse()

            });

        });

    }



    signout(){

        let result=window.confirm("Do you want to signout?");

        if(result){
        const cookies = new Cookies();
 
            cookies.remove('token');
            console.log(cookies.get('token')); 

            window.location.href='/';
        }

        
    }


    add_project=()=>{

       let name=prompt("Enter Project's Name");
       console.log(name);

       if(name!=null&&name!=''){
           let description=prompt("Enter Project's Description");

           if(description!='' && description!=null){

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name : name , description : description,token :cookies.get('token')})
                };

                fetch(api+'/project/create',requestOptions)
                .then((res)=>res.json())
                .then((result)=>{
                    this.get_info();
                });

           }


       }
       


    }


    delete_project=(e)=>{

        let result=window.confirm('Do yo want to delete this project?')

        if(result){

        fetch(api+'/project/delete_project',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ project_id : e.target.id ,token :cookies.get('token')})
        })
        .then(res=>res.json())
        .then(result=>{
            this.get_info();
        });


        }
        

    }

    render() {

        

            return (
            
                <div>


                <div className='head'>

                <h1 className='heading'>DASHBOARD</h1>
                <h1 className='username' onClick={this.signout}>@{this.state.username}</h1>
    
                </div>



                <div className='fab' onClick={this.add_project}>+</div>




                <div className='projects'>
                
                {this.state.projects.length==0 ? 'No Projects, add some.' :this.state.projects.map((o,i)=>{
                    
                    return(
                        <div key={i}>
                        <div className='delete_btn' id={o._id} onClick={(e)=>{this.delete_project(e)}}>x</div>
                        <Link to={'/project/'+o._id} key={o._id}>
                            <div  className='project'  key={o._id}>
                                
                                <h1 className='project_name'>Name : {o.name}</h1>
                                <h1 className='project_description'>Description : {o.description}</h1>
                            </div>
                        </Link>
                        </div>
                    
                    )
                })}
                </div>

                </div>
            
                )
        

        
    }
}

export default Dashboard