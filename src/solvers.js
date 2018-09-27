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
  // make counter of non-conflicting pieces
  var nonConflictingPieces = 0;
  // make an array to store valid solutions
  var solutions;

  var checkForwardConfigurations = (row = 0, col = 0) => {
    // iterate through each row
    for (let i = row; i < n; i++) {
      // iterate through each column index in a row
      for (let j = i === row ? col : 0; j < n; j++) {
        // toggle the piece on the column index of the row
        board.togglePiece(i, j);
        // if there is any conflicting piece on rows and columns
        if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
          // delete the piece
          board.togglePiece(i, j);
        } else {
          // increment number of valid pieces
          nonConflictingPieces++;
          // recurse over possible permutations with the current configuration of the board
          return checkForwardConfigurations(i, j + 1);
        }
      }
    }
    
    // if counter of non-conflicting pieces equal value of n
    if (nonConflictingPieces === n) {
      console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
      return board.rows();
    }      
  };
  return checkForwardConfigurations();
}; // O(n^2) time complexity
  

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  // create a board that has n rows and columns
  var board = new Board({n: n});
  // make counter of non-conflicting pieces
  var nonConflictingPieces = 0;
  // make an array to store valid solutions
  var solutions = 0;

  var checkForwardConfigurations = (row = 0, col = 0) => {
    // iterate through each row
    for (let i = row; i < n; i++) {
      // iterate through each column index in a row
      for (let j = i === row ? col : 0; j < n; j++) {
        // toggle the piece on the column index of the row
        board.togglePiece(i, j);
        // if there is any conflicting piece on rows and columns
        if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
          // delete the piece
          board.togglePiece(i, j);
        } else {
          // increment number of valid pieces
          nonConflictingPieces++;
          // recurse over possible permutations with the current configuration of the board
          checkForwardConfigurations(i, j + 1);
          // undo most recent piece placement once all results of that configuration are checked
          board.togglePiece(i, j);
          // decrement number of valid pieces
          nonConflictingPieces--;
        }
      }
    }
    
    // if counter of non-conflicting pieces equal value of n
    if (nonConflictingPieces === n) { // if n valid pieces are placed
      solutions++; // increment number of solutions
    }      
  }; // O(n^2) time complexity

  checkForwardConfigurations(); // invoke recursive helper function

  console.log('Number of solutions for ' + n + ' rooks:', solutions);
  return solutions;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 2 || n === 3) {
    return new Board({n: n}).rows();
  }
  // create a board that has n rows and columns
  var board = new Board({n: n});
  // make counter of non-conflicting pieces
  var nonConflictingPieces = 0;

  var checkForwardConfigurations = (row = 0, col = 0) => {
    // iterate through each row
    for (let i = row; i < n; i++) {
      // iterate through each column index in a row
      for (let j = i === row ? col : 0; j < n; j++) {
        // toggle the piece on the column index of the row
        board.togglePiece(i, j);
        // if there is any conflicting piece on rows and columns
        if (board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
          // delete the piece
          board.togglePiece(i, j);
        // otherwise recursive call to a chessboard that starts on 
        } else {
          nonConflictingPieces++;
          if (checkForwardConfigurations(i, j + 1)) {
            return board.rows().slice(0);
          }
          // undo most recent piece placement once all results of that configuration are checked
          board.togglePiece(i, j);
          // decrement number of valid pieces
          nonConflictingPieces--;
        }
      }
    }
    
    // if counter of non-conflicting pieces equal value of n
    if (nonConflictingPieces === n) {
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
  // make counter of non-conflicting pieces
  var nonConflictingPieces = 0;
  // make an array to store valid solutions
  var solutions = 0;

  var checkForwardConfigurations = (row = 0, col = 0) => {
    // iterate through each row
    for (let i = row; i < n; i++) {
      // iterate through each column index in a row
      for (let j = i === row ? col : 0; j < n; j++) {
        // toggle the piece on the column index of the row
        board.togglePiece(i, j);
        // if there is any conflicting piece on rows and columns
        if (board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
          // delete the piece
          board.togglePiece(i, j);
        } else {
          // increment number of valid pieces
          nonConflictingPieces++;
          // recurse over possible permutations with the current configuration of the board
          checkForwardConfigurations(i, j + 1);
          // undo most recent piece placement once all results of that configuration are checked
          board.togglePiece(i, j);
          // decrement number of valid pieces
          nonConflictingPieces--;
        }
      }
    }
    
    // if counter of non-conflicting pieces equal value of n
    if (nonConflictingPieces === n) { // if n valid pieces are placed
      solutions++; // increment number of solutions
    }      
  };

  checkForwardConfigurations(); // invoke recursive helper function

  console.log('Number of solutions for ' + n + ' queens:', solutions);
  return solutions;
}; // O(n^2) time complexity