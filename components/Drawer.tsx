'use client';
import React, { useState, useEffect } from 'react';
import { Box, Drawer } from '@mui/material';
import SidebarNav from '@/components/sidebarNav';
import Navbar from '@/components/Navbar';
import FreeCount from './FreeCount-upgrade';

const drawerWidth = 250;

interface Props {
  window?: () => Window;
}

const DrawerPage = (
  { apiLimitCount = 0, isPro = false }: any,
  props: Props
) => {
  const [isMounted, setIsMounted] = useState(false);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box className='sidebarGradient' sx={{ height: '100%' }}>
      <SidebarNav handleDrawerToggle={handleDrawerToggle} />
      <FreeCount apiLimitCount={apiLimitCount} isPro={isPro} />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default DrawerPage;
