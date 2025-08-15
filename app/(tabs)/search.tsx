import MovieCard from '@/Components/movieCard'
import SearchBar from '@/Components/searchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: movies, loading, error, refetch: loadMovies, reset } = useFetch(
    () => fetchMovies({ query: searchQuery }),
    false
  );

  useEffect(() => {
    
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        if (movies?.length>0 && movies?.[0]) {
           await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="bg-primary flex-1">
      <Image className="w-full absolute flex-1 z-0" resizeMode="cover" source={images.bg} />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 20,
          marginVertical: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View>
              <Image source={icons.logo} className="mx-auto mt-20 mb-10 w-12 h-10" />
            </View>
            <View>
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text className="text-red-600">Error: {error.message}</Text>}
            <Text className="text-white text-lg mt-5 mb-2">Search Results</Text>
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-[#ab8bff] my-auto">
                {searchQuery.trim() ? 'No Movies Found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
