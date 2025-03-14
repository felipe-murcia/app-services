import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Alert } from 'react-native';
import { useState } from 'react';
import { colorBlack, colorExpense, colorGrayLight, colorIncome, colorSaving, radioCurve } from '../../constant/styles';
import { convertMoney, getItemService, getNameService } from '../../utils/convertMoney';
import { IService } from '../../interface/IService';

const width2 = Dimensions.get("screen").width

type Props = {
  data:IService;
  removeData: (value: number)  => void;
  key?: number;
};

const category:any = {
  INCOME: {
    color: colorIncome,
    image: require('../../assets/images/icons/income.png')
  },
  EXPENSE: {
    color: colorExpense,
    image: require('../../assets/images/icons/expense.png')
  },
  SAVING: {
    color: colorSaving,
    image: require('../../assets/images/icons/saving.png')
  },
}


export const ItemData = ({data, removeData = () => {}, key = 0}: Props) => {

  const [ showDelete, setShowDelete ] = useState(false);

  const confirmDelete = async () => {
    Alert.alert(
        "Eliminar "+data.name,
        "¿Estás seguro de que quieres eliminar?",
        [
          {
            text: "Si",
            onPress: () => removeData(data?.id)
          },
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }, 
        ]
      );
  }

  let detailsService = getItemService(data.service);
  
  return (
    <View style={styles.boxItem} key={data.id}>
        <View style={styles.headerBalance}>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <View style={styles.iconCircle}>
                  <Image source={detailsService?.icon} resizeMode="contain" style={{width:28, height:28, tintColor: detailsService?.color}}/>
                </View>
                <View>
                  {/* <Text style={styles.subtitles}>{detailsService?.name} </Text> */}
                  <Text style={styles.title}>{data.name} </Text>
                  <Text style={styles.number}>{convertMoney(data.amount)} </Text>
                </View>
            </View>
            {
              !showDelete? 
              <TouchableOpacity onPress={()=>setShowDelete(true)}>
                <Image source={require('../../assets/images/actions/more.png')} resizeMode="contain" style={{width:24, height:24, tintColor:colorBlack}}/>
              </TouchableOpacity>
              :
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>confirmDelete()}>
                  <Image source={require('../../assets/images/actions/trash.png')} resizeMode="contain" style={{width:24, height:24, tintColor:colorBlack}}/>
                </TouchableOpacity>
                <View style={{width:10}} />
                <TouchableOpacity onPress={()=>setShowDelete(false)}>
                  <Image source={require('../../assets/images/actions/close.png')} resizeMode="contain" style={{width:24, height:24, tintColor:colorBlack}}/>
                </TouchableOpacity>
              </View>
            }
        </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  boxItem: {
    //flex: 1,
    width: width2-40,
    backgroundColor: 'white',
    paddingVertical:6,
    paddingHorizontal:15,
    borderRadius: radioCurve,
    marginTop:10,
  },
  title:{
    fontFamily:'FontLight',
    fontSize:20,
    color:colorGrayLight,
    lineHeight:19,
    backgroundColor: 'transparent'
  },
  subtitles:{
    fontFamily:'FontLight',
    fontSize:14,
    color: "#a1a1a1",
    lineHeight:14,
    backgroundColor: 'transparent'
  },
  number:{
    fontFamily:'FontMedium',
    fontSize:20,
    color:colorBlack
  },
  headerBalance:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
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
  },
  iconCircle:{
    borderRadius:50, alignItems:'center', justifyContent:'center',
    backgroundColor: "#f1f1f1",
    padding:12,
    marginRight:5
  }
});
