import Slider from '@mui/material/Slider';
import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Filter({ open, children, onClose }) {

const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

    return (
        createPortal(
            <Slider
                getAriaLabel={() => 'Rank of Items'}
                orientation="vertical"
                
                defaultValue={[20, 37]}
                valueLabelDisplay="auto"
                className='filter'
            />,
            document.getElementById('filter')
        )
    )
}