import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { sendLuigi } from "../../services/luigiService";
import "./form.css";
import CircularIndeterminate from "./utils/loadingBar";
import TransitionsModal from "./utils/responseModal";

import { dataSources } from "../../config/config"
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
    this.setState({ isSubmitted: true, apiResponse: "" });
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
    });
    this.setState({
      isSubmitted: false,
      apiResponse: JSON.stringify(response.data),
    });
    console.log(response.data);
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    const formData = this.state.formData;
    formData[nam] = val;
    this.setState({ formData: formData });
  };
  render() {
    let { isSubmitted } = this.state;
    return (
      <div className="formContainer">
        <FormControl className="mainform">
          <h1>
            Hello {this.state.username} {this.state.age}
          </h1>
          <p>Select Data Source:</p>
          {/* <InputLabel id="select-data-source">Datasource</InputLabel> */}
          <Select
            name="dataSource"
            className="formInput"
            labelId="select-data-source"
            id="demo-simple-select"
            value={this.state.formData.dataSource}
            onChange={this.myChangeHandler}
          >
            {Object.keys(dataSources).map(key => {
            return <MenuItem value={dataSources[key]}>{key}</MenuItem>
            })}
          </Select>
          <p>Enter Domain User:</p>
          <TextField required name="domainUser" label="Required" onChange={this.myChangeHandler} className="formInput"/>
          <p>Enter Identity Number:</p>
          <TextField required name="identityCard" label="Required" onChange={this.myChangeHandler} className="formInput"/>
          <p>Enter Personal Number:</p>
          <TextField required name="personalNumber" label="Required" onChange={this.myChangeHandler} className="formInput"/>
          <br />
          <br />
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </FormControl>
        {isSubmitted && <CircularIndeterminate />}
        <br />
        <br />
        {this.state.apiResponse && (
          <TransitionsModal innerText={this.state.apiResponse} />
        )}
      </div>
    );
  }
}

export default MyForm;
