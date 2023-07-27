import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import Slider from '@react-native-community/slider';

const CustomHairCutModal = ({
  data,
  setImage,
  image,
  show,
  setShow,
  setStyle,
  style,
}) => {
  console.log(
    '🚀 ~ file: CustomHairCutModal.js:10 ~ CustomHairCutModal ~ image:',
    image,
  );
  const [size, setSize] = useState(15);
  const [rotation, setRotation] = useState(0);
  return (
    <Modal
      isVisible={show}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: Color.white,
      }}
      onBackdropPress={() => {
        setStyle({});
        setShow(false);
      }}>
      <View
        style={{
          backgroundColor: Color.white,
          height: Dimensions.get('window').height * 0.9,
          width: Dimensions.get('window').width * 0.9,
          //   paddingHorizontal: moderateScale(10, 0.3),
          //   paddingVertical: moderateScale(10, 0.3),
          borderRadius: Dimensions.get('window').width * 0.02,
        }}>
        <ImageBackground
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.6,
            justifyContent: 'center',
            alignItems: 'center',
            //   backgroundColor: 'blue',
            //   alignSelf: 'center',1
            //   marginTop: windowHeight * 0.2,
          }}
          resizeMode={'stretch'}
          source={{uri: image?.uri}}>
          <CustomImage
            source={style.image}
            style={{
              width: size+10,
              height: size,
              transform: [{ rotate: `${rotation}deg`}]
            }}
          />
        </ImageBackground>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={40}
          maximumValue={150}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(data)=>{
            console.log(data)
            setSize(data)
          }}
        />
          <Slider
          style={{width: 200, height: 40}}
          minimumValue={1}
          maximumValue={360}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={(data)=>{
            console.log(data)
            setRotation(data)
          }}
        />
      </View>
    </Modal>
  );
};

export default CustomHairCutModal;

const styles = ScaledSheet.create({
  modalHead: {
    fontSize: moderateScale(15, 0.3),
    marginBottom: moderateScale(7.5, 0.3),
  },
});
