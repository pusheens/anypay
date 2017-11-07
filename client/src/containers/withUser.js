import React from 'react'
import firebase from 'firebase'

export default function(Component) {
  return class extends React.Component {
    state = {
      data: {},
      record: {}
    }

    unsubscribeFromData = null
    unsubscribeFromRecord = null

    componentDidMount() {
      // set record with user if already loaded
      this.setRecord(firebase.auth().currentUser)
      // otherwise wait for change in user
      this.unsubscribeFromRecord = firebase.auth().onAuthStateChanged(user => {
        this.setRecord(user)
      })
    }

    componentWillUnmount() {
      if (this.unsubscribeFromData) this.unsubscribeFromData()
      if (this.unsubscribeFromRecord) this.unsubscribeFromRecord()
    }

    setRecord(record) {
      // set record, or set to empty object on null
      this.setState({ record: record || {} })
      // unsubscribe as we will be resubbing to new user, or not subbing at all
      if (this.unsubscribeFromData) {
        this.unsubscribeFromData()
      }
      if (record) {
        // get reference to user in database
        const ref = firebase.database().ref('users').child(record.uid)
        // take snapshot of data on intial and on change
        ref.on('value', snapshot => this.setState({ data: snapshot.val() || {} }))
        // save reference to record to unsubscribe
        this.unsubscribeFromData = () => ref.off()
      } else {
        // clear data if no user is signed in
        this.setState({ data: {} })
      }
    }

    render() {
      return <Component {...this.props} user={this.state} />
    }
  }
}