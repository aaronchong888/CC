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
  handleSubmit: function () {
    // The DOM node for <input> chat message
    var nameDOMNode = this.refs.name.getDOMNode();
    var typeDOMNode = this.refs.type.getDOMNode();
    var targetDOMNode = this.refs.type.getDOMNode();
    var countryDOMNode = this.refs.country.getDOMNode();

    var userInfo = {
      name: nameDOMNode.value,
      type: typeDOMNode.value,
      target: targetDOMNode.value,
      country: countryDOMNode.value,
      language: 'en',
      flight: 'CX530'
    };

    $.ajax({
      type: 'POST',
      url: '/insertUser',
      data: userInfo,
      success: function() {
        console.log('Successfully insert new user.');
      },
      error: function() {
        console.error('Insert error');
      }
    });
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
                placeholder="Your name"
                ref="name"
                />
              <input
                type="text"
                class="form-control"
                placeholder="I'm a..."
                ref="type"
                />
              <input
                type="text"
                class="form-control"
                placeholder="I want to find a..."
                ref="target"
                />
              <input
                type="text"
                class="form-control"
                placeholder="Home country"
                ref="country"
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

