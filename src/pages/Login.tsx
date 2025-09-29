import { SignContainer, CardForSignContainer } from '../components/styled/Styled_AuthForms';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

import ThemeToggle from '../components/ThemeToggle';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/auth.context';
import api from '../services/config.services';


function Login() {
  const { authenticateUser} = useAuth();

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    const userCredentials = {
      email: formData.email,
      password: formData.password,
    };
    console.log('user credentials', userCredentials);
    try {
      const response = await api.post('/auth/login', userCredentials);
      console.log('login response', response);

      //* the user is now authenticated

      localStorage.setItem('authToken', response.data.authToken);

      await authenticateUser(); // this verifies that the token was correctly stored and is valid. Also it updates the context states.

      navigate('/admin/products');
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 400 ) {
        
      }else{
        navigate("/error")
      }
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <SignContainer direction="column" justifyContent="space-between">
      <ThemeToggle
        sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
      />
      <CardForSignContainer variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? 'error' : 'primary'}
              value={formData.email}
              onChange={handleOnChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              // autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
              value={formData.password}
              onChange={handleOnChange}
            />
          </FormControl>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign in
          </Button>
          {/* <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: 'center'}}
            disabled // not supported natively by Link component
          >
            Forgot your password?
          </Link> */}
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            disabled
            onClick={() => alert('Sign in with Google')}
            // startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Button
            disabled
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign in with Facebook')}
            // startIcon={<FacebookIcon />}
          >
            Sign in with Facebook
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => navigate('/sign-up')}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </CardForSignContainer>
    </SignContainer>
    
  )
}
export default Login