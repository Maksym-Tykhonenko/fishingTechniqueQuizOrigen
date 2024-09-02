import React, {useState, useEffect} from 'react';
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
import {color} from '../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewGameScreen = ({navigation}) => {
  const [complite1Level, setComplite1Level] = useState(false);
  console.log('complite1Level==>', complite1Level);
  const [complite2Level, setComplite2Level] = useState(false);
  const [complite3Level, setComplite3Level] = useState(false);
  const [complite4Level, setComplite4Level] = useState(false);

  useEffect(() => {
    getDataToo1();
    getDataToo2();
    getDataToo3();
    getDataToo4();
  }, []);

  const getDataToo1 = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`FirstLvlScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setComplite1Level(parsedData.complite1Level);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  const getDataToo2 = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`SecondLvlScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setComplite2Level(parsedData.complite2Level);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  const getDataToo3 = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`FirdLvlScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setComplite3Level(parsedData.complite3Level);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  const getDataToo4 = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`FoureLvlScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setComplite4Level(parsedData.complite4Level);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  return (
    <Layout>
      <SafeAreaView
        style={{
          position: 'relative',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            {/** 1 */}
            <TouchableOpacity
              style={{}}
              onPress={() => {
                navigation.navigate('FirstLvlScreen');
              }}>
              <Image
                style={{
                  width: windowWidth * 0.8,
                  height: windowHeight * 0.2,
                  borderRadius: 20,
                }}
                source={require('../assets/lvlsImg/1.png')}
              />
              <View
                style={{
                  width: windowWidth * 0.8,
                  alignItems: 'center',
                  marginTop: -50,
                }}>
                <Text
                  style={{
                    color: color.anotherText,
                    fontSize: 25,
                    fontFamily: 'InknutAntiqua-Light',
                  }}>
                  Float Fishing #1
                </Text>
              </View>
            </TouchableOpacity>

            {/** 2 */}
            <TouchableOpacity
              disabled={complite1Level ? false : true}
              style={{}}
              onPress={() => {
                navigation.navigate('SecondLvlScreen');
              }}>
              <Image
                style={{
                  width: windowWidth * 0.8,
                  height: windowHeight * 0.2,
                  borderRadius: 20,
                }}
                source={require('../assets/lvlsImg/2.png')}
              />
              <View
                style={{
                  width: windowWidth * 0.8,
                  alignItems: 'center',
                  marginTop: -50,
                }}>
                <Text
                  style={{
                    color: complite1Level ? color.anotherText : 'grey',
                    fontSize: 25,
                    fontFamily: 'InknutAntiqua-Light',
                  }}>
                  Spinning Fishing #2
                </Text>
              </View>
            </TouchableOpacity>

            {/** 3 */}
            <TouchableOpacity
              disabled={complite2Level ? false : true}
              style={{}}
              onPress={() => {
                navigation.navigate('FirdLvlScreen');
              }}>
              <Image
                style={{
                  width: windowWidth * 0.8,
                  height: windowHeight * 0.2,
                  borderRadius: 20,
                }}
                source={require('../assets/lvlsImg/3.png')}
              />
              <View
                style={{
                  width: windowWidth * 0.8,
                  alignItems: 'center',
                  marginTop: -50,
                }}>
                <Text
                  style={{
                    color: complite2Level ? color.anotherText : 'grey',
                    fontSize: 25,
                    fontFamily: 'InknutAntiqua-Light',
                  }}>
                  Fly Fishing #3
                </Text>
              </View>
              <Text></Text>
            </TouchableOpacity>

            {/** 4 */}
            <TouchableOpacity
              disabled={complite3Level ? false : true}
              style={{}}
              onPress={() => {
                navigation.navigate('FoureLvlScreen');
              }}>
              <Image
                style={{
                  width: windowWidth * 0.8,
                  height: windowHeight * 0.2,
                  borderRadius: 20,
                }}
                source={require('../assets/lvlsImg/4.png')}
              />
              <View
                style={{
                  width: windowWidth * 0.8,
                  alignItems: 'center',
                  marginTop: -50,
                }}>
                <Text
                  style={{
                    color: complite3Level ? color.anotherText : 'grey',
                    fontSize: 25,
                    fontFamily: 'InknutAntiqua-Light',
                  }}>
                  Boat Fishing #4
                </Text>
              </View>
            </TouchableOpacity>

            {/** 5 */}
            <TouchableOpacity
              disabled={complite4Level ? false : true}
              style={{}}
              onPress={() => {
                navigation.navigate('FifthLvlScreen');
              }}>
              <Image
                style={{
                  width: windowWidth * 0.8,
                  height: windowHeight * 0.2,
                  borderRadius: 20,
                }}
                source={require('../assets/lvlsImg/5.png')}
              />
              <View
                style={{
                  width: windowWidth * 0.8,
                  alignItems: 'center',
                  marginTop: -50,
                }}>
                <Text
                  style={{
                    color: complite4Level ? color.anotherText : 'grey',
                    fontSize: 25,
                    fontFamily: 'InknutAntiqua-Light',
                  }}>
                  Bottom Fishing #5
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height: 150}}></View>
        </ScrollView>
        <BtnBack navigation={navigation} />
      </SafeAreaView>
    </Layout>
  );
};

export default NewGameScreen;
