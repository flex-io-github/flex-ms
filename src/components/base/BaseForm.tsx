import React from "react"
import _ from "lodash"
import {
    CommandBar,
    IContextualMenuItem,
    ContextualMenuItem,
} from "office-ui-fabric-react"
// Props for the HOC, generic over the form fields specified by the passed in component.
interface Props<FormFields> {
    FormComponent: React.ComponentType<FormComponentProps<FormFields>>
    initialValues: FormFields
    ContextualMenu?: IContextualMenuItem[]
    save: (entity: any) => void
    discard: () => void
}

// The Props that the inner component will receive. They include all the fields specified by FormFields and the Handlers.
export type FormComponentProps<FormFields> = {
    fields: FormFields
} & FormActions &
    Handlers<FormFields>

// The on change handler type. This is extracted because it's too big to put inline in the Form class. Some
// cool stuff going on here. The `<K extends keyof FormFields>` makes the function generic over all keys of
// FormFields. Furthermore, the first argument must be a key that exists in FormFields, and the second
// argument must be the type of the value specified for that key. You can't ever misspell a key by accident,
// or pass an incorrect type for the value here.
type OnChangeHandler<FormFields> = <K extends keyof FormFields>(
    s: K,
    a: FormFields[K],
) => void

// This just specifies the Handlers. Parameterized over FormFields like everything else.
interface Handlers<FormFields> {
    onChange: OnChangeHandler<FormFields>
}

interface FormActions {}

// The state of the Form component is just FormFields but wrapped in another object. This wrapping makes it
// easier to type-check the setState calls.
interface State<FormFields> {
    fields: FormFields
}

export default class BaseForm<FormFields> extends React.Component<
    Props<FormFields>,
    State<FormFields>
> {
    private _ContextualMenu: IContextualMenuItem[]
    constructor(props: Props<FormFields>) {
        super(props)

        this.state = {
            fields: this.props.initialValues,
        }

        // if (this.props.ContextualMenu)
        this._ContextualMenu = this.props.ContextualMenu
            ? this.props.ContextualMenu
            : []
        // else this._ContextualMenu = []

        this._ContextualMenu.push({
            key: "Save",
            name: "Save",
            icon: "Save",
            onClick: () => {
                this.props.save(this.state.fields)
                this.props.discard()
            },
        })

        this._ContextualMenu.push({
            key: "Discard",
            name: "Discard",
            icon: "Cancel",
            onClick: () => {
                this.props.discard()
            },
        })
    }

    // shouldComponentUpdate(nextProps: Props<FormFields>, nextState: State<FormFields>){
    //     // let ret: boolean = nextProps.initialValues != this.props.initialValues

    //     return(nextProps.initialValues != this.props.initialValues)
    // }

    componentDidMount() {}

    componentWillReceiveProps(nextProps: Props<FormFields>) {
        this.setState({ ...this.state, fields: nextProps.initialValues })
    }

    public onChange: OnChangeHandler<FormFields> = (field, value) => {
        // this.setState({ fields: _.merge(this.state.fields, { [field]: value }) });

        const fields: any = _.assign({}, this.state.fields, {
            [field]: value,
        })

        this.setState({ ...this.state, fields })
    }

    public render() {
        const { FormComponent } = this.props
        const { fields } = this.state

        return (
            <div>
                <CommandBar
                    className=""
                    isSearchBoxVisible={false}
                    items={this._ContextualMenu}
                />
                <div style={{ padding: 20 }}>
                    <FormComponent onChange={this.onChange} fields={fields} />
                </div>
            </div>
        )
    }
}
