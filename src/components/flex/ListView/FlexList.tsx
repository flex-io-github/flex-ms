import React from "react"
import { ISelection, Selection, SelectionZone, IContextualMenuItem } from "office-ui-fabric-react"
import FlexListItem, { IFlexListItem } from "./FlexListItem"
import { createListItems } from "../../../util/data"

interface IProps {
    items: any[]
    onItemListClick?: (item: any) => void
    title?: string
    headerActionButtons?: any[]
    moreActionButtons?: any[]
    itemActionButtons?: IContextualMenuItem[]
    enableSearch?: boolean //:TODO
    style?: any
    itemKeyField?: string
    itemSubNameField?: string
    itemNameField: string
}

type Props = IProps

interface State {
    _items: IFlexListItem[]
    selection: ISelection
}

export default class FlexList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this._onSelectionChanged = this._onSelectionChanged.bind(this)

        this.state = {
            _items: this.props.items,
            selection: new Selection({
                onSelectionChanged: this._onSelectionChanged,
            }),
        }
    }

    render() {
        const { selection, _items } = this.state
        const {
            onItemListClick,
            style,
            items,
            itemNameField,
            itemSubNameField,
        } = this.props
        return (
            <div style={style}>
                <div>{this.props.title}</div>
                <SelectionZone selection={selection}>
                    {items &&
                        items.map((item: any, index: number) => (
                            <FlexListItem
                                item={item}
                                key={index}
                                selection={selection}
                                onItemClick={(_item: any) => {
                                    this.props.onItemListClick!(item)
                                }}
                                itemSubNameField={itemSubNameField}
                                itemNameField={itemNameField}
                                actionButton={this.props.itemActionButtons}
                            />
                        ))}
                </SelectionZone>
            </div>
        )
    }

    _onSelectionChanged(): void {}
}
