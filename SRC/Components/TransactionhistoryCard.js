import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowWidth} from '../Utillity/utils';
import { useSelector } from 'react-redux';

const TransactionhistoryCard = ({item}) => {
const userData = useSelector(state => state.commonReducer.userData)
// console.log("🚀 ~ TransactionhistoryCard ~ userData:", userData)


  const [text, setText] = useState('credit');
  return (
    <View
      style={{
        // backgroundColor: 'red',
        borderRadius: moderateScale(15, 0.6),
        borderWidth: moderateScale(2, 0.6),
        borderColor: Color.themeColor,
        padding: moderateScale(10, 0.6),
        // height:windowHeight*0.03,
        width: windowWidth * 0.95,
        paddingHorizontal: moderateScale(15, 0.6),
        marginHorizontal: moderateScale(10, 0.3),
        marginVertical: moderateScale(10, 0.3),
        // alignItems:'center',justifyContent:'center'
      }}>
     {userData?.role == 'barber' && 
     <View
        style={{
          paddingVertical: moderateScale(5, 0.6),
          flexDirection: 'row',
          //   justifyContent: 'space-between',
        }}>
        <CustomText
          onPress={() => {
            setText('credit');
          }}
          isBold
          style={[
            styles.heading,
            {
              width: windowWidth * 0.17,
              backgroundColor: text == 'credit' ? Color.themeColor : 'grey',
              textAlign: 'center',
              fontSize:moderateScale(12,.6),
              color: text == 'credit' ? Color.black : 'white'
            //   marginHorizontal: moderateScale(5, 0.3),
            },
          ]}>
          credit
        </CustomText>
        <CustomText
          onPress={() => {
            setText('debit');
          }}
          isBold
          style={[
            styles.heading,
            {
              width: windowWidth * 0.17,
              backgroundColor: text == 'debit' ? Color.themeColor : 'grey',
              textAlign: 'center',
              marginHorizontal: moderateScale(10, 0.3),
              fontSize:moderateScale(12,.6),
              color: text == 'debit' ? Color.black : 'white'

            },
          ]}>
          debit
        </CustomText>
      </View>}
      <View
        style={{
          paddingVertical: moderateScale(5, 0.6),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CustomText isBold style={styles.heading}>
          services
        </CustomText>
        <CustomText isBold style={styles.heading}>
          amount
        </CustomText>
      </View>
      <View style={styles.row}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(12, 0.6),
            color: Color.white,
          }}>
          {item?.name}
        </CustomText>
        <CustomText isBold style={styles.amounttext}>
          {item?.amount}
        </CustomText>
      </View>
      <View style={styles.row}>
        <CustomText
          isBold
          style={{
            fontSize: moderateScale(12, 0.6),
            color: Color.white,
          }}>
          {item?.name}
        </CustomText>
        <CustomText isBold style={styles.amounttext}>
          {item?.amount}
        </CustomText>
      </View>
    </View>
  );
};

export default TransactionhistoryCard;

const styles = StyleSheet.create({
  heading: {
    fontSize: moderateScale(14, 0.6),
    color: Color.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amounttext: {
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
  },
});
