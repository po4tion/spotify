export const durationTime = (ms: number): string => {
	const minutes: number = Math.floor(ms / (1000 * 60));

	// ~0.499 / 0.500~ 반올림 적용
	const seconds: number = parseInt(((ms % (1000 * 60)) / 1000).toFixed(0));

	// 10초 미만 자릿수 고려
	const time =
		seconds === 60
			? `${minutes + 1}:00`
			: `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

	return time;
};
