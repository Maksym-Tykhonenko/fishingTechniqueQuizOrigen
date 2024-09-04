import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Animated,
  Image,
  Alert,
} from 'react-native';
import {Dimensions} from 'react-native';
import BtnBack from '../components/BtnBack';
import BtnAbsolute from '../components/BtnAbsolute';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PriviusScreen = ({navigation}) => {
  //////////// LOADER
  const appearingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/newBack.png')}
        style={styles.imgBack}>
        <Animated.View
          style={{...styles.contentConteiner, opacity: appearingAnim}}>
          <Text style={{...styles.congratText}}>Hello!</Text>
          <Text style={{...styles.congratText}}>
            Welcome to сrazy Fishing time!
          </Text>
          <Text
            style={{
              ...styles.congratText,
            }}>
            Discover something new and enjoy relaxation
          </Text>
        </Animated.View>

        <BtnAbsolute navigation={navigation} peyloadNav="HomeScreen" />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  imgBack: {flex: 1},
  contentConteiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  congratText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fcfcfe',
    fontFamily: 'InknutAntiqua-Light',
    textAlign: 'center',
  },
});

export default PriviusScreen;
