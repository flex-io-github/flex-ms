import React from "react"
import { connect } from "react-redux"
import { Dispatch, bindActionCreators } from "redux"
import { RootState } from "@src/features"
import { withDataEntry } from "../../components/base/BaseDataEntry"
import { IProjectInitialValues, IProject } from "../../service/models/IProject"
import { projectActions } from "../../features/entities/project"
import { ProjectForm } from './ProjectForm';

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



const WithDataEntry = withDataEntry(ProjectForm)

class projectPage extends React.Component<Props, {}> {
    // private MyDataEntry = withDataEntry(project)

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
                initialValues={IProjectInitialValues}
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
    list: state.appState.project.list.entities,
    recordInfo: state.appState.project.record,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            saveRecord: (entity: any) => projectActions.saveRecord(entity),
            fetchList: () => projectActions.fetchList(),
            loadRecord: (id: any) => projectActions.loadRecord(id),
            updateRecord: (entity: any) => projectActions.updateRecord(entity),
            deleteRecord: (id: any) => projectActions.deleteRecord(id),
        },
        dispatch,
    )

export const ProjectPage = connect<{}>(
    mapStateToProps,
    mapDispatchToProps,
)(projectPage)
