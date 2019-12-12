import React from 'react';
import './App.css';
import AddTodo from './Components/AddTodo';
import TaskList from './Components/TaskList';
import axios from 'axios';
import Authentication from './Components/Authentication';

class ToDoApp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      getResult: null,
      input: null,
      nextKey: 0,
      value: ""
    }
    //Here we bind this to our functions allowing us to pass state
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.manageInputField=this.manageInputField.bind(this);
    this.updateTask=this.updateTask.bind(this);
    this.getTasks=this.getTasks.bind(this);
    this.handleGetResponse=this.handleGetResponse.bind(this);
    //perform initial task list update
    //this.getTasks()
    
  }

  handleGetResponse(){
    var updatedList = []
    //manually produce a list consisting of a key, value and completed field
    for(var i = 0; i<this.getResult.length; i++){
      updatedList.push({key: this.getResult[i]["_id"], value: this.getResult[i]["value"], completed: this.getResult[i]["completed"]});
    }
    //update the task state with the new list
    this.setState({tasks: updatedList})
  }

  //request all documents from API relating to user tasks
  getTasks() {
    const that = this;

    axios.get('http://localhost:5000/todo_list/getAllViews')
      .then(function (response){
        console.log(response)
        that.getResult = response.data;
        that.handleGetResponse()
      })
  }

  //send POST request to API with a task value, all other data components 
  //will be set by the API/CouchDB
  addItem(toDoItem) {
    axios.post('http://localhost:5000/todo_list/addTask',
      toDoItem
    )
    .then(function(response){
      //this.getTasks()
      console.log(response);
    })
    .catch(function(error){
      console.log(error)
    });
    //update task list to display new tasks
  }
  
  //run axios post request containing item key to the api to allow api to run delete request
  deleteItem(item) {

    let data = item['key']

    axios.post('http://localhost:5000/todo_list/deleteTask',
      data
    )
    .then(function(response){
      //this.getTasks()
      console.log(response)
    })
    .catch(function(error){
      console.log(error)
    })

  }


  //run axios post request containing item key allowing api to complete update request
  updateTask(item){
    let data = item['key']

    axios.post('http://localhost:5000/todo_list/updateTask',
      data
    )
    .then(function(response){
      console.log(response)
      //this.getTasks()
    })
    .catch(function(error){
      console.log(error)
    })

  }

  manageInputField(input){
    this.setState({value: input})
  }

  render(){
    //this.getTasks()
    return(
      <div className = "container">
        <h1>Todo List</h1>
        <div className = "left-container"> 
          <h3>Incomplete</h3>
          <TaskList tasks = {this.state.tasks} delete={this.deleteItem} completed={false} update={this.updateTask}refresh={this.getTasks}/>
          <AddTodo holder={this.state.value} update={this.manageInputField}input={this.state.input} addItem={this.addItem}refresh={this.getTasks}/>
        </div>
        <div className="right-container">
          <h3>Complete</h3>
          <TaskList tasks = {this.state.tasks} delete={this.deleteItem} completed={true} update={this.updateTask} refresh={this.getTasks}/>
        </div>
      </div>
    );
    
  }
}




export default ToDoApp;
