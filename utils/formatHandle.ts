export default function formatHandle(handle: string | undefined): string | undefined {
	if (handle?.includes(".") === true) {
		const splitHandle = handle.split(".");
		return `@${splitHandle[0]}`;
	}
	if (handle != null) {
		return `@${handle}`;
	} else {
		return handle;
	}
}
