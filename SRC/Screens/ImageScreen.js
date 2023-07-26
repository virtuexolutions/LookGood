import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomHairCutModal from '../Components/CustomHairCutModal';

const ImageScreen = props => {
  const data = props?.route?.params?.data;
  const Image = props?.route?.params?.image;

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(Image);
  const [selectedImage, setSelectedImage] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState({});
  const [array, setArray] = useState([]);
  console.log('🚀 ~ file: ImageScreen.js:24 ~ ImageScreen ~ array:', array);
  const [selectedCat, setSelectedCat] = useState('');

  const HairStyle = [
    {
      id: 1,
      image: require('../Assets/Images/MenHair/1.png'),
    },
    {
      id: 2,
      image: require('../Assets/Images/MenHair/2.png'),
    },
    {
      id: 3,
      image: require('../Assets/Images/MenHair/3.png'),
    },
    {
      id: 4,
      image: require('../Assets/Images/MenHair/4.png'),
    },
    {
      id: 5,
      image: require('../Assets/Images/MenHair/5.png'),
    },
    {
      id: 6,
      image: require('../Assets/Images/MenHair/6.png'),
    },
  ];

  const Mustaches = [
    {
      id: 1,
      image: require('../Assets/Images/Mustaches/1.png'),
    },
    {
      id: 2,
      image: require('../Assets/Images/Mustaches/2.png'),
    },
    {
      id: 3,
      image: require('../Assets/Images/Mustaches/3.png'),
    },
    {
      id: 4,
      image: require('../Assets/Images/Mustaches/4.png'),
    },
    {
      id: 5,
      image: require('../Assets/Images/Mustaches/5.png'),
    },
    {
      id: 6,
      image: require('../Assets/Images/Mustaches/6.png'),
    },
  ];

  useEffect(() => {
    if(Object.keys(selectedStyle).length > 0){
      setIsVisible(true)
    }
  }, [selectedStyle])
  

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <CustomText isBold style={styles.text}>
          Image
        </CustomText>

        <View
          style={{
            width: windowWidth * 0.8,
            height: windowHeight * 0.4,
            alignSelf: 'center',
            borderRadius: moderateScale(20, 0.6),
            overflow: 'hidden',
            marginTop: moderateScale(30, 0.3),
          }}>
          <CustomImage
            source={
              Object.keys(image).length > 0
                ? {uri: image?.uri}
                : require('../Assets/Images/barber.png')
            }
            resizeMode={'cover'}
            style={{height: '100%', width: '100%'}}
          />
        </View>
        {selectedCat == '' ? (
          <>
            <CustomButton
              bgColor={Color.themeColor}
              borderColor={'white'}
              borderWidth={1}
              textColor={Color.black}
              width={windowWidth * 0.8}
              height={windowHeight * 0.06}
              text={'Hair'}
              fontSize={moderateScale(14, 0.3)}
              isGradient={true}
              isBold
              onPress={() => {
                setSelectedCat('Hair');
                setArray(HairStyle);
              }}
              marginTop={moderateScale(30, 0.3)}
            />

            <CustomButton
              bgColor={Color.themeColor}
              borderColor={'white'}
              borderWidth={1}
              textColor={Color.black}
              width={windowWidth * 0.8}
              height={windowHeight * 0.06}
              text={'Beard'}
              fontSize={moderateScale(14, 0.3)}
              isGradient={true}
              isBold
              onPress={() => {
                setSelectedCat('Beard');
                setArray(HairStyle);
              }}
              marginTop={moderateScale(10, 0.3)}
            />

            <CustomButton
              bgColor={Color.themeColor}
              borderColor={'white'}
              borderWidth={1}
              textColor={Color.black}
              width={windowWidth * 0.8}
              height={windowHeight * 0.06}
              text={'Mustaches'}
              fontSize={moderateScale(14, 0.3)}
              isGradient={true}
              isBold
              onPress={() => {
                setSelectedCat('Mustaches');
                setArray(Mustaches);
              }}
              marginTop={moderateScale(10, 0.3)}
            />
          </>
        ) : (
          <View
            style={{
              width: windowWidth * 0.95,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center',
              // backgroundColor : 'green'
            }}>
            {array?.map((item, index) => {
              return (
                <View
                  style={{
                    width: windowWidth * 0.3,
                    height: windowHeight * 0.13,
                    marginRight: windowWidth * 0.015,
                    borderRadius: moderateScale(10, 0.6),
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    marginTop: moderateScale(20, 0.3),
                    // alignItems : 'center',
                    justifyContent : 'center',
                  }}>
                  <CustomImage
                  onPress={()=>{
                    setSelectedStyle(item)
                  }}
                    source={item?.image}
                    style={{
                      width: '90%',
                      height: '90%',
                    }}
                  />
                </View>
              );
            })}
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            right: 0,
          }}>
          <CustomImage
            source={require('../Assets/Images/backgroundLogo.png')}
            resizeMode={'stretch'}
          />
        </View>
      </LinearGradient>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setImage}
      />
      <CustomHairCutModal
        data={array}
        image={image}
        setImage={setImage}
        setShow={setIsVisible}
        show={isVisible}
        setStyle={setSelectedStyle}
        style={selectedStyle}
      />
    </ScreenBoiler>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
  },

  text: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(21, 0.3),
  },
});
