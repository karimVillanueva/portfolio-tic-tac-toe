import React, {createContext, useState} from 'react';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

//createContext
const BoardContext = createContext();
//create provider
const BoardProvider = ({children})=>{
  const initialState = {
    marker:['','','','','','','','',''],
    mark: "X",
    count: 0,
    winner: 'None'
  }
    const [board,setBoard] = useState(initialState);
    return(
        <BoardContext.Provider value = {{board,setBoard}}>
          {children}
        </BoardContext.Provider>
    );
}
//create Consumer
const BoardConsumer =  BoardContext.Consumer;

//Class componentes
class Square extends React.Component {
  constructor(props){
    super(props);
    this.handleClickSquare = this.handleClickSquare.bind(this);
    // add Marks to array function
    this.addMark = this.addMark.bind(this);   
    //Comprobate winner function
    this.comprobator = this.comprobator.bind(this);
  }

  handleClickSquare(props){   
    if (props.board.count < 9) {
    this.addMark(props);  
    const resp = this.comprobator(props);
    if(resp === 'win X' || resp === 'win O' ){
      props.setBoard({...props.board,
        count: 9,
        winner: resp
      })
    }
  }
  else {
    return
  }
}

  addMark(props){
    let index = parseInt(this.props.name);
    let marca = '';
    let marker = props.board.marker;
    if(props.board.count%2 === 0 ){
     marca = 'X'
    }
    else{
      marca = 'O'
    }   
    if(props.board.marker[index-1] === ''){    
      marker[index-1] = marca;  
    }else {
      return
    }
    let count = props.board.count +1;
    props.setBoard({...props.board,
      marker: marker,
      mark: marca,      
      count: count });
    }

  comprobator(props){
    //horizont
    if((props.board.marker[0] === 'X' && props.board.marker[1] === 'X') && props.board.marker[2] === 'X'){
      return 'win X';
    
    } 
    if((props.board.marker[3] === 'X' && props.board.marker[4] === 'X') && props.board.marker[5] === 'X'){
      return 'win X';
    }
    if((props.board.marker[6] === 'X' && props.board.marker[7] === 'X') && props.board.marker[8] === 'X'){
      return 'win X';
    }
    if((props.board.marker[0] === 'O' && props.board.marker[1] === 'O') && props.board.marker[2] === 'O'){
      return 'win O'
    }
    if((props.board.marker[3] === 'O' && props.board.marker[4] === 'O') && props.board.marker[5] === 'O'){
      return 'win O'
    }
    if((props.board.marker[6] === 'O' && props.board.marker[7] === 'O') && props.board.marker[8] === 'O'){
      return 'win O'
    }

    // vertical
    if((props.board.marker[0] === 'X' && props.board.marker[3] === 'X') && props.board.marker[6] === 'X'){
      return 'win X';
    } 
    if((props.board.marker[1] === 'X' && props.board.marker[4] === 'X') && props.board.marker[7] === 'X'){
      return 'win X';
    }
    if((props.board.marker[2] === 'X' && props.board.marker[5] === 'X') && props.board.marker[8] === 'X'){
      return 'win X';
    }
    if((props.board.marker[0] === 'O' && props.board.marker[3] === 'O') && props.board.marker[6] === 'O'){
      return 'win O'
    }
    if((props.board.marker[1] === 'O' && props.board.marker[4] === 'O') && props.board.marker[7] === 'O'){
      return 'win O'
    }
    if((props.board.marker[2] === 'O' && props.board.marker[5] === 'O') && props.board.marker[8] === 'O'){
      return 'win O'
    }

    //Diagonal
    if((props.board.marker[0] === 'O' && props.board.marker[4] === 'O') && props.board.marker[8] === 'O'){
      return 'win O'
    }
    if((props.board.marker[2] === 'O' && props.board.marker[4] === 'O') && props.board.marker[6] === 'O'){
      return 'win O'
    }
    if((props.board.marker[0] === 'X' && props.board.marker[4] === 'X') && props.board.marker[8] === 'X'){
      return 'win X';
    }
    if((props.board.marker[2] === 'X' && props.board.marker[4] === 'X') && props.board.marker[6] === 'X'){
      return 'win X';
    }
    }
  
    
   
  render() {
    return (
      <BoardConsumer>
      {props=>{
      return( <div
        className="square"
        style={squareStyle}
        key={this.props.name}
        onClick={()=>this.handleClickSquare(props,this.props)}
        >
        {props.board.marker[parseInt(this.props.name)-1]}
      </div>);
    }     
  }
  </BoardConsumer>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.resetear = this.resetear.bind(this);
  }
  resetear(props){
    props.setBoard({...props.board,
    marker:['','','','','','','','',''],
    mark: 'X',
    count: 0,
    winner:'None'
  });    
  }
  render() {
    return (
      <BoardConsumer> 
        {props=>{
          return(
            <div style={containerStyle} className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>
          {props.board.mark}</span></div>
        <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>
          {props.board.winner}
          </span></div>
        <button style={buttonStyle} onClick={()=>this.resetear(props)}>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square name='1'/>
            <Square name='2'/>
            <Square name='3'/>
          </div>
          <div className="board-row" style={rowStyle}>
            <Square name='4'/>
            <Square name='5'/>
            <Square name='6'/>
          </div>
          <div className="board-row" style={rowStyle}>
            <Square name='7'/>
            <Square name='8'/>
            <Square name='9'/>
          </div>
        </div>
      </div>
      
          );
        }}
      </BoardConsumer>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
      <BoardProvider>      
          <Board />        
      </BoardProvider>
      </div>
      </div>
    );
  }
}

export default Game;