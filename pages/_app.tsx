import * as React from 'react';
import { AppProvider } from '@toolpad/core/nextjs';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { Navigation } from '@toolpad/core/AppProvider';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import LinearProgress from '@mui/material/LinearProgress';
import theme from '../theme';
import CustomPageContainer from '@/components/CustomContainer';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TuneIcon from '@mui/icons-material/Tune';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'Tổng quan',
    icon: <DashboardIcon />,
  },
  {
    segment: 'compare',
    title: 'Đối chiếu thẻ kho',
    icon: <CompareArrowsIcon />,
  },
  {
    segment: 'filter',
    title: 'Bảng kê hoàn thuế',
    icon: <TuneIcon />,
  },
  {
    segment: 'export-declaration',
    title: 'Tờ khai hải quan',
    icon: <AssignmentIcon />
  },
  {
    segment: 'users',
    title: 'Người dùng',
    icon: <GroupIcon />,
  },
  {
    segment: 'permission',
    title: 'Quản lý truy cập',
    icon: <RecentActorsIcon />,
  },
];

const BRANDING = {
  title: 'Công ty TNHH Một thành viên 76',
};

const AUTHENTICATION = {
  signIn,
  signOut,
};


interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  
  if (status === 'loading') {
    return <LinearProgress />;
  }

  return children;
}

function getDefaultLayout(page: React.ReactElement) {
  return (
    <DashboardLayout>
      <CustomPageContainer>
        {page}
      </CustomPageContainer>
    </DashboardLayout>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {

  const { data: session } = useSession();
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppProvider
        navigation={NAVIGATION}
        branding={BRANDING}
        session={session}
        authentication={AUTHENTICATION}
        theme={theme}
      >
        {children}
      </AppProvider>
    </React.Fragment>
  );
}

export default function App(props: AppPropsWithLayout) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  const getLayout = Component.getLayout ?? getDefaultLayout;
  const requireAuth = Component.requireAuth ?? true;

  let pageContent = getLayout(<Component {...pageProps} />);
  if (requireAuth) {
    pageContent = <RequireAuth>{pageContent}</RequireAuth>;
  }
  pageContent = <AppLayout>{pageContent}</AppLayout>;

  return (
    <AppCacheProvider {...props}>
      <SessionProvider session={session}>
        {pageContent}
      </SessionProvider>
    </AppCacheProvider>
  );
}
