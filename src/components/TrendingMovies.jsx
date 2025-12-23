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
            <MovieCard movies={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const MovieCard = ({ movies }) => {
  if (!movies) return null;
  return (
    <View style={styles.card}>
      <Image source={{ uri: movies.poster }} style={styles.image} />
      <Text style={styles.title}>{movies.title}</Text>
      <Text style={styles.rating}>Imdb: {movies.rating}</Text>
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
  title: {
    position: 'absolute',
    top: 5,
    left: 5,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    padding: 5,
    borderRadius: 10,
    fontSize: 16,
    
  },
  rating: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    color: 'white',
    fontSize: 12,
    marginLeft: 10,
     backgroundColor: 'rgba(0, 0, 0, 0.88)',
    padding: 5,
    borderRadius: 10,
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
