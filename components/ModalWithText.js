import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {color} from '../constants/color';
import BtnAbsolute from './BtnAbsolute';

const ModalWithText = ({modalState, text, goToo, navigation, closeModal}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalState}>
      <View
        style={{
          position: 'relative',
          backgroundColor: color.anotherText,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: '20%',
          marginHorizontal: '5%',
          paddingHorizontal: 10,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: color.primariText,
        }}>
        <TouchableOpacity
          onPress={() => {
            closeModal();
            if (goToo === 'HomeScreen') {
              navigation.navigate('HomeScreen');
            }
          }}
          style={{position: 'absolute', right: -20, top: -20}}>
          <Image
            style={{}}
            source={require('../assets/btns/BtnCloseModal.png')}
          />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: goToo === 'HomeScreen' ? 40 : 15,
                fontFamily: 'InknutAntiqua-Light',
                textAlign: 'center',
              }}>
              {text}
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            closeModal();
            navigation.navigate(goToo);
          }}>
          <Image source={require('../assets/btns/BtnNext.png')} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalWithText;
