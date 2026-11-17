import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Radio, Typography, Upload } from 'antd';
import { useBookCreate } from './useBookCreate';

export const BookCreate = () => {
  const { form, initialValues, photoSource, onFinish, isLoading, onCancel } = useBookCreate();

  return (
    <Card className="mx-auto max-w-xl">
      <Typography.Title level={3}>Нова книга</Typography.Title>
      <Form form={form} layout="vertical" initialValues={initialValues} onFinish={onFinish}>
        <Form.Item name="name" label="Назва" rules={[{ required: true, max: 255 }]}>
          <Input />
        </Form.Item>
        <Form.Item name="author" label="Автор" rules={[{ required: true, max: 255 }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Опис" rules={[{ max: 5000 }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="photoSource" label="Фото">
          <Radio.Group
            options={[
              { value: 'url', label: 'Посилання' },
              { value: 'file', label: 'Файл' },
            ]}
          />
        </Form.Item>

        {photoSource === 'url' ? (
          <Form.Item
            name="photoUrl"
            rules={[{ pattern: /^https?:\/\//, message: 'Посилання має починатися з http:// або https://' }]}
          >
            <Input placeholder="https://..." />
          </Form.Item>
        ) : (
          <Form.Item name="file" valuePropName="fileList" getValueFromEvent={(event) => event?.fileList}>
            <Upload beforeUpload={() => false} maxCount={1} accept="image/jpeg,image/png,image/webp" listType="picture">
              <Button icon={<UploadOutlined />}>Обрати файл (до 5 МБ)</Button>
            </Upload>
          </Form.Item>
        )}

        <div className="flex gap-2">
          <Button type="primary" htmlType="submit" loading={isLoading}>Додати</Button>
          <Button onClick={onCancel}>Скасувати</Button>
        </div>
      </Form>
    </Card>
  );
};