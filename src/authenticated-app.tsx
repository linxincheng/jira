/**@jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { ButtonNoPadding, Row } from './components/lib';
import { useAuth } from './context/auth-context';
import { ProjectListScreen } from './screens/project-list';
import {ReactComponent as Logo} from './assets/logo.svg'
import { Button, Dropdown, Menu } from 'antd';
import {Navigate, Route, Routes} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom'
import { ProjectScreen } from './screens/project';
import { resetRoute } from './utils';
import { ProjectModel } from './screens/project-list/project-model';
import { ProjectPopover } from './components/project-popover';

/**
 * grid 和 flex 各自的应用场景
 * 1. 考虑是一维布局还是二维部署
 * 一般来说， 一维布局用flex， 二维布局用grid
 * 2. 是从内容出发还是从布局出发
 * 从内容出发（用flex）： 你先有一组内容（数量一般不固定，然后希望他们均匀的分布在容器中， 由内容自己的大小决定占据的空间）
 * 从布局出发（grid）：先规划网格(数量一般比较固定)，然后再把元素往里填充
 */

// prop drilling

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  return <Container>
    <Nav>nav</Nav>
    <PageHeader setProjectModalOpen={setProjectModalOpen}/>
    <ButtonNoPadding type={'link'} onClick={() => setProjectModalOpen(true)}>打开</ButtonNoPadding>
    <Main>
      {/* <ProjectListScreen /> */}
      <Router>
        <Routes>
          <Route path={'/projects'} element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen}/>}>
          </Route>
          <Route path={'/projects/:projectId/*'} element={<ProjectScreen />}></Route>
          <Navigate to={window.location.pathname + '/projects'}/>
        </Routes>
      </Router>
    </Main>
    <ProjectModel projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}/>
    <Aside>aside</Aside>
    <Footer>footer</Footer>
  </Container>
}

const PageHeader = (props: {setProjectModalOpen: (isOpen: boolean) => void}) => {
  return <Header between={true}>
  <HeaderLeft gap={true}>
    <Button type={'link'} onClick={resetRoute}>
      <Logo css={{height: '30px'}}></Logo>
    </Button>
    <ProjectPopover setProjectModalOpen={props.setProjectModalOpen}/>
    <span>用户</span>
    <HeaderItem as={'div'}>another</HeaderItem>
  </HeaderLeft>
  <HeaderRight>
    <User />
  </HeaderRight>
</Header>
}

const User = () => {
  const { logout, user } = useAuth();
  return <Dropdown overlay={
    <Menu>
      <Menu.Item key={'logout'}>
        {/* <a onClick={logout}>登出</a> */}
        <Button type={'link'} onClick={logout}>登出</Button>
      </Menu.Item>
    </Menu>}>
    <Button type={'link'} onClick={(e) => e.preventDefault()}>Hi,{user?.name}</Button>
  </Dropdown>
}

const HeaderItem = styled.h3`margin-right: 3rem;`

const Container = styled.div`
 display: grid;
 grid-template-rows: 6rem 1fr 6rem;
 grid-template-columns: 5rem 1fr 5rem;
 grid-template-areas: 
 "header header header"
 "nav main aside"
 "footer footer footer";
 height: 100vh;
`

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`grid-area: header;
display: flex;
flex-direction:row;
align-items: center;
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`
const HeaderLeft = styled(Row)`
  display:flex;
  align-items:center;
`
const HeaderRight = styled.div``
const Main = styled.main`grid-area: main;`;
const Nav = styled.nav`grid-area: nav;`;
const Aside = styled.aside`grid-area: aside;`;
const Footer = styled.footer`
grid-area: footer;
text-align:center;
`