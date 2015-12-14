import React from 'react/addons';

import shallowEqual from '../utils/shallowEqual';

export default class AudioElement extends React.Component {

	shouldComponentUpdate (nextProps, nexState) {
		return !shallowEqual(this.props.sources, nextProps.sources);
	}

	componentDidUpdate () {
		this.props.loadSource();
	}

	render () {
		let sources = this.props.sources; 
		return (
			<div>
				<audio>
				{
					sources.map(s=> <source key={s.src} src={s.src} type={s.type}/>)
				}
				</audio>
			</div>
		);
	}
}