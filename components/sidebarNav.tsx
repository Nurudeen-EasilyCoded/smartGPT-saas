import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Close } from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { routeLinks, Icons } from '@/constants/sidebarLinks';
import { usePathname } from 'next/navigation';

const SidebarNav = ({ handleDrawerToggle }: any) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null;
  }
  
  return (
    <Box sx={{}}>
      <IconButton
        aria-label='open drawer'
        edge='end'
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' }, color: '#f2f2f2' }}
      >
        <Close sx={{}} />
      </IconButton>
      <Toolbar />
      <List
        component='nav'
        aria-label='main mailbox folders'
        sx={{ mb: '200px' }}
      >
        {routeLinks.map(({ label, icon, href, color }, index) => {
          const Icon = Icons[icon];
          return (
            <Link
              key={index}
              href={href}
              style={{ textDecoration: 'none', color: '#000' }}
            >
              <ListItemButton
                selected={pathname === href}
                onClick={(event) => handleDrawerToggle()}
              >
                <ListItemIcon>
                  <Icon sx={{ color: { color }, backgroundColor: '#F2F2F2' }} />
                </ListItemIcon>
                <ListItemText primary={label} sx={{ color: '#fafafa' }} />
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </Box>
  );
};

export default SidebarNav;
