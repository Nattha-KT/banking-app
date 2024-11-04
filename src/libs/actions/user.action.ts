'use server';
import { ID } from 'node-appwrite';
import { createAdminClient, createSessionClient } from '../server';
import { cookies } from 'next/headers';
import { parseStringify } from '../utils';

export async function signUp(userData: SignUpParams) {
  const { email, password, firstName, lastName } = userData;
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`,
    );
    const session = await account.createEmailPasswordSession(email, password);

    await cookies().then((cookies) => {
      cookies.set('appwrite-session', session.secret, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });
    });
    return parseStringify(newUserAccount);
  } catch (error) {
    console.error('Error', error);
  }
}

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    await cookies().then((cookies) => {
      cookies.set('appwrite-session', session.secret, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });
    });

    // const user = await getUserInfo({ userId: session.userId });

    return parseStringify(session);
  } catch (error) {
    console.error('Error', error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch {
    return null;
  }
}
