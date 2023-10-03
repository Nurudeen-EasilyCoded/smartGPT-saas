'use client';
import React, { useState } from 'react';
import axios from 'axios';
import * as z from 'zod';
import Heading from '@/components/Heading';
import ForumIcon from '@mui/icons-material/Forum';
import SendIcon from '@mui/icons-material/Send';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import UserAvatar from '@/components/UserAvatar';
import BotAvatar from '@/components/BotAvatar';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { formSchema } from '@/constants/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChatCompletionRequestMessage } from 'openai';
import {
  Box,
  Paper,
  InputBase,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useProModal } from '@/hooks/use-pro-modal';

const ConversationPage = () => {
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
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
          title='Conversation'
          description='Most Advance Chat Model'
          icon={ForumIcon}
          iconColor='#0000FF'
          bgColor='#A9D0F5'
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
                    placeholder='Ask Smart anything...'
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
        {messages.length === 0 && !isLoading && (
          <Box>
            {' '}
            <Empty label='No chats started' />{' '}
          </Box>
        )}
        {messages.map((message) => (
          <Paper
            variant='outlined'
            key={message.content}
            sx={{
              backgroundColor: message.role === 'user' ? 'white' : '#EFF5FB',
              display: 'flex',
              mb: 1,
              p: 1,
            }}
          >
            {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
            <Typography sx={{ fontSize: '15px', ml: 1 }}>
              {message.content}
            </Typography>
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default ConversationPage;
