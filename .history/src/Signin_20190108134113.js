import React from 'react'
import { Link } from 'react-router-dom'
import '../style/App.css'
class Signin extends Component {
   render() {
      return (
         <div className="App">
            <form>
               <label>
                  Email:
               <input type="text" name="name" />
               </label>
               <button class="btn">
                  <span class="badge badge-primary" input type="submit" value="Submit" > login </span>
               </button>
            </form>
         </div>
      )
   }
}
export default Signin