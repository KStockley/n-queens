/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // create a board that has n rows and columns
  var board = new Board({n: n});

  var checkForwardConfigurations = (row = 0, col = 0, valid = 0) => { // generate all permutations that follow the current board state
    // store the current number of valid pieces
    var validPieces = valid;
    // iterate through each row without repeating previous pieces
    for (let i = row; i < n; i++) {
      // iterate through each column index in a row without repeating previous pieces
      for (let j = i === row ? col : 0; j < n; j++) {
        // place a piece on the column index of the row
        board.togglePiece(i, j);
        // if there is a conflicting piece
        if (board.hasAnyRooksConflicts()) {
          // remove this piece
          board.togglePiece(i, j);
        } else {
          // increment number of valid pieces
          validPieces++;
          // recurse over all permutations following from this board configuration
          return checkForwardConfigurations(i, j + 1, validPieces);
        }
      }
    }
    
    // if the number of valid pieces is equal to n
    if (validPieces === n) {
      // we have a solution configuration
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
      return board.rows(); // return the matrix of the solution
    }      
  };
  return checkForwardConfigurations();
}; // O(n^2) time complexity
  

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // create a board that has n rows and columns
  var board = new Board({n: n});
  // make a counter for found valid solutions
  var solutions = 0;

  var checkForwardConfigurations = function (row = 0, col = 0, valid = 0, blocked = []) { // generate all permutations that follow the current board state
  // store the current number of valid pieces
    var validPieces = valid;
    // create Booleans to represent if the current place is in a blocked row or column
    var blockedRow = false;
    var blockedCol = false;
    // iterate through each row without repeating previous pieces
    for (let i = row; i < n; i++) {
      // iterate through each column index in a row without repeating previous pieces
      for (let j = i === row ? col : 0; j < n; j++) {
        // compare current coordinates against occupied coordinates
        for (let k = 0; k < blocked.length; k++) {
          // if this space is in the same row as an occupied space
          if (i === blocked[k][0]) {
            // then the Boolean switches to true and we break out of the coordinate comparison loop
            blockedRow = true;
            break;
          }
          // if this space is in the same column as an occupied space
          if (j === blocked[k][1]) {
            // then the Boolean switches to true and we break out of the coordinate comparison loop
            blockedCol = true;
            break;
          }
        }
        // if this space is in a blocked row
        if (blockedRow) {
          // reset the Boolean
          blockedRow = false;
          // and break to the next row iteration;
          break;
        }
        // if this space is in a blocked column
        if (blockedCol) {
          // reset the Boolean
          blockedCol = false;
          // and continue to the next space iteration in this row
          continue;
        }
        // Otherwise there is no conflict
        // place a piece on the column index of the row
        board.togglePiece(i, j);
        // if there is a conflicting piece
        if (board.hasAnyRooksConflicts()) {
          // remove this piece
          board.togglePiece(i, j);
        } else {
          // increment number of valid pieces
          validPieces++;
          // push current coordinates into the list of blocks
          blocked.push([i, j]);
          // recurse over possible permutations following the current configuration of the board
          checkForwardConfigurations(i, j + 1, validPieces, blocked);
          // undo most recent piece placement once all permutations following that configuration are checked
          board.togglePiece(i, j);
          // delete removed piece from blocked
          blocked.pop();
          // decrement number of valid pieces
          validPieces--;
        }
      }
    }
    
    // if the number of valid pieces is equal to n
    if (validPieces === n) {
      solutions++; // increment number of solutions
    }      
  }; // O(n^2) time complexity

  checkForwardConfigurations(); // check for valid solution permutations

  console.log('Number of solutions for ' + n + ' rooks:', solutions);
  return solutions;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 2 || n === 3) { // n=2 and n=3 have no solutions
    return new Board({n: n}).rows(); // return an empty board
  }
  // create a board that has n rows and columns
  var board = new Board({n: n});

  var checkForwardConfigurations = (row = 0, col = 0, valid = 0) => {
    // store the current number of valid pieces
    var validPieces = valid;
    // iterate through each row without repeating previous pieces
    for (let i = row; i < n; i++) {
      // iterate through each column index in a row without repeating previous pieces
      for (let j = i === row ? col : 0; j < n; j++) {
        // place a piece on the column index of the row
        board.togglePiece(i, j);
        // if there is a conflicting piece
        if (board.hasAnyQueensConflicts()) {
          // remove the piece
          board.togglePiece(i, j);
        // otherwise recursive call to a chessboard that starts on 
        } else {
          // increment number of valid pieces
          validPieces++;
          // if a valid solution results from any permutation following this board state
          if (checkForwardConfigurations(i, j + 1, validPieces)) {
            return board.rows().slice(0); // return the solution
          } // otherwise
          // remove the most recent piece once all permutations following that configuration are checked with no valid solution
          board.togglePiece(i, j);
          // decrement number of valid pieces
          validPieces--;
        }
      }
    }
    
    // if the number of valid pieces is equal to n
    if (validPieces === n) {
      console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
      return board.rows();
    }      
  };
  return checkForwardConfigurations();
}; // O(n^2) time complexity

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // create a board that has n rows and columns
  var board = new Board({n: n});
  // make a counter for found valid solutions
  var solutions = 0;

  var checkForwardConfigurations = function (row = 0, col = 0, valid = 0, blocked = []) {
  // store the current number of valid pieces
    var validPieces = valid;
    // create Booleans to represent if the current place is in a blocked row or column
    var blockedRow = false;
    var blockedCol = false;
    var blockedDiag = false;
    // iterate through each row without repeating previous pieces
    for (let i = row; i < n; i++) {
      // iterate through each column index in a row without repeating previous pieces
      for (let j = i === row ? col : 0; j < n; j++) {
        // compare current coordinates against occupied coordinates
        for (let k = 0; k < blocked.length; k++) {
          // if this space is in the same row as an occupied space
          if (i === blocked[k][0]) {
            // then the Boolean switches to true and we break out of the coordinate comparison loop
            blockedRow = true;
            break;
          }
          // if this space is in the same column as an occupied space
          if (j === blocked[k][1]) {
            // then the Boolean switches to true and we break out of the coordinate comparison loop
            blockedCol = true;
            break;
          }
          // if this space is in the same diagonal as an occupied space
          if (Math.abs(i - blocked[k][0]) === Math.abs(j - blocked[k][1])) {
            // then the Boolean switches to true and we break out of the coordinate comparison loop
            blockedDiag = true;
            break;
          }
        }
        // if this space is in a blocked row
        if (blockedRow) {
          // reset the Boolean
          blockedRow = false;
          // and break to the next row iteration;
          break;
        }
        // if this space is in a blocked column or diagonal
        if (blockedCol || blockedDiag) {
          // reset the Booleans
          blockedCol = false;
          blockedDiag = false;
          // and continue to the next space iteration in this row
          continue;
        }
        // Otherwise there is no conflict
        // place a piece on the column index of the row
        board.togglePiece(i, j);
        // if there is a conflicting piece
        if (board.hasAnyQueensConflicts()) {
          // remove the piece
          board.togglePiece(i, j);
        } else {
          // increment number of valid pieces
          validPieces++;
          // push current coordinates into the list of blocks
          blocked.push([i, j]);
          // recurse over possible permutations following the current configuration of the board
          checkForwardConfigurations(i, j + 1, validPieces, blocked);
          // undo most recent piece placement once all permutations following that configuration are checked
          board.togglePiece(i, j);
          // decrement number of valid pieces
          validPieces--;
          // delete the removed piece from blocked
          blocked.pop();
        }
      }
    }
    
    // if the number of valid pieces is equal to n
    if (validPieces === n) {
      solutions++; // increment number of solutions
    }      
  };

  checkForwardConfigurations(); // check for valid solution permutations

  console.log('Number of solutions for ' + n + ' queens:', solutions);
  return solutions;
}; // O(n^2) time complexity