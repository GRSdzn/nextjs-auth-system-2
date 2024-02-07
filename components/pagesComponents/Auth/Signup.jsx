'use client';
import React from 'react';
import { Flex, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUserStore } from '@/store/UserStore';
import { shallow } from 'zustand/shallow';
import { LoadingOverlayCustom } from '@/components/ui/OverlayLoader';
import { useRouter } from 'next/navigation';

export const SignupPageComponent = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: { email: '', first_name: '', last_name: '', phone_number: '', password: '', re_password: '' },
  });
  const { loading, register } = useUserStore(
    (state) => ({
      loading: state.loading,
      register: state.register,
      isAuth: state.isAuth,
    }),
    shallow
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form.values, router); // Pass the `router` object here
    } catch (error) {
      console.error('Error during register:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <LoadingOverlayCustom loading={loading} />
      <Flex direction={'column'} gap={'6px'}>
        <TextInput label="Фамилию" type="text" placeholder="Введите фамилию" withAsterisk {...form.getInputProps('last_name')} />
        <TextInput label="Имя" type="text" placeholder="Введите имя" withAsterisk {...form.getInputProps('first_name')} />
        <TextInput label="Почта" type="email" placeholder="Введите почту" withAsterisk {...form.getInputProps('email')} />
        <TextInput label="Номер телефона" type="number" placeholder="Введите номер телефона" withAsterisk {...form.getInputProps('phone_number')} />
        <PasswordInput placeholder="Введите пароль" label="Пароль" withAsterisk {...form.getInputProps('password')} />
        <PasswordInput placeholder="Подтвердите пароль" label="Повторите пароль" withAsterisk {...form.getInputProps('re_password')} />
      </Flex>
      <button className="bg-green-500 rounded-lg mt-2 w-full p-2 text-white hover:bg-green-400 duration-200" type="submit">
        Submit
      </button>
    </form>
  );
};
