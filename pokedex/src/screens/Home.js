import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { SafeAreaView } from "react-native-safe-area-context";
import { operationNamePokemon, queryPokemon } from "../queries/pokemons";
import fetchData from "../config";

export default function Home() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDataPokemon();
  }, []);

  const fetchDataPokemon = async () => {
    fetchData(operationNamePokemon, queryPokemon)
      .then((data) => {
        setDatas(data?.data?.pokemon_v2_pokemon);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }}
      source={require("../../assets/pokeball.png")}
      imageStyle={{
            width: 250,
            height: 250,
            marginLeft: 200,
            marginTop: -120,
            opacity: 0.1,
            tintColor: "gray",
          }}>
      
        <Text style={styles.title}>Pokedex</Text>
        <FlatList
          data={datas}
          renderItem={(ite) => <Card item={ite} />}
          style={styles.container}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 15,
  },
});
