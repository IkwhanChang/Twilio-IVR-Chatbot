import React from "react";
import md5 from "md5";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    username: "",
    storeName: "",
    openHour: "",
    closeHour: "",
    address1: "",
    address2: "",
    zipcode: "",
    city: "",
    state: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users")
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, storeName, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !storeName.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });

      const {
        storeName,
        openHour,
        closeHour,
        address1,
        address2,
        zipcode,
        city,
        state,
      } = this.state;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser({
                createdUser, 
                storeName,
                openHour,
                closeHour,
                address1,
                address2,
                zipcode,
                city,
                state,
              }).then(() => {
                console.log("user saved");
              });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  saveUser = ({createdUser, 
    storeName,
    openHour,
    closeHour,
    address1,
    address2,
    zipcode,
    city,
    state,
  }) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      storeName,
      openHour,
      closeHour,
      address1,
      address2,
      zipcode,
      city,
      state,

    });
  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const {
      username,
      storeName,
      openHour,
      closeHour,
      address1,
      address2,
      zipcode,
      city,
      state,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="add user" color="orange" />
            Register for IVRobot
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                type="text"
              />

<Form.Input
                fluid
                name="storeName"
                icon="warehouse"
                iconPosition="left"
                placeholder="Store Name"
                onChange={this.handleChange}
                value={storeName}
                type="text"
              />

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, "password")}
                type="password"
              />


<Form.Input
                fluid
                name="openHour"
                icon="clock outline"
                iconPosition="left"
                placeholder="Open Hour"
                onChange={this.handleChange}
                value={openHour}
                type="text"
              />

<Form.Input
                fluid
                name="closeHour"
                icon="clock outline"
                iconPosition="left"
                placeholder="Close Hour"
                onChange={this.handleChange}
                value={closeHour}
                type="text"
              />

<Form.Input
                fluid
                name="address1"
                icon="address book outline"
                iconPosition="left"
                placeholder="Address1"
                onChange={this.handleChange}
                value={address1}
                type="text"
              />

<Form.Input
                fluid
                name="address2"
                icon="address book outline"
                iconPosition="left"
                placeholder="Address2"
                onChange={this.handleChange}
                value={address2}
                type="text"
              />

<Form.Input
                fluid
                name="city"

                placeholder="City"
                onChange={this.handleChange}
                value={city}
                type="text"
              />

<Form.Input
                fluid
                name="state"
                placeholder="State"
                onChange={this.handleChange}
                value={state}
                type="text"
              />

<Form.Input
                fluid
                name="zipcode"
                placeholder="Zip Code"
                onChange={this.handleChange}
                value={zipcode}
                type="text"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
