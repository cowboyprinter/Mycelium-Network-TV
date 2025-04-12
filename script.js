const canvas = document.getElementById('tvCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let currentChannel = 0;
let frameCount = 0; // Simple counter for animation timing

// --- TV Geometry ---
// Define the screen area within the canvas (where content is clipped)
const screenRect = {
    x: 100,
    y: 150,
    width: 600,
    height: 450,
    cornerRadius: 30 // For a slightly rounded screen
};

// Define the outer frame geometry based on the screen
const frameThickness = 40;
const frameOuterRect = {
    x: screenRect.x - frameThickness,
    y: screenRect.y - frameThickness,
    width: screenRect.width + 2 * frameThickness,
    height: screenRect.height + 2 * frameThickness,
    cornerRadius: screenRect.cornerRadius + frameThickness / 2
};

// --- Channel Definitions ---
const channels = [
    // Channel 0: News
    {
        name: "The Portabella Reporter",
        draw: (ctx, rect, time) => {
            ctx.fillStyle = '#c0c0c0'; // Grey background
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

            // Draw Mushroom Anchor (Simplified)
            const anchorX = rect.x + rect.width * 0.5;
            const anchorY = rect.y + rect.height * 0.6;
            // Stem
            ctx.fillStyle = '#d2b48c'; // Tan
            ctx.fillRect(anchorX - 25, anchorY - 50, 50, 100);
            // Cap
            ctx.fillStyle = '#8b4513'; // Brown
            ctx.beginPath();
            ctx.ellipse(anchorX, anchorY - 50, 100, 40, 0, Math.PI, 2 * Math.PI);
            ctx.fill();
            // Eyes (simple dots)
             ctx.fillStyle = 'white';
             ctx.beginPath();
             ctx.arc(anchorX - 25, anchorY - 55, 8, 0, Math.PI * 2);
             ctx.arc(anchorX + 25, anchorY - 55, 8, 0, Math.PI * 2);
             ctx.fill();
             ctx.fillStyle = 'black';
             ctx.beginPath();
             ctx.arc(anchorX - 25, anchorY - 55, 4, 0, Math.PI * 2);
             ctx.arc(anchorX + 25, anchorY - 55, 4, 0, Math.PI * 2);
             ctx.fill();

// Inside Channel 0's draw function:

// Scrolling News Ticker
const tickerY = rect.y + rect.height - 30;
const tickerText = "MYCELIUM MUTATION RATES RISE...MUSHROOM TRUMP BLAMES ALIEN BACTERIA ++ SPORE FORECAST: HEAVY PARTICLE COUNT LATER TODAY ++ NEW HYPHAE HIGHWAY OPENS...GRETA THUNBERG STEPS ON IT ++ LABOR NEWS: SLIME MOLD WORK SLOWDOWN CONTINUES... ++";

// Ensure font is set BEFORE measuring text width
ctx.font = '20px sans-serif';
const textWidth = ctx.measureText(tickerText).width;
const scrollSpeed = 0.75; // Slower speed = longer display time. Keep this!

// --- THIS IS THE CORRECT DIVISOR for the full text scroll ---
const cycleLength = textWidth + rect.width;
const scrollOffset = (time * scrollSpeed) % cycleLength;

// Background bar
ctx.fillStyle = '#333';
ctx.fillRect(rect.x, tickerY - 15, rect.width, 30);

// Text Style
ctx.fillStyle = 'yellow';
ctx.textAlign = 'left';
ctx.textBaseline = 'middle';

// Draw the first instance of the text
// It starts entering from the right edge (when scrollOffset = 0)
// and moves leftwards across the screen.
const currentX = rect.x + rect.width - scrollOffset;
ctx.fillText(tickerText, currentX, tickerY);

// Draw the second instance of the text
// Position it exactly one cycleLength after the first one.
// This ensures that as the first one scrolls off the left,
// the second one seamlessly scrolls in from the right.
ctx.fillText(tickerText, currentX + cycleLength, tickerY);
        }
    },
    // Channel 1: Kids Show
    {
        name: "The Mickey Mushroom Club",
        draw: (ctx, rect, time) => {
            ctx.fillStyle = '#add8e6'; // Light blue sky
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
            ctx.fillStyle = '#90ee90'; // Light green ground
            ctx.fillRect(rect.x, rect.y + rect.height * 0.7, rect.width, rect.height * 0.3);

            // Draw Wiggling Mushrooms
            const mushroomCount = 5;
            for (let i = 0; i < mushroomCount; i++) {
                const baseX = rect.x + (rect.width / (mushroomCount + 1)) * (i + 1);
                const baseY = rect.y + rect.height * 0.75;
                const wiggle = Math.sin(time * 0.05 + i) * 5; // Simple wiggle effect

                // Stem
                ctx.fillStyle = '#f5f5dc'; // Beige
                ctx.beginPath();
                ctx.moveTo(baseX - 10 + wiggle, baseY + 20);
                ctx.lineTo(baseX - 15 + wiggle, baseY - 30);
                ctx.lineTo(baseX + 15 + wiggle, baseY - 30);
                ctx.lineTo(baseX + 10 + wiggle, baseY + 20);
                ctx.closePath();
                ctx.fill();

                // Cap (Red with white dots)
                ctx.fillStyle = '#ff4444'; // Red
                ctx.beginPath();
                ctx.ellipse(baseX + wiggle, baseY - 30, 40, 25, 0, Math.PI, 0, true); // Semi-ellipse
                ctx.fill();
                 // White dots
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(baseX - 15 + wiggle, baseY - 30, 5, 0, Math.PI * 2);
                ctx.arc(baseX + wiggle, baseY - 40, 6, 0, Math.PI * 2);
                ctx.arc(baseX + 15 + wiggle, baseY - 30, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    },
     // Channel 2: Movie
    {
        name: "Mycelium Avatar 2: Revenge of the Porcinis",
        draw: (ctx, rect, time) => {
            ctx.fillStyle = '#000030'; // Dark blue night sky
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

            // Draw pulsing blue "Avatar" mushroom
             const avatarX = rect.x + rect.width * 0.3;
             const avatarY = rect.y + rect.height * 0.6;
             const pulse = (Math.sin(time * 0.05) + 1) * 5; // 0 to 10px pulse

            // Stem
            ctx.fillStyle = '#a0a0ff';
            ctx.fillRect(avatarX - 15, avatarY - 40, 30, 80);
            // Cap
            ctx.fillStyle = '#4040ff';
            ctx.beginPath();
            ctx.ellipse(avatarX, avatarY - 40, 60 + pulse, 30 + pulse/2, 0, 0, Math.PI * 2);
            ctx.fill();

             // Draw menacing "Porcini" mushroom
             const porciniX = rect.x + rect.width * 0.7;
             const porciniY = rect.y + rect.height * 0.65;
             // Stem (Thick)
             ctx.fillStyle = '#d2b48c'; // Tan
             ctx.beginPath();
             ctx.ellipse(porciniX, porciniY, 40, 25, 0, 0, Math.PI * 2); // Base
             ctx.rect(porciniX - 30, porciniY - 80, 60, 80);
             ctx.fill();
             // Cap
             ctx.fillStyle = '#8b4513'; // Brown
             ctx.beginPath();
             ctx.ellipse(porciniX, porciniY - 80, 80, 50, 0, Math.PI, 0, true); // Semi-ellipse
             ctx.fill();
             // Red "eyes"
             ctx.fillStyle = 'red';
             const eyeWiggle = Math.sin(time*0.1) * 2;
             ctx.beginPath();
             ctx.arc(porciniX - 20 + eyeWiggle, porciniY - 75, 5, 0, Math.PI * 2);
             ctx.arc(porciniX + 20 + eyeWiggle, porciniY - 75, 5, 0, Math.PI * 2);
             ctx.fill();
        }
    },
    // Channel 3: Game Show
    {
        name: "Mushroom Match Game!",
        draw: (ctx, rect, time) => {
            ctx.fillStyle = '#ffcc00'; // Cheesy yellow background
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

            // Draw flashing text "MATCH!"
            ctx.font = 'bold 80px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const flash = Math.floor(time / 30) % 2; // Flash every 30 frames
            ctx.fillStyle = flash ? 'red' : 'purple';
            ctx.fillText("MATCH!", rect.x + rect.width / 2, rect.y + rect.height / 3);

            // Draw two simple mushroom icons that "match"
            const mushY = rect.y + rect.height * 0.7;
            const mush1X = rect.x + rect.width * 0.3;
            const mush2X = rect.x + rect.width * 0.7;

             const drawSimpleMush = (x, y, color) => {
                 ctx.fillStyle = '#eee'; // Stem
                 ctx.fillRect(x - 10, y - 20, 20, 40);
                 ctx.fillStyle = color; // Cap
                 ctx.beginPath();
                 ctx.ellipse(x, y - 20, 35, 20, 0, Math.PI, 0, true);
                 ctx.fill();
             }

            drawSimpleMush(mush1X, mushY, 'green');
            drawSimpleMush(mush2X, mushY, 'green');

             ctx.fillStyle = 'black';
             ctx.font = '20px sans-serif';
             ctx.fillText("Contestant wins 1000 Spore Bucks!", rect.x + rect.width / 2, rect.y + rect.height - 40);

        }
    },
    // Channel 4: Maze
    {
        name: "The Mushroom Maze Channel",
        draw: (ctx, rect, time) => {
             ctx.fillStyle = '#222'; // Dark background
             ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

             // Draw simple maze lines
             ctx.strokeStyle = '#00ff00'; // Green lines
             ctx.lineWidth = 5;
             ctx.beginPath();
             // Outer walls
             ctx.moveTo(rect.x + 20, rect.y + 20);
             ctx.lineTo(rect.x + rect.width - 20, rect.y + 20);
             ctx.lineTo(rect.x + rect.width - 20, rect.y + rect.height - 20);
             ctx.lineTo(rect.x + 20, rect.y + rect.height - 20);
             ctx.lineTo(rect.x + 20, rect.y + 20);
             // Inner walls (example)
             ctx.moveTo(rect.x + 20, rect.y + rect.height / 3);
             ctx.lineTo(rect.x + rect.width * 0.7, rect.y + rect.height / 3);
             ctx.moveTo(rect.x + rect.width * 0.3, rect.y + rect.height * 2/3);
             ctx.lineTo(rect.x + rect.width - 20, rect.y + rect.height * 2/3);
              ctx.moveTo(rect.x + rect.width * 0.5, rect.y + 20);
             ctx.lineTo(rect.x + rect.width * 0.5, rect.y + rect.height * 0.5);

             ctx.stroke();

             // Draw moving mushroom dot
             ctx.fillStyle = 'red';
             const pathLength = rect.width * 1.5; // Approx path length
             const progress = (time * 1.5) % pathLength;
             let dotX, dotY;

             // Simple path (example: L shape)
             if (progress < rect.width - 40) {
                 dotX = rect.x + 30 + progress;
                 dotY = rect.y + 35;
             } else {
                 dotX = rect.x + rect.width - 30;
                 dotY = rect.y + 35 + (progress - (rect.width - 40));
             }
              dotY = Math.min(dotY, rect.y + rect.height - 30); // Clamp Y


             ctx.beginPath();
             ctx.arc(dotX, dotY, 10, 0, Math.PI * 2);
             ctx.fill();
        }
    },
    // Channel 5: Documentary
    {
        name: "The Fungus Among Us: the conspiracy unfolds",
        draw: (ctx, rect, time) => {
            ctx.fillStyle = '#654321'; // Soil brown
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

            // Draw growing root system (Mycelium)
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            const startX = rect.x + rect.width / 2;
            const startY = rect.y + 20;
            ctx.moveTo(startX, startY);

            // Recursive function to draw branches (simplified for performance)
            function drawBranch(x, y, angle, depth, length) {
                if (depth <= 0) return;

                const endX = x + Math.cos(angle) * length;
                const endY = y + Math.sin(angle) * length;

                // Only draw segment up to current time/growth
                const growthFactor = Math.min(1, (time * 0.05) / (12 - depth)); // Grow faster initially, slow down deeper
                if (growthFactor > 0) {
                     const drawEndX = x + (endX - x) * growthFactor;
                     const drawEndY = y + (endY - y) * growthFactor;

                     // Clamp drawing within bounds
                     if (drawEndX > rect.x && drawEndX < rect.x + rect.width && drawEndY > rect.y && drawEndY < rect.y + rect.height) {
                           ctx.lineTo(drawEndX, drawEndY);
                     } else {
                           // Stop branch if it hits edge
                           return;
                     }
                     ctx.moveTo(x, y); // Move back for next branch segment
                }


                if (growthFactor >= 1) { // Only branch when segment fully grown
                    // Branch left
                     drawBranch(endX, endY, angle - (Math.random() * 0.5 + 0.2), depth - 1, length * (Math.random() * 0.2 + 0.7));
                    // Branch right
                    drawBranch(endX, endY, angle + (Math.random() * 0.5 + 0.2), depth - 1, length * (Math.random() * 0.2 + 0.7));
                }

            }

            // Initial branches
            ctx.moveTo(startX,startY);
            drawBranch(startX, startY, Math.PI / 2 - 0.2, 6, 50); // Start angle slightly off vertical
            ctx.moveTo(startX,startY);
            drawBranch(startX, startY, Math.PI / 2 + 0.2, 6, 50);

            ctx.stroke();
        }
    },
    // Channel 6: Shopping
    {
        name: "The Home Shroom Shopping Network",
        draw: (ctx, rect, time) => {
            ctx.fillStyle = '#e0e0ff'; // Soft lavender background
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

            // Draw pedestal
            const pedX = rect.x + rect.width / 2;
            const pedY = rect.y + rect.height * 0.8;
            ctx.fillStyle = '#888';
            ctx.fillRect(pedX - 80, pedY - 30, 160, 30); // Top
            ctx.fillStyle = '#aaa';
            ctx.fillRect(pedX - 50, pedY, 100, 50); // Base

            // Draw rotating glowing mushroom
            const itemY = pedY - 80;
            const angle = time * 0.02; // Rotation speed

            ctx.save(); // Save context for rotation
            ctx.translate(pedX, itemY);
            ctx.rotate(angle);

            // Glowing effect (simple halo)
             ctx.fillStyle = 'rgba(255, 255, 0, 0.3)'; // Yellow glow
             ctx.beginPath();
             ctx.arc(0, 0, 60, 0, Math.PI * 2);
             ctx.fill();

             // Mushroom itself
             // Stem
             ctx.fillStyle = '#f0e68c'; // Khaki
             ctx.fillRect(-15, -10, 30, 40);
             // Cap
             ctx.fillStyle = '#ffd700'; // Gold
             ctx.beginPath();
             ctx.ellipse(0, -10, 50, 30, 0, Math.PI, 0, true);
             ctx.fill();

             ctx.restore(); // Restore context after rotation

            // Price tag
            ctx.fillStyle = 'black';
            ctx.font = 'bold 30px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText("Only 999.99 Spores!", rect.x + rect.width - 30, rect.y + rect.height - 30);
        }
    },
     // Channel 7: Puffballs
    {
        name: "Puffball Panic!",
        puffballs: [], // Store puffball state {x, y, size, burstTime}
        spores: [],   // Store spore state {x, y, vx, vy, life}
        init: function(rect) { // Initialize puffballs if needed
            if (this.puffballs.length === 0) {
                for (let i = 0; i < 5; i++) {
                    this.puffballs.push({
                        x: rect.x + 50 + Math.random() * (rect.width - 100),
                        y: rect.y + rect.height * 0.8 + Math.random() * 30,
                        size: 20 + Math.random() * 20,
                        burstTime: -1 // Not burst yet
                    });
                }
            }
        },
        draw: function(ctx, rect, time) {
            this.init(rect); // Ensure puffballs are initialized

            ctx.fillStyle = '#5a6a5a'; // Murky green background
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

            // Update and draw puffballs
            this.puffballs.forEach(p => {
                if (p.burstTime < 0 && Math.random() < 0.002) { // Random chance to burst
                    p.burstTime = time;
                    // Create spores
                    for (let i = 0; i < 100; i++) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = 1 + Math.random() * 3;
                        this.spores.push({
                            x: p.x,
                            y: p.y - p.size / 2, // Start from top-ish
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed - 1, // Slight upward tendency
                            life: 60 + Math.random() * 60 // Frames to live
                        });
                    }
                }

                if (p.burstTime < 0 || time - p.burstTime > 120) { // Draw if not burst or after cooldown
                    if (p.burstTime > 0) p.burstTime = -1; // Reset after cooldown
                    ctx.fillStyle = '#f5f5f5'; // White-ish
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Update and draw spores
            ctx.fillStyle = 'rgba(255, 255, 200, 0.7)'; // Light yellow spores
            this.spores = this.spores.filter(s => s.life > 0); // Remove dead spores
            this.spores.forEach(s => {
                s.x += s.vx;
                s.y += s.vy;
                s.vy += 0.02; // Tiny gravity
                s.life--;
                const alpha = Math.min(1, s.life / 30); // Fade out
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0; // Reset alpha
            });
        }
    },
    // Channel 8: Sci-Fi/Tech
    {
        name: "Myco-Mechanics Showcase presents: The Robo Mushroom Suit",
        draw: (ctx, rect, time) => {
            ctx.fillStyle = '#444'; // Workshop grey
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

            const centerX = rect.x + rect.width / 2;
            const centerY = rect.y + rect.height / 2 + 50;

            // Draw the Mushroom body
            // Stem
            ctx.fillStyle = '#c0a080'; // Faded brown
            ctx.fillRect(centerX - 30, centerY - 60, 60, 120);
             // Cap
            ctx.fillStyle = '#a0522d'; // Sienna
            ctx.beginPath();
            ctx.ellipse(centerX, centerY - 60, 100, 50, 0, Math.PI, 0, true);
            ctx.fill();

            // Draw simple robotic legs
            ctx.strokeStyle = '#aaa';
            ctx.lineWidth = 8;
            const legAngle = Math.sin(time * 0.03) * 0.4; // Swing angle

            const drawLeg = (startX, startY, angleOffset) => {
                const joint1X = startX + Math.cos(Math.PI / 2 + angleOffset + legAngle) * 60;
                const joint1Y = startY + Math.sin(Math.PI / 2 + angleOffset + legAngle) * 60;
                const footX = joint1X + Math.cos(Math.PI / 2 + angleOffset - legAngle*0.8) * 50; // Bend opposite
                const footY = joint1Y + Math.sin(Math.PI / 2 + angleOffset - legAngle*0.8) * 50;

                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(joint1X, joint1Y);
                ctx.lineTo(footX, footY);
                ctx.stroke();
                 // Joint circle
                 ctx.fillStyle = '#888';
                 ctx.beginPath();
                 ctx.arc(joint1X, joint1Y, 8, 0, Math.PI*2);
                 ctx.fill();
            }
            // Left Leg
             drawLeg(centerX - 25, centerY + 50, -0.2);
            // Right Leg
             drawLeg(centerX + 25, centerY + 50, 0.2);


             // Simple robotic arm
             ctx.strokeStyle = '#aaa';
             ctx.lineWidth = 6;
             const armAngle = Math.cos(time * 0.04) * 0.5;
             const armStartX = centerX + 40;
             const armStartY = centerY - 30;
             const elbowX = armStartX + Math.cos(-0.5 + armAngle) * 40;
             const elbowY = armStartY + Math.sin(-0.5 + armAngle) * 40;
             const handX = elbowX + Math.cos(-0.5 - armAngle*0.8) * 30;
             const handY = elbowY + Math.sin(-0.5 - armAngle*0.8) * 30;
             ctx.beginPath();
             ctx.moveTo(armStartX, armStartY);
             ctx.lineTo(elbowX, elbowY);
             ctx.lineTo(handX, handY);
             ctx.stroke();
              // Joints
             ctx.fillStyle = '#888';
             ctx.beginPath();
             ctx.arc(elbowX, elbowY, 6, 0, Math.PI*2);
             ctx.fill();
             ctx.beginPath();
             ctx.arc(handX, handY, 8, 0, Math.PI*2); // "Hand"
             ctx.fill();
        }
    },
    // Channel 9: Weather
    {
        name: "The Underground Weather Network",
        droplets: [], // Store droplet state {x, y, pathPos, pathIndex}
        paths: [], // Store root path coordinates [[{x,y},...],...]
        init: function(rect) {
             if(this.paths.length === 0) {
                 // Generate a few random root-like paths
                for(let i=0; i< 5; i++) {
                    const path = [];
                    let currentX = rect.x + 20 + Math.random() * (rect.width - 40);
                    let currentY = rect.y + 20;
                    path.push({x: currentX, y: currentY});
                    let segments = 5 + Math.random() * 5;
                    for (let j=0; j < segments; j++) {
                        currentX += (Math.random() - 0.5) * 100;
                        currentY += 50 + Math.random() * 50;
                        currentX = Math.max(rect.x + 10, Math.min(rect.x + rect.width - 10, currentX)); // Clamp X
                        currentY = Math.min(rect.y + rect.height - 10, currentY); // Clamp Y but allow going off bottom
                        path.push({x: currentX, y: currentY});
                         if (currentY >= rect.y + rect.height - 10) break; // Stop if near bottom
                    }
                     this.paths.push(path);
                }
             }
             // Add new droplets periodically
             if(Math.random() < 0.05 && this.droplets.length < 50) {
                 const pathIndex = Math.floor(Math.random() * this.paths.length);
                 this.droplets.push({ x: 0, y: 0, pathPos: 0, pathIndex: pathIndex });
             }
        },
        draw: function(ctx, rect, time) {
            this.init(rect);

            ctx.fillStyle = '#a08060'; // Light brown earth background
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

             // Draw the root paths
             ctx.strokeStyle = '#503010'; // Darker brown
             ctx.lineWidth = 4;
             this.paths.forEach(path => {
                if (path.length < 2) return;
                ctx.beginPath();
                ctx.moveTo(path[0].x, path[0].y);
                for(let i = 1; i < path.length; i++) {
                    ctx.lineTo(path[i].x, path[i].y);
                }
                ctx.stroke();
             });

            // Update and draw droplets moving along paths
            ctx.fillStyle = 'blue';
            this.droplets = this.droplets.filter(d => {
                const path = this.paths[d.pathIndex];
                if (!path || path.length < 2) return false; // Remove if path invalid

                d.pathPos += 0.02; // Speed along path (0 to 1 for each segment)

                let segmentIndex = Math.floor(d.pathPos);
                let segmentProgress = d.pathPos - segmentIndex;

                if (segmentIndex >= path.length - 1) {
                    return false; // Reached end of path
                }

                 const start = path[segmentIndex];
                 const end = path[segmentIndex + 1];
                 d.x = start.x + (end.x - start.x) * segmentProgress;
                 d.y = start.y + (end.y - start.y) * segmentProgress;

                 // Draw droplet
                 ctx.beginPath();
                 ctx.arc(d.x, d.y, 5, 0, Math.PI * 2);
                 ctx.fill();

                return true; // Keep droplet
            });

            // Draw a "Dryness Index" graphic (static example)
             ctx.fillStyle = 'rgba(255, 165, 0, 0.7)'; // Orange overlay
             ctx.beginPath();
             ctx.rect(rect.x + rect.width * 0.7, rect.y + 20, rect.width * 0.25, rect.height * 0.3);
             ctx.fill();
             ctx.fillStyle = 'black';
             ctx.font = '16px sans-serif';
              ctx.textAlign = 'center';
             ctx.fillText("Dry Zone", rect.x + rect.width * 0.825, rect.y + 40);

        }
    }
];

// --- Drawing Functions ---

function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function drawTVFrame(ctx) {
    // Outer Frame Fill (Rooty Brown)
    ctx.fillStyle = '#6F4E37'; // Coffee Brown
    drawRoundedRect(ctx, frameOuterRect.x, frameOuterRect.y, frameOuterRect.width, frameOuterRect.height, frameOuterRect.cornerRadius);
    ctx.fill();

    // Inner Bevel/Highlight
    ctx.strokeStyle = '#8B5A2B'; // Light Brown
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, frameOuterRect.x + 2, frameOuterRect.y + 2, frameOuterRect.width - 4, frameOuterRect.height - 4, frameOuterRect.cornerRadius - 1);
    ctx.stroke();
    ctx.strokeStyle = '#5E3A1D'; // Darker Brown Shadow
     drawRoundedRect(ctx, frameOuterRect.x + frameThickness*0.1, frameOuterRect.y + frameThickness*0.1, frameOuterRect.width - frameThickness*0.2, frameOuterRect.height - frameThickness*0.2, frameOuterRect.cornerRadius - frameThickness*0.05);
    ctx.stroke();


    // Add some root-like lines on the frame
    ctx.strokeStyle = 'rgba(40, 20, 5, 0.5)'; // Dark translucent brown
    ctx.lineWidth = 1.5;
    ctx.beginPath();
      // Corrected code snippet within drawTVFrame:
      for (let i = 0; i < 15; i++) {
        // **** Use let instead of const ****
        let startX = frameOuterRect.x + Math.random() * frameOuterRect.width;
        let startY = frameOuterRect.y + Math.random() * frameOuterRect.height;

         // Ensure starts on frame, not screen area
         if (startX > screenRect.x && startX < screenRect.x + screenRect.width && startY > screenRect.y && startY < screenRect.y + screenRect.height) {
            // If starts in screen area, push it outwards to frame edge
            if (Math.random() < 0.5) { // Push horizontally
                 // Now this assignment is allowed because startX is declared with let
                 startX = (startX < frameOuterRect.x + frameOuterRect.width/2) ? frameOuterRect.x + Math.random() * frameThickness : frameOuterRect.x + frameOuterRect.width - frameThickness + Math.random()*frameThickness;
            } else { // Push vertically
                 // Now this assignment is allowed because startY is declared with let
                 startY = (startY < frameOuterRect.y + frameOuterRect.height/2) ? frameOuterRect.y + Math.random() * frameThickness : frameOuterRect.y + frameOuterRect.height - frameThickness + Math.random()*frameThickness;
            }
         }

        // Rest of the loop code uses the potentially modified startX/startY
        ctx.moveTo(startX, startY);
        const endX = startX + (Math.random() - 0.5) * 100;
        const endY = startY + (Math.random() - 0.5) * 100;
        ctx.quadraticCurveTo(startX + (Math.random() - 0.5) * 50, startY + (Math.random() - 0.5) * 50, endX, endY);
    }
    ctx.stroke();
     // Small mushroom decoration on frame corner
     const mushX = frameOuterRect.x + frameOuterRect.width - 35;
     const mushY = frameOuterRect.y + frameOuterRect.height - 25;
     // Stem
     ctx.fillStyle = '#d2b48c';
     ctx.fillRect(mushX-5, mushY-10, 10, 15 );
     // Cap
     ctx.fillStyle = '#b07040';
     ctx.beginPath();
     ctx.ellipse(mushX, mushY-10, 15, 10, 0, Math.PI, 0, true);
     ctx.fill();

}

function drawScreenContent(ctx, channelIndex, time) {
    const channel = channels[channelIndex];
    if (!channel) {
        // Draw static or error message if channel invalid
        ctx.fillStyle = 'black';
        ctx.fillRect(screenRect.x, screenRect.y, screenRect.width, screenRect.height);
        ctx.fillStyle = 'red';
        ctx.font = '40px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("SIGNAL LOST", screenRect.x + screenRect.width / 2, screenRect.y + screenRect.height / 2);
        return;
    }

    // --- Crucial Clipping Logic ---
    ctx.save(); // Save context state before clipping

    // Create clipping path (use the rounded rectangle function for smoother edges)
    drawRoundedRect(ctx, screenRect.x, screenRect.y, screenRect.width, screenRect.height, screenRect.cornerRadius);
    ctx.clip(); // Apply clipping - all drawing after this is confined to the path

    // --- Draw the specific channel content ---
    channel.draw(ctx, screenRect, time); // Pass the screen rectangle and time/frameCount

    // --- Draw Channel Info (INSIDE the clipped area) ---
    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // White text with slight transparency
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`CH ${channelIndex}`, screenRect.x + 15, screenRect.y + 15);

    ctx.textAlign = 'right';
    ctx.fillText(channel.name, screenRect.x + screenRect.width - 15, screenRect.y + 15);


    // --- End Clipping ---
    ctx.restore(); // Restore context state (removes clipping)
}

// --- Main Animation Loop ---
function animate() {
    frameCount++;

    // Clear the entire canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw the TV frame first (it's underneath the screen content)
    drawTVFrame(ctx);

    // Draw the screen content (handles clipping internally)
    drawScreenContent(ctx, currentChannel, frameCount);

    // Request the next frame
    requestAnimationFrame(animate);
}

// --- Event Listener for Channel Change ---
window.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        const channelNum = parseInt(key, 10);
        if (channelNum >= 0 && channelNum < channels.length) {
            console.log(`Changing to channel ${channelNum}`);
            if(currentChannel !== channelNum) {
                // Optional: Add brief static effect on change?
                // For now, just switch directly
                currentChannel = channelNum;
                // Reset frame count slightly for visual jump? Optional.
                // frameCount = 0;
            }
        }
    }
});

// --- Start Animation ---
animate();