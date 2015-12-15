import React from 'react/addons';
import classnames from 'classnames';

import Progressbar from './progressBar';

export default class Controls extends React.Component {
	render() {
		let track = this.props.track;
		let playButtonClass = classnames('mp-control__button fa', {
			'fa-play icon-play' : !this.props.isPlaying,
			'fa-pause icon-pause' : this.props.isPlaying
		});

		return (
			<div className="mp-control">
				<div className="mp-control__meta">
					<span className="mp-control__song_name">{track.name}</span>
					<span className="mp-control__filler">by</span>
					<span className="mp-control__song_artist">{track.artist}</span>
				</div>
				<Progressbar isLoading={this.props.isLoading} percentComplete={this.props.percentComplete}/>
				<div className="mp-control__actions">
					<button className="mp-control__button small fa fa-backward icon-backward" onClick={this.props.prevSong.bind(this)}></button>
					<button className={playButtonClass} onClick={this.props.togglePlayPause.bind(this)}></button>
					<button className="mp-control__button small fa fa-forward icon-forward" onClick={this.props.nextSong.bind(this)}></button>
				</div>
			</div>
		);
	}
}
