import { container } from '@/application/di/container';
import { getErrorMessage } from '@/data/http/getErrorMessage';
import { ROUTES } from '@/presentation/routes/routes.const';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, message } from 'antd';
import type { UploadFile } from 'antd';
import { useNavigate } from 'react-router-dom';

export type PhotoSource = 'url' | 'file';

export interface BookFormValues {
  name: string;
  author: string;
  description?: string;
  photoSource: PhotoSource;
  photoUrl?: string;
  file?: UploadFile[];
}

export const useBookCreate = () => {
  const [form] = Form.useForm<BookFormValues>();
  const photoSource = Form.useWatch('photoSource', form);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: container.booksRepository.createMine,
    onSuccess: () => {
      message.success('Книгу додано');
      queryClient.invalidateQueries({ queryKey: ['my-books'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
      navigate(ROUTES.myBooks);
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  const onFinish = ({ name, author, description, photoSource: source, photoUrl, file }: BookFormValues) =>
    mutation.mutate({
      name,
      author,
      description,
      photoUrl: source === 'url' ? photoUrl : undefined,
      file: source === 'file' ? file?.[0]?.originFileObj : undefined,
    });

  return {
    form,
    initialValues: { photoSource: 'url' as PhotoSource },
    photoSource,
    onFinish,
    isLoading: mutation.isPending,
    onCancel: () => navigate(ROUTES.myBooks),
  };
};