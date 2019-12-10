import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, WebView, Loading } from './styles';

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
      {loading && <Loading />}
    </Container>
  );
}

StarredRepo.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('starred').name,
});

StarredRepo.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
