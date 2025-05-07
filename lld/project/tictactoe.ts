// 1. Get requirement
//2. get key component
//3. design challanges

import { StatSyncFn } from "fs";

const enum SYMBOL {
  X = "X",
  O = "O",
}

class GameController {}

interface Player {
  makeMove(symbol: SYMBOL): void;
}

interface Oberserver {
    update(board: Board): void
}

class PlayerFactory {
  static createPlayer(symbol: SYMBOL) {
    return new HumanPlayer(symbol);
  }
}



class HumanPlayer implements Player, Oberserver {
  public symbol: SYMBOL;
  constructor(symbol: SYMBOL) {
    this.symbol = symbol;
  }

  update(board: Board): void {
      
  }

  makeMove(symbol: SYMBOL): void {
    //here do something with grid
  }
}

const humanPlayer = PlayerFactory.createPlayer(SYMBOL.O);

class Board {
  private board: SYMBOL[][];
    
  constructor(size: number) {
    this.board = Array.from({ length: size }, () => []);
  }



  updateBoard(row: number, col: number, symbol: SYMBOL) {
    this.board[row][col] = symbol
  }
}


