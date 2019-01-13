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
         quoteId: '',
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
         .then(json => this.setState(prevState => ({ body: json.quote.body, author: json.quote.author, quoteId: json.quote.id, listOfSavedQuote: [...prevState.listOfSavedQuote, { quote: json.quote.body, author: json.quote.author }] })))
   }
   fetchNewQuote = () => {
      fetch(`https://favqs.com/api/qotd`)
         .then(res => res.json())
         .then(json => this.setState({ body: json.quote.body, author: json.quote.author, quoteId: json.quote.id }))
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
         .then((response) => {
            console.log('fave response', response.quoteArray)
            this.setState({ listOfSavedQuote: response.quoteArray })
         }

         )
      console.log("favs")
   }
   onEmailChange = (e) => {
      this.setState({ email: e.target.value })
   }
   postSaveQuote = () => {
      let post = {
         userid: this.state.email,
         quote: this.state.body,
         author: this.state.author,
         quoteId: this.state.quoteId,
      }
      fetch(`${quoteAPI}/faves`, {
         method: "POST",
         body: JSON.stringify(post),
         headers: {
            "Content-Type": "application/json",
         }
      })
         .then(saveQuote => saveQuote.json())
         .then(quote => this.setState(prevState => ({ listOfSavedQuote: [...prevState.listOfSavedQuote, { quote: json.quote.body, author: json.quote.author }] })))
      // .then(alert('You added a Quote!'))
   }
   renderFavorites = () => {
      return this.state.listOfSavedQuote.map(quote => {
         console.log('fave quote', quote)
         return (
            <div className='quote-wrapper'>
               <h1 className='quote'>{quote.quote}</h1>
               <div className='author'>{quote.author}</div>
               <button>remove favorite</button>
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
                  <h1>Favorite Quotes</h1>
                  {this.renderFavorites()}
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