import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Firebase from 'firebase';
import Loading from '../loading';

/*
  Component life-cycle:
  https://facebook.github.io/react/docs/component-specs.html
 */

export default class Dashboard extends Component {

  static get propProps() {
    return {
      user: {},
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentUser: [],
      data: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.fetchData();
  }

  fetchData() {
    Firebase.database().ref('Data').on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      this.setState({ data, loading: false });
    });
  }

  render() {
    const { data, loading } = this.state;
    const { user } = this.props;
    if (loading) {
      return (<View style={styles.loading}><Loading /></View>);
    }
    return (
      <View style={styles.container}>
        <Text>Bienvenido {user.displayName}</Text>
        <Text>Temperatura {data.Test1.temperatura}</Text>
        <Text>Humedad {data.Test1.humedad}</Text>
        <Text>Luminosidad {data.Test1.luminosidad}</Text>
      </View>
    );
  }
}

/*
  See: https://facebook.github.io/react/docs/reusable-components.html#prop-validation
 */
// TemplateComponent.propTypes = {
//   message: React.PropTypes.string,
// };

/*
  See: https://facebook.github.io/react-native/docs/flexbox.html
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column', // row, column
    // flexWrap: 'nowrap' // wrap, nowrap
    alignItems: 'center', // flex-start, flex-end, center, stretch
    // alignSelf: 'auto', // auto, flex-start, flex-end, center, stretch
    justifyContent: 'center', // flex-start, flex-end, center, space-between, space-around
    // position: 'relative', // absolute, relative
    // backgroundColor: 'white',
    // margin: 0,
    // padding: 0,
    // right: 0,
    // top: 0,
    // left: 0,
    // bottom: 0,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
