window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'Acceleration',
    subtitle: 'Speed Can Change Too!',
    sections: [
        {
            id: 'speeding-up-slowing-down',
            title: 'Speeding Up and Slowing Down',
            content: `
                <h2>Speeding Up and Slowing Down</h2>
                <p>In the last chapter, we talked about speed. But here is something interesting: speed does not always stay the same! Cars speed up when they leave a traffic light and slow down when they approach a stop sign. A ball thrown upward slows down, stops, then speeds up coming back down.</p>

                <div class="env-block intuition">
                    <div class="env-title">Speed Changes All the Time</div>
                    <div class="env-body">
                        <p>Think about riding a bicycle. When you start pedaling from a stop, you go faster and faster -- you are <strong>speeding up</strong>. When you squeeze the brakes, you go slower and slower -- you are <strong>slowing down</strong>.</p>
                        <p>A change in speed is something we can measure and describe precisely. Scientists call it <strong>acceleration</strong>.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-accel-sim"></div>

                <div class="env-block example">
                    <div class="env-title">Examples of Changing Speed</div>
                    <div class="env-body">
                        <p><strong>Speeding up:</strong> A car leaving a green light, a ball rolling downhill, a rocket launching into space.</p>
                        <p><strong>Slowing down:</strong> A car approaching a red light, a ball rolling uphill, a hockey puck sliding to a stop on ice.</p>
                        <p><strong>Constant speed:</strong> A car on cruise control on a straight highway, the International Space Station orbiting Earth.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-accel-sim',
                    title: 'Acceleration Simulator',
                    description: 'Press the gas or brake to see a car speed up or slow down',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 175 });
                        var speed = 0;
                        var position = 50;
                        var accelMode = 'coast'; // 'gas', 'brake', 'coast'
                        var maxSpeed = 8;
                        var accelRate = 2;
                        var brakeRate = 3;

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var dt = 1 / 60;

                            // Apply acceleration
                            if (accelMode === 'gas') {
                                speed = Math.min(speed + accelRate * dt, maxSpeed);
                            } else if (accelMode === 'brake') {
                                speed = Math.max(speed - brakeRate * dt, 0);
                            }

                            // Update position
                            position += speed * dt * 40;
                            if (position > 750) position = -50;

                            // Sky
                            ctx.fillStyle = '#0a1628';
                            ctx.fillRect(0, 0, 700, 200);

                            // Road
                            ctx.fillStyle = '#333';
                            ctx.fillRect(0, 200, 700, 100);
                            ctx.fillStyle = '#555';
                            ctx.fillRect(0, 248, 700, 4);

                            // Road markings (move based on position to show motion)
                            var markOff = position % 80;
                            ctx.fillStyle = '#aaa';
                            for (var i = -1; i < 10; i++) {
                                ctx.fillRect(i * 80 - markOff + 40, 248, 30, 4);
                            }

                            // Car body
                            var carX = 300;
                            var carY = 210;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(carX, carY);
                            ctx.lineTo(carX + 80, carY);
                            ctx.lineTo(carX + 75, carY + 25);
                            ctx.lineTo(carX + 5, carY + 25);
                            ctx.closePath();
                            ctx.fill();
                            // Roof
                            ctx.fillStyle = viz.colors.blue + 'cc';
                            ctx.beginPath();
                            ctx.moveTo(carX + 15, carY);
                            ctx.lineTo(carX + 65, carY);
                            ctx.lineTo(carX + 55, carY - 18);
                            ctx.lineTo(carX + 25, carY - 18);
                            ctx.closePath();
                            ctx.fill();
                            // Windows
                            ctx.fillStyle = '#aaddff44';
                            ctx.fillRect(carX + 27, carY - 15, 12, 12);
                            ctx.fillRect(carX + 42, carY - 15, 12, 12);
                            // Wheels
                            ctx.fillStyle = '#222';
                            ctx.beginPath(); ctx.arc(carX + 20, carY + 28, 9, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(carX + 60, carY + 28, 9, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = '#666';
                            ctx.beginPath(); ctx.arc(carX + 20, carY + 28, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(carX + 60, carY + 28, 4, 0, Math.PI * 2); ctx.fill();

                            // Brake lights
                            if (accelMode === 'brake') {
                                ctx.fillStyle = '#ff3333';
                                ctx.beginPath(); ctx.arc(carX + 6, carY + 10, 4, 0, Math.PI * 2); ctx.fill();
                            }

                            // Exhaust when accelerating
                            if (accelMode === 'gas' && speed > 0.5) {
                                ctx.fillStyle = '#ffffff22';
                                for (var p = 0; p < 5; p++) {
                                    var px = carX - 5 - p * 12 - Math.random() * 5;
                                    var py = carY + 22 + Math.random() * 6 - 3;
                                    var pr = 3 + p * 2;
                                    ctx.beginPath(); ctx.arc(px, py, pr, 0, Math.PI * 2); ctx.fill();
                                }
                            }

                            // Dashboard
                            ctx.fillStyle = '#1a1a3088';
                            ctx.fillRect(150, 10, 400, 70);
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(150, 10, 400, 70);

                            // Speed display
                            viz.screenText('Speed: ' + (speed * 10).toFixed(1) + ' m/s', 260, 35, viz.colors.white, 18, 'center');

                            // Acceleration indicator
                            var accelText, accelColor;
                            if (accelMode === 'gas') {
                                accelText = 'ACCELERATING';
                                accelColor = viz.colors.green;
                            } else if (accelMode === 'brake') {
                                accelText = 'BRAKING';
                                accelColor = viz.colors.red;
                            } else {
                                accelText = 'COASTING';
                                accelColor = viz.colors.text;
                            }
                            viz.screenText(accelText, 440, 35, accelColor, 16, 'center');

                            // Speed bar
                            var barW = 300;
                            var barFill = (speed / maxSpeed) * barW;
                            ctx.fillStyle = '#333';
                            ctx.fillRect(200, 55, barW, 12);
                            var barColor = speed > maxSpeed * 0.7 ? viz.colors.orange : viz.colors.green;
                            ctx.fillStyle = barColor;
                            ctx.fillRect(200, 55, barFill, 12);
                        }

                        VizEngine.createButton(controls, 'Gas (Speed Up)', function() { accelMode = 'gas'; });
                        VizEngine.createButton(controls, 'Brake (Slow Down)', function() { accelMode = 'brake'; });
                        VizEngine.createButton(controls, 'Coast', function() { accelMode = 'coast'; });
                        VizEngine.createButton(controls, 'Reset', function() { speed = 0; position = 50; accelMode = 'coast'; });

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A ball rolls down a hill and gets faster. Is the ball speeding up or slowing down? What might cause this?',
                    hint: 'Think about what happens to objects on a slope.',
                    solution: 'The ball is speeding up. Gravity pulls the ball downhill, causing it to move faster and faster. This is an example of acceleration caused by the force of gravity.'
                },
                {
                    question: 'A skater glides across the ice and gradually comes to a stop. Is the skater speeding up or slowing down? What causes this?',
                    hint: 'What force acts against motion on ice?',
                    solution: 'The skater is slowing down. Even though ice is very smooth, there is still a small amount of friction between the skates and the ice. This friction gradually reduces the skater\'s speed until they stop.'
                }
            ]
        },
        {
            id: 'what-is-acceleration',
            title: 'What Is Acceleration?',
            content: `
                <h2>What Is Acceleration?</h2>
                <p>We know that speed tells us how fast position changes. But what tells us how fast <em>speed</em> changes? That is <strong>acceleration</strong>!</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Acceleration</div>
                    <div class="env-body">
                        <p><strong>Acceleration</strong> is the rate at which speed changes over time.</p>
                        <p>\\[\\text{acceleration} = \\frac{\\text{change in speed}}{\\text{time}}\\]</p>
                        <p>Or using letters: \\(a = \\frac{\\Delta v}{t}\\)</p>
                        <p>where \\(a\\) is acceleration, \\(\\Delta v\\) is the change in speed, and \\(t\\) is the time it takes to change.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Connecting Speed and Acceleration</div>
                    <div class="env-body">
                        <p>Speed tells us how fast position changes: \\(v = \\frac{d}{t}\\)</p>
                        <p>Acceleration tells us how fast speed changes: \\(a = \\frac{\\Delta v}{t}\\)</p>
                        <p>They are like a chain: position changes at a rate called speed, and speed changes at a rate called acceleration!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-accel-calc"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A car goes from 0 m/s to 20 m/s in 10 seconds. What is its acceleration?</p>
                        <p>\\[a = \\frac{\\Delta v}{t} = \\frac{20 - 0}{10} = 2 \\text{ m/s}^2\\]</p>
                        <p>This means the car's speed increases by 2 m/s every second!</p>
                        <p>After 1 second: 2 m/s. After 2 seconds: 4 m/s. After 3 seconds: 6 m/s. And so on!</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">The Unit: m/s squared</div>
                    <div class="env-body"><p>Acceleration is measured in \\(\\text{m/s}^2\\) (meters per second squared). This might look strange, but it just means "meters per second, per second" -- how many m/s of speed you gain each second.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-accel-calc',
                    title: 'Acceleration Calculator',
                    description: 'Set the initial speed, final speed, and time to calculate acceleration',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 175 });
                        var v0 = 0;
                        var vf = 20;
                        var time = 10;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var accel = (vf - v0) / time;

                            viz.screenText('Acceleration Calculator', viz.width / 2, 25, viz.colors.white, 18, 'center');

                            // Formula
                            viz.screenText('a = (final speed - initial speed) / time', viz.width / 2, 55, viz.colors.teal, 13, 'center');

                            // Input values
                            viz.screenText('Initial speed = ' + v0.toFixed(1) + ' m/s', viz.width / 2, 90, viz.colors.blue, 14, 'center');
                            viz.screenText('Final speed = ' + vf.toFixed(1) + ' m/s', viz.width / 2, 115, viz.colors.orange, 14, 'center');
                            viz.screenText('Time = ' + time.toFixed(1) + ' s', viz.width / 2, 140, viz.colors.green, 14, 'center');

                            // Divider
                            ctx.strokeStyle = viz.colors.text + '66';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(200, 158); ctx.lineTo(500, 158); ctx.stroke();

                            // Result
                            var resultColor = accel > 0 ? viz.colors.green : (accel < 0 ? viz.colors.red : viz.colors.text);
                            var resultWord = accel > 0 ? '(speeding up!)' : (accel < 0 ? '(slowing down!)' : '(constant speed)');
                            viz.screenText('Acceleration = ' + accel.toFixed(2) + ' m/s\u00B2', viz.width / 2, 185, resultColor, 20, 'center');
                            viz.screenText(resultWord, viz.width / 2, 210, resultColor, 14, 'center');

                            // Visual: speed bar at each second
                            var barY = 240;
                            var barMaxW = 400;
                            var barH = 14;
                            var maxV = Math.max(Math.abs(v0), Math.abs(vf), 1);
                            var numSteps = Math.min(Math.round(time), 10);

                            viz.screenText('Speed at each second:', 150, barY - 5, viz.colors.text, 11, 'left');
                            for (var i = 0; i <= numSteps; i++) {
                                var tFrac = (numSteps > 0) ? i / numSteps : 0;
                                var vAtT = v0 + accel * tFrac * time;
                                var bw = Math.abs(vAtT) / maxV * barMaxW * 0.6;
                                var by = barY + i * (barH + 3);
                                if (by + barH > 345) break;

                                var sec = (tFrac * time).toFixed(0);
                                viz.screenText(sec + 's:', 150, by + barH / 2, viz.colors.text, 10, 'right');

                                ctx.fillStyle = (vAtT >= 0 ? viz.colors.blue : viz.colors.red) + '44';
                                ctx.fillRect(160, by, bw, barH);
                                ctx.fillStyle = vAtT >= 0 ? viz.colors.blue : viz.colors.red;
                                ctx.fillRect(160, by, bw, 2);

                                viz.screenText(vAtT.toFixed(1) + ' m/s', 165 + bw + 5, by + barH / 2, viz.colors.text, 9, 'left');
                            }
                        }

                        VizEngine.createSlider(controls, 'Initial speed (m/s)', 0, 30, 0, 1, function(v) { v0 = v; draw(); });
                        VizEngine.createSlider(controls, 'Final speed (m/s)', 0, 30, 20, 1, function(v) { vf = v; draw(); });
                        VizEngine.createSlider(controls, 'Time (s)', 1, 20, 10, 1, function(v) { time = v; draw(); });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A bicycle goes from 0 m/s to 8 m/s in 4 seconds. What is its acceleration?',
                    hint: 'Use the formula: acceleration = change in speed / time.',
                    solution: 'Acceleration = (8 - 0) / 4 = 2 m/s squared. The bicycle gains 2 m/s of speed every second.'
                },
                {
                    question: 'A car has an acceleration of 3 m/s squared. If it starts from rest, what is its speed after 5 seconds?',
                    hint: 'If the car gains 3 m/s each second, how much speed does it gain in 5 seconds?',
                    solution: 'Starting from 0 m/s and gaining 3 m/s every second: after 5 seconds the speed is 0 + 3 x 5 = 15 m/s.'
                }
            ]
        },
        {
            id: 'positive-negative-acceleration',
            title: 'Positive and Negative Acceleration',
            content: `
                <h2>Positive and Negative Acceleration</h2>
                <p>Acceleration can be <strong>positive</strong> or <strong>negative</strong>. This tells us whether an object is speeding up or slowing down.</p>

                <div class="env-block definition">
                    <div class="env-title">Positive vs Negative Acceleration</div>
                    <div class="env-body">
                        <p><strong>Positive acceleration:</strong> Speed is increasing. The object is going faster. Example: a car speeding up from a traffic light.</p>
                        <p><strong>Negative acceleration (deceleration):</strong> Speed is decreasing. The object is going slower. Example: a car braking before a stop sign.</p>
                        <p><strong>Zero acceleration:</strong> Speed is not changing. The object moves at constant speed (or is stopped).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">The Sign Tells the Story</div>
                    <div class="env-body">
                        <p>If a car's speed goes from 10 m/s to 20 m/s in 5 seconds:</p>
                        <p>\\[a = \\frac{20 - 10}{5} = +2 \\text{ m/s}^2\\] (positive = speeding up)</p>
                        <p>If a car's speed goes from 20 m/s to 10 m/s in 5 seconds:</p>
                        <p>\\[a = \\frac{10 - 20}{5} = -2 \\text{ m/s}^2\\] (negative = slowing down)</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-pos-neg-accel"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Roller Coaster</div>
                    <div class="env-body">
                        <p>As the roller coaster goes downhill, it has <strong>positive acceleration</strong> (speeds up).</p>
                        <p>As it goes uphill, it has <strong>negative acceleration</strong> (slows down).</p>
                        <p>At the very top of a hill, for a brief moment, it might have <strong>zero acceleration</strong> as it changes from slowing down to speeding up again.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-pos-neg-accel',
                    title: 'Roller Coaster Acceleration',
                    description: 'Watch a ball on a roller coaster track and see how acceleration changes',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 175 });
                        var speed = 1.0;

                        function trackY(x) {
                            // Roller coaster profile: starts high, dips, rises, dips again
                            return 100 + 60 * Math.sin(x * 0.015) - 30 * Math.cos(x * 0.008) + 20 * Math.sin(x * 0.025);
                        }

                        function trackSlope(x) {
                            var h = 0.5;
                            return (trackY(x + h) - trackY(x - h)) / (2 * h);
                        }

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var s = t * 0.001 * speed;

                            // Ball position along track
                            var ballTrackX = (s * 120) % 700;

                            // Draw track
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (var x = 0; x <= 700; x += 2) {
                                var y = trackY(x);
                                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // Support pillars
                            ctx.strokeStyle = viz.colors.text + '33';
                            ctx.lineWidth = 1;
                            for (var px = 50; px <= 650; px += 100) {
                                ctx.beginPath(); ctx.moveTo(px, trackY(px)); ctx.lineTo(px, 320); ctx.stroke();
                            }

                            // Ground
                            ctx.fillStyle = '#1a2a1a';
                            ctx.fillRect(0, 320, 700, 30);

                            // Ball
                            var ballY = trackY(ballTrackX) - 10;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(ballTrackX, ballY, 10, 0, Math.PI * 2); ctx.fill();
                            // Glow
                            ctx.fillStyle = viz.colors.orange + '33';
                            ctx.beginPath(); ctx.arc(ballTrackX, ballY, 16, 0, Math.PI * 2); ctx.fill();

                            // Calculate slope -> acceleration indicator
                            var slope = trackSlope(ballTrackX);
                            // Going downhill (positive slope in screen coords) = speeding up
                            var accelType, accelColor, accelLabel;
                            if (slope > 0.15) {
                                accelType = 'positive';
                                accelColor = viz.colors.green;
                                accelLabel = 'Going DOWNHILL = Speeding up (positive acceleration)';
                            } else if (slope < -0.15) {
                                accelType = 'negative';
                                accelColor = viz.colors.red;
                                accelLabel = 'Going UPHILL = Slowing down (negative acceleration)';
                            } else {
                                accelType = 'zero';
                                accelColor = viz.colors.yellow;
                                accelLabel = 'At the TOP or BOTTOM = Near zero acceleration';
                            }

                            // Info panel
                            ctx.fillStyle = '#0c0c20cc';
                            ctx.fillRect(100, 5, 500, 55);
                            ctx.strokeStyle = accelColor + '66';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(100, 5, 500, 55);
                            viz.screenText('Roller Coaster Acceleration', viz.width / 2, 22, viz.colors.white, 15, 'center');
                            viz.screenText(accelLabel, viz.width / 2, 45, accelColor, 12, 'center');

                            // Acceleration arrow on ball
                            if (accelType === 'positive') {
                                // Arrow pointing right (forward)
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.moveTo(ballTrackX + 18, ballY); ctx.lineTo(ballTrackX + 30, ballY); ctx.lineTo(ballTrackX + 26, ballY - 5); ctx.moveTo(ballTrackX + 30, ballY); ctx.lineTo(ballTrackX + 26, ballY + 5); ctx.stroke();
                                ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(ballTrackX + 18, ballY); ctx.lineTo(ballTrackX + 30, ballY); ctx.stroke();
                            } else if (accelType === 'negative') {
                                ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(ballTrackX - 18, ballY); ctx.lineTo(ballTrackX - 30, ballY); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(ballTrackX - 30, ballY); ctx.lineTo(ballTrackX - 26, ballY - 5); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(ballTrackX - 30, ballY); ctx.lineTo(ballTrackX - 26, ballY + 5); ctx.stroke();
                            }
                        }

                        VizEngine.createSlider(controls, 'Speed', 0.3, 3.0, 1.0, 0.1, function(v) { speed = v; });

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A bus slows from 15 m/s to 5 m/s in 5 seconds. What is its acceleration? Is it positive or negative?',
                    hint: 'Use the formula and pay attention to the sign.',
                    solution: 'Acceleration = (5 - 15) / 5 = -10 / 5 = -2 m/s squared. The acceleration is negative because the bus is slowing down (decelerating).'
                },
                {
                    question: 'Can an object have a speed of zero and still have acceleration? Think about a ball thrown straight up at its highest point.',
                    hint: 'At the very top, the ball stops for an instant before falling back down.',
                    solution: 'Yes! At the highest point, the ball has zero speed for an instant, but gravity is still pulling it downward. Its acceleration due to gravity is about 9.8 m/s squared downward. The ball immediately starts speeding up in the downward direction. Zero speed does not mean zero acceleration!'
                }
            ]
        },
        {
            id: 'speed-time-graphs',
            title: 'Speed-Time Graphs',
            content: `
                <h2>Speed-Time Graphs</h2>
                <p>Just like distance-time graphs show how far you have gone, <strong>speed-time graphs</strong> show how fast you are going at each moment.</p>

                <div class="env-block definition">
                    <div class="env-title">Speed-Time Graph</div>
                    <div class="env-body"><p>A <strong>speed-time graph</strong> has time on the horizontal axis and speed on the vertical axis. The shape of the line tells us about acceleration.</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Reading Speed-Time Graphs</div>
                    <div class="env-body">
                        <p><strong>Horizontal line:</strong> Constant speed (zero acceleration). The object is not speeding up or slowing down.</p>
                        <p><strong>Line going up:</strong> Speed is increasing = positive acceleration (speeding up).</p>
                        <p><strong>Line going down:</strong> Speed is decreasing = negative acceleration (slowing down).</p>
                        <p><strong>Steeper line:</strong> Greater acceleration (speed changes faster).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-st-graph"></div>

                <div class="env-block example">
                    <div class="env-title">Example: A Journey in Four Phases</div>
                    <div class="env-body">
                        <p>Phase 1 (0-5 s): Speed goes from 0 to 10 m/s. The car accelerates.</p>
                        <p>Phase 2 (5-15 s): Speed stays at 10 m/s. Constant speed, no acceleration.</p>
                        <p>Phase 3 (15-20 s): Speed goes from 10 to 20 m/s. The car accelerates again.</p>
                        <p>Phase 4 (20-25 s): Speed goes from 20 to 0 m/s. The car brakes to a stop.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">The Slope Trick</div>
                    <div class="env-body">
                        <p>On a <strong>distance-time graph</strong>, the slope (steepness) gives you the <strong>speed</strong>.</p>
                        <p>On a <strong>speed-time graph</strong>, the slope gives you the <strong>acceleration</strong>!</p>
                        <p>Flat line on a speed-time graph = zero slope = zero acceleration.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-st-graph',
                    title: 'Speed-Time Graph Builder',
                    description: 'Adjust acceleration to build different speed-time graphs',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 1, originX: 80, originY: 300 });
                        var accel1 = 2;
                        var accel2 = 0;
                        var accel3 = -1;
                        var phaseDuration = 5;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var leftMargin = 80;
                            var plotWidth = 550;
                            var plotHeight = 250;
                            var plotLeft = leftMargin;
                            var plotBottom = 300;
                            var plotTop = plotBottom - plotHeight;

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            var totalTime = phaseDuration * 3;
                            var maxSpeed = 30;
                            for (var gx = 0; gx <= totalTime; gx++) {
                                var px = plotLeft + (gx / totalTime) * plotWidth;
                                ctx.beginPath(); ctx.moveTo(px, plotTop); ctx.lineTo(px, plotBottom); ctx.stroke();
                            }
                            for (var gy = 0; gy <= 6; gy++) {
                                var py = plotBottom - (gy / 6) * plotHeight;
                                ctx.beginPath(); ctx.moveTo(plotLeft, py); ctx.lineTo(plotLeft + plotWidth, py); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(plotLeft, plotTop); ctx.lineTo(plotLeft, plotBottom); ctx.lineTo(plotLeft + plotWidth, plotBottom); ctx.stroke();

                            // Axis labels
                            viz.screenText('Time (s)', plotLeft + plotWidth / 2, plotBottom + 35, viz.colors.text, 13, 'center');
                            ctx.save();
                            ctx.translate(20, plotTop + plotHeight / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Speed (m/s)', 0, 0);
                            ctx.restore();

                            // Tick labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                            for (var tx = 0; tx <= totalTime; tx += Math.max(1, Math.floor(totalTime / 10))) {
                                ctx.fillText(String(tx), plotLeft + (tx / totalTime) * plotWidth, plotBottom + 5);
                            }
                            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                            for (var ty = 0; ty <= 6; ty++) {
                                ctx.fillText((ty * maxSpeed / 6).toFixed(0), plotLeft - 5, plotBottom - (ty / 6) * plotHeight);
                            }

                            // Calculate speed profile
                            var speeds = [];
                            var v = 0;
                            var dt = 0.1;
                            for (var t = 0; t <= totalTime; t += dt) {
                                var a;
                                if (t < phaseDuration) {
                                    a = accel1;
                                } else if (t < phaseDuration * 2) {
                                    a = accel2;
                                } else {
                                    a = accel3;
                                }
                                v = v + a * dt;
                                if (v < 0) v = 0;
                                if (v > maxSpeed) v = maxSpeed;
                                speeds.push({ t: t, v: v });
                            }

                            // Phase backgrounds
                            var phaseColors = [viz.colors.green + '11', viz.colors.blue + '11', viz.colors.red + '11'];
                            for (var p = 0; p < 3; p++) {
                                var x1 = plotLeft + (p * phaseDuration / totalTime) * plotWidth;
                                var x2 = plotLeft + ((p + 1) * phaseDuration / totalTime) * plotWidth;
                                ctx.fillStyle = phaseColors[p];
                                ctx.fillRect(x1, plotTop, x2 - x1, plotHeight);
                            }

                            // Phase labels
                            var phaseLabels = [
                                'a = ' + accel1.toFixed(1),
                                'a = ' + accel2.toFixed(1),
                                'a = ' + accel3.toFixed(1)
                            ];
                            var phaseLabelColors = [viz.colors.green, viz.colors.blue, viz.colors.red];
                            for (var pl = 0; pl < 3; pl++) {
                                var xm = plotLeft + ((pl + 0.5) * phaseDuration / totalTime) * plotWidth;
                                viz.screenText(phaseLabels[pl], xm, plotTop + 15, phaseLabelColors[pl], 11, 'center');
                            }

                            // Plot speed line
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var si = 0; si < speeds.length; si++) {
                                var sp = speeds[si];
                                var sx = plotLeft + (sp.t / totalTime) * plotWidth;
                                var sy = plotBottom - (sp.v / maxSpeed) * plotHeight;
                                if (si === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();

                            viz.screenText('Speed-Time Graph: The slope = acceleration!', viz.width / 2, 17, viz.colors.teal, 13, 'center');
                        }

                        VizEngine.createSlider(controls, 'Phase 1 accel', -4, 4, 2, 0.5, function(v) { accel1 = v; draw(); });
                        VizEngine.createSlider(controls, 'Phase 2 accel', -4, 4, 0, 0.5, function(v) { accel2 = v; draw(); });
                        VizEngine.createSlider(controls, 'Phase 3 accel', -4, 4, -1, 0.5, function(v) { accel3 = v; draw(); });
                        VizEngine.createSlider(controls, 'Phase length (s)', 3, 10, 5, 1, function(v) { phaseDuration = v; draw(); });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'On a speed-time graph, you see a straight line going upward from (0, 0) to (8, 24). What is the acceleration?',
                    hint: 'The slope of a speed-time graph gives the acceleration. Slope = rise / run.',
                    solution: 'The slope = (24 - 0) / (8 - 0) = 24 / 8 = 3 m/s squared. The acceleration is 3 m/s squared, meaning the object gains 3 m/s of speed every second.'
                },
                {
                    question: 'A speed-time graph shows a horizontal line at 15 m/s for 10 seconds. What is the acceleration? How far did the object travel?',
                    hint: 'A horizontal line means constant speed. For distance, think about what the area under the graph represents.',
                    solution: 'The acceleration is 0 because the speed does not change (the line is flat). The distance traveled is speed x time = 15 m/s x 10 s = 150 meters. (Fun fact: the area under a speed-time graph equals the distance traveled!)'
                }
            ]
        }
    ]
});
