import React from 'react'
import { Image } from 'react-native';
import { IconProps } from '../../types';


const Outline='';
const Filled=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACNUlEQVR4nO2YT27TQBjFJ7F9AhbQba+AOAISSC2XoWJBQmmp4lZBTTegolTqBha9ABWwgEUPACX2oEKrRP0nUOyUhkgtau2HvjiRSpD/NTgewzzprWaseb+Zb8YeMyYlJSX1T8gsaDovaD95UUOgvT4lJpp4lPA9m0XtlIkmHjF834mGOdTVG51ybu+8wlwsMaTp8wpzO+XcwdeScjNy+LPF9INjwJTp+7x2PRSAZj7tsPBxp5zbDQUQoWwQUE6hAGmHRIglAP6LFVgZA2rLQMv0bFSB1fGMAKyMAdYH4Efjd9ubXpvwALXlP8P3/fFpBgBapj9Ay8g4gF3LAIBR9QfYfJIBgNVxb8MOhrfeA9URbGKnMiQAmU4b2rBU82Sa+b8Q3qlEAGiW8sMDJOSmng8HoMvGzoyKgzkFlp5HeyGP08c5uCMM6i6x7pg0NmWgLJQp0kUo6Ba1Na2hMavisAd33IPDxbJ7dgXYmAIa68AR91x/CWzc9douBD1b7H4i42ghj28lBbuPFHyZVsEfDHGTi3s1JH+iVXuowlqbhBtwjFKbtTbR7UvP8Es4EQDy/os7QLvuf4T23a5j//nkpcbgSQF81q/BsQNeYAN2bANb+lVxAJpv7kUO33fz9ZQ4ACc7r2IDnGyviwPgBH3/+JaRKQ6Ae7wdG4Ce4aIA2O9mY0FQX/vtjDgAozSTAEW5Aki0hMyCupf2LHNfq+H/Rs37ym3qKGJ4o6DcCgWQkpKSkmIx9Au0CWKCrRvP6QAAAABJRU5ErkJggg==`
export default function Website({ width, height, filled = true }: IconProps) {
  return (
    <Image 
    source={{ uri: filled ? Filled : Outline }}
    style={{ height: height, width: width }}
    />
  )
}
