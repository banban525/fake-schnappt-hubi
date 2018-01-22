import * as React from "react";
import {addLocaleData,IntlProvider,FormattedMessage} from 'react-intl';
import MyIntlLib from "./MyIntlLib";

export interface MyIntlProps
{
    id:string;
    description?:string;
    values?:any;
}

export default class MyIntl extends React.Component<MyIntlProps,{}> {
    constructor(props: any) {
        super(props);
    }

    getDefaultMessage(id:string):string
    {
        return MyIntlLib.defaultMessage(id);
    }
    render(){
        return <FormattedMessage 
            id={this.props.id}
            description={this.props.description}
            values={this.props.values}
            defaultMessage={this.getDefaultMessage(this.props.id)} />
    }
}