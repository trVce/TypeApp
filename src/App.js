import logo from './logo.svg';
import './App.css';
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ""}
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1>
            Typing Race
        </h1>
          <img className="headerImage" src={logo} />
        </header>

        <body className="App-body">
          <p>
            {this.state.text}
        </p>

          <forum className="App-text-forum">
            <label>
              Textbox
          </label>
            <input type="text" />
          </forum>
        </body>

        <footer className="App-footer">
          <p>
            Created 5-21 by Jacob Adams
        </p>
        </footer>

      </div>
    );
  }

 
}

export default App;
