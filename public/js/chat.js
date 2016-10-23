var socket = io();

function getCurrUnixTime() {
  return Math.floor((new Date().getTime()) / 1000);
}

var Chat = React.createClass({
  getInitialState: function () {
    socket.on('chat message', this.messageRecieve);
    return ({ data: "data" });
  },
  componentDidMount: function () {
    $.ajax({
      url: '/messages/?chatroom=' + '1' + '&limit=' + '20',
      dataType: 'json',
      success: function (data) {
        this.setState({ data: data });
        // this.trimMessagesStateIfNecessary();
      }.bind(this),
      failure: function (xhr, status, err) {
        console.err(url, status, err.toString());
      }.bind(this)
    });
  },
  handleNewMessage: function (newMsg) {
    var messages = this.state.data;
    var newMessages = messages.concat(newMsg);
    this.setState({ data: newMessages });
  },
  render: function () {
    return (
      <div className="chat-bg col-xs-12">
        <div className="row">
          <div className="col-xs-2 exit">
          </div>
          <div className="col-xs-2 col-xs-offset-2">
            <ExitIcon />
          </div>
          <div className="col-xs-2 col-xs-offset-5 ">
            <NextIcon />
          </div>
        </div>
        <ChatPanel messages={this.state.data} />
        <hr />
        <ChatBox onNewMessage={this.handleNewMessage.bind(this)} />
      </div>
    );
  }
});

var ExitIcon = React.createClass({
  getInitialState: function () {
    return { data: "data" };
  },

  handleClick: function () {
    window.location.href = "menu";
  },
  render: function () {
    return (
      <div onClick={this.handleClick} className="name">
        {JSON.parse(sessionStorage.getItem("userInfo")).name}
      </div>
    );
  }
});

var NextIcon = React.createClass({
  getInitialState: function () {
    return { data: "data" };
  },
  handleErr: function (errMsg) {
    this.setState(data, errMsg);
  },
  handleClick: function () {
    var id = sessionStorage.getItem("rmId");
    deleteChatRoom(id, handleErr);
    window.location.href = "chat";
  },
  render: function () {
    return (
      <div className="next">
      </div>
    );
  }
});

var ChatPanel = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    // On ChatApp load, grab message history of current chat room from the /messages API
  },
  trimMessagesStateIfNecessary: function () {
    var messages = this.state.data;
    var messagesLength = data.length;
    var appUiLim = this.props.uiLimit;

    if (appUiLim < messagesLength) {
      data.splice(0, messagesLength - uiLimit);
    }

    this.setState({ data: messages });
  },
  render: function () {
    return (
      <div>
        <MessagesList messages={this.props.messages} />
      </div>
    )
  }
});

var MessagesList = React.createClass({
  render: function () {
    var messageNodes = this.props.messages.map(function (msg) {
      return (<Message msg={msg} />);
    });

    return (
      <ul className='messagesList chat-panel'>
        {messageNodes}
      </ul>
    );
  }
});

var Message = React.createClass({

  componentDidMount: function () {
    var messageDOM = this.refs.message.getDOMNode();
    messageDOM.scrollIntoView();
  },
  render: function () {
    var msg = this.props.msg;
    return (
      <li className='message' ref='message'>
        <span className='messageTime'>{msg.time} </span>
        <b className='username'>{msg.username}</b>
        <span className='messageText'>: {msg.msg_content}</span>
      </li>
    );
  },
  componentDidMount: function () {
    var messageDOM = this.refs.message.getDOMNode();
    messageDOM.scrollIntoView();
  },
  render: function () {
    var msg = this.props.msg;
    return (
      <li className='message' ref='message'>
        <span className='messageTime'>{msg.time} </span>
        <b className='username'>{msg.username}</b>
        <span className='messageText'>: {msg.msg_content}</span>
      </li>
    );
  }

});


var SdMsg = React.createClass({
  getInitialState: function () {
    return { data: "data" };
  },
  onClick: function () {

  },
  render: function () {
    return (
      <div></div>
    );
  }
});

var ChatBox = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="plus col-xs-2">
        </div>
        <div className="input col-xs-8">
          <input type="text" name="msg" className="msg" placeholder="ENTER YOUR MESSAGE......" ref="chatbox" />
        </div>
        <button onClick={this.props.onNewMessage} className="send" />
      </div>
    );
  }
})

React.render(
  <Chat />,
  document.getElementById('chat')
);
