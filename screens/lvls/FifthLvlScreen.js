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
import ConfettiCannon from 'react-native-confetti-cannon';
import {bottomFishing} from '../../data/bottomFishing';
import {bottomFishingArtikle} from '../../data/bottomFishingArtikle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FifthLvlScreen = ({navigation}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isPaused, setIsPaused] = useState(false); // Додаємо стан для паузи
  const [gold, setGold] = useState(0);
  const [tips, setTips] = useState(3);
  const [usedTip, setUsedTip] = useState(false); // Стан для використання підказки
  const [modalIsCompliteLvl, setModalIsCompliteLvl] = useState(false);
  const [modalIsTimeOver, setModalIsTimeOver] = useState(false);
  const [modalIsFalseCompliteLvl, setModalIsFalseCompliteLvl] = useState(false);
  const [confeti, setConfeti] = useState(false);
  const [complite5Level, setComplite5Level] = useState(false);

  useEffect(() => {
    getGoldData();
  }, []);

  useEffect(() => {
    setGoldData();
  }, [gold]);

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
    setGold(gold + 100);
  }, [correctAnswerCount]);

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      // Якщо не пауза і таймер більше 0
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      //Alert.alert(
      //  'Тайм із овер',
      //  '',
      //  [
      //    {
      //      text: 'OK',
      //      onPress: () => {
      //        navigation.navigate('HomeScreen'); // Перехід на HomeScreen
      //        setCurrentQuestionIndex(0); // Повертаємо до початку
      //        setCorrectAnswerCount(0); // Обнуляємо кількість правильних відповідей
      //        setTimeLeft(5); // Скидаємо таймер
      //      },
      //    },
      //  ],
      //  {cancelable: false},
      //);
      setModalIsTimeOver(true);
    }
  }, [isPaused, timeLeft]); // Додаємо isPaused до залежностей

  const handleAnswer = selectedAnswer => {
    const currentQuestion = bottomFishing[currentQuestionIndex];
    let newCorrectAnswerCount = correctAnswerCount;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      newCorrectAnswerCount = correctAnswerCount + 1;
      setCorrectAnswerCount(newCorrectAnswerCount);
    }

    if (currentQuestionIndex === bottomFishing.length - 1) {
      setIsPaused(true); // Зупиняємо таймер
      if (newCorrectAnswerCount === bottomFishing.length) {
        // Відображаємо модалку перемоги
        setModalIsCompliteLvl(true);
        setConfeti(true);
      } else {
        //Alert.alert('Гейм овер', '', [
        //  {
        //    text: 'OK',
        //    onPress: () => {
        //      setIsPaused(false); // Продовжуємо таймер після закриття алерту
        //      navigation.navigate('HomeScreen');
        //    },
        //  },
        //]);
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
    navigation.navigate('NewGameScreen');
  };

  const currentQuestion = bottomFishing[currentQuestionIndex];
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
                  source={require('../../assets/lvlsImg/5.png')}
                />
                <Text
                  style={{
                    marginTop: -70,
                    color: color.anotherText,
                    fontSize: 30,
                    fontWeight: 'bold',
                    fontFamily: 'InknutAntiqua-Light',
                  }}>
                  Bottom Fishing #5
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
                text={bottomFishingArtikle.article}
                modalState={modalIsCompliteLvl}
                goToo="NewGameScreen"
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

          {confeti && <ConfettiCannon count={200} origin={{x: -10, y: 0}} />}
          <BtnBack navigation={navigation} />
        </View>
      </ImageBackground>
    </Layout>
  );
};

export default FifthLvlScreen;
