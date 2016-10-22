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
      <div>
        <h1>{this.state.title}</h1>
        
        
      </div>
    );
  }
});

React.render(
  <Register />,
  document.getElementById('register')
);

