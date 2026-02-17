window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch13',
    number: 13,
    title: 'Free Fall',
    subtitle: 'Do All Things Fall the Same?',
    sections: [
        {
            id: 'galileo-experiment',
            title: "Galileo's Experiment",
            content: `
                <h2>Galileo's Great Experiment</h2>
                <p>For thousands of years, people believed that heavier objects fall faster than lighter ones. This idea came from the Greek philosopher <strong>Aristotle</strong>. It seems to make sense - drop a rock and a feather, and the rock hits the ground first.</p>

                <p>But around 1590, the Italian scientist <strong>Galileo Galilei</strong> challenged this idea. Legend says he dropped two balls of different weights from the Leaning Tower of Pisa. They hit the ground at almost the same time!</p>

                <div class="env-block definition">
                    <div class="env-title">Galileo's Discovery</div>
                    <div class="env-body"><p>In the absence of air resistance, <strong>all objects fall at the same rate</strong>, regardless of their mass. A heavy ball and a light ball dropped from the same height will hit the ground at the same time.</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Same Speed?</div>
                    <div class="env-body">
                        <p>This seems strange, but think about it using \\(F = ma\\):</p>
                        <ul>
                            <li>A 10 kg ball has 10 times the gravitational force of a 1 kg ball</li>
                            <li>But it also has 10 times the mass (inertia)</li>
                            <li>So the acceleration is the same: \\(a = F/m = mg/m = g\\)</li>
                        </ul>
                        <p>The extra force and extra mass cancel out perfectly!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-drop-two"></div>

                <div class="env-block remark">
                    <div class="env-title">The Value of g</div>
                    <div class="env-body"><p>Near Earth's surface, all objects in free fall accelerate at about \\(g \\approx 9.8\\) m/s\\(^2\\) (or roughly 10 m/s\\(^2\\) for easy math). This means every second, a falling object's speed increases by about 10 m/s.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-drop-two',
                    title: 'Drop Two Objects (No Air)',
                    description: 'Drop objects of different masses in a vacuum (no air). Watch them fall at exactly the same rate! Click "Drop!" to start.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 380, scale: 30, originX: 350, originY: 30});
                        var mass1 = 1;
                        var mass2 = 10;
                        var y1 = 0;
                        var y2 = 0;
                        var vel1 = 0;
                        var vel2 = 0;
                        var dropping = false;
                        var landed = false;
                        var g = 9.8;
                        var dropTime = 0;
                        var groundY = -10;

                        VizEngine.createSlider(controls, 'Mass A (kg)', 0.5, 20, 1, 0.5, function(val) {
                            mass1 = val;
                        });
                        VizEngine.createSlider(controls, 'Mass B (kg)', 0.5, 20, 10, 0.5, function(val) {
                            mass2 = val;
                        });

                        VizEngine.createButton(controls, 'Drop!', function() {
                            y1 = 0;
                            y2 = 0;
                            vel1 = 0;
                            vel2 = 0;
                            dropping = true;
                            landed = false;
                            dropTime = 0;
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            y1 = 0;
                            y2 = 0;
                            vel1 = 0;
                            vel2 = 0;
                            dropping = false;
                            landed = false;
                            dropTime = 0;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // vacuum label
                            viz.screenText('VACUUM (No Air)', 350, 20, viz.colors.purple, 14);

                            // drop platform
                            ctx.fillStyle = '#444';
                            ctx.fillRect(150, 50, 400, 8);

                            // ground
                            ctx.fillStyle = '#2a3a2a';
                            ctx.fillRect(0, 345, 700, 35);

                            // height markers
                            ctx.strokeStyle = '#333';
                            ctx.lineWidth = 1;
                            for (var h = 0; h < 6; h++) {
                                var hy = 58 + h * 55;
                                ctx.setLineDash([3, 5]);
                                ctx.beginPath();
                                ctx.moveTo(140, hy);
                                ctx.lineTo(560, hy);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Object A (left)
                            var screenY1 = 42 - y1 * 28;
                            if (screenY1 > 330) screenY1 = 330;
                            var r1 = Math.max(8, Math.min(25, mass1 * 3));
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(280, screenY1, r1, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText(mass1 + ' kg', 280, screenY1 - r1 - 12, viz.colors.blue, 12);

                            // Object B (right)
                            var screenY2 = 42 - y2 * 28;
                            if (screenY2 > 330) screenY2 = 330;
                            var r2 = Math.max(8, Math.min(25, mass2 * 3));
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(420, screenY2, r2, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText(mass2 + ' kg', 420, screenY2 - r2 - 12, viz.colors.orange, 12);

                            // info
                            if (dropping || landed) {
                                viz.screenText('Time: ' + dropTime.toFixed(2) + ' s', 100, 370, viz.colors.text, 12);
                                viz.screenText('Speed A: ' + Math.abs(vel1).toFixed(1) + ' m/s', 300, 370, viz.colors.blue, 12);
                                viz.screenText('Speed B: ' + Math.abs(vel2).toFixed(1) + ' m/s', 500, 370, viz.colors.orange, 12);
                            }

                            if (landed) {
                                viz.screenText('Both hit the ground at the SAME time!', 350, 55, viz.colors.green, 16);
                                viz.screenText('In a vacuum, mass does not affect fall speed.', 350, 75, viz.colors.teal, 13);
                            } else if (!dropping) {
                                viz.screenText('Set different masses and click "Drop!"', 350, 370, viz.colors.muted, 13);
                            }
                        }

                        viz.animate(function() {
                            if (dropping) {
                                dropTime += 0.016;
                                vel1 -= g * 0.016;
                                vel2 -= g * 0.016;
                                y1 += vel1 * 0.016;
                                y2 += vel2 * 0.016;

                                if (y1 <= groundY) {
                                    y1 = groundY;
                                    y2 = groundY;
                                    vel1 = 0;
                                    vel2 = 0;
                                    dropping = false;
                                    landed = true;
                                }
                            }
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A bowling ball (7 kg) and a tennis ball (0.06 kg) are dropped from the same height in a vacuum. Which hits the ground first?',
                    hint: 'In a vacuum, is there any air resistance?',
                    solution: 'They hit the ground at exactly the same time! In a vacuum, there is no air resistance, and gravity accelerates all objects at the same rate (g = 9.8 m/s squared) regardless of mass.'
                },
                {
                    question: 'Use \\(F = ma\\) to explain why a 5 kg ball and a 50 kg ball fall at the same rate.',
                    hint: 'The gravitational force on an object is \\(F = mg\\). What happens when you divide by m?',
                    solution: 'For the 5 kg ball: \\(F = 5 \\times g = 5g\\), so \\(a = F/m = 5g/5 = g\\). For the 50 kg ball: \\(F = 50 \\times g = 50g\\), so \\(a = F/m = 50g/50 = g\\). Both get the same acceleration g! The larger gravitational force on the heavier ball is exactly canceled by its larger inertia.'
                }
            ]
        },
        {
            id: 'air-resistance',
            title: 'Air Resistance',
            content: `
                <h2>Air Resistance: The Troublemaker</h2>
                <p>If all objects fall at the same rate, why does a feather float down slowly while a rock plummets? The answer is <strong>air resistance</strong> (also called <strong>drag</strong>).</p>

                <div class="env-block definition">
                    <div class="env-title">Air Resistance</div>
                    <div class="env-body"><p><strong>Air resistance</strong> is a force that pushes against objects moving through air. It always acts in the opposite direction of motion. The bigger the surface area and the faster the object, the stronger the air resistance.</p></div>
                </div>

                <p>Air resistance depends on:</p>
                <ul>
                    <li><strong>Shape and surface area</strong> - A flat sheet of paper has much more air resistance than the same paper crumpled into a ball</li>
                    <li><strong>Speed</strong> - Faster objects experience more air resistance</li>
                    <li><strong>Air density</strong> - Thicker air creates more resistance</li>
                </ul>

                <div class="viz-placeholder" data-viz="viz-air-vs-vacuum"></div>

                <div class="env-block example">
                    <div class="env-title">Paper Experiment</div>
                    <div class="env-body">
                        <p>Try this at home: Take two identical sheets of paper. Crumple one into a tight ball. Drop both from the same height at the same time.</p>
                        <p>The crumpled ball hits the floor first! Same mass, same gravity, but different air resistance because of different shapes.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Key Insight</div>
                    <div class="env-body"><p>Air resistance is what makes heavy and light objects seem to fall differently. Take away the air, and everything falls the same. The real question is not "do heavy things fall faster?" but "how much does air slow each object down?"</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-air-vs-vacuum',
                    title: 'With Air vs. Without Air',
                    description: 'Compare a ball and a feather falling in air (left) vs. a vacuum (right). Toggle air on/off to see the difference!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 380, scale: 30, originX: 350, originY: 30});
                        var ballY_air = 0;
                        var featherY_air = 0;
                        var ballV_air = 0;
                        var featherV_air = 0;
                        var ballY_vac = 0;
                        var featherY_vac = 0;
                        var ballV_vac = 0;
                        var featherV_vac = 0;
                        var dropping = false;
                        var g = 9.8;
                        var groundY = -9;
                        var ballLanded_air = false;
                        var featherLanded_air = false;
                        var ballLanded_vac = false;
                        var featherLanded_vac = false;

                        VizEngine.createButton(controls, 'Drop Both!', function() {
                            ballY_air = 0; featherY_air = 0; ballV_air = 0; featherV_air = 0;
                            ballY_vac = 0; featherY_vac = 0; ballV_vac = 0; featherV_vac = 0;
                            ballLanded_air = false; featherLanded_air = false;
                            ballLanded_vac = false; featherLanded_vac = false;
                            dropping = true;
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            ballY_air = 0; featherY_air = 0; ballV_air = 0; featherV_air = 0;
                            ballY_vac = 0; featherY_vac = 0; ballV_vac = 0; featherV_vac = 0;
                            ballLanded_air = false; featherLanded_air = false;
                            ballLanded_vac = false; featherLanded_vac = false;
                            dropping = false;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // divider
                            ctx.strokeStyle = '#444';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(350, 0);
                            ctx.lineTo(350, 380);
                            ctx.stroke();

                            // labels
                            viz.screenText('WITH AIR', 175, 18, viz.colors.orange, 15);
                            viz.screenText('VACUUM (No Air)', 525, 18, viz.colors.purple, 15);

                            // ground
                            ctx.fillStyle = '#2a3a2a';
                            ctx.fillRect(0, 340, 350, 40);
                            ctx.fillStyle = '#2a2a3a';
                            ctx.fillRect(350, 340, 350, 40);

                            // platform
                            ctx.fillStyle = '#444';
                            ctx.fillRect(50, 48, 250, 6);
                            ctx.fillRect(400, 48, 250, 6);

                            // -- AIR SIDE --
                            // Ball in air
                            var by_a = 40 - ballY_air * 30;
                            if (by_a > 328) by_a = 328;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(120, by_a, 12, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('Ball', 120, by_a - 20, viz.colors.blue, 11);

                            // Feather in air
                            var fy_a = 40 - featherY_air * 30;
                            if (fy_a > 328) fy_a = 328;
                            ctx.fillStyle = viz.colors.teal;
                            // feather shape
                            ctx.beginPath();
                            ctx.ellipse(230, fy_a, 18, 5, Math.PI * 0.1, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(212, fy_a);
                            ctx.lineTo(248, fy_a);
                            ctx.stroke();
                            viz.screenText('Feather', 230, fy_a - 16, viz.colors.teal, 11);

                            // -- VACUUM SIDE --
                            // Ball in vacuum
                            var by_v = 40 - ballY_vac * 30;
                            if (by_v > 328) by_v = 328;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(470, by_v, 12, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('Ball', 470, by_v - 20, viz.colors.blue, 11);

                            // Feather in vacuum
                            var fy_v = 40 - featherY_vac * 30;
                            if (fy_v > 328) fy_v = 328;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.ellipse(580, fy_v, 18, 5, Math.PI * 0.1, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(562, fy_v);
                            ctx.lineTo(598, fy_v);
                            ctx.stroke();
                            viz.screenText('Feather', 580, fy_v - 16, viz.colors.teal, 11);

                            // messages
                            if (ballLanded_air && !featherLanded_air) {
                                viz.screenText('Ball lands first!', 175, 360, viz.colors.blue, 12);
                            }
                            if (ballLanded_vac && featherLanded_vac) {
                                viz.screenText('Both land together!', 525, 360, viz.colors.green, 13);
                            }

                            if (!dropping && !ballLanded_air) {
                                viz.screenText('Click "Drop Both!" to compare', 350, 370, viz.colors.muted, 13);
                            }
                        }

                        viz.animate(function() {
                            if (dropping) {
                                // vacuum side: both fall the same
                                if (!ballLanded_vac) {
                                    ballV_vac -= g * 0.016;
                                    ballY_vac += ballV_vac * 0.016;
                                    if (ballY_vac <= groundY) { ballY_vac = groundY; ballLanded_vac = true; }
                                }
                                if (!featherLanded_vac) {
                                    featherV_vac -= g * 0.016;
                                    featherY_vac += featherV_vac * 0.016;
                                    if (featherY_vac <= groundY) { featherY_vac = groundY; featherLanded_vac = true; }
                                }

                                // air side: ball has little drag, feather has a lot
                                if (!ballLanded_air) {
                                    var dragBall = 0.1 * ballV_air * ballV_air * (ballV_air < 0 ? 1 : -1);
                                    ballV_air -= (g + dragBall) * 0.016;
                                    ballY_air += ballV_air * 0.016;
                                    if (ballY_air <= groundY) { ballY_air = groundY; ballLanded_air = true; }
                                }
                                if (!featherLanded_air) {
                                    var dragFeather = 3.0 * featherV_air * featherV_air * (featherV_air < 0 ? 1 : -1);
                                    featherV_air -= (g + dragFeather) * 0.016;
                                    featherY_air += featherV_air * 0.016;
                                    if (featherY_air <= groundY) { featherY_air = groundY; featherLanded_air = true; }
                                }

                                if (ballLanded_air && featherLanded_air && ballLanded_vac && featherLanded_vac) {
                                    dropping = false;
                                }
                            }
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why does a flat sheet of paper fall slower than a crumpled ball of the same paper?',
                    hint: 'Think about surface area and air resistance.',
                    solution: 'The flat sheet has a much larger surface area pushing against the air, so it experiences much more air resistance. The crumpled ball has a smaller area and cuts through the air more easily. Both have the same mass and the same gravitational pull, but different amounts of air drag.'
                },
                {
                    question: 'On the Moon, there is no atmosphere. If an astronaut drops a hammer and a feather at the same time, what happens?',
                    hint: 'No atmosphere means no air resistance!',
                    solution: 'They hit the ground at the same time! Without air resistance, all objects fall at the same rate. Apollo 15 astronaut David Scott actually did this experiment on the Moon in 1971, and the hammer and feather did hit the ground together!'
                }
            ]
        },
        {
            id: 'vacuum-tube',
            title: 'The Vacuum Tube Experiment',
            content: `
                <h2>The Vacuum Tube Experiment</h2>
                <p>We cannot easily go to the Moon to test Galileo's idea, but we can create a vacuum right here on Earth using a special glass tube.</p>

                <div class="env-block definition">
                    <div class="env-title">Vacuum Tube</div>
                    <div class="env-body"><p>A <strong>vacuum tube</strong> (or vacuum chamber) is a sealed container from which all the air has been pumped out. Inside, there is no air resistance at all.</p></div>
                </div>

                <p>Scientists use vacuum tubes to demonstrate that without air, all objects truly fall at the same rate:</p>
                <ol>
                    <li>Place a coin and a feather inside a tall glass tube</li>
                    <li>With air inside, flip the tube - the coin falls faster</li>
                    <li>Pump out all the air to create a vacuum</li>
                    <li>Flip the tube again - they fall at exactly the same rate!</li>
                </ol>

                <div class="viz-placeholder" data-viz="viz-vacuum-chamber"></div>

                <div class="env-block example">
                    <div class="env-title">Apollo 15 on the Moon</div>
                    <div class="env-body"><p>In 1971, astronaut David Scott stood on the Moon and dropped a hammer and a feather at the same time. With no air on the Moon, they hit the lunar surface together! He said: "How about that! This proves that Mr. Galileo was correct."</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">NASA's Vacuum Chamber</div>
                    <div class="env-body"><p>NASA has one of the world's largest vacuum chambers in Ohio, USA. It is called the Space Power Facility and can fit an entire spacecraft inside. Engineers use it to test how equipment works in space-like conditions.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-vacuum-chamber',
                    title: 'Vacuum Chamber Simulator',
                    description: 'Toggle air on and off inside the tube. Watch how a coin and feather behave differently with air, but the same without it!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 30, originX: 350, originY: 30});
                        var hasAir = true;
                        var coinY = 0;
                        var featherY = 0;
                        var coinV = 0;
                        var featherV = 0;
                        var dropping = false;
                        var g = 9.8;
                        var coinLanded = false;
                        var featherLanded = false;

                        VizEngine.createButton(controls, 'Toggle Air', function() {
                            hasAir = !hasAir;
                            coinY = 0; featherY = 0; coinV = 0; featherV = 0;
                            dropping = false; coinLanded = false; featherLanded = false;
                        });

                        VizEngine.createButton(controls, 'Drop!', function() {
                            coinY = 0; featherY = 0; coinV = 0; featherV = 0;
                            dropping = true; coinLanded = false; featherLanded = false;
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            coinY = 0; featherY = 0; coinV = 0; featherV = 0;
                            dropping = false; coinLanded = false; featherLanded = false;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // tube outline
                            ctx.strokeStyle = '#667';
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.roundRect(250, 35, 200, 340, 12);
                            ctx.stroke();

                            // tube fill
                            if (hasAir) {
                                ctx.fillStyle = 'rgba(100,150,200,0.08)';
                                ctx.beginPath();
                                ctx.roundRect(252, 37, 196, 336, 10);
                                ctx.fill();
                                // air particle hints
                                for (var i = 0; i < 15; i++) {
                                    var px = 270 + Math.random() * 160;
                                    var py = 50 + Math.random() * 310;
                                    ctx.fillStyle = 'rgba(100,150,200,0.15)';
                                    ctx.beginPath();
                                    ctx.arc(px, py, 2, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            // label
                            viz.screenText(hasAir ? 'AIR INSIDE' : 'VACUUM (No Air)', 350, 20, hasAir ? viz.colors.orange : viz.colors.purple, 16);

                            // coin
                            var coinScreenY = 60 - coinY * 28;
                            if (coinScreenY > 355) coinScreenY = 355;
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.beginPath();
                            ctx.arc(310, coinScreenY, 10, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = '#aa8800';
                            ctx.lineWidth = 1;
                            ctx.stroke();
                            viz.screenText('Coin', 310, coinScreenY - 16, viz.colors.yellow, 11);

                            // feather
                            var featherScreenY = 60 - featherY * 28;
                            if (featherScreenY > 358) featherScreenY = 358;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.ellipse(390, featherScreenY, 16, 4, 0.15, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 0.8;
                            ctx.beginPath();
                            ctx.moveTo(374, featherScreenY);
                            ctx.lineTo(406, featherScreenY);
                            ctx.stroke();
                            viz.screenText('Feather', 390, featherScreenY - 14, viz.colors.teal, 11);

                            // result text
                            if (coinLanded && featherLanded) {
                                if (hasAir) {
                                    viz.screenText('The coin lands first due to air resistance on the feather.', 350, 390, viz.colors.orange, 13);
                                } else {
                                    viz.screenText('Both land at the SAME time! No air = no difference!', 350, 390, viz.colors.green, 14);
                                }
                            } else if (coinLanded && !featherLanded && hasAir) {
                                viz.screenText('Coin landed! Feather is still floating down...', 350, 390, viz.colors.yellow, 13);
                            }

                            // instructions
                            if (!dropping && !coinLanded) {
                                viz.screenText('Click "Toggle Air" then "Drop!"', 100, 200, viz.colors.muted, 12);
                            }
                        }

                        viz.animate(function() {
                            if (dropping) {
                                var groundLevel = -10;

                                if (!coinLanded) {
                                    var coinDrag = hasAir ? 0.15 * coinV * coinV * (coinV < 0 ? 1 : -1) : 0;
                                    coinV -= (g + coinDrag) * 0.016;
                                    coinY += coinV * 0.016;
                                    if (coinY <= groundLevel) { coinY = groundLevel; coinLanded = true; coinV = 0; }
                                }

                                if (!featherLanded) {
                                    var featherDrag = hasAir ? 4.0 * featherV * featherV * (featherV < 0 ? 1 : -1) : 0;
                                    featherV -= (g + featherDrag) * 0.016;
                                    featherY += featherV * 0.016;
                                    if (featherY <= groundLevel) { featherY = groundLevel; featherLanded = true; featherV = 0; }
                                }

                                if (coinLanded && featherLanded) {
                                    dropping = false;
                                }
                            }
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'You have a vacuum tube with a coin and a small piece of paper inside. Predict what happens when you flip the tube (a) with air inside and (b) after pumping out the air.',
                    hint: 'With air, which object has more air resistance relative to its weight?',
                    solution: '(a) With air: The coin falls quickly while the paper floats down slowly, because the paper has a large surface area relative to its small weight, creating lots of air resistance. (b) Without air: Both fall at exactly the same rate and hit the bottom together, because there is no air resistance and gravity accelerates all objects equally.'
                }
            ]
        },
        {
            id: 'terminal-velocity',
            title: 'Terminal Velocity',
            content: `
                <h2>Terminal Velocity</h2>
                <p>When something falls through air, it speeds up due to gravity. But as it goes faster, air resistance also increases. At some point, the air resistance force becomes equal to the weight. When this happens, the forces are balanced and the object stops accelerating. It falls at a constant speed called <strong>terminal velocity</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Terminal Velocity</div>
                    <div class="env-body"><p><strong>Terminal velocity</strong> is the maximum speed a falling object reaches when the force of air resistance equals the force of gravity. At terminal velocity, the object falls at a constant speed - it no longer accelerates.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-terminal-velocity"></div>

                <div class="env-block example">
                    <div class="env-title">Examples of Terminal Velocity</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Skydiver (spread out):</strong> About 55 m/s (200 km/h)</li>
                            <li><strong>Skydiver (diving):</strong> About 90 m/s (320 km/h)</li>
                            <li><strong>Raindrop:</strong> About 9 m/s (32 km/h)</li>
                            <li><strong>Feather:</strong> About 0.5 m/s (very slow!)</li>
                            <li><strong>Bowling ball:</strong> About 70 m/s (252 km/h)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">How a Parachute Works</div>
                    <div class="env-body"><p>A parachute dramatically increases surface area. This means air resistance reaches the skydiver's weight at a much lower speed. Instead of terminal velocity being 55 m/s, with a parachute it drops to about 5 m/s - slow enough to land safely!</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Shape Matters</div>
                    <div class="env-body"><p>A skydiver can change their terminal velocity by changing body position. Spread out like a starfish = more drag = slower. Dive head-first = less drag = faster. This is how skydivers control their speed before opening the parachute.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-terminal-velocity',
                    title: 'Terminal Velocity Explorer',
                    description: 'Watch a skydiver fall. See how speed increases until air resistance balances gravity. Adjust drag to simulate different body positions or parachute deployment!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 380, scale: 30, originX: 50, originY: 30});
                        var skydiverY = 0;
                        var velocity = 0;
                        var g = 9.8;
                        var mass = 80;
                        var dragCoeff = 0.5;
                        var dropping = false;
                        var time = 0;
                        var speedHistory = [];

                        VizEngine.createSlider(controls, 'Drag (body shape)', 0.2, 3.0, 0.5, 0.1, function(val) {
                            dragCoeff = val;
                        });

                        VizEngine.createButton(controls, 'Jump!', function() {
                            skydiverY = 0;
                            velocity = 0;
                            time = 0;
                            speedHistory = [];
                            dropping = true;
                        });

                        VizEngine.createButton(controls, 'Deploy Parachute!', function() {
                            dragCoeff = 2.5;
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            skydiverY = 0;
                            velocity = 0;
                            time = 0;
                            speedHistory = [];
                            dropping = false;
                            dragCoeff = 0.5;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // speed vs time graph area
                            var graphLeft = 60;
                            var graphRight = 400;
                            var graphTop = 40;
                            var graphBottom = 340;
                            var graphW = graphRight - graphLeft;
                            var graphH = graphBottom - graphTop;

                            // graph background
                            ctx.fillStyle = '#111125';
                            ctx.fillRect(graphLeft, graphTop, graphW, graphH);

                            // graph axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(graphLeft, graphBottom);
                            ctx.lineTo(graphRight, graphBottom);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(graphLeft, graphTop);
                            ctx.lineTo(graphLeft, graphBottom);
                            ctx.stroke();

                            // axis labels
                            viz.screenText('Time (s)', (graphLeft + graphRight) / 2, graphBottom + 20, viz.colors.text, 12);
                            viz.screenText('Speed', graphLeft - 20, (graphTop + graphBottom) / 2, viz.colors.text, 12);
                            viz.screenText('(m/s)', graphLeft - 20, (graphTop + graphBottom) / 2 + 15, viz.colors.text, 10);

                            // speed tick marks
                            var maxSpeed = 80;
                            for (var s = 0; s <= maxSpeed; s += 20) {
                                var sy = graphBottom - (s / maxSpeed) * graphH;
                                ctx.strokeStyle = '#333';
                                ctx.beginPath();
                                ctx.moveTo(graphLeft, sy);
                                ctx.lineTo(graphRight, sy);
                                ctx.stroke();
                                viz.screenText(s.toString(), graphLeft - 8, sy, viz.colors.text, 10, 'right');
                            }

                            // time tick marks
                            for (var t = 0; t <= 15; t += 5) {
                                var tx = graphLeft + (t / 15) * graphW;
                                viz.screenText(t.toString(), tx, graphBottom + 8, viz.colors.text, 10);
                            }

                            // terminal velocity line
                            var termVel = Math.sqrt(mass * g / dragCoeff);
                            if (termVel < maxSpeed) {
                                var tvY = graphBottom - (termVel / maxSpeed) * graphH;
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([5, 5]);
                                ctx.beginPath();
                                ctx.moveTo(graphLeft, tvY);
                                ctx.lineTo(graphRight, tvY);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('Terminal velocity: ' + termVel.toFixed(1) + ' m/s', graphRight - 5, tvY - 8, viz.colors.red, 11, 'right');
                            }

                            // speed history plot
                            if (speedHistory.length > 1) {
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i < speedHistory.length; i++) {
                                    var px = graphLeft + (speedHistory[i].t / 15) * graphW;
                                    var py = graphBottom - (speedHistory[i].v / maxSpeed) * graphH;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }

                            // right panel - skydiver animation
                            var panelLeft = 440;

                            // sky gradient effect
                            var grad = ctx.createLinearGradient(panelLeft, 0, panelLeft, 380);
                            grad.addColorStop(0, '#0a1030');
                            grad.addColorStop(1, '#1a2a4a');
                            ctx.fillStyle = grad;
                            ctx.fillRect(panelLeft, 0, 260, 380);

                            // clouds (moving based on velocity)
                            var cloudOffset = (skydiverY * 5) % 200;
                            for (var c = 0; c < 4; c++) {
                                var cy = ((c * 100 + cloudOffset) % 400) - 20;
                                ctx.fillStyle = 'rgba(255,255,255,0.06)';
                                ctx.beginPath();
                                ctx.ellipse(panelLeft + 60 + c * 40, cy, 30, 10, 0, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // skydiver
                            var sdX = panelLeft + 130;
                            var sdY = 190;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(sdX, sdY - 15, 8, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(sdX, sdY - 7);
                            ctx.lineTo(sdX, sdY + 15);
                            ctx.stroke();
                            // arms
                            ctx.beginPath();
                            ctx.moveTo(sdX - 18, sdY);
                            ctx.lineTo(sdX + 18, sdY);
                            ctx.stroke();
                            // legs
                            ctx.beginPath();
                            ctx.moveTo(sdX, sdY + 15);
                            ctx.lineTo(sdX - 10, sdY + 28);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(sdX, sdY + 15);
                            ctx.lineTo(sdX + 10, sdY + 28);
                            ctx.stroke();

                            // parachute if high drag
                            if (dragCoeff > 2.0) {
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(sdX, sdY - 55, 35, Math.PI, 0);
                                ctx.stroke();
                                ctx.fillStyle = 'rgba(63,185,160,0.2)';
                                ctx.beginPath();
                                ctx.arc(sdX, sdY - 55, 35, Math.PI, 0);
                                ctx.lineTo(sdX, sdY - 20);
                                ctx.closePath();
                                ctx.fill();
                                // strings
                                ctx.strokeStyle = '#666';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(sdX - 35, sdY - 55);
                                ctx.lineTo(sdX, sdY - 15);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(sdX + 35, sdY - 55);
                                ctx.lineTo(sdX, sdY - 15);
                                ctx.stroke();
                            }

                            // force arrows on skydiver
                            if (dropping) {
                                // gravity down
                                var gForce = mass * g;
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(sdX + 25, sdY + 5);
                                ctx.lineTo(sdX + 25, sdY + 35);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(sdX + 25, sdY + 40);
                                ctx.lineTo(sdX + 21, sdY + 33);
                                ctx.lineTo(sdX + 29, sdY + 33);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('W', sdX + 38, sdY + 25, viz.colors.red, 11);

                                // drag up
                                var dragF = dragCoeff * velocity * velocity;
                                var dragArrowLen = Math.min(40, dragF / gForce * 40);
                                if (dragArrowLen > 3) {
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(sdX - 25, sdY + 5);
                                    ctx.lineTo(sdX - 25, sdY + 5 - dragArrowLen);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.beginPath();
                                    ctx.moveTo(sdX - 25, sdY - dragArrowLen);
                                    ctx.lineTo(sdX - 29, sdY - dragArrowLen + 7);
                                    ctx.lineTo(sdX - 21, sdY - dragArrowLen + 7);
                                    ctx.closePath();
                                    ctx.fill();
                                    viz.screenText('Drag', sdX - 42, sdY - dragArrowLen / 2, viz.colors.green, 11);
                                }
                            }

                            // speed display
                            viz.screenText('Speed: ' + Math.abs(velocity).toFixed(1) + ' m/s', sdX, sdY + 55, viz.colors.white, 13);
                            viz.screenText('Altitude: ' + Math.abs(skydiverY).toFixed(0) + ' m', sdX, sdY + 72, viz.colors.text, 11);

                            // title
                            viz.screenText('Speed vs Time Graph', (graphLeft + graphRight) / 2, 22, viz.colors.white, 14);
                        }

                        viz.animate(function() {
                            if (dropping) {
                                time += 0.016;
                                var dragForce = dragCoeff * velocity * velocity;
                                var netForce = mass * g - dragForce;
                                var accel = netForce / mass;
                                velocity += accel * 0.016;
                                skydiverY -= velocity * 0.016;

                                if (time < 15 && speedHistory.length < 900) {
                                    speedHistory.push({t: time, v: velocity});
                                }
                            }
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A skydiver jumps out of a plane. Describe what happens to their speed over time.',
                    hint: 'Think about when gravity is greater than drag, and when they become equal.',
                    solution: 'At first, the skydiver accelerates quickly because gravity is much stronger than air resistance. As the skydiver goes faster, air resistance increases. The acceleration gets smaller and smaller. Eventually, air resistance equals gravity (net force = 0), and the skydiver reaches terminal velocity - falling at a constant speed.'
                },
                {
                    question: 'Why does opening a parachute slow down a skydiver?',
                    hint: 'What does the parachute do to air resistance?',
                    solution: 'The parachute greatly increases the surface area, which dramatically increases air resistance. Now air resistance is much greater than gravity, creating a net upward force that decelerates the skydiver. The skydiver slows down until reaching a new, much lower terminal velocity (about 5 m/s instead of 55 m/s).'
                },
                {
                    question: 'A raindrop has a terminal velocity of about 9 m/s. If there were no air resistance, how fast would a raindrop be going after falling from a cloud 2000 m high? (Use \\(v = \\sqrt{2gh}\\))',
                    hint: 'Plug in \\(g = 10\\) m/s\\(^2\\) and \\(h = 2000\\) m.',
                    solution: '\\(v = \\sqrt{2 \\times 10 \\times 2000} = \\sqrt{40000} = 200\\) m/s! That is about 720 km/h - as fast as a bullet! Thankfully, air resistance limits raindrops to about 9 m/s. Without air resistance, rain would be extremely dangerous.'
                }
            ]
        }
    ]
});
