import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrendingMovies from './../components/TrendingMovies';
import MovieList from './../components/MovieList';
import { HamburgerMenu, SearchNormal1 } from 'iconsax-react-nativejs';
import Loader from '../components/Loader';
import { movieApi } from './../api/moviedb';

const HomeScreen = ({ navigation }) => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const [
        trendingData,
        upcomingData,
        topRatedData,
      ] = await Promise.all([
        movieApi.getTrendingMovies(),
        movieApi.getUpcomingMovies(),
        movieApi.getTopRatedMovies(),
      ]);

      setTrending(trendingData?.results || []);
      setUpcoming(upcomingData?.results || []);
      setTopRated(topRatedData?.results || []);

    } catch (error) {
      console.log('API ERROR:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchMovies();
}, []);


  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <HamburgerMenu size="32" color="#FF8A65" />
          <Text style={styles.title}>
            <Text style={styles.letter}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <SearchNormal1 size="32" color="#FF8A65" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <TrendingMovies title="🔥 Trending" data={trending} />
          <MovieList title="🎬 Upcoming" data={upcoming} />
          <MovieList title="🎬 Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717ff',
  },
  safeArea: {
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
  letter: {
    color: '#FF8A65',
    fontWeight: 'bold',
  },
});
