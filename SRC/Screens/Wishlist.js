import React, {useEffect, useState} from 'react';
import {ImageBackground, View, ScrollView, FlatList} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import moment from 'moment/moment';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import BarberCard from '../Components/BarberCard';

const Wishlist = () => {
  const [selected , setSelected] = useState('barber');
  const [data ,setData] = useState([])

 
  
  const cardArray = [
    {
      image: require('../Assets/Images/barbarDummy1.png'),
      name: 'Daniel M. Bell',
    },
    {
      image: require('../Assets/Images/barbarDummy.png'),
      name: 'Ramon C. Raines',
    },
    {
      image: require('../Assets/Images/barbarDummy1.png'),
      name: 'Daniel M. Bell',
    },
    {
      image: require('../Assets/Images/barbarDummy.png'),
      name: 'Ramon C. Raines',
    },
    {
      image: require('../Assets/Images/barbarDummy1.png'),
      name: 'Daniel M. Bell',
    },
    {
      image: require('../Assets/Images/barbarDummy1.png'),
      name: 'Daniel M. Bell',
    },
    {
      image: require('../Assets/Images/barbarDummy1.png'),
      name: 'Daniel M. Bell',
    },
  ];
  const storeArray = [
    {
      id: 1,
      image: require('../Assets/Images/glue.png'),
      name: 'Glue',
      price: 20,
      quantity: 1,
    },
    {
      id: 2,
      image: require('../Assets/Images/lotion.png'),
      name: 'Shampoo',
      price: 40,
      quantity: 1,
    },
    {
      id: 3,
      image: require('../Assets/Images/glue.png'),
      name: 'Glue',
      price: 200,
      quantity: 1,
    },
    {
      id: 4,
      image: require('../Assets/Images/lotion.png'),
      name: 'Shampoo',
      price: 20,
      quantity: 1,
    },
  ];
  useEffect(() => {
    selected == 'barber' ? setData(cardArray) : setData(storeArray)
  }, [selected])
  return (
    <ScreenBoiler
      showHeader={true}
      showback={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <CustomText isBold style={styles.text1}>
          Wishlist
        </CustomText>
        <View style={{
          flexDirection :  'row',
          marginTop : moderateScale(10,0.3),
          justifyContent : 'space-between',
          alignSelf : 'center',
          width :  windowWidth * 0.48, 
        }}>
  <CustomButton
          // borderColor={'white'}
          // borderWidth={1}
          textColor={Color.black}
          onPress={() => {
          setSelected('barber')
          }}
          width={windowWidth * 0.22}
          height={windowHeight * 0.05}
          text={'barber'}
          fontSize={moderateScale(14, 0.3)}
          // borderRadius={moderateScale(30, 0.3)}
          textTransform={'uppercase'}
          isGradient={true}
          isBold
          marginBottom={moderateScale(30, 0.3)}
        />
          <CustomButton
          // borderColor={'white'}
          // borderWidth={1}
          textColor={Color.black}
          onPress={() => {
         setSelected('Product')
          }}
          width={windowWidth * 0.22}
          height={windowHeight * 0.05}
          text={'Product'}
          fontSize={moderateScale(14, 0.3)}
          // borderRadius={moderateScale(30, 0.3)}
          textTransform={'uppercase'}
          isGradient={true}
          isBold
          marginBottom={moderateScale(30, 0.3)}
        />

        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.15,
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          <View
            style={{
              paddingTop: moderateScale(10, 0.3),
              width: windowWidth * 0.85,
              //   backgroundColor : 'red',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              //   paddingHorizontal : moderateScale()
            }}>
            {
            
            data.map((x, index) => {
              return (
                <BarberCard
                  item={x}
                  onPress={() => {
                    navigationService.navigate('BarberServicesScreen', {
                      detail: x,
                    });
                  }}
                  addedInWishlist={true}
                />
              );
            })}
          </View>
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};
export default Wishlist;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.green
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
  text1Absolute: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(16, 0.3),
    // position : 'absolute',
    // bottom : moderateScale(10,0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
  bannerView: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.46,
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
});

// <MaskedView
// style={{ flex: 1, flexDirection: 'row', height: '100%' }}
// maskElement={
//   <View
//     style={{
//       // Transparent background because mask is based off alpha channel.
//       backgroundColor: 'transparent',
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//     }}
//   >
//     <Text
//       style={{
//         fontSize: 60,
//         color: 'black',
//         fontWeight: 'bold'
//       }}
//     >
//       Basic Mask
//     </Text>
//   </View>
// }
// >
// {/* Shows behind the mask, you can put anything here, such as an image */}
// {/* <View style={{ flex: 1, height: '100%', backgroundColor: '#324376' }} /> */}
// <View style={{ flex: 1, height: '100%', backgroundColor: '#F5DD90' }} />
// <View style={{ flex: 1, height: '100%', backgroundColor: '#F76C5E' }} />
// <View style={{ flex: 1, height: '100%', backgroundColor: '#e1e1e1' }} />
// </MaskedView>
