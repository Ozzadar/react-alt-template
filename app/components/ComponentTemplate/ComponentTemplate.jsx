import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class ComponentTemplate extends React.Component {
	constructor(props) {
		super(props)
		
		//import the value from Alt Store
		const {value} = this.props
	}

	componentWillMount() {

	}

	render() {
		return (
			<div>
				{this.props.value}
			</div>
			)

	}
}