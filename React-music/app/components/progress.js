import React from "react";
import Logo from "../../static/images/logo.png";
import "../../static/css/common.css";
import "../../static/css/reset.css";
import '../css/header.css';
import '../css/progress.css';
import $ from "jquery";

export default class Progress extends React.Component{
  getDefaultProps(){
    barColor: 'rgb(47, 152, 66)'
  };
  changeProgress(e){
    let {progressBar} = this.refs;
    let progress =(e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    // console.log(progress);
    this.props.onProgressChange && this.props.onProgressChange(progress);
  }
  render(){
    return(
      <div className="components-progress" ref="progressBar" onClick={this.changeProgress.bind(this)}>
        <div className="progress" style={{width:`${this.props.progress}%`,background:this.props.barColor}}></div>
      </div>
    );
  }
}
