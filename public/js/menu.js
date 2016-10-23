
var Menu = React.createClass({
  getInitialState: function () {
    return ({ data: "data" });
  },
  componentDidMount: function () {
  },
  render: function () {
    return (
      <div className="bkground">
        <div className="row menuBar">
          <div className="col-xs-2">
            <i className="fa fa-user person" aria-hidden="true"></i>
          </div>
          <div className="col-xs-offset-8 col-xs-2">
            <i className="fa fa-gear setting" aria-hidden="true"></i>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <div className="matchContainer">
              <div className="match" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-3 fd">
          </div>
          <div className="col-xs-offset-6 col-xs-3 mic" />
        </div>
      </div>
    );
  }
});

React.render(
  <Menu />,
  document.getElementById('menu')
);
