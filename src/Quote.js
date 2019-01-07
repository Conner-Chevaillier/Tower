import React, { Component } from 'react';
import './App.css';

class Quote extends Component {
   constructor() {
      super();


   }
   Quotes = props => (
      render() {

   return (

      < div >
         <section className="quote-box">
            <div className="quote-wrapper">
               <span className="quote-mark">&ldquo;</span>
               <h1 className="quote">
                  {this.props.quote}
               </h1>

               <div className="author">
                  {this.props.author}
               </div>
            </div>
            <div className="btn-wrap">
               <button className="new-quote" onClick={this.props.fetchQuote}>Get New Quote</button>
            </div>
         </section>
      </div >
   )
}
}

export default Quote;