import logo from './logo.svg';
import './App.css';
import React from 'react';
import Api from './Api';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {userID: "", token: "", ready: false, inputText: "", quote: ""}
    this.handleChange = this.handleChange.bind(this);
    this.newCard = this.newCard.bind(this);
  }
  
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === "inputText") {
      if (value.endsWith(this.state.quote.charAt(this.state.inputText.length))){
        this.setState({ [name]: value })
      } else {
        this.setState({ [name]: value.slice(0,value.length - 1) })
      }
    } 
  else {
      this.setState({ [name]: value })
    }
  }

  newCard() {
    this.state.ready ? this.setState({ ready: false }) : this.setState({ ready: true })
  }

  handleApi = quote => {
    this.setState({ quote: quote })
  }

  render() {
    let apiCall;
    if (this.state.ready === true && this.state.userID !== "" && this.state.token !== "") {
      apiCall = <Api userID={this.state.userID} token={this.state.token} quote={this.handleApi}/>
    } else {
      apiCall = ""
    }


    return (
      <div className="App">
        <header className="App-header">

          <h1>
            Typing Race
          </h1>
          <img className="App-logo" src={logo} alt="react logo" />
          
          <form className="Login-form">
            <label>
              userID:
            </label>
            <input 
            name="userID" 
            type="text"
            onChange={this.handleChange}/>
          </form>

          <form className="Login-form">
            <label>
              token:
            </label>
            <input 
            name="token" 
            type="text"
            onChange={this.handleChange} />
          </form>

          <button onClick={this.newCard}>New Card</button>
        </header>

        <body className="App-body">
          <p>
              {apiCall}
          </p>

          <form className="App-text-form">
            <label>
            Type Here:
            </label>
            <input
            type="text" 
            name="inputText"
            value={this.state.inputText}
            onChange={this.handleChange} />
          </form>
        </body>

        <footer className="App-footer">
          <p>
            Created 5-21 by Jacob Adams using <a href="https://www.quotes.net/">quotes.net API</a>
          </p>
        </footer>

      </div>
    );
  }

 
}

export default App;
