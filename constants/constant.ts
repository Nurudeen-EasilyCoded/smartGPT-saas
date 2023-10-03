import {
  ArrowRightAlt,
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
    label: 'Conversation',
    icon: 'Message',
    href: '/conversation',
    color: '#0000FF',
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
];