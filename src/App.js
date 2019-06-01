import React, { Component } from 'react';
import List from './List.js';

class App extends Component {
  render(){
 
    return (
       <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <h1 className="text-center">Compras</h1>
            </div>
            <List/>
          </div>
       </div> 
 
  );
}
}
export default App;
