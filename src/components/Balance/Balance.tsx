import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { useState } from 'react';
import { colorBlack, colorExpense, colorGrayLight, colorIncome, colorSaving, radioCurve } from '../../constant/styles';
import { useSelector } from 'react-redux';
import { monthData, monthsArray } from '../../constant/data';
//import { RootState } from '../../storage/rootReducer';
import { convertMoney } from '../../utils/convertMoney';
import { IDate } from '../../interface/IDate';
import { useSQLite } from '../../hooks/useSQLite';

const width2 = Dimensions.get("screen").width

export const  Balance = ({ month, year }:IDate) => {

    //const { month, year, finances }   = useSelector((state:RootState) => state.financeData);
    const { data } = useSQLite({ month: month, year: year });

    const getValueTotal = () => {
        // Filtrar ingresos y sumar
        const totalValue = data
        .reduce((sum: number, item: { amount: number; }) => sum + item.amount, 0);  
        return totalValue
    }
 

  return (
    <View style={styles.boxBalance}>
        <View style={styles.headerBalance}>
            <View>
                <Text style={styles.titleNumber}>{convertMoney(getValueTotal())} </Text>
                <Text style={styles.subtitles}>Gasto Total</Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
                <Image source={require('../../assets/images/report.png')} resizeMode="contain" style={{width:60, height:60 }}/>
            </View>
        </View>

      {
        //<Text style={styles.subtitles}>{year} {month} </Text>
      }
         
    </View>
  );
}

const styles = StyleSheet.create({
    boxBalance: {
    //flex: 1,
    width: width2-40,
    backgroundColor: 'white',
    padding:15,
    borderRadius: radioCurve
  },
  subtitles:{
    fontFamily:'FontLight',
    fontSize:20,
    color:colorGrayLight,
    //color:'white'
  },
  titleMonth:{
    fontFamily:'FontLight',
    fontSize:16,
    color: colorBlack,
    marginBottom:5
  },
  titleNumber:{
    fontFamily:'FontMedium',
    fontSize:36,
    color:colorBlack
    //color:'white'
  },
  headerBalance:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:"white",
  },
  subCard:{
    flex:16,
    padding:8,
    borderRadius: radioCurve/2,
    marginTop:10
  },
  subtitles2:{
    fontFamily:'FontLight',
    fontSize:20,
    color:colorGrayLight
  },
  subtitleNumber:{
    fontFamily:'FontMedium',
    fontSize:24,
    color:colorBlack
  }
});
