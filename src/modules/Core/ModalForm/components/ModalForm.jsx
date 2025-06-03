import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useActionButton } from '../../ActionButton/hooks/useActionButton.jsx';
import ActionButton from '../../ActionButton/components/ActionButton.jsx';
import '../utils/ModalForm.css'
const ModalForm = ({ open, onClose, title, children, onSubmit, actionButtonProps, width = 500, modalDetail=false }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: width,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '5px',
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box className='modal-form' sx={style}>
        <div className="flex items-center justify-between" style={{marginBottom: '-10px'}}>
          <span className='titulo-modal'>{title}</span>
          <svg onClick={onClose} className='text-gray-600 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6L6 18M6 6l12 12"/></svg>
        </div>
        {!modalDetail && (
          <small className='text-gray-600 mb-11'>Diligencie completamente los campos para realizar la operación</small>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {children}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <ActionButton {...actionButtonProps} />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
