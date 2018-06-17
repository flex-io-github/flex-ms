import React from "react"
import { IconButton, Label, Callout, ITheme, IFontStyles, createTheme, getTheme } from "office-ui-fabric-react"

interface IProps {
  className?: string
}

interface IState {
  isCalloutVisible: boolean
}

type Props = IProps

export class AppHeaderLeft extends React.Component<Props, IState> {
  private _menuButtonElement: HTMLElement | null

  constructor(props: Props) {
    super(props)
    // this._menuButtonElement = new HTMLElement;
    this.state = {
      isCalloutVisible: true,
    }

  }

  render() {
    const { isCalloutVisible } = this.state
    return (
      <div className={this.props.className}>
        <span>
          <div ref={(iconButton) => this._menuButtonElement = iconButton}>
            <IconButton style={{color: 'silver'}} iconProps={{ iconName: "AppIconDefault" }} />
          </div>

        </span>
      </div>
    )
  }
}
