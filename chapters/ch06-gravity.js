window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch06',
    number: 6,
    title: 'Gravity',
    subtitle: 'Why Apples Fall Down',
    sections: [
        {
            id: 'what-is-gravity',
            title: 'What Is Gravity?',
            content: `
                <h2>The Force That Holds the Universe Together</h2>
                <p>Drop a ball. It falls. Jump up. You come back down. Throw a frisbee. It eventually lands. The reason for all of this is <strong>gravity</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Gravity</div>
                    <div class="env-body"><p>Gravity is a <strong>non-contact force</strong> that pulls every object toward every other object. The bigger an object is, the stronger its gravitational pull. Earth is so massive that its gravity pulls everything toward its center.</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">The Apple Story</div>
                    <div class="env-body">
                        <p>Legend says that Isaac Newton was sitting under an apple tree when an apple fell on his head. This made him wonder: if gravity can pull an apple from a tree, could it also reach all the way up to the Moon? His answer was yes &mdash; the same force that pulls an apple down also keeps the Moon orbiting Earth!</p>
                    </div>
                </div>

                <p>Here are some important facts about gravity:</p>
                <ul>
                    <li>Gravity <strong>always pulls</strong> &mdash; it never pushes.</li>
                    <li>Gravity works <strong>at a distance</strong> &mdash; objects do not need to touch.</li>
                    <li>Gravity pulls everything toward the <strong>center</strong> of the Earth (that is why "down" means "toward Earth's center").</li>
                    <li>On Earth's surface, gravity accelerates falling objects at about \\(g \\approx 10 \\text{ m/s}^2\\).</li>
                </ul>

                <div class="viz-placeholder" data-viz="viz-gravity-pull"></div>
            `,
            visualizations: [
                {
                    id: 'viz-gravity-pull',
                    title: 'Gravity in Action',
                    description: 'Drop objects and watch gravity pull them down.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 1, originX: 0, originY: 0 });
                        var objects = [];
                        var g = 300;
                        var groundY = 310;
                        var running = true;

                        function spawnObject() {
                            var x = 80 + Math.random() * 540;
                            var r = 10 + Math.random() * 15;
                            var colors = [viz.colors.blue, viz.colors.orange, viz.colors.teal, viz.colors.purple, viz.colors.green];
                            var col = colors[Math.floor(Math.random() * colors.length)];
                            objects.push({ x: x, y: 30, vy: 0, r: r, color: col, landed: false });
                        }

                        function drawScene(timestamp) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var dt = 1 / 60;

                            // Sky gradient hint
                            ctx.fillStyle = '#0c1025';
                            ctx.fillRect(0, 0, 700, groundY);

                            // Ground
                            ctx.fillStyle = '#1a2a1a';
                            ctx.fillRect(0, groundY, 700, 40);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(0, groundY);
                            ctx.lineTo(700, groundY);
                            ctx.stroke();

                            // Update and draw objects
                            for (var i = 0; i < objects.length; i++) {
                                var obj = objects[i];
                                if (!obj.landed) {
                                    obj.vy += g * dt;
                                    obj.y += obj.vy * dt;
                                    if (obj.y + obj.r >= groundY) {
                                        obj.y = groundY - obj.r;
                                        obj.vy = -obj.vy * 0.4;
                                        if (Math.abs(obj.vy) < 10) {
                                            obj.landed = true;
                                            obj.vy = 0;
                                        }
                                    }
                                }
                                // Draw object
                                ctx.fillStyle = obj.color;
                                ctx.beginPath();
                                ctx.arc(obj.x, obj.y, obj.r, 0, Math.PI * 2);
                                ctx.fill();
                                // Gravity arrow
                                if (!obj.landed) {
                                    ctx.strokeStyle = viz.colors.red;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(obj.x, obj.y + obj.r + 2);
                                    ctx.lineTo(obj.x, obj.y + obj.r + 22);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath();
                                    ctx.moveTo(obj.x, obj.y + obj.r + 26);
                                    ctx.lineTo(obj.x - 5, obj.y + obj.r + 18);
                                    ctx.lineTo(obj.x + 5, obj.y + obj.r + 18);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            // Earth icon
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('EARTH', 350, groundY + 22);

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Click "Drop" to release objects. Red arrows show gravity!', 350, 8);

                            // g label
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('g \u2248 10 m/s\u00B2 downward', 15, 330);
                        }

                        viz.animate(function(timestamp) {
                            drawScene(timestamp);
                        });

                        VizEngine.createButton(controls, 'Drop!', function() {
                            spawnObject();
                        });
                        VizEngine.createButton(controls, 'Drop 5', function() {
                            for (var i = 0; i < 5; i++) {
                                spawnObject();
                            }
                        });
                        VizEngine.createButton(controls, 'Clear', function() {
                            objects = [];
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why does a ball thrown upward eventually come back down?',
                    hint: 'Think about what force is always pulling on the ball, even when it is going up.',
                    solution: 'Gravity is constantly pulling the ball downward. Even as the ball moves up, gravity slows it down, stops it, and then pulls it back to the ground.'
                },
                {
                    question: 'Is gravity a contact force or a non-contact force? Explain why.',
                    hint: 'Does the Earth need to touch the ball to pull it down?',
                    solution: 'Gravity is a non-contact force. The Earth pulls objects toward it without touching them. Gravity works across empty space.'
                }
            ]
        },
        {
            id: 'weight-vs-mass',
            title: 'Weight vs. Mass',
            content: `
                <h2>Two Words That Sound the Same &mdash; But Are Not!</h2>
                <p>People often use "weight" and "mass" as if they mean the same thing. In physics, they are very different!</p>

                <div class="env-block definition">
                    <div class="env-title">Mass</div>
                    <div class="env-body"><p><strong>Mass</strong> is the amount of matter (stuff) in an object. It is measured in <strong>kilograms (kg)</strong>. Your mass is the same everywhere in the universe &mdash; on Earth, on the Moon, or floating in space.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Weight</div>
                    <div class="env-body">
                        <p><strong>Weight</strong> is the force of gravity acting on your mass. It is measured in <strong>Newtons (N)</strong> and depends on where you are.</p>
                        \\[\\text{Weight} = \\text{mass} \\times g\\]
                        <p>On Earth, \\(g \\approx 10 \\text{ m/s}^2\\), so a 50 kg person weighs about 500 N.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">The Suitcase Test</div>
                    <div class="env-body">
                        <p>Imagine packing a 20 kg suitcase and flying to the Moon.</p>
                        <ul>
                            <li><strong>Mass:</strong> Still 20 kg. You did not remove any clothes!</li>
                            <li><strong>Weight on Earth:</strong> \\(20 \\times 10 = 200\\) N</li>
                            <li><strong>Weight on Moon:</strong> \\(20 \\times 1.6 = 32\\) N &mdash; it feels super light!</li>
                        </ul>
                        <p>Same stuff, different pull. That is the difference between mass and weight.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Quick Calculation</div>
                    <div class="env-body">
                        <p>A watermelon has a mass of 5 kg. What is its weight on Earth?</p>
                        \\[W = m \\times g = 5 \\times 10 = 50 \\text{ N}\\]
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'A backpack has a mass of 8 kg. (a) What is its weight on Earth? (b) If you took it to the Moon where g = 1.6 m/s\u00B2, what would it weigh?',
                    hint: 'Use Weight = mass x g for each location.',
                    solution: '(a) On Earth: W = 8 x 10 = 80 N. (b) On Moon: W = 8 x 1.6 = 12.8 N. The mass stays 8 kg in both places.'
                },
                {
                    question: 'An astronaut floats weightlessly on the International Space Station. Does this mean their mass is zero?',
                    hint: 'Weightless does not mean massless. Think about what mass really is.',
                    solution: 'No! The astronaut still has the same mass. They appear weightless because they are in free fall (falling together with the space station around Earth). Their mass (amount of matter) has not changed at all.'
                }
            ]
        },
        {
            id: 'gravity-on-planets',
            title: 'Gravity on Different Planets',
            content: `
                <h2>What Would You Weigh on Jupiter?</h2>
                <p>Different planets have different amounts of gravity because they have different masses and sizes. A bigger, heavier planet pulls harder!</p>

                <div class="env-block remark">
                    <div class="env-title">Surface Gravity Comparison</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Moon:</strong> \\(g = 1.6 \\text{ m/s}^2\\) &mdash; about 1/6 of Earth</li>
                            <li><strong>Mars:</strong> \\(g = 3.7 \\text{ m/s}^2\\) &mdash; about 1/3 of Earth</li>
                            <li><strong>Earth:</strong> \\(g = 10 \\text{ m/s}^2\\)</li>
                            <li><strong>Jupiter:</strong> \\(g = 25 \\text{ m/s}^2\\) &mdash; about 2.5 times Earth</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-planet-gravity"></div>

                <div class="env-block intuition">
                    <div class="env-title">Why It Matters</div>
                    <div class="env-body"><p>On the Moon, you could jump about 6 times higher than on Earth! On Jupiter, you would feel incredibly heavy and struggle to even stand up. Astronauts have to train for different gravity levels before visiting other worlds.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-weight-calculator"></div>
            `,
            visualizations: [
                {
                    id: 'viz-planet-gravity',
                    title: 'Planet Gravity Comparison',
                    description: 'Drop a ball on different planets and compare how fast it falls.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 1, originX: 0, originY: 0 });
                        var planets = [
                            { name: 'Moon', g: 1.6, color: '#888888' },
                            { name: 'Mars', g: 3.7, color: '#d4592a' },
                            { name: 'Earth', g: 10, color: '#3498db' },
                            { name: 'Jupiter', g: 25, color: '#e8a838' }
                        ];
                        var colW = 700 / planets.length;
                        var groundY = 300;
                        var startY = 60;
                        var balls = [];
                        var dropping = false;
                        var dropStartTime = 0;

                        function resetBalls() {
                            balls = [];
                            for (var i = 0; i < planets.length; i++) {
                                balls.push({ y: startY, vy: 0, landed: false });
                            }
                            dropping = false;
                        }
                        resetBalls();

                        function draw(timestamp) {
                            viz.clear();
                            var ctx = viz.ctx;
                            var dt = 1 / 60;
                            var pixPerMeter = (groundY - startY) / 20;

                            for (var i = 0; i < planets.length; i++) {
                                var px = i * colW;

                                // Column background
                                ctx.fillStyle = i % 2 === 0 ? '#0d0d22' : '#0f0f28';
                                ctx.fillRect(px, 0, colW, 350);

                                // Ground
                                ctx.fillStyle = planets[i].color + '33';
                                ctx.fillRect(px, groundY, colW, 50);
                                ctx.strokeStyle = planets[i].color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(px, groundY);
                                ctx.lineTo(px + colW, groundY);
                                ctx.stroke();

                                // Planet name
                                ctx.fillStyle = planets[i].color;
                                ctx.font = 'bold 15px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(planets[i].name, px + colW / 2, 8);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('g = ' + planets[i].g + ' m/s\u00B2', px + colW / 2, 28);

                                // Update ball
                                if (dropping && !balls[i].landed) {
                                    balls[i].vy += planets[i].g * pixPerMeter * dt;
                                    balls[i].y += balls[i].vy * dt;
                                    if (balls[i].y >= groundY - 12) {
                                        balls[i].y = groundY - 12;
                                        balls[i].landed = true;
                                    }
                                }

                                // Draw ball
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath();
                                ctx.arc(px + colW / 2, balls[i].y, 12, 0, Math.PI * 2);
                                ctx.fill();

                                // Gravity arrow on ball
                                if (!balls[i].landed && dropping) {
                                    var arrowLen = Math.min(planets[i].g * 2, 40);
                                    ctx.strokeStyle = viz.colors.red;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(px + colW / 2, balls[i].y + 14);
                                    ctx.lineTo(px + colW / 2, balls[i].y + 14 + arrowLen);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.red;
                                    ctx.beginPath();
                                    ctx.moveTo(px + colW / 2, balls[i].y + 14 + arrowLen + 4);
                                    ctx.lineTo(px + colW / 2 - 4, balls[i].y + 14 + arrowLen - 4);
                                    ctx.lineTo(px + colW / 2 + 4, balls[i].y + 14 + arrowLen - 4);
                                    ctx.closePath();
                                    ctx.fill();
                                }

                                // Landed label
                                if (balls[i].landed) {
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.font = '11px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'bottom';
                                    ctx.fillText('Landed!', px + colW / 2, balls[i].y - 16);
                                }
                            }

                            // Dividing lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            for (var i = 1; i < planets.length; i++) {
                                ctx.beginPath();
                                ctx.moveTo(i * colW, 0);
                                ctx.lineTo(i * colW, 350);
                                ctx.stroke();
                            }
                        }

                        viz.animate(function(timestamp) {
                            draw(timestamp);
                        });

                        VizEngine.createButton(controls, 'Drop!', function() {
                            resetBalls();
                            dropping = true;
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            resetBalls();
                        });
                    }
                },
                {
                    id: 'viz-weight-calculator',
                    title: 'Weight Calculator Across Planets',
                    description: 'Enter your mass and see what you would weigh on different worlds.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 280, scale: 1, originX: 0, originY: 0 });
                        var mass = 40;
                        var planets = [
                            { name: 'Moon', g: 1.6, color: '#888888', emoji: '' },
                            { name: 'Mars', g: 3.7, color: '#d4592a', emoji: '' },
                            { name: 'Earth', g: 10, color: '#3498db', emoji: '' },
                            { name: 'Jupiter', g: 25, color: '#e8a838', emoji: '' }
                        ];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var barMaxH = 180;
                            var maxWeight = mass * 25;
                            var barW = 60;
                            var spacing = 700 / planets.length;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Your mass: ' + mass + ' kg', 350, 10);

                            for (var i = 0; i < planets.length; i++) {
                                var weight = mass * planets[i].g;
                                var barH = (weight / maxWeight) * barMaxH;
                                var cx = spacing * i + spacing / 2;
                                var barTop = 240 - barH;

                                // Bar
                                ctx.fillStyle = planets[i].color;
                                ctx.fillRect(cx - barW / 2, barTop, barW, barH);

                                // Planet name
                                ctx.fillStyle = planets[i].color;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText(planets[i].name, cx, 248);

                                // Weight value
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(weight.toFixed(0) + ' N', cx, barTop - 4);

                                // g value
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textBaseline = 'top';
                                ctx.fillText('g=' + planets[i].g, cx, 265);
                            }

                            // Base line
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(20, 240);
                            ctx.lineTo(680, 240);
                            ctx.stroke();
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Your Mass (kg)', 10, 100, mass, 5, function(v) {
                            mass = v;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A rock has a mass of 10 kg. What would it weigh on Mars (g = 3.7 m/s\u00B2) and on Jupiter (g = 25 m/s\u00B2)?',
                    hint: 'Weight = mass x g for each planet.',
                    solution: 'On Mars: W = 10 x 3.7 = 37 N. On Jupiter: W = 10 x 25 = 250 N. Same rock, very different weights!'
                }
            ]
        },
        {
            id: 'free-fall-preview',
            title: 'Free Fall Preview',
            content: `
                <h2>When Only Gravity Acts</h2>
                <p>What happens when you drop two objects at the same time &mdash; a heavy one and a light one? Most people guess the heavy one hits the ground first. But the truth is surprising!</p>

                <div class="env-block definition">
                    <div class="env-title">Free Fall</div>
                    <div class="env-body"><p><strong>Free fall</strong> is when an object moves under the influence of gravity alone, with no other forces (like air resistance) acting on it.</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Galileo's Discovery</div>
                    <div class="env-body">
                        <p>About 400 years ago, the scientist Galileo showed that <strong>all objects fall at the same rate</strong> when there is no air resistance! A heavy ball and a light ball dropped from the same height hit the ground at the same time.</p>
                        <p>This seems wrong at first &mdash; but think about it: a heavier object has more gravity pulling it, but it also has more mass resisting the pull. These two effects cancel out perfectly!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-falling-objects"></div>

                <div class="env-block warning">
                    <div class="env-title">But Wait... Feathers Fall Slowly!</div>
                    <div class="env-body"><p>In everyday life, a feather falls much slower than a ball. That is because of <strong>air resistance</strong>, not because gravity pulls it less. In a vacuum (no air), a feather and a bowling ball fall at exactly the same speed! Astronauts actually tested this on the Moon.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Coming Up Next</div>
                    <div class="env-body"><p>We will study free fall in much more detail in Chapter 13. For now, just remember: gravity accelerates all objects equally at \\(g \\approx 10 \\text{ m/s}^2\\) (ignoring air resistance).</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-falling-objects',
                    title: 'Falling Objects Comparison',
                    description: 'Drop a heavy ball and a light ball side by side. Toggle air resistance on and off.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 1, originX: 0, originY: 0 });
                        var gPix = 500;
                        var groundY = 310;
                        var startY = 50;
                        var airOn = false;

                        var heavy = { y: startY, vy: 0, r: 20, mass: 10, color: viz.colors.blue, label: '10 kg', landed: false };
                        var light = { y: startY, vy: 0, r: 10, mass: 1, color: viz.colors.orange, label: '1 kg', landed: false };
                        var dropping = false;

                        function reset() {
                            heavy.y = startY; heavy.vy = 0; heavy.landed = false;
                            light.y = startY; light.vy = 0; light.landed = false;
                            dropping = false;
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var dt = 1 / 60;

                            // Ground
                            ctx.fillStyle = '#1a2a1a';
                            ctx.fillRect(0, groundY, 700, 40);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(0, groundY);
                            ctx.lineTo(700, groundY);
                            ctx.stroke();

                            // Update physics
                            var objs = [heavy, light];
                            for (var i = 0; i < objs.length; i++) {
                                var obj = objs[i];
                                if (dropping && !obj.landed) {
                                    var drag = 0;
                                    if (airOn) {
                                        drag = 0.005 * obj.vy * obj.vy / obj.mass * (obj.r / 10);
                                    }
                                    obj.vy += (gPix - drag) * dt;
                                    obj.y += obj.vy * dt;
                                    if (obj.y + obj.r >= groundY) {
                                        obj.y = groundY - obj.r;
                                        obj.landed = true;
                                        obj.vy = 0;
                                    }
                                }
                            }

                            // Draw balls
                            var hx = 280;
                            var lx = 420;

                            // Heavy ball
                            ctx.fillStyle = heavy.color;
                            ctx.beginPath();
                            ctx.arc(hx, heavy.y, heavy.r, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(heavy.label, hx, heavy.y);

                            // Light ball
                            ctx.fillStyle = light.color;
                            ctx.beginPath();
                            ctx.arc(lx, light.y, light.r, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 9px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(light.label, lx, light.y);

                            // Labels
                            ctx.fillStyle = heavy.color;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Heavy', hx, 10);
                            ctx.fillStyle = light.color;
                            ctx.fillText('Light', lx, 10);

                            // Air resistance indicator
                            ctx.fillStyle = airOn ? viz.colors.yellow : viz.colors.muted || viz.colors.text;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Air Resistance: ' + (airOn ? 'ON' : 'OFF'), 20, 15);

                            if (!airOn) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('(Vacuum: no air)', 20, 35);
                            }

                            // Result message
                            if (heavy.landed && light.landed) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 15px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                if (!airOn) {
                                    ctx.fillText('They land at the same time! (no air)', 350, groundY - 5);
                                } else {
                                    ctx.fillText('Air slows the lighter one more!', 350, groundY - 5);
                                }
                            } else if (heavy.landed && !light.landed) {
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText('Heavy ball landed first! Air resistance matters.', 350, groundY - 5);
                            }
                        }

                        viz.animate(function() {
                            draw();
                        });

                        VizEngine.createButton(controls, 'Drop Both!', function() {
                            reset();
                            dropping = true;
                        });
                        VizEngine.createButton(controls, 'Toggle Air', function() {
                            airOn = !airOn;
                            reset();
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            reset();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'You drop a basketball and a tennis ball from the same height at the same time (ignore air resistance). Which one hits the ground first?',
                    hint: 'Remember what Galileo discovered about objects falling without air.',
                    solution: 'They hit the ground at the same time! Without air resistance, all objects fall at the same rate regardless of their mass. Both accelerate at g = 10 m/s\u00B2.'
                },
                {
                    question: 'Why does a feather fall slower than a coin in normal conditions, but at the same speed in a vacuum?',
                    hint: 'Think about what is different between normal air and a vacuum.',
                    solution: 'In air, the feather has a large surface area compared to its weight, so air resistance slows it down much more than the coin. In a vacuum, there is no air, so both fall at exactly the same rate due to gravity alone.'
                }
            ]
        }
    ]
});
