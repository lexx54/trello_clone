import React from 'react';
import { AddNewItem } from './components/AddNewItem';
import { AppContainer } from './styles';
import { Column } from "./components/Column"
import { useAppState } from './state/AppStateContext';
import { addList } from './state/action';
import { CustomDragLayer } from './components/CustomDragLayer';

export const App = () => {
  const { lists, dispatch } = useAppState();
  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem
        toggleButtonText="Add another list"
        onAdd={text => dispatch(addList(text))}
      />
    </AppContainer>
  )
}


