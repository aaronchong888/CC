var Home = React.createClass({
  getInitialState: function () {
    return ({
      title: 'CathayConnect',
      welcomeMessage: 'Welcome! Enjoy speedy matching!'
    });
  },
  componentDidMount: function () {
    
  },
  render: function () {
    return (
      <div className="welcome-container">
        <div className="welcome-cover" />
        <h1 className="title">{this.state.title}</h1>
        {this.state.welcomeMessage}
      </div>
    );
  }
});

React.render(
  <Home />,
  document.getElementById('welcome')
);

