import * as React from "react";

interface GhostProps
{
    x:number;
    y:number;
    fill:string;
}

export default class Ghost extends React.Component<GhostProps> {
    constructor(props: any) {
      super(props);
    }


    render(){
        return <use xmlnsXlink="http://www.w3.org/1999/xlink"
            xlinkHref="#ghost"
            x={this.props.x} 
            y={this.props.y} 
            fill={this.props.fill}/>
    }
}  