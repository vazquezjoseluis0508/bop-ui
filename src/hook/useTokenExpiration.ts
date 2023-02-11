import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useCheckTokenExpiration() {
  const history = useNavigate();

  const checkTokenExpiration = useCallback(() => {
    const tokenExpiration = parseInt(localStorage.getItem('tokenExpiration') || '0' );

    if (tokenExpiration && new Date().getTime() > tokenExpiration) {
      localStorage.removeItem('tokenExpiration');
      history('/login', { replace: true });
    }
  }, [history]);

  useEffect(() => {
    checkTokenExpiration();
  });

  return checkTokenExpiration;
}
