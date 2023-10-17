import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { styles } from './style';

const Spinner = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="##0C5A1E" testID="spinner" />
  </View>
);

export default Spinner;