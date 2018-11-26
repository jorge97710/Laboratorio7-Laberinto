const css = require('./app.scss');
import React from 'react'
import ReactDOM from 'react-dom'

//console.log(cartas);
var turno = 0;
var ganaste = 0;
var movimientos = 0;
var fallos = 0;
const fetch = require("node-fetch");
var FormData = require('form-data');
//DIRECCION PARA EL FETCH http://34.210.35.174:3001/
var filas = new Array();
import keydown from 'react-keydown';
const url = 'http://34.210.35.174:3001/?h=12&w=8&type=json'; // Get 10 random users
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


// display a single cell
function GridCell(props) {
    const classes = `grid-cell 
${props.foodCell ? "grid-cell--food" : ""} 
${props.playerCell ? "grid-cell--player" : ""}
${props.wallcell ? "grid-cell--wall" : ""}
${props.blancCell ? "grid-cell--blanc" : ""}
`;
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
            player: [],
            food: [],
            // 0 = not started, 1 = in progress, 2= finished
            status: 0,
            // using keycodes to indicate direction
            direction: 39
        };

        this.checkIfWon = this.checkIfWon.bind(this);
        this.startGame = this.startGame.bind(this);
        this.moveplayer = this.moveplayer.bind(this);
        this.setDirection = this.setDirection.bind(this);
    }
    ;
    setDirection({ keyCode }) {
        let changeDirection = true

        if (changeDirection) this.setState({ direction: keyCode });
        console.log(keyCode);
        this.moveplayer();
    }

    moveplayer() {
        const newplayer = [];

        switch (this.state.direction) {
            case 40:
                if (turno == 0) {
                    turno = 1;
                } else if (turno == 1) {
                    console.log("this.state.player[0] tiene:" + this.state.player[0][0]);
                    console.log("this.state.player[0][0] tiene:" + this.state.player[0][1]);

                    var fil = this.state.player[0][0] + 1;
                    var col = this.state.player[0][1];
                    var b = filas[fil];
                    if (b[col] == "+" || b[col] == "-" || b[col] == "|") {

                        console.log("CHOCARIAS");
                    } else {

                        newplayer[0] = [this.state.player[0][0] + 1, this.state.player[0][1]];
                        this.setState({ player: newplayer });
                        this.checkIfWon(newplayer);
                        movimientos = movimientos + 1;

                        turno = 0;
                    }


                }
                break;
            case 38:
                if (turno == 0) {
                    turno = 1;
                } else if (turno == 1) {
                    console.log("this.state.player[0][0] tiene:" + this.state.player[0][0]);
                    console.log("this.state.player[0][0] tiene:" + this.state.player[0][1]);

                    var fil = this.state.player[0][0] - 1;
                    var col = this.state.player[0][1];
                    var b = filas[fil];
                    if (b[col] == "+" || b[col] == "-" || b[col] == "|") {

                        console.log("CHOCARIAS");
                    } else {


                        newplayer[0] = [this.state.player[0][0] - 1, this.state.player[0][1]];
                        this.setState({ player: newplayer });
                        this.checkIfWon(newplayer);
                        movimientos = movimientos + 1;
                        turno = 0;
                    }

                }
                break;
            case 39:
                if (turno == 0) {
                    turno = 1;
                } else if (turno == 1) {
                    console.log("this.state.player[0][0] tiene:" + this.state.player[0][0]);
                    console.log("this.state.player[0][0] tiene:" + this.state.player[0][1]);

                    var fil = this.state.player[0][0];
                    var col = this.state.player[0][1] + 1;
                    var b = filas[fil];
                    if (b[col] == "+" || b[col] == "-" || b[col] == "|") {

                        console.log("CHOCARIAS");
                    } else {


                        newplayer[0] = [this.state.player[0][0], this.state.player[0][1] + 1];
                        this.setState({ player: newplayer });
                        this.checkIfWon(newplayer);
                        movimientos = movimientos + 1;
                        turno = 0;
                    }

                }
                break;
            case 37:
                if (turno == 0) {
                    turno = 1;
                } else if (turno == 1) {
                    console.log("this.state.player[0][0] tiene:" + this.state.player[0][0]);
                    console.log("this.state.player[0][0] tiene:" + this.state.player[0][1]);
                    var fil = this.state.player[0][0];
                    var col = this.state.player[0][1] - 1;
                    var b = filas[fil];
                    if (b[col] == "+" || b[col] == "-" || b[col] == "|") {

                        console.log("CHOCARIAS");
                    } else {


                        newplayer[0] = [this.state.player[0][0], this.state.player[0][1] - 1];
                        this.setState({ player: newplayer });
                        this.checkIfWon(newplayer);
                        movimientos = movimientos + 1;
                        turno = 0;
                    }
                }
                break;
        }



    }

    checkIfWon(newplayer) {


        if (!shallowEquals(newplayer[0], this.state.food)) return
        let newplayerSegment;
        const lastSegment = newplayer[newplayer.length];
        console.log("GANASTE!");
        ganaste = 1;

    }



    startGame() {
        this.removeTimers();

        this.setState({
            status: 1,
            player: [[22, 22]],
            food: [2, 2]
        });
        this.el.focus();
    }

    endGame() {
        this.removeTimers();
        this.setState({
            status: 2
        })
    }

    removeTimers() {
        if (this.moveplayerInterval) clearInterval(this.moveplayerInterval);
        if (this.moveFoodTimeout) clearTimeout(this.moveFoodTimeout)
    }

    componentWillUnmount() {
        this.removeTimers();
    }

    render() {



        this.numCells = Math.floor(this.props.size / 20);
        const cellSize = this.props.size / this.numCells;
        const cellIndexes = Array.from(Array(this.numCells).keys());



        var cells = [];
        for (var i = 0; i < filas.length; i++) {
            var a = filas[i];
            for (var x = 0; x < a.length; x++) {
                let playerCell = this.state.player;
                if (playerCell[0][0] == i && playerCell[0][1] == x) {
                    cells.push(<GridCell
                        playerCell
                        size={cellSize}
                        key={x + " " + i}
                    />);

                } else if (i == 2 && x == 2) {
                    const foodCell = [2, 2];
                    cells.push(<GridCell
                        foodCell

                        size={cellSize}
                        key={x + " " + i}
                    />);

                } else {
                    if (a[x] == " ") {
                        cells.push(<GridCell
                            blancCell
                            size={cellSize}

                            key={x + " " + i}
                        />);
                    } else if (a[x] == "+" || a[x] == "-" || a[x] == "|") {
                        var wallcell = [x, i];
                        cells.push(<GridCell

                            wallcell
                            size={cellSize}
                            key={x + " " + i}
                        />);
                    }
                }
            }
        }




        let overlay;
        if (this.state.status === 0) {
            overlay = (
                <div className="player-app__overlay">
                    <button onClick={this.startGame}>Start game!</button>
                </div>
            );
        } else if (ganaste == 1) {
            overlay = (
                <div className="player-app__overlay">
                    <div className="mb-1"><b>GANASTE!!</b></div>
                    <div className="mb-1">Movimientos: {movimientos} </div>
                    <button onClick={this.startGame}>Start a new game</button>
                </div>
            );
            ganaste = 0;
        }
        return (
            <div
                className="player-app"
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