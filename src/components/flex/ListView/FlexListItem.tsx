import React from "react"
import {
    ISelection,
    IContextualMenuItem,
    IconButton,
} from "office-ui-fabric-react"
// import Radium from "radium"
import { FontWeights } from "@uifabric/styling"
import * as format from "Util/format"

// let Style = Radium.Style

export interface IFlexListItem {
    key: string | number
    name: string
    subName: string
    description: string
}


export interface IProps {
    item: any
    itemNameField: string
    itemSubNameField?: string
    itemDescriptionField?: string
    itemIndex?: number
    selection?: ISelection
    actionButton?: IContextualMenuItem[]
    onItemClick?: (item: any) => void
}

type Props = IProps

export default class FlexListItem extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props)
    }

    render(): JSX.Element {
        const {
            item,
            itemIndex,
            selection,
            itemNameField,
            itemSubNameField,
            itemDescriptionField,
            actionButton,
        } = this.props


        return (
            <div>
                {selection && (
                    <div style={getStyles.item}>
                        {/* <ItemIcon /> */}
                        <div style={getStyles.itemContent}>
                            <div style={{ display: "flex" }}>
                                <div
                                    style={getStyles.title}
                                    onClick={() => {
                                        if (this.props.onItemClick)
                                            this.props.onItemClick(item)
                                    }}
                                >
                                    {item[itemNameField]}
                                </div>
                                <div style={{ marginLeft: "auto" }}>
                                    {actionButton &&
                                        actionButton.map((value, index) => (
                                            <IconButton
                                                key={index}
                                                iconProps={{
                                                    iconName: value.icon,
                                                    style: { fontSize: "18px" },
                                                }}
                                                onClick={() => value.onClick && value.onClick(item)}
                                            />
                                        ))}
                                </div>
                            </div>
                            <div style={getStyles.subTitle}>
                                {itemSubNameField && item[itemSubNameField]
                                    ? format.getFormatDate(
                                          item[itemSubNameField],
                                      )
                                    : item.subName
                                        ? format.getFormatDate(item.subName)
                                        : null}
                            </div>
                            <div>
                                {itemDescriptionField &&
                                item[itemDescriptionField]
                                    ? item[itemDescriptionField]
                                    : item.description
                                        ? item.description
                                        : null}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    // ItemIcon = () => {
    //     return <div style={FlexListItemStyle.icon}>{this.props.item}</div>
    // }

    MoreActionButton = (style?: React.CSSProperties) => {
        return <div style={style} />
    }
}

const _item: React.CSSProperties = {
    borderBottom: "1px solid #c2c2c2",
    padding: 10,
    display: "flex",
    cursor: "default",
    ":hover": {
        backgroundColor: "#EEE",
        display: "block",
    },
}
const _icon: React.CSSProperties = {}
const _title: React.CSSProperties = {
    cursor: "pointer",
    color: "#0088FF",
    marginRight: "auto",
    fontWeight: "bold",
    ":hover": {
        textDecoration: "underline",
    },
}
const _subTitle: React.CSSProperties = {
    color: "#c2c2c2",
    fontSize: 11,
    marginBottom: 10,
}
const _itemContent: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
}

const getStyles = {
    item: _item,
    icon: _icon,
    title: _title,
    subTitle: _subTitle,
    itemContent: _itemContent,
}
