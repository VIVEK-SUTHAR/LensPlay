import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	const getDelayTime = (): number | undefined => {
		if (typeof delay !== "undefined") {
			return delay;
		} else return 500;
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, getDelayTime());

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
