import { EditableCellProps } from '@/pages/MainPlatform/Company/List/typings';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { FormInstance } from '@ant-design/pro-components';
import { Button, Form, Input, InputRef } from 'antd';
import React, { useContext, useRef, useState } from 'react';

interface EditableRowProps {
  index: number;
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const EditActions: React.FC<{
  onSave: () => void;
  onClose: () => void;
  inputRef?: React.RefObject<InputRef>;
  value?: string;
}> = ({ onSave, onClose }) => (
  <>
    <Button type="text" size="small" onClick={onSave}>
      <CheckOutlined style={{ fontSize: '12px' }} />
    </Button>
    <Button type="text" size="small" onClick={onClose}>
      <CloseOutlined style={{ fontSize: '12px' }} />
    </Button>
  </>
);

export const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext);

  const toggleEdit = () => {
    if (form) {
      setEditing(true);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }
  };

  const save = async () => {
    try {
      if (form) {
        const values = await form.validateFields();
        setEditing(false);
        // form.setFieldsValue({ address: '231' });
        handleSave({ ...values }, record);
        console.log(children);
      }
    } catch (errInfo) {
      console.error('Save failed:', errInfo, title);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Form.Item style={{ margin: 0 }} name={dataIndex} rules={restProps?.rules}>
          <Input ref={inputRef} onPressEnter={save} />
        </Form.Item>
        <EditActions onSave={save} onClose={() => setEditing(false)} />
      </div>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  } else {
    if (editing) {
      setEditing(false);
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
