import React from 'react/addons';
import classnames from 'classnames';
const {CSSTransitionGroup} = React.addons;

export default class Cover extends React.Component {
	shouldComponentUpdate (nextProps, nextState) {
		return this.props.imageUri !== nextProps.imageUri || this.props.isErrored !== nextProps.isErrored;
	}

	render() {
		let classes = classnames('mp-cover', {
			'error' : this.props.isErrored
		})
		return (
			<div className={classes}>
				<div className="mp-cover__albumart">
					<img src={this.props.imageUri} alt={this.props.altText} />
				</div>
				<span className="mp-cover__banner">Now playing</span>
			</div>
		);
	}
}
