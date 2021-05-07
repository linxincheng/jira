import { useAsync } from './use-async';
import { IUser } from "../screens/project-list/search-panel";
import { useEffect } from 'react'
import { cleanObject } from './index'
import { useHttp } from './http'


export const useUsers = (param?: Partial<IUser>) => {
  const client = useHttp();
  const {run,  ...result} = useAsync<IUser[]>();

  useEffect(() => {
    run(client('users', {data: cleanObject( param || {})}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
}