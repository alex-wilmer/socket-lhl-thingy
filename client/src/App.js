import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    username: "alex",
    messages: [],
    tempValue: "",
  };

  componentDidMount() {
    this.socket = new WebSocket(
      process.env.REACT_APP_SOCKET_SERVER || "ws://localhost:8080",
    );

    // Listen for messages
    const EVENT_MESSAGE_KEY = "message";
    this.socket.addEventListener(EVENT_MESSAGE_KEY, event => {
      console.log(event);

      let message = JSON.parse(event.data);

      this.setState(previousState => ({
        messages: [message, ...previousState.messages],
      }));
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome,
            <input
              value={this.state.username}
              onChange={e =>
                this.setState({
                  username: e.target.value,
                })
              }
            />
          </h1>
          <hr />

          <input
            value={this.state.tempValue}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.socket.send(
                  JSON.stringify({
                    username: this.state.username,
                    value: this.state.tempValue,
                  }),
                );

                this.setState({ tempValue: "" });
              }
            }}
            onChange={event => {
              this.setState({ tempValue: event.target.value });
            }}
          />
        </header>
        <hr />
        <div>
          {this.state.messages.map(message => (
            <div key={message.date}>
              <b>{message.username}:</b> {message.value}
              <br />
              <span>{new Date(message.date).toString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
