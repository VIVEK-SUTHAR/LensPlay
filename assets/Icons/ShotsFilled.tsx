import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const ShotsFilled = (props: SvgProps) => (
	<Svg width={100} height={100} viewBox="0 0 100 100" fill="none" {...props}>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8 65.8366V35.661C8.53982 14.8729 14.3504 8.87338 34.1576 8H64.3394C84.8879 8.49849 90.8817 14.3896 91 35.661V65.8366C90.1928 85.8988 84.3 91.3491 64.3394 90.983H34.1576C14.6918 90.5976 8.99835 85.0196 8 65.8366ZM48.4447 34.0442L52.972 30.5237L56.4932 28.009L58.5053 26.5002C59.0083 25.9973 61.2216 25.7961 62.0265 27.0032C63.0326 28.512 63.0326 30.0207 62.0265 31.0266C61.2216 31.8313 58.673 33.7089 57.4992 34.5471L52.4689 38.5705L49.4507 41.0851C48.4447 42.091 49.4508 43.0968 49.4508 43.0968L51.4629 45.6115L53.978 49.132L55.9901 52.1495C56.3255 52.9877 56.8956 55.0665 56.4932 56.6759C56.2102 57.8074 55.9901 58.6876 53.978 60.6993L49.9538 63.7169L44.9235 67.7403L40.8992 70.7578C39.3901 71.7637 37.8176 71.6685 36.875 70.2549C36.0027 68.9468 35.8689 67.7403 36.875 66.2315C37.574 65.1832 38.5766 64.4383 40.1464 63.2721C40.384 63.0956 40.6347 62.9094 40.8992 62.711L44.9235 59.6934L49.9538 55.67L49.982 55.6418C50.4758 55.1488 50.9606 54.6649 49.9538 53.6583C49.6745 53.3791 47.4386 50.6408 47.4386 50.6408L44.9235 47.1203C44.9235 47.1203 43.4144 45.1086 42.9113 43.0968C42.5453 41.6331 42.6565 39.9585 43.9174 38.0676C44.6593 36.955 45.4012 36.3894 46.7481 35.3624C47.2278 34.9966 47.7842 34.5724 48.4447 34.0442Z"
			fill="white"
		/>
	</Svg>
);
export default ShotsFilled;