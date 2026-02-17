window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'What Is Motion',
    subtitle: 'Is the World Moving?',
    sections: [
        {
            id: 'what-counts-as-motion',
            title: 'What Counts as Motion?',
            content: `
                <h2>What Counts as Motion?</h2>
                <p>Look around you right now. Is anything moving? Maybe a clock on the wall, a fan spinning, or a car passing outside the window. But what exactly <em>is</em> motion?</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Motion</div>
                    <div class="env-body"><p><strong>Motion</strong> is when an object changes its position over time. If something was "here" and now it is "there," it has moved!</p></div>
                </div>

                <p>Think about it this way: if you take a photo of a ball, then take another photo a second later, and the ball is in a different spot, the ball is in motion. If the ball is in the same spot in both photos, it is at rest (not moving).</p>

                <div class="env-block intuition">
                    <div class="env-title">Key Idea</div>
                    <div class="env-body"><p>To decide if something is moving, you need two things: a <strong>position</strong> and <strong>time</strong>. If the position changes as time passes, the object is in motion.</p></div>
                </div>

                <p>Try the visualization below. Click on different objects to decide whether they are moving or still!</p>

                <div class="viz-placeholder" data-viz="viz-motion-detector"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A book sitting on a table: <strong>at rest</strong> (not moving).</p>
                        <p>A bird flying across the sky: <strong>in motion</strong> (changing position).</p>
                        <p>A tree in the park: <strong>at rest</strong> (it stays in the same spot).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-motion-detector',
                    title: 'Motion Detector',
                    description: 'Click objects to classify them as moving or still',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 175 });
                        var objects = [
                            { name: 'Car', x: -6, y: 2, moving: true, emoji: 'CAR', color: viz.colors.blue },
                            { name: 'Tree', x: -3, y: -1, moving: false, emoji: 'TREE', color: viz.colors.green },
                            { name: 'Bird', x: 0, y: 3, moving: true, emoji: 'BIRD', color: viz.colors.orange },
                            { name: 'House', x: 3, y: -1, moving: false, emoji: 'HOUSE', color: viz.colors.purple },
                            { name: 'Ball', x: 6, y: 2, moving: true, emoji: 'BALL', color: viz.colors.red },
                            { name: 'Rock', x: -6, y: -3, moving: false, emoji: 'ROCK', color: viz.colors.muted || viz.colors.text },
                            { name: 'Bicycle', x: 0, y: -3, moving: true, emoji: 'BIKE', color: viz.colors.teal },
                            { name: 'Bench', x: 5, y: -3, moving: false, emoji: 'BENCH', color: viz.colors.yellow }
                        ];
                        var score = 0;
                        var total = objects.length;
                        var answered = [];
                        var feedback = '';
                        var feedbackColor = viz.colors.white;
                        var animT = 0;

                        function draw(t) {
                            animT = t || 0;
                            viz.clear();
                            viz.screenText('Click an object, then press MOVING or STILL', viz.width / 2, 16, viz.colors.text, 13);
                            viz.screenText('Score: ' + score + ' / ' + total, viz.width - 60, 16, viz.colors.teal, 13);

                            for (var i = 0; i < objects.length; i++) {
                                var obj = objects[i];
                                var bx = obj.x;
                                var by = obj.y;
                                // Animate moving objects
                                if (obj.moving) {
                                    bx = obj.x + Math.sin(animT * 0.001 + i) * 0.5;
                                    by = obj.y + Math.cos(animT * 0.0015 + i) * 0.3;
                                }
                                var done = answered.indexOf(i) !== -1;
                                var c = done ? (viz.colors.text + '66') : obj.color;
                                var sc = viz.toScreen(bx, by);
                                // Draw circle background
                                var ctx = viz.ctx;
                                ctx.fillStyle = done ? '#1a1a4044' : (obj.color + '33');
                                ctx.beginPath();
                                ctx.arc(sc[0], sc[1], 24, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = c;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(sc[0], sc[1], 24, 0, Math.PI * 2);
                                ctx.stroke();
                                viz.screenText(obj.emoji, sc[0], sc[1] - 4, c, 10, 'center');
                                viz.screenText(obj.name, sc[0], sc[1] + 12, c, 11, 'center');
                            }

                            if (feedback) {
                                viz.screenText(feedback, viz.width / 2, viz.height - 20, feedbackColor, 14);
                            }
                        }

                        var selected = -1;

                        viz.canvas.addEventListener('click', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var cx = e.clientX - rect.left;
                            var cy = e.clientY - rect.top;
                            var m = viz.toMath(cx, cy);
                            for (var i = 0; i < objects.length; i++) {
                                if (answered.indexOf(i) !== -1) continue;
                                var obj = objects[i];
                                var bx = obj.x + (obj.moving ? Math.sin(animT * 0.001 + i) * 0.5 : 0);
                                var by = obj.y + (obj.moving ? Math.cos(animT * 0.0015 + i) * 0.3 : 0);
                                var dx = m[0] - bx;
                                var dy = m[1] - by;
                                if (Math.sqrt(dx * dx + dy * dy) < 0.8) {
                                    selected = i;
                                    feedback = 'Selected: ' + obj.name + ' -- Is it MOVING or STILL?';
                                    feedbackColor = viz.colors.yellow;
                                    return;
                                }
                            }
                        });

                        function answer(isMoving) {
                            if (selected < 0 || answered.indexOf(selected) !== -1) {
                                feedback = 'Click on an object first!';
                                feedbackColor = viz.colors.red;
                                return;
                            }
                            var obj = objects[selected];
                            if (obj.moving === isMoving) {
                                score++;
                                feedback = 'Correct! ' + obj.name + (isMoving ? ' is moving!' : ' is still!');
                                feedbackColor = viz.colors.green;
                            } else {
                                feedback = 'Not quite! ' + obj.name + (obj.moving ? ' is actually moving.' : ' is actually still.');
                                feedbackColor = viz.colors.red;
                            }
                            answered.push(selected);
                            selected = -1;
                            if (answered.length === total) {
                                feedback = 'All done! You got ' + score + ' out of ' + total + ' correct!';
                                feedbackColor = viz.colors.teal;
                            }
                        }

                        VizEngine.createButton(controls, 'MOVING', function() { answer(true); });
                        VizEngine.createButton(controls, 'STILL', function() { answer(false); });
                        VizEngine.createButton(controls, 'Reset', function() {
                            score = 0;
                            answered = [];
                            selected = -1;
                            feedback = '';
                        });

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A bus drives down the street. Is the bus in motion? How do you know?',
                    hint: 'Think about whether the bus changes position over time.',
                    solution: 'Yes, the bus is in motion because it changes its position along the street as time passes.'
                },
                {
                    question: 'A student sits at a desk during class. Is the student in motion or at rest?',
                    hint: 'Is the student changing position?',
                    solution: 'The student is at rest because their position is not changing over time (assuming they are sitting still).'
                }
            ]
        },
        {
            id: 'types-of-motion',
            title: 'Types of Motion',
            content: `
                <h2>Types of Motion</h2>
                <p>Not all motion looks the same! A car driving straight ahead moves differently from a spinning top, and both move differently from a swing going back and forth. Let's explore the main types of motion.</p>

                <div class="env-block definition">
                    <div class="env-title">Linear (Straight-line) Motion</div>
                    <div class="env-body"><p>An object moves along a straight path. Examples: a ball rolling down a ramp, a train on straight tracks, a sprinter running the 100-meter dash.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Rotational (Circular) Motion</div>
                    <div class="env-body"><p>An object spins around a center point. Examples: a merry-go-round, Earth spinning on its axis, the hands of a clock.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Oscillation (Back-and-forth) Motion</div>
                    <div class="env-body"><p>An object moves back and forth along the same path. Examples: a swing, a vibrating guitar string, a pendulum in a grandfather clock.</p></div>
                </div>

                <p>Watch the animation below to see all three types of motion side by side!</p>

                <div class="viz-placeholder" data-viz="viz-motion-types"></div>

                <div class="env-block remark">
                    <div class="env-title">Fun Fact</div>
                    <div class="env-body"><p>Many real-world motions are combinations! A car's wheels rotate (rotational motion) while the car moves forward (linear motion). A bouncing ball goes up and down (oscillation) while also moving forward (linear).</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-motion-types',
                    title: 'Three Types of Motion',
                    description: 'Watch linear, rotational, and oscillating motion side by side',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 175 });
                        var running = true;
                        var speed = 1.0;

                        function draw(t) {
                            viz.clear();
                            var s = t * 0.001 * speed;

                            // Section labels
                            viz.screenText('LINEAR', 120, 25, viz.colors.blue, 14, 'center');
                            viz.screenText('ROTATIONAL', 350, 25, viz.colors.orange, 14, 'center');
                            viz.screenText('OSCILLATION', 580, 25, viz.colors.green, 14, 'center');

                            // Divider lines
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.text + '44';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(233, 40); ctx.lineTo(233, 330); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(467, 40); ctx.lineTo(467, 330); ctx.stroke();
                            ctx.setLineDash([]);

                            // Linear motion - ball moving left to right
                            var lx = 40 + ((s * 60) % 186);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath(); ctx.arc(lx, 175, 12, 0, Math.PI * 2); ctx.fill();
                            // Track
                            ctx.strokeStyle = viz.colors.blue + '44';
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(40, 175); ctx.lineTo(226, 175); ctx.stroke();
                            // Arrow showing direction
                            ctx.fillStyle = viz.colors.blue + '88';
                            ctx.beginPath(); ctx.moveTo(216, 170); ctx.lineTo(226, 175); ctx.lineTo(216, 180); ctx.closePath(); ctx.fill();

                            // Rotational motion - ball spinning in a circle
                            var rcx = 350, rcy = 175, rr = 60;
                            var angle = s * 2;
                            // Draw circle path
                            ctx.strokeStyle = viz.colors.orange + '44';
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.arc(rcx, rcy, rr, 0, Math.PI * 2); ctx.stroke();
                            // Center dot
                            ctx.fillStyle = viz.colors.orange + '44';
                            ctx.beginPath(); ctx.arc(rcx, rcy, 4, 0, Math.PI * 2); ctx.fill();
                            // Orbiting ball
                            var rx = rcx + rr * Math.cos(angle);
                            var ry = rcy + rr * Math.sin(angle);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath(); ctx.arc(rx, ry, 12, 0, Math.PI * 2); ctx.fill();
                            // Connecting line
                            ctx.strokeStyle = viz.colors.orange + '66';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(rcx, rcy); ctx.lineTo(rx, ry); ctx.stroke();

                            // Oscillation - ball swinging back and forth
                            var ocx = 580, ocy = 175;
                            var oAmplitude = 60;
                            var ox = ocx + oAmplitude * Math.sin(s * 2.5);
                            // Draw path
                            ctx.strokeStyle = viz.colors.green + '44';
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(ocx - oAmplitude, ocy); ctx.lineTo(ocx + oAmplitude, ocy); ctx.stroke();
                            // End markers
                            ctx.fillStyle = viz.colors.green + '44';
                            ctx.beginPath(); ctx.arc(ocx - oAmplitude, ocy, 4, 0, Math.PI * 2); ctx.fill();
                            ctx.beginPath(); ctx.arc(ocx + oAmplitude, ocy, 4, 0, Math.PI * 2); ctx.fill();
                            // Ball
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath(); ctx.arc(ox, ocy, 12, 0, Math.PI * 2); ctx.fill();

                            // Labels
                            viz.screenText('Straight path', 120, 280, viz.colors.blue + 'aa', 11, 'center');
                            viz.screenText('Spins around center', 350, 280, viz.colors.orange + 'aa', 11, 'center');
                            viz.screenText('Back and forth', 580, 280, viz.colors.green + 'aa', 11, 'center');
                        }

                        VizEngine.createSlider(controls, 'Speed', 0.2, 3.0, 1.0, 0.1, function(v) { speed = v; });

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A child sits on a merry-go-round that is spinning. What type of motion is the child experiencing?',
                    hint: 'The child goes around in a circle.',
                    solution: 'The child is experiencing rotational (circular) motion because they move in a circle around the center of the merry-go-round.'
                },
                {
                    question: 'Name one example each of linear motion, rotational motion, and oscillation from everyday life.',
                    hint: 'Think about things you see at home, at school, or in a park.',
                    solution: 'Linear: a car driving on a straight road. Rotational: the blades of a ceiling fan. Oscillation: a swing in a playground.'
                }
            ]
        },
        {
            id: 'motion-is-relative',
            title: 'Motion Is Relative',
            content: `
                <h2>Motion Is Relative</h2>
                <p>Here is a mind-bending idea: <strong>whether something is "moving" depends on who is watching!</strong></p>

                <div class="env-block intuition">
                    <div class="env-title">Thought Experiment</div>
                    <div class="env-body">
                        <p>Imagine you are sitting on a train. You look at the person sitting across from you. Are they moving?</p>
                        <p>From <strong>your</strong> point of view: No! They are sitting still in their seat.</p>
                        <p>From a <strong>person standing on the platform</strong> outside: Yes! Both you and the other passenger are zooming past at high speed!</p>
                        <p>So who is right? <strong>Both of them!</strong> Motion depends on your point of view, which we call a <strong>reference frame</strong>.</p>
                    </div>
                </div>

                <p>The person you compare motion to is called the <strong>observer</strong>. Different observers can disagree about whether something is moving, and they can all be correct!</p>

                <div class="viz-placeholder" data-viz="viz-relative-motion"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>You are in a car driving at 60 km/h. A cup sits in the cup holder.</p>
                        <p><strong>You (inside the car):</strong> The cup is not moving.</p>
                        <p><strong>A person on the sidewalk:</strong> The cup is moving at 60 km/h!</p>
                        <p>Both are correct because they are using different reference frames.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Think About This</div>
                    <div class="env-body"><p>Right now you feel like you are sitting still. But the Earth is spinning at about 1,670 km/h at the equator, and orbiting the Sun at about 107,000 km/h! From the Sun's point of view, you are moving incredibly fast.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-relative-motion',
                    title: 'Relative Motion: Two Viewpoints',
                    description: 'Switch between the ground view and the train view to see how motion is relative',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 175 });
                        var viewMode = 'ground'; // 'ground' or 'train'
                        var speed = 1.0;

                        function draw(t) {
                            viz.clear();
                            var s = t * 0.001 * speed;
                            var ctx = viz.ctx;

                            var label = viewMode === 'ground' ? 'View from: GROUND' : 'View from: TRAIN';
                            viz.screenText(label, viz.width / 2, 20, viz.colors.yellow, 15, 'center');

                            if (viewMode === 'ground') {
                                // Ground is still, train moves right
                                var trainX = -200 + ((s * 80) % 900);
                                if (trainX > 700) trainX = -200;

                                // Ground
                                ctx.fillStyle = '#2a5a2a';
                                ctx.fillRect(0, 250, 700, 100);
                                // Sky line
                                ctx.strokeStyle = viz.colors.text + '33';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(0, 250); ctx.lineTo(700, 250); ctx.stroke();

                                // Trees (stationary)
                                for (var i = 0; i < 5; i++) {
                                    var tx = 70 + i * 150;
                                    ctx.fillStyle = '#4a8a4a';
                                    ctx.beginPath(); ctx.moveTo(tx, 220); ctx.lineTo(tx - 15, 250); ctx.lineTo(tx + 15, 250); ctx.closePath(); ctx.fill();
                                    ctx.fillStyle = '#5a3a1a';
                                    ctx.fillRect(tx - 3, 250, 6, 15);
                                }

                                // Observer on ground
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.arc(350, 240, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.fillRect(346, 248, 8, 16);
                                viz.screenText('You (ground)', 350, 280, viz.colors.teal, 11, 'center');

                                // Train
                                ctx.fillStyle = viz.colors.blue + '88';
                                ctx.fillRect(trainX, 180, 120, 50);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(trainX, 180, 120, 5);
                                // Windows
                                ctx.fillStyle = viz.colors.yellow + '44';
                                ctx.fillRect(trainX + 10, 192, 20, 20);
                                ctx.fillRect(trainX + 45, 192, 20, 20);
                                ctx.fillRect(trainX + 80, 192, 20, 20);
                                // Wheels
                                ctx.fillStyle = '#444';
                                ctx.beginPath(); ctx.arc(trainX + 25, 232, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(trainX + 95, 232, 8, 0, Math.PI * 2); ctx.fill();
                                // Passenger inside
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(trainX + 55, 198, 5, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('Passenger', trainX + 55, 170, viz.colors.orange, 11, 'center');

                                viz.screenText('The train and passenger move. Trees and ground stay still.', viz.width / 2, 330, viz.colors.text, 12, 'center');
                            } else {
                                // Train view: train is still, ground moves left
                                var offset = (s * 80) % 150;

                                // Ground moving left
                                ctx.fillStyle = '#2a5a2a';
                                ctx.fillRect(0, 250, 700, 100);
                                ctx.strokeStyle = viz.colors.text + '33';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(0, 250); ctx.lineTo(700, 250); ctx.stroke();

                                // Trees (moving left)
                                for (var j = -1; j < 7; j++) {
                                    var tx2 = 70 + j * 150 - offset;
                                    ctx.fillStyle = '#4a8a4a';
                                    ctx.beginPath(); ctx.moveTo(tx2, 220); ctx.lineTo(tx2 - 15, 250); ctx.lineTo(tx2 + 15, 250); ctx.closePath(); ctx.fill();
                                    ctx.fillStyle = '#5a3a1a';
                                    ctx.fillRect(tx2 - 3, 250, 6, 15);
                                }

                                // Observer on ground (moving left)
                                var gx = 500 - ((s * 80) % 900);
                                if (gx < -50) gx = 750;
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.arc(gx, 240, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.fillRect(gx - 4, 248, 8, 16);
                                viz.screenText('Ground person', gx, 280, viz.colors.teal, 11, 'center');

                                // Train (stationary, centered)
                                var stx = 290;
                                ctx.fillStyle = viz.colors.blue + '88';
                                ctx.fillRect(stx, 180, 120, 50);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(stx, 180, 120, 5);
                                ctx.fillStyle = viz.colors.yellow + '44';
                                ctx.fillRect(stx + 10, 192, 20, 20);
                                ctx.fillRect(stx + 45, 192, 20, 20);
                                ctx.fillRect(stx + 80, 192, 20, 20);
                                ctx.fillStyle = '#444';
                                ctx.beginPath(); ctx.arc(stx + 25, 232, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(stx + 95, 232, 8, 0, Math.PI * 2); ctx.fill();
                                // Passenger (you, sitting still)
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(stx + 55, 198, 5, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('You (on train)', stx + 55, 170, viz.colors.orange, 11, 'center');

                                viz.screenText('The train and passenger are still. The world outside moves past!', viz.width / 2, 330, viz.colors.text, 12, 'center');
                            }
                        }

                        VizEngine.createButton(controls, 'Ground View', function() { viewMode = 'ground'; });
                        VizEngine.createButton(controls, 'Train View', function() { viewMode = 'train'; });
                        VizEngine.createSlider(controls, 'Speed', 0.2, 3.0, 1.0, 0.1, function(v) { speed = v; });

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'You are sitting in a car that is driving on the highway. Your friend is in the car with you. From your point of view, is your friend moving?',
                    hint: 'Are you and your friend changing positions relative to each other?',
                    solution: 'From your point of view, your friend is NOT moving because you are both in the same car, staying in the same positions relative to each other. From the point of view of a person on the sidewalk, your friend IS moving because they are traveling along with the car.'
                }
            ]
        },
        {
            id: 'everyday-motion',
            title: 'Motion All Around Us',
            content: `
                <h2>Motion All Around Us</h2>
                <p>Now that you know what motion is, let's look at all the amazing motion happening around us every single day!</p>

                <div class="env-block intuition">
                    <div class="env-title">Motion Is Everywhere!</div>
                    <div class="env-body">
                        <p>From the moment you wake up, you are surrounded by motion. Your alarm clock vibrates (oscillation), you walk to school (linear motion), the wheels on the bus go round and round (rotational motion). Even the blood flowing through your body is in motion!</p>
                    </div>
                </div>

                <p>Use the classifier below to sort everyday motions into their types!</p>

                <div class="viz-placeholder" data-viz="viz-daily-classifier"></div>

                <div class="env-block example">
                    <div class="env-title">Examples of Everyday Motion</div>
                    <div class="env-body">
                        <p><strong>At home:</strong> A ceiling fan spinning (rotational), a door opening and closing (rotational around the hinge), water flowing from a tap (linear).</p>
                        <p><strong>Outside:</strong> Cars on the road (linear), a Ferris wheel (rotational), leaves rustling in the wind (oscillation).</p>
                        <p><strong>In nature:</strong> Rivers flowing (linear), Earth orbiting the Sun (rotational), ocean waves (oscillation).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Challenge</div>
                    <div class="env-body"><p>Next time you go outside, try to spot at least one example of each type of motion: linear, rotational, and oscillation. You might be surprised how many you find!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-daily-classifier',
                    title: 'Daily Motion Classifier',
                    description: 'Classify everyday motions into linear, rotational, or oscillation',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 175 });
                        var items = [
                            { name: 'Train on tracks', type: 'linear' },
                            { name: 'Clock hands', type: 'rotational' },
                            { name: 'Swing in park', type: 'oscillation' },
                            { name: 'Bowling ball', type: 'linear' },
                            { name: 'Spinning top', type: 'rotational' },
                            { name: 'Guitar string', type: 'oscillation' },
                            { name: 'Skating forward', type: 'linear' },
                            { name: 'Ferris wheel', type: 'rotational' },
                            { name: 'Pendulum clock', type: 'oscillation' }
                        ];
                        var currentIdx = 0;
                        var score = 0;
                        var feedback = '';
                        var feedbackColor = viz.colors.white;
                        var done = false;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Title
                            viz.screenText('What type of motion is this?', viz.width / 2, 30, viz.colors.text, 14, 'center');
                            viz.screenText('Score: ' + score + ' / ' + items.length, viz.width - 70, 30, viz.colors.teal, 13);

                            if (done) {
                                viz.screenText('All done! Great job!', viz.width / 2, 150, viz.colors.teal, 22, 'center');
                                viz.screenText('You got ' + score + ' out of ' + items.length + ' correct.', viz.width / 2, 190, viz.colors.white, 16, 'center');
                                return;
                            }

                            // Current item
                            var item = items[currentIdx];
                            viz.screenText('"' + item.name + '"', viz.width / 2, 120, viz.colors.white, 22, 'center');
                            viz.screenText('(' + (currentIdx + 1) + ' of ' + items.length + ')', viz.width / 2, 155, viz.colors.text, 12, 'center');

                            // Category boxes
                            var categories = [
                                { label: 'LINEAR', color: viz.colors.blue, x: 140 },
                                { label: 'ROTATIONAL', color: viz.colors.orange, x: 350 },
                                { label: 'OSCILLATION', color: viz.colors.green, x: 560 }
                            ];
                            for (var i = 0; i < categories.length; i++) {
                                var cat = categories[i];
                                ctx.strokeStyle = cat.color;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(cat.x - 60, 200, 120, 50);
                                viz.screenText(cat.label, cat.x, 225, cat.color, 13, 'center');
                            }

                            // Feedback
                            if (feedback) {
                                viz.screenText(feedback, viz.width / 2, 310, feedbackColor, 14, 'center');
                            }
                        }

                        function guess(type) {
                            if (done) return;
                            var item = items[currentIdx];
                            if (item.type === type) {
                                score++;
                                feedback = 'Correct! "' + item.name + '" is ' + type + ' motion.';
                                feedbackColor = viz.colors.green;
                            } else {
                                feedback = 'Not quite. "' + item.name + '" is ' + item.type + ' motion.';
                                feedbackColor = viz.colors.red;
                            }
                            currentIdx++;
                            if (currentIdx >= items.length) {
                                done = true;
                            }
                            draw();
                        }

                        VizEngine.createButton(controls, 'Linear', function() { guess('linear'); });
                        VizEngine.createButton(controls, 'Rotational', function() { guess('rotational'); });
                        VizEngine.createButton(controls, 'Oscillation', function() { guess('oscillation'); });
                        VizEngine.createButton(controls, 'Reset', function() {
                            currentIdx = 0;
                            score = 0;
                            feedback = '';
                            done = false;
                            draw();
                        });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'List three objects in your house that are in motion right now (or could be). What type of motion does each one have?',
                    hint: 'Think about clocks, fans, doors, water, and anything that vibrates.',
                    solution: 'Possible answers: (1) A clock with moving hands -- rotational motion. (2) Water flowing from a faucet -- linear motion. (3) A phone vibrating with a notification -- oscillation.'
                },
                {
                    question: 'A spinning top moves across a table while it spins. What types of motion is it experiencing at the same time?',
                    hint: 'The top is doing two things: spinning and also traveling across the table.',
                    solution: 'The spinning top has both rotational motion (spinning around its own axis) and linear motion (moving across the table). This is a combination of two types of motion happening at the same time!'
                }
            ]
        }
    ]
});
