import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = { cities: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.setCities();
  }

  setCities() {
    const cities = ["Fairfax", "Vienna", "Falls Church", "Arlington"];
    this.setState({ cities });
  }

render() {
const { cities } = this.state;

    return (
      <div className="App">
        {/* Render the cities*/}
          <div>
            <h1>Cities</h1>
            <ul className="cities">
              {cities.map((city, index) =>
                <li key={index}>
                  {city}
                </li>
              )}
            </ul>
          </div>
          </div>
      );    
  }
}


export default App;
