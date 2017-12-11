import React from "react";
import '../css/musiclistitem.css';
import PubSub from "pubsub-js";
import {Link} from "react-router";
export default class MusicListItem extends React.Component{
        //点击播放
  playMusic(musicItem){
    //事件订阅
    PubSub.publish('PLAY_MUSIC',musicItem);
  }
  //删除歌曲
  deleteMusic(musicItem,e){
    e.stopPropagaton();
    PubSub.publish('DELETE_MUSIC',musicItem);
  }
  render(){
    let musicItem = this.props.musicItem;

    return(
      <div>
        <Link to="/">
          <li onClick={this.playMusic.bind(this,musicItem)} className={`components-listitem row${this.props.focus ? 'focus' : ''}`}>
            <p><strong>{musicItem.title}</strong>-{musicItem.artist}</p>
            <p onClick={this.deleteMusic.bind(this,musicItem)} className="-col-auto delete"></p>
          </li>
      </Link>
      </div>

    );
  }
}
