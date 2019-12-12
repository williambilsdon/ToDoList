import React from 'react';

class TaskList extends React.Component{
    constructor(props){
      super(props);
  
      this.handleClick = this.handleClick.bind(this);
      this.handleComplete = this.handleComplete.bind(this);
      this.List = this.List.bind(this);
      this.CompleteList = this.CompleteList.bind(this);
    }
  
    handleClick(key){
      this.props.delete(key);
    }
  
    handleComplete(item){
      this.props.update(item);
    }
  
    CompleteList(task){
      return (
        <div>
          <form>
            <li className="listItems" key={task.key}><button className="liButtons"type="button" onClick={this.handleClick.bind(this, task.key)}>{task.value}</button></li>
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
  

      //Enteries represents our complete list of tasks
      //completed and incomplete will be our filtered task lists
      //based on the value of each tasks completed field

      for(var i = 0; i<enteries.length; i++){
        if(enteries[i].completed){
          completed.push(enteries[i])
        } else {
          incomplete.push(enteries[i])
        }
      }
      
      //Map the appropriate HTML layout for list items to a list items array
      //this array will then be called inside the unsorted list
      
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

  export default TaskList;