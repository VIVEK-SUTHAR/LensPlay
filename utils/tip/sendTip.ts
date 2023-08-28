/**
 *
 * @param senderAddress address who is sending the tip
 * @param tipAmount amount to be sent as tip
 * @param  recieverAddress address to whom tip will be sent
 * @returns lists of all the playlists of that user
 */

import { LENSPLAY_API } from "constants/index";
import { Scalars } from "customTypes/generated";

async function sendTip(senderAddress: Scalars["EthereumAddress"], tipAmount: string, recieverAddress: Scalars["EthereumAddress"], message: string) {
	try {
		const headersList = {
			"Accept": "*/*",
			"Content-Type": "application/json",
			"Authorization": "Bearer ENGINEERCANTAKEOVERWORLD",
		};

		const bodyContent = JSON.stringify({
			senderAddress: senderAddress,
			tipAmount: tipAmount,
            receiverAddress: recieverAddress,
			message: message
		});

		const response = await fetch(`http://192.168.107.216:3000/api/notifications/send`, {
			method: "POST",
			body: bodyContent,
			headers: headersList,
		});
		if (response.ok) {
			return true;
		}
	} catch (err) {
		if (err instanceof Error) {
			throw new Error("Something went wrong");
		}
	}
}
export default sendTip;
