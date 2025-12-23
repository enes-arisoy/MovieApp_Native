import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((movie, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate('Movie', { movie: movie })}
            >
              <View style={{ marginRight: 15 }}>
                <Image
                  source={{ uri: movie.poster }}
                  style={{ width: 120, height: 180, borderRadius: 10 }}
                />
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = {
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  movieTitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
    width: 120,
  },
  seeAll: {
    color: '#FF8A65',
    fontSize: 16,
  },
};
