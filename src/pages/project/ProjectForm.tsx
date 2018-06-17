import React from "react"
import BaseForm from "../../components/base/BaseForm"
import { IProject } from "../../service/models/IProject"
import { FormComponentProps } from "../../components/base/BaseDataEntry"
import { TextField, IComboBoxOption } from "office-ui-fabric-react"
import { withLookup, LookupProps } from "../../components/HOC/withLookup"
import { ComboBox } from "office-ui-fabric-react/lib"
import { FlexComboBox } from "../../components/flex/FlexComboBox"

class BaseProject extends BaseForm<IProject> {}

const projectForm: React.SFC<FormComponentProps & LookupProps> = props => {
    const { initialValues, discard, save, lookupClients } = props

    return (
        <div>
            <BaseProject
                save={save}
                discard={discard}
                initialValues={initialValues}
                FormComponent={({ fields: { name, client_id }, onChange }) => (
                    <div>
                        <TextField
                            label="Name"
                            value={name}
                            onChanged={e => onChange("name", e)}
                        />
                        <FlexComboBox
                            label="Client"
                            selectedKey={client_id}
                            options={lookupClients}
                            onChanged={(value: IComboBoxOption) =>
                                onChange("client_id", value.key)
                            }
                        />
                    </div>
                )}
            />
        </div>
    )
}

export const ProjectForm = withLookup(projectForm)
