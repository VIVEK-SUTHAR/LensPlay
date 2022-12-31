import React from 'react'
import { Image } from 'react-native'
import { primary } from '../../constants/Colors'
import getIPFSLink from '../../utils/getIPFSLink'

type AvatarProps = {
    src: string,
    height: number,
    width: number
}

export default function Avatar({ src, height, width }: AvatarProps) {
    return (
        <Image
            source={{
                uri: getIPFSLink(src)
            }}
            style={{ height: height, width: width, borderRadius: 500, backgroundColor: primary }}
        />
    )
}
