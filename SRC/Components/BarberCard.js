import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Lottie from 'lottie-react-native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BarberCard = ({item , onPress}) => {
  const [start, setStart] = useState(false);
  const [added, setAdded] = useState(false);
  const animationRef = useRef();
  console.log('🚀 ~ file: BarberCard.js:12 ~ BarberCard ~ start', start);

  useEffect(() => {
    if (start) {
      setTimeout(() => {
          animationRef.current.reset(),
          setStart(false),
          setAdded(true);
      }, 4000);
    }
  }, [start]);

  return (
    <Pressable
      onLongPress={() => {
       added == false &&(
        setStart(true),
          animationRef.current?.play())
      }}
      onPress={onPress}>
      {({pressed}) => (
        <View style={styles.cardContainer}>
          <Lottie
            ref={animationRef}
            style={{zIndex: 1}}
            source={require('../Assets/Images/heart.json')}
            speed={1}
            // duration={1000}
            loop
            //   onAnimationFinish={()=>{ console.log('fdsfsdfsdf'), animationRef.current?.pause();}}
            onAnimationLoop={() => {
              console.log('fdsfdsfsdfsd');
              // setSpeed(0)
            }}
          />
          <CustomImage
            source={item?.image}
            resizeMode={'stretch'}
            style={{
              height: windowHeight * 0.21,
              width: '100%',
              zIndex: -1,
              // backgroundColor : '#000'
            }}
          />

          <CustomText
            isBold
            style={{
              color: Color.black,
              textAlign: 'center',
              marginTop: moderateScale(5, 0.3),
            }}>
            {item?.name}
          </CustomText>
          {added && (
            <TouchableOpacity
              onPress={() => {
                setAdded(false);
              }}
              activeOpacity={0.9}
              style={styles.heart}>
              <Icon
                name="heart"
                as={AntDesign}
                color={Color.white}
                size={moderateScale(19, 0.3)}
                onPress={() => {
                  setAdded(false);
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </Pressable>
  );
};

export default BarberCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.25,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginBottom: moderateScale(20, 0.3),
  },
  heart: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
    backgroundColor: Color.themePink,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: moderateScale(10, 0.3),
    top: moderateScale(10, 0.3),
    zIndex: 1,
  },
});
