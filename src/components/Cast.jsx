import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { image185 } from './../api/moviedb';

const Cast = ({ cast }) => {
  if (!cast.length) return null;

  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const name = item.name ?? '';
    const character = item.character ?? '';
    

    return (
      <TouchableOpacity
        style={styles.castItem}
        onPress={() => navigation.navigate('Person', { item: item })}
      >
        <Image
          source={
          item?.profile_path
            ? { uri: image185(item.profile_path) }
            : require('../assets/family/avatar.jpg')
        }
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {name.length > 10 ? name.slice(0, 10) + '...' : name}
        </Text>

        <Text style={styles.character}>
          {character.length > 10 ? character.slice(0, 10) + '...' : character}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎭 Top Cast</Text>

      <FlatList
        data={cast}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(Cast);

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  castItem: {
    flexDirection:"column",
    alignItems: 'center',
marginRight: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: "#cccc",
    borderWidth: 1,
    marginBottom: 3,
  },
  name: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  character: {
    color: '#ccc',
    fontSize: 11,
    textAlign: 'center',
  },
});
