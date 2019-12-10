import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwenerAvatar,
  Info,
  Title,
  Author,
  Loading,
} from './styles';

export default function User({ navigation }) {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const currentUser = navigation.getParam('user');

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    const user = navigation.getParam('user');

    setLoading(true);

    const response = await api.get(
      `/users/${user.login}/starred?page=${pageNumber}`
    );

    setLoading(false);
    setPage(pageNumber + 1);

    setStars(shouldRefresh ? response.data : [...stars, ...response.data]);
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  function handleNavigate(starred) {
    navigation.navigate('StarredRepo', { starred });
  }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: currentUser.avatar }} />
        <Name>{currentUser.name}</Name>
        <Bio>{currentUser.bio}</Bio>
      </Header>

      <Stars
        data={stars}
        keyExtractor={star => String(star.id)}
        onEndReachedThreshold={0.2}
        onEndReached={() => loadPage()}
        onRefresh={refreshList}
        refreshing={refreshing}
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <Starred onPress={() => handleNavigate(item)}>
            <OwenerAvatar source={{ uri: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
      />
    </Container>
  );
}

User.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('user').name,
});

User.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }).isRequired,
};
