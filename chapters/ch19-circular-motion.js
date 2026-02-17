window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch19',
    number: 19,
    title: 'Circular Motion',
    subtitle: 'Going Round and Round',
    sections: [
        {
            id: 'what-is-circular',
            title: 'What Is Circular Motion?',
            content: `
                <h2>Moving in Circles</h2>

                <p>Not everything moves in straight lines! Think about a merry-go-round spinning, a car going around a bend, or the Moon orbiting the Earth. These are all examples of <strong>circular motion</strong> — movement along a circular path.</p>

                <p>Here is something surprising: even if an object moves around a circle at a constant speed, it is still <strong>accelerating</strong>! How can that be? Remember, acceleration is a change in velocity, and velocity has both speed AND direction. When you go around a circle, your direction is constantly changing, even if your speed stays the same.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition</div>
                    <div class="env-body">
                        <p><strong>Uniform circular motion</strong> is movement along a circular path at a constant speed. Even though the speed is constant, the velocity changes because the direction changes.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="circular-motion-basic"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Tie a ball to a string and swing it in a circle over your head. You can feel the string pulling on your hand. That pull is the force needed to keep the ball going in a circle. Without the string, the ball would fly off in a straight line — just like Newton's first law says!</p>
                    </div>
                </div>

                <p>At every point on the circle, the object wants to keep going straight (because of inertia). But the force keeps pulling it toward the center, bending its path into a curve. This creates the circular motion we see.</p>
            `,
            visualizations: [
                {
                    id: 'circular-motion-basic',
                    title: 'Circular Motion',
                    description: 'Watch a ball move in a circle. Notice how the velocity direction keeps changing!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 40, originX: 350, originY: 200});
                        var radius = 3;
                        var angularSpeed = 1.5;
                        var theta = 0;
                        var showVelocity = true;
                        var showAccel = true;
                        var trail = [];

                        function draw() {
                            viz.clear();

                            // Draw circular path
                            viz.drawCircle(0, 0, radius, null, viz.colors.grid, 1.5);

                            // Center point
                            viz.drawPoint(0, 0, viz.colors.muted || '#555', 'center', 4);

                            // Ball position
                            var bx = radius * Math.cos(theta);
                            var by = radius * Math.sin(theta);

                            // Trail
                            trail.push([bx, by]);
                            if (trail.length > 60) trail.shift();
                            var ctx = viz.ctx;
                            for (var i = 0; i < trail.length; i++) {
                                var alpha = (i / trail.length) * 0.5;
                                var ts = viz.toScreen(trail[i][0], trail[i][1]);
                                ctx.fillStyle = 'rgba(88,166,255,' + alpha + ')';
                                ctx.beginPath();
                                ctx.arc(ts[0], ts[1], 3, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Velocity vector (tangent to circle)
                            if (showVelocity) {
                                var vScale = 0.6;
                                var vx = -angularSpeed * radius * Math.sin(theta) * vScale;
                                var vy = angularSpeed * radius * Math.cos(theta) * vScale;
                                viz.drawVector(bx, by, bx + vx, by + vy, viz.colors.teal, 'v', 2);
                            }

                            // Acceleration vector (toward center)
                            if (showAccel) {
                                var aScale = 0.2;
                                var ax = -angularSpeed * angularSpeed * radius * Math.cos(theta) * aScale;
                                var ay = -angularSpeed * angularSpeed * radius * Math.sin(theta) * aScale;
                                viz.drawVector(bx, by, bx + ax, by + ay, viz.colors.orange, 'a', 2);
                            }

                            // Ball
                            viz.drawPoint(bx, by, viz.colors.blue, '', 8);

                            // Radius line
                            viz.drawSegment(0, 0, bx, by, viz.colors.muted || '#555', 1, true);

                            viz.screenText('Circular Motion', viz.width / 2, 20, viz.colors.white, 16);
                            viz.screenText('Green = velocity (tangent)   Orange = acceleration (toward center)', viz.width / 2, viz.height - 15, viz.colors.text, 11);
                        }

                        viz.animate(function() {
                            theta += angularSpeed * 0.016;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Speed', 0.5, 4, angularSpeed, 0.1, function(v) {
                            angularSpeed = v;
                        });
                        VizEngine.createSlider(controls, 'Radius', 1, 4, radius, 0.5, function(v) {
                            radius = v;
                            trail = [];
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A car goes around a circular track at a constant speed of 60 km/h. Is the car accelerating? Explain.',
                    hint: 'Think about what acceleration really means — does only speed matter?',
                    solution: 'Yes, the car is accelerating! Even though its speed is constant, its direction is always changing as it goes around the track. Since velocity includes direction, and the direction is changing, the velocity is changing, which means the car is accelerating.'
                }
            ]
        },
        {
            id: 'centripetal-force',
            title: 'Centripetal Force',
            content: `
                <h2>The Force That Keeps Things Spinning</h2>

                <p>For an object to move in a circle, there must be a force pulling it toward the center. This force is called the <strong>centripetal force</strong> (from Latin: "center-seeking").</p>

                <div class="env-block definition">
                    <div class="env-title">Definition</div>
                    <div class="env-body">
                        <p>The <strong>centripetal force</strong> is the net force that acts on an object moving in a circle, always pointing toward the center of the circle. Its size is:</p>
                        <p>\\[F_c = \\frac{m v^2}{r}\\]</p>
                        <p>where \\(m\\) is the mass, \\(v\\) is the speed, and \\(r\\) is the radius of the circle.</p>
                    </div>
                </div>

                <p>Different things can provide the centripetal force:</p>
                <ul>
                    <li><strong>String tension</strong> — when you swing a ball on a string</li>
                    <li><strong>Gravity</strong> — keeps the Moon orbiting Earth</li>
                    <li><strong>Friction</strong> — keeps a car on a curved road</li>
                    <li><strong>Normal force</strong> — keeps you on a roller coaster loop</li>
                </ul>

                <div class="viz-placeholder" data-viz="spinning-ball"></div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>You might have heard of "centrifugal force" — the force that seems to push you outward when a car turns. But this is not a real force! It is just your body wanting to keep going straight (inertia) while the car turns underneath you. Physicists call it a "fictitious force."</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A 0.5 kg ball is spun on a string in a circle of radius 1 m at 3 m/s. What is the centripetal force?</p>
                        <p>\\(F_c = \\frac{mv^2}{r} = \\frac{0.5 \\times 3^2}{1} = \\frac{0.5 \\times 9}{1} = 4.5\\) N</p>
                        <p>The string must pull with 4.5 Newtons of force to keep the ball going in a circle!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'spinning-ball',
                    title: 'Ball on a String',
                    description: 'See the centripetal force in action. What happens when the string breaks?',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 50, originX: 350, originY: 200});
                        var radius = 2.5;
                        var speed = 2;
                        var theta = 0;
                        var stringBroken = false;
                        var breakAngle = 0;
                        var breakX = 0;
                        var breakY = 0;
                        var breakVx = 0;
                        var breakVy = 0;
                        var breakTime = 0;
                        var flyTrail = [];

                        function draw() {
                            viz.clear();

                            var bx, by;

                            if (!stringBroken) {
                                // Normal circular motion
                                viz.drawCircle(0, 0, radius, null, viz.colors.grid, 1);
                                viz.drawPoint(0, 0, viz.colors.muted || '#555', '', 4);

                                bx = radius * Math.cos(theta);
                                by = radius * Math.sin(theta);

                                // String
                                viz.drawSegment(0, 0, bx, by, viz.colors.white, 2);

                                // Force arrow (toward center)
                                var fScale = 0.4;
                                viz.drawVector(bx, by, bx - bx * fScale, by - by * fScale, viz.colors.red, 'F', 2);

                                // Velocity arrow (tangent)
                                var vScale = 0.5;
                                var vx = -speed * radius * Math.sin(theta) * vScale;
                                var vy = speed * radius * Math.cos(theta) * vScale;
                                viz.drawVector(bx, by, bx + vx, by + vy, viz.colors.teal, 'v', 2);
                            } else {
                                // Broken string — ball flies off tangent
                                breakTime += 0.016;
                                bx = breakX + breakVx * breakTime;
                                by = breakY + breakVy * breakTime;

                                flyTrail.push([bx, by]);

                                // Draw old circle faintly
                                viz.drawCircle(0, 0, radius, null, viz.colors.grid, 0.5);

                                // Draw trail
                                var ctx = viz.ctx;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo.apply(ctx, viz.toScreen(breakX, breakY));
                                for (var i = 0; i < flyTrail.length; i++) {
                                    var fp = viz.toScreen(flyTrail[i][0], flyTrail[i][1]);
                                    ctx.lineTo(fp[0], fp[1]);
                                }
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Broken string segment
                                viz.drawSegment(0, 0, radius * Math.cos(breakAngle) * 0.5, radius * Math.sin(breakAngle) * 0.5, viz.colors.red, 1, true);

                                viz.screenText('String broken! Ball flies in a straight line!', viz.width / 2, viz.height - 15, viz.colors.orange, 13);
                            }

                            // Ball
                            viz.drawPoint(bx, by, viz.colors.blue, '', 8);

                            viz.screenText('Ball on a String', viz.width / 2, 20, viz.colors.white, 16);
                            if (!stringBroken) {
                                viz.screenText('Red = centripetal force (toward center)', viz.width / 2, viz.height - 15, viz.colors.text, 11);
                            }
                        }

                        viz.animate(function() {
                            if (!stringBroken) {
                                theta += speed * 0.016;
                            }
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Speed', 0.5, 4, speed, 0.1, function(v) {
                            speed = v;
                        });

                        VizEngine.createButton(controls, 'Cut the String!', function() {
                            if (!stringBroken) {
                                stringBroken = true;
                                breakAngle = theta;
                                breakX = radius * Math.cos(theta);
                                breakY = radius * Math.sin(theta);
                                breakVx = -speed * radius * Math.sin(theta);
                                breakVy = speed * radius * Math.cos(theta);
                                breakTime = 0;
                                flyTrail = [];
                            }
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            stringBroken = false;
                            breakTime = 0;
                            flyTrail = [];
                            theta = 0;
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'When you swing a ball on a string in a circle and then let go, which direction does the ball fly? Toward the center, away from the center, or tangent to the circle?',
                    hint: 'Think about Newton\'s first law. What happens when the force disappears?',
                    solution: 'The ball flies off tangent to the circle — in a straight line in whatever direction it was moving at the instant you let go. Without the centripetal force from the string, there is nothing to bend its path anymore, so it continues in a straight line (Newton\'s first law).'
                },
                {
                    question: 'If you double the speed of a ball going in a circle (same radius), what happens to the centripetal force needed?',
                    hint: 'Look at the formula. How does v appear in it?',
                    solution: 'The centripetal force quadruples (becomes 4 times bigger)! Since F = mv squared / r, doubling v means v squared becomes 4 times larger. This is why taking a curve too fast is dangerous — the friction force needed increases very rapidly with speed.'
                }
            ]
        },
        {
            id: 'speed-around-circle',
            title: 'Speed Around a Circle',
            content: `
                <h2>How Fast Around the Circle?</h2>

                <p>When something moves in a circle, we can describe its speed in two ways:</p>

                <ul>
                    <li><strong>Linear speed</strong> (\\(v\\)): how fast the object moves along the circle, in meters per second</li>
                    <li><strong>Angular speed</strong> (\\(\\omega\\)): how fast the angle changes, in radians per second</li>
                </ul>

                <p>They are related by a simple formula:</p>

                \\[v = \\omega \\cdot r\\]

                <p>This means that if two horses on a merry-go-round spin at the same angular speed, the one on the outer edge has a higher linear speed because it has to cover a bigger circle in the same time!</p>

                <div class="viz-placeholder" data-viz="merry-go-round"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Think about a clock. The tip of the minute hand moves faster than a point near the center, even though they complete one full circle in the same 60 minutes. The tip has a larger radius, so it has a higher linear speed!</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition</div>
                    <div class="env-body">
                        <p>The <strong>period</strong> (\\(T\\)) is the time for one complete revolution. The <strong>frequency</strong> (\\(f\\)) is the number of revolutions per second. They are related by \\(T = 1/f\\) and the angular speed is \\(\\omega = 2\\pi / T = 2\\pi f\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A merry-go-round completes one revolution every 8 seconds. A child sits 2 meters from the center.</p>
                        <p>Period: \\(T = 8\\) s</p>
                        <p>Angular speed: \\(\\omega = 2\\pi / 8 \\approx 0.785\\) rad/s</p>
                        <p>Linear speed: \\(v = 0.785 \\times 2 \\approx 1.57\\) m/s</p>
                        <p>A child sitting at 4 meters from the center would have linear speed \\(v = 0.785 \\times 4 \\approx 3.14\\) m/s — twice as fast!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'merry-go-round',
                    title: 'Merry-Go-Round',
                    description: 'Riders at different distances have different linear speeds but the same angular speed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 45, originX: 350, originY: 210});
                        var angSpeed = 1.0;
                        var theta = 0;
                        var innerR = 1.2;
                        var outerR = 3.0;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Merry-go-round platform
                            viz.drawCircle(0, 0, outerR + 0.3, 'rgba(100,80,60,0.3)', viz.colors.muted || '#555', 2);
                            viz.drawCircle(0, 0, 0.2, viz.colors.text, null, 0);

                            // Spokes
                            for (var s = 0; s < 6; s++) {
                                var sAngle = theta + s * Math.PI / 3;
                                viz.drawSegment(0, 0, (outerR + 0.2) * Math.cos(sAngle), (outerR + 0.2) * Math.sin(sAngle), viz.colors.grid, 1);
                            }

                            // Inner rider
                            var ix = innerR * Math.cos(theta);
                            var iy = innerR * Math.sin(theta);
                            viz.drawPoint(ix, iy, viz.colors.teal, '', 8);

                            // Outer rider
                            var ox = outerR * Math.cos(theta);
                            var oy = outerR * Math.sin(theta);
                            viz.drawPoint(ox, oy, viz.colors.orange, '', 8);

                            // Velocity vectors
                            var vScaleInner = angSpeed * innerR * 0.3;
                            var vScaleOuter = angSpeed * outerR * 0.3;
                            viz.drawVector(ix, iy, ix + (-Math.sin(theta)) * vScaleInner, iy + Math.cos(theta) * vScaleInner, viz.colors.teal, '', 2);
                            viz.drawVector(ox, oy, ox + (-Math.sin(theta)) * vScaleOuter, oy + Math.cos(theta) * vScaleOuter, viz.colors.orange, '', 2);

                            // Info
                            var vInner = (angSpeed * innerR).toFixed(2);
                            var vOuter = (angSpeed * outerR).toFixed(2);
                            viz.screenText('Merry-Go-Round', viz.width / 2, 20, viz.colors.white, 16);
                            viz.screenText('Inner rider (teal): v = ' + vInner + ' m/s   r = ' + innerR.toFixed(1) + ' m', viz.width / 2, viz.height - 35, viz.colors.teal, 12);
                            viz.screenText('Outer rider (orange): v = ' + vOuter + ' m/s   r = ' + outerR.toFixed(1) + ' m', viz.width / 2, viz.height - 15, viz.colors.orange, 12);
                        }

                        viz.animate(function() {
                            theta += angSpeed * 0.016;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Spin Speed', 0.3, 3.0, angSpeed, 0.1, function(v) {
                            angSpeed = v;
                        });
                        VizEngine.createSlider(controls, 'Inner Radius', 0.5, 2.5, innerR, 0.1, function(v) {
                            innerR = v;
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'The Earth takes about 365 days to orbit the Sun at a distance of about 150 million km. Estimate the orbital speed of the Earth in km/s.',
                    hint: 'The circumference of the orbit is 2 times pi times r. Divide by the total time in seconds.',
                    solution: 'Circumference = 2 times pi times 150,000,000 km = about 942,000,000 km. Time = 365 times 24 times 3600 = about 31,536,000 seconds. Speed = 942,000,000 / 31,536,000 = about 29.9 km/s. The Earth is racing through space at nearly 30 km per second!'
                }
            ]
        },
        {
            id: 'circular-examples',
            title: 'Examples Everywhere',
            content: `
                <h2>Circular Motion in Our World</h2>

                <p>Circular motion is everywhere once you start looking for it! Let us explore some exciting examples.</p>

                <h3>Roller Coasters and Loops</h3>
                <p>At the top of a roller coaster loop, gravity provides the centripetal force. The coaster must be going fast enough that the needed centripetal force does not exceed gravity, or you would fall! That is why loops in roller coasters are not perfect circles — they are wider at the bottom and tighter at the top (a shape called a <strong>clothoid loop</strong>).</p>

                <h3>Cars on Curved Roads</h3>
                <p>When a car takes a turn, friction between the tires and road provides the centripetal force. If the road is icy (less friction), you need to slow down — otherwise the car cannot turn and slides off the road!</p>

                <h3>Planets Around the Sun</h3>
                <p>Gravity is the centripetal force for orbiting planets. The farther a planet is from the Sun, the slower it orbits. Mercury zooms around quickly, while Neptune takes its time.</p>

                <div class="viz-placeholder" data-viz="string-break-demo"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Have you ever been on a fast spinning ride at an amusement park? When the ride spins, you feel pushed against the outer wall. But it is not a real "push" — it is just your body trying to go in a straight line while the wall curves inward. The wall pushes you inward (centripetal force), and you feel it as being pressed against the wall.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Banked roads (tilted curves) use a combination of gravity and the normal force to help provide centripetal force. This lets cars take turns even on icy days! Race tracks are always banked on the turns.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'string-break-demo',
                    title: 'What Happens When the Force Disappears?',
                    description: 'Click different positions on the circle to see which way the ball flies off.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 40, originX: 350, originY: 200});
                        var radius = 3;
                        var speed = 2;
                        var theta = 0;
                        var released = false;
                        var releaseAngle = 0;
                        var releaseX = 0;
                        var releaseY = 0;
                        var releaseVx = 0;
                        var releaseVy = 0;
                        var releaseTime = 0;
                        var flyPath = [];

                        function draw() {
                            viz.clear();

                            // Circle path
                            viz.drawCircle(0, 0, radius, null, viz.colors.grid, 1);
                            viz.drawPoint(0, 0, viz.colors.muted || '#555', '', 3);

                            var bx, by;

                            if (!released) {
                                bx = radius * Math.cos(theta);
                                by = radius * Math.sin(theta);

                                // String
                                viz.drawSegment(0, 0, bx, by, viz.colors.white, 1.5);

                                // Velocity direction
                                var vScale = 0.6;
                                var vx = -speed * radius * Math.sin(theta) * vScale;
                                var vy = speed * radius * Math.cos(theta) * vScale;
                                viz.drawVector(bx, by, bx + vx, by + vy, viz.colors.teal, 'v', 2);
                            } else {
                                releaseTime += 0.016;
                                bx = releaseX + releaseVx * releaseTime;
                                by = releaseY + releaseVy * releaseTime;
                                flyPath.push([bx, by]);

                                // Draw fly path
                                var ctx = viz.ctx;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo.apply(ctx, viz.toScreen(releaseX, releaseY));
                                for (var i = 0; i < flyPath.length; i++) {
                                    var fp = viz.toScreen(flyPath[i][0], flyPath[i][1]);
                                    ctx.lineTo(fp[0], fp[1]);
                                }
                                ctx.stroke();

                                // Release point marker
                                viz.drawPoint(releaseX, releaseY, viz.colors.yellow, 'released here', 5);
                            }

                            viz.drawPoint(bx, by, viz.colors.blue, '', 8);

                            viz.screenText('Click "Release!" at different positions', viz.width / 2, 20, viz.colors.white, 14);
                            if (released) {
                                viz.screenText('The ball flies off tangent — in a straight line!', viz.width / 2, viz.height - 15, viz.colors.orange, 12);
                            }
                        }

                        viz.animate(function() {
                            if (!released) {
                                theta += speed * 0.016;
                            }
                            draw();
                        });

                        VizEngine.createButton(controls, 'Release!', function() {
                            if (!released) {
                                released = true;
                                releaseAngle = theta;
                                releaseX = radius * Math.cos(theta);
                                releaseY = radius * Math.sin(theta);
                                releaseVx = -speed * radius * Math.sin(theta);
                                releaseVy = speed * radius * Math.cos(theta);
                                releaseTime = 0;
                                flyPath = [];
                            }
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            released = false;
                            releaseTime = 0;
                            flyPath = [];
                            theta = 0;
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why do roads sometimes have raised (banked) edges on curves?',
                    hint: 'Think about what force helps a car turn on a flat road, and what could add more force.',
                    solution: 'Banked edges tilt the car so that a part of the normal force (the support force from the road) points toward the center of the curve. This adds to the centripetal force provided by friction, allowing cars to safely take the turn at higher speeds or even on slippery surfaces.'
                },
                {
                    question: 'If Earth suddenly stopped pulling the Moon with gravity, what would the Moon do?',
                    hint: 'This is just like cutting the string on a ball spinning in a circle.',
                    solution: 'The Moon would fly off in a straight line tangent to its orbit, at whatever speed it was traveling at that instant (about 1 km/s). Without gravity as the centripetal force, there is nothing to bend its path, so it would continue straight into space.'
                }
            ]
        }
    ]
});
