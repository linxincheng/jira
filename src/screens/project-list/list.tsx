import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import {IUser} from './search-panel'
// react-router 和 react-router-dom的关系， 类似于react和react-dom/react-native/react-vr ...的关系，
import { Link } from 'react-router-dom';

// TODO 把所有ID改成number
export interface IProject {
  id:number;
  name:string;
  personId: number;
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
        // dataIndex: 'name',
        key:"name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(value, project) {
          return <Link to={String(project.id)}>{project.name}</Link>
        }
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