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
import { image185} from '../api/moviedb';

const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  
    return (
    <View>
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
        {data?.map((item, index) => {
          
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', { movie: item })}
            >
              <View style={{ marginRight: 15 }}>
                <Image
                  source={{ uri: image185(item.poster_path) }}
                  style={{ width: 120, height: 180, borderRadius: 10 }}
                />
                 <Text style={styles.movieTitle}>
                {item.title?.length > 14
                  ? item.title.slice(0, 14) + '...'
                  : item.title}
              </Text>
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
