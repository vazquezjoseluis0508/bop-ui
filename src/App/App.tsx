
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState, Dispatch } from '../store'

export const App: React.FC = () => {
  const { lista_usuarios } = useSelector((state: ApplicationState) => ({
    lista_usuarios: state.usuarios
  }))
  const { usuarios } = useDispatch<Dispatch>()
  useEffect(() => {
    usuarios.fetch()
  }, [])


  return (
    <div >
      email: {lista_usuarios.email}<br></br>
      clave: {lista_usuarios.clave}
    </div>
  )
}

export default App
