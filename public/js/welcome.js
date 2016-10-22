var db = require('db');
var Home = React.createClass({
  getInitialState: function () {
    return ({
      title: 'CC',
      welcomeMessage: 'Welcome to CC, enjoy speedy matching!'
    });
  },
  componentDidMount: function () {
    console.log('trying to insert user');
    db.insertUser('Hugo', 'CX758', 'student', 'business', 'HK', 'en', function(err) {
      console.log(err);
    });
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

