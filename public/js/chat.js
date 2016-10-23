
var Chat = React.createClass({
  getInitialState: function () {
    return ({data: "data"});
  },
  // handleData: function(rmId){
  //   sessionStorage.setItem("rmId", rmId);
  // },
  // componentDidMount: function () {
  //   getChatRoom(JSON.parse(sessionStorage.getItem("userInfo")).name, handleData);
  // },
  render: function () {
    return (
      <div className = "chat-bg col-xs-12">
        <div className= "row">
          <div className="col-xs-2 exit">
          </div>
          <div className="col-xs-2 col-xs-offset-2">
            <exit-icon />
          </div>
          <div className="col-xs-2 col-xs-offset-5 ">
            <next-icon />
          </div>
        </div>
        <chatPanel />
        <hr/>
        <div className="row">
          <div className="plus col-xs-2">
          </div>
          <div className="input col-xs-8">
            <input type="text" name="msg" className="msg" placeholder="ENTER YOUR MESSAGE......" value="" />
          </div>
          <div className="send col-xs-2">
          </div>
        </div>
      </div>
    );
  }
});

var exit-icon = React.CreateComponent({
  getInitialState:function(){
    {data: "data"};
  },

  handleClick:function(){

    window.location.href = "menu";
  },
  render: function(){
    return(
      <div className="name">
        {JSON.parse(sessionStorage.getItem("userInfo")).name}
      </div>
    );
  }
});

var next-icon = React.CreateComponent({
  getInitialState:function(){
    {data: "data"};
  },
  handleErr: function(errMsg){
    this.setState(data: errMsg);
  },
  handleClick:function({
    deleteChatRoom(sessionStorage.getItem("rmId"), handleErr);
    window.location.href = "chat";
  }),
  render: function(){
    return (
      <div className="next">
      </div>
    );
  }
});

var chatPanel = React.CreateComponent({
  getInitialState:function(){
    {data: "data"};
  },
  handleData:function(msgDetail){
    sessionStorage.setItem("msgDetail", msgDetail);
  },
  componentDidMount: function(){
    getMessage(sessionStorage.getItem("rmId"), handleData);
  },
  render: function(){
    var msg = JSON.parse(sessionStorage.getItem("msgDetail")).map( function(message){
      if (message.msg_content){
        return(
          <div>
            {message.to_char}
          </div>
        );
      }
      else {
        return(
          <div>
          </div>
        );
      }

    }


  }
  }
});

var sdMsg = React.CreateComponent({
  getInitialState: function(){
    {data: "data"};
  },
  onClick: function(){

  },
  render: function(){
    return(

    );
  }
});

React.render(
  <Chat />,
  document.getElementById('chat')
);
