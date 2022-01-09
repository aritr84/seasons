// import react and reactDOM

import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

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
  // method 1 - state iniltialization inside constructor -
  // constructor(props) {
  //   super(props); //required

  //   // initialize the state object
  //   // only single time when we do direct assignment
  //   this.state = {
  //     lat: null,
  //     errorMessage: "",
  //   };
  // }

  // method 2 -
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
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

  // helper function -
  renderContent() {
    // conditional rendering -
    if (this.state.errorMessage && !this.state.lat) {
      return <div> Error: {this.state.errorMessage} </div>;
    }

    if (this.state.lat && !this.state.errorMessage) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner message="Please accept location Request" />;
  }

  // React says we have to define render
  render() {
    // return <div> Latitude: {this.state.lat} </div>;
    return <div className="">{this.renderContent()}</div>;
  }
}

// render using reactDOM

ReactDOM.render(<App />, document.querySelector("#root"));
