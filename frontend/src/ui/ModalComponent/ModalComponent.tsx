import React, { useCallback, useContext } from 'react';

import { ThemeContext } from '../../themes/Themes';

import Portal from './Portal';

import './ModalComponent.scss';

interface ModalComponentProps {
  closeModalHandle: () => void;
}

const ModalComponent:React.FC<ModalComponentProps> = ({ closeModalHandle, children }) => {

    const { theme } = useContext(ThemeContext);

    const handlerOnClickElement = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
    }, []);
  
    return (
      <Portal handlerOnClose={closeModalHandle}>
        <div className='modal-component' onClick={handlerOnClickElement}>
          <div className="img-container modal-close">
            <img src={theme.img.close.x1} 
              srcSet={`${theme.img.close.x1} 1x, ${theme.img.close.x2} 2x`} 
              alt="close" />
          </div>
          { children }
        </div>
      </Portal>
    )
}

export default ModalComponent;