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
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stage } from '../../types/Stage';
import { mockStages } from '../../data/mockData';

const StageList: React.FC = () => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    order: 0,
    active: true
  });

  useEffect(() => {
    // Load mock data
    setStages(mockStages);
  }, []);

  const handleAddStage = () => {
    setIsEditing(false);
    setFormData({
      name: '',
      description: '',
      order: stages.length + 1,
      active: true
    });
    setIsDialogOpen(true);
  };

  const handleEditStage = (stage: Stage) => {
    setIsEditing(true);
    setSelectedStage(stage);
    setFormData({
      name: stage.name,
      description: stage.description || '',
      order: stage.order,
      active: stage.active
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (isEditing && selectedStage) {
      // Update existing stage
      const updatedStages = stages.map(stage =>
        stage.id === selectedStage.id
          ? { ...stage, ...formData }
          : stage
      );
      setStages(updatedStages);
    } else {
      // Add new stage
      const newStage: Stage = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setStages([...stages, newStage]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (stageId: string) => {
    if (window.confirm('Are you sure you want to delete this stage?')) {
      setStages(stages.filter(stage => stage.id !== stageId));
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Stage Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddStage}
        >
          Add Stage
        </Button>
      </Box>

      <Paper elevation={2}>
        <List>
          {stages.map((stage) => (
            <ListItem
              key={stage.id}
              secondaryAction={
                <Box>
                  <IconButton edge="end" onClick={() => handleEditStage(stage)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDelete(stage.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={stage.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      Order: {stage.order}
                    </Typography>
                    {stage.description && (
                      <Typography component="p" variant="body2">
                        {stage.description}
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit Stage' : 'Add New Stage'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Stage Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
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
            label="Order"
            type="number"
            fullWidth
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              />
            }
            label="Active"
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

export default StageList;