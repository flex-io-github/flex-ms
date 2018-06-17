import React from "react"
import BaseForm from "../../components/base/BaseForm"
import { ITask } from "../../service/models/ITask"
import { FormComponentProps } from "../../components/base/BaseDataEntry"
import {
    TextField,
    IComboBoxOption,
    DatePicker,
    Checkbox,
} from "office-ui-fabric-react"
import { withLookup, LookupProps } from "../../components/HOC/withLookup"

import { FlexComboBox as ComboBox } from "../../components/flex/FlexComboBox"
import * as format from "Util/format"

class BaseProject extends BaseForm<ITask> {}

function SetDate(_date: Date): Date | any {
    if (_date != null || undefined) return new Date(_date)
    else return null
}

const taskForm: React.SFC<FormComponentProps & LookupProps> = props => {
    const {
        initialValues,
        discard,
        save,
        lookupProjects,
        lookupUnitOfWork,
        lookupStatus,
        lookupClients,
        lookupPriority,
    } = props

    return (
        <div>
            <BaseProject
                save={save}
                discard={discard}
                initialValues={initialValues}
                FormComponent={({ fields, onChange }) => (
                    <div style={{ maxWidth: 600 }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: 20,
                            }}
                        >
                            <TextField
                                value={fields.subject}
                                label="Subject"
                                required={true}
                                onChanged={val => onChange("subject", val)}
                            />
                            <div style={{ display: "flex" }}>
                                <div
                                    style={{
                                        flex: "0 1 50%",
                                        maxWidth: "50%",
                                        paddingRight: 5,
                                    }}
                                >
                                    <DatePicker
                                        formatDate={format.getFormatDate}
                                        value={SetDate(fields.dateDue)}
                                        // minDate={SetDate()}
                                        label="Due"
                                        isMonthPickerVisible={false}
                                        allowTextInput={true}
                                        onSelectDate={val => {
                                            onChange("dateDue", val!)
                                        }}
                                    />
                                    <ComboBox
                                        selectedKey={fields.status_id}
                                        allowFreeform={true}
                                        options={lookupStatus}
                                        label="Status"
                                        onChanged={(value: IComboBoxOption) => {
                                            onChange("status_id", value.key)
                                        }}
                                    />
                                    <Checkbox
                                        value={fields.hasReminder}
                                        label="Reminder"
                                        onChange={(
                                            ev: React.MouseEvent<HTMLElement>,
                                            checked: boolean,
                                        ) => {
                                            onChange("hasReminder", checked)
                                        }}
                                    />
                                    <DatePicker
                                        formatDate={format.getFormatDate}
                                        value={SetDate(fields.dateReminder)}
                                        isMonthPickerVisible={false}
                                        onSelectDate={val =>
                                            onChange("dateReminder", val)
                                        }
                                    />
                                    <TextField
                                        value={
                                            fields.totalWorkHours || undefined
                                        }
                                        label="Total work"
                                        onChanged={val =>
                                            onChange("totalWorkHours", val)
                                        }
                                    />
                                    <ComboBox
                                        selectedKey={fields.timeReminder}
                                        options={lookupUnitOfWork}
                                        label="Unit"
                                        onChanged={(value: IComboBoxOption) => {
                                            onChange("timeReminder", value.key)
                                        }}
                                    />
                                </div>

                                <div
                                    style={{
                                        flex: "0 1 50%",
                                        maxWidth: "50%",
                                        paddingLeft: 5,
                                    }}
                                >
                                    <DatePicker
                                        formatDate={format.getFormatDate}
                                        value={SetDate(fields.dateStart)}
                                        label="Start date"
                                        isMonthPickerVisible={false}
                                        onSelectDate={val =>
                                            onChange("dateStart", val)
                                        }
                                    />
                                    <DatePicker
                                        formatDate={format.getFormatDate}
                                        value={SetDate(fields.dateComplete)}
                                        label="Date complete"
                                        isMonthPickerVisible={false}
                                        onSelectDate={val =>
                                            onChange("dateComplete", val)
                                        }
                                    />

                                    <TextField
                                        value={
                                            fields.actualWorkHours || undefined
                                        }
                                        label="Actual work"
                                        onChanged={val =>
                                            onChange("actualWorkHours", val)
                                        }
                                    />
                                    <ComboBox
                                        selectedKey={fields.actualWorkUnit_id}
                                        options={lookupProjects}
                                        onChanged={(value: IComboBoxOption) => {
                                            onChange(
                                                "actualWorkUnit_id",
                                                value.key,
                                            )
                                        }}
                                    />
                                    <ComboBox
                                        selectedKey={fields.project_id}
                                        label="Project"
                                        options={lookupProjects}
                                        onChanged={(value: IComboBoxOption) => {
                                            onChange("project_id", value.key)
                                        }}
                                    />
                                    <ComboBox
                                        selectedKey={fields.client_id}
                                        label="Client"
                                        options={lookupClients}
                                        onChanged={(value: IComboBoxOption) => {
                                            onChange("client_id", value.key)
                                        }}
                                    />
                                </div>
                            </div>
                            <TextField
                                label="Description"
                                value={fields.description || undefined}
                                multiline
                                style={{ maxHeight: 200 }}
                                autoAdjustHeight
                                onChanged={val => onChange("description", val)}
                            />
                        </div>
                    </div>
                )}
            />
        </div>
    )
}

export const TaskForm = withLookup(taskForm)
