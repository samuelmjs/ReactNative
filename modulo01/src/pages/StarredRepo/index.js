import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator } from 'react-native';

import { Container, WebView } from './styles';

export default function StarredRepo({ navigation }) {
  const [loading, setLoading] = useState(true);

  function showLoading() {
    setLoading(false);
  }

  return (
    <Container>
      <WebView
        source={{ uri: navigation.getParam('starred').html_url }}
        onLoad={() => showLoading()}
      />
      {loading && (
        <ActivityIndicator
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}
          size="large"
        />
      )}
    </Container>
  );
}

StarredRepo.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('starred').name,
});

StarredRepo.prototypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
