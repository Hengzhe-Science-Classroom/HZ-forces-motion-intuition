window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Position & Reference Frames',
    subtitle: 'Where Are You?',
    sections: [
        {
            id: 'describing-position',
            title: 'Describing Position',
            content: `
                <h2>Describing Position</h2>
                <p>If someone asks you "Where is the cat?", you might say "On the sofa" or "Next to the bookshelf." You are describing the cat's <strong>position</strong> -- where it is located.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Position</div>
                    <div class="env-body"><p><strong>Position</strong> describes the location of an object. To describe a position, you always need a <strong>reference point</strong> -- something you measure from.</p></div>
                </div>

                <p>When you say "The store is 3 blocks north of my house," your house is the reference point. When you say "The ball is 2 meters to the right of the goal," the goal is the reference point.</p>

                <div class="env-block intuition">
                    <div class="env-title">Key Idea</div>
                    <div class="env-body"><p>You can't describe a position without saying <strong>where you are measuring from</strong>. "5 meters" doesn't tell us anything by itself. "5 meters east of the school" tells us exactly where to look!</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-position-describe"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A treasure map says: "Walk 4 steps east and 3 steps north from the big oak tree."</p>
                        <p>The <strong>reference point</strong> is the big oak tree. The <strong>position</strong> of the treasure is 4 steps east and 3 steps north from that tree.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-position-describe',
                    title: 'Describing Position',
                    description: 'Place objects and describe their position relative to a reference point',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 250 });

                        var refPoint = { x: 0, y: 0 };
                        var targetX = 3;
                        var targetY = 2;

                        var dragTarget = viz.addDraggable('target', targetX, targetY, viz.colors.orange, 8, function(x, y) {
                            targetX = Math.round(x);
                            targetY = Math.round(y);
                            dragTarget.x = targetX;
                            dragTarget.y = targetY;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Reference point
                            viz.drawPoint(refPoint.x, refPoint.y, viz.colors.teal, null, 8);
                            viz.drawText('Reference', refPoint.x, refPoint.y - 0.6, viz.colors.teal, 12);

                            // Dashed lines showing distances
                            viz.drawSegment(refPoint.x, refPoint.y, targetX, refPoint.y, viz.colors.blue, 1.5, true);
                            viz.drawSegment(targetX, refPoint.y, targetX, targetY, viz.colors.green, 1.5, true);

                            // Distance labels
                            if (targetX !== 0) {
                                var dir = targetX > 0 ? 'right' : 'left';
                                viz.drawText(Math.abs(targetX) + ' ' + dir, targetX / 2, -0.5, viz.colors.blue, 12);
                            }
                            if (targetY !== 0) {
                                var vdir = targetY > 0 ? 'up' : 'down';
                                viz.drawText(Math.abs(targetY) + ' ' + vdir, targetX + 0.8, targetY / 2, viz.colors.green, 12, 'left');
                            }

                            // Target point
                            viz.drawDraggables();
                            viz.drawText('Object', targetX, targetY + 0.6, viz.colors.orange, 12);

                            // Description
                            var desc = 'Position: ' + Math.abs(targetX) + (targetX >= 0 ? ' right' : ' left') + ', ' + Math.abs(targetY) + (targetY >= 0 ? ' up' : ' down');
                            viz.screenText(desc, viz.width / 2, 20, viz.colors.white, 14, 'center');
                            viz.screenText('Drag the orange dot to move the object!', viz.width / 2, viz.height - 15, viz.colors.text, 11, 'center');
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A bird is sitting on a fence post that is 5 meters east and 2 meters north of a barn. What is the reference point? What is the position?',
                    hint: 'The reference point is what you measure from.',
                    solution: 'The reference point is the barn. The position of the bird is 5 meters east and 2 meters north of the barn.'
                },
                {
                    question: 'Why is it not enough to say "the ball is 3 meters away" when describing its position?',
                    hint: 'Think about what information is missing.',
                    solution: 'Saying "3 meters away" does not tell us the direction or the reference point. The ball could be 3 meters to the left, right, forward, backward, or any direction from any starting point. A complete position description needs a reference point and a direction.'
                }
            ]
        },
        {
            id: 'coordinate-grids',
            title: 'Coordinate Grids',
            content: `
                <h2>Coordinate Grids</h2>
                <p>Scientists use a neat system to describe positions precisely: a <strong>coordinate grid</strong>. You have probably seen one in math class!</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Coordinate Grid</div>
                    <div class="env-body"><p>A coordinate grid has two number lines that cross at a point called the <strong>origin</strong> (the zero point). The horizontal line is the \\(x\\)-axis, and the vertical line is the \\(y\\)-axis. Any position on the grid can be described by two numbers: \\((x, y)\\).</p></div>
                </div>

                <p>For example, the point \\((3, 2)\\) means: go 3 units to the right and 2 units up from the origin. The point \\((-1, 4)\\) means: go 1 unit to the left and 4 units up.</p>

                <div class="viz-placeholder" data-viz="viz-coord-grid"></div>

                <div class="env-block intuition">
                    <div class="env-title">Think of It Like a Map</div>
                    <div class="env-body"><p>A coordinate grid is like a city map. The \\(x\\)-coordinate tells you which street (east-west), and the \\(y\\)-coordinate tells you which avenue (north-south). Together, they pinpoint the exact intersection!</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example: Reading Coordinates</div>
                    <div class="env-body">
                        <p>A treasure is hidden at position \\((4, 3)\\) on a grid.</p>
                        <p>Starting at the origin \\((0, 0)\\), walk 4 units to the right along the \\(x\\)-axis, then 3 units up along the \\(y\\)-axis. That is where the treasure is buried!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-coord-grid',
                    title: 'Coordinate Grid Explorer',
                    description: 'Drag the point to see its coordinates update in real time',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 200 });

                        var px = 3;
                        var py = 2;
                        var dragPt = viz.addDraggable('pt', px, py, viz.colors.orange, 8, function(x, y) {
                            px = Math.round(x * 2) / 2;
                            py = Math.round(y * 2) / 2;
                            dragPt.x = px;
                            dragPt.y = py;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid(1);
                            viz.drawAxes();

                            // Highlight path from origin to point
                            viz.drawSegment(0, 0, px, 0, viz.colors.blue, 2, true);
                            viz.drawSegment(px, 0, px, py, viz.colors.green, 2, true);

                            // Labels on path
                            if (px !== 0) {
                                viz.drawText('x = ' + px, px / 2, -0.5, viz.colors.blue, 12);
                            }
                            if (py !== 0) {
                                viz.drawText('y = ' + py, px + 0.9, py / 2, viz.colors.green, 12, 'left');
                            }

                            // Origin label
                            viz.drawText('Origin (0,0)', 0.3, -0.5, viz.colors.text, 10, 'left');

                            viz.drawDraggables();

                            // Coordinate readout
                            viz.screenText('Position: (' + px + ', ' + py + ')', viz.width / 2, 20, viz.colors.white, 16, 'center');
                            viz.screenText('Drag the orange point to explore coordinates!', viz.width / 2, viz.height - 15, viz.colors.text, 11, 'center');
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'On a coordinate grid, a cat is at position \\((2, 5)\\). Describe in words how to get to the cat from the origin.',
                    hint: 'The first number tells you the horizontal direction, the second tells you the vertical direction.',
                    solution: 'Starting at the origin (0, 0), move 2 units to the right along the x-axis, then move 5 units up along the y-axis. That is where the cat is!'
                },
                {
                    question: 'A frog is at position \\((-3, 1)\\). What does the negative number mean?',
                    hint: 'Positive x means right, so what does negative x mean?',
                    solution: 'The negative number means the frog is to the LEFT of the origin. So the frog is 3 units to the left and 1 unit up from the origin.'
                }
            ]
        },
        {
            id: 'reference-frames-matter',
            title: 'Reference Frames Matter',
            content: `
                <h2>Reference Frames Matter</h2>
                <p>In Chapter 0, we learned that motion is relative. The same idea applies to position! <strong>Where</strong> you think something is depends on your reference frame.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Reference Frame</div>
                    <div class="env-body"><p>A <strong>reference frame</strong> is a point of view used to measure position and motion. It includes a reference point (origin) and a set of directions (like left/right and up/down).</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why It Matters</div>
                    <div class="env-body">
                        <p>Imagine you and your friend are standing in a park. A dog is between you.</p>
                        <p><strong>You:</strong> "The dog is 4 meters to my right."</p>
                        <p><strong>Your friend (facing you):</strong> "The dog is 2 meters to my left."</p>
                        <p>You are both describing the same dog, but using different reference frames!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-ref-frame-matters"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A school and a park are on the same street. The library is between them.</p>
                        <p>Using the school as the reference point: "The library is 200 meters east."</p>
                        <p>Using the park as the reference point: "The library is 100 meters west."</p>
                        <p>Same library, different descriptions!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-ref-frame-matters',
                    title: 'Different Reference Frames',
                    description: 'See how the same object has different positions in different reference frames',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 100, originY: 200 });
                        var refChoice = 'alice'; // 'alice' or 'bob'

                        var aliceX = 0;
                        var bobX = 10;
                        var dogX = 4;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Reference frame: ' + (refChoice === 'alice' ? 'Alice' : 'Bob'), viz.width / 2, 20, viz.colors.yellow, 15, 'center');

                            // Draw ground
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(50, 220); ctx.lineTo(650, 220); ctx.stroke();

                            // Tick marks
                            var originPx, scale;
                            if (refChoice === 'alice') {
                                originPx = 150;
                                scale = 40;
                                // Draw number line from Alice perspective
                                for (var i = 0; i <= 12; i++) {
                                    var tx = originPx + i * scale;
                                    if (tx > 650) break;
                                    ctx.strokeStyle = viz.colors.text + '44';
                                    ctx.beginPath(); ctx.moveTo(tx, 215); ctx.lineTo(tx, 225); ctx.stroke();
                                    viz.screenText(String(i), tx, 235, viz.colors.text, 10, 'center');
                                }
                                viz.screenText('meters from Alice', 350, 255, viz.colors.text, 11, 'center');
                            } else {
                                originPx = 550;
                                scale = -40;
                                for (var j = 0; j <= 12; j++) {
                                    var tx2 = originPx + j * scale;
                                    if (tx2 < 50) break;
                                    ctx.strokeStyle = viz.colors.text + '44';
                                    ctx.beginPath(); ctx.moveTo(tx2, 215); ctx.lineTo(tx2, 225); ctx.stroke();
                                    viz.screenText(String(j), tx2, 235, viz.colors.text, 10, 'center');
                                }
                                viz.screenText('meters from Bob', 350, 255, viz.colors.text, 11, 'center');
                            }

                            // Alice position in px
                            var alicePx, bobPx, dogPx;
                            if (refChoice === 'alice') {
                                alicePx = originPx + aliceX * 40;
                                bobPx = originPx + bobX * 40;
                                dogPx = originPx + dogX * 40;
                            } else {
                                alicePx = originPx + (aliceX - bobX) * (-40);
                                bobPx = originPx;
                                dogPx = originPx + (dogX - bobX) * (-40);
                            }

                            // Draw Alice
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(alicePx, 190, 12, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('Alice', alicePx, 165, viz.colors.blue, 13, 'center');

                            // Draw Bob
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath(); ctx.arc(bobPx, 190, 12, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('Bob', bobPx, 165, viz.colors.green, 13, 'center');

                            // Draw Dog
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(dogPx, 190, 10, 0, Math.PI * 2); ctx.fill();
                            viz.screenText('Dog', dogPx, 175, viz.colors.orange, 11, 'center');

                            // Arrow from reference to dog
                            var refPx = (refChoice === 'alice') ? alicePx : bobPx;
                            var refColor = (refChoice === 'alice') ? viz.colors.blue : viz.colors.green;
                            ctx.strokeStyle = refColor;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath(); ctx.moveTo(refPx, 200); ctx.lineTo(dogPx, 200); ctx.stroke();
                            ctx.setLineDash([]);

                            // Distance label
                            var dist = (refChoice === 'alice') ? dogX : (bobX - dogX);
                            var dir = (refChoice === 'alice') ? 'right' : 'left';
                            viz.screenText('Dog is ' + dist + ' meters to the ' + dir, viz.width / 2, 300, viz.colors.white, 14, 'center');

                            // Highlight origin
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            var originCircle = (refChoice === 'alice') ? alicePx : bobPx;
                            ctx.beginPath(); ctx.arc(originCircle, 190, 16, 0, Math.PI * 2); ctx.stroke();
                            viz.screenText('(origin)', originCircle, 145, viz.colors.yellow, 10, 'center');
                        }

                        VizEngine.createButton(controls, 'Alice\'s Frame', function() { refChoice = 'alice'; draw(); });
                        VizEngine.createButton(controls, 'Bob\'s Frame', function() { refChoice = 'bob'; draw(); });
                        VizEngine.createSlider(controls, 'Dog position', 1, 9, 4, 1, function(v) { dogX = v; draw(); });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Alice is at position 0 on a number line. Bob is at position 10. A cat is at position 7. What is the cat\'s position from Alice\'s reference frame? From Bob\'s?',
                    hint: 'From Alice, just read the number line. From Bob, figure out how far the cat is from Bob.',
                    solution: 'From Alice\'s reference frame: the cat is at position 7 (7 meters to the right). From Bob\'s reference frame: the cat is 3 meters to the left (since 10 - 7 = 3).'
                }
            ]
        },
        {
            id: 'switching-frames',
            title: 'Switching Reference Frames',
            content: `
                <h2>Switching Reference Frames</h2>
                <p>Now let's see something really cool: we can <strong>switch</strong> between reference frames! This is like looking at the same scene through different cameras.</p>

                <div class="env-block intuition">
                    <div class="env-title">The Train Again</div>
                    <div class="env-body">
                        <p>Remember our train from Chapter 0? Let's think about positions this time.</p>
                        <p>A passenger walks from the back of the train to the front. In the <strong>train's reference frame</strong>, the passenger moves 10 meters forward.</p>
                        <p>But from the <strong>ground's reference frame</strong>, the passenger moves 10 meters forward PLUS however far the train itself traveled! If the train moved 50 meters in that time, the passenger moved 60 meters total from the ground's point of view.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-frame-switch"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Walking on a Moving Walkway</div>
                    <div class="env-body">
                        <p>At an airport, a moving walkway carries you forward at 2 m/s. You walk on it at 1 m/s.</p>
                        <p><strong>Walkway's frame:</strong> You move at 1 m/s (just your walking speed).</p>
                        <p><strong>Ground's frame:</strong> You move at 3 m/s (walkway speed + your walking speed)!</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Looking Ahead</div>
                    <div class="env-body"><p>Reference frames are one of the most important ideas in all of physics. When you study more advanced physics, you will learn that Albert Einstein built his entire theory of relativity on the idea of reference frames. For now, just remember: always ask "From whose point of view?"</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-frame-switch',
                    title: 'Walking on a Moving Train',
                    description: 'See how the same walk looks from the train and from the ground',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 175 });
                        var viewMode = 'ground';
                        var trainSpeed = 1.5;
                        var walkSpeed = 0.5;

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var s = t * 0.001;

                            viz.screenText('View: ' + (viewMode === 'ground' ? 'GROUND' : 'TRAIN'), viz.width / 2, 20, viz.colors.yellow, 15, 'center');

                            if (viewMode === 'ground') {
                                // Ground view: train moves, person moves even faster
                                var trainOff = (s * trainSpeed * 40) % 600;
                                var trainLeft = -150 + trainOff;
                                if (trainLeft > 750) trainLeft = -150;

                                // Ground
                                ctx.fillStyle = '#2a5a2a';
                                ctx.fillRect(0, 260, 700, 90);

                                // Ground markers (fixed)
                                for (var i = 0; i < 8; i++) {
                                    var mx = i * 100;
                                    ctx.strokeStyle = viz.colors.text + '44';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath(); ctx.moveTo(mx, 255); ctx.lineTo(mx, 265); ctx.stroke();
                                }

                                // Train
                                ctx.fillStyle = viz.colors.blue + '66';
                                ctx.fillRect(trainLeft, 180, 180, 60);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(trainLeft, 180, 180, 5);
                                // Train windows
                                ctx.fillStyle = viz.colors.yellow + '33';
                                for (var w = 0; w < 4; w++) {
                                    ctx.fillRect(trainLeft + 15 + w * 42, 195, 25, 25);
                                }
                                // Wheels
                                ctx.fillStyle = '#444';
                                ctx.beginPath(); ctx.arc(trainLeft + 35, 242, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(trainLeft + 145, 242, 8, 0, Math.PI * 2); ctx.fill();

                                // Person walking in train (moves at train + walk speed)
                                var personOff = (s * (trainSpeed + walkSpeed) * 40) % 600;
                                var personX = -150 + personOff + 30;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(personX, 205, 7, 0, Math.PI * 2); ctx.fill();
                                ctx.fillRect(personX - 3, 212, 6, 14);

                                viz.screenText('Person moves at ' + (trainSpeed + walkSpeed).toFixed(1) + ' m/s (ground view)', viz.width / 2, 310, viz.colors.white, 13, 'center');
                                viz.screenText('Train: ' + trainSpeed.toFixed(1) + ' m/s + Walking: ' + walkSpeed.toFixed(1) + ' m/s', viz.width / 2, 330, viz.colors.text, 11, 'center');
                            } else {
                                // Train view: train stationary, ground moves backward
                                var groundOff = (s * trainSpeed * 40) % 100;

                                // Ground moving
                                ctx.fillStyle = '#2a5a2a';
                                ctx.fillRect(0, 260, 700, 90);
                                for (var j = -1; j < 9; j++) {
                                    var mx2 = j * 100 - groundOff;
                                    ctx.strokeStyle = viz.colors.text + '44';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath(); ctx.moveTo(mx2, 255); ctx.lineTo(mx2, 265); ctx.stroke();
                                }

                                // Stationary train
                                var tl = 260;
                                ctx.fillStyle = viz.colors.blue + '66';
                                ctx.fillRect(tl, 180, 180, 60);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(tl, 180, 180, 5);
                                ctx.fillStyle = viz.colors.yellow + '33';
                                for (var w2 = 0; w2 < 4; w2++) {
                                    ctx.fillRect(tl + 15 + w2 * 42, 195, 25, 25);
                                }
                                ctx.fillStyle = '#444';
                                ctx.beginPath(); ctx.arc(tl + 35, 242, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(tl + 145, 242, 8, 0, Math.PI * 2); ctx.fill();

                                // Person walking inside train (moves at walk speed only)
                                var pw = (s * walkSpeed * 40) % 140;
                                var ppx = tl + 20 + pw;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(ppx, 205, 7, 0, Math.PI * 2); ctx.fill();
                                ctx.fillRect(ppx - 3, 212, 6, 14);

                                viz.screenText('Person moves at ' + walkSpeed.toFixed(1) + ' m/s (train view)', viz.width / 2, 310, viz.colors.white, 13, 'center');
                                viz.screenText('Only the walking speed matters inside the train!', viz.width / 2, 330, viz.colors.text, 11, 'center');
                            }
                        }

                        VizEngine.createButton(controls, 'Ground View', function() { viewMode = 'ground'; });
                        VizEngine.createButton(controls, 'Train View', function() { viewMode = 'train'; });
                        VizEngine.createSlider(controls, 'Train speed', 0.5, 3, 1.5, 0.1, function(v) { trainSpeed = v; });
                        VizEngine.createSlider(controls, 'Walk speed', 0.1, 1.5, 0.5, 0.1, function(v) { walkSpeed = v; });

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'You are on a boat traveling at 5 m/s downstream. You walk toward the front of the boat at 1 m/s. How fast are you moving from the riverbank\'s point of view?',
                    hint: 'Add your walking speed to the boat speed.',
                    solution: 'From the riverbank, you are moving at 5 + 1 = 6 m/s. Your speed relative to the ground is the sum of the boat speed and your walking speed because you are moving in the same direction.'
                },
                {
                    question: 'In the same boat (traveling at 5 m/s), you now walk toward the BACK of the boat at 1 m/s. How fast are you moving from the riverbank\'s point of view?',
                    hint: 'Now you are walking against the direction of the boat.',
                    solution: 'From the riverbank, you are moving at 5 - 1 = 4 m/s. Since you are walking backward (opposite to the boat\'s direction), your walking speed subtracts from the boat speed.'
                }
            ]
        }
    ]
});
