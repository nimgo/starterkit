import React, { Component } from "react";
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

import { HelloFunc } from "./hellofunc";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<HelloProps, any> {
  render() {
    return (
      <div>
        <DatePicker />
        <span>Hello from {this.props.compiler} and {this.props.framework}!</span>
        <HelloFunc value="spaz" />
      </div>
    );
  }
}
