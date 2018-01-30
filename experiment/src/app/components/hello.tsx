import React, { Component } from "react";
// import { DatePicker } from 'antd';

import { HelloFunc } from "./hellofunc";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<HelloProps, any> {
  render() {
    return (
      <div>
        {/* <DatePicker /> */}
        <img src="../../resources/imgs/test.png" />
        <span>Hello from {this.props.compiler} and {this.props.framework}!</span>
        <HelloFunc value="spaz" />
      </div>
    );
  }
}
