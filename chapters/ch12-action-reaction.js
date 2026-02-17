window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch12',
    number: 12,
    title: 'Action & Reaction',
    subtitle: 'Forces Come in Pairs',
    sections: [
        {
            id: 'every-action-has-reaction',
            title: 'Every Action Has a Reaction',
            content: `
                <h2>Every Action Has a Reaction</h2>
                <p>Newton's Third Law is one of the most surprising ideas in physics:</p>

                <div class="env-block definition">
                    <div class="env-title">Newton's Third Law</div>
                    <div class="env-body"><p>For every action, there is an <strong>equal and opposite reaction</strong>.</p>
                    <p>When object A pushes on object B, object B pushes back on object A with the same amount of force, but in the opposite direction.</p></div>
                </div>

                <p>This means forces always come in <strong>pairs</strong>. You can never have just one force by itself. Every push creates a push back.</p>

                <div class="env-block intuition">
                    <div class="env-title">Key Insight</div>
                    <div class="env-body">
                        <p>The action and reaction forces:</p>
                        <ul>
                            <li>Are always <strong>equal in size</strong></li>
                            <li>Are always in <strong>opposite directions</strong></li>
                            <li>Act on <strong>different objects</strong> (this is really important!)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Pushing a Wall</div>
                    <div class="env-body"><p>When you push against a wall, the wall pushes back on you with the same force. You can feel this! If the wall did not push back, your hand would go right through it.</p></div>
                </div>

                <p>The forces act on <strong>different objects</strong>. When you push the wall, the force on the wall does not cancel out the force on you, because they are on different things.</p>

                <div class="env-block warning">
                    <div class="env-title">Common Mistake</div>
                    <div class="env-body"><p>Students sometimes ask: "If every force has an equal and opposite reaction, why does anything move?" The answer is that the two forces act on <strong>different objects</strong>. When you push a cart, the cart pushes back on you - but the forward force on the cart makes the cart accelerate!</p></div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'You push a friend on a skateboard. What is the reaction force?',
                    hint: 'What does your friend push back on?',
                    solution: 'Your friend pushes back on you with the same force. If you are also on a skateboard, you would roll backward! The action is you pushing your friend forward, and the reaction is your friend pushing you backward.'
                },
                {
                    question: 'A book sits on a table. Is the weight of the book and the table pushing up on it an action-reaction pair?',
                    hint: 'Action-reaction pairs act on different objects. Are these forces on different objects?',
                    solution: 'No! These are balanced forces on the SAME object (the book), not an action-reaction pair. The action-reaction pair for the book\'s weight (Earth pulling book down) is the book pulling Earth upward. The table pushing up on the book is paired with the book pushing down on the table.'
                }
            ]
        },
        {
            id: 'examples-action-reaction',
            title: 'Walking, Swimming, Rockets',
            content: `
                <h2>Action-Reaction in Everyday Life</h2>
                <p>Newton's Third Law is how everything moves! Here are some amazing examples:</p>

                <div class="env-block example">
                    <div class="env-title">Walking</div>
                    <div class="env-body">
                        <p>When you walk, your foot pushes backward on the ground. The ground pushes forward on your foot - and that forward push is what moves you! Without friction (like on ice), your foot slides backward and you cannot walk.</p>
                        <ul>
                            <li>Action: Your foot pushes the ground backward</li>
                            <li>Reaction: The ground pushes your foot forward</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Swimming</div>
                    <div class="env-body">
                        <p>A swimmer pushes water backward with their hands and feet. The water pushes the swimmer forward with an equal force.</p>
                        <ul>
                            <li>Action: Hands push water backward</li>
                            <li>Reaction: Water pushes swimmer forward</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Rocket Propulsion</div>
                    <div class="env-body">
                        <p>A rocket engine pushes hot gas downward at high speed. The gas pushes the rocket upward with equal force. This works even in space where there is nothing to push against - the rocket pushes its own exhaust!</p>
                        <ul>
                            <li>Action: Rocket pushes exhaust gas downward</li>
                            <li>Reaction: Exhaust gas pushes rocket upward</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-skating-pushoff"></div>

                <div class="env-block intuition">
                    <div class="env-title">Try This</div>
                    <div class="env-body"><p>Sit in a rolling chair on a smooth floor. Throw a heavy ball forward. What happens to you? You roll backward! You push the ball forward, and the ball pushes you backward. That is Newton's Third Law in action.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-skating-pushoff',
                    title: 'Skating Push-Off Demo',
                    description: 'Two skaters push off each other. Watch how both move - the lighter one moves faster! Adjust the masses and click "Push!"',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 320, scale: 30, originX: 350, originY: 280});
                        var mass1 = 50;
                        var mass2 = 80;
                        var pos1 = -1;
                        var pos2 = 1;
                        var vel1 = 0;
                        var vel2 = 0;
                        var pushing = false;
                        var pushPhase = 0;
                        var pushForce = 300;

                        VizEngine.createSlider(controls, 'Skater A mass (kg)', 30, 100, 50, 5, function(val) {
                            mass1 = val;
                        });
                        VizEngine.createSlider(controls, 'Skater B mass (kg)', 30, 100, 80, 5, function(val) {
                            mass2 = val;
                        });

                        VizEngine.createButton(controls, 'Push!', function() {
                            pos1 = -1;
                            pos2 = 1;
                            vel1 = 0;
                            vel2 = 0;
                            pushing = true;
                            pushPhase = 0;
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            pos1 = -1;
                            pos2 = 1;
                            vel1 = 0;
                            vel2 = 0;
                            pushing = false;
                            pushPhase = 0;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // ice surface
                            ctx.fillStyle = '#1a2a3a';
                            ctx.fillRect(0, 240, 700, 80);
                            ctx.strokeStyle = '#3a5a7a';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(0, 240);
                            ctx.lineTo(700, 240);
                            ctx.stroke();

                            // skater A (left)
                            var s1 = viz.toScreen(pos1, 0);
                            var sx1 = s1[0];
                            // body
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(sx1, 180, 15, 0, Math.PI * 2);
                            ctx.fill();
                            // torso
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.moveTo(sx1, 195);
                            ctx.lineTo(sx1, 225);
                            ctx.stroke();
                            // legs
                            ctx.beginPath();
                            ctx.moveTo(sx1, 225);
                            ctx.lineTo(sx1 - 8, 240);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(sx1, 225);
                            ctx.lineTo(sx1 + 8, 240);
                            ctx.stroke();
                            viz.screenText('A: ' + mass1 + ' kg', sx1, 160, viz.colors.blue, 12);
                            viz.screenText('v = ' + Math.abs(vel1).toFixed(1) + ' m/s', sx1, 255, viz.colors.blue, 11);

                            // skater B (right)
                            var s2 = viz.toScreen(pos2, 0);
                            var sx2 = s2[0];
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(sx2, 180, 15, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.moveTo(sx2, 195);
                            ctx.lineTo(sx2, 225);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(sx2, 225);
                            ctx.lineTo(sx2 - 8, 240);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(sx2, 225);
                            ctx.lineTo(sx2 + 8, 240);
                            ctx.stroke();
                            viz.screenText('B: ' + mass2 + ' kg', sx2, 160, viz.colors.orange, 12);
                            viz.screenText('v = ' + Math.abs(vel2).toFixed(1) + ' m/s', sx2, 255, viz.colors.orange, 11);

                            // force arrows during push
                            if (pushing && pushPhase < 0.5) {
                                // force on A (left)
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(sx1, 200);
                                ctx.lineTo(sx1 - 40, 200);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(sx1 - 45, 200);
                                ctx.lineTo(sx1 - 38, 195);
                                ctx.lineTo(sx1 - 38, 205);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('F', sx1 - 50, 192, viz.colors.red, 12);

                                // force on B (right)
                                ctx.strokeStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(sx2, 200);
                                ctx.lineTo(sx2 + 40, 200);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(sx2 + 45, 200);
                                ctx.lineTo(sx2 + 38, 195);
                                ctx.lineTo(sx2 + 38, 205);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('F', sx2 + 50, 192, viz.colors.red, 12);

                                viz.screenText('Equal forces, opposite directions!', 350, 30, viz.colors.red, 15);
                            }

                            if (vel1 !== 0 || vel2 !== 0) {
                                viz.screenText('Same force, but lighter skater moves faster!', 350, 30, viz.colors.green, 14);
                                viz.screenText('Momentum is conserved: m\u2081v\u2081 = m\u2082v\u2082', 350, 50, viz.colors.teal, 13);
                            }

                            if (!pushing && vel1 === 0) {
                                viz.screenText('Set masses and click "Push!"', 350, 30, viz.colors.muted, 14);
                            }
                        }

                        viz.animate(function() {
                            if (pushing) {
                                pushPhase += 0.016;
                                if (pushPhase < 0.5) {
                                    // during push - apply equal forces
                                    vel1 -= (pushForce / mass1) * 0.016;
                                    vel2 += (pushForce / mass2) * 0.016;
                                } else {
                                    pushing = false;
                                }
                            }
                            pos1 += vel1 * 0.016;
                            pos2 += vel2 * 0.016;

                            // wrap around
                            if (pos1 < -12) pos1 = -12;
                            if (pos2 > 12) pos2 = 12;

                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'When you jump, you push down on the floor. What is the reaction force, and what does it do?',
                    hint: 'The floor pushes back on you. In which direction?',
                    solution: 'The reaction force is the floor pushing you upward. This upward force is what launches you into the air! You push down on the floor, and the floor pushes you up with equal force.'
                },
                {
                    question: 'A bird flies by pushing air downward with its wings. Explain how this is an example of Newton\'s Third Law.',
                    hint: 'If the bird pushes air down, what does the air do to the bird?',
                    solution: 'The bird\'s wings push air downward (action). The air pushes the bird\'s wings upward with equal force (reaction). This upward push is what keeps the bird in the air - it is the lift force!'
                }
            ]
        },
        {
            id: 'collision-forces',
            title: 'Collision Forces',
            content: `
                <h2>Forces in Collisions</h2>
                <p>When two objects collide, Newton's Third Law tells us that the forces are always equal and opposite. This is true even if the objects have very different sizes!</p>

                <div class="env-block intuition">
                    <div class="env-title">Surprising Fact</div>
                    <div class="env-body"><p>When a bug hits your car windshield, the force of the car on the bug is <strong>exactly equal</strong> to the force of the bug on the car. The bug splatters because it has very small mass, so the same force creates a huge acceleration (and destruction). The car barely notices because its huge mass means the same force creates only a tiny change in speed.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-collision"></div>

                <div class="env-block example">
                    <div class="env-title">Head-On Collision</div>
                    <div class="env-body">
                        <p>A 1000 kg car hits a 100 kg motorcycle at the same force during impact.</p>
                        <ul>
                            <li>Force on motorcycle = Force on car (Newton's Third Law)</li>
                            <li>But motorcycle's acceleration = 10 times the car's acceleration (because \\(a = F/m\\) and the motorcycle has 1/10 the mass)</li>
                        </ul>
                        <p>This is why lighter vehicles suffer more damage in collisions.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-collision',
                    title: 'Collision Simulator',
                    description: 'Watch two objects collide. Both experience the same force, but the lighter one changes speed more! Adjust masses and click "Collide!"',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 320, scale: 30, originX: 350, originY: 250});
                        var m1 = 5;
                        var m2 = 2;
                        var pos1 = -6;
                        var pos2 = 6;
                        var vel1 = 4;
                        var vel2 = -4;
                        var origVel1 = 4;
                        var origVel2 = -4;
                        var colliding = false;
                        var collided = false;
                        var running = false;
                        var contactTime = 0;
                        var showForces = false;

                        VizEngine.createSlider(controls, 'Mass A (kg)', 1, 10, 5, 1, function(val) { m1 = val; });
                        VizEngine.createSlider(controls, 'Mass B (kg)', 1, 10, 2, 1, function(val) { m2 = val; });

                        VizEngine.createButton(controls, 'Collide!', function() {
                            pos1 = -6;
                            pos2 = 6;
                            vel1 = 4;
                            vel2 = -4;
                            origVel1 = 4;
                            origVel2 = -4;
                            colliding = false;
                            collided = false;
                            running = true;
                            showForces = false;
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            pos1 = -6;
                            pos2 = 6;
                            vel1 = 4;
                            vel2 = -4;
                            colliding = false;
                            collided = false;
                            running = false;
                            showForces = false;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // ground
                            ctx.fillStyle = '#2a2a3a';
                            ctx.fillRect(0, 220, 700, 100);

                            // Object A
                            var s1 = viz.toScreen(pos1, 0);
                            var r1 = 10 + m1 * 3;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(s1[0], 195, r1, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('A: ' + m1 + ' kg', s1[0], 195 - r1 - 15, viz.colors.blue, 12);

                            // Object B
                            var s2 = viz.toScreen(pos2, 0);
                            var r2 = 10 + m2 * 3;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(s2[0], 195, r2, 0, Math.PI * 2);
                            ctx.fill();
                            viz.screenText('B: ' + m2 + ' kg', s2[0], 195 - r2 - 15, viz.colors.orange, 12);

                            // force arrows during collision
                            if (showForces) {
                                // Force on A (pointing left)
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(s1[0], 195);
                                ctx.lineTo(s1[0] - 50, 195);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(s1[0] - 55, 195);
                                ctx.lineTo(s1[0] - 48, 190);
                                ctx.lineTo(s1[0] - 48, 200);
                                ctx.closePath();
                                ctx.fill();

                                // Force on B (pointing right)
                                ctx.strokeStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(s2[0], 195);
                                ctx.lineTo(s2[0] + 50, 195);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(s2[0] + 55, 195);
                                ctx.lineTo(s2[0] + 48, 190);
                                ctx.lineTo(s2[0] + 48, 200);
                                ctx.closePath();
                                ctx.fill();

                                viz.screenText('Equal forces on both objects!', 350, 30, viz.colors.red, 15);
                            }

                            if (collided && !showForces) {
                                viz.screenText('After collision: A moves at ' + vel1.toFixed(1) + ' m/s, B moves at ' + vel2.toFixed(1) + ' m/s', 350, 30, viz.colors.green, 14);
                                viz.screenText('Lighter object B changed speed more!', 350, 55, viz.colors.teal, 13);
                            }

                            if (!running && !collided) {
                                viz.screenText('Set masses and click "Collide!"', 350, 30, viz.colors.muted, 14);
                            }

                            // velocity labels
                            viz.screenText('v = ' + vel1.toFixed(1) + ' m/s', s1[0], 230, viz.colors.blue, 11);
                            viz.screenText('v = ' + vel2.toFixed(1) + ' m/s', s2[0], 230, viz.colors.orange, 11);
                        }

                        viz.animate(function() {
                            if (running) {
                                pos1 += vel1 * 0.016;
                                pos2 += vel2 * 0.016;

                                // check for collision
                                var dist = pos2 - pos1;
                                var minDist = (10 + m1 * 3 + 10 + m2 * 3) / 30;
                                if (!collided && dist < minDist) {
                                    // elastic collision
                                    var newV1 = ((m1 - m2) * origVel1 + 2 * m2 * origVel2) / (m1 + m2);
                                    var newV2 = ((m2 - m1) * origVel2 + 2 * m1 * origVel1) / (m1 + m2);
                                    vel1 = newV1;
                                    vel2 = newV2;
                                    collided = true;
                                    showForces = true;
                                    contactTime = 0;
                                }

                                if (showForces) {
                                    contactTime += 0.016;
                                    if (contactTime > 0.8) {
                                        showForces = false;
                                    }
                                }

                                if (pos1 < -12 || pos2 > 12) {
                                    running = false;
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
                    question: 'A 2000 kg truck hits a 500 kg car. During the collision, the truck exerts 10,000 N of force on the car. How much force does the car exert on the truck?',
                    hint: 'Newton\'s Third Law says forces come in equal pairs.',
                    solution: 'The car exerts exactly 10,000 N of force on the truck. Newton\'s Third Law says the forces are always equal and opposite, regardless of the sizes of the objects. The car pushes back on the truck with the same 10,000 N.'
                }
            ]
        },
        {
            id: 'rocket-propulsion',
            title: 'Rocket Propulsion',
            content: `
                <h2>Rocket Propulsion</h2>
                <p>Rockets are the ultimate example of Newton's Third Law. They work by throwing mass (hot exhaust gas) backward at very high speed. The gas pushes the rocket forward.</p>

                <div class="env-block definition">
                    <div class="env-title">How Rockets Work</div>
                    <div class="env-body">
                        <p>Inside a rocket engine, fuel burns and creates hot, expanding gas. This gas shoots out the bottom of the rocket at tremendous speed.</p>
                        <ul>
                            <li><strong>Action:</strong> The rocket pushes exhaust gas downward</li>
                            <li><strong>Reaction:</strong> The exhaust gas pushes the rocket upward</li>
                        </ul>
                        <p>The force pushing the rocket up is called <strong>thrust</strong>.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-rocket-launch"></div>

                <div class="env-block intuition">
                    <div class="env-title">Balloon Rocket</div>
                    <div class="env-body"><p>Blow up a balloon and let it go. The air rushes out one end (action), pushing the balloon the opposite way (reaction). The balloon is a tiny rocket! The faster the air comes out, the faster the balloon zooms around.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Space Rockets</div>
                    <div class="env-body"><p>A common question is: "What does a rocket push against in space?" The answer: it pushes against its own exhaust! The rocket does not need air or ground to push against. It carries its own reaction mass (fuel). This is why rockets work perfectly in the vacuum of space.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Thrust Equation</div>
                    <div class="env-body"><p>Rocket thrust depends on how fast the exhaust leaves and how much mass is ejected per second. A bigger, faster exhaust stream means more thrust. Engineers design rocket nozzles to maximize exhaust speed.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-rocket-launch',
                    title: 'Rocket Launch Simulator',
                    description: 'Adjust thrust and watch the rocket lift off. The exhaust goes down, the rocket goes up - Newton\'s Third Law!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 30, originX: 350, originY: 380});
                        var thrust = 15000;
                        var rocketMass = 500;
                        var gravity = 10;
                        var rocketY = 0;
                        var rocketVel = 0;
                        var launching = false;
                        var particles = [];
                        var time = 0;

                        VizEngine.createSlider(controls, 'Thrust (kN)', 3, 30, 15, 1, function(val) {
                            thrust = val * 1000;
                        });

                        VizEngine.createButton(controls, 'Launch!', function() {
                            rocketY = 0;
                            rocketVel = 0;
                            launching = true;
                            particles = [];
                            time = 0;
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            rocketY = 0;
                            rocketVel = 0;
                            launching = false;
                            particles = [];
                            time = 0;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // ground
                            ctx.fillStyle = '#2a3a2a';
                            ctx.fillRect(0, 360, 700, 40);

                            // launch pad
                            ctx.fillStyle = '#555';
                            ctx.fillRect(310, 345, 80, 18);

                            // rocket body
                            var ry = 300 - rocketY * 15;
                            if (ry < 20) ry = 20;
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.moveTo(350, ry - 50);
                            ctx.lineTo(335, ry);
                            ctx.lineTo(335, ry + 40);
                            ctx.lineTo(365, ry + 40);
                            ctx.lineTo(365, ry);
                            ctx.closePath();
                            ctx.fill();

                            // nose cone
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.moveTo(350, ry - 50);
                            ctx.lineTo(340, ry - 20);
                            ctx.lineTo(360, ry - 20);
                            ctx.closePath();
                            ctx.fill();

                            // fins
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(335, ry + 30);
                            ctx.lineTo(320, ry + 45);
                            ctx.lineTo(335, ry + 40);
                            ctx.closePath();
                            ctx.fill();
                            ctx.beginPath();
                            ctx.moveTo(365, ry + 30);
                            ctx.lineTo(380, ry + 45);
                            ctx.lineTo(365, ry + 40);
                            ctx.closePath();
                            ctx.fill();

                            // exhaust particles
                            if (launching) {
                                for (var i = 0; i < particles.length; i++) {
                                    var p = particles[i];
                                    var alpha = Math.max(0, 1 - p.age * 2);
                                    ctx.fillStyle = 'rgba(' + (p.hot ? '255,150,50' : '255,200,100') + ',' + alpha + ')';
                                    ctx.beginPath();
                                    ctx.arc(p.x, p.y, p.r * (1 + p.age), 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            // force arrows
                            if (launching && ry < 350) {
                                // thrust arrow (up)
                                var thrustArrowLen = Math.min(60, thrust / 300);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(390, ry);
                                ctx.lineTo(390, ry - thrustArrowLen);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.moveTo(390, ry - thrustArrowLen - 8);
                                ctx.lineTo(385, ry - thrustArrowLen);
                                ctx.lineTo(395, ry - thrustArrowLen);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('Thrust', 420, ry - thrustArrowLen / 2, viz.colors.green, 11, 'left');

                                // gravity arrow (down)
                                var gravForce = rocketMass * gravity;
                                var gravArrowLen = Math.min(40, gravForce / 200);
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(310, ry);
                                ctx.lineTo(310, ry + gravArrowLen);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(310, ry + gravArrowLen + 8);
                                ctx.lineTo(305, ry + gravArrowLen);
                                ctx.lineTo(315, ry + gravArrowLen);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('Weight', 280, ry + gravArrowLen / 2, viz.colors.red, 11, 'right');
                            }

                            // info display
                            var netForce = thrust - rocketMass * gravity;
                            var accel = netForce / rocketMass;
                            viz.screenText('Thrust: ' + (thrust / 1000).toFixed(0) + ' kN    Weight: ' + (rocketMass * gravity / 1000).toFixed(1) + ' kN', 350, 15, viz.colors.text, 12);
                            viz.screenText('Net Force: ' + (netForce / 1000).toFixed(1) + ' kN ' + (netForce > 0 ? '(UP)' : '(DOWN)'), 350, 35, netForce > 0 ? viz.colors.green : viz.colors.red, 13);
                            viz.screenText('Altitude: ' + rocketY.toFixed(1) + ' m    Speed: ' + rocketVel.toFixed(1) + ' m/s', 350, 55, viz.colors.teal, 12);

                            if (!launching) {
                                viz.screenText('Adjust thrust and click "Launch!"', 350, 75, viz.colors.muted, 13);
                            }
                        }

                        viz.animate(function() {
                            if (launching) {
                                time += 0.016;
                                var netForce = thrust - rocketMass * gravity;
                                var accel = netForce / rocketMass;
                                rocketVel += accel * 0.016;
                                rocketY += rocketVel * 0.016;

                                if (rocketY < 0) {
                                    rocketY = 0;
                                    rocketVel = 0;
                                }

                                // exhaust particles
                                var ry = 300 - rocketY * 15;
                                if (ry < 20) ry = 20;
                                for (var i = 0; i < 3; i++) {
                                    particles.push({
                                        x: 350 + (Math.random() - 0.5) * 15,
                                        y: ry + 42,
                                        vx: (Math.random() - 0.5) * 60,
                                        vy: Math.random() * 100 + 50,
                                        r: Math.random() * 4 + 2,
                                        age: 0,
                                        hot: Math.random() > 0.4
                                    });
                                }

                                // update particles
                                for (var i = particles.length - 1; i >= 0; i--) {
                                    var p = particles[i];
                                    p.x += p.vx * 0.016;
                                    p.y += p.vy * 0.016;
                                    p.age += 0.016;
                                    if (p.age > 0.6) {
                                        particles.splice(i, 1);
                                    }
                                }

                                if (rocketY > 30) {
                                    launching = false;
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
                    question: 'A rocket has a mass of 1000 kg and its engine produces 15,000 N of thrust. If gravity pulls on it with 10,000 N, what is its acceleration?',
                    hint: 'First find the net force (thrust minus weight), then use \\(a = F_{net}/m\\).',
                    solution: 'Net force = 15,000 - 10,000 = 5,000 N upward. \\(a = 5000/1000 = 5\\) m/s\\(^2\\) upward. The rocket accelerates upward at 5 m/s\\(^2\\).'
                },
                {
                    question: 'If a rocket engine produces 8,000 N of thrust but the rocket weighs 10,000 N, what happens?',
                    hint: 'Compare the thrust to the weight. Which is bigger?',
                    solution: 'The rocket does NOT lift off. The thrust (8,000 N) is less than the weight (10,000 N), so the net force is 2,000 N downward. The rocket stays on the ground. To launch, thrust must be greater than weight!'
                },
                {
                    question: 'Explain why a rocket can work in the vacuum of space where there is nothing to push against.',
                    hint: 'What does the rocket actually push against?',
                    solution: 'The rocket pushes against its own exhaust gas. The rocket does not need air or ground to push against. By Newton\'s Third Law, when the rocket pushes the exhaust backward, the exhaust pushes the rocket forward. The rocket carries its own reaction mass (fuel).'
                }
            ]
        }
    ]
});
