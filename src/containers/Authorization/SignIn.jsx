import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import {
  Form,
  LoadingIndicator,
} from 'components';
import { auth } from 'myFirebase';
import { signInForm } from 'utils';
import { useForm } from 'antd/lib/form/Form';
import {
  Button,
  Col,
  message,
  Row,
  Space,
} from 'antd';
import errorMessages from 'errorMessages';
import links from 'links';
import { setActivePage } from 'redux/activePageSlice';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const [user, loading] = useAuthState(auth);

  const [signInWithEmailAndPassword,, isUserLoading, error] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, , isGoogleUserLoading, googleSignInError] = useSignInWithGoogle(auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      // console.log(error.code);
      message.error(errorMessages[error.code]);
    }
    if (googleSignInError) {
      // console.log(googleSignInError.code);
      message.error(errorMessages[googleSignInError.code]);
    }
  }, [error, googleSignInError]);

  const [form] = useForm();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (user) {
    dispatch(setActivePage(links.filmsPage))

    return <Navigate to={ links.filmsPage } />;
  }

  return (
    <Row
      justify="center"
      style={ { 
        height: '100vh',
        marginTop: '50px' 
      } }
    >
      <Col xs={ 24 } lg={ 6 }>
        <Form
          form={ form }
          buttonText="Sign in"
          isLoading={ isUserLoading }
          initialValues={ { remember: true } }
          onSubmit={ values => {
            signInWithEmailAndPassword(values.email, values.password);
          } }
          fields={ [
            signInForm.email,
            signInForm.password,
          ] }
          footer={
            <Space
              direction="vertical"
              style={ { width: '100%' } }
            >
              <Button
                block
                type="primary"
                loading={ isGoogleUserLoading }
                onClick={ () => signInWithGoogle() }
              >
                Sign in with Google
              </Button>
            </Space>
          }
        />
      </Col>
    </Row>
  );
};

export default SignIn;
