import React from "react";
import { Image } from "react-native";
import { IconProps } from "../../types";

const Outline =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaklEQVR4nO2ZO07EMBRFLSpaCpAQSxgh1sAuZh2wBaCddcAuSKCBjiDRwwb4FTSjgzy4MJGDnY9jJ7wjTRHbeS8nN4miiVKCkBagZHzKuYgUg4sIOUGay2r4+ySxSDGYiJATwC3pKYcQyQI1lEjvQqn7IyITTgTYAe6Ae2CvZZ8L4BM479rf1yCoELANXFv3Z9VGBvgw+7136R/SwFsI2AKuzNIX4LFJRm8DN/XUdBL8yJylFFmZZW/AEbALPJixJ2DfrLPHf8316R+ErxBwapZ8Ace1M19ZySxq21XIJcgYIsASWJvf0jFvy6ztA3eIOmWii+izb1LQnPyxf11m0TDnlIkqAhwCr2ZqFVCj8YB9MsQSAQ6AZzN8qZ9YgXWcD4CAuQ1TfuPt/yZM5qi2IiozEJH/nAhh/7iUcxEpOtbeEG+HkaDtcYlIZJBEMgNJJDOQRDIDSSQzkETmkkiuqIl8xfUhX3kFNSLf4HlZQg5ycxgAAAAASUVORK5CYII='
const Filled ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABM0lEQVR4nO2WMW7CQBBFRzRpaYiSM3ADiJQyR8hBuEKg5RzcAmHSRFRJkVukCJFCgx4CLIQAO7v22jsO86RtrPGM3n7vyiKGERcgoX6S/yIyCy5iaII4n1X4cxJZZBZMxNAE8Ep8khAiKpBQIqUbxZ6PiTQ0EaANvKXrtsCcEfADDIvMdxnwZyPgBpgenc0PXxlgmb777TvfdUBuI6AFTC5cNJky2+fAIl27mm0S7GVeYomMc27NT+D+pL4DvOfV1C4CDHIkzpJJ01t4pletCPAMrHHjsOvAE/CbUXNXqwjwCKwcJUrJUJUI0AW+PCUKyxBKxNAAOn7ds5j7iKhGTORKE+k59O83QaTv0P+hCSKVIyaiDLFElCGWiDLEElGGWCLKEEtEGXKNiczRS+IsYhhSmg2urnJXsJBZhQAAAABJRU5ErkJggg=='
export default function CollectIcon({
  width,
  height,
  filled = false,
}: IconProps) {
  return (
    <Image
      source={{ uri: filled ? Filled : Outline }}
      style={{ height: height, width: width }}
    />
  );
}
