import React from 'react';
import './App.css';

class TaskList extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.List = this.List.bind(this);
    this.CompleteList = this.CompleteList.bind(this);
  }

  handleClick(task){
    this.props.delete(task);
  }

  handleComplete(item){
    this.props.update(item);
  }

  CompleteList(task){
    return (
      <div>
        <form>
          <li className="listItems" key={task.key}><button className="liButtons"type="button" onClick={this.handleClick.bind(this, task)}>{task.value}</button></li>
        </form>
      </div>
    );
  }

  List(task){
    return (
      <div>
        <form>
          <li className="listItems" key={task.key}><button className="liButtons"type="button" onClick={this.handleClick.bind(this, task)}>{task.value}</button><button className="movebtn" onClick={this.handleComplete.bind(this, task)}>></button></li>
        </form>
      </div>
    );
  }

  render(){
    var enteries = this.props.tasks;

    var completed = []
    var incomplete = []
    var listItems = []


    for(var i = 0; i<enteries.length; i++){
      if(enteries[i].completed){
        completed.push(enteries[i])
      } else {
        incomplete.push(enteries[i])
      }
    }

    if(this.props.completed){
      listItems = completed.map(this.CompleteList)
    } else {
      listItems = incomplete.map(this.List)
    }
    return(
        <div className="List-Container">
          <ul className="ListOfTasks">
            {listItems}
          </ul>
        </div>
    );
  }
}

class AddTodo extends React.Component{

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.file = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(e){
    e.preventDefault();

    var input = this.file.current.value;

    this.props.addItem(input)
    this.props.update("")
  }

  handleChange(e){
    this.props.update(e.target.value)
  }

  render(){
    return(
      <div className="todoAdd">
        <form onSubmit={this.onSubmit}>
          <input value={this.props.holder} type="text" ref={this.file} onChange={this.handleChange}/>
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
    var newList = this.state.tasks;
    console.log(this.state.nextKey)
    newList.push({key: this.state.nextKey, value: toDoItem, completed: false});
    this.setState({tasks: newList, nextKey: newList.length});
    console.log(newList)
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
          <AddTodo holder={this.state.value} update={this.manageInputField}input={this.state.input} addItem={this.addItem}/>
          <TaskList tasks = {this.state.tasks} delete={this.deleteItem} completed={false} update={this.updateTask}/>
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
