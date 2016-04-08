'use strict'

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var SearchBar = require('./SearchBar');
var ApiKeys = require('./ApiKeys')


var SearchScreen = React.createClass({
  render: function() {
    console.log("render is being called");
    return (
      <View>
        <View>
          <SearchBar />
        </View>
        <View style={styles.container}>
          <Text style={styles.welcome}>{ApiKeys.user}{' '}{ApiKeys.cobrand}</Text>
        </View>
      </View>
    );
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = SearchScreen;