import React from "react"
import { connect } from "react-redux"
import { Dispatch, bindActionCreators } from "redux"
import { RootState } from "@src/features"
import { withDataEntry } from "../../../components/base/BaseDataEntry"
import { ITaskInitialValues, ITask } from "../../../service/models/ITask"
import { TaskForm } from '../TaskForm';
import { taskActions } from '../../../features/entities/task';

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



const WithDataEntry = withDataEntry(TaskForm)

class taskPage extends React.Component<Props, {}> {
    // private MyDataEntry = withDataEntry(task)

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
                initialValues={ITaskInitialValues}
                saveRecord={this.props.saveRecord}
                list={list}
                loadRecord={this.props.loadRecord}
                updateRecord={this.props.updateRecord}
                recordInfo={this.props.recordInfo}
                deleteRecord={this.props.deleteRecord}
                itemNameField='subject'
            />
        )
    }
}

const mapStateToProps = (state: RootState): ReduxState => ({
    list: state.appState.task.list.entities,
    recordInfo: state.appState.task.record,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            saveRecord: (entity: any) => taskActions.saveRecord(entity),
            fetchList: () => taskActions.fetchList(),
            loadRecord: (id: any) => taskActions.loadRecord(id),
            updateRecord: (entity: any) => taskActions.updateRecord(entity),
            deleteRecord: (id: any) => taskActions.deleteRecord(id),
        },
        dispatch,
    )

export const TaskPage = connect<{}>(
    mapStateToProps,
    mapDispatchToProps,
)(taskPage)
