import { useAsync } from './use-async';
import { IProject } from '../screens/project-list/list'
import { useEffect } from 'react'
import { cleanObject } from './index'
import { useHttp } from './http'

export const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp();
  const {run,  ...result} = useAsync<IProject[]>();

  useEffect(() => {
    run(client('projects', {data: cleanObject( param || {})}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
}