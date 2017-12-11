import React from "react";
import {render} from "react-dom";
import Header from "./components/header.js";
import Progress from "./components/progress.js";
import Player from "../page/player.js";
import $ from "jquery";
import jPlayer from 'jplayer';
import ListMusic from "../page/listmusic.js";
import {MUSIC_LIST} from '../config/musiclist.js';
import {Router,IndexRoute,Route,Link,hashHistory} from 'react-router';
import PubSub from "pubsub-js";
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      listMusic:MUSIC_LIST,
      currentMusicItem:MUSIC_LIST[0]
    }
     // console.log(this.state.currentMusicItem);
  }
  //播放音乐
  playMusic(musicItem){
    $('#player').jPlayer('setMedia',{
      mp3:musicItem.file
    }).jPlayer('play')
    this.setState({
      currentMusicItem :musicItem
    })
  }
  //下一曲
  playNext(type="next"){
    let index=this.findMusicIndex(this.state.currentMusicItem);
    let newIndex=null;
    let listMusicLength = this.state.listMusic.length;
    if(type=="next"){
      newIndex=(index+1)%listMusicLength;
    }else{
      newIndex=(index-1+listMusicLength)%listMusicLength;
    }
    this.playMusic(this.state.listMusic[newIndex]);
  }
  //查找音乐的位置
  findMusicIndex(musicItem){
    return this.state.listMusic.indexOf(musicItem);
  }
  componentDidMount(){
    $('#player').jPlayer({
        // ready:function () {
        //     $('#player').jPlayer('setMedia',{
        //         mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E6%88%90%E9%83%BD.mp3'
        //     }).jPlayer('play');
        // },
        supplied:'mp3',
        wmode:'window'
    });
    this.playMusic(this.state.currentMusicItem);
    //监听播放
    $('#player').bind($.jPlayer.event.ended,(e)=>{
      this.playNext();
    })
    //事件绑定
    PubSub.subscribe('DELETE_MUSIC',(msg,musicItem)=>{
      this.setState({
        listMusic:this.state.listMusic.filter(item=>{
          return item !==musicItem;
        })
      })
    });
    PubSub.subscribe('PLAY_MUSIC',(msg,musicItem)=>{
      this.playMusic(musicItem);
    });
    PubSub.subscribe('PLAY_PREV',(msg,musicItem)=>{
      this.playNext('prev');
    });
    PubSub.subscribe('PLAY_NEXT',(msg,musicItem)=>{
      this.playNext();
    });
  }

  componentWillUnMount(){
    //事件解绑
    PubSub.unsubscribe('DELETE_MUSIC');
    PubSub.unsubscribe('PLAY_MUSIC');
    PubSub.onsubscribe('PLAY_PREV');
    PubSub.onsubscribe('PLAY_NEXT');
    $('#player').unbind($.jPlayer.event.ended);
  }
  render(){
    return(
      <div>
        <Header />
        {/* <Player currentMusicItem={this.state.currentMusicItem} /> */}
        {React.cloneElement(this.props.children,this.state)}
        {/* <ListMusic currentMusicItem={this.state.currentMusicItem} listMusic={this.state.listMusic}  /> */}
      </div>
    );
  }
}

class Index extends React.Component{
  render(){
    return(
      <div>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Player}></IndexRoute>
            <Route path='list' component={ListMusic}></Route>
          </Route>
        </Router>
      </div>
    )
  }
}
export default  Index
