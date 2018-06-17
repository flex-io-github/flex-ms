import React from "react"
import { withRouter, RouteComponentProps } from "react-router"
import { Nav, INavLink } from "office-ui-fabric-react"
import { AppState } from "../../components/App/AppState"

interface IProps {
  className: string
}

type Props = IProps & RouteComponentProps<{}>

interface IState {
  readonly selectedKey: string | any
}

class appNav extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      selectedKey: "",
    }
  }

  render() {
    const { selectedKey } = this.state
    return (
      <div className={this.props.className}>
        <Nav
          groups={[
            {
              links: AppState.pages,
            },
          ]}
          expandedStateText={"expanded"}
          collapsedStateText={"collapsed"}
          selectedKey={selectedKey}
          onLinkClick={(ev: React.MouseEvent<HTMLElement>, item?: INavLink) => {
            ev.preventDefault()
            if (item && item.title != 'no-select') {
              this.props.history.push(item.url);
              this.setState({ ...this.state, selectedKey: item.key })
            }
          }}
        />
      </div>
    )
  }
}

export const AppNav = withRouter(appNav);