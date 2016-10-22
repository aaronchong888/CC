var Header = React.createClass({
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
      <nav class="navbar navbar-inverse" />
    );
  }
});

React.render(
  <Header />,
  document.getElementById('header')
);

