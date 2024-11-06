'use server';
import { ID } from 'node-appwrite';
import { cookies } from 'next/headers';
import { extractCustomerIdFromUrl, parseStringify } from '@/libs/utils';
import { createDwollaCustomer } from '../dwolla.action';
import { createAdminClient, createSessionClient } from '@/libs/server';

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export async function signUp({ password, ...userData }: SignUpParams) {
  const { email, firstName, lastName } = userData;
  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`,
    );

    if (!newUserAccount) throw new Error('Error creating user');

    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: 'personal',
    });

    if (!dwollaCustomerUrl) throw new Error('Error creating Dwolla customer');

    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl,
      },
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
    return parseStringify(newUser);
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

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    await cookies().then((cookies) => {
      cookies.delete('appwrite-session');
    });

    await account.deleteSession('current');
  } catch {
    return null;
  }
};
