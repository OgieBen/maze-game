import React, { Component } from 'react';
import './cellrow.css';
export class CellRow extends Component {




    // set center point here
    state = {
        tableFocus: false,
        cell: 32,
    }

    setCurrentCell = (pos) => {
        this.setState({
            cell: pos,
        });
    }

    tableListener = (event) => {

        // navigate box based on current position
        let maxTop = 10;
        let maxBottom = 50;
        let pos = this.state.cell;

        if (event.keyCode === 38) {
            alert("up arrow key was pressed !!");

            // if there is a box above move up else 
            // do nothing.
            let newPos = pos - maxTop;
            if (newPos > 10) {
                // update current position
                this.setCurrentCell(pos);
            }

        }

        // left arrow key
        if (event.keyCode === 37) {
            alert("left arrow key was pressed !!");
        }

        //right arrow key
        if (event.keyCode === 39) {
            alert("right arrow key was pressed !!");
        }

        // down arrow key
        if (event.keyCode === 40) {
            alert("down arrow key was pressed !!");
        }
    }

    cellListener = (event, id) => {
        event.preventDefault();
        if (this.state.cell === parseInt(id)) {
            console.log('currently: ' + id);
        }

        let maxTop = 10;
        let minLeft = 1;
        let maxRight = 4;
        let maxBottom = 60;
        let pos = this.state.cell;


         //down arrow key
         if (event.keyCode === 40) {
            console.log("bottom arrow key was pressed !!");

            // if there is a box below move down else 
            // do nothing.
            let newPos = pos + 10;
            console.log(newPos);
            if (newPos < maxBottom) {
                // update current position
                this.setState({
                    cell: newPos,
                });
            }
        }

        // right arrow key
        if (event.keyCode === 39) {
            console.log("right arrow key was pressed !!");
            // if there is a box above move up else 
            // do nothing.
            let row = Math.floor(parseInt(pos) / 10) * 10;
            console.log(row);
            let currPos = pos - row;
            console.log(currPos);
            let newPos = currPos + minLeft;
            console.log(newPos);
            if (newPos <= maxRight) {
                // update current position
                newPos  += row; 
                console.log(newPos);
                this.setState({
                    cell: newPos,
                });
            }

        }

        // up arrow key
        if (event.keyCode === 38) {
            console.log("up arrow key was pressed !!");
            // if there is a box above move up else 
            // do nothing.
            let newPos = pos - maxTop;
            if (newPos > 10) {
                // update current position
                this.setState({
                    cell: newPos,
                });
            }

        }

        if (event.keyCode === 37) {
            console.log("left arrow key was pressed !!");
            // if there is a box above move up else 
            // do nothing.
            let row = Math.floor(parseInt(pos) / 10) * 10;
            console.log(row);
            let currPos = pos - row;
            console.log(currPos);
            let newPos = currPos - minLeft;
            console.log(newPos);
            if (newPos >= 1) {
                // update current position
                newPos  += row; 
                console.log(newPos);
                this.setState({
                    cell: newPos,
                });
            }

        }
    }

    componentDidMount() {
        
    }


    /* To bgin to play user must click on the cell 
    * with red color. if the cell has not been clicked the nothing should work.
    * if the cell has been clicked then, the arrow keys check if the next item is the 
    * last if it is the last then user 
    * cannot move that way. if it is no the last cell then users can make a move. when ever these 
    * conditions are met the app
    * refreshes to redisplay current game */

    render() {

        let createCol = (rowId, colId) => {

            let id = `${rowId}${colId}`;
            return <a className={[this.state.cell === parseInt(id) ? 'selected' : '']} href='#' onKeyDown={(e) => this.cellListener(e, id)}>
                <li key={id} tabindex='1' className={['cell-size']}> x </li>
            </a>;
        };

        let createRow = (ele) => {
            return <ul>{ele}</ul>;
        }
        let tr = [];

        for (let i = 0; i < 5; i++) {
            let tc = [];
            for (let j = 0; j < 4; j++) {
                tc.push(createCol(i + 1, j + 1));
            }
            tr.push(createRow(tc));
        }

        return (
            <div tabindex='1'>
                {tr}
            </div>
        );
    }

}