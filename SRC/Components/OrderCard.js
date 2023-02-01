import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import numeral from 'numeral';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';

const OrderCard = ({item}) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CustomImage source={item?.image} style={styles.image} />
        <CustomText isBold numberOfLines={2} style={styles.name}>
          {item?.name}
        </CustomText>
      </View>
      <View style={styles.eachRow}>
        <CustomText
          isBold
          style={{
            width: windowWidth * 0.16,
            fontSize: moderateScale(12, 0.3),
          }}>
          Date :{' '}
        </CustomText>
        <CustomText style={styles.heading}>{item?.date}</CustomText>
      </View>
      <View style={styles.eachRow}>
        <CustomText
          isBold
          style={{
            width: windowWidth * 0.16,
            fontSize: moderateScale(12, 0.3),
          }}>
          time :{' '}
        </CustomText>
        <CustomText style={styles.heading}>{item?.time}</CustomText>
      </View>
      <View style={styles.eachRow}>
        <CustomText
          isBold
          style={{
            width: windowWidth * 0.16,
            fontSize: moderateScale(12, 0.3),
          }}>
          Amount :{' '}
        </CustomText>
        <CustomText style={styles.heading}>
          {numeral(item?.amount).format('$0,0.0')}
        </CustomText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop : moderateScale(3,0,.3)
        }}>
        <View
          style={{
            width: moderateScale(18, 0.3),
            height: moderateScale(18, 0.3),
            borderRadius: moderateScale(9, 0.3),
            backgroundColor: Color.black,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="md-location-sharp"
            as={Ionicons}
            size={moderateScale(11, 0.3)}
            color={Color.themeColor}
          />
        </View>
        <CustomText numberOfLines={2} style={[styles.heading, {width: '80%'}]}>
          {item?.address}
        </CustomText>
      </View>
      <CustomButton
            bgColor={Color.themeColor}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.black}
            onPress={() => {
                navigationService.navigate('OrderDetails',{item : item})
            }}
            width={windowWidth * 0.15}
            height={windowHeight * 0.02}
            text={'Details'}
            fontSize={moderateScale(8, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            alignSelf ={'flex-end'}
            marginTop={moderateScale(10,0.3)}
            
          />
    </View>
  );
};

export default OrderCard;

const styles = ScaledSheet.create({
  card: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.22,
    borderWidth: 2,
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    borderColor: Color.themeColor,
    marginRight: moderateScale(10, 0.3),
    padding: moderateScale(5, 0.3),
    marginBottom : moderateScale(15,0.3)
  },
  image: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
    overflow: 'hidden',
  },
  name: {
    fontSize: moderateScale(14, 0.3),
    marginLeft: moderateScale(3, 0.3),
    width: '70%',
    // backgroundColor : 'red',
  },
  eachRow: {
    flexDirection: 'row',
    width: '99%',
    // backgroundColor : 'red',
    // marginTop : moderateScale(5,0.3),
    alignItems: 'center',
  },
  heading: {
    fontSize: moderateScale(11, 0.3),
    marginLeft: moderateScale(5, 0.3),
    fontStyle : 'italic'
  },
 
});
