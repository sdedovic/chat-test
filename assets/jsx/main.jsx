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
      <div className="well clearfix">
        <form onSubmit={this.sendMessage}>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input type="text" className="form-control" id="username" placeholder="Name"
              onChange={this.handleNameChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" name="message" rows="3" placeholder="Message"
              value={this.state.text} onChange={this.handleTextChange} onKeyPress={this.handleTextKeyPress}></textarea>
          </div>
          <span>{this.charsRemaining()}</span>
          <button type="submit" className="btn btn-primary pull-right"
            disabled={this.isDisabled()}>Send</button>
        </form>
      </div>
    );
  }
});

var ChatBox = React.createClass({
  getInitialState: function() {
    return {
      content: [{sdr:'Server', msg:'Welcome to Chat!'}]
    };
  },
  componentDidMount: function(){
    var context = this;
    var socket = io.socket;
    socket.on('message', function(message){
      context.setState({
        content: context.state.content.concat([message])
      })
    })
  },
  render: function(){
    return(
      <ul>
        {
          this.state.content.map(function(item){
            return <li>{item.sdr}: {item.msg}</li>
          })
        }
      </ul>
    );
  }
});

React.render(
  <MessageBox />,
  document.getElementById('message-box')
);

React.render(
  <ChatBox />,
  document.getElementById('chat-list')
);