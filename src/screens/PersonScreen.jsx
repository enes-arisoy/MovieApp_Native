import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, ArrowLeft2 } from 'iconsax-react-nativejs';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';
import { image185, image342, movieApi } from './../api/moviedb';

const PersonScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [details, setDetails] = useState(null);
  const [movies, setMovies] = useState(null);
  const [isFavorite, toggleFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonMovies = async () => {
      try {
        // Person Details
        const personDetails = await movieApi.getPersonDetails(item.id);
        setDetails(personDetails);
console.log(personDetails)
        // 🎬 Person MOVIES
        const personMovies = await movieApi.getPersonMovies(item.id);
        setMovies(personMovies.cast.slice(0, 8));
      } catch (error) {
        console.log('CAST API ERROR:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonMovies();
  }, [item.id]);

  if (!item) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView style={styles.container}>
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

          {/* Person DETAILS */}
          <View>
            <View style={styles.details}>
              <View style={styles.profile}>
                <Image
                  source={
                    details?.profile_path
                      ? { uri: image342(details.profile_path) }
                      : require('../assets/family/avatar.jpg')
                  }
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View style={{ marginTop: 6 }}>
              <Text style={styles.name}>{details.name}</Text>
              <Text
                style={{
                  fontSize: 24,
                  color: '#908f8fff',
                  textAlign: 'center',
                }}
              >
                {item.character}
              </Text>
            </View>
            <View style={styles.profileDetails}>
              <View style={styles.characterDetails}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'semibold',
                    color: 'white',
                  }}
                >
                  Gender
                </Text>
                <Text style={{ color: '#9f9f9fff' }}>
                  {details.gender === 2
                    ? 'Male'
                    : details.gender === 1
                    ? 'Female'
                    : 'N/A'}
                </Text>
              </View>

              <View style={styles.characterDetails}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'semibold',
                    color: 'white',
                  }}
                >
                  Birthday
                </Text>
                <Text style={{ color: '#9f9f9fff' }}>{details.birthday}</Text>
              </View>

              <View style={styles.characterDetails}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'semibold',
                    color: 'white',
                  }}
                >
                  Known for
                </Text>
                <Text style={{ color: '#9f9f9fff' }}>
                  {details.known_for_department}
                </Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'semibold',
                    color: 'white',
                  }}
                >
                  Popularity
                </Text>
                <Text style={{ color: '#9f9f9fff' }}>{details.popularity}</Text>
              </View>
            </View>

            <View style={styles.biography}>
              <Text style={{ color: 'white', fontSize: 16, marginBottom: 5 }}>
                Biography
              </Text>
              <Text style={{ color: '#9f9f9fff' }}>{details.biography}</Text>
            </View>

            {/* Person movies */}
            <MovieList
              title="🎬 Person Movies"
              hideSeeAll={true}
              data={movies}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717ff',
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

  details: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 80,
  },
  profile: {
  width: 300,
  height: 300,
  borderRadius: 150,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
},

  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileDetails: {
    marginHorizontal: 15,
    marginTop:10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#454545ff',
    borderRadius: 30,
  },

  name: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  character: {
    color: '#ccc',
    fontSize: 16,
  },
  characterDetails: {
    alignItems: 'center',
    borderRightColor: '#9f9f9fff',
    borderRightWidth: 1,
    paddingEnd: 8,
  },
  biography: {
    marginHorizontal: 15,
    marginTop: 20,
  },
});
