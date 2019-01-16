import React from "react";
import "./toDoList.css";
import FlipMove from "react-flip-move";

class ToDoItems extends React.Component {

  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
  }

  createTasks(task, completed) {
    const doneButton = <button className="doneButton" onClick={() => this.props.handleCompletion(task)}>Done</button>
    const xButton = <button className="xButton" onClick={() => this.props.handleDeletion(task)}>X</button>
      return (
        <li key={task.key} className={completed}>
          <span className="text">{task.text}</span>
          <span>{doneButton}</span>
          <span>{xButton}</span>
        </li>
      )
  }

  render() {
    let incomplete = this.props.incomplete;
    let complete = this.props.complete;

    let incompleteList = incomplete.map((task) => this.createTasks(task, ""));
    let completeList = complete.map((task) => this.createTasks(task, "completed"));

    return (
      <ul className="theList">
        <FlipMove duration={250} easing="ease-out">
          {incompleteList}
          {completeList}
        </FlipMove>
      </ul>
    )
  }

}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enteredTask: "",
      tasks: {
        incomplete: [],
        complete: [],
      },
    }

    this.addTask = this.addTask.bind(this);
    this.handleDeletion = this.handleDeletion.bind(this);
    this.handleCompletion = this.handleCompletion.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleDeletion(task) {
    let newState = this.state;
    let incomplete = newState.tasks.incomplete;
    let complete = newState.tasks.complete;

    let index = incomplete.indexOf(task);
    if (index >= 0) {
      incomplete.splice(index, 1);
    } else {
      index = complete.indexOf(task);
      if (index >= 0) {
        complete.splice(index, 1);
      }
    }
    this.setState({ newState });

  }

  handleCompletion(task) {
    let newState = this.state;
    let incomplete = newState.tasks.incomplete;
    let complete = newState.tasks.complete;

    let index = incomplete.indexOf(task);
    if (index >= 0 && !complete.includes(task)) {
      incomplete.splice(index, 1);
      complete.unshift(task);
    }
    this.setState({ newState });
  }

  addTask(e) {
    e.preventDefault();

    if (this.state.enteredTask !== "") {
      let newTask = {
        text: this.state.enteredTask,
        key: Date.now(),
      }

      let newState = this.state;
      newState.tasks.incomplete.unshift(newTask);

      this.setState({ newState });

      this.state.enteredTask = "";
    }
  }

  handleOnChange(event) {
    this.setState({ enteredTask: event.target.value });
  }

  render() {
    return (
      <div id="container">
        <div className="todoListMain">
          <div className="header">
            <form onSubmit={this.addTask}>
              <input value={this.state.enteredTask}
                onChange={this.handleOnChange}
                placeholder="Enter a task">
              </input>
              <button type="submit">Add</button>
            </form>
          </div>
          <ToDoItems complete={this.state.tasks.complete}
            incomplete={this.state.tasks.incomplete}
            handleDeletion={this.handleDeletion}
            handleCompletion={this.handleCompletion}
          />
        </div>
      </div>
    );
  }
}

export default ToDoList;