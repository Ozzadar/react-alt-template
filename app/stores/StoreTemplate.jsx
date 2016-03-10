import alt from '../libs/alt'
import uuid from 'node-uuid'
import ActionsTemplate from '../actions/ActionsTemplate.jsx'

class StoreTemplate {
	
	constructor() {
		this.bindActions(ActionsTemplate)

		this.things = []
	}
	
	
	create(thing) {
		const things = this.things

		thing.id = thing.id

		this.setState({
			things: applications.concat(thing)
		})

		return thing
	}

	update(updatedThing) {
		const applications = this.applications.map(thing => {
			if (updatedThing.id === updatedThing.id) {
				return Object.assign({}, thing, updatedThing)
			}

			return thing
		})

		this.setState({applications})
	}

	delete(id) {
		this.setState({
			things: this.things.filter(thing => thing.id !== id)
		})
	}
}

export default alt.createStore(StoreTemplate, 'StoreTemplate')