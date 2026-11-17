import { User, UserRole } from '@/domain/entities/User';
import { Form, Input, Modal, Select } from 'antd';

export interface UserFormValues {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
}

interface UserFormModalProps {
    open: boolean;
    user: User | null;
    loading: boolean;
    onSubmit: (values: UserFormValues) => void;
    onCancel: () => void;
}

export const UserFormModal = ({ open, user, loading, onSubmit, onCancel }: UserFormModalProps) => {
    const [form] = Form.useForm<UserFormValues>();
    const isEdit = Boolean(user);

    return (
        <Modal
            open={open}
            title={isEdit ? 'Редагувати користувача' : 'Додати користувача'}
            okText="Зберегти"
            cancelText="Скасувати"
            confirmLoading={loading}
            onOk={() => form.submit()}
            onCancel={onCancel}
            afterClose={() => form.resetFields()}
        >
            <Form
                key={user?.id ?? 'new'}
                form={form}
                layout="vertical"
                initialValues={user ?? { role: 'user' }}
                onFinish={onSubmit}
            >
                <Form.Item name="name" label="Ім’я" rules={[{ required: true, min: 2, max: 100 }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label={isEdit ? 'Новий пароль (необов’язково)' : 'Пароль'}
                    rules={[{ required: !isEdit, min: 8, max: 72 }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="role" label="Роль">
                    <Select
                        options={[
                            { value: 'user', label: 'Користувач' },
                            { value: 'admin', label: 'Адмін' },
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};