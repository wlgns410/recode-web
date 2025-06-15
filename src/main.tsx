// index.tsx 또는 main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './index.css';
import App from './App.tsx';

// 1. ApolloClient 생성
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // 백엔드 GraphQL API 주소
  cache: new InMemoryCache(),
});

// 2. ApolloProvider로 앱 감싸기
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
