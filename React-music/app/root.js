import React from "react";
import {render} from "react-dom";
import Header from "./components/header.js";
import Progress from "./components/progress.js";
import Index from './index.js';
class Root extends React.Component{
  render(){
    return(
      <div>
        <Index />
      </div>
    );
  }
}
render(<Root />,document.getElementById('root'))
