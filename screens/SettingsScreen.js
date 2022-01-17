import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";

export function SettingsScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://api.sampleapis.com/wines/reds"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  function handleSettingsPress() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.screen}>
      <Button title="Vrati se na Home Screen" onPress={handleSettingsPress} />
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.itemWrapper}>
                <View style={styles.item}>
                  <View style={styles.image}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: `${item.image}`,
                      }}
                    />
                  </View>
                  <View style={styles.text}>
                    <Text>{item.winery}</Text>
                    <Text>{item.wine}</Text>
                    <Text>{item.reviews}</Text>
                    <Text>{item.location}</Text>

                    
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "indianred"
  },
  tinyLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  item: {
    flexDirection: "row",
    margin: 10,
  },
  text: {
    padding: 11,
    fontFamily: 'Georgia',
    color: "white",
    
    backgroundColor: "lightsalmon",
    
    
  },
});
