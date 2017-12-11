import React from "react";
import {render} from "react-dom";
import Header from "../app/components/header.js";
import Progress from "../app/components/progress.js";
import $ from "jquery";
import jPlayer from 'jplayer';
import '../app/css/player.css';
import {Link} from "react-router";
import PubSub from "pubsub-js";
export default class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      //设置播放进度
      progress: 0,
      //设置音量
      volume:0,
      //播放状态
      isplay:true,
      //剩余时间
      leftTime:''

    }
    this.duration = 0;
  }

  componentDidMount() {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      //获取到音频的总时长
      this.duration = e.jPlayer.status.duration;
      this.setState({
        //获取音量值
        volume:e.jPlayer.options.volume * 100,
        //获取播放进度
        progress: e.jPlayer.status.currentPercentAbsolute,
        leftTime:this.formatTime(this.duration*(1-e.jPlayer.status.currentPercentAbsolute/100))
      });
    })
  }
  //定义回调函数来调整播放进度/时间
  componentWillUnMount() {
    $('#player').unbind($.jPlayer.event.timeupdate);
  }

  progressChangeHandler(progress) {
    $('#player').jPlayer(this.state.isplay?'play':'pause', this.duration * progress);
    // console.log(progress);
  }
  //控制音量的函数
  changeVolumeHandler(progress){
    $('#player').jPlayer('volume',progress);
  }
  //控制播放状态
  play(){
    if(this.state.isplay){
      $('#player').jPlayer('pause');
    }else{
      $('#player').jPlayer('play');
    }
    //更新状态
    this.setState({
      isplay:!this.state.isplay
    });
  }
  //上一曲
  playPrev(){
    PubSub.publish('PLAY_PREV');
  }
  playNext(){
    PubSub.publish('PLAY_NEXT');
  }

  //格式化剩余时间
  formatTime(time){
    time=Math.floor(time);
    //获取分钟数
    let miniutes=Math.floor(time/60);
    //获取秒数
    let  seconds = Math.floor(time%60);
    seconds = seconds < 10 ?'0${seconds}' : seconds
    return `${miniutes}:${seconds}`;
  }
  render() {
    return (<div className="player-page">
      {/* <Progress progress={this.state.progress} barColor="red" onProgressChange={this.progressChangeHandler.bind(this)}/> */}
      <h1 className="caption">
        <Link to="/list">我的私人音乐坊</Link>
      </h1>
      <div className="mt20 row">
        <div className="controll-wrapper">
          <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
          <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
          <div className="row mt20">
            <div className="left-time -col-auto">{this.state.leftTime}</div>
            <div className="volume-container">
              <i className="icon-volume rt" style={{
                  top: 5,
                  left: -5
                }}></i>
              <div className="volume-wrapper">
                <Progress progress={this.state.volume}  onProgressChange={this.changeVolumeHandler.bind(this)} />
              </div>
            </div>
          </div>
          <div style={{
              height: 10,
              lineHeight: '10px'
            }}>
            <Progress progress={this.state.progress} barColor="red" onProgressChange={this.progressChangeHandler.bind(this)}/>
          </div>
          <div className="mt35 row">
            <div>
              <i className="icon prev" onClick={this.playPrev}></i>
              <i className={`icon ml20 ${this.state.isplay ? 'pause' : 'play'}`}  onClick={this.play.bind(this)}></i>
              <i className="icon next ml20" onClick={this.playNext}></i>
            </div>
            <div className="-col-auto">
              <i className="icon repeat-cycle"></i>
            </div>
          </div>
        </div>
        <div className="-col-auto cover">
          <img style={{"padding-left":"30px"}} src={this.props.currentMusicItem.cover} alt="音乐图片"/>
        </div>
      </div>
    </div>);
  }
}
