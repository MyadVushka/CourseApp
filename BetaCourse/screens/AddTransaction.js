import {View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, Dimensions, FlatList, Alert} from 'react-native'
import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const AddTransaction = () => {

  const navigation = useNavigation();

  const [value, setValue] = useState('');

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState('');
  const [dateText, setDateText] = useState('Pick a date');

  const [modalVis, setModalVis] = useState(false);
  const [categoryText, setCategoryText] = useState('Select a category');

  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;

  const CATEGORIES = [
    {key:'1', value:'Food'},
    {key:'2', value:'Fuel'},
    {key:'3', value:'Education'},
    {key:'4', value:'Journeys'},
    {key:'5', value:'Taxes'},
    {key:'6', value:'Entertainments'},
    {key:'7', value:'Job'},
    {key:'8', value: 'Salary'},
    {key:'9', value: 'Dept Collection'},
    {key:'10', value: 'Casino'},
    {key:'11', value: 'Sales'},
    {key:'12', value: 'Scholarship'},
    {key:'13', value: 'Investments'},
    {key:'14', value: 'Other'},
  ]

  const MONTHS =
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
     'August', 'September', 'October', 'November', 'December'];

  const onCategoryHandler = (category) => {
    setCategoryText(category)
    setModalVis(false);
  }


  const onConfirmHandler = () => {

    if (categoryText === 'Select a category' || dateText === 'Pick a date' 
        || value.length === 0 || transactionType.length === 0) {

      Alert.alert('One of the fields was not filled in');
    }
    else {

      const newTransaction = {
        type: transactionType,
        value: parseFloat(value),
        category: categoryText,
        date: moment(selectedDate).format('LL'),
        month: MONTHS[selectedDate.getMonth()],
      }

      navigation.navigate('Home', {newTransaction});
      navigation.navigate('Transactions', {newTransaction});

      console.log(newTransaction.month);
      console.log(selectedDate);
      setDateText('Pick a date');
      setCategoryText('Select a category');
      setValue('');
    }
  }


  return (
    <View style = {{backgroundColor: '#FFF6E5', flex: 1}} >
      <View style = {styles.addwrapper}>
        <View style = {styles.valueInputWrapper}>
          <Text style = {{color: '#625953', fontFamily: 'Inter-SemiBold', fontSize: 18}}>How much?</Text>
          <View style = {styles.valueInput}> 
            {/*Для Br и ввода значения */}
            <Text style = {{fontSize: 30,}}>Br</Text>
            <TextInput
              keyboardType='numeric'
              style = {styles.valueText}
              value={value}
              onChangeText={(text) => setValue(text)} />
          </View>
          </View>       
      </View>
      <View style = {styles.settingsWrapper}>
        <View style = {styles.settingChose}>
          <TouchableOpacity
            style = {styles.choseIncome}
            onPress={() => setTransactionType('Income')}>
            <Text style = {{fontFamily: 'Inter-Bold', color: 'white'}}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.choseExpense}
            onPress={() => setTransactionType('Expense')}>
            <Text style = {{fontFamily: 'Inter-Bold', color: 'white'}}>Expense</Text>
          </TouchableOpacity>
        </View>
          <TouchableOpacity
            style = {styles.Selector}
            onPress={() => setModalVis(true)}>
            <Text>{categoryText}</Text>
          </TouchableOpacity>
          <Modal
            animationType='fade'
            onRequestClose={() => setModalVis(false)}
            transparent={true}
            visible = {modalVis}>
            <View style = {styles.containerModal}>
              <View style = {[styles.modal, {width: WIDTH - 100, height: HEIGHT/3}]}>
                <FlatList
                  data={CATEGORIES.filter(item => {
                    if (transactionType === 'Income') 
                      {return item.key > 6}
                    else if (transactionType === 'Expense') 
                      {return item.key <= 6}
                    })}
                  renderItem={({item}) => 
                    <TouchableOpacity 
                      style = {styles.categoriesOutput}
                      onPress={() => onCategoryHandler(item.value)}>
                      <Text style = {{fontFamily: 'Inter-SemiBold', fontSize: 16}}>{item.value}</Text>
                    </TouchableOpacity>} />
              </View>
            </View>
          </Modal>
        <TouchableOpacity style = {styles.Selector} onPress={() => setOpen(true)}>
          <Text>{dateText}</Text>
        </TouchableOpacity>
        {/* if open - true then...*/}
        {open && ( 
          <DateTimePicker
            
            mode='date'
            value={selectedDate}
            onChange={(event, selected) => {
              if (event.type === 'set') {
                setSelectedDate(selected);
                setDateText(selected.toLocaleDateString('en-GB'))
                setOpen(false);
              }
              else {
                setOpen(false);
              }
            }}
           />
        )}
      </View>
      <View style = {styles.transactionConfirmWrapper}>
        <TouchableOpacity style = {styles.transactionConfirm}
                          onPress={() => onConfirmHandler()}>
          <Text style = {{color: '#FCFCFC', fontFamily: 'Inter-SemiBold', fontSize: 18}}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddTransaction;

const styles = StyleSheet.create({
  addwrapper: {
    paddingTop: 75,
    paddingHorizontal: 21,
    paddingBottom: 25,
  },
  valueInput: {
    flexDirection: 'row',
    marginTop: 10,
  },
  valueText: {
    marginLeft: 15,
    fontSize: 28,
    fontFamily: 'Inter-SemiBold',
    borderBottomWidth: 1,
    width: '80%',
    textAlign: 'center'
  },
  settingsWrapper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  description: {
    marginTop: 10,
    borderWidth: 0.7,
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 20,
  },
  settingChose: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    height: 80,
  },
  choseIncome: {
    backgroundColor: '#00A86B',
    padding: 4,
    borderRadius: 7,
  },
  choseExpense: {
    backgroundColor: '#FD3C4A',
    padding: 4,
    borderRadius: 7,
  },
  Selector: {
    height: 45,
    borderWidth: 0.7,
    borderRadius: 10,
    marginVertical: 15,
    paddingVertical: 12,
    paddingLeft: 20,
  },
  transactionConfirmWrapper: {
    paddingHorizontal: 30,
    flex: 0.9,
    justifyContent: 'flex-end',
  },
  transactionConfirm: {
    justifyContent: 'center',
    height: 45,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#7F3DFF'
  },

  containerModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5,
    paddingHorizontal: 10,
  },

  categoriesOutput: {
    marginTop: 10,
  }
})