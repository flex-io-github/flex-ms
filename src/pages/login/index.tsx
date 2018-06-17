import * as React from "react"
import { connect } from "react-redux"
import { RootState, Dispatch } from "@src/features"
import { bindActionCreators } from "redux"
import { sessionActions } from "../../features/session"
import { sessionSelectors } from "../../features/session"
import { Error } from "../../features/session/types"
import { RouteComponentProps } from "react-router"
import { Fabric, TextField, autobind } from "office-ui-fabric-react"
import { DefaultButton } from "office-ui-fabric-react"

import "./login.scss"
import _ from 'lodash';

interface ReduxState {
  readonly error: Error
}

interface ReduxActions {
  readonly login: (username: string, password: string) => void
  // readonly receiveError: (errorText: string) => void
  // readonly clearError: () => void
}
// interface LoginPageProps extends RouteComponentProps<{}> {}

type Props = ReduxState & ReduxActions

// type LoginProps = ReduxState &
//     ReduxActions &
//     LoginPageProps &
//     RouteComponentProps<{}>

interface LoginState {
  readonly username: string
  readonly password: string
  readonly errorText: string
}

interface InputEvent {
  readonly target: {
    readonly name: string
    readonly value: string
  }
}

class LoginPage extends React.Component<Props, LoginState> {
  private _username: any

  constructor(props: ReduxState & ReduxActions) {
    super(props)
    this.state = {
      username: "",
      password: "",
      errorText: "",
    }
  }
  @autobind
  setValueToState(propertyName: string, value: string) {

    this.setState({ ...this.state, [propertyName]: value })
  }

  componentDidMount(){
    if (this._username){
      this._username.focus();
    }
  }
  componentWillReceiveProps(nextProps: ReduxState & ReduxActions): void {
    if (nextProps.error.errorText !== this.props.error.errorText) {
      this.setState({ errorText: nextProps.error.errorText })
    }
  }

  login = () => {
    const { username, password } = this.state
    this.props.login(username, password)
  }
  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <h1>Log In</h1>

          <div className="login-form-container">
            <TextField
              autoFocus={true}
              placeholder="Username"
              onChanged={e => this.setValueToState("username", e)}
              value={this.state.username}
            />
            <br />
            <TextField
              type="password"
              className="login-c"
              name={"password"}
              onChanged={e => this.setValueToState("password", e)}
              value={this.state.password}
              placeholder="Password"
            />
            <br />
            <DefaultButton
              style={{height: '3em'}}
              className="login-c"
              onClick={this.login}
              text="Login"
              primary={true}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState): ReduxState => ({
  error: state.session.error,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      login: (username, password) => sessionActions.login(username, password),
    },
    dispatch,
  )

export default connect<ReduxState>(mapStateToProps, mapDispatchToProps)(
  LoginPage,
)
