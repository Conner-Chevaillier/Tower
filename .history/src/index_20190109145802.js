import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
// import Quote from './Quote'
import * as serviceWorker from './serviceWorker'


class App extends Component {
   constructor() {
      super()
      this.state = {
         email: '',
         id: '',
         body: '',
         author: '',
         newquote: []
      }
   }

   componentDidMount() {
      fetch(`https://favqs.com/api/qotd`)
         .then(res => res.json())
         .then(json => this.setState({ body: json.quote.body, author: json.quote.author, id: json.quote.id }))
   }
   fetchNewQuote = () => {
      fetch(`https://favqs.com/api/qotd`)
         .then(res => res.json())
         .then(json => this.setState({ newquote: json }))
   }
   GetFavorites = () => {
      fetch(`https://favqs.com/api/qotd`)
         .then(res => res.json())
         .then(json => this.setState({ newquote: json }))
   }
   // handleQuoteLogin = async () => {
   //    await fetch(`http://localhost:3001/quotes/`, {
   //       headers: {
   //          'Content-Type': 'application/json'
   //       },
   //       method: 'POST',
   //       body: email()
   //    })
   //       .then((response) => response.json())
   //       .then((response) => this.setState({ email }))
   // }

   handleQuoteLogin = async () => {
      await fetch(`http://localhost:3001/quotes/${this.state.email}`)
         .then((response) => response.json())

         .then((response) => this.setState({ body: response.quote.body, author: response.quote.author }))
   }

   render() {
      return (
         <form className='Form'>
            <h1>Quotes</h1>
            <div>
               <div>
                  <input type="string" placeholder="enter email"></input>
                  <button onClick={this.handleQuoteLogin} type='button'>login</button>
               </div>
               <section className='quote-box'>
                  <div className='quote-wrapper'>
                     <h1 className='quote'>{this.state.body}</h1>
                     <div className='author'>{this.state.author}</div>
                  </div>
                  <div className='btn-wrap'>
                     <button type='button' className='new-quote' onClick={this.fetchNewQuote}>Get New Quote</button>
                  </div>
               </section>
            </div>
         </form>
      )
   }
}

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()