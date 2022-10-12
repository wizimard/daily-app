import React from 'react';

import './404.scss';

const Page404:React.FC = () => {
    return (
        <div className='page-404'>
            <div className="page-404__conteiner">
                <h1 className="page-404__title">404 Error</h1>
                <span className="page-404__content">Sorry, page not found</span>
                <span className="page-404__content">The page you  were looking for doesn't exist.</span>
            </div>
        </div>
    );
}

export default Page404;