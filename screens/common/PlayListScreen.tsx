import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from 'customTypes/navigation'

type Props = {
}

const PlayListScreen: React.FC<RootStackScreenProps<"PlayListScreen">> = () => {
  return (
    <View>
      <Text>PlayListScreen</Text>
    </View>
  )
}

export default PlayListScreen

const styles = StyleSheet.create({})