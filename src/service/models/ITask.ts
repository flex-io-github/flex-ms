import { IDbEntity } from "../dataSource/base"

export interface ITask extends IDbEntity {
    readonly subject: any
    readonly dateDue: Date
    readonly dateStart: any
    readonly dateComplete: any
    readonly status_id: any
    readonly hasReminder: any
    readonly dateReminder: any
    readonly timeReminder: any
    readonly totalWorkHours: any
    readonly totalWorkUnit_id: any
    readonly actualWorkHours: string | undefined
    readonly actualWorkUnit_id: any
    readonly project_id: any
    readonly client_id: any
    readonly description: any
    readonly user_id: any
}

export const ITaskInitialValues = {
    subject: "",
    dateDue: new Date(),
    dateStart: "",
    dateComplete: "",
    status_id: "",
    hasReminder: "",
    dateReminder: "",
    timeReminder: "",
    totalWorkHours: "",
    totalWorkUnit_id: "1",
    actualWorkHours: "",
    actualWorkUnit_id: "1",
    project_id: "",
    client_id: "",
    description: "",
    user_id: null,
}
