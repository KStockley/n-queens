// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var present = false;
      for (let i = 0; i < rowIndex.length; i++) {
        if (rowIndex[i] && present) {
          return true;
        } else if (rowIndex[i]) {
          present = true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();
      for (var row of board) {
        if (this.hasRowConflictAt(row)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // generate a board
      var board = this.rows();
      // make a Boolean to represent the presence of a piece
      var present = false;
      // for each row of the board
      for (var row of board) {
        // if the value at colIndex of the row contains a piece AND a piece is already present
        if (row[colIndex] && present) {
          // we have a conflict and return true
          return true;
        // otherwise if the value at colIndex contains a piece
        } else if (row[colIndex]) {
          // then we set Boolean to true
          present = true;
        }
      }
      // return false if for loop finishes without returning true
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // iterate over each column of the board (n)
      for (let i = 0; i < this.get('n'); i++) {
        // invoke hasColConflictAt passing each colIndex, and if that results in true, immediately return true
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      // if no conflicts are found, return false
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // create a Boolean that represents a piece already found
      var present = false;
      // create a board
      var board = this.rows();
      // iterate over each row of the board
      for (let i = 0; i < board.length; i++) {
        // if the offset column index of this row contains a piece and a piece already has been found
        if (board[i][i + majorDiagonalColumnIndexAtFirstRow] && present) {
          // return true
          return true;
        // otherwise if this index contains a piece 
        } else if (board[i][i + majorDiagonalColumnIndexAtFirstRow]) {
          // set the Boolean to true
          present = true;
        }
      }
      // if no conflict is found return false
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // iterate over every offset column index of the first row
      for (let i = -(this.get('n')); i < this.get('n'); i++) {
        // if the resulting diagonal has a conflict
        if (this.hasMajorDiagonalConflictAt(i)) {
          // immediatly return true
          return true;
        }
      }
      // otherwise no conflict is found return false
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // create a Boolean that represents a piece already found
      var present = false;
      // create a board
      var board = this.rows();
      // iterate over each row of the board
      for (let i = 0; i < board.length; i++) {
        // if the offset column index of this row contains a piece and a piece already has been found
        if (board[i][minorDiagonalColumnIndexAtFirstRow - i] && present) {
          // return true
          return true;
        // otherwise if this index contains a piece 
        } else if (board[i][minorDiagonalColumnIndexAtFirstRow - i]) {
          // set the Boolean to true
          present = true;
        }
      }
      // if no conflict is found return false
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // iterate over every offset column index of the first row
      for (let i = 0; i < 2 * (this.get('n')); i++) {
        // if the resulting diagonal has a conflict
        if (this.hasMinorDiagonalConflictAt(i)) {
          // immediatly return true
          return true;
        }
      }
      // otherwise no conflict is found return false
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
