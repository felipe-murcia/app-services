import React, { useState } from 'react';
import { Modal, View, Text, Button, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { monthsArray } from '../../constant/data';
import { colorBlack, colorPrimary } from '../../constant/styles';
const width2 = Dimensions.get("screen").width

interface MonthYearPickerModalProps {
  visible: boolean;
  onClose: () => void;
  month?: number;
  year?: number;
  onConfirm: (date: { month: number; year: number }) => void;
}

const PickerMonth: React.FC<MonthYearPickerModalProps> = ({ visible, onClose, onConfirm, month = new Date().getMonth() + 1, year = new Date().getFullYear() }) => {

  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [selectedYear, setSelectedYear] = useState<number>(year);

  const renderItem = ({ item }: { item: { label: string; value: number } }) => (
    <TouchableOpacity 
    style={[styles.itemContainer, item.value == selectedMonth ? {backgroundColor:colorPrimary}:null]} 
    onPress={()=>setSelectedMonth(item.value)}>
      <Text style={[styles.itemText, item.value == selectedMonth ? { color:"white"}:null]}>{item.label.slice(0,3)}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground} >
        <View style={styles.modalContainer}>

          <View style={styles.boxPickerYear}>
            <TouchableOpacity onPress={()=>setSelectedYear(selectedYear-1)}>
              <Image source={require('../../assets/images/actions/left.png')} resizeMode="contain" style={{width:28, height:28, tintColor:colorBlack}}/>
            </TouchableOpacity>
            <Text style={styles.title}>{selectedYear}</Text>
            <TouchableOpacity onPress={()=>setSelectedYear(selectedYear+1)}>
              <Image source={require('../../assets/images/actions/right.png')} resizeMode="contain" style={{width:28, height:28, tintColor:colorBlack}}/>
            </TouchableOpacity>
          </View>


            <FlatList
              data={monthsArray}
              renderItem={renderItem}
              keyExtractor={(item) => item.value.toString()}
              numColumns={3}
              columnWrapperStyle={styles.columnWrapper}
            />

          <View style={styles.buttonContainer}>

          <TouchableOpacity onPress={()=>onClose()} >
              <View style={{backgroundColor:'transparent', borderWidth:1, borderRadius: 8, padding:8, alignItems:'center', paddingHorizontal:20}} >
                  <Text style={{color:colorBlack, fontFamily:"FontLight", fontSize:20}}>Cancelar</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{onConfirm({ month: selectedMonth, year: selectedYear }); onClose(); }} >
              <View style={{backgroundColor:colorPrimary, borderRadius: 8, padding:8, alignItems:'center', paddingHorizontal:20, flex:1}} >
                  <Text style={{color:"white", fontFamily:"FontMedium", fontSize:20}}>Seleccionar</Text>
              </View>
          </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width2-40,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  title:{
    fontFamily:'FontMedium',
    fontSize:26, 
    color:colorBlack,
    marginBottom:10,
    textAlign:'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 2,
    padding: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontFamily:'FontMedium'
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  boxPickerYear:{
    flexDirection: 'row', 
    justifyContent:'space-between', 
    //borderWidth:1, 
    borderWidth:0, 
    borderRadius:10, 
    padding:2, 
    paddingHorizontal: 10, 
    alignItems:'center', 
    marginBottom:10
  }
});

export default PickerMonth;
