import React, {useState, useEffect} from 'react';
import {
  Image,
  TextInput,
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
import {color} from '../constants/color';
import BtnBack from '../components/BtnBack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [selectAvatar, setSelectAvatar] = useState(null);
  const [name, setName] = useState('');
  const [nameOrigen, setNameOrigen] = useState('');

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [selectAvatar, nameOrigen]);

  const setData = async () => {
    try {
      const data = {
        selectAvatar,
        nameOrigen,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`ProfileScreen`, jsonData);
      console.log('Дані ProfileScreen збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`ProfileScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setSelectAvatar(parsedData.selectAvatar);
        setNameOrigen(parsedData.nameOrigen);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const AvatarPicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        //console.log('response==>', response.assets[0].uri);
        setSelectAvatar(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  const saveName = () => {
    setNameOrigen(name);
    setName('');
  };
  return (
    <Layout>
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#f8fbfd',
                fontFamily: 'InknutAntiqua-Light',
                fontSize: 50,
                textAlign: 'center',
              }}>
              Profile
            </Text>

            <TouchableOpacity
              style={styles.btnChangeAvatar}
              onPress={() => {
                AvatarPicer();
              }}>
              {!selectAvatar ? (
                <Text
                  style={{
                    color: color.primariText,
                    fontFamily: 'InknutAntiqua-Light',
                    fontSize: 30,
                    textAlign: 'center',
                  }}>
                  Change Avatar
                </Text>
              ) : (
                <Image source={{uri: selectAvatar}} style={styles.avatarImg} />
              )}
            </TouchableOpacity>

            {nameOrigen ? (
              <View style={{}}>
                <Text
                  style={{
                    color: '#f8fbfd',
                    fontFamily: 'InknutAntiqua-Light',
                    fontSize: 50,
                    textAlign: 'center',
                  }}>
                  {nameOrigen}
                </Text>
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <TextInput
                  placeholderTextColor="#A9A9A9"
                  placeholder="Nickname..."
                  style={styles.TextInputStyles}
                  onChangeText={setName}
                  value={name}
                />

                <TouchableOpacity
                  onPress={() => {
                    saveName();
                  }}
                  style={{}}>
                  <View style={{position: 'relative'}}>
                    <Image
                      style={{width: 150, height: 65}}
                      source={require('../assets/btns/btnNoName.png')}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        color: '#e7eef5',
                        fontFamily: 'InknutAntiqua-Light',
                        fontSize: 30,
                        bottom: 0,
                        left: 35,
                      }}>
                      Save
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>

        {nameOrigen && (
          <TouchableOpacity
            onPress={() => {
              setNameOrigen('');
              setSelectAvatar(null);
            }}
            style={{position: 'absolute', bottom: 10, left: 10}}>
            <View style={{position: 'relative'}}>
              <Image
                style={{width: 150, height: 65}}
                source={require('../assets/btns/btnNoName.png')}
              />
              <Text
                style={{
                  position: 'absolute',
                  color: '#e7eef5',
                  fontFamily: 'InknutAntiqua-Bold',
                  fontSize: 30,
                  bottom: 0,
                  left: 20,
                }}>
                Reset
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <BtnBack navigation={navigation} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  btnChangeAvatar: {
    backgroundColor: '#e7eef5',
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImg: {
    backgroundColor: '#e7eef5',
    width: windowWidth * 0.49,
    height: windowWidth * 0.49,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInputStyles: {
    height: 60,
    width: windowWidth * 0.9,
    margin: 12,
    padding: 10,
    borderWidth: 2,
    color: '#e7eef5',
    borderColor: '#e7eef5',
    borderRadius: 15,
    backgroundColor: color.primariText,
    fontSize: 30,
    fontFamily: 'InknutAntiqua-Light',
  },
  saveNicknameBtn: {
    width: 150,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#e7eef5',
    backgroundColor: color.primariText,
    color: color.textInBtns,
    fontSize: 25,
  },
  saveNicknameBtnText: {
    color: '#e7eef5',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'InknutAntiqua-Light',
    //marginBottom: 10,
  },
});

export default ProfileScreen;
