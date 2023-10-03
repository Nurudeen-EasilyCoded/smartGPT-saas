import React, { JSXElementConstructor } from 'react';
import {
  BurstMode,
  Code,
  LibraryMusic,
  Message,
  SpaceDashboard,
  SettingsApplications,
  VideoLibrary,
} from '@mui/icons-material';

export const Icons = {
  BurstMode,
  Code,
  LibraryMusic,
  Message,
  SpaceDashboard,
  SettingsApplications,
  VideoLibrary,
};

interface RouteLink {
  label: string;
  icon: keyof typeof Icons;
  href: string;
  color: string;
}

export const routeLinks: RouteLink[] = [
  {
    label: 'Dashboard',
    icon: 'SpaceDashboard',
    href: '/dashboard',
    color: '#31B404',
  },
  {
    label: 'Chat',
    icon: 'Message',
    href: '/conversation',
    color: '#0040FF',
  },
  {
    label: 'Generate Code',
    icon: 'Code',
    href: '/code',
    color: '#DF013A',
  },
  {
    label: 'Generate Images',
    icon: 'BurstMode',
    href: '/image',
    color: '#FE2EF7',
  },
  {
    label: 'Generate Music',
    icon: 'LibraryMusic',
    href: '/music',
    color: '#886A08',
  },
  {
    label: 'Generate Videos',
    icon: 'VideoLibrary',
    href: '/video',
    color: '#DF7401',
  },
  {
    label: 'Settings',
    icon: 'SettingsApplications',
    href: '/settings',
    color: '#0489B1',
  },
];
