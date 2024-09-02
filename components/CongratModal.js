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
import ConfettiCannon from 'react-native-confetti-cannon';

const CongratModal = ({
  modalState,
  text,
  goToo,
  navigation,
  closeModal,
  gold,
}) => {
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
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 40, fontFamily: 'InknutAntiqua-Light'}}>
              Congrat !!!
            </Text>
            <Text
              style={{
                fontSize: 35,
                textAlign: 'center',
                fontFamily: 'InknutAntiqua-Light',
              }}>
              You get +1000 coins
            </Text>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image style={{}} source={require('../assets/icons/cosn.png')} />
            </View>
            <Text
              style={{
                fontSize: 35,
                textAlign: 'center',
                fontFamily: 'InknutAntiqua-Light',
              }}>
              Now you have {gold} coins
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
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
      </View>
    </Modal>
  );
};

export default CongratModal;
