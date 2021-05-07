import { Input, Form } from 'antd';
import React from 'react';
import { LongButton } from '.';
import { useAuth } from '../context/auth-context';
import { useAsync } from '../utils/use-async';

// 鸭子类型（duck typing）: 面向接口编程 而不是面思想对象编程
export const RegisterScreen = ({onError}: {onError: (error:Error) => void}) => {
  const { register } = useAuth();
  const {run,isLoading} = useAsync();

  // HTMLFormElement extends Element
  const handleSubmit = ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
    if(cpassword !== values.password) {
      onError(new Error("请确认两次输入密码相同!"));
      return;
    }
    run(register(values)).catch(onError);
  }
  return <Form onFinish={handleSubmit}>
    <Form.Item name={"username"}  rules={[{required: true, message: '请输入用户名'}]}>
      <Input autoComplete="current-password" type="text" id={'username'} placeholder={'用户名'}/>
    </Form.Item>
    <Form.Item name={"password"} rules={[{required: true, message: '请输入用密码'}]}>
      <Input autoComplete="current-password" type="password" id={"password"} placeholder={'密码'}/>
    </Form.Item>
    <Form.Item name={"cpassword"} rules={[{required: true, message: '请确认密码'}]}>
      <Input autoComplete="current-password" type="password" id={"cpassword"} placeholder={'确认密码'}/>
    </Form.Item>
    <Form.Item>
      <LongButton htmlType={"submit"} loading={isLoading} type={'primary'}>注册</LongButton>
    </Form.Item>
  </Form>
}