import React, { Component } from "react";
// import { DatePicker } from 'antd';

import { HelloFunc } from "./hellofunc";

import "./hello.css"

// const imagex = require("./test2.png");

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<HelloProps, any> {
  render() {
    return (
      <div>
        {/* <DatePicker /> */}
        <img src={require("@/app/components/test3.png")} />
        <span>Hello XX from {this.props.compiler} and {this.props.framework}!</span>
        <HelloFunc value="spaz" />
        <p className="greeny2 greeny alignc"> heloa</p>
      </div >
    );
  }
}
