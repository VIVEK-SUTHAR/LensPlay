import React from 'react'
import { Image } from 'react-native'

type AvatarProps = {
    src: string,
    height: number,
    width: number
}

export default function Avatar({ src, height, width }: AvatarProps) {
    return (
        <Image
            source={{
                uri: src
            }}
            style={{ height: height, width: width, borderRadius: 500 }}
        />
    )
}
