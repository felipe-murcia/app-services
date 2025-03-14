import React, {useState, useEffect} from 'react'; 
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { colorPrimary } from '../../constant/styles';
const windowWidth = Dimensions.get('window').width;
const iconSize = 24;

const iconSizeButton = 24

type Props = {
  onClickMenu: (value:number) => void;
};

export const NavBar = ({ onClickMenu }:Props) => {

  return (
    <View style={styles.navbar}>
       <TouchableOpacity onPress={()=>onClickMenu(1)}>
        <View style={{alignItems: 'center'}}>
          <Image source={require('../../assets/images/actions/home.png')} resizeMode="contain" style={{width:iconSizeButton, height:iconSizeButton, tintColor:'white' }} />
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>onClickMenu(2)}>
        <View style={{alignItems: 'center'}}> 
        <Image source={require('../../assets/images/actions/add.png')} resizeMode="contain" style={{width:iconSizeButton, height:iconSizeButton, tintColor:'white' }} />
        </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>onClickMenu(3)}>
        <View style={{alignItems: 'center'}}>
        <Image source={require('../../assets/images/actions/chart.png')} resizeMode="contain" style={{width:iconSizeButton, height:iconSizeButton, tintColor:'white' }} />
        </View>
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: windowWidth - 40,
    backgroundColor: colorPrimary,
    flexDirection: 'row',
    justifyContent:'space-around',
    padding:10,
    height:50,
    alignItems:'center',
    borderRadius:10,
    marginBottom:10,
    position:'absolute',
    bottom:5,
    left:20
  },
});
