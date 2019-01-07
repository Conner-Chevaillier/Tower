import React, { Component } from 'react';
import './App.css';
import { Router, Link } from "@reach/router";

class App extends Component {
  constructor() {
    super()
    this.state = {
      quote: '',
      author: '',
    }
    this.fetchQuote = this.fetchQuote.bind(this)
  }

  fetchQuote() {
    return fetch(`http://localhost:3001/quotes`)
      .then(res => res.json())
      .then(json => this.setState({
        quote: json.quote.body,
        author: json.quote.author
      }))
      .catch(err => console.log(err))
  }
  App() {
    return (
      <form>
        <div>
          <h1> My Favorite Quote </h1>
        </div>
        <nav>
          <button type="button"> To Login
        <Link to="Login" ></Link>
          </button>
        </nav>
        <Router>
          <Quote path="Quote" />
          <Login path='Login' />
        </Router>
      </form>
    )
  }

  Login() {

    <form>
      <label>
        Email:
     <input type="text" name="name" />
      </label>

      <button class="btn">
        <Link to='Quote' class="badge badge-primary" input type="submit" value="Submit" > login </Link>
      </button>
    </form>
  }

  //   render{
  //   return (
  //     <div>
  //       <Quote fetchQuote={this.fetchQuote} author={this.state.author} quote={this.state.quote} />
  //     </div>
  //   )
  // }
}

render(<App />, document.getElementById('root'))

export default App


