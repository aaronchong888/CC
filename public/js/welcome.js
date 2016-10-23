var Home = React.createClass({
  getInitialState: function () {
    return ({
      title: 'CathayConnect',
      welcomeMessage: 'Welcome! Enjoy speedy matching!'
    });
  },
  componentDidMount: function () {
    setTimeout(function () {
      window.location.replace( window.location.origin + '/register');
    }, 5000);
  },
  render: function () {
    return (
      <div className="welcome-container">
        <div className="welcome-cover" />
        <div className="welcome-message">
          <h2>{this.state.welcomeMessage}</h2>
        </div>
      </div>
    );
  }
});

React.render(
  <Home />,
  document.getElementById('welcome')
);

