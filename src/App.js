import React, { useState } from 'react';
import { Button, TextField, Container, Grid, Typography, Switch, AppBar, Toolbar } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

function App() {
    const [input, setInput] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const appendToDisplay = (value) => {
        setInput((prev) => prev + value);
    };

    const clearDisplay = () => {
        setInput('');
    };

    const calculate = () => {
        try {
            setInput(eval(input).toString());
        } catch {
            setInput('Error');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key >= '0' && event.key <= '9') {
            appendToDisplay(event.key);
        } else if (['+', '-', '*', '/'].includes(event.key)) {
            appendToDisplay(event.key);
        } else if (event.key === 'Enter') {
            calculate();
        } else if (event.key === 'Backspace') {
            setInput((prev) => prev.slice(0, -1));
        } else if (event.key === 'Escape') {
            clearDisplay();
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '100px', backgroundColor: isDarkMode ? '#424242' : '#fff', borderRadius: '8px', padding: '20px' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Simple Calculator
                    </Typography>
                    <Switch
                        checked={isDarkMode}
                        onChange={() => setIsDarkMode(!isDarkMode)}
                        icon={<Brightness7 />}
                        checkedIcon={<Brightness4 />}
                    />
                </Toolbar>
            </AppBar>
            <TextField
                variant="outlined"
                fullWidth
                value={input}
                disabled
                onKeyDown={handleKeyDown}
                style={{ marginBottom: '20px', backgroundColor: isDarkMode ? '#616161' : '#fff' }}
            />
            <Grid container spacing={2}>
                {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', '=', '/'].map((item) => (
                    <Grid item xs={3} key={item}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => item === '=' ? calculate() : appendToDisplay(item)}
                            style={{ height: '60px', backgroundColor: isDarkMode ? '#757575' : '#1976d2' }}
                        >
                            {item}
                        </Button>
                    </Grid>
                ))}
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={clearDisplay}
                        style={{ height: '60px', backgroundColor: '#f44336', color: 'white' }}
                    >
                        C
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
