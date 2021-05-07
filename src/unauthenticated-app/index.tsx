import { Button, Card, Divider, Typography } from "antd";
import React, { useState } from "react";
import { LoginScreen } from "./../unauthenticated-app/login";
import { RegisterScreen } from "./../unauthenticated-app/register";
import styled from '@emotion/styled'
import logo from '../assets/logo.svg'
import {Helmet} from 'react-helmet';
import { useDocumentTitle } from "../utils";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // useDocumentTitle('请登录或注册继续')

  return (
    <Container>
      {/* <Helmet>
        <title>请登录或注册继续</title>
      </Helmet> */}
      <Header></Header>
      <Button onClick={() => {
        throw new Error('点击抛出一个异常')
      }}>抛出异常</Button>
      <ShadowCard>
        <Title>
          {isRegister ? '请注册' : '请登录'}
        </Title>
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        {
          isRegister ? <RegisterScreen onError={setError}/>: <LoginScreen onError={setError}/> 
        }
        <Divider />
        <p onClick={() => setIsRegister(!isRegister)}>{isRegister ? '已经有账号了？直接登录' : '没有账号？注册新账号'}</p>
      </ShadowCard>
    </Container>
  )
}

export const LongButton = styled(Button)`
  width: 100%;
`

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 5rem;
  width: 100%;
`

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0,0,0,0.1) 0 0 10px;
  text-align: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`