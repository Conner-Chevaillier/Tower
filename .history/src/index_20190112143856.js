import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route, } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
// import Quote from './Quote'
import * as serviceWorker from './serviceWorker'

// const quoteAPI = "https://memetower.herokuapp.com"
const quoteAPI = 'http://localhost:3001'

class App extends Component {
   constructor() {
      super()
      this.state = {
         email: '',
         id: '',
         body: '',
         author: '',
         listOfSavedQuote: [],
         deletePostQuote: '',
      }
      // this.deletePostQuote = this.deletePostQuote.bind(this);
   }

   componentDidMount() {
      this.fetchNewQuote()
   }

   addNewQuote = () => {
      fetch(`http://localhost:3001/quotes`)
         .then(res => res.json())
         .then(json => this.setState({ body: json.quote.body, author: json.quote.author, id: json.quote.id }))
   }
   fetchNewQuote = () => {
      fetch(`https://favqs.com/api/qotd`)
         .then(res => res.json())
         .then(json => this.setState({ body: json.quote.body, author: json.quote.author, id: json.quote.id }))
   }
   // GetFavorites = () => {
   //    fetch(`https://favqs.com/api/qotd`)
   //       .then(res => res.json())
   //       .then(json => this.setState({ newquote: json }))
   // }

   handleQuoteLogin = () => {
      console.log("favs")
      fetch(`http://localhost:3001/quotes/${this.state.email}`)
         .then((response) => response.json())
         .then((response) => this.setState({ listOfSavedQuote: [...this.state.listOfSavedQuote, { body: response.quote, author: response.author }] }))
      console.log("favs")
   }
   onEmailChange = (e) => {
      this.setState({ email: e.target.value })
   }
   postSaveQuote = () => {
      let post = {
         quote: this.state.body,
         author: this.state.author,
      }
      fetch(`${quoteAPI}/faves`, {
         method: "POST",
         body: JSON.stringify(post),
         headers: {
            "Content-Type": "application/json",
         }
      })
         .then(saveQuote => saveQuote.json())
         .then(this.loadQuote)
         .then(alert('You added a Quote!'))
   }
   renderFavorites = (faves) => {
      faves.map(quote => {
         return (
            <div className='quote-wrapper'>
               <h1 className='quote'>{quote.body}</h1>
               <div className='author'>{quote.author}</div>
            </div>
         )
      })
   }
   // deletePostQuote = (e) => {
   //    var deletePostQuote = this.state.messages;



   render() {
      return (
         <form className='Form'>
            <h1>Quotes</h1>
            <div>
               <div>
                  <input type="string" placeholder="enter email" onChange={this.onEmailChange}></input>
                  <button onClick={this.handleQuoteLogin} type='button'>login</button>
               </div>
               <section className='quote-box'>
                  <div className='quote-wrapper'>
                     <h1 className='quote'>{this.state.body}</h1>
                     <div className='author'>{this.state.author}</div>
                  </div>
                  {renderFavorites(this.state.listOfSavedQuote)}
                  <Router>
                     <div>
                        <Route path="/delete" render={() => (<deleteQuote deleteQuote={this.deleteQuote} handleInput={this.handleInput} />)} />
                        <Route path="/create" render={() => (<postSaveQuote postSaveQuote={this.postSaveQuote} handleInput={this.handleInput} />)} />
                     </div>
                  </Router>
                  <div className='btn-wrap'>
                     <button type='button' className='new-quote' onClick={this.fetchNewQuote}>Get New Quote</button>
                     <button type='button' className='new-quote' onClick={this.postSaveQuote}>Save Quote as User</button>
                  </div>
                  <div>
                  </div>
               </section>
            </div>
         </form>
      )
   }
}

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()