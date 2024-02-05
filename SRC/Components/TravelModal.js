import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import TextInputWithTitle from './TextInputWithTitle';
import Feather from 'react-native-vector-icons/Feather';

// import { useNavigation } from '@react-navigation/core';
// import { setVoucherData } from '../Store/slices/common';

const HolidayModal = ({
  item,
 
  setLocation,
  Location,
  setIsVisibleModal,
  isVisibleModal,
  setDisplayText
}) => {
  const navigation = useNavigation();
  // const dispatch =useDispatch()

  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isVisibleModal}
      onBackdropPress={() => {
        setIsVisibleModal(false);
      }}>
      <View style={styles.maincontainer}>
        <CustomText
          style={{
            color: Color.black,
            fontSize: moderateScale(22, 0.6),
          }}
          isBold>
          travel
        </CustomText>

        <TextInputWithTitle
          iconName={'map-pin'}
          iconType={Feather}
          titleText={'Phone'}
          secureText={false}
          placeholder={'location'}
          setText={setLocation}
          value={Location}
          viewHeight={0.06}
          viewWidth={0.75}
          inputWidth={0.6}
          multiline={true}
          borderBottomWidth={2}
          borderColor={Color.themeColor}
          backgroundColor={'#FFFFFF'}
          marginBottom={moderateScale(12, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(30, 0.4)}
          // disable={true}
        />
        <View
          style={{
            width: windowWidth * 0.7,
            alignItems: 'center',
          }}>
          <CustomButton
            textColor={Color.black}
            width={windowWidth * 0.2}
            height={windowHeight * 0.04}
            borderRadius={moderateScale(30, 0.4)}
            text={'ok'}
            fontSize={moderateScale(12, 0.3)}
            onPress={() => {
           
              // setLocation();/
              setDisplayText(Location)
              setIsVisibleModal(false);
            }}
            isGradient={true}
            isBold
            marginTop={moderateScale(5, 0.3)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default HolidayModal;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.8,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
  },
});
