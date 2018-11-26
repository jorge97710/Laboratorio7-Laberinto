const css = require('./app.scss');
import React from 'react'
import ReactDOM from 'react-dom'

//console.log(cartas);
var turno = 0;
var fallos = 0;
const fetch = require("node-fetch");
var FormData = require('form-data');
//DIRECCION PARA EL FETCH http://34.210.35.174:3001/
var filas = new Array();
import keydown from 'react-keydown';
const url = 'http://34.210.35.174:3001/?type=json'; // Get 10 random users
fetch(url)
  .then((resp) => resp.json()) // Transform the data into json
  .then(resp => {
    console.log("HOLA");
    console.log(resp);

    for (var a in resp) {
      //console.log("linea" + resp[a]);
      //   filas.push(resp[a]);
      var columnas = new Array();
      for (var b in resp[a]) {
        //console.log(;
        var c = resp[a]
        //console.log("especifico" + c[b]);
        columnas.push(c[b]);
      }
      filas.push(columnas);
    }
    console.log("filas:\n " + filas);
//    console.log("----------------PASAMOS-------------");

    for (var i = 0; i < filas.length; i++) {
      //console.log(filas[i] + "\n");
    }
    for (var i = 0; i < filas.length; i++) {
      //console.log(filas[i] + "\n");
      var a = filas[i];
      for (var x = 0; x < a.length; x++) {
        //console.log(a[x] + " ");
      }
      //console.log("\n")
    }
  })

// utility functions
function shallowEquals(arr1, arr2) {
  if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
  let equals = true;
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) equals = false;
  }
  return equals;
}

function arrayDiff(arr1, arr2) {
  return arr1.map((a, i) => {
    return a - arr2[i]
  })
}

// display a single cell
function GridCell(props) {
  const classes = `grid-cell 
${props.foodCell ? "grid-cell--food" : ""} 
${props.snakeCell ? "grid-cell--snake" : ""}
${props.wallcell ? "grid-cell--wall" : ""}`;
  return (
    <div
      className={classes}
      style={{ height: props.size + "px", width: props.size + "px" }}
    />
  );
}

