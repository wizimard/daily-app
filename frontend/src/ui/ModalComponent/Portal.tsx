import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
    handlerOnClose: () => void;
}

const Portal:React.FC<PortalProps> = ({ handlerOnClose, children }) => {
    const [container] = React.useState(() => {
        return document.createElement('div');
    });

    const handlerOnClick = useCallback((e: MouseEvent) => {
        if (e.target === container) handlerOnClose()
    }, [handlerOnClose, container]);

    const handlerKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            handlerOnClose()
        }
    }, [handlerOnClose]);
    
    React.useEffect(() => {

        container.classList.add('modal-container');
        container.addEventListener('click', handlerOnClick);
        document.body.appendChild(container);

        document.body.addEventListener("keydown", handlerKeyDown);

        return () => {
            document.body.removeChild(container);
            document.body.removeEventListener("keydown", handlerKeyDown);
        }
    }, [container, handlerOnClick, handlerKeyDown]);

    return ReactDOM.createPortal(children, container);
}

export default Portal;