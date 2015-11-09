var Autocomplete = React.createClass({
  getInitialState: function() {
    return {inputText: ""};
  },

  handleInput: function(e){
    this.setState({ inputText: e.target.value });
  },

  search: function () {
    var dataSet = this.props.dataSet;
    var searchString = this.state.inputText.trim().toLowerCase();
    if (searchString.length > 0) {
      dataSet = dataSet.filter(function (d) {
        return d.name.toLowerCase().match( searchString );
      });
    }
    return dataSet;
  },

  handleClick: function(e) {
    this.setState({ inputText: e.target.textContent, searchString: e.target.textContent });
  },

  render: function () {
    var searchResults = this.search();
    var divs = [];
    if(this.state.inputText.trim().length > 0) {
      for (var i = 0; i < searchResults.length; i++) {
        divs.push(<li key={i} onClick={this.handleClick}>{searchResults[i].name}</li>);
      }
    }


    return(
      <div>
        <input type="text" value={this.state.searchString} onChange={this.handleInput} placeholder="Type here" />

        <ul className="results">
          {divs}
        </ul>
      </div>
    );
  },

});

  var dataSet = [
          { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/'},
          { name: 'AngularJS', url: 'https://angularjs.org/'},
          { name: 'jQuery', url: 'http://jquery.com/'},
          { name: 'Prototype', url: 'http://www.prototypejs.org/'},
          { name: 'React', url: 'http://facebook.github.io/react/'},
          { name: 'Ember', url: 'http://emberjs.com/'},
          { name: 'Knockout.js', url: 'http://knockoutjs.com/'},
          { name: 'Dojo', url: 'http://dojotoolkit.org/'},
          { name: 'Mootools', url: 'http://mootools.net/'},
          { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/'},
          { name: 'Lodash', url: 'http://lodash.com/'},
          { name: 'Moment', url: 'http://momentjs.com/'},
          { name: 'Express', url: 'http://expressjs.com/'},
          { name: 'Koa', url: 'http://koajs.com/'},
];
