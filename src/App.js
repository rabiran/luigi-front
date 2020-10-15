import React from 'react';
import './App.css';
import MyForm from './components/form/form'
import luigiLogo from'./images/luigi.png';

const logoStyle = {
  color: 'blue',
  marginLeft: 0,
  width: "10%",
  height: "10%",
  opacity: 0.7,
};

function App() {
  return (
    <div className="App">
       {/* <img  src={luigiLogo} style={logoStyle} alt="Luigi Image"/> */}
      <MyForm className="MyForm">

      </MyForm>
    </div>
  );
}

export default App;
