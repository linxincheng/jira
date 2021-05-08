import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import {IUser} from './search-panel'
// react-router 和 react-router-dom的关系， 类似于react和react-dom/react-native/react-vr ...的关系，
import { Link } from 'react-router-dom';
import { Pin } from '../../components/pin';
import { useEditProject } from '../../utils/project';

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
  refresh?: () => void,
}

export const List = ({users, ...props}: IListProps) => {
  const {mutate} = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh); // 函数柯里化
  return <Table 
    pagination={false}
    rowKey={project => project.id}
    columns={[
      {
        title: <Pin checked={true} disabled={true} />,
        render(value, project) {
          return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
        }
      },
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