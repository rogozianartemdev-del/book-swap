import { User } from '@/domain/entities/User';
import { UserFormModal } from '@/presentation/components/UserFormModal';
import { Button, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import { useAdminUsers } from './useAdminUsers';

export const AdminUsers = () => {
  const {
    users, meta, isLoading, currentUserId, isModalOpen, editingUser, isSaving,
    onPageChange, onAdd, onEdit, onDelete, onSubmit, onCloseModal,
  } = useAdminUsers();

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Typography.Title level={2} className="!mb-0">Користувачі</Typography.Title>
        <Button type="primary" onClick={onAdd}>Додати користувача</Button>
      </div>

      <Table<User>
        rowKey="id"
        loading={isLoading}
        dataSource={users}
        scroll={{ x: 'max-content' }}
        pagination={{
          current: meta?.page,
          pageSize: meta?.limit,
          total: meta?.total,
          showSizeChanger: false,
          onChange: onPageChange,
        }}
        columns={[
          { title: 'Ім’я', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
          {
            title: 'Роль',
            dataIndex: 'role',
            render: (role: User['role']) => (
              <Tag color={role === 'admin' ? 'red' : 'blue'}>{role === 'admin' ? 'Адмін' : 'Користувач'}</Tag>
            ),
          },
          {
            title: 'Створено',
            dataIndex: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString('uk-UA'),
          },
          {
            title: 'Дії',
            render: (_, user) => (
              <Space>
                <Button onClick={() => onEdit(user)}>Редагувати</Button>
                <Popconfirm
                  title="Видалити користувача?"
                  okText="Так"
                  cancelText="Ні"
                  disabled={user.id === currentUserId}
                  onConfirm={() => onDelete(user.id)}
                >
                  <Button danger disabled={user.id === currentUserId}>Видалити</Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <UserFormModal
        open={isModalOpen}
        user={editingUser}
        loading={isSaving}
        onSubmit={onSubmit}
        onCancel={onCloseModal}
      />
    </>
  );
};