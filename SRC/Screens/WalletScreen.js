import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import NoData from '../Components/NoData';
import TransactionhistoryCard from '../Components/TransactionhistoryCard';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';

const WalletScreen = () => {
  const token = useSelector(state => state.authReducer.token);

  const [loading, setLoading] = useState(false);
  const [Transactionhistory, setTransactionHistory] = useState([]);

  const userTransactionList = async () => {
    const url = 'auth/transaction';
    setLoading(true);
    const response = await Get(url, token);
    // console.log("🚀 ~ userTransactionList ~ response:", response?.data)
    setLoading(false);
    if (response != undefined) {
      console.log('🚀 ~ userTransactionList ~ response:', response?.data);
      setTransactionHistory(response?.data);
    }
  };
  useEffect(() => {
    userTransactionList();
  }, []);
  const dummyArray = [
    {
      name: 'haircut',
      amount: 1500,
    },
    {
      name: 'nail poslish',
      amount: 200,
    },
    {
      name: 'skin poslish',
      amount: 1000,
    },
    {
      name: 'hydra facial',
      amount: 2000,
    },
  ];
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
        <CustomText isBold style={styles.text}>
          MY WALLET
        </CustomText>

        <View style={styles.Card}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: moderateScale(10, 0.3),
              //   backgroundColor:'yellow',
              paddingHorizontal: moderateScale(20, 0.6),
            }}>
            <View style={{alignItems: 'center'}}>
              <CustomText isBold style={styles.text1}>
                Balance
              </CustomText>
              <CustomText isBold style={styles.text2}>
                Today, 21 Feb
              </CustomText>
            </View>

            <View
              style={{
                flexDirection: 'row',
                height: windowHeight * 0.04,
                width: windowWidth * 0.17,
                borderWidth: moderateScale(2, 0.3),
                borderColor: '#E3A33D',
                borderRadius: moderateScale(6, 0.3),
                justifyContent: 'space-evenly',
                alignItems: 'center',
                padding: moderateScale(2, 0.3),
              }}>
              <CustomText isBold style={{color: '#E3A33D'}}>
                +
              </CustomText>
              <CustomText
                isBold
                style={{color: '#E3A33D', fontSize: moderateScale(12, 0.6)}}>
                Add
              </CustomText>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: moderateScale(15, 0.3),
              //    backgroundColor:'red'
            }}>
            <CustomText style={{fontSize: 24, color: Color.lightGrey}}>
              $
            </CustomText>
            <CustomText
              style={{
                fontSize: 73,
                color: Color.lightGrey,
                marginLeft: moderateScale(10, 0.3),
              }}>
              8219
            </CustomText>

            <CustomText
              style={{
                fontSize: 24,
                color: 'rgba(238,238,238,0.8)',
                marginLeft: moderateScale(5, 0.3),
              }}>
              .96
            </CustomText>

            <Icon
              name="arrow-up-right"
              as={Feather}
              size={moderateScale(20, 0.3)}
              color={'#DADADA'}
              style={{marginLeft: moderateScale(5, 0.3)}}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: moderateScale(15, 0.3),
              marginTop: moderateScale(-10, 0.3),
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: 'rgba(238,238,238,0.5)',
              }}>
              +25 % Comp. last week
            </CustomText>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          // decelerationRate={'fast'}
          numColumns={1}
          ListEmptyComponent={() => {
            return (
              <NoData
                style={{
                  height: windowHeight * 0.25,
                  width: windowWidth * 0.6,
                  alignItems: 'center',
                }}
                text={'No Upcoming Orders'}
              />
            );
          }}
          style={{
            marginTop: moderateScale(10, 0.3),
          }}
          contentContainerStyle={{
            width: windowWidth,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: moderateScale(100, 0.6),
            // paddingHorizontal: moderateScale(8, 0.3),
          }}
          data={dummyArray}
          renderItem={({item, index}) => {
            // console.log("🚀 ~ file: Homescreen.js:356 ~ Homescreen ~ item:", item)
            return <TransactionhistoryCard item={item} />;
          }}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}>
          <CustomImage
            source={require('../Assets/Images/backgroundLogo.png')}
            resizeMode={'stretch'}
          />
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
  },
  text: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(24, 0.3),
  },

  text1: {
    color: Color.lightGray,
    fontSize: moderateScale(20, 0.3),
  },

  text2: {
    color: 'rgba(238,238,238,0.5)',
    fontSize: moderateScale(11, 0.3),
  },

  Card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    backgroundColor: '#333333',
    alignSelf: 'center',
    borderRadius: moderateScale(15, 0.3),
    marginTop: moderateScale(30, 0.3),
    elevation: 2,
  },
});
