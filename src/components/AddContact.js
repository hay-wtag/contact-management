import React from "react";
import { Container, Divider } from "semantic-ui-react";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };

  add = (e)=> {
      e.preventDefault();
      if (this.state.name=== "" || this.state.email=== ""){
          alert("Fields are empty")
          return;
      }
      this.props.addContactHandler(this.state)
      this.setState({name:"",email:""});
      this.props.history.push("/")
    //   console.log(this.state);
  }


  render() {
    return (
      <div className="ui main container">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>email</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              
            />
          </div>
          <button className="ui secondary button">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
