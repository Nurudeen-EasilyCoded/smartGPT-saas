import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from '@/components/ModalProvider';
import ToastProvider from '@/components/Toast-provider';
import CrispChatSupport from '@/components/Crisp-chat-support';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'smartGPT',
  description: 'All in-one AI Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <CrispChatSupport />
        <body className={inter.className} style={{ backgroundColor: '#242424'}}>
            <ToastProvider />
            <ModalProvider />
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
