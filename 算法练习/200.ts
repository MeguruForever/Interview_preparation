function numIslands(grid: string[][]): number {
	const moveX = [0, 1, 0, -1];
	const moveY = [1, 0, -1, 0];

	if (grid.length === 0 || grid[0].length === 0) return 0;

	let count = 0;
	let lengthX = grid.length;
	let lengthY = grid[0].length;
	function dfs(x: number, y: number) {
		if (x < 0 || x >= lengthX || y < 0 || y >= lengthY || grid[x][y] == "0")
			return;

		grid[x][y] = "0";

		for (let k = 0; k < moveX.length; k++) {
			dfs(x + moveX[k], y + moveY[k]);
		}
	}
	for (let i = 0; i < lengthX; i++) {
		for (let j = 0; j < lengthY; j++) {
			if (grid[i][j] == "1") {
				dfs(i, j);
				count++;
			}
		}
	}
	return count;
}
