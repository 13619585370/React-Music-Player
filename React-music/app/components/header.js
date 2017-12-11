import React from "react";
import Logo from "../../static/images/logo.png";
import "../../static/css/common.css";
import "../../static/css/reset.css";
import '../css/header.css';

export default class Header extends React.Component{
  render(){
    return(
      <div className="components-header row">
        <img src={Logo} width="40px" alt="" className="-col-auto"/>
        <h1 className="caption">音乐播放器</h1>
      </div>
    );
  }
}
