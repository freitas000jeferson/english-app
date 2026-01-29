export function similarity(a: string, b: string): number {
	const matrix = [];

	const lenA = a.length;
	const lenB = b.length;

	for (let i = 0; i <= lenB; i++) {
		matrix[i] = [i];
	}

	for (let j = 0; j <= lenA; j++) {
		matrix[0][j] = j;
	}

	for (let i = 1; i <= lenB; i++) {
		for (let j = 1; j <= lenA; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1,
					matrix[i][j - 1] + 1,
					matrix[i - 1][j] + 1,
				);
			}
		}
	}

	const distance = matrix[lenB][lenA];
	return 1 - distance / Math.max(lenA, lenB);
}
