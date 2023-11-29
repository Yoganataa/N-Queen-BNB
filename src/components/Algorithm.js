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

  function countConflicts(row, col) {
    let conflicts = 0;
    for (let i = 0; i < N; i++) {
      if (board[i][col].hasQueen || board[row][i].hasQueen) {
        conflicts++;
      }
      if (i !== row) {
        const d1 = col - (row - i);
        const d2 = col + (row - i);
        if (d1 >= 0 && d1 < N && board[i][d1].hasQueen) conflicts++;
        if (d2 >= 0 && d2 < N && board[i][d2].hasQueen) conflicts++;
      }
    }
    return conflicts;
  }

  function findMinConflictsRow(col) {
    let minConflicts = Infinity;
    let minRow = -1;

    for (let i = 0; i < N; i++) {
      if (!board[i][col].hasQueen) {
        const conflicts = countConflicts(i, col);
        if (conflicts < minConflicts) {
          minConflicts = conflicts;
          minRow = i;
        }
      }
    }

    return minRow;
  }

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

    // Use Branch and Bound to prioritize rows with fewer conflicts
    const row = findMinConflictsRow(col);

    if (isAnimationNeeded) saveAnimation(row, col);

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
