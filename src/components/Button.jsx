    import React from 'react';

    const MyButton = ({ label, onClick }) => {
    return (
        <button className="my-button" onClick={onClick}> {/* атрибут onClick связывает событие нажатия на кнопку с функцией onClick, что позволяет выполнять определенные действия при нажатии */}
        {label}
        </button>
    );
    };

    export default MyButton;