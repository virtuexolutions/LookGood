import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';

const NoData = ({textStyle, style, text}) => {
  return (
    <View style={{
      // backgroundColor:'green',
      // justifyContent:'center',
      alignItems:'center'
    }}>
      <View style={style}>
        <Lottie
          source={require('../Assets/Images/animation3.json')}
          autoPlay
          loop
        />
      </View>
      <CustomText style={styles.nodata} isBold>
        {text ? text : 'Data not found'}
      </CustomText>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  nodata: {
    fontSize: moderateScale(14, 0.6),
    textAlign: 'center',
    marginTop: moderateScale(5, 0.3),
    color: Color.themeColor,
  },
});
