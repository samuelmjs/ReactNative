import styled from 'styled-components/native';
import { WebView as Web } from 'react-native-webview';

export const Container = styled.View`
  flex: 1;
`;

export const WebView = styled(Web)`
  flex: 1;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'large',
})`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
