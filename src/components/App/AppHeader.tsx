import React from "react"
import "./style/AppHeader.scss"
import {
    TextField,
    IconButton,
    DirectionalHint,
    CommandBarButton,
    DefaultButton,
    ContextualMenuItemType,
    Persona,
    PersonaSize,
} from "office-ui-fabric-react"
import { AppHeaderLeft } from "./AppHeaderLeft"

interface IProps {
    className?: string
}

type Props = IProps

export class AppHeader extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props)

    }

    public render() {
        return (
            <div className={this.props.className}>
                <div style={AppHeaderStyle.Content}>
                    <div>
                        <AppHeaderLeft />
                    </div>
                    <div style={AppHeaderStyle.Right}>
                        <Persona
                            imageInitials="RM"
                            // text="Ronald Manzano"
                            size={PersonaSize.size28}
                            onClick={() => {}}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const _ContentStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
}
const _LeftStyle: React.CSSProperties = {}
const _RightStyle: React.CSSProperties = {
    marginLeft: "auto",
    cursor: "pointer",
    marginTop: "auto",
    marginBottom: "auto",
}

export const AppHeaderStyle = {
    Content: _ContentStyle,
    Left: _LeftStyle,
    Right: _RightStyle,
}
