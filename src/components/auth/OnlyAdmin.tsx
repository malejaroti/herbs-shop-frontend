// Wrapper component that will only allow pages to display if the user is logged in and is an Admin

import { Navigate } from 'react-router';
import { useContext, type ReactNode } from 'react';
import { AuthContext } from '../../context/auth.context';
import Spinner from '../Spinner';


type OnlyAdminProps = { children: ReactNode };

function OnlyAdmin({ children }: OnlyAdminProps) {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('This paged must be used within an AuthWrapper');
  }

  const { isLoggedIn, isAdmin, isAuthenticating } = authContext;

  const adminAuthenticationMessage = `Authenticating admin...`

  if(isAuthenticating){
      return (
        <Spinner message={adminAuthenticationMessage} loadingState={isAuthenticating}/>
      )
    }

    if (!isAdmin) {
      console.log("Error in trying to access an admin-only page. Redirecting to Login page" )
      // console.log("ERROR in OnlyAdmin component. isLoggedIn: ",isLoggedIn, ", isAdmin: ", isAdmin, ", isAuthenticating: ", isAuthenticating  )
      return <Navigate to="/login" />;
    }

    return children;

}
export default OnlyAdmin;
