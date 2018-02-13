import React from "react";
import { Hello } from "./components/Hello";

// 'AppProps' describes the shape of props.
// State is never set so we use the 'any' type.
export class App extends React.Component<any, any> {
  render() {
    return (
      <div>
        <p className="text-success"> excellent</p>
        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
        <Hello compiler="funny bizz" framework="React" />
        
      </div>
    );
  }
}
