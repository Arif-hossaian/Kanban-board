import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import KanbanBoardLayout from '../KanbanBoardLayout';
import { taskCompleteSlice } from '../../redux/slice/completed';

export function TaskDone() {
  const { taskDone } = useSelector((state: any) => state);
  const {
    actions: { completeStatus, remove, add },
  } = taskCompleteSlice;

  return (
    <>
      <Typography mb={3} sx={{ color: 'green' }}>
        All done tasks: {taskDone.length}
      </Typography>
      <KanbanBoardLayout
        droppableId="completed"
        completedHandler={completeStatus}
        removeHandler={remove}
        addHandler={add}
        selectorState={taskDone}
        showTextField={false}
      />
    </>
  );
}
