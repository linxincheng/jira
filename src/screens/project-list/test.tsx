import React, { useEffect, useState } from 'react'
import { useMount } from '../../utils';

const test = () => {
  let num = 0;
  const effect = () => {
    num += 1;
    const message = `现在的num值：${num}`
    return function unmount() {
      console.log(message);
    }
  }
  return effect
}

const add = test();
const unmount = add();
add();
add();
add();
// 已经不是同一个message了
unmount(); // 按照直觉打印3，实际上打印1


// react hook 与 闭包， hook 与 闭包 经典的坑
export const  Test = () => {
  const [num, setNum] = useState(0);
  const add = () => setNum(num + 1);
  useMount(() => { // 获取的第一次的num
    // setInterval(() => {
    //   console.log('num in setInteral',num)
    // }, 1000)
  })
  useEffect(() => {
    return () => {
      console.log(num)
    }
  }, [num])
  return (
    <div>
      <button onClick={add}>add</button>
      <p>number: {num}</p>
    </div>
  )
}
