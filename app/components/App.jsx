//Base of all reality
import React from 'react'


import ComponentTemplate from './ComponentTemplate/ComponentTemplate.jsx'
//Flux Store Stuff
import AltContainer from 'alt-container'
import StoreTemplate from '../stores/StoreTemplate.jsx'
import ActionsTemplate from '../actions/ActionsTemplate.jsx'


//Functional Components
import request from 'request-json'

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			currentStore: StoreTemplate
		}
	}

	componentDidMount() {

	}

	
	render() {
		let value = StoreTemplate.getState().applications
		return (
			<div className='mainDiv'>
				<AltContainer 
					stores= {[StoreTemplate]}
					inject={{
						value: () => [value]
				}}
				>
				<ComponentTemplate />

				</AltContainer>
			</div>
		)
	}

}