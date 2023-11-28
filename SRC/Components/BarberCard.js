import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Lottie from 'lottie-react-native';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import numeral from 'numeral';
import { useDispatch, useSelector } from 'react-redux';
import { setCartData, setRemoveCardData } from '../Store/slices/common';
import { Post } from '../Axios/AxiosInterceptorFunction';
// import {setCartData} from '../Store/combineReducer';

const BarberCard = ({item, onPress, addedInWishlist  }) => {
  const cartData = useSelector((state)=>state.commonReducer.cartData)
  const token = useSelector(state => state.authReducer.token)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [start, setStart] = useState(false);
  const [added, setAdded] = useState(addedInWishlist ? addedInWishlist : false);
  const animationRef = useRef();

  const addToWishList = async () => {
    const url = 'auth/wishlist';
    const body = {
      barber_id: item?.id,
    };

    setIsLoading(true);
    const response = await  Post(url, body, apiHeader(token));
    setIsLoading(true);
    if (response != undefined) {
      Platform.OS == 'android' ? ToastAndroid.show('Added to wishList', ToastAndroid.SHORT) : Alert.alert('Added to wishList')
     
    }
  };
  
  useEffect(() => {
    if (start) {
      setTimeout(() => {
        animationRef.current.reset(), setStart(false), setAdded(true);
      }, 4000);
    }
  }, [start]);

  return (
    <View style={{
    }}>
    <Pressable
      onLongPress={() => {
        added == false && (setStart(true), animationRef.current?.play(), addToWishList()) ;
      }}
      onPress={onPress}>
      {({pressed}) => (
        <View style={[styles.cardContainer,cartData?.some(data => data.id == item?.id) && {borderWidth : 2 , borderColor : '#0000FF'}]}>
          <Lottie
            ref={animationRef}
            style={{zIndex: 1}}
            source={require('../Assets/Images/heart.json')}
            speed={1}
            // duration={1000}
            loop
            //   onAnimationFinish={()=>{ console.log('fdsfsdfsdf'), animationRef.current?.pause();}}
            onAnimationLoop={() => {
      
              // setSpeed(0)
            }}
          />
                  {item?.price &&
          <View
            style={{
              alignSelf : 'flex-end',
              minWidth: moderateScale(50,0.3),
              paddingHorizontal: moderateScale(10, 0.3),
              paddingVertical: moderateScale(5, 0.3),
              borderRadius: moderateScale(20, 0.3),
              backgroundColor: 'rgba(0,0,0,0.7)',
              justifyContent : 'center',
              alignItems : 'center',
              position : 'absolute',
              top :moderateScale(10,0.3),
              left : moderateScale(4,0.3),
              zIndex : 1,
              // marginTop : moderateScale(-5,0.3)
              
            }}>
              <CustomText isBold style={{color : Color.white}}>{numeral(item?.price).format('$0,0.0')}</CustomText>
            </View>
}
          <CustomImage
            source={{uri : item?.photo}}
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
            {item?.first_name}
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
      {cartData?.some(data => data.id == item?.id) &&
      <TouchableOpacity activeOpacity={0.9} onPress={()=>{
        // let data=[];
        // data = [...cartData],
       let index1 = cartData.findIndex(x=>x?.id==item?.id);
       dispatch(setRemoveCardData(index1))
        // data.splice(index1,1),
      }} style={styles.remove}>
        <CustomText isBold style={{
          color : Color.white,
          fontSize : moderateScale(14,0.3)
        }}>Remove</CustomText>
      </TouchableOpacity>
      } 
      </View>
  );
};

export default BarberCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.26,
    backgroundColor: 'white',
    // overflow: 'hidden',
    marginBottom: moderateScale(10, 0.3),
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
  remove : {
marginBottom : moderateScale(10,0.3),
    width : windowWidth * 0.4,
    height : windowHeight * 0.05,
    backgroundColor : 'rgb(175, 4, 60)',
    justifyContent : 'center',
    alignItems : 'center'
  },
});
