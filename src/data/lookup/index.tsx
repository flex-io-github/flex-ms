import { IComboBoxOption } from "office-ui-fabric-react"

export const LookupUnitOfWork = (): any[] => {
    return [
        { id: 1, name: "minutes" },
        { id: 2, name: "hours" },
        { id: 3, name: "days" },
        { id: 4, name: "weeks" },
    ]
}

export const LookupPriority = (): any[] => {
    return [
        { id: 1, name: "High" },
        { id: 2, name: "Normal" },
        { id: 3, name: "Low" },
    ]
}

export const LookupStatus = (): any[] => {
    return [
        { id: 1, name: "Not started" },
        { id: 2, name: "In progress" },
        { id: 3, name: "Completed" },
        { id: 4, name: "Waiting on others" },
        { id: 5, name: "Deferred" },
    ]
}

