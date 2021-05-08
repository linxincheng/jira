import { List } from './list'
import {SearchPanel} from './search-panel'
import { useDebounce, useDocumentTitle } from '../../utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from '../../utils/project'; 
import { useUsers } from '../../utils/user'
// import { Test } from './test'
import { useUrlQueryParam } from '../../utils/url'
import { useProjectSearchParams } from './util'
export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false);

  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
  const [param, setParam] = useProjectSearchParams()
  const {isLoading, error, data: list} = useProjects(useDebounce(param, 200));
  const {data:users} = useUsers();

  const test = useUrlQueryParam(['name'])
  
  return <Container>
    {/* <Test/> */}
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