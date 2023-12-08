import * as React from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import { ProductRelationItem } from '../../models/models';

interface RelationItemProps {
  relationItem: ProductRelationItem;
  remove: (relationItem: ProductRelationItem) => void;
  isOpenPopup: boolean;
}

export const PopupWithConfirm: React.FC<RelationItemProps> = ({
  remove,
  relationItem,
  isOpenPopup,
}) => {
  const [isOpen, setIsOpen] = React.useState(isOpenPopup);

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove(relationItem);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogContent>Желаете отменить сравнение?</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleDelete}>
          Да
        </Button>
        <Button variant="contained" color="error" onClick={handleClose}>
          Нет
        </Button>
      </DialogActions>
    </Dialog>
  );
};
