import { Button, Stack } from "@mantine/core";
import { useUserStore } from "@/store/UserStore";
import { shallow } from "zustand/shallow";

export const FormSubmit = ({ isLoading = false }) => {
    const { user } = useUserStore(
        (state) => ({
            user: state.user
        }),
        shallow
    );
    return (
        <Stack spacing={'10px'} mt={21}>
            <Button fullWidth type={'submit'} loading={isLoading}>
                Войти
            </Button>
        </Stack >
    )
}
