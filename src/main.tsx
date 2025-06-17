// index.tsx 또는 main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './index.css';
import App from './App.tsx';

// // 1. ApolloClient 생성
// const client = new ApolloClient({
//   uri: 'http://localhost:3000/graphql', // 백엔드 GraphQL API 주소
//   cache: new InMemoryCache(),
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// 1. HTTP 연결 설정
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

// 2. Authorization 헤더 삽입
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // 또는 'token', 프로젝트 기준에 따라
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// 3. ApolloClient 생성
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// 4. ApolloProvider로 앱 감싸기
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
