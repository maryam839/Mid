import React from 'react';
import { View, StyleSheet } from 'react-native';
import MainComponent from '@/components/MainComponent';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <MainComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
