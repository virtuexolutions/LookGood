import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomImage from './CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import FontAwesone5 from 'react-native-vector-icons/FontAwesome5';
import CustomButton from './CustomButton';
import { useSelector } from 'react-redux';

const CompletedOrderCard = ({item}) => {

const user =useSelector(state => state.commonReducer.userData)



  const amount = () => {
    let totalAmount = 0;
    item?.booking_detail?.map(data => {
      totalAmount += data?.service_info?.price;
    });
    // console.log('Total======>>>>>>>>>', totalAmount);
    return totalAmount;
  };

  const calculateTotalAmount = () => {
    const bookingDetail = item?.booking_detail;
    // const amount = item?.booking_detail.reduce((a,b)=> a+b)

    if (!Array.isArray(bookingDetail) || bookingDetail.length === 0) {
      return 0;
    }

    const serviceNames = bookingDetail
      .map(service => service?.service_info?.name)
      .filter(Boolean);

    return serviceNames.join(', ');
  };
  const servicesText = calculateTotalAmount();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageView}>
        <CustomImage
          style={{
            height: '100%',
            width: '100%',
          }}
          source={require('../Assets/Images/dummyCustomer1.png')}
        />
      </View>
      <View>
        <CustomText isBold style={styles.heading1}>
          {/* name */}
          {item?.first_name}
        </CustomText>
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            Date :
          </CustomText>
          <CustomText style={styles.Text}>
            {item?.booking_date}
            {/* aug 12,2023 */}
          </CustomText>
        </View>
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            Time :
          </CustomText>
          <CustomText style={styles.Text}>{item?.booking_time}</CustomText>
        </View>
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            total Amount :
          </CustomText>
          <CustomText style={styles.Text}>
            {/* 5000 */}
            {amount()}
          </CustomText>
        </View>
        <View style={styles.row}>
          <View style={styles.iconView}>
            <Icon
              style={{
                textAlign: 'center',
              }}
              name="map-marker-alt"
              as={FontAwesone5}
              color={Color.black}
              size={17}
            />
          </View>
          <CustomText
            // isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(12, 0.6),
              paddingHorizontal: moderateScale(5, 0.6),
            }}>
            {item?.custom_location}
          </CustomText>
        </View>
      </View>
      <CustomButton
        textColor={Color.white}
        borderWidth={1}
        borderRadius={moderateScale(15, 0.6)}
        borderColor={Color.white}
        width={windowWidth * 0.27}
        height={windowHeight * 0.04}
        text={'details'}
        fontSize={moderateScale(13, 0.3)}
        //    onPress={onPress}
        isBold
        marginTop={moderateScale(5, 0.3)}
      />
    </View>
  );
};

export default CompletedOrderCard;

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: moderateScale(1, 0.6),
    borderColor: Color.white,
    flexDirection: 'row',
    // backgroundColor: 'red',
    // justifyContent:'space-between',
    width: windowWidth * 0.95,
    paddingBottom: moderateScale(8, 0.6),
    marginBottom: moderateScale(15, 0.3),
  },
  row: {
    flexDirection: 'row',
    padding: moderateScale(1, 0.6),
    paddingHorizontal: moderateScale(8, 0.6),
  },
  Text: {
    // backgroundColor:'orange',
    marginHorizontal: moderateScale(10, 0.3),
    color: Color.white,
    fontSize: moderateScale(13, 0.6),
  },
  heading: {
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
  },
  heading1: {
    color: Color.white,
    paddingHorizontal: moderateScale(8, 0.6),
    fontSize: moderateScale(16, 0.6),
  },
  imageView: {
    height: windowHeight * 0.08,
    width: windowHeight * 0.08,
    borderRadius: moderateScale((windowHeight * 0.08) / 2),
    overflow: 'hidden',
    marginVertical: moderateScale(25, 0.3),
  },
  iconView: {
    backgroundColor: Color.white,
    width: windowHeight * 0.03,
    height: windowHeight * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale((windowHeight * 0.03) / 2),
  marginHorizontal: moderateScale(5, 0.6),
    // marginTop:moderateScale(1,.6)

  },
});
