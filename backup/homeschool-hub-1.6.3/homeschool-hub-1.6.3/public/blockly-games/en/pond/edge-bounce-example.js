/**
 * Edge Bounce Example for Blockly Pond Level 7
 * 
 * This file contains example implementations of edge bounce behavior.
 * Copy and paste the code into your Blockly Pond code editor.
 */

// ============================================================================
// EXAMPLE 1: Simple Edge Bounce with Helper Function
// ============================================================================
// Copy the edgeBounce() function from edge-bounce-helper.js first, then use:

/*
var speed = 50;
var threshold = 5;

while (true) {
  var currentAngle = heading();
  var newAngle = edgeBounce(threshold, currentAngle);
  swim(newAngle, speed);
}
*/

// ============================================================================
// EXAMPLE 2: Edge Bounce with Automatic Swimming
// ============================================================================
// Copy the edgeBounceAndSwim() function from edge-bounce-helper.js first, then use:

/*
var speed = 50;
var threshold = 5;

while (true) {
  edgeBounceAndSwim(threshold, speed);
}
*/

// ============================================================================
// EXAMPLE 3: Complete Standalone Implementation (No Helper Functions Needed)
// ============================================================================
// This is a complete, self-contained solution you can copy directly:

/*
var threshold = 5;  // Distance from edge to trigger bounce
var speed = 50;     // Swimming speed
var pondSize = 100; // Pond dimensions (100x100)

while (true) {
  var x = getX();
  var y = getY();
  var currentAngle = heading();
  var newAngle = currentAngle;
  
  // Check proximity to left edge
  if (x < threshold) {
    // Bounce away from left - move rightward
    if (currentAngle > 90 && currentAngle < 270) {
      newAngle = 180 - currentAngle; // Reverse horizontal direction
    } else {
      newAngle = Math.random() * 90 + 45; // Random angle pointing right (45-135)
    }
  }
  // Check proximity to right edge
  else if (x > pondSize - threshold) {
    // Bounce away from right - move leftward
    if (currentAngle < 90 || currentAngle > 270) {
      newAngle = 180 - currentAngle; // Reverse horizontal direction
    } else {
      newAngle = Math.random() * 90 + 225; // Random angle pointing left (225-315)
    }
  }
  
  // Check proximity to top edge
  if (y < threshold) {
    // Bounce away from top - move downward
    if (currentAngle < 90 || currentAngle > 270) {
      newAngle = 360 - currentAngle; // Reverse vertical direction
    } else {
      newAngle = Math.random() * 90 + 135; // Random angle pointing down (135-225)
    }
  }
  // Check proximity to bottom edge
  else if (y > pondSize - threshold) {
    // Bounce away from bottom - move upward
    if (currentAngle > 90 && currentAngle < 270) {
      newAngle = 360 - currentAngle; // Reverse vertical direction
    } else {
      var rand = Math.random() * 90;
      newAngle = rand < 45 ? rand : 360 - (rand - 45); // Random angle pointing up
    }
  }
  
  swim(newAngle, speed);
}
*/

// ============================================================================
// EXAMPLE 4: Edge Bounce with Smooth Reflection (Physics-based)
// ============================================================================
// This version uses proper angle reflection for more realistic bouncing:

/*
var threshold = 5;
var speed = 50;
var pondSize = 100;

while (true) {
  var x = getX();
  var y = getY();
  var angle = heading();
  
  // Check left edge
  if (x < threshold) {
    // Reflect angle off vertical wall (left edge)
    angle = 180 - angle;
  }
  // Check right edge
  else if (x > pondSize - threshold) {
    // Reflect angle off vertical wall (right edge)
    angle = 180 - angle;
  }
  
  // Check top edge
  if (y < threshold) {
    // Reflect angle off horizontal wall (top edge)
    angle = 360 - angle;
  }
  // Check bottom edge
  else if (y > pondSize - threshold) {
    // Reflect angle off horizontal wall (bottom edge)
    angle = 360 - angle;
  }
  
  swim(angle, speed);
}
*/

// ============================================================================
// EXAMPLE 5: Edge Bounce with Corner Handling
// ============================================================================
// This version handles corners more intelligently:

/*
var threshold = 5;
var speed = 50;
var pondSize = 100;

while (true) {
  var x = getX();
  var y = getY();
  var angle = heading();
  
  // Check if in corner (near two edges simultaneously)
  var nearLeft = x < threshold;
  var nearRight = x > pondSize - threshold;
  var nearTop = y < threshold;
  var nearBottom = y > pondSize - threshold;
  
  if (nearLeft && nearTop) {
    // Top-left corner - move toward bottom-right
    angle = Math.random() * 90 + 45; // 45-135 degrees
  } else if (nearRight && nearTop) {
    // Top-right corner - move toward bottom-left
    angle = Math.random() * 90 + 135; // 135-225 degrees
  } else if (nearLeft && nearBottom) {
    // Bottom-left corner - move toward top-right
    angle = Math.random() * 90 + 315; // 315-45 degrees (wraps around)
    if (angle >= 360) angle -= 360;
  } else if (nearRight && nearBottom) {
    // Bottom-right corner - move toward top-left
    angle = Math.random() * 90 + 225; // 225-315 degrees
  } else if (nearLeft) {
    // Left edge only
    angle = 180 - angle;
  } else if (nearRight) {
    // Right edge only
    angle = 180 - angle;
  } else if (nearTop) {
    // Top edge only
    angle = 360 - angle;
  } else if (nearBottom) {
    // Bottom edge only
    angle = 360 - angle;
  }
  
  swim(angle, speed);
}
*/
