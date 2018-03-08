import React from 'react'
import {filterSet} from "../reducers/filterReducer";
import {connect} from 'react-redux'

class Filter extends React.Component {
    handleChange = (event) => {
        this.props.filterSet(event.target.value)
    }
    render() {
        const style = {
            marginBottom: 10
        }

        return (
            <div style={style}>
                filter <input onChange={this.handleChange}/>
            </div>
        )
    }
}

const ConnectedFilter = connect(null, {filterSet})(Filter)

export default ConnectedFilter