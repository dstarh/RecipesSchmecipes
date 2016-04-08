/**
*
* @providesModule RecipesSchmecipesApp
*/

'use strict'

var React = require('react-native');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;

var SearchScreen = require('./SearchScreen');

var RecipesSchmecipesApp = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Recipes Schmecipes',
          component: SearchScreen,
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('RecipesSchmecipesApp', () => RecipesSchmecipesApp);

module.exports = RecipesSchmecipesApp;
