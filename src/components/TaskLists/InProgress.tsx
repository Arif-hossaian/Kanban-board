import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import KanbanBoardLayout from '../KanbanBoardLayout';
import { Box } from '@mui/material';
import { inProgressSlice } from '../../redux/slice/inProgress';

export function InProgress() {
  const { inProgress } = useSelector((state: any) => state);
  const {
    actions: { completeStatus, remove, add },
  } = inProgressSlice;

  return (
    <Box minWidth={300}>
      <Typography mb={3} sx={{ color: 'blue' }}>
        All in progress tasks: {inProgress.length}
      </Typography>
      <KanbanBoardLayout
        droppableId="inProgress"
        labelText="Type 'in progress' item"
        completedHandler={completeStatus}
        removeHandler={remove}
        addHandler={add}
        selectorState={inProgress}
        showTextField={false}
      />
    </Box>
  );
}
