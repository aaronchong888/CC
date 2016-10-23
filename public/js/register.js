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
    var targetDOMNode = this.refs.target.getDOMNode();
    var countryDOMNode = this.refs.country.getDOMNode();

    var userInfo = {
      name: nameDOMNode.value,
      type: typeDOMNode.value,
      target: targetDOMNode.value,
      country: countryDOMNode.value,
      language: 'en',
      flight: 'CX530'
    };

    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

    $.ajax({
      type: 'POST',
      url: '/insertUser',
      data: userInfo,
      success: function(response) {
        console.log(response);
      }
    });
    setTimeout(function () {
      window.location.replace( window.location.origin + '/menu');
    }, 2000);

  },
  render: function () {
    return (
      <div className="register-container">
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <h1 className="register-title">{this.state.title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <div className="panel panel-default register-panel">
              <div className="panel-body">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  ref="name"
                  />
                <input
                  type="text"
                  class="form-control"
                  placeholder="My reason of traveling"
                  ref="type"
                  />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Matching preference"
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

        <div className="row">
          <button className="btn-lg" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
});

React.render(
  <Register />,
  document.getElementById('register')
);
