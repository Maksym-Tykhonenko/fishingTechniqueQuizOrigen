import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Layout = ({children}) => {
  return (
    <View style={styles.conteiner}>
      <ImageBackground
        style={styles.backImg}
        source={require('../assets/newBack.png')}>
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  backImg: {
    flex: 1,
  },
});

export default Layout;
