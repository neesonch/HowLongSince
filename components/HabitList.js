import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import HabitListItem from './HabitListItem';

export default class HabitList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: props.data };
	}



	// // temp test method
	// testHandleAddNewHabit = () => {
 //        const newHabit = 
 //        {
 //            id: 7,
 //            title: "Test",
 //            isGoodHabit: true,
 //            lastTimestamp: 0,
 //            interval: 1,
 //        }
 //        const newHabitData = [...this.state.data, newHabit];
 //        console.log(newHabitData);
 //        this.setState({data: newHabitData});
	// }

	render() {
		return (
			<View style={styles.timestampListView}>
				<FlatList
					contentContainerStyle={styles.timestampListContentStyle}
					data={this.props.data}
					renderItem={({ item }) => {
						return (
							<HabitListItem
								item={item}
								handleDeleteItem={this.props.handleDeleteItem}
							/>
						);
					}}
					keyExtractor={(item, index) => item.id.toString()}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	timestampListView: {
		flex: 1,
		backgroundColor: '#beffcc',
		width: '98%',
		left: `1%`,
	},
	timestampListContentStyle: {
		justifyContent: 'flex-start',
	},
});
