import React from 'react';
import './App.css';
import AddTodo from './Components/AddTodo';
import TaskList from './Components/TaskList';
import axios from 'axios';

class ToDoApp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      input: null,
      nextKey: 0,
      value: ""
    }
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.manageInputField=this.manageInputField.bind(this);
    this.updateTask=this.updateTask.bind(this);
    
  }

  addItem(toDoItem) {
    axios.post('http://localhost:5000/todo_list/addTask',
      toDoItem
    )
    .then(function(response){
      console.log(response);
    })
    .catch(function(error){
      console.log(error)
    });
    //var newList = this.state.tasks;
    //console.log(this.state.nextKey)
    //newList.push({key: this.state.nextKey, value: toDoItem, completed: false});
    //this.setState({tasks: newList, nextKey: newList.length});
    //console.log(newList)
  }
  
  deleteItem(item) {
    var newList = this.state.tasks;
    var index = newList.indexOf(item)
    newList.splice((index), 1);
    this.setState({tasks: newList});
  }

  updateTask(item){
    var currentList = this.state.tasks;
    var index = currentList.indexOf(item);

    currentList[index].completed = true;

    this.setState({tasks: currentList});
  }

  manageInputField(input){
    this.setState({value: input})
  }

  render(){
    return(
      <div className = "container">
        <h1>Todo List</h1>
        <div className = "left-container"> 
          <h3>Incomplete</h3>
          <TaskList tasks = {this.state.tasks} delete={this.deleteItem} completed={false} update={this.updateTask}/>
          <AddTodo holder={this.state.value} update={this.manageInputField}input={this.state.input} addItem={this.addItem}/>
        </div>
        <div className="right-container">
          <h3>Complete</h3>
          <TaskList tasks = {this.state.tasks} delete={this.deleteItem} completed={true} />
        </div>
      </div>
    );
    
  }
}




export default ToDoApp;
