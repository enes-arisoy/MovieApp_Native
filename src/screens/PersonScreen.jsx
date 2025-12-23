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
import { movies } from './../assets/movies';
import Loader from '../components/Loader';

const PersonScreen = ({ route, navigation }) => {
  const { person } = route.params;
  const [isFavorite, toggleFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    // fake loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  
  if (!person) {
    return null;
  }
  let { width, height } = Dimensions.get('screen');
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
                  source={{ uri: person.profile }}
                  style={{ height: height * 0.4, width: width * 0.74 }}
                />
              </View>
            </View>
            <View style={{ marginTop: 6 }}>
              <Text style={styles.name}>{person.name}</Text>
              <Text
                style={{
                  fontSize: 24,
                  color: '#908f8fff',
                  textAlign: 'center',
                }}
              >
                {person.character}
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: 15,
                marginTop: 30,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: '#454545ff',
                borderRadius: 30,
              }}
            >
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
                <Text style={{ color: '#9f9f9fff' }}>Male</Text>
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
                <Text style={{ color: '#9f9f9fff' }}>1964/09/02</Text>
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
                <Text style={{ color: '#9f9f9fff' }}>Acting</Text>
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
                <Text style={{ color: '#9f9f9fff' }}>70.32</Text>
              </View>
            </View>

            <View style={styles.biography}>
              <Text style={{ color: 'white', fontSize: 16, marginBottom: 5 }}>
                Biography
              </Text>
              <Text style={{ color: '#9f9f9fff' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                doloremque asperiores, temporibus totam magni atque eum pariatur
                ratione sunt impedit dicta saepe sapiente perferendis labore
                dolor veritatis quasi nisi ab? Magnam culpa incidunt illo
                quaerat ex, aliquam quod sequi velit fugiat ullam sit illum amet
                labore? Ratione, excepturi? Accusantium, eaque quaerat debitis
                enim corporis ex earum odio distinctio quo nesciunt?
              </Text>
            </View>

            {/* movies */}
            <MovieList title={'Movies'} hideSeeAll={true} data={movies} />
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
    marginTop: 100,
  },
  profile: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'gray',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    elevation: 10,
    marginBottom: 20,
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
