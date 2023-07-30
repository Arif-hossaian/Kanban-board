import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import KanbanBoardLayout from '../KanbanBoardLayout';
import { todoSlice } from '../../redux/slice/todo'; // Import addNewItem from todoSlice

export function Todo() {
  const { todo } = useSelector((state: any) => state);
  const {
    actions: { completeStatus, remove, add, updateHandler },
  } = todoSlice;

  return (
    <>
      <Typography mb={3}>All todo tasks: {todo.length}</Typography>
      <KanbanBoardLayout
        droppableId="todo"
        completedHandler={completeStatus}
        removeHandler={remove}
        addHandler={add}
        selectorState={todo}
        updateHandler={updateHandler}
        showTextField={true}
      />
    </>
  );
}
