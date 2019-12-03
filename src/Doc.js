import React from 'react';
import ReactDOM from 'react-dom'


class Doc extends React.Component{
  componentDidMount(){
    document.title = "React Adjustable Metronome"
  }

  render(){
    return( true );
  }
}

ReactDOM.render(<Doc />, document.getElementById('root'));