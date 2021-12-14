import React, {useEffect, useState} from 'react';
import {InitialScene} from './scenes';
import {GetData} from './helpers/store-data';
export default function App() {
  const [tokenState, setTokenState] = useState();
  useEffect(() => {
    GetData('token').then(data => setTokenState(data));
  }, []);
  return tokenState !== undefined ? (
    <InitialScene tokenStatus={tokenState} />
  ) : null;
}
