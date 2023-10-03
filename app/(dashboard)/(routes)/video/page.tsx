'use client';
import React, { useState } from 'react';
import axios from 'axios';
import * as z from 'zod';
import Heading from '@/components/Heading';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SendIcon from '@mui/icons-material/Send';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { videoSchema } from '@/constants/videoSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Paper, InputBase, Divider, IconButton } from '@mui/material';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useProModal } from '@/hooks/use-pro-modal';
import { toast } from 'react-toastify';

const VideoPage = () => {
  const proModal = useProModal();
  const [video, setVideo] = useState<string>();
  const router = useRouter();

  const form = useForm<z.infer<typeof videoSchema>>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof videoSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post('/api/video', values);
      setVideo(response.data[0]);

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
          title='Video Generation'
          description='Most Advance Video Model'
          icon={VideoLibraryIcon}
          iconColor='#DF7401'
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
                    placeholder='Describe a video to generate...'
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
        {!video && !isLoading && (
          <Box>
            {' '}
            <Empty label='No video generated' />{' '}
          </Box>
        )}
        <Box sx={{ mx: 'auto', mt: 5, maxWidth: '100%' }}>
          {video && (
            <video
              controls
              style={{ maxWidth: '100%', width: '100%', aspectRatio: '16/9' }}
            >
              <source src={video} />
            </video>
          )}
        </Box>
      </Box>
    </>
  );
};

export default VideoPage;
