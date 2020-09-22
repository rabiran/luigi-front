import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  try {
     const response = await axios.post(url, data);
    return response.data; // parses JSON response into native JavaScript objects
  } catch (err) {
    console.log(err);
  }
}
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

  callAPI(formData) {
    postData("http://localhost:8310/luigi", formData)
      .then((res) => {
        alert(JSON.stringify(res)); // JSON data parsed by `data.json()` call
      })
      .catch((err) => {
        alert(err);
      });
  }

  handleSubmit() {
    const personIDsArray = [
      {
        domainUser: this.state.domainUser,
        identityCard: this.state.identityCard,
        personalNumber: this.state.personalNumber,
      },
    ];
    this.callAPI({
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
      <form onSubmit={this.handleSubmit}>
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
