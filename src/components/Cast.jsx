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

const Cast = ({ cast = [] }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const name = item.name ?? '';
    const character = item.character ?? '';

    return (
      <TouchableOpacity
        style={styles.castItem}
        onPress={() => navigation.navigate('Person', { person: item })}
      >
        <Image source={{ uri: item.profile }} style={styles.avatar} />

        <Text style={styles.name}>
          {name.length > 10 ? name.slice(0, 10) + '...' : name}
        </Text>

        <Text style={styles.character}>
          {character.length > 10
            ? character.slice(0, 10) + '...'
            : character}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Cast</Text>

      <FlatList
        data={cast}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export default memo(Cast);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  castItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
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
