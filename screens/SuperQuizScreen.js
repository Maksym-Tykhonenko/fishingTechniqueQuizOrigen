import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {Dimensions} from 'react-native';
import Layout from '../components/Layout';
import BtnBack from '../components/BtnBack';
import ModalWithText from '../components/ModalWithText';
import CongratModal from '../components/CongratModal';
import {color} from '../constants/color';
import {superQuizeData} from '../data/superQuizeData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const shuffleArray = array => {
  return array.sort(() => Math.random() - 0.5);
};

const SuperQuizScreen = ({navigation}) => {
  const [displayedImages, setDisplayedImages] = useState(
    shuffleArray(superQuizeData),
  );
  const [selectedImages, setSelectedImages] = useState({
    img1: null,
    img2: null,
    img3: null,
  });

  const [shuffledColumns, setShuffledColumns] = useState({
    img1: [],
    img2: [],
    img3: [],
  });

  const [modalWithRulse, setModalWithRulse] = useState(true);
  const [congratModalShow, setCongratModalShow] = useState(false);
  const [modalIsTimeOver, setModalIsTimeOver] = useState(false);
  const [timer, setTimer] = useState(120); // 2 хвилини (120 секунд)
  const [gold, setGold] = useState(0);
  console.log('gold==>', gold);

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
    // Перемішуємо зображення перед першим рендером для кожного стовпчика
    setShuffledColumns({
      img1: shuffleArray([...superQuizeData]),
      img2: shuffleArray([...superQuizeData]),
      img3: shuffleArray([...superQuizeData]),
    });
  }, []);

  useEffect(() => {
    let interval = null;
    if (!modalWithRulse && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setModalIsTimeOver(true);
    }
    return () => clearInterval(interval);
  }, [modalWithRulse, timer]);

  const handleImageSelect = (img, column) => {
    const newSelectedImages = {...selectedImages, [column]: img};
    setSelectedImages(newSelectedImages);

    if (
      newSelectedImages.img1 &&
      newSelectedImages.img2 &&
      newSelectedImages.img3 &&
      newSelectedImages.img1.id === newSelectedImages.img2.id &&
      newSelectedImages.img2.id === newSelectedImages.img3.id
    ) {
      console.log('All images match, clearing selection and filtering images.');
      console.log('Selected Images before clearing:', newSelectedImages);

      // Видаляємо зображення з кожного стовпчика
      setShuffledColumns(prevState => {
        const newShuffledColumns = {
          img1: prevState.img1.filter(
            item => item.id !== newSelectedImages.img1.id,
          ),
          img2: prevState.img2.filter(
            item => item.id !== newSelectedImages.img2.id,
          ),
          img3: prevState.img3.filter(
            item => item.id !== newSelectedImages.img3.id,
          ),
        };

        // Перевіряємо, чи всі стовпчики порожні
        if (
          newShuffledColumns.img1.length === 0 &&
          newShuffledColumns.img2.length === 0 &&
          newShuffledColumns.img3.length === 0
        ) {
          //Alert.alert('Вітаю, ви перемогли!!!', '', [

          setGold(prev => prev + 1000);
          setCongratModalShow(true);
        }

        return newShuffledColumns;
      });

      // Скидаємо вибір
      setSelectedImages({
        img1: null,
        img2: null,
        img3: null,
      });
    } else {
      console.log('Selected Images:', newSelectedImages);
    }
  };

  const renderColumn = imgKey => {
    return shuffledColumns[imgKey].map(item => {
      const isSelected = selectedImages[imgKey]?.id === item.id;

      return (
        <TouchableOpacity
          key={item.id + imgKey}
          onPress={() => handleImageSelect(item, imgKey)}
          style={[
            styles.imageWrapper,
            isSelected && styles.selectedImageWrapper,
          ]}>
          <Image source={item[imgKey]} style={styles.image} />
        </TouchableOpacity>
      );
    });
  };

  const closeModal = () => {
    setModalWithRulse(false);
    setCongratModalShow(false);
    setModalIsTimeOver(false);
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text
          style={{
            color: color.anotherText,
            fontFamily: 'InknutAntiqua-Light',
            fontSize: 40,
          }}>
          Super Quiz
        </Text>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {`Time Remaining: ${Math.floor(timer / 60)}:${
              timer % 60 < 10 ? '0' : ''
            }${timer % 60}`}
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>{renderColumn('img1')}</View>
          <View style={styles.column}>{renderColumn('img2')}</View>
          <View style={styles.column}>{renderColumn('img3')}</View>
        </View>
        <BtnBack navigation={navigation} />

        {/** Modal пріветствіє */}
        <ModalWithText
          navigation={navigation}
          text="Game Rules: Your task is to match three images that are related: a fishing technique that is suitable for catching a specific fish, and the habitat of that fish.
How to Play:
- You will be presented with 15 images: 5 fish, 5 fishing techniques, and 5 fish habitats.
- The game is divided into three columns, each containing random images.
- Select one image from each column to find three images that are connected.
Winning:
- If all three selected images match, they will disappear from the screen.
- The game continues until all images have disappeared."
          goToo="SuperQuizScreen"
          closeModal={closeModal}
          modalState={modalWithRulse}
        />

        {/** Modal congrat */}
        <CongratModal
          navigation={navigation}
          text="kdsvdsmvsd kncvsdkvnsdnv dvjnsdklvnsdv sdkvnsdvnsdkl"
          goToo="HomeScreen"
          closeModal={closeModal}
          modalState={congratModalShow}
          gold={gold}
        />

        {/**Modal Time Is Over*/}
        <ModalWithText
          navigation={navigation}
          text="Time is over. Please try againe later!!!"
          modalState={modalIsTimeOver}
          goToo="HomeScreen"
          closeModal={closeModal}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  timerContainer: {
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    fontFamily: 'InknutAntiqua-Light',
    color: color.anotherText,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: windowWidth / 3,
    alignItems: 'center',
  },
  imageWrapper: {
    marginVertical: 2,
  },
  selectedImageWrapper: {
    borderWidth: 3,
    borderColor: 'orange',
  },
  image: {
    width: 110,
    height: 70,
    resizeMode: 'contain',
  },
});

export default SuperQuizScreen;
