/** @jsxImportSource @emotion/react */
import React from 'react';
import { Form, Input, Select } from 'antd';

export interface IUser {
  id: string;
  name: string;
  email:string;
  title:string;
  organization: string;
  token: string
}

interface ISearchPanelProps {
  users: IUser[],
  param: {
    name: string,
    personId: string
  },
  setParam: (param: ISearchPanelProps['param']) => void;
}
export const SearchPanel = ({param, setParam, users}: ISearchPanelProps) => {
  console.log(users);
  console.log(param);
  return (
    <Form css={{marginBottom: '2rem'}} layout={"inline"}>
      <Form.Item name="name">
        <Input
          autoComplete="current-password"
          placeholder={'项目名'}
          type="text"
          onChange={(evt) => setParam({
            ...param,
            name: evt.target.value})
          }

        />
      </Form.Item>
      <Form.Item name="personId">
        <Select 
          value={param.personId}
          defaultValue=""
          onChange={value => setParam({
            ...param,
            personId: value
          })
        }>
          <Select.Option key={""} value={""}>负责人</Select.Option>
          {
            users.map((user: IUser) => (
              <Select.Option key={user.id} value={String(user.id)}>
                {user.name}
              </Select.Option>
            ))
          }
        </Select>
      </Form.Item>
    </Form>
  )
}
        // value={param.personId}
