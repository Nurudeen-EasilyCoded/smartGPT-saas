import React from 'react';
import { useUser } from '@clerk/nextjs';
import { Avatar, Box } from '@mui/material';

const UserAvatar = () => {
  const { user } = useUser();
  return (
    <Box>
      <Avatar
        sx={{ width: 24, height: 24 }}
        alt={`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
        src={user?.profileImageUrl}
      />
    </Box>
  );
};

export default UserAvatar;
