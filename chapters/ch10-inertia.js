window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch10',
    number: 10,
    title: 'Inertia',
    subtitle: 'Objects That Hate Change',
    sections: [
        {
            id: 'what-is-inertia',
            title: 'What Is Inertia?',
            content: `
                <h2>What Is Inertia?</h2>
                <p>Have you ever been riding in a car that suddenly stops? Your body keeps moving forward even though the car has stopped. That "keep going" feeling is called <strong>inertia</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition</div>
                    <div class="env-body"><p><strong>Inertia</strong> is the tendency of an object to resist changes in its motion. An object at rest wants to stay at rest, and an object in motion wants to keep moving in the same direction at the same speed.</p></div>
                </div>

                <p>Think about a ball sitting on the floor. It will just sit there forever unless something pushes it. That is inertia at work - the ball "wants" to stay still.</p>

                <p>Now think about a hockey puck sliding on ice. It keeps sliding for a long time because there is very little friction to slow it down. The puck "wants" to keep moving. That is also inertia!</p>

                <div class="env-block example">
                    <div class="env-title">Everyday Example</div>
                    <div class="env-body"><p>When you shake a ketchup bottle, the ketchup stays still (inertia!) until you force it out. That is why you have to shake so hard!</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-car-stop"></div>

                <p>The more <strong>mass</strong> an object has, the more inertia it has. A bowling ball is much harder to push than a tennis ball because it has more mass and therefore more inertia.</p>
            `,
            visualizations: [
                {
                    id: 'viz-car-stop',
                    title: 'Sudden Stop Demo',
                    description: 'Watch what happens to the passenger when the car suddenly stops. Click "Go" to start, then "Brake!" to stop suddenly.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 300, scale: 30, originX: 50, originY: 250});
                        var carX = 0;
                        var passengerOffsetX = 0;
                        var carSpeed = 0;
                        var braking = false;
                        var running = false;
                        var settled = false;

                        var goBtn = VizEngine.createButton(controls, 'Go!', function() {
                            carX = 0;
                            passengerOffsetX = 0;
                            carSpeed = 3;
                            braking = false;
                            running = true;
                            settled = false;
                        });
                        var brakeBtn = VizEngine.createButton(controls, 'Brake!', function() {
                            if (running) braking = true;
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            carX = 0;
                            passengerOffsetX = 0;
                            carSpeed = 0;
                            braking = false;
                            running = false;
                            settled = false;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // ground
                            ctx.fillStyle = '#2a2a3a';
                            ctx.fillRect(0, 220, 700, 80);
                            // road dashes
                            ctx.strokeStyle = '#555';
                            ctx.lineWidth = 2;
                            ctx.setLineDash([20, 15]);
                            ctx.beginPath();
                            ctx.moveTo(0, 215);
                            ctx.lineTo(700, 215);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // car body
                            var cx = 100 + carX * 30;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.roundRect(cx, 150, 140, 55, 8);
                            ctx.fill();
                            // car top
                            ctx.fillStyle = '#4488cc';
                            ctx.beginPath();
                            ctx.roundRect(cx + 25, 115, 80, 40, 6);
                            ctx.fill();
                            // wheels
                            ctx.fillStyle = '#333';
                            ctx.beginPath();
                            ctx.arc(cx + 30, 210, 14, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.beginPath();
                            ctx.arc(cx + 110, 210, 14, 0, Math.PI * 2);
                            ctx.fill();

                            // passenger (stick figure head)
                            var px = cx + 65 + passengerOffsetX * 30;
                            var py = 128;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(px, py, 10, 0, Math.PI * 2);
                            ctx.fill();
                            // body line
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(px, 138);
                            ctx.lineTo(px, 155);
                            ctx.stroke();

                            // label
                            viz.screenText('Car', cx + 70, 178, viz.colors.white, 13);

                            if (braking && !settled) {
                                viz.screenText('INERTIA! The passenger keeps moving forward!', 350, 40, viz.colors.orange, 15);

                                // force arrow showing inertia direction
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(px + 12, py);
                                ctx.lineTo(px + 40, py);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.moveTo(px + 40, py);
                                ctx.lineTo(px + 34, py - 5);
                                ctx.lineTo(px + 34, py + 5);
                                ctx.closePath();
                                ctx.fill();
                            }

                            if (!running && carSpeed === 0 && carX === 0) {
                                viz.screenText('Press "Go!" to start the car', 350, 40, viz.colors.muted, 14);
                            }
                        }

                        viz.animate(function() {
                            if (running) {
                                if (!braking) {
                                    carX += carSpeed * 0.016;
                                } else {
                                    carSpeed = Math.max(0, carSpeed - 8 * 0.016);
                                    carX += carSpeed * 0.016;
                                    if (passengerOffsetX < 1.5) {
                                        passengerOffsetX += 4 * 0.016;
                                    } else {
                                        passengerOffsetX = Math.max(0, passengerOffsetX - 1.5 * 0.016);
                                        if (carSpeed === 0 && passengerOffsetX < 0.05) {
                                            settled = true;
                                            passengerOffsetX = 0;
                                        }
                                    }
                                }
                                if (carX > 14) {
                                    carX = 0;
                                    passengerOffsetX = 0;
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
                    question: 'In your own words, what is inertia?',
                    hint: 'Think about what objects "want" to do when left alone.',
                    solution: 'Inertia is the tendency of an object to resist changes in its motion. An object at rest stays at rest, and a moving object keeps moving at the same speed and direction, unless a force acts on it.'
                },
                {
                    question: 'Why do you lurch forward when a bus suddenly stops?',
                    hint: 'Your body was moving along with the bus. What happens when the bus stops but your body has not received that force yet?',
                    solution: 'Your body has inertia - it was moving forward with the bus. When the bus stops suddenly, your body keeps moving forward because no force has yet acted on you to stop you. That is why seatbelts are so important!'
                }
            ]
        },
        {
            id: 'newtons-first-law',
            title: "Newton's First Law",
            content: `
                <h2>Newton's First Law of Motion</h2>
                <p>Around 1687, a brilliant scientist named <strong>Isaac Newton</strong> wrote down three laws about how things move. The first law is all about inertia.</p>

                <div class="env-block definition">
                    <div class="env-title">Newton's First Law</div>
                    <div class="env-body"><p>An object at rest stays at rest, and an object in motion stays in motion at the same speed and in the same direction, <strong>unless acted on by an unbalanced force</strong>.</p></div>
                </div>

                <p>This is sometimes called the <strong>Law of Inertia</strong>. It tells us two things:</p>
                <ol>
                    <li><strong>If nothing pushes or pulls an object</strong>, it will not change what it is doing.</li>
                    <li><strong>If forces are balanced</strong> (cancel each other out), the object also will not change.</li>
                </ol>

                <div class="env-block intuition">
                    <div class="env-title">Key Idea</div>
                    <div class="env-body"><p>Forces do not keep things moving. Forces <em>change</em> motion. A spaceship in deep space keeps moving forever with no engine - there is nothing to slow it down!</p></div>
                </div>

                <p>Before Newton, people thought you needed a constant force to keep things moving. But that is only because on Earth, friction and air resistance are always acting to slow things down. In space, with no friction, objects coast forever!</p>

                <div class="env-block example">
                    <div class="env-title">Balanced Forces</div>
                    <div class="env-body"><p>A book sitting on a table has two forces: gravity pulling it down and the table pushing it up. These forces are balanced (equal and opposite), so the book stays still. The net force is zero.</p></div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'A ball is rolling on a perfectly smooth surface with no friction and no air. What happens to the ball?',
                    hint: 'If there are no unbalanced forces, what does Newton\'s First Law say?',
                    solution: 'The ball keeps rolling at the same speed in the same direction forever. With no friction or air resistance, there is no unbalanced force to change its motion.'
                },
                {
                    question: 'You push a toy car across the floor and let go. It slows down and stops. Does this violate Newton\'s First Law? Why or why not?',
                    hint: 'Is there really "no force" acting on the car after you let go?',
                    solution: 'No, it does not violate the law. After you let go, friction from the floor is an unbalanced force acting on the car, slowing it down. If there were no friction, the car would keep going forever.'
                }
            ]
        },
        {
            id: 'tablecloth-trick',
            title: 'The Tablecloth Trick',
            content: `
                <h2>The Tablecloth Trick</h2>
                <p>You might have seen a magician yank a tablecloth out from under a set of dishes without breaking anything. This is not magic - it is <strong>inertia</strong>!</p>

                <div class="env-block intuition">
                    <div class="env-title">How It Works</div>
                    <div class="env-body">
                        <p>The dishes have inertia - they resist changes in motion. When the cloth is pulled very quickly:</p>
                        <ol>
                            <li>The friction between the cloth and dishes acts for only a tiny moment</li>
                            <li>This tiny force is not enough to overcome the dishes' inertia</li>
                            <li>The dishes barely move while the cloth slides away underneath</li>
                        </ol>
                    </div>
                </div>

                <p>The key is <strong>speed</strong>. If you pull slowly, friction has more time to act on the dishes and they slide off the table. Pull fast, and inertia wins!</p>

                <div class="viz-placeholder" data-viz="viz-tablecloth"></div>

                <div class="env-block warning">
                    <div class="env-title">Try It Safely!</div>
                    <div class="env-body"><p>You can try this at home with plastic cups and a smooth cloth. Start with just one cup, and make sure a parent is watching. Do NOT use real dishes!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-tablecloth',
                    title: 'Tablecloth Trick Simulator',
                    description: 'Adjust the pull speed and see if the dishes stay put. Faster pull = more success!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 320, scale: 30, originX: 50, originY: 280});
                        var pullSpeed = 5;
                        var pulling = false;
                        var clothX = 0;
                        var dishX = 0;
                        var dishFallen = false;
                        var done = false;

                        var speedSlider = VizEngine.createSlider(controls, 'Pull Speed', 1, 10, 5, 1, function(val) {
                            pullSpeed = val;
                        });

                        VizEngine.createButton(controls, 'Pull!', function() {
                            clothX = 0;
                            dishX = 0;
                            dishFallen = false;
                            done = false;
                            pulling = true;
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            clothX = 0;
                            dishX = 0;
                            dishFallen = false;
                            done = false;
                            pulling = false;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // table
                            ctx.fillStyle = '#5a3a1a';
                            ctx.fillRect(100, 200, 400, 20);
                            // table legs
                            ctx.fillRect(110, 220, 15, 80);
                            ctx.fillRect(475, 220, 15, 80);

                            // tablecloth
                            if (!done || clothX < 400) {
                                ctx.fillStyle = viz.colors.red;
                                var clLeft = 110 + clothX;
                                var clWidth = Math.max(0, 380 - clothX);
                                if (clWidth > 0) {
                                    ctx.fillRect(clLeft, 192, clWidth, 10);
                                }
                                // hanging part
                                if (clothX > 0) {
                                    ctx.fillRect(490, 192, 10, Math.min(clothX * 2, 60));
                                }
                            }

                            // dish (cup shape)
                            var dx = 280 + dishX;
                            var dy = dishFallen ? 260 : 170;
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.moveTo(dx - 20, dy);
                            ctx.lineTo(dx - 15, dy + 25);
                            ctx.lineTo(dx + 15, dy + 25);
                            ctx.lineTo(dx + 20, dy);
                            ctx.closePath();
                            ctx.fill();

                            // second dish
                            var dx2 = 370 + dishX;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(dx2 - 20, dy);
                            ctx.lineTo(dx2 - 15, dy + 25);
                            ctx.lineTo(dx2 + 15, dy + 25);
                            ctx.lineTo(dx2 + 20, dy);
                            ctx.closePath();
                            ctx.fill();

                            // result text
                            if (done) {
                                if (dishFallen) {
                                    viz.screenText('Too slow! The dishes fell off!', 350, 40, viz.colors.red, 16);
                                } else {
                                    viz.screenText('Success! Inertia kept the dishes in place!', 350, 40, viz.colors.green, 16);
                                }
                            } else if (!pulling) {
                                viz.screenText('Set the pull speed and click "Pull!"', 350, 40, viz.colors.muted, 14);
                            }

                            // speed label
                            viz.screenText('Speed: ' + pullSpeed, 560, 265, viz.colors.text, 12);
                        }

                        viz.animate(function() {
                            if (pulling && !done) {
                                clothX += pullSpeed * 1.2;
                                // friction effect on dishes: lower speed = more dish movement
                                var frictionEffect = (11 - pullSpeed) * 0.3;
                                dishX += frictionEffect * 0.5;

                                if (clothX >= 380) {
                                    pulling = false;
                                    done = true;
                                    if (dishX > 40) {
                                        dishFallen = true;
                                    }
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
                    question: 'Why does pulling the tablecloth slowly make the dishes fall, but pulling quickly keeps them in place?',
                    hint: 'Think about how long friction has to act on the dishes in each case.',
                    solution: 'When you pull slowly, friction acts on the dishes for a longer time, giving them enough push to slide off the table. When you pull quickly, friction only acts for a brief moment, which is not enough to overcome the dishes\' inertia, so they barely move.'
                }
            ]
        },
        {
            id: 'inertia-in-space',
            title: 'Inertia in Space',
            content: `
                <h2>Inertia in Space</h2>
                <p>Space is the perfect place to see inertia in action. There is no air, no friction, and almost no gravity (when far from planets). If you push an object in space, it just keeps going forever!</p>

                <div class="viz-placeholder" data-viz="viz-space-inertia"></div>

                <div class="env-block intuition">
                    <div class="env-title">Why Spacecraft Coast</div>
                    <div class="env-body"><p>When a spacecraft fires its engines, it speeds up. When the engines turn off, the spacecraft does NOT slow down. It keeps moving at the same speed forever (or until it meets a gravitational field or fires its engines again). There is nothing in empty space to create friction!</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Voyager 1</div>
                    <div class="env-body"><p>NASA's Voyager 1 spacecraft was launched in 1977. It has left our solar system and is still moving through space at about 17 km/s. Its engines have been off for decades, but inertia keeps it going!</p></div>
                </div>

                <p>On Earth, we are so used to friction that we think "things naturally stop." But stopping is not natural - it only happens because friction acts as an unbalanced force. In space, <strong>motion is the natural state</strong>.</p>

                <div class="env-block remark">
                    <div class="env-title">Astronaut Danger</div>
                    <div class="env-body"><p>If an astronaut pushes off from the space station and is not tethered, they will float away forever. There is no way to "stop" in empty space without something to push against! That is why astronauts always use safety tethers during spacewalks.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-space-inertia',
                    title: 'Space Inertia Demo',
                    description: 'Push an object in space and watch it glide forever. Use the "Push" button to give the object a push. There is nothing to stop it!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 320, scale: 30, originX: 50, originY: 160});
                        var objX = 2;
                        var objY = 0;
                        var vx = 0;
                        var vy = 0;
                        var pushed = false;
                        var stars = [];
                        var time = 0;

                        // generate random stars
                        for (var i = 0; i < 60; i++) {
                            stars.push({
                                x: Math.random() * 700,
                                y: Math.random() * 320,
                                size: Math.random() * 2 + 0.5,
                                bright: Math.random()
                            });
                        }

                        VizEngine.createButton(controls, 'Push Right', function() {
                            vx += 2;
                            pushed = true;
                        });
                        VizEngine.createButton(controls, 'Push Up', function() {
                            vy += 1.5;
                            pushed = true;
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            objX = 2;
                            objY = 0;
                            vx = 0;
                            vy = 0;
                            pushed = false;
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            time += 0.02;

                            // stars
                            for (var i = 0; i < stars.length; i++) {
                                var s = stars[i];
                                var brightness = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time * 2 + s.bright * 10));
                                ctx.fillStyle = 'rgba(240,246,252,' + brightness + ')';
                                ctx.beginPath();
                                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // object (small spacecraft)
                            var pos = viz.toScreen(objX, objY);
                            var sx = pos[0];
                            var sy = pos[1];

                            // spacecraft body
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.arc(sx, sy, 12, 0, Math.PI * 2);
                            ctx.fill();
                            // window
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(sx + 3, sy - 2, 4, 0, Math.PI * 2);
                            ctx.fill();

                            // velocity arrow
                            if (vx !== 0 || vy !== 0) {
                                var speed = Math.sqrt(vx * vx + vy * vy);
                                var arrowLen = Math.min(speed * 0.8, 4);
                                viz.drawVector(objX, objY, objX + vx * arrowLen / speed * 2, objY + vy * arrowLen / speed * 2, viz.colors.orange, '', 2);
                            }

                            // speed display
                            var speed = Math.sqrt(vx * vx + vy * vy);
                            viz.screenText('Speed: ' + speed.toFixed(1) + ' units/s', 120, 20, viz.colors.white, 13);

                            if (!pushed) {
                                viz.screenText('Click "Push Right" or "Push Up" to launch the object', 350, 300, viz.colors.muted, 13);
                            } else {
                                viz.screenText('No friction in space - the object never slows down!', 350, 300, viz.colors.green, 13);
                            }
                        }

                        viz.animate(function() {
                            objX += vx * 0.016;
                            objY += vy * 0.016;
                            // wrap around for display
                            if (objX > 22) { objX = -1; }
                            if (objX < -2) { objX = 21; }
                            if (objY > 6) { objY = -5; }
                            if (objY < -6) { objY = 5; }
                            draw();
                        });

                        draw();
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'If you throw a ball inside the International Space Station, what happens to it? Does it slow down?',
                    hint: 'The space station has air inside, but very little friction from surfaces.',
                    solution: 'The ball keeps moving in a straight line at roughly the same speed. There is air inside the station, so air resistance would slow it very gradually, but there is no gravity pulling it down to the floor. It would float across the station in a straight line until it hits a wall.'
                }
            ]
        }
    ]
});
