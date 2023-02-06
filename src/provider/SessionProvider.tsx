import axios from 'axios'
import { ReactNode, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constant/routes'
import { REST_API } from '../constants'
import { SessionContext } from '../context/SessionContext'
import { AuthEvent } from '../event/auth.event'
import { useDomainEvent } from '../hook/useDomainEvent.hook'
import { AuthFormLoginValue, IAuthEntity } from '../types/auth.type'

export interface FormLogin {
  user_email: string
  user_password: string
}

interface Props {
  children: ReactNode
}

export const SessionProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  const handleInitAuth = async () => {
    try {
      const tokenString = localStorage.getItem('bop.token')
      if (!tokenString) {
        setIsAuthenticated(false)
        return setIsLoading(false)
      }
      const userParse = JSON.parse(tokenString)
      setUser(userParse)
      setIsAuthenticated(true)
      setIsLoading(false)
    } catch (_error) {
      setIsLoading(false)
    }
  }

  const handleIsAuthenticated = (value: boolean) => {
    if (value) setIsAuthenticated(true)
    else setIsAuthenticated(false)
  }

  const handleSignIn = async (params: AuthFormLoginValue) => {
        let userData : IAuthEntity | any = null
        try {
            const response = await axios.post(`${REST_API}/auth/signin`, 
                { usuario: params.username, password: params.password }
            );

            if( response.status === 200 ) {
                userData = {
                    access_token: response.data.access_token,
                    usr: response.data.usr,
                    nombre: response.data.nombre,
                    legajo: response.data.legajo,
                    id: response.data.id,
                    account_type: response.data.account_type,
                    password: '',
                    message: response.data.message
                }
                localStorage.setItem('bop.token', JSON.stringify(response.data.access_token))
                // navigate(ROUTES.home, { replace: true })


            } else if ( response.status === 401 ) {

                userData = {
                    status: response.status,
                    message: response.data.message
                }
                console.log('Error');
            }
             return userData

        } catch (error) {
            console.log("auth error server : ", error);
            // return null
        }
  }

  const handleSignOut = async () => {
    localStorage.removeItem('bop.token')
    setIsAuthenticated(false)
    navigate(ROUTES.login)
  }

  useEffect(() => {
    handleInitAuth()
  }, [])

  useDomainEvent({
    handler: () =>
      AuthEvent.onAuthStateChange((event, session) => {
        if (event === 'TOKEN_REFRESHED' && session) {
          localStorage.setItem('bop.token', JSON.stringify(session))
        }

        if (event === 'SESSION_EXPIRED') {
          localStorage.removeItem('bop.token')
          location.reload()
        }
      }),
  })

  return (
    <SessionContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        handleSignOut,
        handleSignIn,
        handleIsAuthenticated,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
