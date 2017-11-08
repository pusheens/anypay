import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

import { BrowserRouter, Route, withRouter } from 'react-router-dom'

import Phone from './components/Phone'
import AddBankAccount from './containers/AddBankAccount'
import Home from './containers/Home'
import Login from './containers/Login'
import SendMoney1 from './containers/SendMoney1'
import SendMoney2 from './containers/SendMoney2'
import SendMoney3 from './containers/SendMoney3'
import Signup1 from './containers/Signup1'
import Signup2 from './containers/Signup2'
import Signup3 from './containers/Signup3'
import Signup4 from './containers/Signup4'
import Signup5 from './containers/Signup5'
import Signup6 from './containers/Signup6'

import './firebase'

class PrimaryLayout extends React.Component {
  render() {
    return (
      <Phone>
        <Route path='/' exact component={Login} />

        <Route path='/signup1' name='signup1' component={Signup1} />
        <Route path='/signup2' name='signup2' component={Signup2} />
        <Route path='/signup3' name='signup3' component={Signup3} />
        <Route path='/signup4' name='signup4' component={Signup4} />
        <Route path='/signup5' name='signup5' component={Signup5} />
        <Route path='/signup6/:number' name='signup6' component={Signup6} />

        <Route path='/home' name='home' component={Home} />
        <Route path='/bankAccount' name='bankAccount' component={AddBankAccount} />

        <Route path='/sendmoney1' name='sendmoney1' component={SendMoney1} />
        <Route path='/sendmoney2/:receiver/:photoUrl' name='sendmoney2' component={SendMoney2} />
        <Route path='/sendmoney3' name='sendmoney3' component={SendMoney3} />
      </Phone>
    )
  }
}

const PrimaryWithRouter = withRouter(PrimaryLayout)

const root = document.getElementById('root')

ReactDOM.render(
  <BrowserRouter>
    <PrimaryWithRouter />
  </BrowserRouter>,
  root
)
