export default function solvePuzzle(board) {
 const N = board.length;
 const results = [];
 const animations = [];
 let isAnimationNeeded = true;

 function saveAnimation(i, j) {
    const temp = JSON.parse(JSON.stringify(board)); // create copy of board
    temp[i][j].isActive = true;
    animations.push(temp); // save animation
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
        animations.push(solutionBoard.slice()); // push final result;
        isAnimationNeeded = false; // save animation only for one solution
      }
    }

    // Consider this col and try to place this queen in all row one by one
    for (let i = 0; i < N; i++) {
      let row = i;
      if (isAnimationNeeded) saveAnimation(row, col);
      // Check if queen can be placed on board[i][col];
      if (isSafe(row, col)) {
        board[row][col].hasQueen = true; // Place queen;

        if (isAnimationNeeded) saveAnimation(row, col);

        // Recursion to place rest of queens
        placeQueen(col + 1);

        // if placing queen in board[i][col] does't lead to solution, then remove queen from board[i][col]
        board[row][col].hasQueen = false;
      }
    }
 }

 // Create a priority queue with heuristic function as comparator
 const pq = new PriorityQueue({ comparator: (a, b) => a.heuristic - b.heuristic });

 // Start the branch and bound algorithm
 for (let col = 0; col < N; col++) {
    const node = {
      col: col,
      board: JSON.parse(JSON.stringify(board)),
      heuristic: getHeuristic(col),
    };
    pq.enqueue(node);
 }

 // Explore nodes in priority order
 while (!pq.isEmpty()) {
    const node = pq.dequeue();
    const { col, board } = node;
    // Place queen at the current column and continue the search
    placeQueen(col);
 }

 return { results, animations };
}
