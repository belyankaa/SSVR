import {fireEvent, render, screen} from '@testing-library/react';
import {Button } from '@mui/material';


describe('Button Component', () => {
    const button = {
        text: 'test',
    };

    it('renders the button', () => {
        render(<Button>{button.text}</Button>);

        const innerText = screen.getByText(button.text);
        expect(innerText).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
        // Создаем mock-функцию для onClick
        const handleClick = jest.fn();

        // Рендерим кнопку с mock-функцией
        render(<Button onClick={handleClick}>{button.text}</Button>);

        // Находим кнопку по тексту
        const buttonElement = screen.getByText(button.text);

        // Симулируем клик на кнопке
        fireEvent.click(buttonElement);

        // Проверяем, что mock-функция была вызвана
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('passes correct arguments to onClick', () => {
        const handleClick = jest.fn();
        const buttonArg = 'test-arg';
        render(<Button onClick={() => handleClick(buttonArg)}>{button.text}</Button>);

        const buttonElement = screen.getByText(button.text);
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledWith(buttonArg);
    });

    it('does not call onClick when button is disabled', () => {
        const handleClick = jest.fn();
        render(
            <Button onClick={handleClick} disabled>
                {button.text}
            </Button>
        );

        const buttonElement = screen.getByText(button.text);
        fireEvent.click(buttonElement);

        expect(handleClick).not.toHaveBeenCalled();
    });
});