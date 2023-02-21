import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Outline=''
const Filled = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwElEQVR4nO2YT4hPURTHr3PmmYU/oSQWdiLlX5KFUogyIvmz8Cf5t8SGrGQWiixFGqWI/Oac22gkZkWyU6SRKAsiJZphfr93zhsy+T2950emZqb3e/e9N5v3qbt7797zPefce889xpSUlJSUlJQkxNbmI+kFZH2NJAGy1oDlObKcMbd19ki/eBVZbFzATt1o2kNwmqQ9hMhIJBlC1nDEQSpAejj+/k7fFCR/O7A+QtKL6Re2XyYjaTXymov9SHJlVMN5+ACSZ8jy848o+WRsdYbDwtr2n4cuGxtis3OAld1JjcfhEen3rC41t6rTsVPWpRIAVo4M8w7L3aY8EoYTkORt88bLELB2AetjJP3qWVmUTgDLsREm/4hW1if5v4WCFam8z3+HfEcbbDFpQQo2j5qrLN2my18wpgNIDzgI6Gshf5VxIj4NVMYIdR1I7kVCTU/YmiiCSTczyy6TBY1zO8mitUbenkAra01XbR6w7E0dgU5/WyYCzI1wErK+ccvlNAJ0g7PtQLIHSPd5FV0GLL1FCvDSnjyj5jDJYGECSOpR5J0FRBdJ4anD8SX2ymQFsDwpXoR0ZCbAs8Hyf7VJcRFoM1mCJDsLE0Hab2w40WRNVBYAy9P8Bcg5kwdIwVa0uglJriHJj5yMHzSVYE5OAvRSAZv3vMkN689E1s85ps4Hc7N/an4Con1QCVYi67ccPP8raYnuTlSkkT7MUgBYPW2KJrofgLQdWB84ps716OVWuIBoUWA9iKQDTsbb5t/ZbvSErWB1P7C+cDC8DqSncvW8R7okSpMW8lej9XcA6UlguY+kvmPKvEOSNSZ3ugemIcvZRgctg2NSq7HXsyiTm6Iis4DkOLC+THXCsPQCydHIIWbcsf5CsHoISa7GZXbU84k7d1KP7weS93E7kKUjbhPawbnjbXJJSUlJSUmJyZHfxnHsrRJKPnUAAAAASUVORK5CYII`;
export default function Twitter({ width, height, filled = true }: IconProps) {
  return (
    <Image
      source={{ uri: filled ? Filled : Outline }}
      style={{ height: height, width: width }}
    />
  );
}
