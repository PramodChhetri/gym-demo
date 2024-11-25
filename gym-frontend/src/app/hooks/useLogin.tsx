import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';
import { Auth } from '../libs/auth';

// Define input and response types
interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
}

// Define the login API call
const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axios.post('http://127.0.0.1:8000/api/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

// Use TanStack Query for login mutation
export const useLogin = (): UseMutationResult<LoginResponse, Error, LoginData> => {
  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      Auth.setToken(data.token);
      Auth.setRole(data.role);
    },
  });
};