// the main view
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [],
      food: [],
      // 0 = not started, 1 = in progress, 2= finished
      status: 0,
      // using keycodes to indicate direction
      direction: 39
    };

    //    this.moveFood = this.moveFood.bind(this);
    this.checkIfAteFood = this.checkIfAteFood.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.doesntOverlap = this.doesntOverlap.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.removeTimers = this.removeTimers.bind(this);
  }
  // randomly place snake food

  setDirection({ keyCode }) {
    // if it's the same direction or simply reversing, ignore
    let changeDirection = true

    if (changeDirection) this.setState({ direction: keyCode });
    console.log(keyCode);
    this.moveSnake();
  }

  moveSnake() {
    const newSnake = [];
    // if (turno==1){turno=0;}
    // set in the new "head" of the snake
    switch (this.state.direction) {
      // down
      case 40:
        if (turno == 0) {
          turno = 1;
        } else if (turno == 1) {
         // console.log("this.state.snake[0] tiene:" + this.state.snake[0]);
          //console.log("this.state.snake[0][0] tiene:" + this.state.snake[0][1]);
          newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] + 1];
          this.setState({ snake: newSnake });
          this.checkIfAteFood(newSnake);
          if (!this.isValid(newSnake[0]) || !this.doesntOverlap(newSnake)) {
            // end the game
            this.endGame()
          }
          turno = 0;
        }
        break;
      // up
      case 38:
        if (turno == 0) {
          turno = 1;
        } else if (turno == 1) {
          //console.log("this.state.snake[0][0] tiene:" + this.state.snake[0][0]);
          //console.log("this.state.snake[0][0] tiene:" + this.state.snake[0][1]);
          newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] - 1];
          this.setState({ snake: newSnake });
          this.checkIfAteFood(newSnake);
          if (!this.isValid(newSnake[0]) || !this.doesntOverlap(newSnake)) {
            // end the game
            this.endGame()
          } turno = 0;
        }
        break;
      // right
      case 39:
        if (turno == 0) {
          turno = 1;
        } else if (turno == 1) {
          //console.log("this.state.snake[0][0] tiene:" + this.state.snake[0][0]);
          //console.log("this.state.snake[0][0] tiene:" + this.state.snake[0][1]);
          newSnake[0] = [this.state.snake[0][0] + 1, this.state.snake[0][1]];
          this.setState({ snake: newSnake });
          this.checkIfAteFood(newSnake);
          if (!this.isValid(newSnake[0]) || !this.doesntOverlap(newSnake)) {
            // end the game
            this.endGame()
          } turno = 0;
        }
        break;
      // left
      case 37:
        if (turno == 0) {
          turno = 1;
        } else if (turno == 1) {
          //console.log("this.state.snake[0][0] tiene:" + this.state.snake[0][0]);
          //console.log("this.state.snake[0][0] tiene:" + this.state.snake[0][1]);
          newSnake[0] = [this.state.snake[0][0] - 1, this.state.snake[0][1]];
          this.setState({ snake: newSnake });
          this.checkIfAteFood(newSnake);
          if (!this.isValid(newSnake[0]) || !this.doesntOverlap(newSnake)) {
            // end the game
            this.endGame()
          } turno = 0;
        }
        break;
    }



  }

  checkIfAteFood(newSnake) {
    //console.log("TAM: " + newSnake.length);


    if (!shallowEquals(newSnake[0], this.state.food)) return
    // snake gets longer
    let newSnakeSegment;
    const lastSegment = newSnake[newSnake.length];
    console.log("GANASTE!");

  }

  // is the cell's position inside the grid?
  isValid(cell) {
    //console.log("CHEQUEO VALIDES");
    return (
      cell[0] > -1 &&
      cell[1] > -1 &&
      cell[0] < this.numCells &&
      cell[1] < this.numCells
    );
  }

  doesntOverlap(snake) {
    //console.log("CHEQUEO")
    return (
      snake.slice(1).filter(c => {
        return shallowEquals(snake[0], c);
      }).length === 0
    );
  }

  startGame() {
    this.removeTimers();
    // this.moveSnakeInterval = setInterval(this.moveSnake, 130);
    //   this.moveFood();

    this.setState({
      status: 1,
      snake: [[5, 6]],
      food: [2, 2]
    });
    //need to focus so keydown listener will work!
    this.el.focus();
  }

  endGame() {
    this.removeTimers();
    this.setState({
      status: 2
    })
  }

  removeTimers() {
    if (this.moveSnakeInterval) clearInterval(this.moveSnakeInterval);
    if (this.moveFoodTimeout) clearTimeout(this.moveFoodTimeout)
  }

  componentWillUnmount() {
    this.removeTimers();
  }

  render() {
    // each cell should be approximately 15px wide, so calculate how many we need
    this.numCells = Math.floor(this.props.size / 15);
    const cellSize = this.props.size / this.numCells;
    const cellIndexes = Array.from(Array(this.numCells).keys());
    //    console.log("CELL INDEXES TIENE:"+ cellIndexes);
    /*
        const cells = cellIndexes.map(y => {
          return cellIndexes.map(x => {
            const foodCell = this.state.food[0] === x && this.state.food[1] === y;
            let snakeCell = this.state.snake.filter(c => c[0] === x && c[1] === y);
      //      console.log("SNAKE CELL TIENE:" + snakeCell);
            snakeCell = snakeCell.length && snakeCell[0];
            let wallcell = (0 === x && 0 === y) && (1===x && 0===y);
            return (
              <GridCell
                foodCell={foodCell}
                snakeCell={snakeCell}
                wallcell={wallcell}
                size={cellSize}
                key={x + " " + y}
              />
            );
          });
        });/*/


    var cells = [];
    for (var i = 0; i < filas.length; i++) {
      //console.log(filas[i] + "\n");
      var a = filas[i];
      for (var x = 0; x < a.length; x++) {
        //console.log(a[x] + " ");
        let snakeCell = this.state.snake.filter(c => c[0] === x && c[1] === i);
        if (snakeCell[0] == i && snakeCell[1] == x) {

          cells.push(<GridCell
            snakeCell={snakeCell}
            size={cellSize}
            key={x + " " + i}
          />);

        } else if (i == 2 && x == 2) {
          const foodCell = [2, 2];
          cells.push(<GridCell
            foodCell={foodCell}

            size={cellSize}
            key={x + " " + i}
          />);

        } else {

          if (a[x] == " ") {
            cells.push(<GridCell

              key={x + " " + i}
            />);
          } else if (a[x] == "+" || a[x] == "-" || a[x] == "|") {
            var wallcell = [x, i];
            cells.push(<GridCell

              wallcell={wallcell}
              size={cellSize}
              key={x + " " + i}
            />);
          }
        }



      }
      //console.log("\n")
    }



    /*
    PRUEBA DIFERENTE
    for (var i = 0; i < filas.length; i++) {
          //console.log(filas[i] + "\n");
          var a = filas[i];
          for (var x = 0; x < a.length; x++) {
            console.log(a[x] + " ");
          }
          //console.log("\n")
        }
    
    
    
    
    */
    /*
codigo de la gridcell
 <GridCell
            foodCell={foodCell}
            snakeCell={snakeCell}
            wallcell={wallcell}
            size={cellSize}
            key={x + " " + y}
          />

    */
    //console.log("CELLS TIENE: "+cells);
    let overlay;
    if (this.state.status === 0) {
      overlay = (
        <div className="snake-app__overlay">
          <button onClick={this.startGame}>Start game!</button>
        </div>
      );
    } else if (this.state.status === 2) {
      overlay = (
        <div className="snake-app__overlay">
          <div className="mb-1"><b>GAME OVER!</b></div>
          <div className="mb-1">Your score: {this.state.snake.length} </div>
          <button onClick={this.startGame}>Start a new game</button>
        </div>
      );
    }
    return (
      <div
        className="snake-app"
        onKeyDown={this.setDirection}
        style={{
          width: this.props.size + "px",
          height: this.props.size + "px"
        }}
        ref={el => (this.el = el)}
        tabIndex={-1}
      >
        {overlay}
        <div
          className="grid"
          style={{
            width: this.props.size + "px",
            height: this.props.size + "px"
          }}
        >
          {cells}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App size={500} />, document.getElementById("root"));