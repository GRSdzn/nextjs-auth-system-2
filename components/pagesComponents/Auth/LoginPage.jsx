'use client';
import React, { useEffect } from 'react';
import { Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUserStore } from '@/store/UserStore';
import { shallow } from 'zustand/shallow';
import { LoadingOverlayCustom } from '@/components/ui/OverlayLoader';
import { useRouter } from 'next/navigation';

export const LoginPageComponent = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: { email: '', password: '' },
  });
  const { loading, login } = useUserStore(
    (state) => ({
      loading: state.loading,
      login: state.login,
      isAuth: state.isAuth,
    }),
    shallow
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.values, router); // Pass the `router` object here
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoadingOverlayCustom loading={loading} />
      <Flex direction={'column'} gap={'6px'}>
        <TextInput label="Логин" placeholder="Введите логин" withAsterisk {...form.getInputProps('email')} />
        <PasswordInput placeholder="Введите пароль" label="Пароль" withAsterisk {...form.getInputProps('password')} />
      </Flex>
      <button className="bg-green-500 rounded-lg mt-2 w-full p-2 text-white hover:bg-green-400 duration-200" type="submit">
        Submit
      </button>
    </form>
  );
};
