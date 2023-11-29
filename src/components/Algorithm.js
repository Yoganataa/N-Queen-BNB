export default function solvePuzzle(board) {
  const N = board.length;
  const results = [];
  const animations = [];
  let isAnimationNeeded = true;

  function saveAnimation(i, j) {
    const temp = JSON.parse(JSON.stringify(board));
    temp[i][j].isActive = true;
    animations.push(temp);
  }

  // Define the isSafe function
  function isSafe(row, col) {
    let i, j;

    for (i = 0; i < col; i++) if (board[row][i].hasQueen) return false;

    for (i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--)
      if (board[i][j].hasQueen) return false;

    for (i = row + 1, j = col - 1; j >= 0 && i < N; i++, j--)
      if (board[i][j].hasQueen) return false;

    return true;
  }

  // ... (rest of the code)

  function placeQueen(col) {
    if (col >= N) {
      const solutionBoard = JSON.parse(JSON.stringify(board));
      results.push(solutionBoard);
      if (isAnimationNeeded) {
        animations.push(solutionBoard.slice());
        isAnimationNeeded = false;
      }
      return true;
    }

    let res = false;

    const row = findMinConflictsRow(col);

    if (isAnimationNeeded) saveAnimation(row, col);

    // Use the isSafe function here
    if (isSafe(row, col)) {
      board[row][col].hasQueen = true;

      if (isAnimationNeeded) saveAnimation(row, col);

      res = placeQueen(col + 1);

      board[row][col].hasQueen = false;
    }

    return res;
  }

  if (placeQueen(0)) {
    console.log("Soln found!!");
  }

  return { results, animations };
}
