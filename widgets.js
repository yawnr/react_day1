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






var Clock = React.createClass({
  getInitialState: function () {
    return { time: new Date() };
  },

componentDidMount: function () {
  this.clock = setInterval(this.tick, 1000);
},

componentWillUnmount: function () {
  clearInterval(this.clock);
},

getTime: function () {

    var hours = this.state.time.getHours();
    var minutes = this.state.time.getMinutes();
    var seconds = this.state.time.getSeconds();

    return (hours + ":" + minutes + ":" + seconds);
},

tick: function () {
  this.setState({ time: new Date() });
},

render: function () {

    var newTime = this.getTime();

    return (<div>{newTime}</div>);

  }

});


var Weather = React.createClass({
  getInitialState: function () {
    return { weather: "Getting weather" };
  },

  componentDidMount: function () {
    this.getWeather();
  },

  getWeather: function () {
    this.location = navigator.geolocation;
    var api = "ca51653ef0743b4829633c083b46ec72";

    this.location.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + api;
      var request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          this.setState({ weather: JSON.parse(request.responseText) });
        } else {
        }
      }.bind(this);

      request.send();
    }.bind(this));

  },

  render: function (argument) {
    if (this.state.weather != "Getting weather") {
      return(
        <div>
          <p>Weather: {this.state.weather.weather[0].description}</p>
          <p>Temp: {Math.floor(this.state.weather.main.temp - 273)} C</p>
        </div>
      );
    } else {
      return (<div>{this.state.weather}</div>);
    }
  }
});


var Tabs = React.createClass({

getInitialState: function () {
  return { selected: 0 };
},

handleClick: function (e) {
  this.setState({ selected: e.currentTarget.value });
},

render: function () {
  var title;
  var content;
  var string = [];

  for (var i = 0; i < this.props.tabData.length; i++) {
    if (i === this.state.selected) {
      string.push(<li className="selected" value={i} onClick={this.handleClick}>Title: {this.props.tabData[i].title}</li>);
      content = this.props.tabData[i].content;
    } else {
      string.push(<li className="" value={i} onClick={this.handleClick}>Title: {this.props.tabData[i].title}</li>);
    }
  }

  return (<div>
          <ul>{string}</ul>
          <article>{content}</article>
          </div>
          );
},




});

var tabData = [{title: "dog", content: "hello i am a dog"}, {title: "cat", content: "don't touch me"}, {title: "snake", content: "slither slither hsssss"}];
