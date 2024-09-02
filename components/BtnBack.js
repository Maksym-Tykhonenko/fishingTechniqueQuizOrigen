import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BtnBack = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HomeScreen');
      }}
      style={styles.btn}>
      <Image
        style={styles.img}
        source={require('../assets/btns/btnNoName.png')}
      />
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
};

export default BtnBack;

const styles = StyleSheet.create({
  btn: {position: 'absolute', bottom: 10, right: 10, width: 150, height: 65},
  img: {width: 150, height: 65},
  text: {
    position: 'absolute',
    color: '#fff',
    fontFamily: 'InknutAntiqua-Light',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    top: -10,
    left: 35,
  },
});

// InknutAntiqua-Black
// InknutAntiqua-Bold
// InknutAntiqua-ExtraBold
// InknutAntiqua-Light
// InknutAntiqua-Medium
// InknutAntiqua-Regular
// InknutAntiqua-SemiBold
