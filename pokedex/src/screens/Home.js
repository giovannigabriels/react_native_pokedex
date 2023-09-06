import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Home() {
  const [datas, setDatas] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetch data
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data.results);
        setDatas(data.results);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.title}>Pokedex</Text>
      <FlatList
        data={datas}
        renderItem={(ite) => <Card item={ite} />}
        contentContainerStyle={styles.container}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    top: 15,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 20,
    marginBottom:20
  },
});