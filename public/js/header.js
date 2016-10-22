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
      // <div className="col-xs-12 custom-nav">
      //   <div className="col-xs-3">
      //     btn
      //   </div>
      //   <div className="col-xs-3">
      //     btn
      //   </div>
      //   <div className="col-xs-3">
      //     btn
      //   </div>
      //   <div className="col-xs-3">
      //     btn
      //   </div>
      // </div>
    );
  }
});

React.render(
  <Header />,
  document.getElementById('header')
);
