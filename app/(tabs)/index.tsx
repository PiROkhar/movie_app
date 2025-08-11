import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import SearchBar from "../../Components/searchBar";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5 pb-10 min-h-full" showsVerticalScrollIndicator={false} >
        <Image source={icons.logo} className="mx-auto mt-20 mb-10 w-12 h-10" />
        <View className="flex-1" >
          <SearchBar onPress={()=>router.push("/search")} placeholder="Search for a movie" />
        </View>
      </ScrollView>
    </View>
  );
}
