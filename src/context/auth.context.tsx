import api from '../services/config.services';
import { createContext, useContext, useEffect, useState } from 'react';
import { type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { MoonLoader } from "react-spinners";


interface AuthContextType {
  isLoggedIn: boolean;
  loggedUserId: string | null;
  isAdmin: boolean;
  authenticateUser: () => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
// context component (component that sends the state contexts and functions)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "authToken";

// wrapper component (component that holds the states and functions to be shared)
function AuthProvider({children}: AuthProviderProps) {
  // context states and functions
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedUserId, setLoggedUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const navigate = useNavigate()

  useEffect(() => {
    // at the start of the app, validate if there is an auth token in local storage
    const storageToken = localStorage.getItem(TOKEN_KEY)
    console.log("storageToken: ", storageToken)
    if (storageToken) {
      authenticateUser();
    } else {
      setIsAuthenticating(false)
    }
  }, []);

  const authenticateUser = async (): Promise<void> => {
    // this is the function that sends the token to the backend to verify its validity and receives info about the owner of that token
    setIsAuthenticating(true)
    try {
      const response = await api.get('/auth/verify');

      // if we get to this point it means that the backend validated the token
      console.log(response);
      setIsLoggedIn(true);
      setLoggedUserId(response.data.user_id);
      setIsAdmin(response.data.role === "ADMIN")
      setIsAuthenticating(false);
    } catch (error) {
      // if we go into the catch it means that the backend rejected the token
      console.log(error);
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsAdmin(false)
      setIsAuthenticating(false);
    }
  };

  const logout = () => {
    //remove the token
    localStorage.removeItem(TOKEN_KEY);

    // update the context states
    setIsLoggedIn(false);
    setLoggedUserId(null);
    setIsAdmin(false)
    setIsAuthenticating(false);

    // redirect to a public page
    navigate('/');
  }

  const passedContext: AuthContextType = {
    isLoggedIn,
    loggedUserId,
    isAdmin,
    authenticateUser,
    logout
  };

  if (isAuthenticating) {
    const containerStyle: React.CSSProperties = {
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    };

    const contentStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      textAlign: 'center',
      maxWidth: '44rem',
      margin: '0 auto',
    };

    const messageStyle: React.CSSProperties = {
      lineHeight: 1.5,
      fontSize: '1.5rem',
      opacity: 0.9,
    };

    return (
      <main style={containerStyle}>
        <section style={contentStyle}>
          <MoonLoader
            color={'#79a4aa'}
            loading={isAuthenticating}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p style={messageStyle} aria-live="polite">
            Authenticating user… This project uses a free server on Render, so it may take a few seconds to start up (especially on the first load). Thanks for your patience.
          </p>
        </section>
      </main>
    )
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContext, AuthProvider, useAuth };
