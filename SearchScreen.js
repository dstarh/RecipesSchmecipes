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

var API_URL = "https://api.nutrio.com"


var SearchScreen = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filter: '',
    };
  },
  componentDidMount: function() {
    this.searchRecipes('');
  },

  searchRecipes: function(query: string){
    if (query === '') {
      fetch(this.getFeaturedRecipesEndpoint(), this.getFetchOptions())
        .then((response) => {
          console.log(this.getFetchOptions());
          console.log(this.getFeaturedRecipesEndpoint());
          console.log(response);
          return response.json();
        })
        .then((responseData) => {
          this.setState({
            loading: false,
            dataSource: this.getDataSource(responseData.hits)
          })
        })
        .done()
    } else {
      this.setState({filter: query});
    }
  },
  getFetchOptions: function(){
    return {
      headers: {
        'Authorization': 'Basic ' + btoa('not_needed:' + ApiKeys.user),
        'Content-Type': 'application/json',
      }
    }
  },
  getFeaturedRecipesEndpoint: function(){
    return API_URL + "/api/v2/search/featured_recipes"
  },
  getDataSource: function(recipes: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(recipes);
  },
  renderRow: function(recipe: Object){
    return(
      <View>
        <Text>
          {recipe.name}
        </Text>
      </View>
    )
  },
  render: function() {
    console.log("render is being called");
    return (
      <View>
        <View>
          <SearchBar />
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />

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