export default function formatHandle(handle: string | undefined) {
    if (handle?.includes('/')) {
        const splitHandle = handle.split("/");
        return `${splitHandle[1]}`
    }
    return `@${handle}`
}
