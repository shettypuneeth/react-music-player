import React from 'react/addons';

import Cover from './cover';
import Controls from './controls';
import AudioElement from './audio';

const {CSSTransitionGroup} = React.addons; 

export default class Player extends React.Component {
  constructor(props){
    super(props);
    this.audioPlayerStates = {
      Ready: 0,
      Playing: 1,
      Loading: 2,
      Error: 3
    };
    this.songs = this.props.songs;
    this.currentSongIndex = 1;
    this.playerState = -1;
    this.wasPlaying = false;
    this.__indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
    this.audioPlayerEvents = ["abort", "error", "play", "playing", "seeked", "pause", "ended", "canplay", "loadstart", "loadeddata", "canplaythrough", "seeking", "stalled", "waiting", "progress"];
    this.state = {
      isLoading : false,
      percentComplete : 0,
      isErrored : false,
      isPlaying: false,
      song : this.songs[this.currentSongIndex]
    };
  }

  componentDidMount () {
    //register for events and set local variable;
    let _ref = React.findDOMNode(this.refs.audioPlayer);
    this.player = (_ref !== null ? _ref.querySelector('audio') : null);
    if(this.player)
      this._bindEvents();
  }

  componentDidUnmount () {
    if(this.player)
      this._unbindEvents();
  }

  _bindEvents () {
    let _ref, _i, _len, eventName;
    _ref = this.audioPlayerEvents;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      eventName = _ref[_i];
      this.player.addEventListener(eventName, this);
    }
    return this.player.addEventListener("timeupdate", this);
  }

  _unbindEvents () {
    let _ref, _i, _len, eventName;
    _ref = this.audioPlayerEvents;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      eventName = _ref[_i];
      this.player.removeEventListener(eventName, this);
    }
    return this.player.removeEventListener("timeupdate", this);
  }

  _timeUpdate () {
    if(!this._isLoading()){
      let completed = this._percentCompleted();
      this.setState({
        percentComplete : completed
      });
    }
  }

  _percentCompleted () {
    let number;
    number = ~~((this.player.currentTime / this.player.duration) * 10000);
    return number / 10000;
  }

  _togglePlayPause () {
    if (this._isPlaying()) {
      return this._pause();
    }
    else {
      return this._play();
    }
  }

  _goToSong (index) {
    this.currentSongIndex = index;
    this.setState({
      song : this.songs[this.currentSongIndex],
      percentComplete : 0
    });
  }

  _nextSong () {
    if (this.currentSongIndex === this.songs.length - 1){
      return this._goToSong(0);
    } else {
      return this._goToSong(this.currentSongIndex + 1);
    }
  }

  _previousSong () {
    if (this.currentSongIndex === 0) {
      return this._goToSong(this.songs.length - 1);
    } else {
      return this._goToSong(this.currentSongIndex - 1);
    }

  }

  _load () {
    if (this.player) {
      this.player.load();
      if(this.wasPlaying){
        this._play();
        this._updateAudioPlayerState();
      }
    }

  }

  _isPlaying () {
    return this.player && !this.player.paused;
  };

  _isPaused () {
    return this.player && this.player.paused;
  }

  _isLoading () {
    if (this._isEmpty()) {
      return false;
    }
    return this.player.networkState === this.player.NETWORK_LOADING && this.player.readyState < this.player.HAVE_FUTURE_DATA;
  }

  _isEmpty () {
    return this.player.readyState === this.player.HAVE_NOTHING;
  }

  _isErrored () {
    return this.player.error || this.player.networkState === this.player.NETWORK_NO_SOURCE;
  }

  _play () {
    if (this._isEmpty()) {
      this._updateAudioPlayerState();
    } 
    this.wasPlaying = true;
    return this.player.play();
  }

  _pause() {
    this.wasPlaying = false;
    return this.player.pause();
  }

  _updateStateEventHandler (e) {
    let state;
    state = this._isErrored() ? this.audioPlayerStates.Error : this._isLoading() ? this.audioPlayerStates.Loading : this._isPlaying() ? this.audioPlayerStates.Playing : this.audioPlayerStates.Ready;
    if (this.playerState !== state) {
      this.playerState = state;
      return this.player !== null ? this._updateAudioPlayerState(state) : void 0;
    }
  }

  _updateAudioPlayerState (state) {
    this.setState({
      isErrored : this._isErrored.call(this),
      isLoading : this._isLoading.call(this),
      isPlaying : this._isPlaying.call(this)
    });
  }

  /*
   * Main event handling method. Listens to all the audio player events and calls the _updateStateEventHandler method
  */
  handleEvent (event) {
    var _ref;
    if (_ref = event.type, this.__indexOf.call(this.audioPlayerEvents, _ref) >= 0) {
      return this._updateStateEventHandler(event);
    } else if (event.type === "timeupdate") {
      return this._timeUpdate(event);
    }
  } 

  render () {
    return(
      <section className="mp-player">
        <Cover key={this.state.song.id} imageUri={this.state.song.image} altText={this.state.song.album} isErrored={this.state.isErrored}/>
        <Controls track={this.state.song} 
          togglePlayPause={this._togglePlayPause.bind(this)} isLoading={this.state.isLoading} 
          percentComplete={this.state.percentComplete} isPlaying={this.state.isPlaying}
          nextSong={this._nextSong.bind(this)} prevSong={this._previousSong.bind(this)}/>
        <AudioElement ref="audioPlayer" sources={this.state.song.srcs} loadSource={this._load.bind(this)}/>
      </section>
    );
  }
}