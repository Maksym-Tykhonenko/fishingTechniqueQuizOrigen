import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Layout from '../components/Layout';
import {color} from '../constants/color';

const HomeScreen = ({navigation}) => {
  {
    /**
  const ExitApp = () => {
    RNExitApp.exitApp();
  }; */
  }
  return (
    <Layout>
      <SafeAreaView style={styles.contentConteiner}>
        <View
          style={{
            height: windowHeight,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/**NewGameScreen */}
          <TouchableOpacity
            style={styles.btnsNavigate}
            onPress={() => {
              navigation.navigate('NewGameScreen');
            }}>
            <Image
              style={styles.imgInBtns}
              source={require('../assets/btns/btnNewGame.png')}
            />
          </TouchableOpacity>

          {/**SuperQuizScreen */}
          <TouchableOpacity
            style={styles.btnsNavigate}
            onPress={() => {
              navigation.navigate('SuperQuizScreen');
            }}>
            <Image
              style={styles.imgInBtns}
              source={require('../assets/btns/btnSuperQuiz.png')}
            />
          </TouchableOpacity>

          {/**ShopScreen */}
          <TouchableOpacity
            style={styles.btnsNavigate}
            onPress={() => {
              navigation.navigate('ShopScreen');
            }}>
            <Image
              style={styles.imgInBtns}
              source={require('../assets/btns/btnShop.png')}
            />
          </TouchableOpacity>

          {/**Profile Screen */}
          <TouchableOpacity
            style={styles.btnsNavigate}
            onPress={() => {
              navigation.navigate('ProfileScreen');
            }}>
            <View style={{position: 'relative'}}>
              <Image
                style={styles.imgInBtns}
                source={require('../assets/btns/noNameBtn.png')}
              />
              <Text
                style={{
                  position: 'absolute',
                  color: '#f8fbfd',
                  fontFamily: 'InknutAntiqua-Light',
                  fontSize: 30,
                  textAlign: 'center',
                  top: -10,
                  left: 100,
                }}>
                Profile
              </Text>
            </View>
          </TouchableOpacity>

          {/**AboutScreen */}
          <TouchableOpacity
            style={styles.btnsNavigate}
            onPress={() => {
              navigation.navigate('AboutScreen');
            }}>
            <Image
              style={styles.imgInBtns}
              source={require('../assets/btns/btnAbout.png')}
            />
          </TouchableOpacity>

          {/** */}
        </View>

        <View style={{height: 100}}></View>
      </SafeAreaView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  backImg: {
    flex: 1,
  },
  contentConteiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conteinerInScroll: {
    alignItems: 'center',
  },
  btnsNavigate: {
    marginBottom: 20,
  },
  imgInBtns: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.08,
  },
});

export default HomeScreen;
