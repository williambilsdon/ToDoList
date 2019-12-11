import React from 'react';

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
            <li className="listItems" key={task._id}><button className="liButtons"type="button" onClick={this.handleClick.bind(this, task)}>{task.value}</button></li>
          </form>
        </div>
      );
    }
  
    List(task){
      return (
        <div>
          <form>
            <li className="listItems" key={task._id}><button className="liButtons"type="button" onClick={this.handleClick.bind(this, task)}>{task.value}</button><button className="movebtn" onClick={this.handleComplete.bind(this, task)}>></button></li>
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
      console.log("after taskList if statements")
      console.log(incomplete)
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