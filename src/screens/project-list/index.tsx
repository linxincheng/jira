import { List } from './list'
import {SearchPanel} from './search-panel'
import {useState} from 'react'
import { useDebounce, useDocumentTitle } from '../../utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from '../../utils/project'; 
import { useUsers } from '../../utils/user'
// import {Helmet} from 'react-helmet';
import { Test } from './test'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: ""
  }); 

  const debouncedParam = useDebounce(param, 200)

  const {isLoading, error, data: list} = useProjects(debouncedParam);

  const {data:users} = useUsers();
  useDocumentTitle('项目列表', false);
  
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

const Container = styled.div`
  padding: 1.2rem;
`