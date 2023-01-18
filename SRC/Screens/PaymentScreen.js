import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../Components/CustomButton';
import moment from 'moment/moment';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import {Icon} from 'native-base';
import numeral from 'numeral';
import navigationService from '../navigationService';
import CustomImage from '../Components/CustomImage';

const PaymentScreen = () => {
  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.1,
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          <CustomText isBold style={styles.text1}>
            Payment
          </CustomText>
          <CustomText
            isBold
            style={[styles.subHeading, {width: windowWidth * 0.9}]}>
            Address
          </CustomText>
          <View style={[styles.container1, {height: windowHeight * 0.15}]}>
            <CustomImage
              source={require('../Assets/Images/address.png')}
              resizeMode={'stretch'}
              style={{
                width: windowWidth * 0.4,
                height: '100%',
              }}
            />
            <View
              style={{
                marginLeft: moderateScale(10, 0.3),
                justifyContent: 'center',
              }}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(12, 0.3),
                  width: windowWidth * 0.4,
                  color: Color.black,
                }}>
                Home Address :
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(11, 0.3),
                  width: windowWidth * 0.4,
                  color: Color.themeLightGray,
                }}>
                2301 Maxwell Farm Road, California
              </CustomText>
            </View>
          </View>
          <CustomText
            isBold
            style={[styles.subHeading, {width: windowWidth * 0.9}]}>
            Courier
          </CustomText>
          <View style={[styles.container1, {height: windowHeight * 0.06}]}>
            <CustomText
              isBold
              style={[
                styles.subHeading,
                {color: Color.black, marginTop: moderateScale(0, 0.3)},
              ]}>
              Regular
            </CustomText>
            <CustomText
              style={[
                styles.subHeading,
                {color: Color.themeLightGray, marginTop: moderateScale(0, 0.3)},
              ]}>
              3-6 days
            </CustomText>
            <CustomText
              style={[
                styles.subHeading,
                {color: Color.black, marginTop: moderateScale(0, 0.3)},
              ]}>
              $2.05
            </CustomText>
          </View>
          <CustomText
            isBold
            style={[styles.subHeading, {width: windowWidth * 0.9}]}>
            payment method
          </CustomText>
          <View
            style={[
              styles.container1,
              {height: windowHeight * 0.1, justifyContent: 'flex-start'},
            ]}>
            <View
              style={{
                width: 50,
                height: 30,
                backgroundColor: '#000',
                marginLeft: moderateScale(20, 0.3),
              }}></View>
            <View
              style={{
                marginLeft: moderateScale(20, 0.3),
              }}>
              <CustomText
                style={[
                  styles.subHeading,
                  {color: Color.black, marginTop: moderateScale(0, 0.3)},
                ]}>
                Mastercard
              </CustomText>

              <CustomText
                style={[
                  styles.subHeading,
                  {
                    color: Color.themeLightGray,
                    marginTop: moderateScale(0, 0.3),
                  },
                ]}>
                ****** 44102
              </CustomText>
            </View>
            <View style={styles.addCardContainer}>
              <Icon
                name="keyboard-arrow-down"
                as={MaterialIcons}
                size={moderateScale(20, 0.3)}
                color={Color.black}
              />
            </View>
          </View>
        </ScrollView>
        <CustomButton
          // borderColor={'white'}
          // borderWidth={1}
          textColor={Color.black}
          onPress={() => {
            Platform.OS == 'android'
              ? ToastAndroid.show('Booked', ToastAndroid.SHORT)
              : alert('Booked');

            navigationService.navigate('Homescreen');
          }}
          width={windowWidth * 0.9}
          height={windowHeight * 0.06}
          text={'Pay now'}
          fontSize={moderateScale(14, 0.3)}
          // borderRadius={moderateScale(30, 0.3)}
          textTransform={'uppercase'}
          isGradient={true}
          isBold
          marginBottom={moderateScale(30, 0.3)}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default PaymentScreen;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // paddingLeft: moderateScale(20, 0.3),
    // backgroundColor : Color.themeColor
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
  container1: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,

    marginTop: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subHeading: {
    color: Color.white,
    fontSize: moderateScale(12, 0.3),
    marginTop: moderateScale(20, 0.3),
  },
  addCardContainer: {
    width: moderateScale(26, 0.3),
    height: moderateScale(26, 0.3),
    borderRadius: moderateScale(13, 0.3),
    backgroundColor: 'rgba(235, 219, 189, 1)',
    position: 'absolute',
    right: moderateScale(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
