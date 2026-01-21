import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataStore from '../store/dataStore';
import { Progress } from '../models/Progress';

function TypingMathGame({ lesson }) {
  const navigate = useNavigate();
  const addProgress = useDataStore(state => state.addProgress);
  const getNextProgressId = useDataStore(state => state.getNextProgressId);
  const getUserId = useDataStore(state => state.getUserId);
  const saveData = useDataStore(state => state.saveData);

  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [userRemainder, setUserRemainder] = useState(''); // For division with remainders
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showFeedback, setShowFeedback] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [problems, setProblems] = useState([]);
  const inputRef = React.useRef(null);
  const remainderInputRef = React.useRef(null);

  // Check if this is a unit conversion lesson
  const isUnitConversion = lesson?.title?.includes('Converting Units') || lesson?.title?.includes('Converting');
  
  // Check if this is a BODMAS/BIDMAS lesson
  const isBODMAS = lesson?.title?.includes('BODMAS') || lesson?.title?.includes('BIDMAS');
  
  // Check if this is a percentages of amounts lesson
  const isPercentagesOfAmounts = lesson?.title?.includes('Percentages of Amounts');
  
  // Check if this is an area lesson
  const isArea = lesson?.title?.includes('Area of Rectangles/Triangles') || lesson?.title?.includes('Area');
  
  // Check if this is an algebra/solving equations lesson
  const isAlgebra = lesson?.title?.includes('Algebra') || lesson?.title?.includes('Solving Equations');
  
  // Check if this is a word problems lesson
  const isWordProblems = lesson?.title?.includes('Word Problems') || lesson?.title?.includes('word problems');
  
  // Check for other specific lesson types
  const isAdditionRegrouping = lesson?.title?.includes('Addition with Regrouping');
  const isSubtractionRegrouping = lesson?.title?.includes('Subtraction with Regrouping');
  const isLongDivision = lesson?.title?.includes('Long Division');
  const isMultiplyingDecimals = lesson?.title?.includes('Multiplying Decimals');
  const isAddingSubtractingFractions = lesson?.title?.includes('Adding/Subtracting Fractions') || lesson?.title?.includes('Adding Fractions') || lesson?.title?.includes('Subtracting Fractions');
  const isDivisionRemainders = lesson?.title?.includes('Division with Remainders') || lesson?.title?.includes('Remainders');
  const isNumberPatterns = lesson?.title?.includes('Number Patterns') || lesson?.title?.includes('number patterns');

  // Generate BODMAS/BIDMAS problems
  const generateBODMASProblems = () => {
    const problems = [];
    
    // Helper function to evaluate expression following BODMAS
    const evaluateBODMAS = (expr) => {
      // Simple evaluator - in a real app you'd want a proper parser
      // For now, we'll generate problems where we know the answer
      return Function(`"use strict"; return (${expr})`)();
    };
    
    const bodmasExpressions = [
      // Without brackets - multiplication/division first
      { expr: '2 + 3 × 4', answer: 14 }, // 2 + 12 = 14
      { expr: '10 - 2 × 3', answer: 4 }, // 10 - 6 = 4
      { expr: '15 ÷ 3 + 4', answer: 9 }, // 5 + 4 = 9
      { expr: '8 - 12 ÷ 4', answer: 5 }, // 8 - 3 = 5
      { expr: '6 × 2 + 3', answer: 15 }, // 12 + 3 = 15
      // With brackets
      { expr: '(2 + 3) × 4', answer: 20 }, // 5 × 4 = 20
      { expr: '10 - (2 + 3)', answer: 5 }, // 10 - 5 = 5
      { expr: '(8 + 4) ÷ 2', answer: 6 }, // 12 ÷ 2 = 6
      { expr: '3 × (4 + 2)', answer: 18 }, // 3 × 6 = 18
      { expr: '(10 - 4) × 2', answer: 12 }, // 6 × 2 = 12
      // More complex
      { expr: '2 × 3 + 4 × 2', answer: 14 }, // 6 + 8 = 14
      { expr: '12 ÷ 3 + 2 × 3', answer: 10 }, // 4 + 6 = 10
      { expr: '(5 + 3) × (4 - 2)', answer: 16 }, // 8 × 2 = 16
      { expr: '20 - 3 × 4 + 2', answer: 10 }, // 20 - 12 + 2 = 10
      { expr: '15 ÷ 3 × 2 + 1', answer: 11 }, // 5 × 2 + 1 = 11
    ];
    
    // Select 5 random expressions
    const selected = [];
    const available = [...bodmasExpressions];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const item = available[randomIndex];
      // Replace × with * and ÷ with / for display, but keep original for answer calculation
      const displayExpr = item.expr.replace(/×/g, '×').replace(/÷/g, '÷');
      const calcExpr = item.expr.replace(/×/g, '*').replace(/÷/g, '/');
      const answer = evaluateBODMAS(calcExpr);
      
      selected.push({
        question: `${displayExpr} = ?`,
        answer: answer,
        type: 'bodmas',
        expression: item.expr,
      });
      available.splice(randomIndex, 1);
    }
    
    return selected;
  };

  // Generate percentages of amounts problems
  const generatePercentagesOfAmountsProblems = () => {
    const problems = [];
    
    const percentageProblems = [
      // 10% problems (divide by 10)
      { percentage: 10, amount: 50, answer: 5 },
      { percentage: 10, amount: 100, answer: 10 },
      { percentage: 10, amount: 80, answer: 8 },
      { percentage: 10, amount: 120, answer: 12 },
      { percentage: 10, amount: 200, answer: 20 },
      // 25% problems (divide by 4)
      { percentage: 25, amount: 80, answer: 20 },
      { percentage: 25, amount: 100, answer: 25 },
      { percentage: 25, amount: 60, answer: 15 },
      { percentage: 25, amount: 120, answer: 30 },
      // 50% problems (divide by 2)
      { percentage: 50, amount: 100, answer: 50 },
      { percentage: 50, amount: 80, answer: 40 },
      { percentage: 50, amount: 60, answer: 30 },
      { percentage: 50, amount: 120, answer: 60 },
      // 20% problems (10% × 2)
      { percentage: 20, amount: 60, answer: 12 },
      { percentage: 20, amount: 100, answer: 20 },
      { percentage: 20, amount: 80, answer: 16 },
      { percentage: 20, amount: 50, answer: 10 },
      // 15% problems (10% + 5%)
      { percentage: 15, amount: 40, answer: 6 },
      { percentage: 15, amount: 60, answer: 9 },
      { percentage: 15, amount: 100, answer: 15 },
      // 75% problems (3 × 25%)
      { percentage: 75, amount: 80, answer: 60 },
      { percentage: 75, amount: 100, answer: 75 },
      { percentage: 75, amount: 60, answer: 45 },
    ];
    
    // Select 5 random problems
    const selected = [];
    const available = [...percentageProblems];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const item = available[randomIndex];
      selected.push({
        question: `What is ${item.percentage}% of ${item.amount}?`,
        answer: item.answer,
        type: 'percentage-of-amount',
      });
      available.splice(randomIndex, 1);
    }
    
    return selected;
  };

  // Generate area problems
  const generateAreaProblems = () => {
    const problems = [];
    
    const areaProblems = [
      // Rectangle area problems
      { type: 'rectangle', length: 5, width: 3, answer: 15 },
      { type: 'rectangle', length: 8, width: 5, answer: 40 },
      { type: 'rectangle', length: 6, width: 4, answer: 24 },
      { type: 'rectangle', length: 10, width: 7, answer: 70 },
      { type: 'rectangle', length: 9, width: 6, answer: 54 },
      { type: 'rectangle', length: 12, width: 8, answer: 96 },
      // Triangle area problems
      { type: 'triangle', base: 6, height: 4, answer: 12 },
      { type: 'triangle', base: 10, height: 6, answer: 30 },
      { type: 'triangle', base: 8, height: 5, answer: 20 },
      { type: 'triangle', base: 12, height: 8, answer: 48 },
      { type: 'triangle', base: 9, height: 6, answer: 27 },
      { type: 'triangle', base: 14, height: 10, answer: 70 },
    ];
    
    // Select 5 random problems
    const selected = [];
    const available = [...areaProblems];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const item = available[randomIndex];
      let question;
      if (item.type === 'rectangle') {
        question = `What is the area of a rectangle with length ${item.length} and width ${item.width}?`;
      } else {
        question = `What is the area of a triangle with base ${item.base} and height ${item.height}?`;
      }
      selected.push({
        question: question,
        answer: item.answer,
        type: 'area',
      });
      available.splice(randomIndex, 1);
    }
    
    return selected;
  };

  // Generate addition with regrouping problems
  const generateAdditionRegroupingProblems = () => {
    const problems = [];
    
    // Pre-defined problems that require regrouping (carrying)
    const regroupingProblems = [
      // Ones column requires regrouping
      { num1: 25, num2: 17, answer: 42 }, // 5+7=12, carry 1
      { num1: 38, num2: 26, answer: 64 }, // 8+6=14, carry 1
      { num1: 47, num2: 35, answer: 82 }, // 7+5=12, carry 1
      { num1: 29, num2: 18, answer: 47 }, // 9+8=17, carry 1
      { num1: 56, num2: 27, answer: 83 }, // 6+7=13, carry 1
      { num1: 34, num2: 28, answer: 62 }, // 4+8=12, carry 1
      { num1: 48, num2: 39, answer: 87 }, // 8+9=17, carry 1
      { num1: 67, num2: 25, answer: 92 }, // 7+5=12, carry 1
      { num1: 19, num2: 16, answer: 35 }, // 9+6=15, carry 1
      { num1: 58, num2: 37, answer: 95 }, // 8+7=15, carry 1
      { num1: 46, num2: 28, answer: 74 }, // 6+8=14, carry 1
      { num1: 39, num2: 45, answer: 84 }, // 9+5=14, carry 1
    ];
    
    // Select 5 random problems
    const selected = [];
    const available = [...regroupingProblems];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const problem = available[randomIndex];
      selected.push({
        question: `${problem.num1} + ${problem.num2} = ?`,
        answer: problem.answer,
        type: 'addition-regrouping',
      });
      available.splice(randomIndex, 1);
    }
    
    return selected;
  };

  // Generate subtraction with regrouping problems
  const generateSubtractionRegroupingProblems = () => {
    const problems = [];
    
    // Pre-defined problems that require regrouping (borrowing)
    // The ones digit of num1 must be smaller than ones digit of num2
    const regroupingProblems = [
      { num1: 32, num2: 15, answer: 17 }, // 2 < 5, borrow from 3
      { num1: 45, num2: 28, answer: 17 }, // 5 < 8, borrow from 4
      { num1: 63, num2: 47, answer: 16 }, // 3 < 7, borrow from 6
      { num1: 51, num2: 24, answer: 27 }, // 1 < 4, borrow from 5
      { num1: 72, num2: 38, answer: 34 }, // 2 < 8, borrow from 7
      { num1: 84, num2: 57, answer: 27 }, // 4 < 7, borrow from 8
      { num1: 56, num2: 29, answer: 27 }, // 6 < 9, borrow from 5
      { num1: 43, num2: 16, answer: 27 }, // 3 < 6, borrow from 4
      { num1: 67, num2: 39, answer: 28 }, // 7 < 9, borrow from 6
      { num1: 81, num2: 45, answer: 36 }, // 1 < 5, borrow from 8
      { num1: 52, num2: 27, answer: 25 }, // 2 < 7, borrow from 5
      { num1: 74, num2: 48, answer: 26 }, // 4 < 8, borrow from 7
      { num1: 93, num2: 46, answer: 47 }, // 3 < 6, borrow from 9
      { num1: 35, num2: 18, answer: 17 }, // 5 < 8, borrow from 3
      { num1: 61, num2: 34, answer: 27 }, // 1 < 4, borrow from 6
    ];
    
    // Select 5 random problems
    const selected = [];
    const available = [...regroupingProblems];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const problem = available[randomIndex];
      selected.push({
        question: `${problem.num1} - ${problem.num2} = ?`,
        answer: problem.answer,
        type: 'subtraction-regrouping',
      });
      available.splice(randomIndex, 1);
    }
    
    return selected;
  };

  // Generate long division problems
  const generateLongDivisionProblems = () => {
    const problems = [];
    const divisions = [
      { dividend: 60, divisor: 4, answer: 15 },
      { dividend: 72, divisor: 6, answer: 12 },
      { dividend: 84, divisor: 7, answer: 12 },
      { dividend: 96, divisor: 8, answer: 12 },
      { dividend: 54, divisor: 3, answer: 18 },
      { dividend: 81, divisor: 9, answer: 9 },
      { dividend: 64, divisor: 4, answer: 16 },
      { dividend: 90, divisor: 5, answer: 18 },
    ];
    const selected = [];
    const available = [...divisions];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const div = available[randomIndex];
      selected.push({
        question: `${div.dividend} ÷ ${div.divisor} = ?`,
        answer: div.answer,
        type: 'long-division',
      });
      available.splice(randomIndex, 1);
    }
    return selected;
  };

  // Generate multiplying decimals problems
  const generateMultiplyingDecimalsProblems = () => {
    const problems = [];
    const multiplications = [
      { num1: 2.5, num2: 3, answer: 7.5 },
      { num1: 1.2, num2: 4, answer: 4.8 },
      { num1: 0.5, num2: 0.3, answer: 0.15 },
      { num1: 3.4, num2: 2, answer: 6.8 },
      { num1: 1.5, num2: 6, answer: 9 },
      { num1: 2.3, num2: 4, answer: 9.2 },
      { num1: 0.8, num2: 5, answer: 4 },
      { num1: 1.25, num2: 4, answer: 5 },
    ];
    const selected = [];
    const available = [...multiplications];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const mult = available[randomIndex];
      selected.push({
        question: `${mult.num1} × ${mult.num2} = ?`,
        answer: mult.answer,
        type: 'multiplying-decimals',
      });
      available.splice(randomIndex, 1);
    }
    return selected;
  };

  // Generate adding/subtracting fractions problems
  const generateAddingSubtractingFractionsProblems = () => {
    const problems = [];
    const fractionProblems = [
      { question: '1/4 + 2/4 = ?', answer: '3/4', type: 'fraction-addition' },
      { question: '2/5 + 1/5 = ?', answer: '3/5', type: 'fraction-addition' },
      { question: '3/4 - 1/4 = ?', answer: '1/2', type: 'fraction-subtraction' },
      { question: '5/6 - 1/6 = ?', answer: '2/3', type: 'fraction-subtraction' },
      { question: '1/3 + 1/6 = ?', answer: '1/2', type: 'fraction-addition' },
      { question: '2/3 - 1/6 = ?', answer: '1/2', type: 'fraction-subtraction' },
      { question: '3/5 + 1/5 = ?', answer: '4/5', type: 'fraction-addition' },
      { question: '4/5 - 2/5 = ?', answer: '2/5', type: 'fraction-subtraction' },
    ];
    const selected = [];
    const available = [...fractionProblems];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      selected.push(available[randomIndex]);
      available.splice(randomIndex, 1);
    }
    return selected;
  };

  // Generate division with remainders problems
  const generateDivisionRemaindersProblems = () => {
    const problems = [];
    const divisions = [
      { dividend: 17, divisor: 5, answer: 3, remainder: 2 },
      { dividend: 23, divisor: 4, answer: 5, remainder: 3 },
      { dividend: 19, divisor: 6, answer: 3, remainder: 1 },
      { dividend: 29, divisor: 7, answer: 4, remainder: 1 },
      { dividend: 31, divisor: 5, answer: 6, remainder: 1 },
      { dividend: 25, divisor: 6, answer: 4, remainder: 1 },
      { dividend: 22, divisor: 5, answer: 4, remainder: 2 },
      { dividend: 28, divisor: 6, answer: 4, remainder: 4 },
    ];
    const selected = [];
    const available = [...divisions];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const div = available[randomIndex];
      selected.push({
        question: `${div.dividend} ÷ ${div.divisor} = ?`,
        answer: div.answer,
        remainder: div.remainder,
        type: 'division-remainders',
      });
      available.splice(randomIndex, 1);
    }
    return selected;
  };

  // Generate number pattern problems
  const generateNumberPatternProblems = () => {
    const problems = [];
    
    // Various pattern types for Year 2
    const patternProblems = [
      // Addition patterns
      { sequence: [2, 4, 6, 8], answer: 10, question: '2, 4, 6, 8, ?', type: 'addition', step: 2 },
      { sequence: [5, 10, 15, 20], answer: 25, question: '5, 10, 15, 20, ?', type: 'addition', step: 5 },
      { sequence: [3, 6, 9, 12], answer: 15, question: '3, 6, 9, 12, ?', type: 'addition', step: 3 },
      { sequence: [1, 3, 5, 7], answer: 9, question: '1, 3, 5, 7, ?', type: 'addition', step: 2 },
      { sequence: [4, 8, 12, 16], answer: 20, question: '4, 8, 12, 16, ?', type: 'addition', step: 4 },
      // Subtraction patterns
      { sequence: [10, 9, 8, 7], answer: 6, question: '10, 9, 8, 7, ?', type: 'subtraction', step: 1 },
      { sequence: [20, 18, 16, 14], answer: 12, question: '20, 18, 16, 14, ?', type: 'subtraction', step: 2 },
      { sequence: [15, 12, 9, 6], answer: 3, question: '15, 12, 9, 6, ?', type: 'subtraction', step: 3 },
      { sequence: [25, 20, 15, 10], answer: 5, question: '25, 20, 15, 10, ?', type: 'subtraction', step: 5 },
      // Patterns with missing number in middle
      { sequence: [2, 4, 6, 8, 10], answer: 6, question: '2, 4, ?, 8, 10', type: 'addition', step: 2, missingIndex: 2 },
      { sequence: [5, 10, 15, 20, 25], answer: 15, question: '5, 10, ?, 20, 25', type: 'addition', step: 5, missingIndex: 2 },
      { sequence: [10, 9, 8, 7, 6], answer: 8, question: '10, 9, ?, 7, 6', type: 'subtraction', step: 1, missingIndex: 2 },
    ];
    
    // Select 5 random problems
    const selected = [];
    const available = [...patternProblems];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      selected.push(available[randomIndex]);
      available.splice(randomIndex, 1);
    }
    
    return selected;
  };

  // Generate word problems
  const generateWordProblems = () => {
    const problems = [];
    
    // Year 3: Addition/Subtraction word problems
    const wordProblems = [
      // Addition problems
      { question: 'Sarah has 15 stickers. She gets 8 more. How many stickers does she have now?', answer: 23, type: 'addition' },
      { question: 'Tom has 12 toys. His friend gives him 7 more. How many toys does Tom have?', answer: 19, type: 'addition' },
      { question: 'There are 9 birds on a tree. 6 more birds join them. How many birds are there now?', answer: 15, type: 'addition' },
      { question: 'Emma has 14 pencils. She buys 9 more. How many pencils does she have?', answer: 23, type: 'addition' },
      { question: 'A shop has 18 apples. They get 5 more. How many apples are there?', answer: 23, type: 'addition' },
      // Subtraction problems
      { question: 'Tom has 20 toys. He gives away 7. How many toys are left?', answer: 13, type: 'subtraction' },
      { question: 'There are 16 cookies. The children eat 8. How many cookies are left?', answer: 8, type: 'subtraction' },
      { question: 'Lisa has 19 stickers. She uses 6. How many stickers does she have left?', answer: 13, type: 'subtraction' },
      { question: 'A box has 15 books. 9 books are taken out. How many books are left?', answer: 6, type: 'subtraction' },
      { question: 'There are 17 flowers. 8 flowers are picked. How many flowers remain?', answer: 9, type: 'subtraction' },
      // Year 6: Multi-step word problems
      { question: 'Sarah has 24 stickers. She gives away 8. Then she gets 12 more. How many does she have now?', answer: 28, type: 'multi-step' },
      { question: 'Tom has 30 sweets. He eats 10. Then he buys 15 more. How many sweets does he have?', answer: 35, type: 'multi-step' },
      { question: 'A box has 20 apples. 6 are eaten. Then 8 more are added. How many apples are there?', answer: 22, type: 'multi-step' },
      { question: 'Emma has 25 books. She gives 7 away. Then she gets 5 more. How many books does she have?', answer: 23, type: 'multi-step' },
      { question: 'There are 18 birds. 5 fly away. Then 9 more arrive. How many birds are there?', answer: 22, type: 'multi-step' },
    ];
    
    // Select 5 random problems
    const selected = [];
    const available = [...wordProblems];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      selected.push(available[randomIndex]);
      available.splice(randomIndex, 1);
    }
    
    return selected;
  };

  // Generate algebra equation problems
  const generateAlgebraProblems = () => {
    const problems = [];
    
    // Generate various types of equations
    const equationTypes = [
      // Addition equations: x + a = b → x = b - a
      { type: 'addition', a: 5, b: 10, answer: 5, variable: 'x' },
      { type: 'addition', a: 3, b: 12, answer: 9, variable: 'x' },
      { type: 'addition', a: 7, b: 15, answer: 8, variable: 'x' },
      { type: 'addition', a: 4, b: 11, answer: 7, variable: 'y' },
      { type: 'addition', a: 6, b: 14, answer: 8, variable: 'y' },
      { type: 'addition', a: 8, b: 20, answer: 12, variable: 'z' },
      // Subtraction equations: x - a = b → x = b + a
      { type: 'subtraction', a: 3, b: 7, answer: 10, variable: 'x' },
      { type: 'subtraction', a: 5, b: 8, answer: 13, variable: 'x' },
      { type: 'subtraction', a: 4, b: 6, answer: 10, variable: 'y' },
      { type: 'subtraction', a: 7, b: 5, answer: 12, variable: 'y' },
      { type: 'subtraction', a: 2, b: 9, answer: 11, variable: 'z' },
      // Multiplication equations: ax = b → x = b / a
      { type: 'multiplication', a: 2, b: 8, answer: 4, variable: 'x' },
      { type: 'multiplication', a: 3, b: 12, answer: 4, variable: 'x' },
      { type: 'multiplication', a: 4, b: 16, answer: 4, variable: 'y' },
      { type: 'multiplication', a: 5, b: 20, answer: 4, variable: 'y' },
      { type: 'multiplication', a: 2, b: 14, answer: 7, variable: 'z' },
      { type: 'multiplication', a: 3, b: 15, answer: 5, variable: 'z' },
      // Division equations: x / a = b → x = b × a
      { type: 'division', a: 2, b: 5, answer: 10, variable: 'x' },
      { type: 'division', a: 3, b: 4, answer: 12, variable: 'x' },
      { type: 'division', a: 4, b: 3, answer: 12, variable: 'y' },
      { type: 'division', a: 5, b: 2, answer: 10, variable: 'y' },
      { type: 'division', a: 2, b: 6, answer: 12, variable: 'z' },
    ];
    
    // Select 5 random equations
    const selected = [];
    const available = [...equationTypes];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const eq = available[randomIndex];
      let question;
      
      if (eq.type === 'addition') {
        question = `${eq.variable} + ${eq.a} = ${eq.b}`;
      } else if (eq.type === 'subtraction') {
        question = `${eq.variable} - ${eq.a} = ${eq.b}`;
      } else if (eq.type === 'multiplication') {
        question = `${eq.a}${eq.variable} = ${eq.b}`;
      } else if (eq.type === 'division') {
        question = `${eq.variable} ÷ ${eq.a} = ${eq.b}`;
      }
      
      selected.push({
        question: `${question}. Find ${eq.variable}:`,
        answer: eq.answer,
        type: 'algebra',
        variable: eq.variable,
      });
      available.splice(randomIndex, 1);
    }
    
    return selected;
  };

  // Generate unit conversion problems
  const generateUnitConversionProblems = () => {
    const problems = [];
    const conversions = [
      // Length conversions - smaller to larger (divide)
      { from: 'mm', to: 'cm', factor: 10, fromValue: 50 },
      { from: 'cm', to: 'm', factor: 100, fromValue: 200 },
      { from: 'm', to: 'km', factor: 1000, fromValue: 3000 },
      { from: 'cm', to: 'm', factor: 100, fromValue: 500 },
      { from: 'mm', to: 'cm', factor: 10, fromValue: 30 },
      // Length conversions - larger to smaller (multiply)
      { from: 'cm', to: 'mm', factor: 10, fromValue: 5, multiply: true },
      { from: 'm', to: 'cm', factor: 100, fromValue: 3, multiply: true },
      { from: 'km', to: 'm', factor: 1000, fromValue: 2, multiply: true },
      // Mass conversions
      { from: 'g', to: 'kg', factor: 1000, fromValue: 2000 },
      { from: 'kg', to: 'g', factor: 1000, fromValue: 4, multiply: true },
      // Capacity conversions
      { from: 'mL', to: 'L', factor: 1000, fromValue: 1500 },
      { from: 'L', to: 'mL', factor: 1000, fromValue: 2, multiply: true },
    ];
    
    // Select 5 random conversions
    const selected = [];
    const available = [...conversions];
    while (selected.length < 5 && available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      const conv = available[randomIndex];
      const answer = conv.multiply ? conv.fromValue * conv.factor : conv.fromValue / conv.factor;
      const question = `${conv.fromValue} ${conv.from} = ? ${conv.to}`;
      selected.push({
        question: question,
        answer: answer,
        type: 'unit-conversion',
      });
      available.splice(randomIndex, 1);
    }
    
    return selected;
  };

  // Basic math problems (fallback)
  const basicProblems = [
    { question: '5 + 3 = ?', answer: 8, type: 'addition' },
    { question: '12 - 4 = ?', answer: 8, type: 'subtraction' },
    { question: '6 × 2 = ?', answer: 12, type: 'multiplication' },
    { question: '15 ÷ 3 = ?', answer: 5, type: 'division' },
    { question: '7 + 9 = ?', answer: 16, type: 'addition' },
  ];

  // Initialize problems when lesson changes
  useEffect(() => {
    const isUnitConversionLesson = lesson?.title?.includes('Converting Units') || lesson?.title?.includes('Converting');
    const isBODMASLesson = lesson?.title?.includes('BODMAS') || lesson?.title?.includes('BIDMAS');
    const isPercentagesOfAmountsLesson = lesson?.title?.includes('Percentages of Amounts');
    const isAreaLesson = lesson?.title?.includes('Area of Rectangles/Triangles') || lesson?.title?.includes('Area');
    const isAlgebraLesson = lesson?.title?.includes('Algebra') || lesson?.title?.includes('Solving Equations');
    const isWordProblemsLesson = lesson?.title?.includes('Word Problems') || lesson?.title?.includes('word problems');
    const isAdditionRegroupingLesson = lesson?.title?.includes('Addition with Regrouping');
    const isSubtractionRegroupingLesson = lesson?.title?.includes('Subtraction with Regrouping');
    const isLongDivisionLesson = lesson?.title?.includes('Long Division');
    const isMultiplyingDecimalsLesson = lesson?.title?.includes('Multiplying Decimals');
    const isAddingSubtractingFractionsLesson = lesson?.title?.includes('Adding/Subtracting Fractions') || lesson?.title?.includes('Adding Fractions') || lesson?.title?.includes('Subtracting Fractions');
    const isDivisionRemaindersLesson = lesson?.title?.includes('Division with Remainders') || lesson?.title?.includes('Remainders');
    const isNumberPatternsLesson = lesson?.title?.includes('Number Patterns') || lesson?.title?.includes('number patterns');
    let currentProblems;
    if (isNumberPatternsLesson) {
      currentProblems = generateNumberPatternProblems();
    } else if (isDivisionRemaindersLesson) {
      currentProblems = generateDivisionRemaindersProblems();
    } else if (isAddingSubtractingFractionsLesson) {
      currentProblems = generateAddingSubtractingFractionsProblems();
    } else if (isMultiplyingDecimalsLesson) {
      currentProblems = generateMultiplyingDecimalsProblems();
    } else if (isLongDivisionLesson) {
      currentProblems = generateLongDivisionProblems();
    } else if (isSubtractionRegroupingLesson) {
      currentProblems = generateSubtractionRegroupingProblems();
    } else if (isAdditionRegroupingLesson) {
      currentProblems = generateAdditionRegroupingProblems();
    } else if (isWordProblemsLesson) {
      currentProblems = generateWordProblems();
    } else if (isAlgebraLesson) {
      currentProblems = generateAlgebraProblems();
    } else if (isAreaLesson) {
      currentProblems = generateAreaProblems();
    } else if (isPercentagesOfAmountsLesson) {
      currentProblems = generatePercentagesOfAmountsProblems();
    } else if (isBODMASLesson) {
      currentProblems = generateBODMASProblems();
    } else if (isUnitConversionLesson) {
      currentProblems = generateUnitConversionProblems();
    } else {
      currentProblems = basicProblems;
    }
    setProblems(currentProblems);
    setLevel(1);
    setScore(0);
  }, [lesson?.title]);

  // Update current problem when level changes
  useEffect(() => {
    if (problems.length > 0) {
      const problem = problems[level - 1] || problems[0];
      setCurrentProblem(problem);
      setUserAnswer('');
      setUserRemainder('');
      setShowFeedback(null);
      setAttempts(0);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [level, problems]);

  const handleSubmit = () => {
    if (!currentProblem) return;
    // Handle different answer types
    let isCorrect = false;
    if (currentProblem.type === 'fraction-addition' || currentProblem.type === 'fraction-subtraction') {
      // For fraction answers, compare as strings
      isCorrect = userAnswer.trim().toLowerCase() === currentProblem.answer.toLowerCase();
    } else if (currentProblem.type === 'division-remainders') {
      // For division with remainders, check both answer and remainder
      const answerNum = parseInt(userAnswer);
      const remainderNum = parseInt(userRemainder);
      isCorrect = answerNum === currentProblem.answer && remainderNum === currentProblem.remainder;
    } else {
      const answer = parseFloat(userAnswer);
      const correctAnswer = typeof currentProblem.answer === 'number' ? currentProblem.answer : parseFloat(currentProblem.answer);
      // For BODMAS and algebra, answers should be exact (usually integers)
      // For unit conversions and decimals, allow small floating point differences
      isCorrect = (isBODMAS || isAlgebra || isLongDivision)
        ? Math.abs(answer - correctAnswer) < 0.001
        : Math.abs(answer - correctAnswer) < 0.01;
    }
    setAttempts(prev => prev + 1);
    setShowFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setScore(prev => prev + 10);
      setTimeout(() => {
        if (level < problems.length) {
          setLevel(prev => prev + 1);
        } else {
          completeLesson();
        }
      }, 1500);
    } else if (attempts >= 2) {
      setTimeout(() => {
        if (level < problems.length) {
          setLevel(prev => prev + 1);
        } else {
          completeLesson();
        }
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const completeLesson = async () => {
    if (lesson) {
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
        score: score + 50,
      });
      await addProgress(progress);
      saveData();
    }
  };

  if (!currentProblem) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>
          {isNumberPatterns ? 'Number Patterns' : isWordProblems ? 'Word Problems' : isAlgebra ? 'Algebra: Solving Equations' : isArea ? 'Area Game' : isPercentagesOfAmounts ? 'Percentages of Amounts Game' : isBODMAS ? 'BODMAS Game' : isUnitConversion ? 'Unit Conversion Game' : isAdditionRegrouping ? 'Addition with Regrouping' : isSubtractionRegrouping ? 'Subtraction with Regrouping' : isLongDivision ? 'Long Division' : isMultiplyingDecimals ? 'Multiplying Decimals' : isAddingSubtractingFractions ? 'Adding/Subtracting Fractions' : isDivisionRemainders ? 'Division with Remainders' : 'Math Typing Game'}
        </h2>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>
          Level: {level} / {problems.length || 5} | Score: {score}
        </div>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#2196F3', marginBottom: '30px' }}>
          {currentProblem.question}
        </div>
        {isDivisionRemainders && (
          <div style={{ fontSize: '20px', color: '#666', marginTop: '10px' }}>
            Enter the answer and remainder below
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '500px' }}>
        {isDivisionRemainders ? (
          // Two inputs for division with remainders
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Answer:</label>
              <input
                ref={inputRef}
                type="number"
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  setShowFeedback(null);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    remainderInputRef.current?.focus();
                  }
                }}
                style={{
                  fontSize: '48px',
                  padding: '20px',
                  width: '200px',
                  textAlign: 'center',
                  border: `4px solid ${showFeedback === 'correct' ? '#28a745' : showFeedback === 'incorrect' ? '#dc3545' : '#2196F3'}`,
                  borderRadius: '15px',
                  fontWeight: 'bold',
                }}
                autoFocus
                placeholder="?"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Remainder:</label>
              <input
                ref={remainderInputRef}
                type="number"
                value={userRemainder}
                onChange={(e) => {
                  setUserRemainder(e.target.value);
                  setShowFeedback(null);
                }}
                onKeyPress={handleKeyPress}
                style={{
                  fontSize: '48px',
                  padding: '20px',
                  width: '200px',
                  textAlign: 'center',
                  border: `4px solid ${showFeedback === 'correct' ? '#28a745' : showFeedback === 'incorrect' ? '#dc3545' : '#2196F3'}`,
                  borderRadius: '15px',
                  fontWeight: 'bold',
                }}
                placeholder="?"
              />
            </div>
          </div>
        ) : (
          // Single input for other problems
          <input
            ref={inputRef}
            type="number"
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
              setShowFeedback(null);
            }}
            onKeyPress={handleKeyPress}
            style={{
              fontSize: '48px',
              padding: '20px',
              width: '200px',
              textAlign: 'center',
              border: `4px solid ${showFeedback === 'correct' ? '#28a745' : showFeedback === 'incorrect' ? '#dc3545' : '#2196F3'}`,
              borderRadius: '15px',
              fontWeight: 'bold',
            }}
            autoFocus
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={showFeedback === 'correct'}
          style={{
            padding: '20px 50px',
            fontSize: '24px',
            fontWeight: 'bold',
            backgroundColor: showFeedback === 'correct' ? '#28a745' : '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            cursor: showFeedback === 'correct' ? 'default' : 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          }}
        >
          {showFeedback === 'correct' ? '✓ Correct!' : 'Submit Answer'}
        </button>

        {showFeedback === 'incorrect' && (
          <div style={{
            fontSize: '24px',
            color: '#dc3545',
            fontWeight: 'bold',
            padding: '15px',
            backgroundColor: '#f8d7da',
            borderRadius: '10px',
            width: '100%',
            textAlign: 'center',
          }}>
            Try again! {isDivisionRemainders 
              ? `The answer is ${currentProblem.answer} with remainder ${currentProblem.remainder}`
              : `The answer is ${currentProblem.answer}`}
          </div>
        )}

        {attempts > 0 && (
          <div style={{ fontSize: '18px', color: '#666' }}>
            Attempts: {attempts} / 3
          </div>
        )}
      </div>
    </div>
  );
}

export default TypingMathGame;
