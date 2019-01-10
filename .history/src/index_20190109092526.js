import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
// import Quote from './Quote'
import * as serviceWorker from './serviceWorker'


class App extends Component {
   constructor() {
      super()
      this.state = {
         body: '',
         author: '',
         newquote: []
      }
   }

   componentDidMount() {
      fetch(`https://favqs.com/api/qotd`)
         .then(res => res.json())
         .then(json => this.setState({ body: json.quote.body, author: json.quote.author }))
   }
   fetchhNewQuote = () => {
      fetch(`https://favqs.com/api/qotd`)
         .then(res => res.json())
         .then(json => this.setState({ newquote: json }))
   }
   GetFavorites = () => {
      fetch(`https://favqs.com/api/qotd`)
         .then(res => res.json())
         .then(json => this.setState({ newquote: json }))
   }

   render() {
      return (
         <form className='Wrapper'>
            <h1>Quotes</h1>
            <div>
               <div>
                  <h4>Login</h4>
                  <input type="string" placeholder="enter email"></input>
               </div>
               <section className='quote-box'>
                  <div className='quote-wrapper'>
                     <h1 className='quote'>{this.state.body}</h1>
                     <div className='author'>{this.state.author}</div>
                  </div>
                  <div className='btn-wrap'>
                     <button className='new-quote' onClick={this.fetchhNewQuote}>Get New Quote</button>
                     <button className='new-quote' onClick={this.fetchhNewQuote}>Save Favorite Quote</button>
                  </div>
               </section>
            </div>
         </form>
      )
   }
}

ReactDOM.render(<App />, document.getElementById('root'))
serviceWorker.unregister()