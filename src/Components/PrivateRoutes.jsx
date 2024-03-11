import { Navigate } from "react-router-dom"

const PrivateRoutes = ({isAuthenticated,route,element}) => {
  return (
    isAuthenticated ? element : <Navigate to={route}/>
  )
}

export default PrivateRoutes