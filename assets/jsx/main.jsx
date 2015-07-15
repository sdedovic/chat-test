var MessageBox = React.createClass({
  getInitialState: function() {
    return {
      text: "",
      name: ""
    };
  },
  sendMessage: function(event){
    event.preventDefault();
    var socket = io.socket;
    socket.get('/client/send', {
      message: this.state.text,
      sender : this.state.name
    }, function(data, jwsr){});
    this.setState({text: ""});
    
  },
  handleNameChange: function(event){
    this.setState({name: event.target.value})
  },
  handleTextChange: function(event){
    this.setState({text: event.target.value})
  },
  isDisabled: function(){
    return !(this.state.name.length > 0 && this.state.text.length > 0 && this.state.text.length <= 140)
  },
  charsRemaining: function(){
    if(this.state.text.length > 140)
      return 'Too Long!'
    return 140 - this.state.text.length;
  },
  render: function() {
    return (
      <div className="well clearfix no-margin bg-two">
        <form autocomplete="off" onSubmit={this.sendMessage}>
            <input type="text" className="form-control message-name" id="username" placeholder="Name" maxLength="15"
              onChange={this.handleNameChange}/>
            <br/>
            <div className="table no-margin">
                <span className="message-content"><input type="text" className="form-control " name="message" placeholder="Message" 
                    value={this.state.text} onChange={this.handleTextChange} onKeyPress={this.handleTextKeyPress}/></span>
                <button type="submit" className="btn btn-primary message-btn" 
                    disabled={this.isDisabled()}>Send</button>
           </div>
        </form>
      </div>
    );
  }
});

var dateOptions = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
}; 

var ChatBox = React.createClass({
  getInitialState: function() {
    return {
      content: []
    };
  },
  componentDidMount: function(){
    var context = this;
    var socket = io.socket;
    socket.on('message', function(data){
      var message = data;
      message['time']=moment();
      context.setState({
        content: [message].concat(context.state.content)
      })
    })
  },
  render: function(){
    return(
      <div className="well clearfix no-margin height-full vscroll bg-one">
        {
          this.state.content.map(function(item){
            return (
              <blockquote className="chat-container">
                <p className="msg">{item.msg}</p>
                <footer className="sdr">{item.sdr}<cite className="time pull-right">{moment(item.time).fromNow()}</cite></footer>
              </blockquote>
            )
          })
        }
      </div>
    );
  }
});

React.render(
  <MessageBox />,
  document.getElementById('react-message-box')
);

React.render(
  <ChatBox />,
  document.getElementById('react-chat-list')
);