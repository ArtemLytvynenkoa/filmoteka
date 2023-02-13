import {
  Avatar,
  Badge,
  Button,
  Image,
  message,
  Space,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { 
  auth,
  storage
} from 'myFirebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
} from 'firebase/storage';
import { CloseOutlined } from '@ant-design/icons';
import { LoadingIndicator } from 'components';
import { useAuthState } from 'react-firebase-hooks/auth';

const UserAvatarUpload = ({ onChange, value, userName }) => {
  const [imageRef, setImageRef] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [user] = useAuthState(auth);

  const [uploadFile, uploading,] = useUploadFile();

  if (isLoading && !value) {
    return <LoadingIndicator />;
  }

  if (value?.url) {
    return (
      <Badge
        count={
          <Button
            icon={ <CloseOutlined /> }
            danger
            size="small"
            onClick={ async () => {
              setIsloading(true);
              try {
                await deleteObject(imageRef || ref(storage, `images/users/${value.name}`));
                setImageRef(null);
                onChange(null);
              } catch (error) {
                message.error(error.message);
              }
              setIsloading(false);
            } }
          />
        }
        offset={ [-12, 0] }
      >
        <Image
          src={ value?.url }
          style={ {
            borderRadius: '50%',
            objectFit: 'cover',
          } }
          width={ 200 }
          height={ 200 }
        />
      </Badge>
    );
  }

  return (

    <Upload
      name="photoURL"
      accept="image/png, image/jpeg"
      showUploadList={ false }
      beforeUpload={ () => false }
      onChange={ async ({ file }) => {
        const imageRef = ref(storage, `images/users/${file.name}-${user.uid}`);
        setIsloading(true);
        try {
          await uploadFile(imageRef, file);
          const url = await getDownloadURL(imageRef);
          setImageRef(imageRef);
          onChange({
            url,
            name: `${file.name}-${user.uid}`,
          });
        } catch (error) {
          message.error(error.message);
        }
        setIsloading(false);
      } }
    >
      <Space direction="vertical">
        <Avatar
          key="avatar"
          shape="circle"
          size={ 200 }
          src={ value?.photoURL?.url }
        >
          { !value?.photoURL?.url ? userName : null }
        </Avatar>
        <Button
          type="primary"
          loading={ uploading }
        >
          Завантажити фото
        </Button>
      </Space>
    </Upload>
  );
};

export default UserAvatarUpload;
