var Home = React.createClass({
  getInitialState: function () {
    return ({
      title: 'CC',
      welcomeMessage: 'Welcome to CC, enjoy speedy matching!'
    });
  },
  componentDidMount: function () {
    // $.ajax({
    //   type: 'POST',
    //   url: '/insertUser',
    //   data: {
    //     name: 'Hugo',
    //     flight: 'CX578',
    //     type: 'student',
    //     target: 'business',
    //     country: 'HK',
    //   },
    //   success: function () {
    //     console.log('Successfully insert new user.');
    //   }
    // });
  },
  render: function () {
    return (
      <div>
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

