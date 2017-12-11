import React from "react";
import MusicListItem from "../app/components/musiclistitem.js";
import '../app/css/musiclistitem.css';

export default class ListMusic extends React.Component{

  render() {
        let currentItem = this.props.currentMusicItem;
        console.log(currentItem);
        let Items = this.props.listMusic.map(function(item){
          return(
            <div>
                <MusicListItem
                        focus={currentItem == item}
                        key={item.id}
                        musicItem={item}
                    >{item.title}</MusicListItem>
              </div>
          );
        });
        return (
            <div>
              
              <ul>
                  {Items}
              </ul>
            </div>
        );
    }
}
