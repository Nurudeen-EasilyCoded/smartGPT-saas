'use client';
import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import Heading from '@/components/Heading';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  amountOptions,
  imageSchema,
  resolutionOptions,
} from '@/constants/imageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem } from '@/components/ui/form';
import {
  Box,
  Card,
  CardMedia,
  Paper,
  InputBase,
  Divider,
  Grid,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  CardActions,
  Button,
} from '@mui/material';
import { useProModal } from '@/hooks/use-pro-modal';
import { toast } from 'react-toastify';

const ImageGenerationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof imageSchema>>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof imageSchema>) => {
    try {
      setImages([]);
      console.log(values);
      const response = await axios.post('/api/image', values);

      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        toast.warn('Free Generations Exhausted. Please Upgrade');
        proModal.onOpen();
      } else {
        toast.error('Something went wrong');
      }

      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Heading
          title='Image Generation'
          description='Most Advance Image Generating Model'
          icon={BurstModeIcon}
          iconColor='#FE2EF7'
          bgColor=''
        />
      </Box>
      <Form {...form}>
        <Box component='form' onSubmit={form.handleSubmit(onSubmit)}>
          <Paper
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
                <FormItem style={{ display: 'flex', flex: 1 }}>
                  <FormControl style={{ display: 'flex', flex: 1 }}>
                    <InputBase
                      fullWidth
                      autoFocus={true}
                      sx={{ ml: 1, flex: 1 }}
                      placeholder='Describe an image to generate'
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem style={{ }}>
                  <FormControl
                    variant='standard'
                    sx={{ m: 1, px: 0.5, minWidth: 120, backgroundColor: '#f2f2f2' }}
                    size='small'
                  >
                    <Select
                      disabled={isLoading}
                      value={field.value}
                      onChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {amountOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='resolution'
              render={({ field }) => (
                <FormItem>
                  <FormControl
                    variant='standard'
                    sx={{ m: 1, px: 0.5, minWidth: 120, backgroundColor: '#f2f2f2' }}
                    size='small'
                  >
                    <Select
                      disabled={isLoading}
                      value={field.value}
                      onChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {resolutionOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </Box>
        </Box>
      </Form>

      <Box sx={{ mt: 3 }}>
        {isLoading && (
          <Box>
            <Loader />
          </Box>
        )}
        {images.length === 0 && !isLoading && (
          <Box>
            <Empty label='No images generated' />
          </Box>
        )}
        <Box>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {images.map((src, index) => (
              <Grid key={index} item md={3} sm={4} xs={12}>
                <Card sx={{ maxWidth: 345, m: 1 }}>
                  <CardMedia
                    image={src}
                    title='image'
                    sx={{ height: 150, objectFit: 'cover' }}
                  />
                  <CardActions>
                    <Button
                      size='small'
                      startIcon={<DownloadIcon />}
                      onClick={() => window.open(src)}
                    >
                      Download
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};
export default ImageGenerationPage;
