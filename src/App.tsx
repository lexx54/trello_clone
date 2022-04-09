import React from 'react';
import { AddNewItem } from './components/AddNewItem';
import { Column } from './components/Column';
import { useAppState } from './state/AppStateContext';
import { AppContainer } from './styles';
import { addList } from './state/actions';


export const App = () => {
  const { lists, dispatch } = useAppState()
  return (
    <AppContainer>
      {
        lists.map(list => (
          <Column text={list.text} id={list.id} key={list.id} />
        ))
      }
      <AddNewItem
        toggleButtonText='+ Add another list'
        onAdd={text => dispatch(addList(text))}
      />
    </AppContainer>
  )
}


