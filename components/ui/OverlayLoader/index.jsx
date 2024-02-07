import { LoadingOverlay } from '@mantine/core';

export const LoadingOverlayCustom = ({ children, loading }) => {
  return (
    <>
      <LoadingOverlay visible={loading} zIndex={1000} overlayprops={{ radius: 'sm', blur: 2 }} loaderProps={{ color: 'pink', type: 'bars' }} />
      {children}
    </>
  );
};
