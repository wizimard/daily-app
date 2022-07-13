import React from 'react';
import ReactDOM from 'react-dom';

import "./Portal.scss";

interface PortalProps {
    className?: string;
    el?: string;
};

const Portal: React.FC<PortalProps> = ({ children, className = 'portal', el = 'div' }) => {

    const [container] = React.useState(() => {
      return document.createElement(el);
    });
  
    React.useEffect(() => {

      container.classList.add(className);
      document.body.appendChild(container);

      return () => {
        document.body.removeChild(container);
      }
    }, [container, className]);
  
    return ReactDOM.createPortal(children, container);
};

export default Portal;