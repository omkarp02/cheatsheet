/*

an 8x8 game board
two human player
alternating turns between players
move valiton to ensure no illegal moves
detection of check, checkmate, or draw scenarios

*/

class Board {
  //here we can define a 8x8 matrix
}

class Player {}

abstract class Piece {
  private isWhitePiece: boolean;
  private isKilled: boolean;
  movementStategy: MovementStratergy;

  constructor(isWhitePiece: boolean, movementStategy: MovementStratergy) {
    this.isKilled = false;
    this.movementStategy = movementStategy;
    this.isWhitePiece = isWhitePiece;
  }

  getIsWhitePiece() {
    return this.isWhitePiece;
  }

  getIsKilled() {
    return this.isKilled;
  }

  setKilled() {
    this.isKilled = true;
  }

  canMove(board: Board, startCell: Cell, endCell: Cell){
    this.movementStategy.canMove(board, startCell, endCell)
  }
}

interface MovementStratergy {
  canMove(board: Board, startCell: Cell, endCell: Cell): void;
}

class Cell {
  row: number;
  col: number;
  piece: Piece;

  constructor(row: number, col: number, piece: Piece) {
    this.row = row;
    this.col = col;
    this.piece = piece;
  }

  getPiece() {
    return this.piece;
  }

  setPiece(piece: Piece) {
    this.piece = piece;
  }
}

class King extends Piece {
  constructor(isWhitePiece: boolean, movementStategy: MovementStratergy) {
    super(isWhitePiece, movementStategy);
  }
}

class KingMovementStratergy implements MovementStratergy {
  canMove(board: Board, startCell: Cell, endCell: Cell): void {
    //here you can check the board and see if it can move on the board
  }
}

class PieceFactory {
  static createPiece() {
    //here you can write logic and return the piece
  }
}


interface BoardGames {

}


class ChessGames implements BoardGames {
    //we can delclare board, player, player2
}
