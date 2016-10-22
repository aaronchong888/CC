// importted react-complete
var Register = React.createClass({
  getInitialState: function () {
    return ({
      title: 'Register',
      welcomeMessage: '',
      languages: ['en', 'zh'],
      types: ['business', 'travel', 'returnHome', 'transit', 'others'],
      homeCountries: ['China', 'Taiwan', 'Japan', 'United States'],
      name: '',
      type: '',
      country: ''
    });
  },
  componentDidMount: function () {
  },
  handleNameChange: function(e) {
    var value = e.target.value;
    this.setState({name: value});
  },
  handleTypeChange: function(e) {
    var value = e.target.value;
    this.setState({type: value});
  },
  handleCountryChange: function(e) {
    var value = e.target.value;
    this.setState({country: value});
  },
  render: function () {
    return (
      <div className="register-container">
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <h1>{this.state.title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="panel panel-default">
            <div className="panel-body">
              <input
                type="text"
                class="form-control"
                onChange={this.handleChange}
                nameplaceholder="Your name"
                value={this.state.name}
              />
              <input
                type="text"
                class="form-control"
                onChange={this.handleTypeChange}
                placeholder="I'm a..."
                value={this.state.type}                
              />
              <input
                type="text"
                class="form-control"
                onChange={this.handleCountryChange}
                placeholder="Home country"
                value={this.state.country}                
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

React.render(
  <Register />,
  document.getElementById('register')
);

