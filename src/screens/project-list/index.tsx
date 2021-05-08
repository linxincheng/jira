import { List } from './list'
import {SearchPanel} from './search-panel'
import {useState} from 'react'
import { useDebounce, useDocumentTitle } from '../../utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from '../../utils/project'; 
import { useUsers } from '../../utils/user'
import { Test } from './test'
import { useUrlQueryParam } from '../../utils/url'
export const ProjectListScreen = () => {
  // const [, setParam] = useState({
  //   name: "",
  //   personId: ""
  // });
  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  // setParam(['name'])
  const debouncedParam = useDebounce(param, 200)

  const {isLoading, error, data: list} = useProjects(debouncedParam);

  const {data:users} = useUsers();
  useDocumentTitle('项目列表', false);

  const test = useUrlQueryParam(['name'])
  
  return <Container>
    <Test/>
    {/* <Helmet>
      <title>项目列表</title>
    </Helmet> */}
    <h1>项目列表</h1>
    <SearchPanel param={param} setParam={setParam} users={users || []}/>
    {error? <Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
    <List users={users || []} dataSource={list || []} loading={isLoading}/>
  </Container>
}

ProjectListScreen.whyDidYouRender = false;
// class Test extends React.Component<any, any> {
//   static whyDidYouRender = true
// }

const Container = styled.div`
  padding: 1.2rem;
`