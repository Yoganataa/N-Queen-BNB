export default function solvePuzzle(board) {
  const N = board.length;
  const results = [];
  const animations = [];
  let isAnimationNeeded = true;

  function saveAnimation(i, j) {
    const temp = JSON.parse(JSON.stringify(board)); // create a copy of the board
    temp[i][j].isActive = true;
    animations.push(temp); // save the animation
  }

  function isSafe(row, col) {
    // same code as before
  }

  function getHeuristic(col) {
    // Define heuristic for this column. You can experiment with different heuristics
    return col;
  }

  function placeQueen(col) {
    // same code as before, but instead of returning true when the solution is found, we add it to the results array
    if (col >= N) {
      const solutionBoard = JSON.parse(JSON.stringify(board));
      results.push(solutionBoard); // push this solution and search for another solution
      if (isAnimationNeeded) {
        animations.push(solutionBoard.slice()); // push the final result
        isAnimationNeeded = false; // save animation only for one solution
      }
    }

    // Consider this col and try to place this queen in all rows one by one
    for (let i = 0; i < N; i++) {
      let row = i;
      if (isAnimationNeeded) saveAnimation(row, col);
      // Check if the queen can be placed on board[i][col]
      if (isSafe(row, col)) {
        board[row][col].hasQueen = true; // Place queen

        if (isAnimationNeeded) saveAnimation(row, col);

        // Recursion to place the rest of the queens
        placeQueen(col + 1);

        // If placing the queen in board[i][col] doesn't lead to a solution, then remove the queen from board[i][col]
        board[row][col].hasQueen = false;
      }
    }
  }

  // Start the branch and bound algorithm without using a priority queue
  const nodes = Array.from({ length: N }, (_, col) => ({
    col: col,
    board: JSON.parse(JSON.stringify(board)),
    heuristic: getHeuristic(col),
  }));

  // Sort nodes based on heuristic value
  nodes.sort((a, b) => a.heuristic - b.heuristic);

  // Explore nodes in sorted order
  for (const node of nodes) {
    const { col, board } = node;
    // Place the queen at the current column and continue the search
    placeQueen(col);
  }

  return { results, animations };
}
