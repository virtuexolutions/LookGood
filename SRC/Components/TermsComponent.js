import { View } from 'react-native'
import React from 'react'
import CustomText from './CustomText';
import { moderateScale } from 'react-native-size-matters';
import { windowWidth } from '../Utillity/utils';

const TermsComponent = ({item, index}) => {
  return (
    <View key={index} style={{width:windowWidth * 0.95}}>
    <CustomText
      isBold
      style={[
        {
          // backgroundColor: 'red',
          color: 'white',
          // textAlign: 'justify',
          marginTop: moderateScale(10, 0.3),
          lineHeight: moderateScale(20, 0.3),
          fontSize: moderateScale(15, 0.3),
        },
      ]}>
      {item.heading}
    </CustomText>
    <CustomText
      style={[
        {
          // backgroundColor: 'red',
          color: 'white',
          // textAlign: 'justify',
          marginTop: moderateScale(10, 0.3),
          lineHeight: moderateScale(20, 0.3),
          fontSize: moderateScale(15, 0.3),
        },
      ]}>
      {item.text}
    </CustomText>
    {item.list && <View style={{paddingLeft: moderateScale(12,0.1)}}>
     { item.list.map((list, index) => (
        <CustomText
          style={[
            {
              // backgroundColor: 'red',
              color: 'white',
              textAlign: 'justify',
              marginTop: moderateScale(20, 0.3),
              lineHeight: moderateScale(20, 0.3),
              fontSize: moderateScale(15, 0.3),
            },
          ]}>{`\u2022 ${list}`}</CustomText>
      ))}
      </View>
      }
  </View>
  )
}

export default TermsComponent