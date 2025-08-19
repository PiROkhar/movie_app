import MovieCard from "@/Components/movieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import SearchBar from "../../Components/searchBar";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  const { data: movies, loading: movieLoading, error: moviesError } = useFetch(() => fetchMovies({
    query: ''
  }))
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5 pb-10 min-h-full" showsVerticalScrollIndicator={false} >
        <Image source={icons.logo} className="mx-auto mt-20 mb-10 w-12 h-10" />
        {
          movieLoading || trendingLoading ? (
            <ActivityIndicator
              size="large" color="#0000ff" className="mt-10 self-center" />
          ) : moviesError || trendingError ? (
            <Text>Error:{moviesError?.message || trendingError?.message}</Text>
          ) : (
            <View className="flex-1" >
              <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie" />
                {
                  trendingMovies &&(
                    <View className="mt-10">
                      <Text className="text-white text-lg mt-5 mb-3">Trending Movies</Text>
                      <FlatList className="mb-4 mt-3" horizontal  showsHorizontalScrollIndicator={false} data={trendingMovies} renderItem={({item,index})=>(
                        <Text className="text-white text-sm">{item.title}</Text>
                      )}
                      keyExtractor={(item) =>item.movie_id.toString()}
                      />
                    </View>
                  )
                }
              <>
                <Text className="text-white text-lg mt-5 mb-3">Latest Movies</Text>
                <FlatList
                  data={movies}
                  renderItem={({ item }) => (
                    <MovieCard
                      {...item}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
              </>
            </View>
          )}
      </ScrollView>
    </View>
  );
}
