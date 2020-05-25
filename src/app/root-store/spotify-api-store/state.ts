export interface State {
    error?: any;
    isLoading?: boolean;
    accessToken?: string;
}

export const initialState: State = {
    error: null,
    isLoading: false,
    accessToken: null,
};