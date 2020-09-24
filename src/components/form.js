import React from "react";
import  { sendLuigi } from "../services/luigiService";
import './form.css';
import CircularIndeterminate from './loadingBar'
import TransitionsModal from './responseModal'
// import { useForm } from "react-hook-form";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domainUser: "",
      identityCard: "",
      personalNumber: "",
      dataSource: "",
      isSubmitted: false,
      apiResponse: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({isSubmitted: true, apiResponse: ''});
    const personIDsArray = [
      {
        domainUser: this.state.domainUser,
        identityCard: this.state.identityCard,
        personalNumber: this.state.personalNumber,
      },
    ];
    const response = await sendLuigi({
      personIDsArray: personIDsArray,
      dataSource: this.state.dataSource,
    })
    this.setState({isSubmitted: false, apiResponse: JSON.stringify(response.data)})
    console.log(response.data)
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  render() {
    let { isSubmitted } = this.state;
    return (
      <div className="formContainer">
      <form onSubmit={this.handleSubmit} className="mainform">
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
        <br/><br/>
        <input type="submit" />
      </form>
      {isSubmitted && <CircularIndeterminate/>} 
      {this.state.apiResponse && <TransitionsModal innerText={this.state.apiResponse}/>}
      </div>
    );
  }
}

export default MyForm;
