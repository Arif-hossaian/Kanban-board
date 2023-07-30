import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { AppDispatch } from '../redux/store';
import { IColumnLayoutProps } from '../types/index';

const KanbanBoardLayout: React.FC<IColumnLayoutProps> = ({
  addHandler,
  removeHandler,
  completedHandler,
  selectorState,
  droppableId,
  updateHandler,
  update,
  showTextField,
}) => {
  //console.log(selectorState);

  const [title, setTitle] = useState('');
  const [textDescription, setTextDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState('');
  const [isError, setIsError] = useState({
    isShow: false,
    text: '',
  });
  const dispatch = useDispatch<AppDispatch>();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    setIsError({
      isShow: event.target.value.length > 200,
      text:
        event.target.value.length > 200
          ? 'The input value cannot be more than 200 characters'
          : '',
    });
  };

  const handleTextDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextDescription(event.target.value);

    setIsError({
      isShow: event.target.value.length > 200,
      text:
        event.target.value.length > 200
          ? 'The input value cannot be more than 200 characters'
          : '',
    });
  };

  // useEffect(() => {
  //   if (editMode && editingItemId) {
  //     console.log(editingItemId);
  //     const itemToEdit = selectorState.find(
  //       (item) => item.id === editingItemId
  //     );
  //     if (itemToEdit) {
  //       setTitle(itemToEdit.title);
  //       setTextDescription(itemToEdit.description);
  //     }
  //   }
  // }, [editMode, editingItemId, selectorState]);

  const handleEdit = (itemId: string) => {
    //console.log(itemId);
    const itemToEdit = selectorState.find((item: any) => item.id === itemId);
    console.log(itemToEdit, 'itemToEdit');

    if (itemToEdit) {
      setEditMode(true);
      setEditingItemId(itemId);
      setTitle(itemToEdit.title);
      setTextDescription(itemToEdit.description);
    }
  };

  const handleUpdate = () => {
    if (!isError.isShow) {
      dispatch(updateHandler(editingItemId, title, textDescription));

      setTitle('');
      setTextDescription('');
      setEditMode(false);
      setEditingItemId('');
    }
  };

  const handleOnClick = () => {
    if (!editMode) {
      if (!isError.isShow) {
        dispatch(addHandler(title, textDescription));
        setTitle('');
        setTextDescription('');
      }
    } else {
      handleUpdate();
    }
  };

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (event: any) => {
    const selectedDateValue = event.target.value as string;
    setSelectedDate(selectedDateValue);
  };

  const filteredItems = selectedDate
    ? selectorState.filter((item: any) => item.createdAt.includes(selectedDate))
    : selectorState;

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (textDescription.length > 0 && textDescription.length <= 200) {
        handleOnClick();
      } else {
        setIsError({
          isShow: true,
          text: 'The input value cannot be empty',
        });
      }
    }
  };

  const handleOnBlur = () => {
    setIsError({ ...isError, isShow: false });
  };

  return (
    <Box
      borderRadius={1}
      width="100%"
      sx={{ boxShadow: 2, p: 3, color: 'white' }}
    >
      {showTextField && (
        <>
          <TextField
            fullWidth
            label="Add title"
            onChange={handleTitleChange}
            onBlur={handleOnBlur}
            onKeyDown={handleInputKeyDown}
            value={title}
            variant="outlined"
            size="small"
          />
          <TextField
            fullWidth
            label="Add description"
            onChange={handleTextDescriptionChange}
            onBlur={handleOnBlur}
            onKeyDown={handleInputKeyDown}
            value={textDescription}
            variant="outlined"
            size="small"
            sx={{ mt: 2 }}
          />

          <Collapse in={isError.isShow}>
            <Alert severity="error" sx={{ my: 1 }}>
              {isError.text}
            </Alert>
          </Collapse>

          <Box width="100%" display="flex" justifyContent="center">
            <Button
              size="medium"
              sx={{ my: 1, maxWidth: 200 }}
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleOnClick}
              onKeyDown={({ key }) => key === 'Enter' && handleOnClick()}
              disabled={
                textDescription.length === 0 || textDescription.length > 200
              }
            >
              {editMode ? 'Update Item' : 'Add Item'}
            </Button>
          </Box>
        </>
      )}
      <InputLabel id="demo-simple-select-label">
        Filter by Creation Date
      </InputLabel>
      <Select
        value={selectedDate}
        onChange={handleDateChange}
        fullWidth
        sx={{ mt: 1, mb: 4 }}
        size="small"
      >
        <MenuItem value="" disabled>
          Select a date
        </MenuItem>
        {selectorState.map((item: any) => (
          <MenuItem key={item.id} value={item.createdAt}>
            {item.createdAt}
          </MenuItem>
        ))}
      </Select>
      <Paper>
        <Box sx={{ mx: 3 }}>
          <Droppable droppableId={droppableId}>
            {(provided) => (
              <List
                sx={{
                  minHeight: '300px',
                  li: {
                    flexDirection: 'column',
                  },
                  '& .MuiListItemText-root': {
                    width: '100%',
                  },
                }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filteredItems.map((item: any, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItem
                        sx={{
                          transition: '.3s ease background-color',
                          color: snapshot.isDragging ? '#fff' : '#000',
                          bgcolor: snapshot.isDragging ? '#cdcdcd' : '#fff',
                          position: 'relative',
                          border: '1px solid #989898',
                          my: 1,
                          borderRadius: '3px',
                          '& .MuiTypography-root': {
                            display: 'flex',
                            alignItems: 'center',
                          },
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItemText
                          sx={{
                            textDecoration: item.isFinished
                              ? 'line-through'
                              : 'none',
                            wordBreak: 'break-word',
                          }}
                        >
                          <Box
                            component="span"
                            width="100%"
                            position="absolute"
                            top="0"
                            fontSize=".7rem"
                            sx={{ color: 'green' }}
                          >
                            {item.updatedAt ? 'Updated' : 'Created'} at:{' '}
                            {item.updatedAt || item.createdAt}
                          </Box>

                          <Box
                            component="span"
                            width="100%"
                            sx={{ display: 'block' }}
                          >
                            Title:-{' '}
                            <span style={{ color: 'grey' }}>{item.title}</span>
                          </Box>
                          <Box
                            component="span"
                            width="100%"
                            sx={{ display: 'block' }}
                          >
                            Description:-{' '}
                            <span style={{ color: 'grey' }}>
                              {item.description}
                            </span>
                          </Box>

                          <Box display="flex" component="span">
                            <IconButton
                              onClick={() => dispatch(removeHandler(item.id))}
                            >
                              <DeleteIcon
                                sx={{
                                  color: 'red',
                                }}
                              />
                            </IconButton>

                            <IconButton onClick={() => handleEdit(item.id)}>
                              <EditIcon />
                            </IconButton>
                          </Box>
                        </ListItemText>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </Box>
      </Paper>
    </Box>
  );
};

export default KanbanBoardLayout;
