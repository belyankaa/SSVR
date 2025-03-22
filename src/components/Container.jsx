import React from 'react';

const MyContainer = ({ children }) => { /* children — специальное свойство, которое содержит элементы, переданные в компонент между открывающим и закрывающим тегами */
    return <div style={{maxWidth: '1200px', margin: '0 auto'}}>{children}</div>;
};

export default MyContainer;