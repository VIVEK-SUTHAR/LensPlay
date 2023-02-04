import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Filled =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAERUlEQVR4nO2aXYgcRRDHWyN+f6APIn49+IEYRQRfJA+KeioIggZP8etJRRDu4bJTtYc+rBJFfDAaOW+vai4m3otyfiSKSnzwRcUokmA0MRpzWzWrIkYQ9YjC5byVnsvGmbvs3n703Nnr/KBh2ekppv7dXVXdM8bk5OTk5OTk5OQsLSND0emM0WW22d/m/wDHDsvzDBoxai3VQCMCfa5c0JWm1xiDPacQaplBDi5wfIEQcZ8Xh0s/n2x6gTGIzmaU7Ys6vlCIL6k4eb7xGSpOnkag37bt/KFGqN+sH9h7qvEVRnmrU+cTIrxpfISxcnO3zh8WIYj6jG8w6ifOBED52PjES2u+O49QZh0KMMv4/bnGFxj1IVfOJ9oDxhcY5BnnAoA+bXyBQF7OQIBNxhcYJXQtAIGw8QVCWZuBAI8bX2CM7swgCN5hfCqBGXXaofPT1qbxCUZ53Z0AMmF8YwwqlxDKTNdrH2UmRLnU+AihPuVAgLXGVyb6aysI9d2OBQB5p1SqHW18ZqK069hOCiNC3WjvNb1AzdSOYtB7CbW6+KhrxCB3m17k2cHqCQRRP6G+yii7CfUP2+xvBn3F5vqNJTl+uZ8zxzVU+vHEEKMbCeUxAt3CoF/Ex+B29EEOMMovhPJVfA3lCQoqN9nZYnxf9xREfXEABJnqIANM2ZLa+AiBXEegn3Wc+0H3hyirjW+Eg9UzCPSNLsveHxpVfuFQ9aI4m4AMxq0o91AQXWj+CxDqqiO+8mpz5DcMRRck7dpCKCzqfTZGNKkZdloxlq1ooiDqY5Q/uyx5Z0OQW5J2hwM5y54It2Hjw5HCvjOX1nmoXDsXybur+Rl0ZP7JciczilC1PFg9Z0mcH7YjBLq/W+cJ9C/7DjFdMOmOBkL9xiCP2pTKqL83iCOfZ15Q1Wya62ajk3ZqNGnbOthErAfr/QgrDzexCZkKEKKsduI8am0U9Ia63fHCTyfFo9ywv1z9rwC6qrEA8mumxRSBbnMz+nJg/cDe41oXtkUBrLDF6NZMnB8tVq5xNfqM+mlKWJQXUlM+3izpOoaoaFsyVthgV//ffl1yhIpzXSYCMOiTzgQAfS8lwMJCquXT4BAqd6XjhbyWjQAo464EsFvjeQJsTV4fK1Qvb1mAYPKKZuI6g+ZN064EAN2SFiB9emRnRCtfkdkynFE3z7O/IRMBOJDbHc6AnSkBUNFVEGSUNZkIUCrVjiHQr93EADmY/CLMboRcCVCGfRdnIsDh9dY0X7fT0vt+AvmgYd+iXl/vZw9Zmth93yzFyw8G+chBHNiatBsORVc1+aZwsy1z58plebtBn2kO5EqzVJQLupJA74/X76G83E6z9yWLIQsHOtBk2Uw1O2UikEdML8CxQPJ36wFVZgg1ML1EGK9z2b34MpJdyT1FTzHRX1sxl3plnEH31JdAnIlANxHIbbbPcj9nTk5OTk5OjvGKfwASteD/I47l3AAAAABJRU5ErkJggg";

export default function FollowIcon({ width, height }: IconProps) {
  return (
    <Image
      source={{
        uri: Filled,
      }}
      style={{ height: height, width: width }}
    />
  );
}
