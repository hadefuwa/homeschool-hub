import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';
import { speak, isSpeaking, stop } from '../utils/textToSpeech';

// Scoring tiers
const SCORE_TIERS = {
  GOLD: { name: 'Gold', color: '#FFD700', minScore: 90 },
  SILVER: { name: 'Silver', color: '#C0C0C0', minScore: 70 },
  BRONZE: { name: 'Bronze', color: '#CD7F32', minScore: 50 },
  FAIL: { name: 'Try Again', color: '#dc3545', minScore: 0 },
};

// Dinosaur types
const DINOSAUR_TYPES = {
  TREX: { emoji: '🦖', name: 'T-Rex', food: 'meat', foodEmoji: '🥩' },
  BRACHIOSAURUS: { emoji: '🦕', name: 'Brachiosaurus', food: 'leaves', foodEmoji: '🍃' },
};

// Dinosaur facts to read when collecting bones
const DINOSAUR_FACTS = [
  "Dinosaurs lived millions of years ago!",
  "Some dinosaurs were as big as houses!",
  "T-Rex was a meat-eating dinosaur!",
  "Brachiosaurus was a plant-eating dinosaur!",
  "Dinosaurs had different sizes and shapes!",
  "Some dinosaurs could fly!",
  "Dinosaurs lived on Earth for a very long time!",
  "We learn about dinosaurs from fossils!",
  "Fossils are bones that turned into stone!",
  "Dinosaurs are extinct, which means they don't live anymore!",
  "The biggest dinosaurs were plant eaters!",
  "Some dinosaurs had very long necks!",
  "Dinosaurs laid eggs like birds do!",
  "Scientists study dinosaur bones to learn about them!",
  "There were many different types of dinosaurs!",
];

function DinosaurGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);
  
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showMatching, setShowMatching] = useState(false);
  const [currentDinosaur, setCurrentDinosaur] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctMatches, setCorrectMatches] = useState(0);
  const TARGET_FOODS = 10;
  const [timeStarted, setTimeStarted] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [keys, setKeys] = useState({ left: false, right: false, space: false });
  
  const animationFrameRef = useRef(null);
  const dinoRef = useRef({ x: 100, y: 0, width: 50, height: 50, velocityX: 0, velocityY: 0, onPlatform: false });
  const platformsRef = useRef([]);
  const fossilsRef = useRef([]);
  const dinosaursRef = useRef([]);
  const cameraRef = useRef({ x: 0, y: 0 });
  const gravityRef = useRef(0.4);
  const jumpPowerRef = useRef(-10);
  const moveSpeedRef = useRef(2.5);
  const scoreRef = useRef(0);
  const timerRef = useRef(null);
  const highestYRef = useRef(0);
  const canvasContainerRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState(1);

  // Handle canvas scaling to fit container
  useEffect(() => {
    const updateCanvasScale = () => {
      const container = canvasContainerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const canvasWidth = 800;
      const canvasHeight = 600;
      
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
    
    return () => {
      window.removeEventListener('resize', updateCanvasScale);
    };
  }, []);

  // Initialize platforms
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const platforms = [];
    const startY = canvas.height - 100;
    
    // Starting platform
    platforms.push({
      x: 50,
      y: startY,
      width: 250,
      height: 25,
    });
    
    // Generate platforms going upward - wider and closer together for easier jumping
    let currentY = startY - 100;
    for (let i = 0; i < 30; i++) {
      const x = 50 + (Math.random() - 0.5) * 250;
      const width = 200 + Math.random() * 100;
      platforms.push({
        x: Math.max(20, Math.min(x, canvas.width - width - 20)),
        y: currentY,
        width: width,
        height: 25,
      });
      currentY -= 90 + Math.random() * 30; // Closer platforms
    }
    
    platformsRef.current = platforms;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    const dino = dinoRef.current;
    const platforms = platformsRef.current;
    const fossils = fossilsRef.current;
    const dinosaurs = dinosaursRef.current;
    const camera = cameraRef.current;

    const drawBackground = () => {
      // Sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#E0F7FA');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      for (let i = 0; i < 5; i++) {
        const x = ((i * 200) % (canvas.width + 200)) - 50;
        const y = 50 + (i % 3) * 30;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.arc(x + 30, y, 35, 0, Math.PI * 2);
        ctx.arc(x + 60, y, 30, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawPlatform = (platform) => {
      const screenX = platform.x - camera.x;
      const screenY = platform.y - camera.y;
      
      if (screenX + platform.width < 0 || screenX > canvas.width ||
          screenY + platform.height < 0 || screenY > canvas.height) {
        return;
      }

      // Platform shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(screenX + 3, screenY + 3, platform.width, platform.height);
      
      // Platform top
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(screenX, screenY, platform.width, platform.height);
      
      // Platform edge
      ctx.fillStyle = '#654321';
      ctx.fillRect(screenX, screenY, platform.width, 6);
    };

    const drawDino = () => {
      const screenX = dino.x - camera.x;
      const screenY = dino.y - camera.y;
      
      if (screenX + dino.width < 0 || screenX > canvas.width ||
          screenY + dino.height < 0 || screenY > canvas.height) {
        return;
      }

      const x = screenX;
      const y = screenY;
      const w = dino.width;
      const h = dino.height;

      // Body
      ctx.fillStyle = '#4A90E2';
      ctx.fillRect(x, y, w, h);

      // Head
      ctx.fillStyle = '#357ABD';
      ctx.fillRect(x + w - 18, y, 18, h * 0.6);

      // Eye
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(x + w - 8, y + 8, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(x + w - 6, y + 8, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Legs
      ctx.fillStyle = '#357ABD';
      ctx.fillRect(x + 5, y + h, 7, 12);
      ctx.fillRect(x + w - 12, y + h, 7, 12);
    };

    const drawFossil = (fossil) => {
      const screenX = fossil.x - camera.x;
      const screenY = fossil.y - camera.y;
      
      if (screenX + fossil.radius < 0 || screenX - fossil.radius > canvas.width ||
          screenY + fossil.radius < 0 || screenY - fossil.radius > canvas.height) {
        return;
      }

      ctx.save();
      ctx.globalAlpha = 0.8 + Math.sin(Date.now() / 200) * 0.2;
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(screenX, screenY, fossil.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFA500';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = '#FFF';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('🦴', screenX, screenY + 5);
    };

    const drawDinosaurItem = (dinoItem) => {
      const screenX = dinoItem.x - camera.x;
      const screenY = dinoItem.y - camera.y;
      
      if (screenX + 40 < 0 || screenX - 40 > canvas.width ||
          screenY + 40 < 0 || screenY - 40 > canvas.height) {
        return;
      }

      // Draw dinosaur item with glow
      ctx.save();
      ctx.globalAlpha = 0.9 + Math.sin(Date.now() / 150) * 0.1;
      ctx.fillStyle = dinoItem.type === 'TREX' ? '#FF6B6B' : '#4ECDC4';
      ctx.beginPath();
      ctx.arc(screenX, screenY, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = dinoItem.type === 'TREX' ? '#FF5252' : '#26A69A';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      // Draw dinosaur emoji
      ctx.font = '36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(dinoItem.emoji, screenX, screenY + 12);
    };

    const checkPlatformCollision = () => {
      dino.onPlatform = false;
      
      for (const platform of platforms) {
        if (dino.x + dino.width > platform.x &&
            dino.x < platform.x + platform.width &&
            dino.y + dino.height <= platform.y + 5 &&
            dino.y + dino.height + dino.velocityY >= platform.y) {
          dino.y = platform.y - dino.height;
          dino.velocityY = 0;
          dino.onPlatform = true;
          break;
        }
      }
    };

    const update = () => {
      if (!isPlaying || isPaused || isGameOver || showMatching) return;

      // Handle movement
      if (keys.left) {
        dino.velocityX = -moveSpeedRef.current;
      } else if (keys.right) {
        dino.velocityX = moveSpeedRef.current;
      } else {
        dino.velocityX *= 0.8;
      }

      // Apply gravity
      dino.velocityY += gravityRef.current;
      
      // Update position
      dino.x += dino.velocityX;
      dino.y += dino.velocityY;

      // Keep dino in bounds horizontally
      if (dino.x < 0) {
        dino.x = 0;
        dino.velocityX = 0;
      }
      if (dino.x + dino.width > canvas.width) {
        dino.x = canvas.width - dino.width;
        dino.velocityX = 0;
      }

      // Check platform collisions
      checkPlatformCollision();

      // Fall off bottom = reset to starting platform (don't end game)
      if (dino.y > canvas.height + 200) {
        const startPlatform = platforms[0];
        dino.x = startPlatform.x + 50;
        dino.y = startPlatform.y - dino.height;
        dino.velocityX = 0;
        dino.velocityY = 0;
        camera.x = dino.x - canvas.width / 2;
        camera.y = dino.y - canvas.height / 2;
      }

      // Update camera to follow dino
      camera.x = dino.x - canvas.width / 2;
      camera.y = dino.y - canvas.height / 2;
      
      // Track highest point reached
      if (dino.y < highestYRef.current) {
        highestYRef.current = dino.y;
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }

      // Spawn fossils on platforms
      const currentTime = Date.now();
      if (fossils.length < 3) {
        const availablePlatforms = platforms.filter(p => {
          const hasItem = fossils.some(f => 
            Math.abs(f.x - (p.x + p.width / 2)) < 50
          ) || dinosaurs.some(d => 
            Math.abs(d.x - (p.x + p.width / 2)) < 50
          );
          return !hasItem && p.y < dino.y - 100;
        });
        
        if (availablePlatforms.length > 0 && currentTime % 4000 < 50) {
          const platform = availablePlatforms[Math.floor(Math.random() * availablePlatforms.length)];
          fossils.push({
            x: platform.x + platform.width / 2,
            y: platform.y - 30,
            radius: 18,
          });
        }
      }

      // Spawn dinosaurs on platforms
      if (dinosaurs.length < 2) {
        const availablePlatforms = platforms.filter(p => {
          const hasItem = fossils.some(f => 
            Math.abs(f.x - (p.x + p.width / 2)) < 50
          ) || dinosaurs.some(d => 
            Math.abs(d.x - (p.x + p.width / 2)) < 50
          );
          return !hasItem && p.y < dino.y - 100;
        });
        
        if (availablePlatforms.length > 0 && currentTime % 6000 < 50) {
          const platform = availablePlatforms[Math.floor(Math.random() * availablePlatforms.length)];
          const dinoType = Math.random() < 0.5 ? 'TREX' : 'BRACHIOSAURUS';
          dinosaurs.push({
            x: platform.x + platform.width / 2,
            y: platform.y - 35,
            type: dinoType,
            emoji: DINOSAUR_TYPES[dinoType].emoji,
          });
        }
      }

      // Check fossil collection
      for (let i = fossils.length - 1; i >= 0; i--) {
        const fossil = fossils[i];
        const dx = dino.x + dino.width / 2 - fossil.x;
        const dy = dino.y + dino.height / 2 - fossil.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < dino.width / 2 + fossil.radius) {
          fossils.splice(i, 1);
          scoreRef.current += 10;
          setScore(scoreRef.current);
          
          // Speak a random dinosaur fact
          const randomFact = DINOSAUR_FACTS[Math.floor(Math.random() * DINOSAUR_FACTS.length)];
          speak(randomFact, { volume: 1.0, rate: 0.8, pitch: 1.1 }).catch(() => {
            // Ignore errors
          });
        }
      }

      // Check dinosaur collection
      for (let i = dinosaurs.length - 1; i >= 0; i--) {
        const dinoItem = dinosaurs[i];
        const dx = dino.x + dino.width / 2 - dinoItem.x;
        const dy = dino.y + dino.height / 2 - dinoItem.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < dino.width / 2 + 30) {
          dinosaurs.splice(i, 1);
          setCurrentDinosaur(dinoItem);
          setShowMatching(true);
          setIsPaused(true);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawBackground();

      if (!isPlaying || isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(isCompleted ? 'You Win! 🎉' : isGameOver ? 'Game Over!' : 'Click to Start', canvas.width / 2, canvas.height / 2);
        ctx.font = '18px Arial';
        ctx.fillText('Arrow Keys: Move • SPACE: Jump', canvas.width / 2, canvas.height / 2 + 40);
        return;
      }

      if (isPaused && !showMatching) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Paused', canvas.width / 2, canvas.height / 2);
        return;
      }

      // Draw game elements
      platforms.forEach(drawPlatform);
      fossils.forEach(drawFossil);
      dinosaurs.forEach(drawDinosaurItem);
      drawDino();

      // Draw UI
      ctx.fillStyle = 'white';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'left';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.strokeText(`Score: ${scoreRef.current}`, 10, 30);
      ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);
      ctx.strokeText(`Foods: ${correctMatches}/${TARGET_FOODS}`, 10, 60);
      ctx.fillText(`Foods: ${correctMatches}/${TARGET_FOODS}`, 10, 60);
    };

    const gameLoop = () => {
      update();
      draw();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    if (isPlaying && !isGameOver && !isCompleted && !isPaused) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      draw();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, isGameOver, isPaused, showMatching, keys, correctMatches]);

  // Timer
  useEffect(() => {
    if (isPlaying && !isGameOver && !isCompleted && !isPaused) {
      timerRef.current = setInterval(() => {
        if (timeStarted) {
          setTimeElapsed(Math.floor((Date.now() - timeStarted) / 1000));
        }
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, isGameOver, isPaused, timeStarted]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        setKeys(prev => ({ ...prev, left: true }));
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        setKeys(prev => ({ ...prev, right: true }));
      } else if (e.code === 'Space') {
        e.preventDefault();
        if (!isPlaying) {
          startGame();
        } else if (!isGameOver && !isCompleted && !showMatching) {
          if (isPaused) {
            setIsPaused(false);
          } else {
            jump();
          }
        }
        setKeys(prev => ({ ...prev, space: true }));
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        setKeys(prev => ({ ...prev, left: false }));
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        setKeys(prev => ({ ...prev, right: false }));
      } else if (e.code === 'Space') {
        setKeys(prev => ({ ...prev, space: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, isGameOver, isPaused, showMatching]);

  // Read question and options when matching screen appears
  useEffect(() => {
    if (showMatching && currentDinosaur && !showFeedback) {
      const dinoInfo = DINOSAUR_TYPES[currentDinosaur.type];
      const questionText = `What does ${dinoInfo.name} eat?`;
      
      const readQuestionAndOptions = async () => {
        try {
          // Read the question first
          await speak(questionText, { volume: 1.0, rate: 0.9, pitch: 1.0 });
          
          // Wait for speech to complete
          const waitForSpeech = () => {
            return new Promise((resolve) => {
              const checkInterval = setInterval(() => {
                if (!isSpeaking()) {
                  clearInterval(checkInterval);
                  resolve();
                }
              }, 100);
              // Safety timeout
              setTimeout(() => {
                clearInterval(checkInterval);
                resolve();
              }, 5000);
            });
          };
          
          await waitForSpeech();
          
          // Small pause between question and options
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Read the options together
          await speak("The choices are: Meat, or Leaves", { volume: 1.0, rate: 0.85, pitch: 1.0 });
        } catch (err) {
          console.error('Error speaking question:', err);
        }
      };
      
      readQuestionAndOptions();
    }
  }, [showMatching, currentDinosaur, showFeedback]);

  const handleCanvasClick = (e) => {
    if (!isPlaying) {
      startGame();
      return;
    }
    if (isGameOver || isCompleted || showMatching) return;
    jump();
  };

  const jump = () => {
    const dino = dinoRef.current;
    if (dino.onPlatform) {
      dino.velocityY = jumpPowerRef.current;
      dino.onPlatform = false;
    }
  };

  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    dinoRef.current = { 
      x: 100, 
      y: canvas.height - 150, 
      width: 50, 
      height: 50, 
      velocityX: 0, 
      velocityY: 0, 
      onPlatform: false 
    };
    cameraRef.current = { x: 0, y: 0 };
    fossilsRef.current = [];
    dinosaursRef.current = [];
    scoreRef.current = 0;
    highestYRef.current = canvas.height - 150;
    setScore(0);
    setIsPlaying(true);
    setIsGameOver(false);
    setIsCompleted(false);
    setIsPaused(false);
    setShowMatching(false);
    setCurrentDinosaur(null);
    setShowFeedback(false);
    setCorrectMatches(0);
    setIsCompleted(false);
    setTimeStarted(Date.now());
    setTimeElapsed(0);
  };

  const completeGame = () => {
    setIsPlaying(false);
    setIsCompleted(true);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (lesson) {
      setTimeout(() => {
        const userId = getUserId();
        const progressId = getNextProgressId();
        const percentage = 100; // Always 100% if they collected 10 foods
        
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
          score: percentage,
        });
        addProgress(progress).then(() => {
          saveData();
        }).catch(err => {
          console.error('Error saving progress:', err);
        });
      }, 0);
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleFoodSelect = (selectedFood) => {
    if (showFeedback) return;
    
    const correctFood = currentDinosaur.type === 'TREX' ? 'meat' : 'leaves';
    const isCorrect = selectedFood === correctFood;
    
    if (isCorrect) {
      const newMatches = correctMatches + 1;
      setCorrectMatches(newMatches);
      scoreRef.current += 30;
      setScore(scoreRef.current);
      // Speak success
      const dinoName = currentDinosaur.type === 'TREX' ? 'T-Rex' : 'Brachiosaurus';
      speak(`Great! ${dinoName} eats ${correctFood}!`, { volume: 1.0, rate: 0.8, pitch: 1.1 }).catch(() => {});
      
      // Check if we've collected 10 foods
      if (newMatches >= TARGET_FOODS) {
        setTimeout(() => {
          completeGame();
        }, 2000); // Wait a bit to show the feedback
      } else {
        // Continue playing after a short delay
        setTimeout(() => {
          handleMatchingNext();
        }, 2000); // Show feedback for 2 seconds then continue
      }
    } else {
      // Stop any ongoing speech before speaking correction
      stop();
      // Wait a brief moment to ensure the stop completes before speaking
      setTimeout(() => {
        // Speak correction
        const dinoName = currentDinosaur.type === 'TREX' ? 'T-Rex' : 'Brachiosaurus';
        const correctFoodName = currentDinosaur.type === 'TREX' ? 'meat' : 'leaves';
        speak(`${dinoName} eats ${correctFoodName}. Try again!`, { volume: 1.0, rate: 0.8, pitch: 1.1 }).catch(() => {});
      }, 100);
    }
    
    setShowFeedback(true);
  };

  const handleMatchingNext = () => {
    setShowMatching(false);
    setCurrentDinosaur(null);
    setShowFeedback(false);
    setIsPaused(false);
  };

  const getGrade = () => {
    const percentage = Math.min(100, Math.round((scoreRef.current / 50) * 100));
    
    if (percentage >= SCORE_TIERS.GOLD.minScore) return SCORE_TIERS.GOLD;
    if (percentage >= SCORE_TIERS.SILVER.minScore) return SCORE_TIERS.SILVER;
    if (percentage >= SCORE_TIERS.BRONZE.minScore) return SCORE_TIERS.BRONZE;
    return SCORE_TIERS.FAIL;
  };

  const grade = getGrade();
  const percentage = Math.min(100, Math.round((scoreRef.current / 50) * 100));
  const canProgress = percentage >= SCORE_TIERS.BRONZE.minScore;

  if (showMatching && currentDinosaur) {
    const dinoInfo = DINOSAUR_TYPES[currentDinosaur.type];
    const isCorrect = showFeedback && (currentDinosaur.type === 'TREX' ? 'meat' : 'leaves');
    
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          maxWidth: '600px',
          width: '90%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '30px',
          }}>
            <h2 style={{
              fontSize: '36px',
              margin: 0,
              color: '#333',
            }}>
              What does {dinoInfo.name} eat? {dinoInfo.emoji}
            </h2>
            <button
              onClick={async () => {
                const questionText = `What does ${dinoInfo.name} eat?`;
                try {
                  await speak(questionText, { volume: 1.0, rate: 0.9, pitch: 1.0 });
                  
                  const waitForSpeech = () => {
                    return new Promise((resolve) => {
                      const checkInterval = setInterval(() => {
                        if (!isSpeaking()) {
                          clearInterval(checkInterval);
                          resolve();
                        }
                      }, 100);
                    });
                  };
                  
                  await waitForSpeech();
                  await new Promise(resolve => setTimeout(resolve, 300));
                  
                  await speak("Option A: Meat", { volume: 1.0, rate: 0.9, pitch: 1.0 });
                  await waitForSpeech();
                  await new Promise(resolve => setTimeout(resolve, 200));
                  
                  await speak("Option B: Leaves", { volume: 1.0, rate: 0.9, pitch: 1.0 });
                } catch (err) {
                  console.error('Error speaking question:', err);
                }
              }}
              style={{
                padding: '10px 15px',
                fontSize: '24px',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e0e0e0';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.transform = 'scale(1)';
              }}
              title="Read question aloud"
            >
              🔊
            </button>
          </div>
          
          <div style={{
            fontSize: '120px',
            marginBottom: '40px',
          }}>
            {currentDinosaur.emoji}
          </div>

          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={() => handleFoodSelect('meat')}
              disabled={showFeedback}
              style={{
                padding: '30px 50px',
                fontSize: '80px',
                border: showFeedback && isCorrect === 'meat' 
                  ? '6px solid #28a745' 
                  : showFeedback && isCorrect !== 'meat'
                  ? '6px solid #dc3545'
                  : '6px solid #ddd',
                borderRadius: '16px',
                cursor: showFeedback ? 'default' : 'pointer',
                backgroundColor: showFeedback && isCorrect === 'meat'
                  ? '#d4edda'
                  : showFeedback && isCorrect !== 'meat'
                  ? '#f8d7da'
                  : '#fff',
                transition: 'all 0.3s ease',
                minWidth: '200px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                if (!showFeedback) {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!showFeedback) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }
              }}
            >
              🥩
            </button>
            
            <button
              onClick={() => handleFoodSelect('leaves')}
              disabled={showFeedback}
              style={{
                padding: '30px 50px',
                fontSize: '80px',
                border: showFeedback && isCorrect === 'leaves'
                  ? '6px solid #28a745'
                  : showFeedback && isCorrect !== 'leaves'
                  ? '6px solid #dc3545'
                  : '6px solid #ddd',
                borderRadius: '16px',
                cursor: showFeedback ? 'default' : 'pointer',
                backgroundColor: showFeedback && isCorrect === 'leaves'
                  ? '#d4edda'
                  : showFeedback && isCorrect !== 'leaves'
                  ? '#f8d7da'
                  : '#fff',
                transition: 'all 0.3s ease',
                minWidth: '200px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                if (!showFeedback) {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!showFeedback) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }
              }}
            >
              🍃
            </button>
          </div>

          {showFeedback && (
            <div style={{
              marginBottom: '30px',
              padding: '20px',
              backgroundColor: isCorrect === (currentDinosaur.type === 'TREX' ? 'meat' : 'leaves')
                ? '#d4edda'
                : '#f8d7da',
              border: `4px solid ${isCorrect === (currentDinosaur.type === 'TREX' ? 'meat' : 'leaves')
                ? '#28a745'
                : '#dc3545'}`,
              borderRadius: '12px',
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: isCorrect === (currentDinosaur.type === 'TREX' ? 'meat' : 'leaves')
                  ? '#155724'
                  : '#721c24',
              }}>
                {isCorrect === (currentDinosaur.type === 'TREX' ? 'meat' : 'leaves')
                  ? '✅ Great job!'
                  : `❌ ${dinoInfo.name} eats ${dinoInfo.food}!`}
              </div>
            </div>
          )}

          <button
            onClick={handleMatchingNext}
            style={{
              padding: '20px 40px',
              fontSize: '24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 'bold',
              width: '100%',
            }}
          >
            Continue Game →
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '40px',
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px',
        }}>
          <h1 style={{ fontSize: '80px', marginBottom: '20px' }}>🎉</h1>
          <h2 style={{ marginBottom: '10px', fontSize: '32px', color: '#28a745' }}>Congratulations!</h2>
          <div style={{
            margin: '20px 0',
            padding: '20px',
            backgroundColor: SCORE_TIERS.GOLD.color,
            borderRadius: '8px',
            color: '#333',
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
              {SCORE_TIERS.GOLD.name} Medal
            </div>
            <div style={{ fontSize: '18px', marginBottom: '5px' }}>
              You collected {TARGET_FOODS} foods! 🦖🦕
            </div>
            <div style={{ fontSize: '18px', marginBottom: '5px' }}>
              Score: {scoreRef.current} points
            </div>
            <div style={{ fontSize: '18px' }}>
              Time: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginTop: '30px',
          }}>
            <button
              onClick={startGame}
              style={{
                padding: '12px 30px',
                fontSize: '18px',
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
                  padding: '12px 30px',
                  fontSize: '18px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Continue Learning →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '40px',
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px',
        }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🦕</h1>
          <h2 style={{ marginBottom: '10px', fontSize: '28px' }}>Game Over!</h2>
          <div style={{
            margin: '20px 0',
            padding: '20px',
            backgroundColor: grade.color,
            borderRadius: '8px',
            color: '#333',
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
              {grade.name} Medal
            </div>
            <div style={{ fontSize: '18px', marginBottom: '5px' }}>
              Score: {scoreRef.current} points
            </div>
            <div style={{ fontSize: '18px', marginBottom: '5px' }}>
              Matches: {correctMatches}
            </div>
            <div style={{ fontSize: '18px' }}>
              Time: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
            </div>
          </div>
          {!canProgress && (
            <div style={{
              marginTop: '15px',
              padding: '15px',
              backgroundColor: '#fff3cd',
              border: '2px solid #ffc107',
              borderRadius: '8px',
              color: '#856404',
            }}>
              ⚠️ You need at least 50% (Bronze) to progress. Try again!
            </div>
          )}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginTop: '30px',
          }}>
            <button
              onClick={startGame}
              style={{
                padding: '12px 30px',
                fontSize: '18px',
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
            {lesson && canProgress && (
              <button
                onClick={() => navigate(`/lessons?subjectId=${lesson.subjectId}`)}
                style={{
                  padding: '12px 30px',
                  fontSize: '18px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Continue Learning →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      minHeight: 0,
      overflow: 'hidden',
    }}>
      <div style={{
        textAlign: 'center',
        padding: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '800px',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '5px' }}>
          🦕 {lesson?.title || 'Dinosaur Game'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '16px', color: '#666' }}>
          <div><strong>Score:</strong> {scoreRef.current}</div>
          <div><strong>Foods:</strong> {correctMatches}/{TARGET_FOODS}</div>
          {timeStarted && (
            <div><strong>Time:</strong> {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</div>
          )}
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
          Arrow Keys / A/D: Move • SPACE: Jump • Collect dinosaurs 🦖🦕 and match them with food!
        </div>
      </div>
      <div 
        ref={canvasContainerRef}
        style={{
          flex: 1,
          minHeight: 0,
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{
            border: '3px solid #333',
            borderRadius: '8px',
            backgroundColor: '#87CEEB',
            cursor: 'pointer',
            transform: `scale(${canvasScale})`,
            transformOrigin: 'center center',
            width: '800px',
            height: '600px',
          }}
        />
      </div>
    </div>
  );
}

export default DinosaurGame;
