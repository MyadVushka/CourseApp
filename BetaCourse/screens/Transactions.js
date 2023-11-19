import {View, FlatList, Text, TouchableOpacity, StyleSheet, Modal, Dimensions} from 'react-native'
import { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { Svg, Path } from 'react-native-svg';

export default Transactions = () => {

  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;

  const [transactions, setTransaction] = useState([]);
  
  const route = useRoute();
  const newTransaction = route.params ? route.params.newTransaction : null; 


  useEffect(() => {
    if (newTransaction) {
      setTransaction((prevTransactions) => [...prevTransactions, newTransaction]);
    }
  }, [newTransaction]);

  const [selectedTransactionType, setSelectedTransactionType] = useState('All');
  const TRANSACTIONS = [
    {key: 1, value: 'All'},
    {key: 2, value: 'Income'},
    {key: 3, value: 'Expense'}
  ];
  const [modalVis, setModalVis] = useState(false);
  const onCategoryHandler = (category) => {
    setSelectedTransactionType(category);
    setModalVis(false);
  }

  const MONTHS = [
    {key: 0, value: 'Month'},
    {key: 1, value: 'January'},
    {key: 2, value: 'February'},
    {key: 3, value: 'March'},
    {key: 4, value: 'April'},
    {key: 5, value: 'May'},
    {key: 6, value: 'June'},
    {key: 7, value: 'July'},
    {key: 8, value: 'August'},
    {key: 9, value: 'September'},
    {key: 10, value: 'October'},
    {key: 11, value: 'November'},
    {key: 12, value: 'December'},
  ]
  const [selectedMonth, setSelectedMonth] = useState('Month')
  const [monthModalVis, setMonthModalVis] = useState(false);
  const onMonthHandler = (category) => {
    setSelectedMonth(category.value);
    setMonthModalVis(false);
  }

  return (
    <View style = {styles.wrapper}>
      <View style = {styles.output}>
        <View style = {styles.filter}>
          <TouchableOpacity 
            style = {styles.filterButton}
            onPress={() => setMonthModalVis(true)}>
            <Svg
                width={16}
                height={8}
                viewBox="0 0 16 8"
                fill="none"

              >
                <Path
                  d="M8.00894 6.55756L8.00003 6.55745L7.99111 6.55756C7.20164 6.56694 6.4404 6.26473 5.87238 5.71665L2.23443 2.04006L5.8797 5.68533L5.88666 5.69229L5.89379 5.69907C6.46236 6.23855 7.21625 6.53929 8.00003 6.53929C8.7838 6.53929 9.5377 6.23855 10.1063 5.69907L10.1134 5.69229L10.1204 5.68533L13.7655 2.04018L10.1277 5.71666C9.55965 6.26473 8.79841 6.56694 8.00894 6.55756Z"
                  fill="black"
                  stroke="#7F3DFF"
                  strokeWidth={1.5}
                />
            </Svg>
            <Text>{selectedMonth}</Text>
          </TouchableOpacity>
          <Modal
            animationType='fade'
            visible = {monthModalVis}
            transparent = {true}
            onRequestClose={() => setMonthModalVis(false)}>
            <View style = {styles.containerModal}>
              <View style = {[styles.modal, {width: WIDTH - 150, height: HEIGHT/2.2}]}>
                <FlatList 
                  data={MONTHS}
                  renderItem={({item}) => 
                  <TouchableOpacity onPress={() => onMonthHandler(item)}>
                    <Text style = {{fontFamily: 'Inter-SemiBold', fontSize: 16}}>{item.value}</Text>
                  </TouchableOpacity>} />
              </View>
            </View>
          </Modal>
          <TouchableOpacity style = {styles.filterButton} onPress={() => setModalVis(true)}>
            <Svg
                width={16}
                height={8}
                viewBox="0 0 16 8"
                fill="none"

              >
                <Path
                  d="M8.00894 6.55756L8.00003 6.55745L7.99111 6.55756C7.20164 6.56694 6.4404 6.26473 5.87238 5.71665L2.23443 2.04006L5.8797 5.68533L5.88666 5.69229L5.89379 5.69907C6.46236 6.23855 7.21625 6.53929 8.00003 6.53929C8.7838 6.53929 9.5377 6.23855 10.1063 5.69907L10.1134 5.69229L10.1204 5.68533L13.7655 2.04018L10.1277 5.71666C9.55965 6.26473 8.79841 6.56694 8.00894 6.55756Z"
                  fill="black"
                  stroke="#7F3DFF"
                  strokeWidth={1.5}
                />
            </Svg>
            <Text>{selectedTransactionType}</Text>
          </TouchableOpacity>
          <Modal
            animationType='fade'
            onRequestClose={() => setModalVis(false)}
            transparent={true}
            visible = {modalVis}>
            <View style = {styles.containerModal}>
              <View style = {[styles.modal, {width: WIDTH - 100, height: HEIGHT/5}]}>
                <FlatList
                  data={TRANSACTIONS}
                  renderItem={({item}) => 
                    <TouchableOpacity 
                      style = {styles.categoriesOutput}
                      onPress={() => onCategoryHandler(item.value)}>
                      <Text style = {{fontFamily: 'Inter-SemiBold', fontSize: 16}}>{item.value}</Text>
                    </TouchableOpacity>} />
              </View>
            </View>
          </Modal>
        </View>
        <View>
          <FlatList 
            data={transactions.filter(item => {
                if (selectedMonth === 'Month' && selectedTransactionType === 'All') 
                  {return true;}
                else if (selectedMonth !== 'Month' && selectedTransactionType === 'All')
                { return item.month === selectedMonth; }
                else if (selectedMonth === 'Month' && selectedTransactionType !== 'All') 
                { return item.type === selectedTransactionType; }
                else {
                  return item.type === selectedTransactionType && item.month === selectedMonth;
                }
                })}
            inverted = {true}
            renderItem={({item}) => 
            <View style = {styles.outputWrapper}>
              <Text style = {{fontFamily: 'Inter-Medium', fontSize: 16}}>{item.category}</Text>
              <View>
                <Text style = {item.type === 'Income' ? styles.incomeText : styles.expenseText}>
                  {item.type === 'Expense' ? '-' : '+'}{item.value}</Text>
                <Text style = {{color: '#91919F', fontFamily: 'Inter-SemiBold'}}>{item.date.toString()}</Text>
              </View>
            </View>}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    wrapper: {
      backgroundColor: '#FFF6E5',
      flex: 1,
      paddingHorizontal: 20,
    },
    output: {
      marginTop: 70,
    },
    outputWrapper: {
      backgroundColor: 'white',
      marginBottom: 22,
      flexDirection: 'row',
      borderRadius: 15,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    incomeText: {
      fontFamily: 'Inter-SemiBold',
      color: '#00A86B',
      fontSize: 16,
    },
    expenseText: {
      fontFamily: 'Inter-SemiBold',
      color: '#FD3C4A',
      fontSize: 16,
    },
    filter: {
      flexDirection: 'row',
      columnGap: 30,
      paddingVertical: 10,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 7,
      borderWidth: 1,
      borderRadius: 17,
      paddingVertical: 7,
      paddingHorizontal: 10,
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
    },
  }
)