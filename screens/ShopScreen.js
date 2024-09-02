import React, {useState, useEffect} from 'react';
import {
  Alert,
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
import {color} from '../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BtnBack from '../components/BtnBack';
import WinInGameModal from '../components/WinInGameModal';

const ShopScreen = ({navigation}) => {
  const [buyRod, setBuyRod] = useState(false);
  const [buyReel, setBuyReel] = useState(false);
  const [buyLine, setBuyLine] = useState(false);
  const [buyLure, setBuyLure] = useState(false);
  const [buyHook, setBuyHook] = useState(false);
  const [buyResipe, setBuyResipe] = useState(false);
  const [winModall, setWinModall] = useState(false);
  const [gold, setGold] = useState(0);

  useEffect(() => {
    getGoldData();
    getData();
  }, []);

  useEffect(() => {
    setGoldData();
  }, [gold]);

  useEffect(() => {
    setData();
  }, [buyRod, buyReel, buyLine, buyLure, buyHook, buyResipe]);

  const setGoldData = async () => {
    try {
      const data = {
        gold,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`Gold`, jsonData);
      console.log('Дані Gold збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getGoldData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`Gold`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setGold(parsedData.gold);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  ///////
  const setData = async () => {
    try {
      const data = {
        buyRod,
        buyReel,
        buyLine,
        buyLure,
        buyHook,
        buyResipe,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`ShopScreen`, jsonData);
      console.log('Дані ShopScreen збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`ShopScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setBuyRod(parsedData.buyRod);
        setBuyReel(parsedData.buyReel);
        setBuyLine(parsedData.buyLine);
        setBuyLure(parsedData.buyLure);
        setBuyHook(parsedData.buyHook);
        setBuyResipe(parsedData.buyResipe);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  //////

  useEffect(() => {
    if (buyRod && buyReel && buyLine && buyLure && buyHook && buyResipe) {
      //Alert.alert('congratt!!!!');
      setWinModall(true);
    }
  }, [buyRod, buyReel, buyLine, buyLure, buyHook, buyResipe]);

  const buyRodInShop = () => {
    if (gold >= 1000) {
      setGold(prev => prev - 1000);
      setBuyRod(true);
    } else {
      Alert.alert('Not enough gold');
    }
  };

  const buyReelnShop = () => {
    if (gold >= 1000) {
      setGold(prev => prev - 1000);
      setBuyReel(true);
    } else {
      Alert.alert('Not enough gold');
    }
  };

  const buyLineInShop = () => {
    if (gold >= 1000) {
      setGold(prev => prev - 1000);
      setBuyLine(true);
    } else {
      Alert.alert('Not enough gold');
    }
  };

  const buyLureInShop = () => {
    if (gold >= 1000) {
      setGold(prev => prev - 1000);
      setBuyLure(true);
    } else {
      Alert.alert('Not enough gold');
    }
  };

  const buyHookInShop = () => {
    if (gold >= 1000) {
      setGold(prev => prev - 1000);
      setBuyHook(true);
    } else {
      Alert.alert('Not enough gold');
    }
  };

  const buyResipeInShop = () => {
    if (gold >= 1000) {
      setGold(prev => prev - 1000);
      setBuyResipe(true);
    } else {
      Alert.alert('Not enough gold');
    }
  };

  const closeModal = () => {
    setModalWithRulse(false);
    setCongratModalShow(false);
    setModalIsTimeOver(false);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.title}>Shop</Text>

        {/** Money */}
        <View style={styles.moneyContainer}>
          <Image
            style={styles.moneyIcon}
            source={require('../assets/icons/money.png')}
          />
          <Image
            style={styles.moneyIcon}
            source={require('../assets/icons/x2.png')}
          />
          <Text style={styles.goldText}>{gold}</Text>
        </View>

        {/** Shop Block */}
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.shopContainer}>
              {/** Rod */}
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  disabled={buyRod}
                  onPress={buyRodInShop}
                  style={styles.buyButton}>
                  <Text style={styles.text}>Buy</Text>
                </TouchableOpacity>
                <Image
                  style={[
                    styles.itemImage,
                    {borderColor: buyRod ? 'gold' : color.anotherText},
                  ]}
                  source={require('../assets/shop/rod.png')}
                />
                <View style={styles.itemDetailContainer}>
                  <TouchableOpacity disabled={true} style={styles.detailButton}>
                    <Text style={styles.text}>Rod</Text>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={true} style={styles.btn1000}>
                    <Text style={styles.text}>1000</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/** Reel */}
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  disabled={buyReel}
                  onPress={buyReelnShop}
                  style={styles.buyButton}>
                  <Text style={styles.text}>Buy</Text>
                </TouchableOpacity>
                <Image
                  style={[
                    styles.itemImage,
                    {borderColor: buyReel ? 'gold' : color.anotherText},
                  ]}
                  source={require('../assets/shop/reel.png')}
                />
                <View style={styles.itemDetailContainer}>
                  <TouchableOpacity disabled={true} style={styles.detailButton}>
                    <Text style={styles.text}>Reel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={true} style={styles.btn1000}>
                    <Text style={styles.text}>1000</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/** Line */}
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  disabled={buyLine}
                  onPress={buyLineInShop}
                  style={styles.buyButton}>
                  <Text style={styles.text}>Buy</Text>
                </TouchableOpacity>
                <Image
                  style={[
                    styles.itemImage,
                    {borderColor: buyLine ? 'gold' : color.anotherText},
                  ]}
                  source={require('../assets/shop/line.png')}
                />
                <View style={styles.itemDetailContainer}>
                  <TouchableOpacity disabled={true} style={styles.detailButton}>
                    <Text style={styles.text}>Line</Text>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={true} style={styles.btn1000}>
                    <Text style={styles.text}>1000</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/** Lure */}
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  disabled={buyLure}
                  onPress={buyLureInShop}
                  style={styles.buyButton}>
                  <Text style={styles.text}>Buy</Text>
                </TouchableOpacity>
                <Image
                  style={[
                    styles.itemImage,
                    {borderColor: buyLure ? 'gold' : color.anotherText},
                  ]}
                  source={require('../assets/shop/lure.png')}
                />
                <View style={styles.itemDetailContainer}>
                  <TouchableOpacity disabled={true} style={styles.detailButton}>
                    <Text style={styles.text}>Lure</Text>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={true} style={styles.btn1000}>
                    <Text style={styles.text}>1000</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/** Hook */}
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  disabled={buyHook}
                  onPress={buyHookInShop}
                  style={styles.buyButton}>
                  <Text style={styles.text}>Buy</Text>
                </TouchableOpacity>
                <Image
                  style={[
                    styles.itemImage,
                    {borderColor: buyHook ? 'gold' : color.anotherText},
                  ]}
                  source={require('../assets/shop/hook.png')}
                />
                <View style={styles.itemDetailContainer}>
                  <TouchableOpacity disabled={true} style={styles.detailButton}>
                    <Text style={styles.text}>Hook</Text>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={true} style={styles.btn1000}>
                    <Text style={styles.text}>1000</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/** Recipe */}
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  disabled={buyResipe}
                  onPress={buyResipeInShop}
                  style={styles.buyButton}>
                  <Text style={styles.text}>Buy</Text>
                </TouchableOpacity>
                <Image
                  style={[
                    styles.itemImage,
                    {borderColor: buyResipe ? 'gold' : color.anotherText},
                  ]}
                  source={require('../assets/shop/resipe.png')}
                />
                <View style={styles.itemDetailContainer}>
                  <TouchableOpacity
                    disabled={true}
                    style={[styles.detailButton, {marginRight: 5}]}>
                    <Text style={styles.text}>Recipe</Text>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={true} style={styles.btn1000}>
                    <Text style={styles.text}>1000</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.scrollPadding}></View>
          </ScrollView>
        </View>

        <WinInGameModal
          navigation={navigation}
          closeModal={closeModal}
          modalState={winModall}
          goToo="PriviusScreen"
        />

        <BtnBack navigation={navigation} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: color.anotherText,
    fontFamily: 'InknutAntiqua-Bold',
    fontSize: 40,
  },
  moneyContainer: {
    flexDirection: 'row',
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: -20,
  },
  moneyIcon: {
    width: 60,
    height: 60,
  },
  goldText: {
    fontSize: 44,
    marginTop: 20,
    marginBottom: 20,
    color: color.anotherText,
    fontWeight: 'bold',
  },
  shopContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
  },
  buyButton: {
    width: 80,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: 150,
    height: 150,
    borderWidth: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  itemDetailContainer: {
    flexDirection: 'row',
  },
  detailButton: {
    width: 70,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ececec',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn1000: {
    width: 70,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: color.anotherText,
    fontFamily: 'InknutAntiqua-Light',
    paddingBottom: 5,
  },
  scrollPadding: {
    height: 300,
  },
});

export default ShopScreen;
