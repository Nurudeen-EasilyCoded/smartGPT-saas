import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { getApiLimitCount } from '@/lib/api-limit';
import DrawerPage from '@/components/Drawer';
import { checkSubscription } from '@/lib/subscription';

const drawerWidth = 250;

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DrawerPage apiLimitCount={apiLimitCount} isPro={isPro} />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box sx={{ maxWidth: '1300px', mx: 'auto', overflowY: 'auto', p: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
