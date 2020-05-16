import React from 'react';
import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, Item } from 'native-base';
import RadioForm from 'react-native-simple-radio-button';
import { openDatabase } from 'react-native-sqlite-storage';
import Button from '../components/Button';

var db = openDatabase({ name: 'UserDatabase.db' });

class VisitorEntry extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    name: '',
    email: '',
    personToVisit: '',
    entryTime: '',
    exitTime: '',
    currentDate: '',
    label: 'Meeting',
    nameErr: '',
    emailErr: '',
    personToVisitErr: '',
    entryTimeErr: '',
    exitTimeErr: '',
  }

  initDb() {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(20), email VARCHAR(30), personToVisit VARCHAR(20),entryDate VARCHAR(20),entryTime VARCHAR(20),exitTime VARCHAR(20),label VARCHAR(20))',
              []
            );
          }
        }
      );
    });
  }

  componentDidMount() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.initDb();
    this.setState({
      currentDate: `${date}/${month}/${year}`
    })
  }

  insertData() {
    const { name, email, personToVisit, currentDate, entryTime, exitTime, label } = this.state;

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO table_user (name, email, personToVisit, entryDate, entryTime, exitTime, label) VALUES (?,?,?,?,?,?,?)',
        [name, email, personToVisit, currentDate, entryTime, exitTime, label],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Visitor added successfully',
            );
            this.resetData();
            this.resetErrors();
          } else {
            alert('Registration Failed');
          }
        }
      );
    });
  }

  resetData() {
    this.setState({
      name: '',
      email: '',
      personToVisit: '',
      entryTime: '',
      exitTime: '',
      label: 'Meeting',
    })
  }

  resetErrors() {
    this.setState({
      nameErr: '',
      emailErr: '',
      personToVisitErr: '',
      entryTimeErr: '',
      exitTimeErr: '',
    })
  }

  submitForm() {
    this.resetErrors();

    const { name, email, personToVisit, entryTime, exitTime } = this.state;

    let proceed = true;

    if (name == '') {
      this.setState({ nameErr: 'Please enter name' });
      proceed = false;
    }
    if (email == '') {
      this.setState({ emailErr: 'Please enter email' });
      proceed = false;
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      this.setState({ emailErr: 'Please enter valid email' });
      proceed = false;
    }
    if (personToVisit == '') {
      this.setState({ personToVisitErr: 'Please enter name of the person to visit' });
      proceed = false;
    }
    if (entryTime == '') {
      this.setState({ entryTimeErr: 'Please enter entry time' });
      proceed = false;
    }
    if (exitTime == '') {
      this.setState({ exitTimeErr: 'Please enter exit time' });
      proceed = false;
    }

    if (proceed) {
      this.insertData()
    }

  }

  render() {
    var radio_props = [
      { label: 'Meeting', value: 'Meeting' },
      { label: 'Delivery', value: 'Delivery' },
      { label: 'Personal', value: 'Personal' }
    ];
    const { nameErr, emailErr, personToVisitErr, entryTimeErr, exitTimeErr } = this.state
    return (
      <ScrollView
      keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>

          <Item style={styles.inputStyle}>
            <Input
              placeholder={'Name'}
              maxLength={20}
              value={this.state.name}
              onChangeText={name => this.setState({ name })} />
          </Item>
          {nameErr != '' ? <Text style={styles.errorText}>{nameErr}</Text> : null}

          <Item style={styles.inputStyle}>
            <Input
              placeholder={'Email'}
              maxLength={30}
              value={this.state.email}
              onChangeText={email => this.setState({ email })} />
          </Item>
          {emailErr != '' ? <Text style={styles.errorText}>{emailErr}</Text> : null}

          <Text style={[styles.fixedLabel, { marginBottom: 10 }]}>Type of visit</Text>
          <RadioForm
            style={{ alignSelf: 'flex-start' }}
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            onPress={(label) => { this.setState({ label }) }}
          />

          <Item style={styles.inputStyle}>
            <Input
              placeholder={'Person to visit'}
              maxLength={20}
              value={this.state.personToVisit}
              onChangeText={personToVisit => this.setState({ personToVisit })} />
          </Item>
          {personToVisitErr != '' ? <Text style={styles.errorText}>{personToVisitErr}</Text> : null}

          <Text style={styles.fixedLabel}>Date of entry</Text>
          <Item fixedLabel>
            <Input value={this.state.currentDate} editable={false} />
          </Item>

          <Item style={styles.inputStyle}>
            <Input
              placeholder={'Time of entry'}
              maxLength={20}
              value={this.state.entryTime}
              onChangeText={entryTime => this.setState({ entryTime })} />
          </Item>
          {entryTimeErr != '' ? <Text style={styles.errorText}>{entryTimeErr}</Text> : null}

          <Item style={styles.inputStyle}>
            <Input
              placeholder={'Time of Exit'}
              maxLength={20}
              value={this.state.exitTime}
              onChangeText={exitTime => this.setState({ exitTime })} />
          </Item>
          {exitTimeErr != '' ? <Text style={styles.errorText}>{exitTimeErr}</Text> : null}

          <Button onPress={() => this.submitForm()}
            children='Submit Form'
            style={styles.inputStyle}></Button>
        </View>
      </ScrollView>
    );
  }
}

// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <VisitorEntry {...props} navigation={navigation} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 12
  },
  inputStyle: {
    marginTop: 10
  },
  fixedLabel: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: -10
  },
  errorText: {
    alignSelf: 'flex-start',
    color: '#a81d16'
  },
})