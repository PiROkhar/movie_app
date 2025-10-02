import { icons } from '@/constants/icons';
import { fetchMoviesDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMoviesDetails(id as string));
  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} className='w-full h-[550px]' resizeMode='stretch' />
        </View>

        <View className='mx-4 my-6 gap-3'>
          <Text className='text-[#7985ff] text-xl font-semibold'>{movie?.title} </Text>

          <View className='flex flex-row justify-between'>

            <View className='flex flex-row gap-4 items-center'>
              <Text className='text-white/70'>{movie?.release_date?.split('-')[0]}</Text>
              <Text className='text-white/70'>{movie?.runtime} minutes </Text>
            </View>

            <View className='rounded-2xl border border-[#7985ff] flex items-center gap-1 flex-row'>

              <View className='flex flex-row gap-1 items-center  py-1 pl-2'>
                <Image source={icons.star} className='size-4' />
                <Text className='text-white/70 text-sm'>{movie?.vote_average?.toPrecision(2)}</Text>
              </View>

              <Text className='text-white/60 py-1 pr-2 rounded-3xl pl-1 text-sm items-center bg-[#7985ff]/10'>{movie?.vote_count} votes</Text>
            </View>

          </View>
          <View className=''>
            <Text className='text-[#7985ff] font-semibold'>Language</Text>
            <Text className='text-white/70 text-justify'>{movie?.spoken_languages?.map((l) => l.name).join('  -  ')}</Text>
          </View>
          <View className=''>
            <Text className='text-[#7985ff] font-semibold'>Overview</Text>
            <Text className='text-white/70 text-justify'>{movie?.overview}</Text>
          </View>
          <View>
            <Text className='text-[#7985ff] font-semibold'>Genres</Text>
            <Text className='text-white/70'>{movie?.genres?.map((g) => g.name).join('  -  ')}</Text>
          </View>
          <View className='flex flex-row gap-8'>
            <View className=''>
              <Text className='text-[#7985ff] font-semibold'>Budget</Text>
              <Text className='text-white/70 text-justify'>{movie?.budget / 1_000_000} million</Text>
            </View>
            <View className=''>
              <Text className='text-[#7985ff] font-semibold'>Revenue</Text>
              <Text className='text-white/70 text-justify'>{movie?.revenue?.toPrecision(1) / 1_000_000} million</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={router.back} className=' mt-10 border-2 border-[#7985ff] flex items-center py-4 mx-4 my-4 rounded-full'>
          <Text className='text-white text-xl font-semibold'>Go back</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

export default MovieDetails