import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  Button,
  Alert,
} from 'react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Layout from '../components/Layout';
import ConfettiCannon from 'react-native-confetti-cannon';

const CongratScreen = ({navigation}) => {
  return (
    <Layout>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: windowWidth * 0.8, height: windowHeight * 0.5}}>
          <ImageBackground
            source={require('../assets/lvlBackgr.png')}
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.5,
            }}>
            <Image source={require('../assets/icons/money.png')} />
          </ImageBackground>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#007bff',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
            Play Again
          </Text>
        </TouchableOpacity>
      </View>
      <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
    </Layout>
  );
};

export default CongratScreen;
