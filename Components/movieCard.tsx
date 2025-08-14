import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';



const MovieCard = ({ id, poster_path, title, vote_average, release_date, }: Movie) => {
    return (
        <Link href={`/movie/${id}`} asChild>
            <TouchableOpacity className='w-[48%] mb-2'>
                <Image
                    source={{
                        uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` :
                            'https://placeholder.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className='w-full h-60 rounded-lg'
                    resizeMode='cover'
                />
                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>
                <View className='flex flex-row items-center justify-between'>
                    <Text className='text-zinc-200 text-sm mt-1' >{release_date.split('-')[0]}</Text>
                    <View className='flex flex-row gap-1 items-center'>
                        <Image source={icons.star} className='size-4'></Image>
                        <Text className='text-white text-sm'>{Math.round(vote_average / 2)}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard