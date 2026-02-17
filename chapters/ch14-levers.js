window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch14',
    number: 14,
    title: 'Levers',
    subtitle: 'Moving the World',
    sections: [
        {
            id: 'what-is-a-lever',
            title: 'What Is a Lever?',
            content: `
                <h2>What Is a Lever?</h2>
                <p>A <strong>lever</strong> is one of the simplest machines ever invented. It is just a stiff bar that can rotate around a fixed point. People have used levers for thousands of years to lift heavy objects that they could never move with their bare hands.</p>

                <div class="env-block definition">
                    <div class="env-title">Key Parts of a Lever</div>
                    <div class="env-body">
                        <p><strong>Fulcrum</strong> — the fixed point where the lever pivots (like the center of a seesaw).</p>
                        <p><strong>Effort</strong> — the force you push or pull with.</p>
                        <p><strong>Load</strong> — the heavy thing you want to move.</p>
                    </div>
                </div>

                <p>Think of a seesaw on a playground. The middle support is the fulcrum, you push down on one side (effort), and your friend on the other side goes up (load). That is a lever in action!</p>

                <div class="viz-placeholder" data-viz="viz-lever-parts"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>The ancient Greek scientist Archimedes said: "Give me a lever long enough and a place to stand, and I shall move the Earth!" He understood that levers multiply your force.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-lever-parts',
                    title: 'Parts of a Lever',
                    description: 'See the three parts of a lever: fulcrum, effort, and load.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 300, scale: 40, originX: 350, originY: 220});

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw beam
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 6;
                            ctx.beginPath();
                            ctx.moveTo(80, 160);
                            ctx.lineTo(620, 160);
                            ctx.stroke();

                            // Draw fulcrum triangle
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.moveTo(350, 166);
                            ctx.lineTo(330, 220);
                            ctx.lineTo(370, 220);
                            ctx.closePath();
                            ctx.fill();

                            // Ground line
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(40, 220);
                            ctx.lineTo(660, 220);
                            ctx.stroke();

                            // Load (left side)
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(100, 110, 80, 50);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('LOAD', 140, 135);

                            // Effort arrow (right side, pushing down)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(560, 80);
                            ctx.lineTo(560, 150);
                            ctx.stroke();
                            // Arrowhead
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(560, 155);
                            ctx.lineTo(550, 140);
                            ctx.lineTo(570, 140);
                            ctx.closePath();
                            ctx.fill();

                            // Labels
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('FULCRUM', 350, 245);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('EFFORT', 560, 65);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('LOAD', 140, 95);

                            // Distance labels
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Load Arm', 215, 185);
                            ctx.fillText('Effort Arm', 480, 185);

                            // Distance arrows
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(140, 175);
                            ctx.lineTo(340, 175);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(360, 175);
                            ctx.lineTo(560, 175);
                            ctx.stroke();
                            ctx.setLineDash([]);
                        }
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'What are the three main parts of a lever?',
                    hint: 'Think about the fixed point, the force you apply, and what you are trying to move.',
                    solution: 'The three parts are: the fulcrum (the fixed pivot point), the effort (the force applied), and the load (the object being moved).'
                },
                {
                    question: 'On a seesaw, which part is the fulcrum?',
                    hint: 'The fulcrum is the point that does not move.',
                    solution: 'The fulcrum is the central support in the middle of the seesaw. It is the fixed point around which the seesaw rotates.'
                }
            ]
        },
        {
            id: 'three-classes',
            title: 'Three Classes of Levers',
            content: `
                <h2>Three Classes of Levers</h2>
                <p>Not all levers look the same! Scientists organize levers into three classes based on where the fulcrum, effort, and load are positioned.</p>

                <div class="env-block definition">
                    <div class="env-title">The Three Classes</div>
                    <div class="env-body">
                        <p><strong>Class 1:</strong> The fulcrum is between the effort and the load. Example: a seesaw.</p>
                        <p><strong>Class 2:</strong> The load is between the fulcrum and the effort. Example: a wheelbarrow.</p>
                        <p><strong>Class 3:</strong> The effort is between the fulcrum and the load. Example: a fishing rod.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-three-classes"></div>

                <div class="env-block example">
                    <div class="env-title">Everyday Examples</div>
                    <div class="env-body">
                        <p><strong>Class 1:</strong> Scissors, pliers, crowbar</p>
                        <p><strong>Class 2:</strong> Nutcracker, bottle opener, door</p>
                        <p><strong>Class 3:</strong> Tweezers, baseball bat, your arm lifting something</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>Class 1 and Class 2 levers make work easier by multiplying force. Class 3 levers do not multiply force, but they multiply speed and distance instead! That is why we use fishing rods — a small movement of your hand moves the tip a long way.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-three-classes',
                    title: 'Three Classes of Levers',
                    description: 'Compare the three classes side by side.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 40, originX: 350, originY: 200});
                        var currentClass = 1;

                        function drawLever(classNum) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var titles = ['', 'Class 1: Fulcrum in the Middle', 'Class 2: Load in the Middle', 'Class 3: Effort in the Middle'];
                            var examples = ['', 'Example: Seesaw, Scissors', 'Example: Wheelbarrow, Nutcracker', 'Example: Fishing Rod, Tweezers'];

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(titles[classNum], 350, 30);

                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillText(examples[classNum], 350, 55);

                            // Ground
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(60, 280);
                            ctx.lineTo(640, 280);
                            ctx.stroke();

                            // Beam
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 6;
                            ctx.beginPath();
                            ctx.moveTo(120, 200);
                            ctx.lineTo(580, 200);
                            ctx.stroke();

                            var fulcrumX, loadX, effortX;
                            if (classNum === 1) { loadX = 170; fulcrumX = 350; effortX = 530; }
                            else if (classNum === 2) { fulcrumX = 150; loadX = 350; effortX = 550; }
                            else { fulcrumX = 150; effortX = 350; loadX = 550; }

                            // Fulcrum
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.moveTo(fulcrumX, 206);
                            ctx.lineTo(fulcrumX - 20, 270);
                            ctx.lineTo(fulcrumX + 20, 270);
                            ctx.closePath();
                            ctx.fill();
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('F', fulcrumX, 290);

                            // Load box
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(loadX - 30, 155, 60, 45);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.fillText('Load', loadX, 178);
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('L', loadX, 140);

                            // Effort arrow
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(effortX, 120);
                            ctx.lineTo(effortX, 190);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(effortX, 195);
                            ctx.lineTo(effortX - 10, 180);
                            ctx.lineTo(effortX + 10, 180);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('E', effortX, 110);

                            // Legend
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.fillText('F = Fulcrum', 60, 340);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('L = Load', 200, 340);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('E = Effort', 320, 340);
                        }

                        VizEngine.createButton(controls, 'Class 1', function() { currentClass = 1; drawLever(1); });
                        VizEngine.createButton(controls, 'Class 2', function() { currentClass = 2; drawLever(2); });
                        VizEngine.createButton(controls, 'Class 3', function() { currentClass = 3; drawLever(3); });

                        drawLever(1);
                    }
                }
            ],
            exercises: [
                {
                    question: 'A wheelbarrow has the wheel at one end, the load in the middle, and you lift the handles at the other end. What class of lever is it?',
                    hint: 'Think about the order: fulcrum (wheel), load, effort (your hands).',
                    solution: 'A wheelbarrow is a Class 2 lever. The fulcrum is the wheel, the load is in the middle, and the effort is at the handles.'
                },
                {
                    question: 'Why does a Class 3 lever not multiply force? What does it multiply instead?',
                    hint: 'Think about how far the tip of a fishing rod moves when you flick your wrist.',
                    solution: 'In a Class 3 lever, the effort is closer to the fulcrum than the load, so the load moves a greater distance but requires more force. It multiplies speed and distance instead of force.'
                }
            ]
        },
        {
            id: 'lever-balance',
            title: 'The Lever Balance Equation',
            content: `
                <h2>The Lever Balance Equation</h2>
                <p>Levers follow a simple but powerful rule. For a lever to be perfectly balanced:</p>

                <div class="env-block definition">
                    <div class="env-title">The Lever Principle</div>
                    <div class="env-body">
                        <p>\\[ \\text{Effort} \\times \\text{Effort Arm} = \\text{Load} \\times \\text{Load Arm} \\]</p>
                        <p>Or simply: \\( F_1 \\times d_1 = F_2 \\times d_2 \\)</p>
                    </div>
                </div>

                <p>This means if you sit farther from the fulcrum on a seesaw, you can balance a heavier friend who sits closer! The product of force and distance on each side must be equal.</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A child weighing 30 kg sits 2 meters from the fulcrum. Where should a child weighing 20 kg sit to balance?</p>
                        <p>\\( 30 \\times 2 = 20 \\times d_2 \\)</p>
                        <p>\\( d_2 = \\frac{60}{20} = 3 \\) meters from the fulcrum.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-lever-balance"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>This is why a long crowbar lets you lift a huge rock. Your effort arm is very long compared to the short load arm, so a small push creates a huge lifting force!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-lever-balance',
                    title: 'Lever Balance Simulator',
                    description: 'Drag the weights on the beam to see when the lever balances.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 350, scale: 35, originX: 350, originY: 200});
                        var leftWeight = 3;
                        var rightWeight = 2;
                        var leftPos = -4;
                        var rightPos = 4;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var leftTorque = leftWeight * Math.abs(leftPos);
                            var rightTorque = rightWeight * Math.abs(rightPos);
                            var tilt = (rightTorque - leftTorque) * 0.5;
                            tilt = Math.max(-15, Math.min(15, tilt));

                            var angleRad = tilt * Math.PI / 180;
                            var cx = 350, cy = 180;

                            // Ground
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(40, 270);
                            ctx.lineTo(660, 270);
                            ctx.stroke();

                            // Fulcrum
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.moveTo(cx, cy + 6);
                            ctx.lineTo(cx - 25, 270);
                            ctx.lineTo(cx + 25, 270);
                            ctx.closePath();
                            ctx.fill();

                            // Beam (tilted)
                            ctx.save();
                            ctx.translate(cx, cy);
                            ctx.rotate(angleRad);

                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 6;
                            ctx.beginPath();
                            ctx.moveTo(-250, 0);
                            ctx.lineTo(250, 0);
                            ctx.stroke();

                            // Tick marks
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 1;
                            for (var i = -6; i <= 6; i++) {
                                if (i === 0) continue;
                                var tx = i * 35;
                                ctx.beginPath();
                                ctx.moveTo(tx, -5);
                                ctx.lineTo(tx, 5);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.muted;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(Math.abs(i).toString(), tx, 18);
                            }

                            // Left weight
                            var lx = leftPos * 35;
                            var boxH = leftWeight * 12;
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(lx - 20, -boxH - 3, 40, boxH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(leftWeight + ' kg', lx, -boxH / 2 - 3);

                            // Right weight
                            var rx = rightPos * 35;
                            boxH = rightWeight * 12;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(rx - 20, -boxH - 3, 40, boxH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText(rightWeight + ' kg', rx, -boxH / 2 - 3);

                            ctx.restore();

                            // Status
                            var balanced = Math.abs(leftTorque - rightTorque) < 0.1;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (balanced) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('BALANCED!', 350, 30);
                            } else {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText(leftTorque > rightTorque ? 'Tilts LEFT' : 'Tilts RIGHT', 350, 30);
                            }

                            // Torque info
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.red;
                            ctx.textAlign = 'left';
                            ctx.fillText('Left: ' + leftWeight + ' x ' + Math.abs(leftPos) + ' = ' + leftTorque.toFixed(1), 30, 310);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.textAlign = 'right';
                            ctx.fillText('Right: ' + rightWeight + ' x ' + rightPos + ' = ' + rightTorque.toFixed(1), 670, 310);
                        }

                        VizEngine.createSlider(controls, 'Left Weight (kg)', 1, 6, leftWeight, 1, function(v) { leftWeight = v; draw(); });
                        VizEngine.createSlider(controls, 'Left Position', 1, 6, Math.abs(leftPos), 1, function(v) { leftPos = -v; draw(); });
                        VizEngine.createSlider(controls, 'Right Weight (kg)', 1, 6, rightWeight, 1, function(v) { rightWeight = v; draw(); });
                        VizEngine.createSlider(controls, 'Right Position', 1, 6, rightPos, 1, function(v) { rightPos = v; draw(); });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 40 N load is 1 meter from the fulcrum. How much effort is needed if the effort arm is 4 meters?',
                    hint: 'Use the lever equation: Effort x Effort Arm = Load x Load Arm.',
                    solution: 'Effort x 4 = 40 x 1, so Effort = 40/4 = 10 N. You only need 10 N of force, which is 4 times less than the load!'
                }
            ]
        },
        {
            id: 'levers-everyday',
            title: 'Levers in Everyday Life',
            content: `
                <h2>Levers in Everyday Life</h2>
                <p>Levers are everywhere around you! Once you know what to look for, you will find them in your kitchen, at school, and even in your own body.</p>

                <div class="env-block example">
                    <div class="env-title">Levers in Your Body</div>
                    <div class="env-body">
                        <p>Your arm is a Class 3 lever! The fulcrum is your elbow joint, your bicep muscle provides the effort, and the object in your hand is the load. Your muscles are attached close to the elbow, so you trade force for speed — that is why you can throw a ball fast!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-seesaw"></div>

                <div class="env-block remark">
                    <div class="env-title">Try This at Home</div>
                    <div class="env-body">
                        <p>Try opening a door by pushing near the hinges vs. near the handle. Which is easier? The handle is far from the fulcrum (hinges), so you need less force! That is why door handles are placed at the edge, far from the hinges.</p>
                    </div>
                </div>

                <p>Simple machines like levers do not create energy out of nothing. They trade force for distance. If you use less force, you must push through a greater distance. The total work stays the same!</p>

                <div class="env-block warning">
                    <div class="env-title">Important Rule</div>
                    <div class="env-body"><p>A lever does not reduce the total work you do — it just makes the task easier by letting you use less force over a longer distance.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-seesaw',
                    title: 'Seesaw Playground',
                    description: 'Watch the seesaw go up and down as the characters play.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 300, scale: 40, originX: 350, originY: 200});
                        var time = 0;
                        var playing = true;

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            time = t || 0;
                            var angle = Math.sin(time / 800) * 12;
                            var angleRad = angle * Math.PI / 180;
                            var cx = 350, cy = 170;

                            // Sky gradient effect
                            ctx.fillStyle = '#0a0a1a';
                            ctx.fillRect(0, 0, 700, 300);

                            // Ground
                            ctx.fillStyle = '#1a3a1a';
                            ctx.fillRect(0, 240, 700, 60);

                            // Fulcrum
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.moveTo(cx, cy + 5);
                            ctx.lineTo(cx - 30, 240);
                            ctx.lineTo(cx + 30, 240);
                            ctx.closePath();
                            ctx.fill();

                            // Beam
                            ctx.save();
                            ctx.translate(cx, cy);
                            ctx.rotate(angleRad);

                            ctx.strokeStyle = '#8B4513';
                            ctx.lineWidth = 8;
                            ctx.beginPath();
                            ctx.moveTo(-200, 0);
                            ctx.lineTo(200, 0);
                            ctx.stroke();

                            // Left person (circle head + body)
                            var leftY = -4;
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.arc(-170, leftY - 30, 15, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(-170, leftY - 15);
                            ctx.lineTo(-170, leftY);
                            ctx.stroke();

                            // Right person
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(170, -leftY - 30, 12, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(170, -leftY - 15);
                            ctx.lineTo(170, -leftY);
                            ctx.stroke();

                            ctx.restore();

                            // Labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Heavier', 180, 268);
                            ctx.fillText('Lighter', 520, 268);
                        }

                        viz.animate(function(t) {
                            if (playing) draw(t);
                        });

                        VizEngine.createButton(controls, 'Pause / Play', function() {
                            playing = !playing;
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Name three levers you can find in your kitchen.',
                    hint: 'Think about tools you use to open, cut, or lift things.',
                    solution: 'Examples: a bottle opener (Class 2), kitchen tongs (Class 3), scissors (Class 1), a spatula (Class 3), or a nutcracker (Class 2).'
                }
            ]
        }
    ]
});
