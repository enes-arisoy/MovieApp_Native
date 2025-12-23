import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';



const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF8A65" />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171717', 
    justifyContent: 'center',
    alignItems: 'center',
  },
});