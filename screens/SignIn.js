import React, { Component } from 'react';
import ReactNative, {
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import t from 'tcomb-form-native';
import User, { formOptions } from '../models/User';
import loadUser from '../actions/users/load';
import signIn from '../actions/users/sign-in';
import styles from './SignIn.styles';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { user: props.user };
  }

  componentWillMount() {
    this.props.loadUser();
  }

  componentDidMount() {
    // focus on the "email" field
    this.refs.form.getComponent('email').refs.input.focus();
  }

  onChange(user) {
    this.setState({ user });
  }

  onSubmit() {
    const { form } = this.refs;
    const user = form.getValue();
    if (!user) return;
    console.log(user);
    this.props.signIn(user);
  }

  render() {
    const Form = t.form.Form;
    const { user, loading } = this.props;

    return (
      <View style={styles.outerContainer}>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.container}>
          <Text style={styles.title}>Sign into ShatApp</Text>
          { user && user.error ? <Text style={styles.error}>{user.error.name} { user.error.message }</Text> : null }

          <Form
            ref="form"
            type={User}
            options={formOptions}
            value={this.state.user}
            onChange={this.onChange} />

            <TouchableHighlight
              style={styles.button}
              onPress={this.onSubmit}
              underlayColor='#99d9f4'
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttonSecondary}
              onPress={Actions.signUp}
              underlayColor='#99d9f4'
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = ({ user, loading }) => ({ user, loading });

export default connect(mapStateToProps, { loadUser, signIn })(SignIn);