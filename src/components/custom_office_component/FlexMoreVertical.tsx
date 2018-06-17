import React from "react"
import { IconButton, IButtonProps, Icon } from "office-ui-fabric-react"

export const FlexMoreVertical: React.SFC<IButtonProps> = (props) => {

  return <IconButton onRenderMenuIcon={_onRenderMenuIcon} {...props} />

  function _onRenderMenuIcon(props: IButtonProps): JSX.Element | null {
    return <Icon iconName="MoreVertical" />
  }
}


