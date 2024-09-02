import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Layout from '../components/Layout';

const OptionsScreen = () => {
  return (
    <Layout>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>OptionsScreen</Text>
      </View>
    </Layout>
  );
};

export default OptionsScreen;
