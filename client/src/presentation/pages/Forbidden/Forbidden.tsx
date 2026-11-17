import { Button, Result } from 'antd';
import { useForbidden } from './useForbidden';

export const Forbidden = () => {
  const { goHome } = useForbidden();

  return (
    <Result
      status="403"
      title="403"
      subTitle="У вас немає доступу до цієї сторінки"
      extra={<Button type="primary" onClick={goHome}>До книг</Button>}
    />
  );
};