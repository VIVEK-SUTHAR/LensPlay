/**
 *
 * @param avatar? Set true if you want Avatar Blur Placeholder
 * @returns Blurred Image Link to  be used with `placeHolder` prop in `expo-image`
 * `Only Works with Expo-Image`
 */

function getPlaceHolderImage(avatar?: boolean): string {
	const ImagePlaceHolders = [
		"LB6Q]ARjIQX2oksvW8tDRdWQs;s^",
		"LdIP0cMxniba_4oLW;jZK*t7jZfR",
		"LKN]Rv%2Tw=w]~RBVZRi};RPxuwH",
		"LGF5?xYk^6#M@-5c,1J5@[or[Q6.",
		"LbH1ys.gIlm.{L+uXMSgAUalw|XQ",
		"LFIp;_oX00I_}zS$ESaM0yt5=|N1",
		"LVN9troD}k]|Pp#PRYEo_1XVJ~f_",
	];
	const AvatarImagePlaceHolder = ["LbN0;wfQuPoftSj[V@ayOsj[s8ay", "LIGRk.j[01j[eTfQxuay0Mj[~Bay"];
	let Placeholder = "";
	if (avatar === true) {
		Placeholder = AvatarImagePlaceHolder[Math.floor(Math.random() * AvatarImagePlaceHolder.length)];
	}
	Placeholder = ImagePlaceHolders[Math.floor(Math.random() * ImagePlaceHolders.length)];
	return Placeholder;
}
export default getPlaceHolderImage;
