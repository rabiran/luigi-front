import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import { useForm } from "react-hook-form";

import { sendLuigi } from "../../services/luigiService";
import "./form.css";
import CircularIndeterminate from "./utils/loadingBar";
import TransitionsModal from "./utils/responseModal";

import { dataSources } from "../../config/config";
import { validateAll } from "./validators";

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
      errors: {
        domainUser: "",
        identityCard: "",
        personalNumber: "",
        dataSource: "",
        cantSubmit: false,
      },
      isSubmitted: false,
      apiResponse: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const errors = this.state.errors;
    const formData = this.state.formData;
    validateAll(formData, errors);
    this.setState({ errors: errors });

    if (this.state.errors.cantSubmit) return;

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
      apiResponse: response.data,
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
              אנא הכנס את פרטיך
          </h1>
          <div class="formInputs">
            <div class="sourceInput">
              <p>בחר מקור</p>
              <Select
                name="dataSource"
                className="formInput"
                labelId="select-data-source"
                id="demo-simple-select"
                value={this.state.formData.dataSource}
                onChange={this.myChangeHandler}
              >
                {Object.keys(dataSources).map((key) => {
                  return <MenuItem value={dataSources[key]}>{key}</MenuItem>;
                })}
              </Select>
            </div>

            <div class="duInput">
              <p>הזן שם משתמש</p>
              <TextField
                required
                name="domainUser"
                label="Required"
                onChange={this.myChangeHandler}
                className="formInput"
              />
            </div>
            <div class="idInput">
              <p>הזן מספר זהות</p>
              <TextField
                required
                name="identityCard"
                label="Required"
                onChange={this.myChangeHandler}
                className="formInput"
                error={this.state.errors.identityCard}
                helperText={this.state.errors.identityCard}
              />
            </div>
            <div class="pnInput">
              <p>הזן מספר אישי</p>
              <TextField
                required
                name="personalNumber"
                label="Required"
                onChange={this.myChangeHandler}
                className="formInput"
                error={this.state.errors.personalNumber}
                helperText={this.state.errors.personalNumber}
              />
            </div>
          </div>

          <div class="personIDs"></div>

          <br />
          <br />
          <Button
            id="submitButton"
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
          >
            הוסף
          </Button>
        </FormControl>
        {isSubmitted && <CircularIndeterminate />}
        <br />
        <br />
        {this.state.apiResponse && (
          <TransitionsModal response={this.state.apiResponse} />
        )}
      </div>
    );
  }
}

export default MyForm;
