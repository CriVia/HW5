/*
File: scrabble.js
GUI Assignment 5: A bit of Scrabble with Drag-and-Drop
Yue Zhao, UMass Lowell Computer Science, yue_zhao@student.uml.edu
Copyright (c) 2021 by Yue. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by YZ on Aug 15, 2021 at 11:23 PM
The goal of this web page is to use jQuery UI to implement one line of Scrabble game with Drag-and-Drop.
*/

/*------------Configuration section-------------*/
// Add all const values needed and arrays
const RACK_SIZE = 7;
const DIALOG_ZINDEX = 100;
const TILE_ZINDEX = 99;

// I chose to use Prof. Heines' associative array version of the data structure under graphic_data/Scrabble_Pieces_AssociativeArray_Jesse.js
// Added below image array so that we can get the matched word tile's image correctly
var ScrabbleTileImages = [] ;
ScrabbleTileImages["_"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg";
ScrabbleTileImages["A"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_A.jpg";
ScrabbleTileImages["B"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_B.jpg";
ScrabbleTileImages["C"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_C.jpg";
ScrabbleTileImages["D"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_D.jpg";
ScrabbleTileImages["E"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_E.jpg";
ScrabbleTileImages["F"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_F.jpg";
ScrabbleTileImages["G"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_G.jpg";
ScrabbleTileImages["H"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_H.jpg";
ScrabbleTileImages["I"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_I.jpg";
ScrabbleTileImages["J"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_J.jpg";
ScrabbleTileImages["K"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_K.jpg";
ScrabbleTileImages["L"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_L.jpg";
ScrabbleTileImages["M"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_M.jpg";
ScrabbleTileImages["N"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_N.jpg";
ScrabbleTileImages["O"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_O.jpg";
ScrabbleTileImages["P"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_P.jpg";
ScrabbleTileImages["Q"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_Q.jpg";
ScrabbleTileImages["R"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_R.jpg";
ScrabbleTileImages["S"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_S.jpg";
ScrabbleTileImages["T"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_T.jpg";
ScrabbleTileImages["U"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_U.jpg";
ScrabbleTileImages["V"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_V.jpg";
ScrabbleTileImages["W"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_W.jpg";
ScrabbleTileImages["X"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_X.jpg";
ScrabbleTileImages["Y"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_Y.jpg";
ScrabbleTileImages["Z"] = "graphics_data/Scrabble_Tiles/Scrabble_Tile_Z.jpg";

// Single row board slot array.
// based on the Scrabble_Board_OneLine.png, there are 15 slots in one row.
// Also set multiplier for letter score and word score separately based on the board image.
// filled parameter is used to identify if a single row board slot is filed with a letter tile or not
// will use it to identify if after the first letter tile, all other letter tiles are adjacent with each other
// in the single row board. If not, bounce it back to the rack.
var singleRowBoard = {};
singleRowBoard.slots = [];
singleRowBoard.slots[0] = [];
singleRowBoard.slots[0][0] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][1] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][2] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 2 };
singleRowBoard.slots[0][3] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][4] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][5] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][6] = { "filled": false, "letterScoreMultiplier": 2, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][7] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][8] = { "filled": false, "letterScoreMultiplier": 2, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][9] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][10] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][11] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][12] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 2 };
singleRowBoard.slots[0][13] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 1 };
singleRowBoard.slots[0][14] = { "filled": false, "letterScoreMultiplier": 1, "wordScoreMultiplier": 1 };
singleRowBoard.columnCount = singleRowBoard.slots[0].length;
singleRowBoard.rowCount = singleRowBoard.slots.length;

/*------------Single row board section-------------*/
// Initialize single row board by attaching slots to it.
function initializeSingleRowBoard() {
  var rIndex, cIndex, singleRowBoardSlot;
  var singleRowBoardComponent = $("#single_row_board");

  for (rIndex = 0; rIndex < singleRowBoard.rowCount; ++rIndex) {
    for (cIndex = 0; cIndex < singleRowBoard.columnCount; ++cIndex) {
        singleRowBoardSlot = $("<div id='single_row_board_slot' class='single_row_board_slot' row='" + rIndex + "' col='" + cIndex + "' />");
      singleRowBoardComponent.append(singleRowBoardSlot);
    }
  }
}

// Returns true if the slot is marked as filled. False, otherwise.
function isSlotFilled(rIndex, cIndex) {
  return singleRowBoard.slots[rIndex][cIndex].filled;
}

// Returns true if all slots in the single row board are empty. False, otherwise.
function isBoardEmpty() {
    var rIndex, cIndex;
    var slotWithTile = false;
    for (rIndex = 0; rIndex < singleRowBoard.rowCount; ++rIndex) {
        for (cIndex = 0; cIndex < singleRowBoard.columnCount; ++cIndex) {
            slotWithTile |= isSlotFilled(rIndex.toString(), cIndex.toString());

            // If find any slot is filled already, no need to check other slots and return false directly
            if (slotWithTile) {
                return false;
            }
        }
    }

    // If no slot filled, return true
    return true;
}

// Returns true if the previous slot of slot (rIndex, cIndex) is marked as filled. False, otherwise.
// Used to support request: Except for the first letter, all sub-subsequent letters must be placed directly next to or below 
// another letter with no space. Else, they will bounce back to the "rack"
function isSingleRowBoardPreviousSlotFilled(rIndex, cIndex) {
    // (this method needs to be updated to support full board)
    // Return false directly if user wants to drop the tile to the first column in the one row board
    // while the one row board is not empty (that means this tile is not the first one)
    // This is used to avoid attempt to check the slot that is not exist (cIndex = -1)
    // Convert rIndex and cIndex to be integer so we can minor it by one to point to the previous slot
    var rIndexVal = parseInt(rIndex);
    var cIndexVal = parseInt(cIndex);
    if (cIndexVal === 0) {
        return isBoardEmpty();
    }

    return isSlotFilled(rIndexVal.toString(), (cIndex - 1).toString());
}

// Drop the letter tile to selected slot at (rIndex, cIndex).
// the matched tile id and letter of the tile will be attached to the slot in the single row board
// mark the slot's filled to be true
// There are two situations need to be handled.
// 1. user drag a letter tile from rack to slot. Just need to update slot itself.
// 2. user drag a letter tile from one slot to another. Need to clear the previous slot and update new slot accordingly
function dropLetterTileToSlot(rIndex, cIndex, letterTileId, letter) {
  var tmpRowIndex, tmpColIndex;

  // Search all slots in the single row board to find if there is any match based on letterTileId
  // If find, clear the slot and mark its "filled" parameter to be false.
  for (tmpRowIndex = 0; tmpRowIndex < singleRowBoard.rowCount; ++tmpRowIndex) {
    for (tmpColIndex = 0; tmpColIndex < singleRowBoard.columnCount; ++tmpColIndex) {
      if (singleRowBoard.slots[tmpRowIndex][tmpColIndex].tileId === letterTileId) {
        delete singleRowBoard.slots[tmpRowIndex][tmpColIndex].letterTileId;
        delete singleRowBoard.slots[tmpRowIndex][tmpColIndex].letter;
        singleRowBoard.slots[tmpRowIndex][tmpColIndex].filled = false;
      }
    }
  }

  // Update selected slot with letter tile's info and mark the slot "filled" to be true
  singleRowBoard.slots[rIndex][cIndex].letter = letter;
  singleRowBoard.slots[rIndex][cIndex].tileId = letterTileId;
  singleRowBoard.slots[rIndex][cIndex].filled = true;
}

// This is used when user clicked start over or complete game button.
// Clear everything from single row board so user can add new tiles to it.
function clearSingleRowBoard() {
  var rIndex, cIndex;

  for (rIndex = 0; rIndex < singleRowBoard.rowCount; ++rIndex) {
    for (cIndex = 0; cIndex < singleRowBoard.columnCount; ++cIndex) {
      // remove each slot's tileId, letter and set the slot's filled parameter to be false
      clearSingleRowBoardSlot(rIndex, cIndex);
    }
  }
  
  $("#single_row_board img").remove();
}

// Clear selected slot in single row board
// remove each slot's tileId, letter and set the slot's filled parameter to be false
function clearSingleRowBoardSlot(rIndex, cIndex) {
  delete singleRowBoard.slots[rIndex][cIndex].tileId;
  delete singleRowBoard.slots[rIndex][cIndex].letter;
  singleRowBoard.slots[rIndex][cIndex].filled = false;
}

// Find the position (row, col) of a tile on the single row board based on tile's id.
// Returns empty array if not find.
function findSlotBasedOnLetterTileId(letterTileId) {
  var rIndex, cIndex;

  for (rIndex = 0; rIndex < singleRowBoard.rowCount; ++rIndex) {
    for (cIndex = 0; cIndex < singleRowBoard.columnCount; ++cIndex) {
      if (singleRowBoard.slots[rIndex][cIndex].tileId === letterTileId) {
        return [rIndex, cIndex];
      }
    }
  }

  return [];
}

/*------------Rack section-------------*/
// Get all remaining letter tiles based on ScrabbleTiles' number-remaining for each tile
function getRemainingLetterTiles() {
    var remainingLetterTiles = [];
    var tile, index;
    for (tile in ScrabbleTiles) {
        if (ScrabbleTiles.hasOwnProperty(tile)) {
            var numRemaining = ScrabbleTiles[tile]["number-remaining"];
            for (index = 0; index < numRemaining; ++index) {
                remainingLetterTiles.push(tile);
            }
        }
    }

    return remainingLetterTiles;
}

// Get n letter tiles randomly based on the letter distribution (ScrabbleTiles).
// Return selected letter tiles in an array with size n. 
// Update ScrabbleTiles' number-remaining field for each letter to make sure still satisfy the distribution
// Return remaining tiles once the number is less than n
function getNRandomLetterTiles(n) {
  var nRandomLetterTiles = [];
  var remainingLetterTiles = getRemainingLetterTiles();
  var remainingLetterTilesLen = remainingLetterTiles.length;
  var index;

  // Try to pick out n letter tiles. If we don't have n tiles, then hand out whatever we have.
  for (index = 0; index < n; ++index) {
    if (remainingLetterTilesLen > 0) {
      var randomIndex = Math.floor(Math.random() * remainingLetterTilesLen);
      var randomLetter = remainingLetterTiles[randomIndex];
      nRandomLetterTiles.push(randomLetter);
      ScrabbleTiles[randomLetter]["number-remaining"] -= 1;
      remainingLetterTiles.splice(randomIndex, 1);
      remainingLetterTilesLen -= 1;
    }
  }

  // Show remaining letter tiles number
  $("#remainingTiles").html(remainingLetterTiles.length);

  return nRandomLetterTiles;
}

// Returns remaining letter tiles in ScrabbleTiles
function remainingLetterTileNum() {
  var remainingLetterTileNum = 0;

  for (var tile in ScrabbleTiles) {
    if (ScrabbleTiles.hasOwnProperty(tile)) {
      remainingLetterTileNum += ScrabbleTiles[tile]["number-remaining"];
    }
  }

  return remainingLetterTileNum;
}

// Control the display of next word word button and complete game button
function toggleButtons(showCompleteGameButton) {
  if (showCompleteGameButton) {
    $("#nextWordButton").addClass("hidden");
    $("#completeGameButton").removeClass("hidden");
  } else {
    $("#completeGameButton").addClass("hidden");
    $("#nextWordButton").removeClass("hidden");
  }
}

// Resets the board and tiles. Starts the first word with a fresh score.
function newGame() {
  // Clear the rack. (We're putting all tiles back to the deck.)
  $("#board_rack img").remove();

  // Remove all tiles from the board.
  clearSingleRowBoard();

  // Reset the deck data structure.
  for (var key in ScrabbleTiles) {
    if (ScrabbleTiles.hasOwnProperty(key)) {
      ScrabbleTiles[key]["number-remaining"] = ScrabbleTiles[key]["original-distribution"];
    }
  }

  // If we had consumed all tiles in the previous round, 'complete game' button would be up.
  // We need 'next-word' button instead now as we're starting a fresh round.
  toggleButtons(false);

  resetGameScore();

  // Start the first word.
  tryNextWord();
}

// Adds up the score. Removes all tiles from the board and adds to the rack whatever number of
// new tiles needed.
function tryNextWord() {
  var i, key, tileImageId, newTile, hand;

  submitGameScore();

  // Clear the board.
  clearSingleRowBoard();

  // Draw as many tiles as needed to refill the rack with tiles which number is defined in RACK_SIZE. Lay out the tile images.
  var remainingTilesInRack = $("#board_rack img").length;
  hand = getNRandomLetterTiles(RACK_SIZE - remainingTilesInRack);
  for (i = 0; i < hand.length; ++i) {
    key = hand[i];
    tileImageId = generateTileId();
    newTile = $("<img id=\"" + tileImageId + "\" src=\"" + ScrabbleTileImages[key] + "\" class=\"letterTile\" letter=\"" + key + "\" />");
    if (key == "_") {
      newTile.addClass("blankTile");
    }
    // Add tile image.
    $("#board_rack").append(newTile);

    // Apply CSS condition for the tile being on the rack. Apply CSS rule to this class to do minor position
    // adjustment to the tile image in order to make it sit naturally on the rack background image.
    newTile.addClass("letterTileOnRack");

    // Make the tile draggable.
    newTile.draggable({
      revertDuration: 200,  // msec
      start: function(event, ui) {
        // Tile should be on top of everything else when being dragged.
        $(this).css("z-index", TILE_ZINDEX);
        $(this).draggable("option", "revert", "invalid");
      },
      stop: function() {
        // Revert the z-index after drag.
        $(this).css("z-index", "");
      }
    });
  }

  // Rule validation and display matched error message if need.
  verifyNoGapRule(false);
  verifyTwoLettersRule(false);

  if (remainingLetterTileNum() == 0) {
    // Show 'complete game' button and hide 'next word' button when used all tiles.
    toggleButtons(true);
  } else {
    // Disable 'next Word' button initially. A valid word must be created in order to
    // proceed to the next word.
    document.getElementById("nextWordButton").disabled = true;
  }
}

// Adds up the current board score to the total score and stops the play.
// The only action that can be taken after this point is restarting the play from the beginning.
function completeGame() {
  submitGameScore();
  document.getElementById("completeGameButton").disabled = true;

  // Prevent all tiles from being dragged any more.
  $(".letterTile").draggable("disable");
}

// Generate a tile ID.
function generateTileId() {
  var tileId;
  generateTileId.id = ++generateTileId.id || 1;
  tileId = "tile" + generateTileId.id.toString();
  return tileId;
}

// Verify word based on tiles in the single row board against two letters rule and no gap rule.
function verifyFormedWord() {
  var cIndex, letter, errorNum = 0, word = "", rIndex = 0;

  // Update word string with the letters gathered from tiles in the board.
  for (cIndex = 0; cIndex < singleRowBoard.columnCount; ++cIndex) {
    letter = singleRowBoard.slots[rIndex][cIndex].letter;
    if (typeof(letter) === "undefined") {
      word += "\xC5";
    } else {
      word += letter;
    }
  }
  word = word.replace(/\xC5+$/, "");
  word = word.replace(/^\xC5+/, "");

  // For Empty board
  if (word == "") {
    verifyNoGapRule(false);
    ++errorNum;
  } else {
    // Verify gap based on regex
    var rgxDisconnectedWord = new RegExp("[A-Z_]\xC5+[A-Z_]");
    if (rgxDisconnectedWord.test(word)) {
      verifyNoGapRule(false);
      ++errorNum;
    } else {
      verifyNoGapRule(true);
    }
  }

  // Verify two letters rule
  if (word.length >= 2) {
    verifyTwoLettersRule(true);
  } else {
    verifyTwoLettersRule(false);
    ++errorNum;
  }

  // disable next word button if there is error
  if (errorNum) {
    document.getElementById("nextWordButton").disabled = true;
    return false;
  }

  document.getElementById("nextWordButton").disabled = false;
  return word;
}

// Verify two letters rule and no gap rule. If invalid, show matched error message on the page.
function verifyTwoLettersRule(inValid) {
  if (inValid) {    
    $("#twoLettersError").addClass("hidden");
  } else {
    $("#twoLettersError").removeClass("hidden");
  }
}

function verifyNoGapRule(inValid) {
  if (inValid) {    
    $("#noGapError").addClass("hidden");
  } else {
    $("#noGapError").removeClass("hidden");
  }
}

// Generate a dialog box to allow user to replace blank tile with any letter. The blank tile's letter will be replaced with the selected letter.
// Once replaced, the blank tile will performed like the selected letter tile inside of single row board;
function generateBlankTileReplacingDialog(blankTileDraggable, tileId, row, col) {
  var tileSelectorDialog = $("<div id='blankTileReplacingDialog'></div>");
  var letter, replaceTile;
  
  // Add all letter tiles into replacing dialog for user to choose. Not include blank tile.
  for (letter in ScrabbleTiles) {
    if (letter != "_") {
      replaceTile = $("<img src='" + ScrabbleTileImages[letter] + "' class='letterTileInReplacingDialog' letter='" + letter + "'>");

      // Register click event to the image. This callback must make sure everything gets processed
      // with the selected letter as if it was played normally.
      replaceTile.click(function() {
        var newLetter = $(this).attr("letter");

        // Replace the letter attribute and the image source of the draggable tile img.
        blankTileDraggable.attr("letter", newLetter);
        blankTileDraggable.attr("src", ScrabbleTileImages[newLetter]);

        // Reset all the values of board and score
        tileId = blankTileDraggable.attr("id");
        dropLetterTileToSlot(row, col, tileId, newLetter);
        verifyFormedWord();
        updateGameScore();

        tileSelectorDialog.dialog("close");
      });
      tileSelectorDialog.append(replaceTile);
    }
  }
  tileSelectorDialog.css("z-index", DIALOG_ZINDEX);
  tileSelectorDialog.dialog({
    modal: true,
    draggable: false,
    resizable: false
  });
}

/*------------Score section-------------*/
var currentScore = 0;
var highestScore = 0;

// Get the score for the game based on tiles on the board.
function getGameScore() {
  var rIndex, cIndex, letter, letterValue, totalWordScoreMultiplier = 1, boardScore = 0;

  if (!verifyFormedWord()) {
    return 0;
  }

  // Add up all the letters' values. Count for letter modifiers on the way.
  for (rIndex = 0; rIndex < singleRowBoard.rowCount; ++rIndex) {
    for (cIndex = 0; cIndex < singleRowBoard.columnCount; ++cIndex) {
      letter = singleRowBoard.slots[rIndex][cIndex].letter;
      if (letter) {
        letterValue = ScrabbleTiles[letter].value;
        boardScore += letterValue * singleRowBoard.slots[rIndex][cIndex].letterScoreMultiplier;

        // We're pre-multiplying all the word modifiers here.
        totalWordScoreMultiplier *= singleRowBoard.slots[rIndex][cIndex].wordScoreMultiplier;
      }
    }
  }

  // Now apply the word modifier.
  boardScore *= totalWordScoreMultiplier;

  return boardScore;
}

// Updates the game score and score_table texts.
function updateGameScore() {
  var boardScore = getGameScore();

  $("#score").css("color", "");
  $("#score").html(currentScore + " (+<span id='boardScore'>" + boardScore + "</span>)");
  if (boardScore > 0) {
    $("#boardScore").css("color", "#039603");
  } else {
    $("#boardScore").css("color", "red");
  }

  $("#gameScore").html(highestScore);
}

// Recalculate the current game score and highest score.
function submitGameScore() {
  var boardScore = getGameScore();

  currentScore += boardScore;
  $("#score").html(currentScore);
  if (currentScore > 0) {
    $("#score").css("color", "#039603");
  }

  if (currentScore > highestScore) {
    highestScore = currentScore;
    $("#highestScore").html(highestScore);
    $("#highestScore").css("color", "#039603");
  }
}

// Resets the game store when user click complete game button
// highest score will be kept for user's record
function resetGameScore() {
  currentScore = 0;
  $("#score").html(currentScore);
  $("#highestScore").css("color", "");
}

$(window).load(function() {
  // After window load, initialize the single row board to append slots to it
  initializeSingleRowBoard();

  // Make the single row board slots droppable.
  $(".single_row_board_slot").droppable({
    // Highlight droppable slot when a letter tile is dragged to the single row board.
    accept: function(draggable) {
      var rIndex, cIndex;

      rIndex = $(this).attr("row");
      cIndex = $(this).attr("col");

      if (singleRowBoard.slots[rIndex][cIndex].tileId === draggable.attr("id")) {
        // Allow drop tile back to its current slot
        return true;
      } else if (!isSlotFilled(rIndex, cIndex) && (isBoardEmpty() || isSingleRowBoardPreviousSlotFilled(rIndex, cIndex))) {
        // Check the slot is empty first. Then check the single row board is empty (this is the first tile) or the previous slot is filled.
        return true;
      } else {
        // Otherwise, return false and block tile to be dropped to the selected slot.
        return false;
      }
    },
    activeClass: "highlightDropTarget",
    hoverClass: "highlightHoverTarget",
    drop: function(event, ui) {
      var rIndex, cIndex, letter, tileId, previousPositionOnBoard;

      rIndex = $(this).attr("row");
      cIndex = $(this).attr("col");
      ui.draggable.removeClass("letterTileOnRack");
      ui.draggable.addClass("letterTileOnBoard");
      letter = ui.draggable.attr("letter");
      tileId = ui.draggable.attr("id");

      // Make sure tile can be dropped exactly on top of the slot area.
      $(ui.draggable).css("left", "").css("top", "");
      $(this).append(ui.draggable);

      // When a blank tile is first placed on the board, open up a dialog and let the user
      // pick a letter for the blank tile. Otherwise move on.
      previousPositionOnBoard = findSlotBasedOnLetterTileId(tileId);
      if ($(ui.draggable).hasClass("blankTile") && previousPositionOnBoard.length === 0) {
        generateBlankTileReplacingDialog($(ui.draggable), tileId, rIndex, cIndex);
      } else {
        dropLetterTileToSlot(rIndex, cIndex, tileId, letter);
        // Validate and display the word we have so far.
        verifyFormedWord();

        // Calculate the score and update the page.
        updateGameScore();
      }
    }
  });

  // Make the rack droppable so the tiles can be moved from the board to the rack.
  $("#board_rack").droppable({
    activeClass: "highlightDropTarget",
    hoverClass: "highlightHoverTarget",
    tolerance: "touch",
    drop: function(event, ui) {
      var tileId, pos;

      ui.draggable.removeClass("letterTileOnBoard");
      ui.draggable.addClass("letterTileOnRack");

      // Replace blank tile when drag back to rack.
      if ($(ui.draggable).hasClass("blankTile")) {
        $(ui.draggable).attr("src", ScrabbleTileImages["_"]);
      }

      tileId = ui.draggable.attr("id");
      pos = findSlotBasedOnLetterTileId(tileId);
      if (pos.length > 0) {
        // Clear selected slot since the tile is dragged back to rack
        clearSingleRowBoardSlot(pos[0], pos[1]);
        $("#board_rack").append(ui.draggable);
        ui.draggable.css({"position": "relative", "top": "", "left": ""});

        // Validate and display the word we have so far.
        word = verifyFormedWord();

        // Calculate the score and update the page.
        updateGameScore();
      } else {
        // User grabbed the tile and put it right back on the rack. Use the revert function
        // to put the tile in the same spot it came out of.
        ui.draggable.draggable("option", "revert", true);
      }
    }
  });

  // Set the board and tiles. Start the first word.
  newGame();
});
