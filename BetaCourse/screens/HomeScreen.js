import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Svg, Path } from 'react-native-svg';
import { useRoute } from '@react-navigation/native';


const HomeScreen = () => {

  const route = useRoute();
  const newTransaction = route.params ? route.params.newTransaction : null; 

  var balance = 0.0;
  const [totalIncome, setTotalIncome] = useState(0.0);
  const [totalExpense, setTotalExpense] = useState(0.0);

  useEffect(() => {
    if (newTransaction) {
      if (newTransaction.type === 'Income') {
        setTotalIncome((prevTotalIncome) => prevTotalIncome + newTransaction.value);
      } else if (newTransaction.type === 'Expense') {
        setTotalExpense((prevTotalExpense) => prevTotalExpense + newTransaction.value);
      }
    }
  }, [newTransaction]);

  balance = totalIncome - totalExpense;

  const currentDate = new Date();
  const formattedDate = moment(currentDate).format('LL');

  return (
    <View style = {styles.wrapper}>
      <LinearGradient style = {styles.upperMenuWrapper}
        colors={['#fff6e5', '#bdada8']}
        opacity = {0.8}>
        <View style = {styles.upperMenuDate}>
          <Text style = {styles.menuDateText}>{formattedDate}</Text>
        </View>
        <View style = {styles.upperBorder}></View>
        
        <View style = {styles.balance}>
          <Text style = {{color: '#91919F', fontFamily: 'Inter-Medium'}}>Account Balance</Text>
          <Text style = {{fontFamily: 'Inter-SemiBold', fontSize: 40,}}>{balance}</Text>
        </View>

        <View style = {styles.info}>
          <View style = {styles.infoIncome}>
            <View style = {styles.infoImg}>
              <Svg
                  style = {styles.incomeImg}
                  width={24}
                  height={28}
                  viewBox="0 0 24 28"
                  fill="none"
                >
                  <Path
                    d="M19 12H5C3.6739 12 2.4021 12.5268 1.4645 13.4645C0.5268 14.4021 0 15.6739 0 17V23C0 24.3261 0.5268 25.5979 1.4645 26.5355C2.4021 27.4732 3.6739 28 5 28H19C20.3261 28 21.5979 27.4732 22.5355 26.5355C23.4732 25.5979 24 24.3261 24 23V17C24 15.6739 23.4732 14.4021 22.5355 13.4645C21.5979 12.5268 20.3261 12 19 12ZM12 24C11.2089 24 10.4355 23.7654 9.7777 23.3259C9.1199 22.8864 8.6072 22.2616 8.3045 21.5307C8.0017 20.7998 7.9225 19.9956 8.0769 19.2196C8.2312 18.4437 8.6122 17.731 9.1716 17.1716C9.731 16.6122 10.4437 16.2312 11.2196 16.0769C11.9956 15.9225 12.7998 16.0017 13.5307 16.3045C14.2616 16.6072 14.8864 17.1199 15.3259 17.7777C15.7654 18.4355 16 19.2089 16 20C16 21.0609 15.5786 22.0783 14.8284 22.8284C14.0783 23.5786 13.0609 24 12 24Z"
                    fill="#00A86B"
                  />
                  <Path
                    d="M12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22Z"
                    fill="#00A86B"
                  />
                  <Path
                    d="M12 0C11.7348 0 11.4804 0.1054 11.2929 0.2929C11.1054 0.4804 11 0.7348 11 1V6.59L8.46001 4.05C8.26871 3.8862 8.02261 3.8006 7.77091 3.8103C7.51931 3.82 7.28052 3.9243 7.10242 4.1024C6.92432 4.2805 6.82001 4.5193 6.81031 4.7709C6.80061 5.0226 6.88621 5.2687 7.05001 5.46L11.29 9.71C11.3821 9.8 11.4908 9.8713 11.61 9.92C11.7334 9.9723 11.866 9.9992 12 9.9992C12.134 9.9992 12.2666 9.9723 12.39 9.92C12.5092 9.8713 12.6178 9.8 12.71 9.71L17 5.46C17.1638 5.2687 17.2494 5.0226 17.2397 4.7709C17.23 4.5193 17.1257 4.2805 16.9476 4.1024C16.7695 3.9243 16.5307 3.82 16.279 3.8103C16.0274 3.8006 15.7813 3.8862 15.59 4.05L13 6.59V1C13 0.7348 12.8946 0.4804 12.7071 0.2929C12.5196 0.1054 12.2652 0 12 0Z"
                    fill="#00A86B"
                  />
              </Svg>
            </View>
            <View>
              <Text style = {{color: 'white', fontFamily: 'Inter-Medium'}}>Income</Text>
              <Text style = {{fontFamily: 'Inter-SemiBold', color: 'white'}}>{totalIncome}</Text>
            </View>
          </View>
          <View style = {styles.infoeExpenses}>
            <View style = {styles.infoImg}>
              <Svg
                style = {styles.imgExpense}
                width={25}
                height={28}
                viewBox="0 0 25 28"
                fill="none"
              >
                <Path
                  d="M19.1975 12H5.19751C3.87143 12 2.59966 12.5268 1.66198 13.4645C0.724294 14.4021 0.19751 15.6739 0.19751 17V23C0.19751 24.3261 0.724294 25.5979 1.66198 26.5355C2.59966 27.4732 3.87143 28 5.19751 28H19.1975C20.5236 28 21.7954 27.4732 22.733 26.5355C23.6707 25.5979 24.1975 24.3261 24.1975 23V17C24.1975 15.6739 23.6707 14.4021 22.733 13.4645C21.7954 12.5268 20.5236 12 19.1975 12ZM12.1975 24C11.4064 24 10.633 23.7654 9.97523 23.3259C9.31743 22.8864 8.80474 22.2616 8.50199 21.5307C8.19924 20.7998 8.12003 19.9956 8.27437 19.2196C8.42871 18.4437 8.80967 17.731 9.36908 17.1716C9.92849 16.6122 10.6412 16.2312 11.4171 16.0769C12.1931 15.9225 12.9973 16.0017 13.7282 16.3045C14.4591 16.6072 15.0839 17.1199 15.5234 17.7777C15.9629 18.4355 16.1975 19.2089 16.1975 20C16.1975 21.0609 15.7761 22.0783 15.0259 22.8284C14.2758 23.5786 13.2584 24 12.1975 24Z"
                  fill="#FD3C4A"
                />
                <Path
                  d="M12.1975 22C13.3021 22 14.1975 21.1046 14.1975 20C14.1975 18.8954 13.3021 18 12.1975 18C11.0929 18 10.1975 18.8954 10.1975 20C10.1975 21.1046 11.0929 22 12.1975 22Z"
                  fill="#FD3C4A"
                />
                <Path
                  d="M12.9075 0.29C12.8145 0.196272 12.7039 0.121877 12.5821 0.0711086C12.4602 0.0203399 12.3295 -0.00579834 12.1975 -0.00579834C12.0655 -0.00579834 11.9348 0.0203399 11.8129 0.0711086C11.691 0.121877 11.5804 0.196272 11.4875 0.29L7.24747 4.54C7.05387 4.72698 6.94246 4.98321 6.93778 5.25232C6.93309 5.52144 7.0355 5.78139 7.22247 5.975C7.40945 6.16861 7.66568 6.28001 7.9348 6.2847C8.20391 6.28939 8.46387 6.18698 8.65747 6L11.1975 3.41V9C11.1975 9.26522 11.3028 9.51957 11.4904 9.70711C11.6779 9.89464 11.9323 10 12.1975 10C12.4627 10 12.717 9.89464 12.9046 9.70711C13.0921 9.51957 13.1975 9.26522 13.1975 9V3.41L15.7375 6C15.9237 6.18474 16.1751 6.2889 16.4375 6.29C16.5774 6.29761 16.7174 6.27573 16.8483 6.22577C16.9792 6.17581 17.0982 6.09889 17.1975 6C17.3837 5.81264 17.4883 5.55919 17.4883 5.295C17.4883 5.03081 17.3837 4.77736 17.1975 4.59L12.9075 0.29Z"
                  fill="#FD3C4A"
                />
              </Svg>           
            </View>
            <View>
             <Text style = {{color: 'white', fontFamily: 'Inter-Medium'}}>Expenses</Text>
             <Text style = {{fontFamily: 'Inter-SemiBold', color: 'white'}}>{totalExpense}</Text>         
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(168, 150, 150, 1.00)',

  },
  upperMenuWrapper: {
    flex: 0.45,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 30,
  },
  upperMenuDate: {
    paddingTop: 30,
  },
  menuDateText: {
    fontFamily: 'Inter-Regular',
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
  },
  upperBorder: {
    marginTop: 10,
    borderWidth: 0.7,
    height: 1,
  },
  balance: {
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoIncome: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 140,
    height: 65,
    backgroundColor: '#00A86B',
    borderRadius: 25,
    padding: 10,
  },
  infoeExpenses: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 140,
    height: 65,
    backgroundColor: '#FD3C4A',
    borderRadius: 25,
    padding: 10,
  },
  infoImg: {
    width: 40,
    height: 40,
    backgroundColor: '#FCFCFC',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

})