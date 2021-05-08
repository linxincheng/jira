/** @jsxImportSource @emotion/react */
import React from 'react';
import { Form, Input, Select } from 'antd';
import { IProject } from './list';
import {UserSelect} from '../../components/user-select';

export interface IUser {
  id: number;
  name: string;
  email:string;
  title:string;
  organization: string;
  token: string
}

interface ISearchPanelProps {
  users: IUser[];
  param: Partial<Pick<IProject, 'name' | 'personId'>>;
  setParam: (param: ISearchPanelProps['param']) => void;
}
export const SearchPanel = ({param, setParam, users}: ISearchPanelProps) => {
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
      <UserSelect
        value={param.personId} // 这个personId是 3
        defaultOptionName={'负责人'}
        onChange={(value: number | undefined) => setParam({
          ...param,
          personId: value
        })}
      />
    </Form>
  )
}