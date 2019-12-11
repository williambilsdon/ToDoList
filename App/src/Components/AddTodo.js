import React from 'react';

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

  export default AddTodo;