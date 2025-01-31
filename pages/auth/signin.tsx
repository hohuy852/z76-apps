import * as React from 'react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { SignInPage } from '@toolpad/core/SignInPage';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { auth, providerMap } from '../../auth';

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  return (
    <SignInPage
      providers={providers}
      signIn={async (provider, formData, callbackUrl) => {
        try {
          const signInResponse = await signIn(provider.id, {
            redirect: false, // Prevent default redirect, handle manually
            ...(formData
              ? { email: formData.get('email'), password: formData.get('password') }
              : {}),
          });

          if (signInResponse?.error) {
            return {
              error: 'An authentication error occurred',
              type: signInResponse.error,
            };
          }

          // Redirect on successful login
          await router.push(callbackUrl ?? '/');
          return {};
        } catch (error) {
          console.error('Sign-in error:', error);
          return {
            error: 'Something went wrong.',
            type: 'UnknownError',
          };
        }
      }}
      slotProps={{
        emailField: { autoFocus: false, type: 'text' }, // Change email input to text
      }}
    />
  );
}

SignIn.getLayout = (page: React.ReactNode) => page;
SignIn.requireAuth = false;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await auth(context);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  return {
    props: {
      providers: providerMap,
    },
  };
}
