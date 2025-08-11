import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text } from 'react-native'

const TabIcons = ({ focused, icon, title }: any) => {
    if (focused) {
        return (
            <ImageBackground source={images.highlight} className='w-full min-w-[90px] min-h-12 mt-8 flex-1 flex flex-row justify-center items-center overflow-hidden rounded-full gap-2'>
                <Image source={icon} className=' h-6 w-6' tintColor="#151312" />
                <Text className='font-semibold'>{title}</Text>
            </ImageBackground>
        )
    }
    return (
        <ImageBackground className='w-full min-w-[90px] min-h-12 mt-6 flex-1 flex flex-col justify-center items-center overflow-hidden rounded-full'>
            <Image source={icon} className=' h-7 w-7 ' tintColor="#fff" />
        </ImageBackground>
    )
}
const _layout = () => {
    return (
        <Tabs 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle:{
                    width: "100%",
                    height: "100%",
                    justifyContent:"center",
                    alignItems:"center",
                },
                tabBarStyle:{
                    backgroundColor:"#0f0D23",
                    overflow:"hidden",
                    borderColor:"0f0d23",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcons focused={focused} icon={icons.home} title="Home" />
                    )
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcons focused={focused} icon={icons.search} title="Search" />
                    ),
                }}
            />

            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcons focused={focused} icon={icons.save} title="Saved" />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcons focused={focused} icon={icons.person} title="Profile" />
                    ),
                }}
            />
        </Tabs>
    )
}

export default _layout