import { resolveFileUrl } from '@/presentation/utils/fileUrl';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Form, Input, List, Spin, Typography, Upload } from 'antd';
import { useProfile } from './useProfile';

export const Profile = () => {
  const { form, profile, isProfileLoading, requests, isRequestsLoading, onFinish, isSaving } = useProfile();

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-5">
        <Card title="Профіль">
          <Spin spinning={isProfileLoading}>
            <div className="mb-4 flex items-center gap-4">
              <Avatar size={72} src={resolveFileUrl(profile?.avatarUrl)} icon={<UserOutlined />} />
              <div>
                <Typography.Text strong>{profile?.name}</Typography.Text>
                <div>Книг: {profile?.booksCount ?? 0}</div>
              </div>
            </div>

            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item name="name" label="Ім’я" rules={[{ required: true, min: 2, max: 100 }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="avatar" label="Аватар" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
                <Upload beforeUpload={() => false} maxCount={1} accept="image/jpeg,image/png,image/webp" listType="picture">
                  <Button icon={<UploadOutlined />}>Обрати файл</Button>
                </Upload>
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={isSaving}>Зберегти</Button>
            </Form>
          </Spin>
        </Card>
      </div>

      <div className="col-12 col-lg-7">
        <Card title="Запити на обмін">
          <List
            loading={isRequestsLoading}
            locale={{ emptyText: 'Запитів поки немає' }}
            dataSource={requests}
            renderItem={(request) => (
              <List.Item>
                <List.Item.Meta
                  title={`«${request.book?.name}» — ${request.book?.author}`}
                  description={`${request.requester?.name} (${request.requester?.email}) · ${new Date(request.createdAt).toLocaleString('uk-UA')}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};