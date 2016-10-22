
var Menu = React.createClass({
  getInitialState: function () {
    return ({ data: "data" });
  },
  componentDidMount: function () {
  },
  render: function () {
    return (
      <div className="bkground">
        <div className="col menuBar">
          <div className="col-xs-2">
            <i className="fa fa-user" aria-hidden="true"></i>
          </div>
          <div className="col-xs-offset-8 col-xs-2">
            <i className="fa fa-gear" aria-hidden="true"></i>
          </div>
        </div>

        <div className="col-xs-offset-2 col-xs-6 match">

        </div>
        <div className="row col-xs-12">
          <div className="col-xs-2 fd">
          </div>
          <div className="col-xs-offset-8 col-xs-2 mic">

          </div>
        </div>

      </div>
    );
  }
});

React.render(
  <Menu />,
  document.getElementById('menu')
);
