// import react and reactDOM

import React from "react";
import ReactDOM from "react-dom";

// create a component
//functional component -
// const App = () => {
//   window.navigator.geolocation.getCurrentPosition(
//     (position) => console.log(position),
//     (err) => console.log(err)
//   );
//   return <div></div>;
// };

// class component

class App extends React.Component {
  // same as any other constructor - will be called automatically when instance of App is created
  constructor(props) {
    super(props); //required

    // initialize the state object
    // only single time when we do direct assignment
    this.state = {
      lat: null,
      errorMessage: "",
    };

    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ lat: position.coords.latitude });

        // we never call like this -
        // this.state.lat = position.coords.latitude;
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  componentDidMount() {
    console.log("My component was rendered to the screen");
  }
  componentDidUpdate() {
    console.log("My component was re rendered to the screen");
  }
  // React says we have to define render
  render() {
    // return <div> Latitude: {this.state.lat} </div>;

    // conditional rendering -
    if (this.state.errorMessage && !this.state.lat) {
      return <div> Error: {this.state.errorMessage} </div>;
    }

    if (this.state.lat && !this.state.errorMessage) {
      return <div> Latitude: {this.state.lat} </div>;
    }
    return <div>Loading ...</div>;
  }
}

// render using reactDOM

ReactDOM.render(<App />, document.querySelector("#root"));
