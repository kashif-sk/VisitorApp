import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Body, Card, CardItem } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

class VisitorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitorList: [],
    };
    this.getVisitorList();
  }

  getVisitorList() {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          visitorList: temp,
        });
      });
    });
  }

  renderListItem(item) {
    return (
      <View style={{ padding: 15 }}>
        <Card>
          <CardItem>
            <Body>
              <Text>
                <Text style={styles.label}>Name : </Text>
                {item.name}
              </Text>
              <Text>
                <Text style={styles.label}>Email : </Text>
                {item.email}
              </Text>
              <Text>
                <Text style={styles.label}>Type of visit : </Text>
                {item.label}
              </Text>
              <Text>
                <Text style={styles.label}>Person to visit : </Text>
                {item.personToVisit}
              </Text>
              <Text>
                <Text style={styles.label}>Date of entry : </Text>
                {item.entryDate}
              </Text>
              <Text>
                <Text style={styles.label}>Time of entry : </Text>
                {item.entryTime}
              </Text>
              <Text>
                <Text style={styles.label}>Time of exit : </Text>
                {item.exitTime}
              </Text>

            </Body>
          </CardItem>
        </Card>
      </View>
    );
  }

  render() {
    return (
      <>
        {this.state.visitorList.length > 0 ?
          <FlatList
            data={this.state.visitorList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => this.renderListItem(item)}
          /> :
          <View style={styles.container}>
            <Text style={styles.noVisitorText}>No visitors added yet</Text>
          </View>

        }
      </>
    );
  }
}

// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <VisitorList {...props} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noVisitorText: {
    fontSize: 23
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
});