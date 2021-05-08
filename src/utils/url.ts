import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from '.';
/**
 * 返回页面url中，指定键的参数值
 * 
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [ searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(() => 
      keys.reduce((prev, key: string) => {
        return {...prev, [key]: searchParams.get(key) || ''}
      }, {} as {[key in K]: string}),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params:Partial<{[key in K]: unknown}>) => {
      // iterator 
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
      return setSearchParams(o);
    }
  ] as const
}

// const a0 = ['jack', 12, {gender: 'male'}] as const
// const a1 = ['12'] as const