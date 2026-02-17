window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch11',
    number: 11,
    title: 'Force & Acceleration',
    subtitle: 'F = ma',
    sections: [
        {
            id: 'force-causes-acceleration',
            title: 'Force Causes Acceleration',
            content: `
                <h2>Force Causes Acceleration</h2>
                <p>In the last chapter, we learned that objects keep doing what they are doing unless a force acts on them. But what happens when a force <em>does</em> act? The answer: the object <strong>accelerates</strong> - it changes its speed or direction.</p>

                <div class="env-block definition">
                    <div class="env-title">Newton's Second Law</div>
                    <div class="env-body"><p>The acceleration of an object is proportional to the net force applied and inversely proportional to its mass:</p>
                    <p>\\[ F = m \\times a \\]</p>
                    <p>Where \\(F\\) is force (in Newtons), \\(m\\) is mass (in kilograms), and \\(a\\) is acceleration (in m/s\\(^2\\)).</p></div>
                </div>

                <p>This is one of the most important equations in all of physics! It tells us three things:</p>
                <ul>
                    <li><strong>More force</strong> = more acceleration (push harder, speed up faster)</li>
                    <li><strong>More mass</strong> = less acceleration (heavier things are harder to speed up)</li>
                    <li><strong>No force</strong> = no acceleration (this is Newton's First Law!)</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">Feel It</div>
                    <div class="env-body"><p>Imagine pushing a shopping cart. An empty cart speeds up easily with a small push. Now fill it with heavy groceries - you need to push much harder to get the same acceleration. That is \\(F = ma\\) in action!</p></div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'If you push a box with 10 N of force and it has a mass of 2 kg, what is its acceleration?',
                    hint: 'Use \\(F = ma\\), so \\(a = F / m\\).',
                    solution: '\\(a = F / m = 10 / 2 = 5\\) m/s\\(^2\\). The box accelerates at 5 meters per second squared.'
                },
                {
                    question: 'Why is it harder to push a loaded truck than an empty bicycle?',
                    hint: 'Think about the "m" in \\(F = ma\\).',
                    solution: 'The truck has a much larger mass than the bicycle. Since \\(a = F/m\\), a larger mass means you need more force to achieve the same acceleration. The truck\'s inertia (resistance to change) is much greater.'
                }
            ]
        },
        {
            id: 'fma-relationship',
            title: 'The F = ma Relationship',
            content: `
                <h2>Exploring F = ma</h2>
                <p>The equation \\(F = ma\\) can be rearranged in three useful ways:</p>
                <ul>
                    <li>To find <strong>force</strong>: \\(F = m \\times a\\)</li>
                    <li>To find <strong>acceleration</strong>: \\(a = F / m\\)</li>
                    <li>To find <strong>mass</strong>: \\(m = F / a\\)</li>
                </ul>

                <div class="viz-placeholder" data-viz="viz-fma-explorer"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Kicking a Ball</div>
                    <div class="env-body"><p>A soccer ball has a mass of about 0.45 kg. If you kick it with a force of 90 N, the acceleration during the kick is:</p>
                    <p>\\[ a = \\frac{F}{m} = \\frac{90}{0.45} = 200 \\text{ m/s}^2 \\]</p>
                    <p>That is a huge acceleration! But it only lasts for the brief moment your foot is in contact with the ball.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Units</div>
                    <div class="env-body"><p>The unit of force is the <strong>Newton</strong> (N), named after Isaac Newton. 1 Newton is the force needed to accelerate a 1 kg object at 1 m/s\\(^2\\). So: 1 N = 1 kg \\(\\times\\) 1 m/s\\(^2\\).</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-fma-explorer',
                    title: 'F = ma Explorer',
                    description: 'Adjust the force and mass sliders to see how acceleration changes. Watch the relationship in real time!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 350, scale: 30, originX: 50, originY: 280});
                        var force = 10;
                        var mass = 2;

                        var forceSlider = VizEngine.createSlider(controls, 'Force (N)', 0, 50, 10, 1, function(val) {
                            force = val;
                            draw();
                        });
                        var massSlider = VizEngine.createSlider(controls, 'Mass (kg)', 0.5, 20, 2, 0.5, function(val) {
                            mass = val;
                            draw();
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var accel = mass > 0 ? force / mass : 0;

                            // Draw bar chart style
                            var barWidth = 100;
                            var maxBarHeight = 200;

                            // Force bar
                            var fH = (force / 50) * maxBarHeight;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(130, 260 - fH, barWidth, fH);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(130, 260 - fH, barWidth, fH);
                            viz.screenText('Force', 180, 275, viz.colors.blue, 14);
                            viz.screenText(force.toFixed(0) + ' N', 180, 260 - fH - 15, viz.colors.blue, 13);

                            // Mass bar
                            var mH = (mass / 20) * maxBarHeight;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(300, 260 - mH, barWidth, mH);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(300, 260 - mH, barWidth, mH);
                            viz.screenText('Mass', 350, 275, viz.colors.orange, 14);
                            viz.screenText(mass.toFixed(1) + ' kg', 350, 260 - mH - 15, viz.colors.orange, 13);

                            // Acceleration bar
                            var aH = Math.min((accel / 25) * maxBarHeight, maxBarHeight);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(470, 260 - aH, barWidth, aH);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(470, 260 - aH, barWidth, aH);
                            viz.screenText('Accel', 520, 275, viz.colors.green, 14);
                            viz.screenText(accel.toFixed(1) + ' m/s\u00B2', 520, 260 - aH - 15, viz.colors.green, 13);

                            // Equation display
                            viz.screenText('F = m \u00D7 a', 350, 20, viz.colors.white, 20);
                            viz.screenText(force.toFixed(0) + ' = ' + mass.toFixed(1) + ' \u00D7 ' + accel.toFixed(1), 350, 48, viz.colors.teal, 16);

                            // Labels between bars
                            viz.screenText('\u00F7', 265, 180, viz.colors.white, 24);
                            viz.screenText('=', 435, 180, viz.colors.white, 24);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 5 kg object accelerates at 3 m/s\\(^2\\). What is the net force acting on it?',
                    hint: 'Use \\(F = m \\times a\\).',
                    solution: '\\(F = 5 \\times 3 = 15\\) N. The net force is 15 Newtons.'
                },
                {
                    question: 'A force of 24 N causes an object to accelerate at 8 m/s\\(^2\\). What is the mass of the object?',
                    hint: 'Rearrange: \\(m = F / a\\).',
                    solution: '\\(m = F / a = 24 / 8 = 3\\) kg. The object has a mass of 3 kilograms.'
                }
            ]
        },
        {
            id: 'mass-matters',
            title: 'Mass Matters',
            content: `
                <h2>Mass Matters: Heavier = Harder to Accelerate</h2>
                <p>If you apply the same force to a light object and a heavy object, the light one accelerates much more. This is because mass resists acceleration.</p>

                <div class="viz-placeholder" data-viz="viz-push-carts"></div>

                <div class="env-block intuition">
                    <div class="env-title">Mass Is Resistance to Acceleration</div>
                    <div class="env-body"><p>Think of mass as "stubbornness." A heavy object is very stubborn - it does not want to change what it is doing. You need a bigger force to convince it to speed up. A light object is easy to push around.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Comparison</div>
                    <div class="env-body">
                        <p>With the same 10 N force:</p>
                        <ul>
                            <li>A 1 kg ball: \\(a = 10/1 = 10\\) m/s\\(^2\\) (fast acceleration!)</li>
                            <li>A 10 kg box: \\(a = 10/10 = 1\\) m/s\\(^2\\) (slow acceleration)</li>
                            <li>A 100 kg fridge: \\(a = 10/100 = 0.1\\) m/s\\(^2\\) (barely moves!)</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-push-carts',
                    title: 'Push the Cart Race',
                    description: 'Apply the same force to carts of different masses. Watch which one accelerates faster! Click "Push!" to start.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 340, scale: 30, originX: 50, originY: 280});
                        var forceVal = 20;
                        var masses = [2, 5, 10];
                        var positions = [0, 0, 0];
                        var velocities = [0, 0, 0];
                        var racing = false;
                        var raceTime = 0;
                        var cartColors;

                        VizEngine.createSlider(controls, 'Force (N)', 5, 50, 20, 5, function(val) {
                            forceVal = val;
                        });

                        VizEngine.createButton(controls, 'Push!', function() {
                            positions = [0, 0, 0];
                            velocities = [0, 0, 0];
                            racing = true;
                            raceTime = 0;
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            positions = [0, 0, 0];
                            velocities = [0, 0, 0];
                            racing = false;
                            raceTime = 0;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            cartColors = [viz.colors.blue, viz.colors.orange, viz.colors.green];

                            // lanes
                            var laneY = [80, 160, 240];
                            for (var i = 0; i < 3; i++) {
                                // lane background
                                ctx.fillStyle = i % 2 === 0 ? '#1a1a30' : '#1e1e35';
                                ctx.fillRect(0, laneY[i] - 30, 700, 60);

                                // lane label
                                viz.screenText(masses[i] + ' kg', 40, laneY[i], cartColors[i], 13, 'center', 'middle');

                                // cart
                                var cx = 80 + positions[i] * 25;
                                var cartW = 20 + masses[i] * 3;
                                var cartH = 20 + masses[i] * 1.5;
                                ctx.fillStyle = cartColors[i];
                                ctx.beginPath();
                                ctx.roundRect(cx, laneY[i] - cartH / 2, cartW, cartH, 4);
                                ctx.fill();

                                // wheels
                                ctx.fillStyle = '#333';
                                ctx.beginPath();
                                ctx.arc(cx + 6, laneY[i] + cartH / 2, 4, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.beginPath();
                                ctx.arc(cx + cartW - 6, laneY[i] + cartH / 2, 4, 0, Math.PI * 2);
                                ctx.fill();

                                // speed label
                                viz.screenText('v = ' + velocities[i].toFixed(1) + ' m/s', cx + cartW + 15, laneY[i], viz.colors.text, 11, 'left', 'middle');
                            }

                            // finish line
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([5, 5]);
                            ctx.beginPath();
                            ctx.moveTo(650, 50);
                            ctx.lineTo(650, 270);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            viz.screenText('Finish', 650, 38, viz.colors.white, 11);

                            // title
                            viz.screenText('Same force (' + forceVal + ' N) applied to different masses', 350, 20, viz.colors.white, 15);

                            if (racing) {
                                viz.screenText('Time: ' + raceTime.toFixed(1) + 's', 600, 310, viz.colors.text, 12);
                            }
                        }

                        viz.animate(function() {
                            if (racing) {
                                raceTime += 0.016;
                                for (var i = 0; i < 3; i++) {
                                    var accel = forceVal / masses[i];
                                    velocities[i] += accel * 0.016;
                                    positions[i] += velocities[i] * 0.016;
                                }
                                if (positions[0] > 23 || raceTime > 6) {
                                    racing = false;
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
                    question: 'Two objects receive the same force. Object A has mass 3 kg and Object B has mass 9 kg. Which one accelerates faster, and by how much?',
                    hint: 'Calculate \\(a = F/m\\) for each. How do the accelerations compare?',
                    solution: 'Object A accelerates 3 times faster than Object B. Since \\(a = F/m\\) and they have the same force, the ratio of accelerations is \\(a_A/a_B = m_B/m_A = 9/3 = 3\\). Object A (lighter) accelerates 3 times more than Object B (heavier).'
                }
            ]
        },
        {
            id: 'real-world-fma',
            title: 'Real-World F = ma',
            content: `
                <h2>F = ma in the Real World</h2>
                <p>Newton's Second Law is everywhere! Let us look at some real-world examples.</p>

                <div class="env-block example">
                    <div class="env-title">Car Acceleration</div>
                    <div class="env-body">
                        <p>A car with a mass of 1000 kg has an engine that produces 5000 N of force. Its acceleration is:</p>
                        <p>\\[ a = \\frac{F}{m} = \\frac{5000}{1000} = 5 \\text{ m/s}^2 \\]</p>
                        <p>Starting from rest, after 4 seconds the car is going \\(5 \\times 4 = 20\\) m/s (about 72 km/h)!</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Rocket Launch</div>
                    <div class="env-body">
                        <p>A small rocket has a mass of 500 kg and its engine produces 15,000 N of thrust. Gravity pulls it down with about \\(500 \\times 10 = 5000\\) N. The net upward force is \\(15000 - 5000 = 10000\\) N.</p>
                        <p>\\[ a = \\frac{10000}{500} = 20 \\text{ m/s}^2 \\]</p>
                        <p>That is twice the acceleration of gravity!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-fma-calc"></div>

                <div class="env-block warning">
                    <div class="env-title">Net Force</div>
                    <div class="env-body"><p>Remember: \\(F\\) in Newton's Second Law is the <strong>net force</strong> (total of all forces combined). If friction is 3 N and you push with 10 N, the net force is only 7 N. Always add up all forces first!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-fma-calc',
                    title: 'F = ma Calculator',
                    description: 'Enter any two values and calculate the third. Pick a scenario and see the physics!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 300, scale: 30, originX: 350, originY: 150});
                        var scenario = 0;
                        var scenarios = [
                            {name: 'Baseball Pitch', force: 150, mass: 0.145, desc: 'A pitcher throws a 145g baseball with 150 N'},
                            {name: 'Sprinter Start', force: 800, mass: 70, desc: 'A 70 kg sprinter pushes off with 800 N'},
                            {name: 'Bike Braking', force: 200, mass: 80, desc: 'A cyclist (80 kg total) brakes with 200 N'},
                            {name: 'Elephant Walk', force: 2000, mass: 5000, desc: 'A 5000 kg elephant pushes with 2000 N'}
                        ];

                        VizEngine.createButton(controls, 'Baseball', function() { scenario = 0; draw(); });
                        VizEngine.createButton(controls, 'Sprinter', function() { scenario = 1; draw(); });
                        VizEngine.createButton(controls, 'Bike Brake', function() { scenario = 2; draw(); });
                        VizEngine.createButton(controls, 'Elephant', function() { scenario = 3; draw(); });

                        function draw() {
                            viz.clear();
                            var s = scenarios[scenario];
                            var accel = s.force / s.mass;

                            viz.screenText(s.name, 350, 30, viz.colors.teal, 20);
                            viz.screenText(s.desc, 350, 55, viz.colors.text, 13);

                            // equation display
                            viz.screenText('F = m \u00D7 a', 350, 95, viz.colors.white, 18);

                            // values
                            var forceStr = s.force + ' N';
                            var massStr = s.mass < 1 ? (s.mass * 1000).toFixed(0) + ' g (' + s.mass + ' kg)' : s.mass + ' kg';
                            var accelStr = accel.toFixed(1) + ' m/s\u00B2';

                            viz.screenText(forceStr + ' = ' + s.mass + ' kg \u00D7 ' + accelStr, 350, 125, viz.colors.orange, 16);

                            // visual: object with force arrow
                            var ctx = viz.ctx;

                            // object (circle sized by mass)
                            var objR = Math.max(10, Math.min(40, Math.log(s.mass + 1) * 10));
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(250, 220, objR, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText(massStr, 250, 220 + objR + 18, viz.colors.blue, 12);

                            // force arrow
                            var arrowLen = Math.min(150, Math.max(30, s.force * 0.3));
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(250 + objR + 5, 220);
                            ctx.lineTo(250 + objR + arrowLen, 220);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.moveTo(250 + objR + arrowLen + 10, 220);
                            ctx.lineTo(250 + objR + arrowLen, 215);
                            ctx.lineTo(250 + objR + arrowLen, 225);
                            ctx.closePath();
                            ctx.fill();
                            viz.screenText('F = ' + forceStr, 250 + objR + arrowLen / 2, 200, viz.colors.red, 12);

                            // acceleration result
                            viz.screenText('Acceleration = ' + accelStr, 530, 220, viz.colors.green, 15);

                            // context
                            var context = '';
                            if (accel > 100) context = 'Incredibly fast! Like a bullet firing.';
                            else if (accel > 10) context = 'Very quick, like a sports car launch!';
                            else if (accel > 1) context = 'Moderate, like jogging speed buildup.';
                            else context = 'Gentle and slow, like a heavy truck starting.';
                            viz.screenText(context, 350, 280, viz.colors.muted, 12);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 60 kg skater pushes off a wall with a force of 120 N. What is the skater\'s acceleration?',
                    hint: 'Use \\(a = F/m\\).',
                    solution: '\\(a = F/m = 120/60 = 2\\) m/s\\(^2\\). The skater accelerates at 2 meters per second squared away from the wall.'
                },
                {
                    question: 'You want to accelerate a 4 kg toy car at 3 m/s\\(^2\\). How much force do you need to apply?',
                    hint: 'Use \\(F = m \\times a\\).',
                    solution: '\\(F = m \\times a = 4 \\times 3 = 12\\) N. You need to apply 12 Newtons of force.'
                }
            ]
        }
    ]
});
