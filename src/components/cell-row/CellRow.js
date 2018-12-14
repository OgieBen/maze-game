import React, { Component } from 'react';
import './cellrow.css';
export class CellRow extends Component {

    // set center point here
    state = {
        cell: 32,
        sprite: new Map(),  
    }

    setSprites = () => {

        let row = 5;
        let col = 4;

        let spriteMap = new Map();
        
        for(let j=0; j<row; j++){
           let tmp = [];
           for(let i=0; i < col; i++){
               tmp[i] = 0;
           }
           let randIndex = Math.floor(Math.random(col) * (col - 0) + 0);
           tmp[randIndex] = 1;
           spriteMap.set(j, tmp);
        }

        console.log(spriteMap.size);

        return spriteMap;
    }

    cellListener = (event, id, colNum, rowNum) => {
        event.preventDefault();
        
        let maxTop = 10;
        let minLeft = 1;
        let maxRight = colNum;
        let maxBottom = (rowNum * 10) + 10;
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
        let spriteMap = this.setSprites();

        console.log(spriteMap.get(2)[2])

        this.setState({
            sprite: spriteMap,
        });
    }

    /* To begin to play user must click on the cell 
    * with red color. if the cell has not been clicked the nothing should work.
    * if the cell has been clicked, then the arrow keys check if the next item is the 
    * last if it is the last then user 
    * cannot move that way. if it is no the last cell then users can make a move. when ever these 
    * conditions are met the app
    * refreshes to redisplay current game */

    render() {

        let row = 5;
        let col = 4;

      
         
        let createCol = (rowId, colId) => {

            let id = `${rowId}${colId}`;
            return <a className={[this.state.cell === parseInt(id) ? 'selected' : '']} href='#' onKeyDown={(e) => this.cellListener(e, id, col, row)}>
                <li key={id} tabindex='1' className={['cell-size']}> { this.state.sprite.get(parseInt(rowId-1)) ? this.state.sprite.get(parseInt(rowId-1))[colId - 1] : '' } </li>
            </a>;
        };

        let createRow = (ele) => {
            return <ul>{ele}</ul>;
        }
        let tr = [];

        for (let i = 0; i < row; i++) {
            let tc = [];
            for (let j = 0; j < col; j++) {
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