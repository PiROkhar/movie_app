import { icons } from '@/constants/icons'
import React from 'react'
import { Image, View } from 'react-native'

const profile = () => {
  return (
    <View className='bg-primary flex-1 flex items-center justify-center align-middle'>
          <Image source={icons.person} className='size-10' />
        </View>
  )
}

export default profile