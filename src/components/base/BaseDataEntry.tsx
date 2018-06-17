import React from "react"
import BaseForm from "./BaseForm"
import {
    ActionButton,
    Layer,
    LayerHost,
    CommandBar,
} from "office-ui-fabric-react"
import { Link, Route } from "react-router-dom"
import { PageContent } from "../../styles/inline/PageContent"
import FlexList from "../../components/flex/ListView/FlexList"

export interface OriginalProps {
    initialValues: any
    list: any[]
    recordInfo?: any
    updateRecord: () => void
    loadRecord: (id: string | number) => void
    deleteRecord: (id: string | number) => void
    saveRecord: () => void
    itemNameField?: any
}

export interface FormComponentProps {
    initialValues: any
    discard: () => void
    save: (entity: any) => void
}

interface ExternalProps {
    style?: React.CSSProperties
}

interface IState {
    ShowNew: boolean
    Editing: boolean
    selectedRecord: any
}

export const withDataEntry = <P extends OriginalProps>(
    FormComponent: React.ComponentType<FormComponentProps>,
) => {
    type ResultProps = P & ExternalProps
    return class DataEntry extends React.Component<ResultProps, IState> {
        private hasMounted: boolean
        constructor(props: ResultProps) {
            super(props)

            this.state = {
                ShowNew: false,
                Editing: false,
                selectedRecord: this.props.recordInfo,
            }

            this._HideNewForm = this._HideNewForm.bind(this)
            this._HideEditing = this._HideEditing.bind(this)
            this.getContextualMenuItems = this.getContextualMenuItems.bind(this)
            this.hasMounted = false
        }

        componentDidMount() {
            this.hasMounted = true
        }

        // shouldComponentUpdate(nextProps: ResultProps, nextState: IState) {

        // }

        componentWillReceiveProps(nextProps: ResultProps) {
            if (nextProps.recordInfo != this.props.recordInfo) {
                this.setState({
                    ...this.state,
                    selectedRecord: nextProps.recordInfo,
                })
                // this.forceUpdate()
            }
        }

        _HideNewForm() {
            this.setState({ ...this.state, ShowNew: false })
        }

        _HideEditing() {
            this.setState({ ...this.state, Editing: false })
        }

        render(): JSX.Element {
            const { list, itemNameField } = this.props
            const { ShowNew, selectedRecord, Editing } = this.state

            return (
                <div style={PageContent.Page}>
                    <div style={PageContent.MainPage}>
                        <CommandBar
                            className=""
                            isSearchBoxVisible={false}
                            items={this.getContextualMenuItems()}
                        />
                        <FlexList
                            items={list}
                            style={PageContent.ListPage}
                            // title="Client"
                            onItemListClick={item => {
                                // this.props._selectedList(item.id)
                                // this.props.history.push(`/task/info/${item.id}`)
                                this.props.loadRecord(item.id)
                                this.setState({
                                    ...this.state,
                                    Editing: true,
                                    ShowNew: false,
                                })
                            }}
                            itemNameField={
                                itemNameField ? itemNameField : "name"
                            }
                            itemActionButtons={[
                                {
                                    key: "emailMessage",
                                    name: "Email message",
                                    icon: "Delete",
                                    onClick: (item: any | any) =>
                                        this.props.deleteRecord(item.id),
                                },
                                {
                                    key: "calendarEvent",
                                    name: "Calendar event",
                                    icon: "Calendar",
                                },
                            ]}
                        />
                    </div>

                    {this.hasMounted && (
                        <div style={PageContent.SubPage}>
                            {ShowNew && (
                                <FormComponent
                                    initialValues={this.props.initialValues}
                                    discard={this._HideNewForm}
                                    save={this.props.saveRecord}
                                />
                            )}
                            {Editing && (
                                <FormComponent
                                    initialValues={selectedRecord}
                                    discard={this._HideEditing}
                                    save={this.props.updateRecord}
                                />
                            )}
                        </div>
                    )}
                </div>
            )
        }
        getContextualMenuItems(): any {
            let cmdButtons = new Array()

            cmdButtons.push({
                key: "New",
                name: "New",
                icon: "Add",
                onClick: () => {
                    this.setState({
                        ...this.state,
                        ShowNew: true,
                        Editing: false,
                    })
                    // this.props.history.push("/task/new")
                },
            })

            return cmdButtons
        }
    }
}
