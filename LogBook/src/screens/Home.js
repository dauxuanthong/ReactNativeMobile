import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainLabel}>DEMO LOG BOOK (1, 2, 3)</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
