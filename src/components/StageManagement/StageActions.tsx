import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stage, StageAction } from '../../types/Stage';
import { mockStageActions } from '../../data/mockData';

interface StageActionsProps {
  stage: Stage;
}

const StageActions: React.FC<StageActionsProps> = ({ stage }) => {
  const [actions, setActions] = useState<StageAction[]>([]);
  const [selectedAction, setSelectedAction] = useState<StageAction | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    mandatory: false,
    required_count: 1
  });

  useEffect(() => {
    // Load mock data filtered by stage
    setActions(mockStageActions.filter(action => action.stage_id === stage.id));
  }, [stage]);

  const handleAddAction = () => {
    setIsEditing(false);
    setFormData({
      type: '',
      description: '',
      mandatory: false,
      required_count: 1
    });
    setIsDialogOpen(true);
  };

  const handleEditAction = (action: StageAction) => {
    setIsEditing(true);
    setSelectedAction(action);
    setFormData({
      type: action.type,
      description: action.description,
      mandatory: action.mandatory,
      required_count: action.required_count
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (isEditing && selectedAction) {
      // Update existing action
      const updatedActions = actions.map(action =>
        action.id === selectedAction.id
          ? { ...action, ...formData }
          : action
      );
      setActions(updatedActions);
    } else {
      // Add new action
      const newAction: StageAction = {
        id: Date.now().toString(),
        stage_id: stage.id,
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setActions([...actions, newAction]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (actionId: string) => {
    if (window.confirm('Are you sure you want to delete this action?')) {
      setActions(actions.filter(action => action.id !== actionId));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Actions for {stage.name}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddAction}
        >
          Add Action
        </Button>
      </Box>

      <Paper elevation={2}>
        <List>
          {actions.map((action) => (
            <ListItem
              key={action.id}
              secondaryAction={
                <Box>
                  <IconButton edge="end" onClick={() => handleEditAction(action)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(action.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={action.type}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {action.mandatory ? 'Mandatory' : 'Optional'} - Required: {action.required_count}
                    </Typography>
                    <Typography component="p" variant="body2">
                      {action.description}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit Action' : 'Add New Action'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Action Type</InputLabel>
            <Select
              value={formData.type}
              label="Action Type"
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <MenuItem value="Call">Call</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Meeting">Meeting</MenuItem>
              <MenuItem value="Document">Document</MenuItem>
              <MenuItem value="Follow-up">Follow-up</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Required Count"
            type="number"
            fullWidth
            value={formData.required_count}
            onChange={(e) => setFormData({ ...formData, required_count: parseInt(e.target.value) })}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.mandatory}
                onChange={(e) => setFormData({ ...formData, mandatory: e.target.checked })}
              />
            }
            label="Mandatory"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StageActions;