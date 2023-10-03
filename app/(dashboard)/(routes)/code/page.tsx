'use client';
import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import Heading from '@/components/Heading';
import CodeIcon from '@mui/icons-material/Code';
import SendIcon from '@mui/icons-material/Send';
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import UserAvatar from '@/components/UserAvatar';
import BotAvatar from '@/components/BotAvatar';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { formSchema } from '@/constants/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChatCompletionRequestMessage } from 'openai';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Box, Paper, InputBase, Divider, IconButton } from '@mui/material';
import { useProModal } from '@/hooks/use-pro-modal';
import { toast } from 'react-toastify';

const CodePage = () => {
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
      const response = await axios.post('/api/code', {
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
          title='Code Generation'
          description='Most Advance Code Generating Model'
          icon={CodeIcon}
          iconColor='#DF013A'
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
                    placeholder='Generate code in any language...'
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
            <Empty label='No code generated' />{' '}
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
            <ReactMarkdown
              components={{
                pre: ({ node, ...props }) => (
                  <Box
                    sx={{
                      display: 'block',
                      padding: '1em',
                      backgroundColor: '#D8D8D8',
                      overflow: 'auto',
                      width: '100%',
                      marginTop: '1em',
                    }}
                  >
                    <pre {...props} />
                  </Box>
                ),
                code: ({ node, ...props }) => (
                  <code
                    style={{ backgroundColor: '#D8D8D8', padding: '0.2em 0.4em', fontSize: '0.9em',}}
                    {...props}
                  />
                ),
              }}
              className='react-markdown'
            >
              {message.content || ''}
            </ReactMarkdown>
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default CodePage;
