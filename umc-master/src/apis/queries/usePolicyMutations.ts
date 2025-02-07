import { createPolicy, updatePolicy, deletePolicy } from '@apis/policyApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePolicy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPolicy,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['policies'] }),
  });
};

export const useUpdatePolicy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePolicy,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['policies'] }),
  });
};

export const useDeletePolicy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePolicy,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['policies'] }),
  });
};
