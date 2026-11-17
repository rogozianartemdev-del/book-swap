import { Button, Result } from 'antd';
import { useNotFound } from './useNotFound';

export const NotFound = () => {
  const { goHome } = useNotFound();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Сторінку не знайдено"
      extra={<Button type="primary" onClick={goHome}>До книг</Button>}
    />
  );
};