import React, { Component } from "react";
// import { DatePicker } from 'antd';

import { HelloFunc } from "./hellofunc";
import { fib } from "./math";


import styles from "./hello.css"

// const imagex = require("./test2.png");

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<HelloProps, any> {
  render() {
    return (
      <div>
        {/* <DatePicker /> */}
        {fib(10)};

        <img src={require("@/app/components/test3.png")} />
        <span>Hello XX from {this.props.compiler} and {this.props.framework}!</span>
        <HelloFunc value="spaz" />
        <p className={`greeny ${styles.greeny}`} > heloa</p>
      </div >
    );
  }
}
