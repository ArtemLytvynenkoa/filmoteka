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

    return <Navigate to={ links.filmsPage } replace />;
  }

  return (
    <Row
      justify="center"
      style={ { height: '100%' } }
      align="middle"
    >
      <Col
        xs={ 24 }
        lg={ 6 }
      >
        <Form
          form={ form }
          isLoading={ isUserLoading }
          buttonText="Зареєструватися"
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
                Увійти за допомогою Google
              </Button>
            </Space>
          }
        />
      </Col>
    </Row>
  );
};

export default SignUp;
