import React, { useState, useEffect, useCallback } from 'react';

// Constants for directions
const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

// Constants for grid size
const GRID_SIZE = 20;
const CELL_SIZE = 20;

// Initial snake position and length
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = DIRECTION.RIGHT;

// Initial food position
const generateRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const CatchGame = ({setGameResult, setVisible}: any): JSX.Element => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(generateRandomPosition());
  const [foodEaten, setFoodEaten] = useState(0);
  const [gameRunning, setGameRunning] = useState(true);

  // Handle keyboard input to change direction
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault(); // Prevent default browser behavior
      switch (event.key) {
        case 'ArrowUp':
          setDirection(DIRECTION.UP);
          break;
        case 'ArrowDown':
          setDirection(DIRECTION.DOWN);
          break;
        case 'ArrowLeft':
          setDirection(DIRECTION.LEFT);
          break;
        case 'ArrowRight':
          setDirection(DIRECTION.RIGHT);
          break;
        default:
          break;
      }
    },
    []
  );

  // Update snake's position based on direction
  useEffect(() => {
    if (!gameRunning) return; // Stop updating the snake when game is stopped

    const moveSnake = () => {
      const head = { ...snake[0] };
      switch (direction) {
        case DIRECTION.UP:
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case DIRECTION.DOWN:
          head.y = (head.y + 1) % GRID_SIZE;
          break;
        case DIRECTION.LEFT:
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case DIRECTION.RIGHT:
          head.x = (head.x + 1) % GRID_SIZE;
          break;
        default:
          break;
      }

      const newSnake = [head, ...snake.slice(0, -1)];
      setSnake(newSnake);
    };

    const intervalId = setInterval(moveSnake, 100);

    return () => clearInterval(intervalId);
  }, [snake, direction, gameRunning]);

  // Check if snake eats the food
  useEffect(() => {
    if (!gameRunning) return; // Stop checking for food when game is stopped

    if (snake[0].x === food.x && snake[0].y === food.y) {
      setFood(generateRandomPosition());
      setSnake([...snake, { ...snake[snake.length - 1] }]);
      setFoodEaten(foodEaten + 1);

      if (foodEaten >= 5) {
        setGameRunning(false); // Stop the game when 5 food items are eaten
        setGameResult("win")
        setVisible(false)
      }
    }
  }, [snake, food, foodEaten, gameRunning]);

  // Add event listener when component mounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Render the game board
  return (
    <div
      style={{
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE,
        border: '1px solid black',
        position: 'relative',
      }}
      tabIndex={0}
    >
      {snake.map((segment, index) => (
        <div
          key={index}
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: 'green',
            position: 'absolute',
            top: segment.y * CELL_SIZE,
            left: segment.x * CELL_SIZE,
          }}
        />
      ))}
      <div
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          backgroundColor: 'red',
          position: 'absolute',
          top: food.y * CELL_SIZE,
          left: food.x * CELL_SIZE,
        }}
      />
    </div>
  );
};

export default CatchGame;