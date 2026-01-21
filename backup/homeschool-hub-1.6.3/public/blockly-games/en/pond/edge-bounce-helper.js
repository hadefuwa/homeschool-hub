/**
 * Edge Bounce Helper for Blockly Pond Level 7
 * 
 * This helper function provides an easy way to implement edge bounce behavior
 * in Blockly Pond. When your duck approaches the edges of the pond (100x100 units),
 * it will automatically bounce away from the edge.
 * 
 * Usage:
 *   Copy the edgeBounce() function into your Blockly Pond code editor,
 *   then call it in your main loop.
 */

/**
 * Checks if the duck is near an edge and adjusts the direction to bounce away.
 * 
 * @param {number} threshold - Distance from edge to trigger bounce (default: 5)
 * @param {number} currentAngle - Current swimming angle in degrees (0-360)
 * @returns {number} New angle to swim at (bounced away from edge)
 */
function edgeBounce(threshold, currentAngle) {
  threshold = threshold || 5; // Default threshold of 5 units from edge
  currentAngle = currentAngle || heading(); // Use current heading if not provided
  
  var x = getX();
  var y = getY();
  var pondSize = 100;
  var newAngle = currentAngle;
  
  // Check proximity to left edge
  if (x < threshold) {
    // Bounce away from left edge - move rightward (0 to 90 or 270 to 360 degrees)
    if (currentAngle > 90 && currentAngle < 270) {
      // Currently moving left, bounce right
      newAngle = 180 - currentAngle;
    } else {
      // Random angle pointing right
      newAngle = Math.random() * 90 + 45; // 45 to 135 degrees
    }
  }
  // Check proximity to right edge
  else if (x > pondSize - threshold) {
    // Bounce away from right edge - move leftward (90 to 270 degrees)
    if (currentAngle < 90 || currentAngle > 270) {
      // Currently moving right, bounce left
      newAngle = 180 - currentAngle;
    } else {
      // Random angle pointing left
      newAngle = Math.random() * 90 + 225; // 225 to 315 degrees
    }
  }
  
  // Check proximity to top edge
  if (y < threshold) {
    // Bounce away from top edge - move downward (90 to 270 degrees)
    if (currentAngle < 90 || currentAngle > 270) {
      // Currently moving up, bounce down
      newAngle = 360 - currentAngle;
    } else {
      // Random angle pointing down
      newAngle = Math.random() * 90 + 135; // 135 to 225 degrees
    }
  }
  // Check proximity to bottom edge
  else if (y > pondSize - threshold) {
    // Bounce away from bottom edge - move upward (270 to 90 degrees)
    if (currentAngle > 90 && currentAngle < 270) {
      // Currently moving down, bounce up
      newAngle = 360 - currentAngle;
    } else {
      // Random angle pointing up
      var rand = Math.random() * 90;
      newAngle = rand < 45 ? rand : 360 - (rand - 45); // 0-45 or 315-360 degrees
    }
  }
  
  // Normalize angle to 0-360 range
  while (newAngle < 0) newAngle += 360;
  while (newAngle >= 360) newAngle -= 360;
  
  return newAngle;
}

/**
 * Simplified edge bounce that automatically swims away from edges.
 * This version handles both detection and movement.
 * 
 * @param {number} threshold - Distance from edge to trigger bounce (default: 5)
 * @param {number} speed - Swimming speed (default: 50)
 */
function edgeBounceAndSwim(threshold, speed) {
  threshold = threshold || 5;
  speed = speed || 50;
  
  var angle = edgeBounce(threshold, heading());
  swim(angle, speed);
}

/**
 * Complete edge bounce implementation with continuous movement.
 * Use this in your main game loop.
 * 
 * Example usage:
 *   while (true) {
 *     edgeBounceLoop(5, 50);
 *   }
 * 
 * @param {number} threshold - Distance from edge to trigger bounce (default: 5)
 * @param {number} speed - Swimming speed (default: 50)
 */
function edgeBounceLoop(threshold, speed) {
  edgeBounceAndSwim(threshold, speed);
}
