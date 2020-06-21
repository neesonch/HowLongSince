import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, AsyncStorage } from 'react-native';
import HabitList from './components/HabitList';
import AddNewHabitForm from './components/AddNewHabitForm';

const STORE_KEY = 'habitsStore'

const testData = [
    { id: 0, title: 'Go to gym', isGoodHabit: true, lastTimestamp: 1500552850, interval: 1 },
    { id: 1, title: 'Eat takeaway', isGoodHabit: false, lastTimestamp: 0, interval: 1, },
    {
        id: 2,
        title: 'Give blood',
        isGoodHabit: true,
        lastTimestamp: 1533054798,
        interval: 1,
    },
    {
        id: 3,
        title: 'Leg exercises',
        isGoodHabit: true,
        lastTimestamp: 1532707631,
        interval: 1,
    },
    {
        id: 4,
        title: 'Clean kitchen',
        isGoodHabit: true,
        lastTimestamp: 1532708631,
        interval: 1,
    },
    {
        id: 5,
        title: 'Write some code',
        isGoodHabit: true,
        lastTimestamp: 1532708631,
        interval: 1,
    },
    {
        id: 6,
        title: 'Figure out how to implement scrolling',
        isGoodHabit: true,
        lastTimestamp: 1532706631,
        interval: 1,
    },
];

const saveHabitData = async (habitsArray) => {
      try {
        await AsyncStorage.setItem(STORE_KEY, JSON.stringify(habitsArray));
      } catch (error) {
        console.warn('Error saving data:');
        console.warn(error);
      }
    }

const loadHabitData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORE_KEY);
    if (data !== null) {
      console.log('Data loaded: ', JSON.parse(data))
        return JSON.parse(data);
    }
   } catch (error) {
        console.warn('Error retrieving data:');
        console.warn(error);
   }
}


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            habitData: [],
        };
        //this.handleDeleteItem = this.handleDeleteItem.bind(this);
        //this.handleAddNewHabit = this.handleAddNewHabit.bind(this);
    }

    // CN - doesn't actually seem to do anything?? Delete when sure - actual logic in HabitList 
    // handleDeleteItem = id => {
    //     const newHabitData = this.state.habitData.filter(
    //         habit => id !== habit.id
    //     );
    //     //alert(newHabitData); //DEBUG
    //     this.setState({
    //         habitData: newHabitData,
    //     });
    //     //alert(this.state.habitData); //DEBUG
    // };



    handleAddNewHabit = (title, lastTimestamp, isGoodHabit) => {
        const newHabit = 
        {
            id: lastTimestamp,
            title,
            isGoodHabit,
            lastTimestamp,
            interval: 1,
        }
        console.log(`Habit added: ${newHabit}`); //DEBUG
        const newHabitData = [...this.state.habitData, newHabit];
        saveHabitData(newHabitData).then(()=>this.setState({habitData: newHabitData}));  
    }

    handleDeleteItem = id => {
        const newHabitData = this.state.habitData.filter(habit => id !== habit.id);
        saveHabitData(newHabitData)
            .then(
                ()=>this.setState({
                    habitData: newHabitData,
                })
            );
    };

    componentDidMount(){
       //saveHabitData(testData) // DEBUG - Uncomment to initialize test data when needed
        console.log(`Component mounted`);
        loadHabitData()
            .then((data)=>this.setState({habitData: data}));
            //this.setState({habitData: data}))     
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.habitData && this.state.habitData.length > 0 &&
                <HabitList
                    data={this.state.habitData}
                    handleDeleteItem = {this.handleDeleteItem}
                />
                }
                <AddNewHabitForm handleAddNewHabit={this.handleAddNewHabit} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 25,
        width: '100%',
    },
});