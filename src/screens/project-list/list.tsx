import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import {IUser} from './search-panel'

export interface IProject {
  id:string;
  name:string;
  personId: string;
  pin: boolean;
  organization:string;
  created: number;
}
interface IListProps extends TableProps<IProject>{
  users: IUser[];
}

export const List = ({users, ...props}: IListProps) => {
  return <Table 
    pagination={false}
    rowKey={project => project.id}
    columns={[
      {
        title: '名称',
        dataIndex: 'name',
        key:"name",
        sorter: (a, b) => a.name.localeCompare(b.name)
      },{
        title: '部门',
        key:"organization",
        dataIndex: 'organization',
      }, {
        title: "负责人",
        key:"id",
        render(value, project) {
          return <span>
            {users.find(user => user.id === project.personId)?.name || '未知'}
          </span>
        }
      },
      {
        title: '创建时间',
        key:"created",
        render(value, project) {
          return <span>
            {
              project.created ? dayjs(project.created).format('YYYY-MM-DD'): '无'
            }
          </span>
        }
      }
    ]}
    {...props}
    >
  </Table>
}