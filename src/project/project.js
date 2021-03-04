import React, { Component } from 'react'
import './project.css'
import Cookies from 'universal-cookie';


const api = 'https://project-management-heroko.herokuapp.com';
//const api='';

const cookies = new Cookies();

class Project extends Component {

    constructor(props){

        super(props);
        this.state={
            id:this.props.match.params.id,
            name:'',
            description:'',
            tasks:[],
        }

    }

    componentDidMount(){

        this.get_details();

    }

    get_details=()=>{

        let reqoption={
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({project_id : this.state.id,token :cookies.get('token')})
        }

        fetch(api+'/project/get_project',reqoption)
        .then(res=>res.json())
        .then(project=>{

           

            this.setState({

                name : project.name,
                description : project.description,
                tasks : project.tasks


            });

        });

        

    }



    delete_project=()=>{
        let result=window.confirm('Do yo want to delete this project?')

        if(result){

        fetch(api+'/project/delete_project',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ project_id : this.state.id,token :cookies.get('token')})
        })
        .then(res=>res.json())
        .then(result=>{
            window.location.href='/'
        });


        }
    }

    add_task=()=>{

        let name=prompt("Enter Task's Name");
        console.log(name);
 
        if(name!=null&&name!=''){
            let description=prompt("Enter Task's Description");
 
            if(description!='' && description!=null){
 
                 const requestOptions = {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({ project_id:this.state.id , name : name , description : description,token :cookies.get('token')})
                 };
 
                 fetch(api+'/project/add_task',requestOptions)
                 .then((res)=>res.json())
                 .then((result)=>{
                     this.get_details();
                 });
 
            }
 
 
        }

    }



    task_status=(e)=>{

        

            let status=this.state.tasks[e.target.id].status;

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project_id:this.state.id ,task : e.target.id, status : !status ,token :cookies.get('token')})
            };

            fetch(api+'/project/task_status',requestOptions)
            .then((res)=>res.json())
            .then((result)=>{
                this.get_details();
            });



        




    }


    delete_task=(e)=>{

        let result=window.confirm('Do yo want to delete this task?')

        if(result){

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ project_id:this.state.id ,task : e.target.id,token :cookies.get('token')})
            };

            fetch(api+'/project/delete_task',requestOptions)
            .then((res)=>res.json())
            .then((result)=>{
                this.get_details();
            });


        }

    }




    no_tasks(){
        return(
            <div>
            <br></br>
            No tasks, add some.
            </div>
        )
    }


    render() {
        return (
            <div>

                <div className='head'>

                    <h1 className='heading'>PROJECT</h1>
                    <h1 className='p_username' onClick={this.delete_project}>Delete</h1>
                    
                    
                    

                </div>
                

                <div className='fab' onClick={this.add_task}>+</div>

              
              
                <div className='p_details'>
                    
                    <h1 className='p_name'>Name: {this.state.name}</h1>
                    <h1 className='p_des'>Description: {this.state.description}</h1>

                </div>


              
                <div className='tasks'>
                
                    {this.state.tasks.length==0 ? this.no_tasks() : this.state.tasks.map((o,i)=>{

                        return(

                            <div className='task' key={i} >
                        <div className='design'>
                        
                            <div className='p_bar'></div>
                            <div className={o.status ? 'p_circle_d' : 'p_circle'} id={i}  onClick={(e)=>this.task_status(e)}></div>
                            <div className='p_bar'></div>
                        
                        </div>

                        <div className='delete_btn_t' id={i} onClick={(e)=>{this.delete_task(e)}}>x</div>

                        <div className='task_details'>
                        <div className='t_name'>{o.name}</div>
                        <div className='t_des'>{o.description}</div>
                        </div>

                        
            
                    </div>


                        )


                    })}


                    


                </div>






                







            </div>
        )
    }
}


export default Project;