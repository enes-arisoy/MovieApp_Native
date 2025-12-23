import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CloseCircle } from 'iconsax-react-nativejs';
import { Image } from 'react-native';
import { movies } from './../assets/movies';
import Loader from '../components/Loader';

const { width, height } = Dimensions.get('window');

const SearchScreen = ({ navigation }) => {
  const [results, setResults] = useState(movies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fake loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#171717ff' }}>
      <View style={styles.searchAreaContainer}>
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          style={styles.searchArea}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.close}
        >
          <CloseCircle size={32} color="white" />
        </TouchableOpacity>
      </View>
      {/* RESULTS */}

      {loading ? (
        <Loader />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <Text style={styles.results}>Results ({results.length})</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate('Movie', { movie: item })}
                >
                  <View>
                    <Image
                      source={{ uri: item.poster }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                      resizeMode="cover"
                    />
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.loader}>
          <Image
            source={require('../assets/family/cinema_watching.jpg')}
            style={{ height: 200, width: 280 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
  },
  searchAreaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#9f9f9fff',
    borderWidth: 1,
    borderRadius: 30,
    margin: 15,
  },
  searchArea: {
    fontWeight: 'semibold',
    fontSize: 16,
    color: 'white',
    textAlign: 'baseline',
    paddingHorizontal: 15,
  },
  close: {
    paddingHorizontal: 5,
  },
  results: {
    color: 'white',
    fontWeight: 'semibold',
    marginLeft: 15,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
  },
});
