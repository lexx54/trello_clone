import React, { createContext, FC, useContext, Dispatch, useEffect } from 'react'
import { Action } from './actions'
import { AppState, List, Task, appStateReducer } from './AppStateReducer'
import { useImmerReducer } from 'use-immer'
import { DragItem } from '../components/DragItem'
import { save } from '../services/api';
import { withInitialState } from '../components/WithInitialState'

const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }]
    },
    {
      id: '1',
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }]
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }]
    }

  ],
  draggedItem: null,
}

type AppStateContextProps = {
  lists: List[],
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Action>,
  draggedItem: DragItem | null
}

type AppSateProviderProps = {
  children: React.ReactNode,
  initialState: AppState,
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const AppStateProvider = withInitialState<AppSateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(
      appStateReducer,
      initialState,
    )

    useEffect(() => {
      save(state)
    }, [state])

    const { draggedItem, lists } = state;
    const getTasksByListId = (id: string) => lists
      .find((list) => list.id === id)?.tasks || []

    return (
      <AppStateContext.Provider value={{ draggedItem, lists, getTasksByListId, dispatch }}>
        {children}
      </AppStateContext.Provider>
    )
  }
)

// export const AppStateProvider: FC = ({ children }) => {
//   const [state, dispatch] = useImmerReducer(appStateReducer, appData);
//   const { lists, draggedItem } = state

//   const getTasksByListId = (id: string) => {
//     return lists.find((list) => list.id === id)?.tasks || []
//   }

//   useEffect(() => {
//     save(state)
//   }, [state])

//   return (
//     <AppStateContext.Provider value={{ dispatch, lists, getTasksByListId, draggedItem }}>
//       {children}
//     </AppStateContext.Provider>
//   )
// }

export const useAppState = () => useContext(AppStateContext)