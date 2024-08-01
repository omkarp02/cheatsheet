// Palindrome Partitioning
var partition = function (s) {
  const result = [];
  partitionHlp([], s, result);
  return result;
};

function partitionHlp(cur, str, result) {
  if (str.length === 0) {
    result.push([...cur]);
  }

  for (let i = 1; i <= str.length; i++) {
    const subString = str.substring(0, i);
    const newStr = str.slice(i, str.length);
    const isPalindrome = isPalindromeFn(subString);
    if (isPalindrome) {
      partitionHlp([...cur, subString], newStr, result);
    }
  }
}

function isPalindromeFn(str) {
  let low = 0;
  let high = str.length - 1;

  while (low < high) {
    if (str[low] !== str[high]) {
      return false;
    }

    low++;
    high--;
  }
  return true;
}

// console.log(partition("efe"));

// Word Search
var wordSearch = function (board, word) {
  const backTrackBoard = [];

  for (let k = 0; k < board.length; k++) {
    backTrackBoard.push(Array(board[0].length).fill(false));
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (wordSearchHlp(i, j, backTrackBoard, board, word, 0)) return true;
    }
  }

  return false;
};

function wordSearchHlp(r, c, backTrackBoard, board, word, i) {
  if (board[r][c] !== word[i]) {
    return false;
  }

  if (backTrackBoard[r][c]) {
    return false;
  }

  if (i === word.length - 1 && board[r][c] === word[i]) {
    return true;
  }

  backTrackBoard[r][c] = true;

  //right side
  if (c < board[0].length - 1) {
    if (wordSearchHlp(r, c + 1, backTrackBoard, board, word, i + 1))
      return true;
  }

  //left side
  if (c > 0) {
    if (wordSearchHlp(r, c - 1, backTrackBoard, board, word, i + 1))
      return true;
  }

  //down side
  if (r < board.length - 1) {
    if (wordSearchHlp(r + 1, c, backTrackBoard, board, word, i + 1))
      return true;
  }

  //up side
  if (r > 0) {
    if (wordSearchHlp(r - 1, c, backTrackBoard, board, word, i + 1))
      return true;
  }

  backTrackBoard[r][c] = false;

  return false;
}

const board = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];

const word = "ABCCED";

// console.log(wordSearch(board, word));

// N Queen
//so while checking for queen don't check below row so don't have any queen
var solveNQueens = function (n) {
    const board = [];
    const result = [];
  
    for (let k = 0; k < n; k++) {
      board.push(Array(n).fill(false));
    }
  
    for (let i = 0; i < board[0].length; i++) {
      board[0][i] = true;
      solveNQueenHlp(1, board, result);
      board[0][i] = false;
    }
  
    return result;
  };
  
  function solveNQueenHlp(r, board, result) {
    if (r > board.length - 1) {
      result.push(createQueenPattern(board));
      return;
    }
  
    for (let c = 0; c < board[r].length; c++) {
      if (!checkQueenExist(r, c, board)) {
        board[r][c] = true;
        solveNQueenHlp(r + 1, board, result);
        board[r][c] = false;
      }
    }
  }
  
  function checkQueenExist(r, c, board) {
    //up
    for (let i = 0; i < r; i++) {
      if (board[r - 1 - i][c]) return true;
    }
  
    //rightdiagonal
    for (let j = 0; j < Math.min(board.length - c - 1, r); j++) {
      if (board[r - j - 1][c + 1 + j]) return true;
    }
  
    //leftdiagoanl
    for (let k = 0; k < Math.min(c, r); k++) {
      if (board[r - k - 1][c - k - 1]) return true;
    }
  
    return false;
  }
  
  function createQueenPattern(board) {
    const finalStr = [];
    for (let r = 0; r < board.length; r++) {
      let str = "";
      for (let c = 0; c < board[r].length; c++) {
        str += board[r][c] ? "Q" : ".";
      }
      finalStr.push(str);
    }
    return finalStr
  }

// console.log(solveNQueens(4));
