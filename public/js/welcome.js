var Home = React.createClass({
  getInitialState: function () {
    return ({
      title: 'CC',
      welcomeMessage: 'Welcome to CC, enjoy speedy matching!'
    });
  },
  componentDidMount: function () {

  },
  render: function () {
    return (
      <div>
        <h1>{this.state.title}</h1>
        {this.state.welcomeMessage}
      </div>
    );
  }
});

React.render(
  <Home />,
  document.getElementById('welcome')
);

