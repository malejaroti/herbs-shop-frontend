// Wrapper component that will only allow pages to display if the user is logged in and is an Admin

import { Navigate } from 'react-router';
import { useContext, type ReactNode } from 'react';
import { AuthContext } from '../../context/auth.context';

type OnlyAdminProps = {
  children: ReactNode;
};

function OnlyAdmin({ children }: OnlyAdminProps) {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('This paged must be used within an AuthWrapper');
  }

  const { isLoggedIn, isAdmin } = authContext;

  if (isLoggedIn && isAdmin) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
export default OnlyAdmin;
