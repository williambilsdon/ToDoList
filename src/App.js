import React from 'react';
import './App.css';

class TaskList extends React.Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.List = this.List.bind(this);
  }

  handleClick(task){
    this.props.delete(task);
  }

  List(task){
    return <li key={task.key}><button className="liButtons"type="button" onClick={this.handleClick.bind(this, task)}>{task.value}</button></li>
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
      input: null,
      nextKey: 0,
    }
    this.addItem=this.addItem.bind(this);
    this.deleteItem=this.deleteItem.bind(this);
    
  }

  addItem(toDoItem) {
    var newList = this.state.tasks;
    console.log(this.state.nextKey)
    newList.push({key: this.state.nextKey, value: toDoItem});
    this.setState({tasks: newList, nextKey: newList.length});
    console.log(newList)
  }
  
  /*
  componentDidMount(){
    this.addItem("Example Activity 1");
    this.addItem("Example Activity 2");
    this.addItem("Example Activity 3");
    this.setState({nextKey: 1})
    this.setState({nextKey: 2})
    this.setState({nextKey: 3})
    
  }
  */
  deleteItem(item) {
    var newList = this.state.tasks;
    var index = newList.indexOf(item)
    newList.splice((index), 1);
    this.setState({tasks: newList});
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
