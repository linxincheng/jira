import React from 'react';
import { useAuth } from '../context/auth-context';
import { Form, Input} from 'antd';
import { LongButton } from '.';
import { useAsync } from '../utils/use-async';
// 鸭子类型（duck typing）: 面向接口编程 而不是面思想对象编程
export const LoginScreen = ({onError}: {onError: (error:Error) => void}) => {
  const { login, user } = useAuth();

  const {run, isLoading} = useAsync();

  // HTMLFormElement extends Element
  const handleSubmit = (values: {username:string, password: string}) => {
    run(login(values)).catch(onError);
  }
  return <Form onFinish={handleSubmit}>
    {
      user ? <div>
        登录成功，用户名： {user?.name} {user?.token}
      </div> : null
    }
    <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
      <Input autoComplete="current-password" type="text" id={'username'} placeholder={'用户名'}/>
    </Form.Item>
    <Form.Item name={'password'}  rules={[{required: true, message: '请输入用密码'}]}>
      <Input autoComplete="current-password" type="password" id={"password"} placeholder={'密码'}/>
    </Form.Item>
    <Form.Item>
      <LongButton htmlType={'submit'} loading={isLoading} type={"primary"}>登录</LongButton>
    </Form.Item>
  </Form>
}