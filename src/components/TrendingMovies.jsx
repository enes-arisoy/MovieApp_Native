import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { image500 } from './../api/moviedb';

export default function TrendingMovies({ title, data }) {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.mainTitle}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Movie', { movie: item })}
          >
            <MovieCard item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const MovieCard = ({ item }) => {
  

  if (!item) return null;
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={styles.image}
      />

      <Text style={styles.rating}>{item.vote_average.toFixed(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  rating: {
    position: 'absolute',
    top: 5,
    right: 5,
    color: 'white',
    fontSize: 16,
    backgroundColor:"#000000ff",
    padding: 5,
    borderRadius: 10
  },

  card: {
    position: 'relative',
    width: 220, // 🔥 önemli
    height: 340,
    borderRadius: 12,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
