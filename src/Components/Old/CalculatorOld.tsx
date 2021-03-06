import React from 'react';
import TypeChart from '../../Assets/typeChart';
import TypeMap from '../../Assets/typeMap';

type State = {
    prev1: number | undefined,
    prev2: number | undefined,
    index1: number | undefined,
    index2: number | undefined,
    temp1: number | undefined,
    temp2: number | undefined,
    result1: number[] | null,
    result2: number[] | null
}

type Props = {
    type1: string,
    type2: string
}

class Calculator extends React.Component<Props,State> {
    state: State = {
        prev1: 8,
        prev2: 7,
        index1: 6,
        index2: 5,
        temp1: 8,
        temp2: 7,
        result1: [],
        result2: []
    };
    componentDidMount() {
        this.setState({
            index1: TypeMap.get(this.props.type1),
            index2: TypeMap.get(this.props.type2)
        });
        if(this.state.index1) {
            this.setState({
                result1: TypeChart[this.state.index1]
            });
        }
        if(this.state.index2) {
            this.setState({
                result2: TypeChart[this.state.index2]
            });
        }
    }
    componentDidUpdate() {
        if (this.state.index1 !== TypeMap.get(this.props.type1) || this.state.index2 !== TypeMap.get(this.props.type2)){
            this.setState((state) => ({
                prev1: state.index1,
                prev2: state.index2,
                index1: TypeMap.get(this.props.type1),
                index2: TypeMap.get(this.props.type2),
            }));
            if(this.state.index1) {
                this.setState({
                    result1: TypeChart[this.state.index1]
                });
            }
            if(this.state.index2) {
                this.setState({
                    result2: TypeChart[this.state.index2]
                });
            }
        }
    }
    render() {
        return (
        <div>
            I'm the calculator
            {this.props.type1}
            {this.props.type2}
            {TypeChart.map((type, index) => (
                <p key={index}> {type}</p>
            ))}
            <p>{'Result 1: ' + this.state.result1}</p>
            <p>{'Index 1: ' + TypeMap.get(this.props.type1)}</p>
            <br/>
            <p>{'Result 2: ' + this.state.result2}</p>
            <p>{'Index 2: ' + TypeMap.get(this.props.type2)}</p>
        </div>
        );
    }
}

export default Calculator;