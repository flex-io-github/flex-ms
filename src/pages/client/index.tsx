import React from "react"
import { connect } from "react-redux"
import { Dispatch, bindActionCreators } from "redux"
import { RootState } from "@src/features"
import BaseForm from "../../components/base/BaseForm"
import { withDataEntry } from "../../components/base/BaseDataEntry"
import { IClientInitialValues, IClient } from "../../service/models/IClient"
import { FormComponentProps } from "../../components/base/BaseDataEntry"
import { TextField, PrimaryButton } from "office-ui-fabric-react"
import { DefaultButton } from "office-ui-fabric-react/lib"
import { clientActions } from "../../features/entities/client"

interface IProps {}

interface ReduxActions {
    saveRecord: () => void
    fetchList: () => void
    loadRecord: () => void
    updateRecord: () => void
    deleteRecord: () => void
}

interface ReduxState {
    list: any[]
    recordInfo: any
}

type Props = IProps & ReduxActions & ReduxState

class BaseClient extends BaseForm<IClient> {}

const Client: React.SFC<FormComponentProps> = props => {
    const { initialValues, discard, save } = props

    return (
        <div>
            <BaseClient
                save={save}
                discard={discard}
                initialValues={initialValues}
                FormComponent={({ fields: { name }, onChange }) => (
                    <div>
                        <TextField
                            label="Name"
                            value={name}
                            onChanged={e => onChange("name", e)}
                        />
                    </div>
                )}
            />
        </div>
    )
}

const WithDataEntry = withDataEntry(Client)

class clientPage extends React.Component<Props, {}> {
    // private MyDataEntry = withDataEntry(Client)

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchList()
    }

    render() {
        const { list } = this.props
        return (
            <WithDataEntry
                initialValues={IClientInitialValues}
                saveRecord={this.props.saveRecord}
                list={list}
                loadRecord={this.props.loadRecord}
                updateRecord={this.props.updateRecord}
                recordInfo={this.props.recordInfo}
                deleteRecord={this.props.deleteRecord}
            />
        )
    }
}

const mapStateToProps = (state: RootState): ReduxState => ({
    list: state.appState.client.list.clients,
    recordInfo: state.appState.client.record,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            saveRecord: (entity: any) => clientActions.saveRecord(entity),
            fetchList: () => clientActions.fetchList(),
            loadRecord: (id: any) => clientActions.loadRecord(id),
            updateRecord: (entity: any) => clientActions.updateRecord(entity),
            deleteRecord: (id: any) => clientActions.deleteRecord(id),
        },
        dispatch,
    )

export const ClientPage = connect<{}>(
    mapStateToProps,
    mapDispatchToProps,
)(clientPage)
