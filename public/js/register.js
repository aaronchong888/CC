// importted react-complete
var Register = React.createClass({
  getInitialState: function () {
    return ({
      title: 'Register',
      welcomeMessage: '',
      languages: ['en', 'zh'],
      types: ['business', 'travel', 'returnHome', 'transit', 'others'],
      homeCountries: ['China', 'Taiwan', 'Japan', 'United States']
    });
  },
  componentDidMount: function () {
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
              <div class="dropdown">
                <Autocomplete />
              </div>
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

