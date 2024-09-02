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
import BtnBack from '../components/BtnBack';

const AboutScreen = ({navigation}) => {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingTop: 60,
        }}>
        <ScrollView>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'InknutAntiqua-Light',
              fontSize: 20,
            }}>
            The app "Fishing Technique Quiz" offers an engaging quiz dedicated
            to various fishing techniques. Players can test their knowledge
            about different fishing methods, learn which types of fish can be
            caught with each technique, and improve their fishing skills.
          </Text>
        </ScrollView>
        <BtnBack navigation={navigation} />
      </View>
    </Layout>
  );
};

export default AboutScreen;
