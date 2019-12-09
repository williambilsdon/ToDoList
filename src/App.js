import React from 'react';
import './App.css';

class TaskList extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.List = this.List.bind(this);
  }

  handleClick(key){
    console.log(key)
    this.props.delete(key);
  }

  List(task){
    return <li key={task.key}><button type="button" onClick={this.handleClick(task.key)}>{task.value}</button></li>
  }

  render(){
    var enteries = this.props.tasks;
    var listItems = enteries.map(this.List);
    return(
        <ul className="ListOfTasks">
          {listItems}
        </ul>
    );
  }
}

class AddTodo extends React.Component{

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.file = React.createRef();
  }

  onSubmit(e){
    e.preventDefault();

    var input = this.file.current.value;

    this.props.addItem(input)
  }

  render(){
    return(
      <div className="todoAdd">
        <form onSubmit={this.onSubmit}>
          <input type="text" ref={this.file}/>
          <button type="submit">+</button>
        </form>
      </div>
    );
  }
}

class ToDoApp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      input: null
    }
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    this.state.tasks.push({key: 1, value:"learn react"});
    this.state.tasks.push({key: 2, value:"Go shopping"});
    this.state.tasks.push({key: 3, value:"add to do tasks"});
  }

  addItem(toDoItem) {
    var newList = this.state.tasks;
    newList.push({key: this.state.tasks.length+1, value: toDoItem});
    this.setState({tasks: newList});
    console.log(this.state.tasks)
  }

  deleteItem(item) {
    console.log("delete " + item + "?")
  }

  render(){
    return(
      <div className = "container">
        <h1>Todo List</h1>
        <AddTodo input={this.state.input} addItem={this.addItem}/>
        <TaskList tasks = {this.state.tasks} delete={this.deleteItem} />
      </div>
    );
  }
}




export default ToDoApp;
