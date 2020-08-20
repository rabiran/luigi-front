import React from 'react';
import { useForm } from "react-hook-form";


class MyForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        username: '',
        age: null,
      };
      this.handleSubmit = this.onSubmit.bind(this);
    }

    onSubmit = data => console.log(data);

    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }
    render() {

      return (
        <form onSubmit={this.handleSubmit}>
        <h1>Hello {this.state.username} {this.state.age}</h1>
        <p>Enter Domain User:</p>
        <input
          type='text'
          name='DomainUser'
          onChange={this.myChangeHandler}
        />
        <p>Enter Identity Number:</p>
        <input
          type='text'
          name='Identity umber'
          onChange={this.myChangeHandler}
        />
        <p>Enter Personal Number:</p>
        <input
          type='text'
          name='PersonalNumber'
          onChange={this.myChangeHandler}
        />
        <input type="submit" />
        </form>
      );
    }
  }
  
export default MyForm;