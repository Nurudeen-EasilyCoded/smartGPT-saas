'use client';
import React, { useState } from 'react';
import axios from 'axios';
import * as z from 'zod';
import Heading from '@/components/Heading';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SendIcon from '@mui/icons-material/Send';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { musicSchema } from '@/constants/musicSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Paper,
  InputBase,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useProModal } from '@/hooks/use-pro-modal';
import { toast } from 'react-toastify';

const MusicPage = () => {
  const proModal = useProModal();
  const [music, setMusic] = useState<string>();
  const router = useRouter();

  const form = useForm<z.infer<typeof musicSchema>>({
    resolver: zodResolver(musicSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof musicSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post('/api/music', values);
      setMusic(response.data.audio);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        toast.warn('Free Generations Exhausted. Please Upgrade');
        proModal.onOpen();
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Heading
          title='Music Generation'
          description='Most Advance Music Model'
          icon={LibraryMusicIcon}
          iconColor='#886A08'
          bgColor=''
        />
      </Box>
      <Form {...form}>
        <Paper
          component='form'
          onSubmit={form.handleSubmit(onSubmit)}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            mx: 'auto',
          }}
        >
          <FormField
            name='prompt'
            render={({ field }) => (
              <FormItem style={{ display: 'flex', width: '100%' }}>
                <FormControl>
                  <InputBase
                    autoFocus={true}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='Describe a music to generate...'
                    inputProps={{ 'aria-label': 'Ask Smart' }}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
          <IconButton
            color='primary'
            aria-label='ask smart'
            type='submit'
            disabled={isLoading}
            sx={{ p: '10px' }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Form>
      <Box sx={{ mt: 3 }}>
        {isLoading && (
          <Box>
            <Loader />
          </Box>
        )}
        {!music && !isLoading && (
          <Box>
            {' '}
            <Empty label='No music generated' />{' '}
          </Box>
        )}
        <Box>
          {music && (
            <Card sx={{ maxWidth: 600, mx: 'auto', mt: 5 }}>
              <CardMedia
                component='img'
                height='200'
                image='musicGif.gif'
                alt='music icon'
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                  gutterBottom
                  sx={{ fontSize: '13px', letterSpacing: 0.5, mb: 1, color: '#FFFFFF', backgroundColor: 'red'}}
                >
                  Music lyrics might be muted due to copyright issues
                </Typography>
                <audio controls>
                  <source src={music} />
                </audio>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MusicPage;
