import React from "react"
import { ComboBox, IComboBoxProps, IComboBoxOption } from "office-ui-fabric-react"
import _ from 'lodash';

interface FlexEntry{
    id: string | number,
    name: string
}

function optionItem(_options: any): any[]{
    var newArr = _.map(_options, function(element: FlexEntry){
        return _.assign({}, element, {key: element.id}, {text: element.name})
    })
    return newArr
}


export const FlexComboBox: React.SFC<IComboBoxProps> = (props) => {


  return <ComboBox {...props} options ={optionItem(props.options)} />

}


