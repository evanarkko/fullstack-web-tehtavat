import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }

    const notification = (this.props.notification.length > 0) ?
        <div style={style}>
            {this.props.notification}
        </div> : ""
    return (
      <React.Fragment>
          {notification}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
