'use client';
import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
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
import Link from 'next/link';
import { Icons, routeLinks } from '@/constants/constant';

// export const Icons = {
//   BurstMode,
//   Code,
//   LibraryMusic,
//   Message,
//   SpaceDashboard,
//   SettingsApplications,
//   VideoLibrary,
// };

// interface RouteLink {
//   label: string;
//   icon: keyof typeof Icons;
//   href: string;
//   color: string;
// }

// export const routeLinks: RouteLink[] = [
//   {
//     label: 'Conversation',
//     icon: 'Message',
//     href: '/conversation',
//     color: '#0000FF',
//   },
//   {
//     label: 'Generate Code',
//     icon: 'Code',
//     href: '/code',
//     color: '#DF013A',
//   },
//   {
//     label: 'Generate Images',
//     icon: 'BurstMode',
//     href: '/image',
//     color: '#FE2EF7',
//   },
//   {
//     label: 'Generate Music',
//     icon: 'LibraryMusic',
//     href: '/music',
//     color: '#886A08',
//   },
//   {
//     label: 'Generate Videos',
//     icon: 'VideoLibrary',
//     href: '/video',
//     color: '#DF7401',
//   },
// ];

const Dashboard = () => {
  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant='h5' textAlign='center' color='#fafafa'>
          Experience the power of smartGPT
        </Typography>
        <Typography variant='body1' textAlign='center' color='#fafafa'>
          The all-in-one AI generation
        </Typography>
      </Box>
      <Box sx={{ width: '350px', mx: 'auto', }}>
        <Stack spacing={3}>
          {routeLinks.map(({ label, icon, href, color }, index) => {
            const Icon = Icons[icon];
            return (
              <Link
                href={href}
                key={index}
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <Card sx={{ width: '100%', minWidth: 250 }}>
                  <CardActionArea sx={{ display: 'flex', p: 1 }}>
                    <IconButton size='small' sx={{ mr: 2 }}>
                      <Icon fontSize='inherit' sx={{ color: { color } }} />
                    </IconButton>
                    <Typography color='primary' sx={{ flexGrow: 1 }}>
                      {label}
                    </Typography>
                    <ArrowRightAlt />
                  </CardActionArea>
                </Card>
              </Link>
            );
          })}
        </Stack>
      </Box>
    </>
  );
};
export default Dashboard;
