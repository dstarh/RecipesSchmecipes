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
var RecipeRow = require('./RecipeRow');
var RecipeCard = require('./RecipeCard');
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
      <RecipeRow 
      key={recipe.id}
      onSelect={() => this.selectRecipe(recipe)}
      recipe={recipe}/>
    );
  },
  selectRecipe: function(recipe: Object){
    this.props.navigator.push({
      title: recipe.name,
      component: RecipeCard,
      passProps: {recipe},
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View>
          <SearchBar />
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = SearchScreen;