import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="init">
        <nav class="app_nav">
          <h1>Improv Pal</h1>
        </nav>
        <section class="logo_section">
          <img src="img/logo.png" alt=""/>
        </section>
        <section class="page_help">
          <p>
            Improv Pal is a game that gives players random characters to play in a scene.
            Then one player, called "the host", must guess who each of the players are to
            win a point.
          </p>
        </section>
        <section class="entry_buttons">
          <form action="join.html">
            <input type="submit" value="Join game" id="join-game"/>
          </form>
          <form action="host.html">
            <input type="submit" value="Host game" id="host-game"/>
          </form>
        </section>
      </div>
    );
  }
}

export default App;