import { appWithTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../util/i18n';
import './globals.css';

import { AdminLayoutProvider } from '@/layouts/context/adminLayoutContext';
import { LayoutProvider } from '@/layouts/context/layoutContext';
import { LocationProvider } from '@/layouts/context/locationContext';
import { NavigationProvider } from '@/layouts/context/navigation';
import { ResponsableLayoutProvider } from '@/layouts/context/responsableLayoutContext';

import ChatBot from '@/components/ChatBot';
import AdminLayout from '@/layouts/admin/AdminLayout';
import Layout from '@/layouts/layout';
import ResponsableLayout from '@/layouts/responsable/ResponsableLayout';

const Loader = dynamic(() => import('@/layouts/Loader'), { ssr: false });

interface LayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: LayoutProps) {
  const [loading, setLoading] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);

    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', (event) => event.preventDefault());
      document.addEventListener('keydown', (event) => {
        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'C')) {
          event.preventDefault();
        }
      });
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleEnd);
    router.events.on('routeChangeError', handleEnd);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleEnd);
      router.events.off('routeChangeError', handleEnd);
    };
  }, [router]);

  let WrappedComponent = ({ children }: LayoutProps) => <>{children}</>;

  if (router.asPath.includes('/admin')) {
    WrappedComponent = AdminLayout;
  } else if (router.asPath.includes('/responsable')) {
    WrappedComponent = ResponsableLayout;
  } else {
    WrappedComponent = Layout;
  }

  return (
    <html lang="en">
      <body>
        <NavigationProvider>
          <AdminLayoutProvider>
            <ResponsableLayoutProvider>
              <LocationProvider>
                <LayoutProvider>
                  {loading && <Loader />}
                  <button
                    onClick={() => setChatVisible(true)}
                    className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </button>
                  <ChatBot visible={chatVisible} onHide={() => setChatVisible(false)} />
                  <WrappedComponent>{children}</WrappedComponent>
                </LayoutProvider>
              </LocationProvider>
            </ResponsableLayoutProvider>
          </AdminLayoutProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}

export default appWithTranslation(RootLayout);

