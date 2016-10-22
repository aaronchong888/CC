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
        <row>
          <div className="col-md-12 col-xs-12">
            <h1>{this.state.title}</h1>
          </div>
        </row>
        <row>
          <div className="panel panel-default">
            <div className="panel-body">A Basic Panel</div>
          </div>
        </row>
      </div>
    );
  }
});

React.render(
  <Register />,
  document.getElementById('register')
);

