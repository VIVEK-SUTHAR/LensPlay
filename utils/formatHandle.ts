import { HandleInfo } from "customTypes/generated";

export default function formatHandle(handle:HandleInfo) {
    if (handle?.fullHandle?.includes('/')) {
        const splitHandle = handle?.fullHandle?.split("/");
        return `@${splitHandle[1]}`
    }

    return `@${handle}`

}
