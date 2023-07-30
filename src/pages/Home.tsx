import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { IModel } from '../types';
import { Todo } from '../components/TaskLists/Todo';
import { inProgressSlice as inProgress } from '../redux/slice/inProgress';
import { todoSlice as todo } from '../redux/slice/todo';
import { InProgress } from '../components/TaskLists/InProgress';
import { taskCompleteSlice as completed } from '../redux/slice/completed';
import { TaskDone } from '../components/TaskLists/TaskDone';

type StatusType = 'todo' | 'inProgress' | 'completed';

const Home = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state: any) => state);

  const onDragEnd = (result: DropResult) => {
    console.log(result, 'result');
    if (!result.destination) {
      return;
    }

    const { destination, source, draggableId } = result;
    const allSlices: Record<StatusType, any> = { todo, inProgress, completed };

    if (destination.droppableId === source.droppableId) {
      dispatch(
        allSlices[destination.droppableId as StatusType].actions.reorder(result)
      );
    } else {
      const sourceSliceData = appState[source.droppableId as StatusType];
      if (!sourceSliceData || !Array.isArray(sourceSliceData)) {
        return;
      }

      const filterState = sourceSliceData.find(
        ({ id }: IModel) => id === draggableId
      );

      if (!filterState) {
        return;
      }

      dispatch(
        allSlices[source.droppableId as StatusType].actions.remove(draggableId)
      );
      dispatch(
        allSlices[destination.droppableId as StatusType].actions.update({
          ...result,
          filterState,
        })
      );
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography
        align="center"
        variant="h3"
        sx={{
          background: 'linear-gradient(to left, #7928CA, #FF0080)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mt: 2,
        }}
      >
        Welcome to Kanban Board
      </Typography>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={10} justifyContent="center">
          <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
            <Grid item lg={4}>
              <Todo />
            </Grid>
            <Grid item lg={4}>
              <InProgress />
            </Grid>
            <Grid item lg={4}>
              <TaskDone />
            </Grid>
          </DragDropContext>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
