import React from 'react'
import { Navigate, Route, Routes} from 'react-router';
import { Link } from 'react-router-dom'
import { EpicScreen } from '../Epic'
import { KanbanScreen } from '../Kanban'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>
        ProjectScreen
      </h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        {/* project/:projectId/kanban */}
        <Route path={'/kanban'} element={<KanbanScreen />}></Route>
        {/* project/:projectId/epic */}
        <Route path={'/epic'} element={<EpicScreen />}></Route>
        <Navigate to={window.location.pathname + '/kanban'} />
      </Routes>
    </div>
  )
}
