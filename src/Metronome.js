import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';


class Metronome extends Component {
  constructor(props) {
    super(props);

    // set the state of Metronome
    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    };

    // Create Audio objects with the files Webpack loaded, and we'll play them later.
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  beatsPerMeasure = event => {
    const beatsPerMeasure = event.target.value;

    this.setState({ beatsPerMeasure });
  }

  startStop = () => {
    if(this.state.playing) {
      // stop the timer
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      // start the timer with the current BPM
      this.timer = setInterval(
        this.playClick, (60 / this.state.bpm) * 1000
      );
      this.setState(
        {
          count: 0,
          playing: true
          // Play a click "immediately" (after setState finishes)
        },
        this.playClick
      );
    }
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    // The first beat will have a different sound than the others
    if(count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    // Keep track of which beat we're on
    this.setState(state => ({
      count: (state.count +1) % state.beatsPerMeasure
    }));
  }

  handleBpmChange = event => {
    const bpm = event.target.value;

    if(this.state.playing) {
      // Stop the old timer and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      // Set the new BPM, and reset the beat counter
      this.setState({ count:0, bpm });
    } else {
      // Otherwise just update the BPM
      this.setState({ bpm });
    }
  }

  render() {
    // variables for beats per minute and if the player is going for not
    const { playing, bpm } = this.state;

    // display HTML for beats for minute slider
    return (
      <div className="metronome">
        <div className="bpm-slider">
          <h1>React Adjustable Metronome</h1>
          <div>{bpm} BPM</div>
          <input 
            type="range" 
            min="60" 
            max="240" 
            value={bpm} 
            onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
        <p>change beats per measure</p>
        <button onClick={this.beatsPerMeasure} value="2" className="beats">2</button>
        <button onClick={this.beatsPerMeasure} value="4" className="beats active">4</button>
        <button onClick={this.beatsPerMeasure} value="6" className="beats">6</button>
        <button onClick={this.beatsPerMeasure} value="8" className="beats">8</button>
      </div>
    );
  }
}

export default Metronome;