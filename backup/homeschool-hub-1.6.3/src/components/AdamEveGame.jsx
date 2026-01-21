import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

// Game states
const GAME_STATES = {
  INTRO: 'intro',
  PLAYING: 'playing',
  WARNING: 'warning',
  ATE_FRUIT: 'ate_fruit',
  FALLING: 'falling',
  GAME_OVER: 'game_over',
};

// Good trees that give rewards
const GOOD_TREES = [
  { x: 50, y: 280, scale: 1.2, visited: false, fruit: 'orange' },
  { x: 550, y: 290, scale: 1, visited: false, fruit: 'banana' },
  { x: 680, y: 270, scale: 1.3, visited: false, fruit: 'grapes' },
];

function AdamEveGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [gameState, setGameState] = useState(GAME_STATES.INTRO);
  const [warningShown, setWarningShown] = useState(false);
  const [message, setMessage] = useState('');
  const [keys, setKeys] = useState({ left: false, right: false, up: false, down: false });
  const [fruitsCollected, setFruitsCollected] = useState(0);
  const [canvasScale, setCanvasScale] = useState(1);

  const playerRef = useRef({ x: 200, y: 350, width: 32, height: 48, direction: 1 });
  const animationFrameRef = useRef(null);
  const frameCountRef = useRef(0);
  const fallingYRef = useRef(0);
  const goodTreesRef = useRef(GOOD_TREES.map(t => ({ ...t })));
  const fruitsCollectedRef = useRef(0);
  const showRewardRef = useRef({ show: false, fruit: '', x: 0, y: 0, timer: 0 });

  // Forbidden Tree position (fixed)
  const getTreePosition = useCallback(() => {
    return {
      x: 380,
      y: 200,
      width: 80,
      height: 120
    };
  }, []);

  // Handle responsive canvas scaling to fit container
  useEffect(() => {
    const updateCanvasScale = () => {
      const container = canvasContainerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const canvasWidth = 800;
      const canvasHeight = 500;

      // Calculate scale to fit both width and height
      const scaleX = containerWidth / canvasWidth;
      const scaleY = containerHeight / canvasHeight;
      const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down

      setCanvasScale(scale);
    };

    updateCanvasScale();
    window.addEventListener('resize', updateCanvasScale);

    // Use ResizeObserver for more accurate container size tracking
    const container = canvasContainerRef.current;
    if (container) {
      const resizeObserver = new ResizeObserver(updateCanvasScale);
      resizeObserver.observe(container);
      return () => {
        window.removeEventListener('resize', updateCanvasScale);
        resizeObserver.disconnect();
      };
    }

    return () => window.removeEventListener('resize', updateCanvasScale);
  }, []);

  // Fixed canvas dimensions
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 500;

  // Check if player is near the forbidden tree
  const isNearForbiddenTree = useCallback(() => {
    const player = playerRef.current;
    const treePosition = getTreePosition();
    const dx = Math.abs((player.x + player.width / 2) - (treePosition.x + treePosition.width / 2));
    const dy = Math.abs((player.y + player.height / 2) - (treePosition.y + treePosition.height / 2));
    return dx < 60 && dy < 80;
  }, [getTreePosition]);

  // Check if player touches the forbidden fruit
  const isTouchingFruit = useCallback(() => {
    const player = playerRef.current;
    const treePosition = getTreePosition();
    const fruitX = treePosition.x + treePosition.width / 2;
    const fruitY = treePosition.y + 30;
    const dx = Math.abs((player.x + player.width / 2) - fruitX);
    const dy = Math.abs((player.y) - fruitY);
    return dx < 35 && dy < 40;
  }, [getTreePosition]);

  // Check if player is near a good tree
  const checkGoodTrees = useCallback(() => {
    const player = playerRef.current;

    for (let i = 0; i < goodTreesRef.current.length; i++) {
      const tree = goodTreesRef.current[i];
      if (tree.visited) continue;

      const treeX = tree.x + 25 * tree.scale;
      const treeY = tree.y + 40 * tree.scale;
      const dx = Math.abs((player.x + player.width / 2) - treeX);
      const dy = Math.abs((player.y + player.height / 2) - treeY);

      if (dx < 50 && dy < 60) {
        tree.visited = true;
        fruitsCollectedRef.current++;
        setFruitsCollected(fruitsCollectedRef.current);
        showRewardRef.current = {
          show: true,
          fruit: tree.fruit,
          x: treeX,
          y: treeY - 50,
          timer: 60
        };
        return true;
      }
    }
    return false;
  }, []);

  // Draw pixelated character (faceless)
  const drawPlayer = useCallback((ctx, x, y, direction, isAdam = true) => {
    const bx = Math.floor(x);
    const by = Math.floor(y);

    // Draw simple rectangle - blue for Adam, pink for Eve
    ctx.fillStyle = isAdam ? '#4A90E2' : '#FFB6C1'; // Blue for Adam, Pink for Eve
    ctx.fillRect(bx, by, 32, 48); // Simple rectangle
  }, []);

  // Draw the garden
  const drawGarden = useCallback((ctx, canvas) => {
    // Sky gradient (heavenly)
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(0.5, '#FFE4B5');
    skyGradient.addColorStop(1, '#90EE90');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    for (let i = 0; i < 5; i++) {
      const x = (i * 160) % canvas.width;
      const y = 30 + (i % 3) * 25;
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.arc(x + 25, y - 5, 30, 0, Math.PI * 2);
      ctx.arc(x + 50, y, 25, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ground (grass)
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, 420, canvas.width, 80);

    // Grass texture
    ctx.fillStyle = '#32CD32';
    for (let i = 0; i < canvas.width; i += 10) {
      ctx.fillRect(i, 420, 5, 8);
    }

    // Flowers
    const flowerColors = ['#FF69B4', '#FFD700', '#FF6347', '#9370DB'];
    for (let i = 0; i < 15; i++) {
      const fx = (i * 53 + 20) % canvas.width;
      const fy = 440 + (i % 3) * 15;
      ctx.fillStyle = flowerColors[i % flowerColors.length];
      ctx.beginPath();
      ctx.arc(fx, fy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(fx, fy, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw good trees with fruits
    const drawGoodTree = (treeData) => {
      const x = treeData.x;
      const y = treeData.y;
      const scale = treeData.scale;

      // Trunk
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(x + 15 * scale, y + 40 * scale, 20 * scale, 50 * scale);

      // Leaves
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.moveTo(x + 25 * scale, y);
      ctx.lineTo(x + 50 * scale, y + 50 * scale);
      ctx.lineTo(x, y + 50 * scale);
      ctx.fill();

      // Draw fruit if not collected
      if (!treeData.visited) {
        const fruitEmoji = treeData.fruit === 'orange' ? '🍊' : treeData.fruit === 'banana' ? '🍌' : '🍇';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(fruitEmoji, x + 25 * scale, y + 25 * scale);
      } else {
        // Show checkmark for visited trees
        ctx.fillStyle = '#4CAF50';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('✓', x + 25 * scale, y + 25 * scale);
      }
    };

    goodTreesRef.current.forEach((tree) => drawGoodTree(tree));

    // The Forbidden Tree (center, special)
    const treePosition = getTreePosition();
    const tx = treePosition.x;
    const ty = treePosition.y;

    // Trunk (thicker, more prominent)
    ctx.fillStyle = '#654321';
    ctx.fillRect(tx + 30, ty + 60, 25, 80);

    // Leaves (larger, darker)
    ctx.fillStyle = '#006400';
    ctx.beginPath();
    ctx.arc(tx + 42, ty + 35, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tx + 25, ty + 50, 35, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(tx + 60, ty + 50, 35, 0, Math.PI * 2);
    ctx.fill();

    // Forbidden fruit (apple - glowing red)
    ctx.save();
    ctx.shadowColor = '#FF0000';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(tx + 42, ty + 30, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Apple stem
    ctx.fillStyle = '#654321';
    ctx.fillRect(tx + 40, ty + 18, 3, 6);

    // Apple leaf
    ctx.fillStyle = '#32CD32';
    ctx.beginPath();
    ctx.ellipse(tx + 47, ty + 20, 5, 3, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    // Label for tree
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Forbidden Tree', tx + 42, ty + 155);
  }, [getTreePosition]);

  // Draw Earth scene (for falling)
  const drawEarthScene = useCallback((ctx, canvas, fallProgress) => {
    // Dark sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGradient.addColorStop(0, '#1a1a2e');
    skyGradient.addColorStop(0.5, '#16213e');
    skyGradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars
    ctx.fillStyle = 'white';
    for (let i = 0; i < 50; i++) {
      const sx = (i * 17 + fallProgress * 0.5) % canvas.width;
      const sy = (i * 23) % (canvas.height - 100);
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + (i % 2), 0, Math.PI * 2);
      ctx.fill();
    }

    // Earth (brown, less lush)
    ctx.fillStyle = '#8B7355';
    ctx.fillRect(0, 400 + Math.max(0, 200 - fallProgress * 2), canvas.width, 100);

    // Thorns and thistles
    ctx.fillStyle = '#4A3728';
    for (let i = 0; i < 20; i++) {
      const thornX = i * 40;
      const thornY = 405 + Math.max(0, 200 - fallProgress * 2);
      ctx.beginPath();
      ctx.moveTo(thornX, thornY + 20);
      ctx.lineTo(thornX + 10, thornY);
      ctx.lineTo(thornX + 20, thornY + 20);
      ctx.fill();
    }
  }, []);

  // Draw message box on canvas
  const drawMessageBox = useCallback((ctx, canvas, messageText, isWarning) => {
    const boxWidth = 350;
    const boxHeight = 120;
    const boxX = (canvas.width - boxWidth) / 2;
    const boxY = 30;

    // Background
    ctx.fillStyle = isWarning ? 'rgba(255, 243, 205, 0.95)' : 'rgba(248, 215, 218, 0.95)';
    ctx.strokeStyle = isWarning ? '#ffc107' : '#dc3545';
    ctx.lineWidth = 3;

    // Rounded rectangle
    const radius = 10;
    ctx.beginPath();
    ctx.moveTo(boxX + radius, boxY);
    ctx.lineTo(boxX + boxWidth - radius, boxY);
    ctx.quadraticCurveTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + radius);
    ctx.lineTo(boxX + boxWidth, boxY + boxHeight - radius);
    ctx.quadraticCurveTo(boxX + boxWidth, boxY + boxHeight, boxX + boxWidth - radius, boxY + boxHeight);
    ctx.lineTo(boxX + radius, boxY + boxHeight);
    ctx.quadraticCurveTo(boxX, boxY + boxHeight, boxX, boxY + boxHeight - radius);
    ctx.lineTo(boxX, boxY + radius);
    ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Text
    ctx.fillStyle = isWarning ? '#856404' : '#721c24';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';

    // Word wrap the message
    const words = messageText.split(' ');
    let lines = [];
    let currentLine = '';
    const maxWidth = boxWidth - 30;

    for (const word of words) {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());

    const lineHeight = 18;
    const startY = boxY + 25;
    lines.forEach((line, i) => {
      ctx.fillText(line, canvas.width / 2, startY + i * lineHeight);
    });

    // Button
    const btnWidth = 120;
    const btnHeight = 25;
    const btnX = (canvas.width - btnWidth) / 2;
    const btnY = boxY + boxHeight - 35;

    ctx.fillStyle = isWarning ? '#ffc107' : '#dc3545';
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnWidth, btnHeight, 5);
    ctx.fill();

    ctx.fillStyle = isWarning ? '#333' : 'white';
    ctx.font = 'bold 11px Arial';
    ctx.fillText(isWarning ? 'I understand' : 'Continue...', canvas.width / 2, btnY + 17);
  }, []);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const player = playerRef.current;
    const moveSpeed = 3;

    const gameLoop = () => {
      frameCountRef.current++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (gameState === GAME_STATES.FALLING || gameState === GAME_STATES.GAME_OVER) {
        // Draw Earth scene
        fallingYRef.current += 3;
        drawEarthScene(ctx, canvas, fallingYRef.current);

        // Draw falling player
        const fallY = Math.min(350, fallingYRef.current);
        drawPlayer(ctx, canvas.width / 2 - 16, fallY, 1, true);
        drawPlayer(ctx, canvas.width / 2 + 20, fallY, -1, false);

        // Show sad indicator
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(':(', canvas.width / 2, fallY - 10);
        ctx.fillText(':(', canvas.width / 2 + 36, fallY - 10);

        if (fallingYRef.current > 200 && gameState === GAME_STATES.FALLING) {
          setGameState(GAME_STATES.GAME_OVER);
        }
      } else {
        // Draw the garden
        drawGarden(ctx, canvas);

        // Update player position
        if (gameState === GAME_STATES.PLAYING) {
          if (keys.left) {
            player.x -= moveSpeed;
            player.direction = -1;
          }
          if (keys.right) {
            player.x += moveSpeed;
            player.direction = 1;
          }
          if (keys.up) {
            player.y -= moveSpeed;
          }
          if (keys.down) {
            player.y += moveSpeed;
          }

          // Keep player in bounds
          player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
          player.y = Math.max(150, Math.min(player.y, 400));

          // Check good trees for rewards
          checkGoodTrees();

          // Check if near forbidden tree and not warned
          if (isNearForbiddenTree() && !warningShown) {
            setGameState(GAME_STATES.WARNING);
            setWarningShown(true);
            setMessage("God says: 'You may eat from any tree, but NOT from the tree!'");
          }

          // Check if touching fruit after warning
          if (isTouchingFruit() && warningShown) {
            setGameState(GAME_STATES.ATE_FRUIT);
            setMessage("Oh no! Adam and Eve ate the forbidden fruit!");
          }
        }

        // Draw player (Adam)
        drawPlayer(ctx, player.x, player.y, player.direction, true);

        // Draw Eve (follows Adam)
        const eveX = player.x + (player.direction > 0 ? -40 : 40);
        drawPlayer(ctx, eveX, player.y + 5, player.direction, false);

        // Draw player labels
        ctx.fillStyle = '#333';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Adam', player.x + 16, player.y - 5);
        ctx.fillText('Eve', eveX + 16, player.y);

        // Draw reward popup
        if (showRewardRef.current.show) {
          showRewardRef.current.timer--;
          const reward = showRewardRef.current;
          const alpha = Math.min(1, reward.timer / 30);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = '#4CAF50';
          ctx.font = 'bold 16px Arial';
          ctx.fillText(`+1 ${reward.fruit === 'orange' ? '🍊' : reward.fruit === 'banana' ? '🍌' : '🍇'}`, reward.x, reward.y - (60 - reward.timer) * 0.5);
          ctx.globalAlpha = 1;

          if (reward.timer <= 0) {
            showRewardRef.current.show = false;
          }
        }

        // Draw fruits collected UI
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(10, 10, 120, 35);
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 10, 120, 35);
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`Fruits: ${fruitsCollectedRef.current}/3`, 20, 33);

        // Draw interaction hint when near forbidden tree
        if (gameState === GAME_STATES.PLAYING && isNearForbiddenTree() && warningShown) {
          const treePosition = getTreePosition();
          ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('The forbidden fruit...', treePosition.x + 42, treePosition.y - 10);
        }

        // Draw message box on canvas if there's a message
        if (message && (gameState === GAME_STATES.WARNING || gameState === GAME_STATES.ATE_FRUIT)) {
          drawMessageBox(ctx, canvas, message, gameState === GAME_STATES.WARNING);
        }
      }

      // Continue animation
      if (gameState !== GAME_STATES.INTRO && gameState !== GAME_STATES.GAME_OVER) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      } else if (gameState === GAME_STATES.GAME_OVER) {
        animationFrameRef.current = null;
      }
    };

    // Initial draw (intro screen)
    if (gameState === GAME_STATES.INTRO) {
      drawGarden(ctx, canvas);
      drawPlayer(ctx, player.x, player.y, player.direction, true);
      drawPlayer(ctx, player.x - 40, player.y + 5, player.direction, false);

      // Draw instructions overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('The Garden', canvas.width / 2, 100);

      ctx.font = '16px Arial';
      ctx.fillText('Adam and Eve lived happily in God\'s garden.', canvas.width / 2, 160);
      ctx.fillText('They could eat from ANY tree...', canvas.width / 2, 190);
      ctx.fillText('except the Forbidden Tree.', canvas.width / 2, 220);

      ctx.font = '14px Arial';
      ctx.fillStyle = '#90EE90';
      ctx.fillText('Use Arrow Keys or WASD to move', canvas.width / 2, 280);
      ctx.fillText('Collect fruit from the good trees!', canvas.width / 2, 310);

      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = '#FFD700';
      ctx.fillText('Click or Press SPACE to Start', canvas.width / 2, 380);
    } else {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, keys, warningShown, message, drawGarden, drawPlayer, drawEarthScene, drawMessageBox, isNearForbiddenTree, isTouchingFruit, checkGoodTrees, getTreePosition]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        setKeys(prev => ({ ...prev, left: true }));
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        setKeys(prev => ({ ...prev, right: true }));
      } else if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        setKeys(prev => ({ ...prev, up: true }));
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        setKeys(prev => ({ ...prev, down: true }));
      } else if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (gameState === GAME_STATES.INTRO) {
          setGameState(GAME_STATES.PLAYING);
        } else if (gameState === GAME_STATES.WARNING) {
          setGameState(GAME_STATES.PLAYING);
          setMessage('');
        } else if (gameState === GAME_STATES.ATE_FRUIT) {
          setGameState(GAME_STATES.FALLING);
          fallingYRef.current = 0;
          setMessage('');
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        setKeys(prev => ({ ...prev, left: false }));
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        setKeys(prev => ({ ...prev, right: false }));
      } else if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        setKeys(prev => ({ ...prev, up: false }));
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        setKeys(prev => ({ ...prev, down: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Handle canvas click
  const handleCanvasClick = () => {
    if (gameState === GAME_STATES.INTRO) {
      setGameState(GAME_STATES.PLAYING);
    } else if (gameState === GAME_STATES.WARNING) {
      setGameState(GAME_STATES.PLAYING);
      setMessage('');
    } else if (gameState === GAME_STATES.ATE_FRUIT) {
      setGameState(GAME_STATES.FALLING);
      fallingYRef.current = 0;
      setMessage('');
    }
  };

  // Handle restart
  const handleRestart = () => {
    playerRef.current = { x: 200, y: 350, width: 32, height: 48, direction: 1 };
    fallingYRef.current = 0;
    goodTreesRef.current = GOOD_TREES.map(t => ({ ...t }));
    fruitsCollectedRef.current = 0;
    setFruitsCollected(0);
    setGameState(GAME_STATES.INTRO);
    setWarningShown(false);
    setMessage('');
    setKeys({ left: false, right: false, up: false, down: false });
  };

  // Save progress when game is over
  useEffect(() => {
    if (gameState === GAME_STATES.GAME_OVER && lesson) {
      const userId = getUserId();
      const progressId = getNextProgressId();
      const progress = new Progress({
        id: progressId,
        studentId: userId,
        activityType: 'Lesson',
        activityId: lesson.id,
        yearId: lesson.yearId,
        subjectId: lesson.subjectId,
        lessonNumber: lesson.lessonNumber,
        isCompleted: true,
        completedAt: new Date(),
        score: 100,
      });
      addProgress(progress).then(() => {
        saveData();
      }).catch(err => {
        console.error('Error saving progress:', err);
      });
    }
  }, [gameState, lesson, getUserId, getNextProgressId, addProgress, saveData]);

  // Game Over screen
  if (gameState === GAME_STATES.GAME_OVER) {
    return (
      <div ref={containerRef} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}>
        <div
          ref={canvasContainerRef}
          style={{
            width: '100%',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{
              border: '3px solid #333',
              borderRadius: '8px',
              transform: `scale(${canvasScale})`,
              transformOrigin: 'center center',
            }}
          />
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '100%',
          width: '100%',
        }}>
          <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '10px' }}>
            The Fall of Man
          </h2>
          <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px', lineHeight: '1.5' }}>
            Because Adam and Eve disobeyed God, they had to leave the garden.
          </p>
          <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px', lineHeight: '1.5' }}>
            You collected {fruitsCollected}/3 good fruits before eating the forbidden fruit.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleRestart}
              style={{
                padding: '10px 20px',
                fontSize: '14px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Play Again
            </button>
            {lesson && (
              <button
                onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)}
                style={{
                  padding: '10px 20px',
                  fontSize: '14px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Continue Learning
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '8px 15px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '800px',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '3px' }}>
          Adam and Eve - The First People
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          Arrow Keys or WASD: Move | Collect fruits from good trees!
        </div>
      </div>

      {/* Game Canvas Container */}
      <div
        ref={canvasContainerRef}
        style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          style={{
            border: '3px solid #333',
            borderRadius: '8px',
            cursor: 'pointer',
            transform: `scale(${canvasScale})`,
            transformOrigin: 'center center',
          }}
        />
      </div>
    </div>
  );
}

export default AdamEveGame;
