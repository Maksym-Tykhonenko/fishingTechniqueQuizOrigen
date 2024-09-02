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

const WinInGameModal = ({
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
              You passed the whole game!!!
            </Text>

            <Text
              style={{
                fontSize: 35,
                textAlign: 'center',
                fontFamily: 'InknutAntiqua-Light',
              }}>
              You are the best fishing expert!!!
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(goToo);
          }}>
          <Image source={require('../assets/btns/BtnNext.png')} />
        </TouchableOpacity>
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
      </View>
    </Modal>
  );
};

export default WinInGameModal;
