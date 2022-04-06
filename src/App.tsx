import React from 'react';
import { AddNewItem } from './components/AddNewItem';
import { Column } from './components/Column';
import { useAppState } from './state/AppStateContext';
import { AppContainer } from './styles';


export const App = () => {
  const { lists } = useAppState()
  return (
    <AppContainer>
      {
        lists.map(list => (
          <Column text={list.text} id={list.id} key={list.id} />
        ))
      }
      <AddNewItem
        toggleButtonText='+ Add another list'
        onAdd={console.log}
      />
    </AppContainer>
  )
}


