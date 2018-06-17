import React from "react"
import { Omit } from "utility-types"
import { RootState } from "@src/features"
import { connect } from "react-redux"
import * as LU from "../../data/lookup"

interface ReduxState {
    lookupProjects: any[]
    lookupClients: any[]
    lookupUnitOfWork: any[]
    lookupStatus: any[]
    lookupPriority: any[]
}

interface OwnProps {
    // unitOfWork: any[] = UnitOfWork()
}

export type LookupProps = ReduxState & OwnProps

const mapStateToProps = (state: RootState): ReduxState => ({
    lookupProjects: state.appState.project.list.entities,
    lookupClients: state.appState.client.list.clients,
    lookupUnitOfWork: LU.LookupUnitOfWork(),
    lookupStatus: LU.LookupStatus(),
    lookupPriority: LU.LookupPriority(),
})

export const withLookup = <P extends LookupProps>(
    Component: React.ComponentType<P>,
) => {
    type ResultProps = Omit<P, keyof LookupProps>

    class WithLookup extends React.Component<P, {}> {
        render(): JSX.Element {
            return (
                <div>
                    <Component {...this.props} />
                </div>
            )
        }
    }

    const ConnectedLookup = connect<ReduxState>(
        mapStateToProps,
        {},
    )(WithLookup)
    return ConnectedLookup
}

export default withLookup
