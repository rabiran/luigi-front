import React from "react";
import  { sendLuigi } from "../services/luigiService";
import './form.css';
import { useForm } from "react-hook-form";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domainUser: "",
      identityCard: "",
      personalNumber: "",
      dataSource: "",
      apiResponse: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const personIDsArray = [
      {
        domainUser: this.state.domainUser,
        identityCard: this.state.identityCard,
        personalNumber: this.state.personalNumber,
      },
    ];
    sendLuigi({
      personIDsArray: personIDsArray,
      dataSource: this.state.dataSource,
    });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} class="mainform">
        <h1>
          Hello {this.state.username} {this.state.age}
        </h1>
        <p>Enter Data Source:</p>
        <input type="text" name="dataSource" onChange={this.myChangeHandler} />
        <p>Enter Domain User:</p>
        <input type="text" name="domainUser" onChange={this.myChangeHandler} />
        <p>Enter Identity Number:</p>
        <input
          type="text"
          name="identityCard"
          onChange={this.myChangeHandler}
        />
        <p>Enter Personal Number:</p>
        <input
          type="text"
          name="personalNumber"
          onChange={this.myChangeHandler}
        />
        <input type="submit" />
      </form>
    );
  }
}

export default MyForm;
