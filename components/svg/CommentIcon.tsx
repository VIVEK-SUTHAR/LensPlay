import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Outline ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACmklEQVR4nO1bvW4TQRBe0iCBeAEkOn4bK7dzUPAMCHoCVPAACaAICWRXiJYqmjlDgQQVHTUvwAsgkUAXpbDwzoWS4tCcwZzh7Dg+n73nnU+aclc7383fzs4ZMwVabw5OA/VvAbktIN72WtBtxti/Cbh/ylRGlp2w5B4DMQNx1ihBdoDuoegwm/LtbM2ie7d0RSqLezsTCXbw5Ysb7QEyWuQXPoucMT/r6Nm3jqV8K/f5EbNPzr/MTpqGQM5qiV+NusMxYkIsQWS42O02SfkREpC//tHDUnpj6sUW3aPhQnQ7pqEYuMMMbgDoOgUL6JiGYmY9QAlwagGgLsAaA0CDIGsWAE2DTusA01BoIYQLrASvUnrRIn+r+34vF5z1nfSCdxZgCxeo2kU6PT5aAPzXiKilw7PnpQX4CCUA1QI66gK0qBjQztZiTO9WfdiQbrQE1LL9oyS9IzJtm3uhLgDUvzfPSP/v/qL4sBYg3vCOgHjw9cMlwPw20Tk8bDwrzfP5Mx1vAPJtL13ARygBqBbQURcgjQGZBkHSLJBpGkStAzr1FxArUwcQPy3U5c9NaARYcg8KCz+Y8CrBw8t/b17uJyR8zTQQlVwZkD8Wrqh9QHc/6vbOmlAIiLvppXy8rPY2d6X3gd0o6bdqIUAgpg/I+0tXdHLzpDeOhLlks+vd3hmL/MSS+wTEP5pEwqqk81JEyeEVS+6gGKdswhAMAdOQsPIEHEVCEARMIiEYAgQSBCUYFgOjJX4fDAFjLCELioCJJIRCwFgSQiKgLCbIo6sJDdGAhC9A7nP8+vu5ZZ9HoVA0Ge3JIyr5pOjgZ8tt30SGN+T8lfSPjpjQKP6j56PkJIRMQCSWWwnZ5BEVGWuR8ZZl/ztcJrnyY1zgF8vQwMfd6B56AAAAAElFTkSuQmCC'
export default function CommentIcon({ width, height, filled=false}:IconProps) {
  return (
    <Image
      source={{ uri:Outline }}
      style={{ height: height, width: width }}
    />
  );
}
