import { useAsync } from './use-async';
import { IProject } from '../screens/project-list/list'
import { useCallback, useEffect } from 'react'
import { cleanObject } from './index'
import { useHttp } from './http'

export const useProjects = (param?: Partial<IProject>) => {
  const client = useHttp();
  const {run,  ...result} = useAsync<IProject[]>();

  const fetchProject = useCallback(() => client('projects', {data: cleanObject( param || {})}), [param, client])

  useEffect(() => {
    run(fetchProject(), {
      retry: fetchProject
    })
  }, [param, run, fetchProject]);

  return result;
}

export const useEditProject = () => {
  const {run, ...asyncResult} = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<IProject>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const {run, ...asyncResult} = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<IProject>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}