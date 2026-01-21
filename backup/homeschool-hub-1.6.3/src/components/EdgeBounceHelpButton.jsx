import React, { useState } from 'react';

/**
 * Edge Bounce Help Button Component
 * Shows a help button that explains how to build edge bounce with blocks
 */
function EdgeBounceHelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  const helpContent = `# How to Build Edge Bounce with Blocks

Since there's no built-in "edge bounce" block in Blockly Pond Tutor, you need to build it yourself using the available blocks.

## Blocks You'll Need

### From the **Pond** category:
- \`getX\` - Get current X position
- \`getY\` - Get current Y position  
- \`heading\` - Get current direction
- \`swim\` - Move in a direction

### From the **Logic** category:
- \`if\` - Conditional statements
- \`<\` (less than) - Comparison operator
- \`>\` (greater than) - Comparison operator

### From the **Math** category:
- Numbers (for threshold: 5, pond size: 100, angles: 180, 360)
- \`-\` (subtraction) - For calculating bounce angles

### From the **Loops** category:
- \`forever\` - Continuous loop to check edges repeatedly

### From the **Variables** category:
- Create variables: \`x\`, \`y\`, \`angle\`

## Basic Structure

1. Create a **forever** loop
2. Inside the loop:
   - Set \`x\` to \`getX\`
   - Set \`y\` to \`getY\`
   - Set \`angle\` to \`heading\`
3. Check each edge:
   - **Left edge:** if \`x < 5\`, set angle to \`180 - heading\`
   - **Right edge:** if \`x > 95\`, set angle to \`180 - heading\`
   - **Top edge:** if \`y < 5\`, set angle to \`360 - heading\`
   - **Bottom edge:** if \`y > 95\`, set angle to \`360 - heading\`
4. Finally, use \`swim(angle, 50)\` to move

## Tips

- The number **5** is the threshold (distance from edge to trigger bounce)
- The number **95** is calculated as 100 - 5 (pond size minus threshold)
- You can adjust the threshold to make the duck bounce earlier or later
- Start with just one edge check to test, then add the others`;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'absolute',
          top: '70px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
        title="Edge Bounce Help"
      >
        ❓
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              maxWidth: '700px',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '24px',
                color: '#333',
              }}>
                Edge Bounce Help
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f0f0f0';
                  e.target.style.color = '#333';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#666';
                }}
              >
                ×
              </button>
            </div>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#333',
            }}>
              {helpContent.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} style={{ fontSize: '24px', marginTop: '20px', marginBottom: '10px' }}>{line.substring(2)}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={index} style={{ fontSize: '20px', marginTop: '16px', marginBottom: '8px', color: '#007bff' }}>{line.substring(3)}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={index} style={{ fontSize: '18px', marginTop: '12px', marginBottom: '6px', color: '#28a745' }}>{line.substring(4)}</h3>;
                } else if (line.startsWith('- ')) {
                  return <div key={index} style={{ marginLeft: '20px', marginBottom: '8px' }}>• {line.substring(2)}</div>;
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} style={{ marginBottom: '12px' }}>{line}</p>;
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EdgeBounceHelpButton;
