import React from "react";
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select';

import  { sendLuigi } from "../services/luigiService";
import './form.css';
import CircularIndeterminate from './loadingBar'
import TransitionsModal from './responseModal'

// import { useForm } from "react-hook-form";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        domainUser: "",
        identityCard: "",
        personalNumber: "",
        dataSource: "",
      },
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
        domainUser: this.state.formData.domainUser,
        identityCard: this.state.formData.identityCard,
        personalNumber: this.state.formData.personalNumber,
      },
    ];
    const response = await sendLuigi({
      personIDsArray: personIDsArray,
      dataSource: this.state.formData.dataSource,
    })
    this.setState({isSubmitted: false, apiResponse: JSON.stringify(response.data)})
    console.log(response.data)
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    const formData = this.state.formData;
    formData[nam] = val;
    this.setState({ formData : formData });
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
      <br/><br/>
      {this.state.apiResponse && <TransitionsModal innerText={this.state.apiResponse}/>}
      </div>
    );
  }
}

export default MyForm;
