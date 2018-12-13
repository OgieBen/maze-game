import React, {Component} from 'react';

export class Cell extends Component {


    render() {
        let tc = [];
        let createCol = (id) => {
            return <td tabindex='1' onFocus={this.cellListener(id)}  className={['cell-size']}>x</td>;
        }
        
        for(let j=0; j<4; j++){
            tc.push(createCol(j));
        }

        return (
            createCol
        );
    }
}