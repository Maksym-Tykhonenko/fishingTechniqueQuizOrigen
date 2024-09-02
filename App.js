import React, {useRef, useState, useEffect} from 'react';
import {Animated, Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeScreen from './screens/HomeScreen';
import NewGameScreen from './screens/NewGameScreen';
import SuperQuizScreen from './screens/SuperQuizScreen';
import ShopScreen from './screens/ShopScreen';
import ResultScreen from './screens/ResultScreen';
import OptionsScreen from './screens/OptionsScreen';
import AboutScreen from './screens/AboutScreen';
import PriviusScreen from './screens/PriviusScreen';
import ProfileScreen from './screens/ProfileScreen';
import FirstLvlScreen from './screens/lvls/FirstLvlScreen';
import SecondLvlScreen from './screens/lvls/SecondLvlScreen';
import FirdLvlScreen from './screens/lvls/FirdLvlScreen';
import FoureLvlScreen from './screens/lvls/FoureLvlScreen';
import FifthLvlScreen from './screens/lvls/FifthLvlScreen';
// <Stack.Screen name="PriviusScreen" component={PriviusScreen} />

const App = () => {
  ////////////////////////Louder

  const [louderIsEnded, setLouderIsEnded] = useState(false);

  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 3500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 8000);
  }, []);
  return (
    <NavigationContainer>
      {!louderIsEnded ? (
        <View
          style={{
            position: 'relative',
            flex: 1,
            backgroundColor: 'rgba(0,0,0)',
          }}>
          <Animated.Image
            source={require('./assets/loader1.png')} // Special animatable View
            style={{
              //...props.style,
              opacity: appearingAnim,
              width: '100%',
              height: '100%',
              position: 'absolute', // Bind opacity to animated value
            }}
          />
          <Animated.Image
            source={require('./assets/loader2.png')} // Special animatable View
            style={{
              //...props.style,
              opacity: appearingSecondAnim,
              width: '100%',
              height: '100%',
              position: 'absolute', // Bind opacity to animated value
            }}
          />
        </View>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="PriviusScreen" component={PriviusScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="NewGameScreen" component={NewGameScreen} />
          <Stack.Screen name="SuperQuizScreen" component={SuperQuizScreen} />
          <Stack.Screen name="ShopScreen" component={ShopScreen} />
          <Stack.Screen name="ResultScreen" component={ResultScreen} />
          <Stack.Screen name="OptionsScreen" component={OptionsScreen} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} />
          <Stack.Screen name="FirstLvlScreen" component={FirstLvlScreen} />
          <Stack.Screen name="SecondLvlScreen" component={SecondLvlScreen} />
          <Stack.Screen name="FirdLvlScreen" component={FirdLvlScreen} />
          <Stack.Screen name="FoureLvlScreen" component={FoureLvlScreen} />
          <Stack.Screen name="FifthLvlScreen" component={FifthLvlScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
