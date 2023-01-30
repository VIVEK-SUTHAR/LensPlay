import React from 'react'
import { Image } from 'react-native'
import { dark_primary } from '../../constants/Colors'
import getIPFSLink from '../../utils/getIPFSLink'

type AvatarProps = {
    src: string,
    height: number,
    width: number,
    borderRadius?: number,
    borderColor?: string,
    borderWidth?: number
}

export default function Avatar({ src, height, width, borderRadius=500, borderColor='transparent', borderWidth=0 }: AvatarProps) {
    return (
        <Image
            source={{
                uri: getIPFSLink(src)
            }}
            style={{ height: height, width: width, borderRadius: borderRadius, backgroundColor: dark_primary, borderColor: borderColor, borderWidth: borderWidth,zIndex:9}}
        />
    )
}
