import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, ArrowLeft2 } from 'iconsax-react-nativejs';
import Cast from './../components/Cast';
import MovieList from '../components/MovieList';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../components/Loader';
import { image500, movieApi } from '../api/moviedb';

const MovieScreen = ({ route, navigation }) => {
  const { movie } = route.params;

  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [detail, setDetail] = useState(null);
  const [isFavorite, toggleFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // 🎭 CAST
        const creditsData = await movieApi.getMovieCredits(movie.id);
        setCast(creditsData.cast.slice(0, 9)); // 🔥 Top 9 cast
        // 🎬 SIMILAR MOVIES
        const similarMovies = await movieApi.getSimilarMovies(movie.id);
        setSimilar(similarMovies.results.slice(0, 8));
        // Details
        const details = await movieApi.getDetails(movie.id);
        setDetail(details);
      } catch (error) {
        console.log('CAST API ERROR:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movie.id]);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={styles.container}>
          {/* POSTER */}
          <View style={styles.hero}>
            {movie.poster_path && (
              <Image
                source={{ uri: image500(movie.poster_path) }}
                style={styles.poster}
              />
            )}
            {/* GRADIENT */}
            <LinearGradient
              colors={[
                'transparent',
                'rgba(23,23,23, 0.8)',
                'rgba(23, 23, 23, 1)',
              ]}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 250,
              }}
            />

            {/* HEADER ICONS */}
            <SafeAreaView style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft2 size="32" color="white" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
                <Heart
                  size="32"
                  color="white"
                  variant={isFavorite ? 'Bold' : 'Outline'}
                />
              </TouchableOpacity>
            </SafeAreaView>
          </View>

          {/* DETAILS */}
          <View style={styles.details}>
            <Text style={styles.title}>{movie.title}</Text>
            {/* status, release, runtime */}

            <Text style={styles.status}>
              {detail.status} • {detail.release_date} • {detail.runtime} min
            </Text>

            {/* genres */}
            <View style={styles.status}>
              {detail?.genres?.map((genre, index) => (
                <Text key={index} style={styles.genres}>
                  {genre.name}
                  {index !== detail.genres.length - 1 ? ' ⭐ ' : ''}
                </Text>
              ))}
            </View>

            {/* description */}
            <Text style={styles.description}>{movie.overview}</Text>
          </View>
          {/* cast */}
          <Cast cast={cast} />
          {/* similar movies */}
          <MovieList title="Similar Movies" hideSeeAll={true} data={similar} />
        </ScrollView>
      )}
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717ff',
  },
  hero: {
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: 530,
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: "center"
  },
  details: {
    padding: 15,
    alignItems: 'center',
  },
  status: {
    flexDirection: 'row',
    color: '#696868ff',
    fontSize: 14,
    marginBottom: 10,
  },
  genres: {
    color: '#878787ff',
    fontSize: 14,
    marginBottom: 5,
    flexDirection: 'row',
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
