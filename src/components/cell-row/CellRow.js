import React, { Component } from 'react';
import './cellrow.css';
export class CellRow extends Component {

    // set center point here
    state = {
        cell: 0,
        sprite: new Map(),  
        counter: 0,
        navCounter: 0,
    }

    setSprites = (row, col) => {
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

    setEmptyMatrix = (row, col) => {
       

        let spriteMap = new Map();
        
        for(let j=0; j<row; j++){
           let tmp = [];
           for(let i=0; i < col; i++){
               tmp[i] = 0;
           }
           spriteMap.set(j, tmp);
        }

        return spriteMap;
    }

    updateSprite = (row, col, newValue, newPos) => {

        let updatedSprite = this.setEmptyMatrix(this.props.rows, this.props.cols);
        let id = row + col; 
        let counter = this.state.counter;
        

        // divide row by 10 to get row number
        // then subtract 1 to get 0-based index

        let rIndex = (row / 10) - 1
        
        console.log("state =>   " + this.state.cell); console.log("id => " + id);

        if (parseInt(this.state.cell) === parseInt(id)){
            if(this.state.sprite.get(rIndex)){
                console.log('Hey => ' + this.state.sprite.get(parseInt(rIndex))[col - 1]);
                if(this.state.sprite.get(parseInt(rIndex))[col - 1] === 1){
                    this.state.sprite.forEach((element, key) => {
                        console.log('key' + key + ' : ele => ' + element);
                        if (parseInt(key) === parseInt(rIndex)){
                            updatedSprite.get(rIndex)[col] = newValue;
                            counter += 1;
                            if(counter >= this.props.rows){
                                alert("Game over! Total moves: " + this.state.navCounter);
                            }
                        }else{
                            updatedSprite.set(key, element);
                        }
                    });
            
                    this.setState({
                        sprite: updatedSprite,
                        counter: counter
                    });
                }
            }
        }
        
    }

    cellListener = (event, id, rowId, colId, rowNum, colNum) => {
        event.preventDefault();
        
        let maxTop = 10;
        let minLeft = 1;
        let maxRight = colNum;
        let maxBottom = (rowNum * 10) + 10;
        let pos = this.state.cell;

         //down arrow key
         if (event.keyCode === 40) {
            // console.log("bottom arrow key was pressed !!");

            // if there is a box below move down else 
            // do nothing.
            let newPos = pos + 10;
            // console.log("new Pos: " + newPos);
            if (newPos < maxBottom) {
                // update current position
                let __row = Math.floor(parseInt(pos) / 10) * 10;
                let __col = pos - __row;
                // console.log("prev position === " + parseInt(__row + __col)); 
                
                // move to next position
                this.setState({
                    cell: newPos,
                    navCounter: this.state.navCounter + 1,
                });

                this.updateSprite(__row, __col, 0, newPos);
            }
        }

        // right arrow key
        if (event.keyCode === 39) {
            console.log("right arrow key was pressed !!");
            // if there is a box above move up else 
            // do nothing.
            let row = Math.floor(parseInt(pos) / 10) * 10;
            // currPos is the current column index
            let currPos = pos - row;
            let newPos = currPos + minLeft;
            // console.log(newPos);
            if (newPos <= maxRight) {
                // update current position
                newPos  += row; 
        
                this.setState({
                    cell: newPos,
                    navCounter: this.state.navCounter + 1,
                });

                this.updateSprite(row, currPos, 0, newPos);
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
                let __row = Math.floor(parseInt(pos) / 10) * 10;
                let __col = pos - __row;
               
                this.setState({
                    cell: newPos,
                    navCounter: this.state.navCounter + 1,
                });

                this.updateSprite(__row, __col, 0, newPos);
            }

        }

        if (event.keyCode === 37) {
            console.log("left arrow key was pressed !!");
            // if there is a box above move up else 
            // do nothing.
            let row = Math.floor(parseInt(pos) / 10) * 10;
            // console.log(row);
            let currPos = pos - row;
            // console.log(currPos);
            let newPos = currPos - minLeft;
            // console.log(newPos);
            if (newPos >= 1) {
                // update current position
                newPos  += row; 
                // console.log(newPos);
                this.setState({
                    cell: newPos,
                    navCounter: this.state.navCounter + 1,
                });

                this.updateSprite(row, currPos, 0, newPos);
            }

        }
    }

    componentDidMount() {
        let spriteMap = this.setSprites(this.props.rows, this.props.cols);
        let rowStart = (Math.ceil(this.props.rows / 2 )) * 10 ;
        let colStart = (Math.ceil(this.props.cols / 2 ));

        let pinPoint = rowStart + colStart
        console.log(pinPoint);

        this.setState({
            cell: pinPoint,
            sprite: spriteMap,
        });
    }

    /* To begin to play, a user must click on the cell 
    * with red color. if the cell has not been clicked then nothing should work.
    * if the cell has been clicked, then the arrow keys check if the next item is the 
    * last cell. if it is the last cell, then user 
    * cannot move that way. if it is not the last cell then users can make a move in that direction.
    *  */

    render() {

        let row = this.props.rows;
        let col = this.props.cols;

      
         
        let createCol = (rowId, colId) => {

            let id = `${rowId}${colId}`;
            // console.log(id);

            return <a className={[this.state.cell === parseInt(id) ? 'selected' : '']} href='#' onKeyDown={(e) => this.cellListener(e, id, rowId, colId, row, col)}>
                <li key={id} tabindex='1' className={['cell-size']}>
                    { this.state.sprite.get(parseInt(rowId-1)) ? this.state.sprite.get(parseInt(rowId-1))[colId - 1] : '' } 
                    {}
                </li>
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