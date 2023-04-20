import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Form,
  LoadingIndicator,
} from 'components';
import { signInForm } from 'utils';
import { useForm } from 'antd/lib/form/Form';
import links from 'links';
import {
  Button,
  Col,
  message,
  Row,
  Space,
} from 'antd';
import {
  auth,
  setUser,
  usersRef,
} from 'myFirebase';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import errorMessages from 'errorMessages';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const SignUp = () => {
  const [user, loading] = useAuthState(auth);

  const [createUserWithEmailAndPassword,, isUserLoading, error] = useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle,, isGoogleUserLoading, googleSignInError] = useSignInWithGoogle(auth);

  const [values, isCollectionloading] = useCollectionData(
    usersRef,
  );

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

  if (loading || isCollectionloading) {
    return <LoadingIndicator />;
  }

  if (user) {
    const isExistingUser = values?.find(({ uid }) => uid === user.uid);

    if (!isExistingUser) {
      setUser({
        uid: user.uid,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }

    return <Navigate to={ links.mainPage } replace />;
  }

  return (
    <Row
      justify="center"
      style={ { 
        height: '100vh',
        marginTop: '50px' 
      } }
    >
      <Col span={ 24 }
        style={{ 
          textAlign: 'center',
          paddingRight: '20px',
          paddingLeft: '20px',
        }}
      >
        <Form
          form={ form }
          style={{ 
            margin: '0 auto',
            maxWidth: '300px'
          }}
          isLoading={ isUserLoading }
          buttonText="Sign up"
          initialValues={ { remember: true } }
          onSubmit={ values => createUserWithEmailAndPassword(values.email, values.password) }
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

export default SignUp;
