import { Box } from '@mui/material';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        position: 'absolute',
        width: '100%',
        height: '100vh',
      }}
    >
      {children}
    </Box>
  );
};
export default AuthLayout;
