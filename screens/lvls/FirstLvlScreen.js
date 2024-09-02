import React, {useState, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Layout from '../../components/Layout';
import BtnBack from '../../components/BtnBack';
import ModalWithText from '../../components/ModalWithText';
import {color} from '../../constants/color';
import {floatFishingArtikle} from '../../data/floatFishingArtikle';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {floatFishing} from '../../data/floatFishing';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FirstLvlScreen = ({navigation}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  console.log('correctAnswerCount==>', correctAnswerCount);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isPaused, setIsPaused] = useState(false); // Додаємо стан для паузи
  const [gold, setGold] = useState(0);
  console.log('gold==>', gold);
  const [tips, setTips] = useState(3);
  const [usedTip, setUsedTip] = useState(false); // Стан для використання підказки
  const [modalIsCompliteLvl, setModalIsCompliteLvl] = useState(false);
  const [modalIsTimeOver, setModalIsTimeOver] = useState(false);
  const [modalIsFalseCompliteLvl, setModalIsFalseCompliteLvl] = useState(false);
  const [complite1Level, setComplite1Level] = useState(false);
  console.log('complite1Level==>', complite1Level);

  useEffect(() => {
    getGoldData();
    getData();
  }, []);

  useEffect(() => {
    setGoldData();
  }, [gold]);

  useEffect(() => {
    setData();
  }, [complite1Level]);

  const setData = async () => {
    try {
      const data = {
        complite1Level,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`FirstLvlScreen`, jsonData);
      console.log('Дані Gold збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
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
        //setComplite1Level(parsedData.complite1Level);
        setGold(parsedData.gold);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  ///////////////////////////////////////////////////

  useEffect(() => {
    setGold(correctAnswerCount * 100);
    //console.log('gold==>', gold);
  }, [correctAnswerCount]);

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      // Якщо не пауза і таймер більше 0
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setModalIsTimeOver(true);
    }
  }, [isPaused, timeLeft]); // Додаємо isPaused до залежностей

  const handleAnswer = selectedAnswer => {
    const currentQuestion = floatFishing[currentQuestionIndex];
    let newCorrectAnswerCount = correctAnswerCount;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      newCorrectAnswerCount = correctAnswerCount + 1;
      setCorrectAnswerCount(newCorrectAnswerCount);
    }

    if (currentQuestionIndex === floatFishing.length - 1) {
      setIsPaused(true); // Зупиняємо таймер
      if (newCorrectAnswerCount === floatFishing.length) {
        // Відображаємо модалку перемоги
        setModalIsCompliteLvl(true);
        setComplite1Level(true);
        //
      } else {
        setModalIsFalseCompliteLvl(true);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUsedTip(false); // Скидаємо використання підказки
    }
  };

  const useTip = () => {
    if (tips > 0 && !usedTip) {
      setTips(tips - 1);
      setUsedTip(true);
    }
  };

  const closeModal = () => {
    setModalIsCompliteLvl(false);
    setIsPaused(false); // Продовжуємо таймер після закриття модалки
    navigation.navigate('SecondLvlScreen');
  };

  const currentQuestion = floatFishing[currentQuestionIndex];
  const answersToShow = usedTip
    ? [currentQuestion.correctAnswer]
    : currentQuestion.answers;

  return (
    <Layout>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/lvlBackgr.png')}>
        <View
          style={{
            position: 'relative',
            flex: 1,
            alignItems: 'center',
          }}>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              {/**IMG Block */}
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{width: windowWidth, height: 245}}
                  source={require('../../assets/lvlsImg/1.png')}
                />
                <Text
                  style={{
                    marginTop: -70,
                    color: color.anotherText,
                    fontSize: 30,
                    fontWeight: 'bold',
                    fontFamily: 'InknutAntiqua-Light',
                  }}>
                  Float Fishing #1
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: windowWidth,
                }}>
                {/**Money */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/icons/money.png')}
                  />
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/icons/x2.png')}
                  />
                  <Text
                    style={{
                      fontSize: 24,
                      marginTop: 20,
                      marginBottom: 20,
                      color: color.primariText,
                      fontWeight: 'bold',
                    }}>
                    {gold}
                  </Text>
                </View>

                {/**Time */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/icons/timer.png')}
                  />
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/icons/x2.png')}
                  />
                  <Text
                    style={{
                      fontSize: 24,
                      marginTop: 20,
                      marginBottom: 20,
                      color: color.primariText,
                      fontWeight: 'bold',
                    }}>
                    {timeLeft}
                  </Text>
                </View>

                {/**Tips */}
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={useTip}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/icons/tips.png')}
                  />

                  <Image
                    style={{width: 40, height: 40}}
                    source={require('../../assets/icons/x2.png')}
                  />
                  <Text
                    style={{
                      fontSize: 24,
                      color: color.primariText,
                      fontWeight: 'bold',
                    }}>
                    {tips}
                  </Text>
                </TouchableOpacity>
              </View>

              {/**Questin / answer */}
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 30,
                    marginBottom: 40,
                    marginTop: 40,
                    marginHorizontal: 10,
                    color: color.primariText,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    //fontFamily: 'InknutAntiqua-Bold',
                  }}>
                  {currentQuestion.question}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth,
                    justifyContent: 'space-around',
                  }}>
                  {answersToShow.map((answer, index) => (
                    <TouchableOpacity
                      onPress={() => handleAnswer(answer)}
                      key={index}>
                      <Image
                        style={{width: 150, height: 65}}
                        source={require('../../assets/btns/btnNoName.png')}
                      />
                      <Text
                        style={{
                          position: 'absolute',
                          color: color.anotherText,
                          fontFamily: 'InknutAntiqua-Light',
                          fontWeight: 'bold',
                          fontSize: 30,
                          textAlign: 'center',
                          top: -10,
                          left: 35,
                        }}>
                        {answer}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/**Modal Complite Lvl*/}
              <ModalWithText
                navigation={navigation}
                text={floatFishingArtikle.article}
                modalState={modalIsCompliteLvl}
                goToo="SecondLvlScreen"
                closeModal={closeModal}
              />

              {/**Modal Time Is Over*/}
              <ModalWithText
                navigation={navigation}
                text="Time is over. Please try againe later!!!"
                modalState={modalIsTimeOver}
                goToo="HomeScreen"
                closeModal={closeModal}
              />

              {/**Modal Is False Complite Lvl*/}
              <ModalWithText
                navigation={navigation}
                text="Game over, too many wrong answers. Please try againe later!!!"
                modalState={modalIsFalseCompliteLvl}
                goToo="HomeScreen"
                closeModal={closeModal}
              />
            </View>
          </ScrollView>

          <BtnBack navigation={navigation} />
        </View>
      </ImageBackground>
    </Layout>
  );
};

export default FirstLvlScreen;
