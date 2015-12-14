import React from 'react/addons';
import classnames from 'classnames';

export default class Progressbar extends React.Component {
	render () {
		let classes = classnames('mp-progress', {
			'loading' : this.props.isLoading
		});
		let progressStyle = {
			width: '' + this.props.percentComplete*100 + '%'
		};
		return (
			<span className={classes}>
      			<span className="mp-progress__bar" style={progressStyle}></span>
    		</span>
		);
	}
}