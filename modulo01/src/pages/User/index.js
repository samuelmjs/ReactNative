import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
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
} from './styles';

export default function User({ navigation }) {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const currentUser = navigation.getParam('user');

  async function fetchUser() {
    const user = navigation.getParam('user');

    setLoading(true);

    const response = await api.get(`/users/${user.login}/starred`);

    setStars(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function loadMore() {
    const user = navigation.getParam('user');

    setPage(page + 1);

    const response = await api.get(`/users/${user.login}/starred?page=${page}`);

    setStars([...stars, ...response.data]);
  }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: currentUser.avatar }} />
        <Name>{currentUser.name}</Name>
        <Bio>{currentUser.bio}</Bio>
      </Header>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          renderItem={({ item }) => (
            <Starred>
              <OwenerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      )}
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
