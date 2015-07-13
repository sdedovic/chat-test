import React from 'react'

var TweetBox = React.createClass({
  getInitialState: function() {
    return {
      text: "",
      name: ""
    };
  },
  sendMessage: function(event){
    event.preventDefault();
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

React.render(
  <TweetBox />,
  document.body
);
