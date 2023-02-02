
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Body } from '../components/Body'
import { ApplicationState, Dispatch } from '../store'

export const App: React.FC = () => {
  const { lista_usuarios } = useSelector((state: ApplicationState) => ({
    lista_usuarios: state.usuarios
  }))
  const { usuarios } = useDispatch<Dispatch>()
  useEffect(() => {
    usuarios.fetch()
  }, [])

  const isLoggin = true

  console.log({lista_usuarios})

  const rer = isLoggin ? <Body /> : <> User or password invalid!</>

  return rer
}

export default App;
