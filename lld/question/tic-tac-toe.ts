/*

Candidate considering we have standard 3x3 grid
allow two player to play
provide more validation
detect win or draw


Key component

symbol
cell
board



*/

import * as readline from "readline";
import { promisify } from "util";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Convert rl.question to a promise-based function
const question = promisify(rl.question).bind(rl);

const SYMBOL = {
  X: "X",
  O: "O",
  EMPTY: "E",
} as const;

type TSymbol = (typeof SYMBOL)[keyof typeof SYMBOL];

class Board {
  board: TSymbol[][] = [];
  constructor() {
    for (let i = 0; i < 3; i++) {
      this.board[i] = [];
      for (let j = 0; j < 3; j++) {
        this.board[i][j] = "E";
      }
    }
  }

  printBoard() {
    for (let row = 0; row < 3; row++) {
      let str = "|";
      for (let col = 0; col < 3; col++) {
        str += this.board[row][col] === "E" ? " " : this.board[row][col];
        str += "|";
      }
      console.log(str);
    }
  }

  validMove(position: Position): boolean {
    if (
      position.row < 0 ||
      position.row >= 3 ||
      position.col < 0 ||
      position.col >= 3
    ) {
      return false; // Out of bounds
    }

    return this.board[position.row][position.col] === "E";
  }

  makeMove(position: Position, symbol: TSymbol) {
    this.board[position.row][position.col] = symbol;
  }

  checkGameState(gameContext: GameContext) {
    for (let row of this.board) {
      let cursymbol = row[0];
      let isWin = true;
      for (let i = 1; i < row.length; i++) {
        if (cursymbol !== row[i]) {
          isWin = false;
        }
      }
      if (isWin) {
        gameContext.next(cursymbol, true);
        return;
      }
    }

    for (let i = 0; i < this.board.length; i++) {
      let cursymbol = this.board[0][i];
      let isWin = true;
      for (let row = 1; row < this.board.length; row++) {
        if (cursymbol !== this.board[row][i]) {
          isWin = false;
        }
      }
      if (isWin) {
        gameContext.next(cursymbol, true);
        return;
      }
    }
  }
}

interface GameState {
  next(context: GameContext, symbol: TSymbol, gameWon: boolean): void;
  gameOver(): boolean;
}

class XTurnState implements GameState {
  gameOver(): boolean {
    return false;
  }
  next(context: GameContext, symbol: TSymbol, gameWon: boolean): void {
    if (gameWon) {
      context.setState(symbol === "X" ? new XWonState() : new OWonState());
    } else {
      context.setState(new OTurnState());
    }
  }
}

class OTurnState implements GameState {
  gameOver(): boolean {
    return false;
  }
  next(context: GameContext, symbol: TSymbol, gameWon: boolean): void {
    if (gameWon) {
      context.setState(symbol === "X" ? new XWonState() : new OWonState());
    } else {
      context.setState(new XTurnState());
    }
  }
}

class XWonState implements GameState {
  gameOver(): boolean {
    return true;
  }

  next(context: GameContext, symbol: TSymbol, gameWon: boolean): void {
    console.log("Game Over X Win");
  }
}

class OWonState implements GameState {
  gameOver(): boolean {
    return true;
  }

  next(context: GameContext, symbol: TSymbol, gameWon: boolean): void {
    console.log("Game Over O Win");
  }
}

class GameContext {
  currentState: GameState;
  constructor() {
    this.currentState = new XTurnState();
  }

  setState(state: GameState) {
    this.currentState = state;
  }

  next(symbol: TSymbol, gameWon: boolean) {
    this.currentState.next(this, symbol, gameWon);
  }

  getState() {
    return this.currentState;
  }
}

class Position {
  row: number;
  col: number;
  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  print() {
    console.log(`(${this.row} ${this.col})`);
  }
}

interface PlayerStrategy {
  makeMove(): Promise<Position>;
}

class HumanPlayerStratergy implements PlayerStrategy {
  async makeMove() {
    const row = await question("Enter your row: ");
    const col = await question("Enter your col:");

    if (typeof row !== "number" || typeof col !== "number") {
      throw Error("Invalid input");
    }

    const position = new Position(row, col);
    return position;
  }
}

class Player {
  symbol: TSymbol;
  player: PlayerStrategy;
  constructor(symbol: TSymbol, player: PlayerStrategy) {
    this.symbol = symbol;
    this.player = player;
  }

  getSymbol() {
    return this.symbol;
  }

  getPlayerStratergy() {
    return this.player;
  }
}

