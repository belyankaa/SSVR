// src/components/Header.jsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';

const labMenuItems = [
  { label: 'Лабораторная 1', link: '/lab1' },
  { label: 'Лабораторная 2', link: '/lab2' },
  { label: 'Лабораторная 3', link: '/lab3' },
];

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null); // Состояние для выпадающего меню
  const open = Boolean(anchorEl);

  const handleLabMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLabMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
      <Toolbar>
        {/* Выпадающее меню для лабораторных работ */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleLabMenuOpen}
          sx={{ mr: 2 }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{
              flexGrow: 0,
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.25rem',
            }}
          >
            Лабораторные
          </Typography>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleLabMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {labMenuItems.map((item, index) => (
            <MenuItem
              key={index}
              component={Link}
              to={item.link}
              onClick={handleLabMenuClose}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>

        {/* Заголовок приложения */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: '#fff', fontWeight: 'bold', fontSize: '1.25rem' }}
        >
          Мое React-приложение
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;