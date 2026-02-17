window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch21',
    number: 21,
    title: 'Motion in Space',
    subtitle: 'The Dance of Planets',
    sections: [
        {
            id: 'orbits',
            title: 'Orbits: Falling Around the Earth',
            content: `
                <h2>What Is an Orbit?</h2>

                <p>Here is a mind-bending idea: astronauts on the International Space Station are actually <strong>falling</strong> — all the time! They are falling toward the Earth, but they are also moving sideways so fast that the Earth curves away beneath them. They keep falling and missing the ground forever. That is what an orbit is!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Imagine you are on top of a very tall mountain and you throw a ball horizontally. If you throw it gently, it curves down and hits the ground nearby. Throw it harder, and it goes farther before hitting the ground. Now imagine throwing it SO fast that the ground curves away just as fast as the ball falls. The ball goes all the way around the Earth and comes back to you! That is an orbit.</p>
                        <p>Isaac Newton thought of this exact idea — it is called "Newton's Cannonball."</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="orbit-sim"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition</div>
                    <div class="env-body">
                        <p>An <strong>orbit</strong> is the path of an object around another object, held in place by gravity. The orbiting object is in constant <strong>free fall</strong> — gravity is the centripetal force that bends its path into a curve.</p>
                    </div>
                </div>

                <p>For a circular orbit around the Earth, the orbital speed is:</p>

                \\[v = \\sqrt{\\frac{GM}{r}}\\]

                <p>where \\(G\\) is the gravitational constant, \\(M\\) is Earth's mass, and \\(r\\) is the distance from Earth's center. Near the surface, this works out to about <strong>7.9 km/s</strong> (28,400 km/h)! That is incredibly fast.</p>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Astronauts feel "weightless" in orbit, but gravity is still pulling them! They feel weightless because everything around them — the spacecraft, their tools, their food — is falling at the same rate. It is like being in a falling elevator, except you never hit the ground.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'orbit-sim',
                    title: 'Orbit Simulator',
                    description: 'Launch a satellite and see if it orbits, crashes, or escapes! Adjust the speed to find the right orbit.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 1.6, originX: 350, originY: 200});
                        var earthR = 40;
                        var orbitR = 80;
                        var launchSpeed = 1.0;
                        var running = false;
                        var trail = [];

                        // Simplified orbital physics (unitless for demonstration)
                        var px, py, vx, vy;
                        var GM = 5000;

                        function reset() {
                            px = 0;
                            py = orbitR;
                            vx = launchSpeed * 8;
                            vy = 0;
                            trail = [];
                            running = false;
                        }

                        reset();

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Stars
                            ctx.fillStyle = '#ffffff';
                            var starSeed = [23, 67, 123, 45, 89, 156, 234, 12, 78, 190, 340, 290, 410, 530, 620, 150, 450, 310, 560, 680];
                            for (var s = 0; s < starSeed.length; s++) {
                                var sx = (starSeed[s] * 3.7) % viz.width;
                                var sy = (starSeed[s] * 2.3) % viz.height;
                                ctx.fillRect(sx, sy, 1.5, 1.5);
                            }

                            // Earth
                            var ec = viz.toScreen(0, 0);
                            ctx.fillStyle = '#2255aa';
                            ctx.beginPath();
                            ctx.arc(ec[0], ec[1], earthR, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = '#44aa44';
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(ec[0], ec[1], earthR, -0.5, 0.8);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.arc(ec[0], ec[1], earthR, 1.5, 2.5);
                            ctx.stroke();

                            viz.screenText('Earth', ec[0], ec[1], viz.colors.white, 12);

                            // Ideal circular orbit (dashed)
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.arc(ec[0], ec[1], orbitR * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Trail
                            if (trail.length > 1) {
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                for (var i = 0; i < trail.length; i++) {
                                    var tp = viz.toScreen(trail[i][0], trail[i][1]);
                                    if (i === 0) ctx.moveTo(tp[0], tp[1]);
                                    else ctx.lineTo(tp[0], tp[1]);
                                }
                                ctx.stroke();
                            }

                            // Satellite
                            var sp = viz.toScreen(px, py);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(sp[0], sp[1], 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Velocity vector
                            if (running) {
                                var vScale = 3;
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(sp[0], sp[1]);
                                ctx.lineTo(sp[0] + vx * vScale, sp[1] - vy * vScale);
                                ctx.stroke();
                            }

                            viz.screenText('Orbit Simulator', viz.width / 2, 20, viz.colors.white, 16);
                            viz.screenText('Launch speed: ' + launchSpeed.toFixed(1) + 'x', viz.width / 2, viz.height - 15, viz.colors.text, 12);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Launch Speed', 0.3, 2.5, launchSpeed, 0.05, function(v) {
                            launchSpeed = v;
                            reset();
                            draw();
                        });

                        VizEngine.createButton(controls, 'Launch!', function() {
                            reset();
                            running = true;
                            vx = launchSpeed * 8;
                            viz.stopAnimation();
                            viz.animate(function() {
                                if (!running) return;

                                // Physics: gravitational acceleration
                                var dist = Math.sqrt(px * px + py * py);
                                if (dist < earthR / viz.scale) {
                                    // Crashed into Earth
                                    running = false;
                                    viz.screenText('CRASH!', viz.width / 2, viz.height / 2, viz.colors.red, 24);
                                    return;
                                }

                                // Off screen check
                                var sp = viz.toScreen(px, py);
                                if (sp[0] < -100 || sp[0] > viz.width + 100 || sp[1] < -100 || sp[1] > viz.height + 100) {
                                    running = false;
                                    return;
                                }

                                var ax = -GM * px / (dist * dist * dist);
                                var ay = -GM * py / (dist * dist * dist);

                                vx += ax * 0.05;
                                vy += ay * 0.05;
                                px += vx * 0.05;
                                py += vy * 0.05;

                                trail.push([px, py]);
                                if (trail.length > 2000) trail.shift();

                                draw();
                            });
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            viz.stopAnimation();
                            reset();
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why do astronauts on the International Space Station float? Is it because there is no gravity up there?',
                    hint: 'The ISS is only about 400 km above the surface. How much weaker is gravity there compared to the surface?',
                    solution: 'Astronauts float NOT because there is no gravity (gravity at the ISS altitude is about 90% as strong as on the surface!). They float because they are in free fall — the ISS and everything inside it is constantly falling toward Earth but moving sideways fast enough to keep missing it. Everything falls at the same rate, so relative to the spacecraft, they appear to float.'
                },
                {
                    question: 'If a satellite orbits too slowly, what happens? If it orbits too fast, what happens?',
                    hint: 'Think about the balance between gravity pulling inward and the satellite\'s tendency to fly straight.',
                    solution: 'If a satellite orbits too slowly, gravity wins and pulls it closer to Earth — it spirals inward and eventually crashes. If it orbits too fast, its tendency to fly straight wins — it spirals outward and escapes into space. At just the right speed, these balance perfectly for a stable circular orbit.'
                }
            ]
        },
        {
            id: 'kepler-laws',
            title: 'Kepler\'s Laws',
            content: `
                <h2>The Rules That Planets Follow</h2>

                <p>About 400 years ago, a German astronomer named <strong>Johannes Kepler</strong> discovered three beautiful rules about how planets move. He figured these out by carefully studying the observations of another astronomer, Tycho Brahe. Later, Isaac Newton showed why these rules work — they all come from gravity!</p>

                <h3>Kepler's First Law: Ellipses</h3>
                <p>Planets do not move in perfect circles — they move in <strong>ellipses</strong> (stretched circles). The Sun sits at one focus of the ellipse, not at the center.</p>

                <h3>Kepler's Second Law: Equal Areas</h3>
                <p>A line connecting a planet to the Sun sweeps out equal areas in equal times. This means planets move <strong>faster</strong> when they are closer to the Sun and <strong>slower</strong> when they are farther away.</p>

                <h3>Kepler's Third Law: The Harmony</h3>
                <p>The square of a planet's orbital period is proportional to the cube of its average distance from the Sun:</p>

                \\[T^2 \\propto r^3\\]

                <p>This means farther planets take much longer to orbit. Mars (1.5x farther) takes about 1.88 years, while Jupiter (5.2x farther) takes about 11.86 years!</p>

                <div class="viz-placeholder" data-viz="planet-orbits"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Kepler called his third law the "Law of Harmony" because he saw the solar system as a kind of cosmic music, with each planet playing its own note based on its distance from the Sun. The planets closer in move quickly (high notes), while those far away move slowly (low notes).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>Earth is 1 AU from the Sun and takes 1 year to orbit. Mars is about 1.52 AU away. How long is a Martian year?</p>
                        <p>Using Kepler's third law: \\(T^2 = r^3 = 1.52^3 = 3.51\\)</p>
                        <p>So \\(T = \\sqrt{3.51} \\approx 1.87\\) years, or about 687 Earth days!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'planet-orbits',
                    title: 'Planet Orbit Comparison',
                    description: 'Watch the inner planets orbit the Sun. Notice how closer planets orbit much faster!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 1, originX: 350, originY: 200});
                        var time = 0;
                        var speedMult = 1.0;

                        // Planet data: name, orbital radius (pixels), period (relative to Earth=1), color
                        var planets = [
                            {name: 'Mercury', r: 40, period: 0.24, color: '#aaa'},
                            {name: 'Venus', r: 65, period: 0.62, color: '#f0c040'},
                            {name: 'Earth', r: 95, period: 1.0, color: '#4488ff'},
                            {name: 'Mars', r: 130, period: 1.88, color: '#dd5533'}
                        ];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Stars
                            ctx.fillStyle = '#ffffff';
                            var starPositions = [
                                [30, 40], [100, 80], [200, 30], [400, 60], [550, 40], [650, 90],
                                [50, 350], [180, 370], [350, 380], [500, 350], [630, 360],
                                [80, 180], [620, 200], [670, 300], [20, 280]
                            ];
                            for (var s = 0; s < starPositions.length; s++) {
                                ctx.fillRect(starPositions[s][0], starPositions[s][1], 1.5, 1.5);
                            }

                            // Sun
                            var sunX = 350;
                            var sunY = 200;
                            ctx.fillStyle = '#ffcc00';
                            ctx.beginPath();
                            ctx.arc(sunX, sunY, 12, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = '#ff8800';
                            ctx.beginPath();
                            ctx.arc(sunX, sunY, 8, 0, Math.PI * 2);
                            ctx.fill();

                            // Draw orbits and planets
                            for (var p = 0; p < planets.length; p++) {
                                var pl = planets[p];

                                // Orbit path
                                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(sunX, sunY, pl.r, 0, Math.PI * 2);
                                ctx.stroke();

                                // Planet position
                                var angularSpeed = (2 * Math.PI) / (pl.period * 60);
                                var angle = angularSpeed * time;
                                var px = sunX + pl.r * Math.cos(angle);
                                var py = sunY - pl.r * Math.sin(angle);

                                // Planet
                                ctx.fillStyle = pl.color;
                                ctx.beginPath();
                                ctx.arc(px, py, p === 2 ? 6 : 4, 0, Math.PI * 2);
                                ctx.fill();

                                // Label
                                viz.screenText(pl.name, px, py - 12, pl.color, 10);

                                // Swept area for Earth (Kepler's 2nd law illustration)
                                if (p === 2) {
                                    ctx.fillStyle = 'rgba(68,136,255,0.1)';
                                    ctx.beginPath();
                                    ctx.moveTo(sunX, sunY);
                                    var arcStart = angle - 0.3;
                                    var arcEnd = angle;
                                    ctx.arc(sunX, sunY, pl.r, -arcEnd, -arcStart);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }

                            viz.screenText('Inner Solar System', viz.width / 2, 20, viz.colors.white, 16);
                            viz.screenText('Closer planets orbit faster (Kepler\'s 3rd Law)', viz.width / 2, viz.height - 15, viz.colors.teal, 12);
                        }

                        viz.animate(function() {
                            time += 0.016 * speedMult;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Time Speed', 0.2, 5, speedMult, 0.1, function(v) {
                            speedMult = v;
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Jupiter is about 5.2 times farther from the Sun than Earth. Using Kepler\'s third law, estimate how many Earth years it takes Jupiter to orbit the Sun.',
                    hint: 'T squared equals r cubed. Calculate 5.2 cubed, then take the square root.',
                    solution: 'Using T squared = r cubed: T squared = 5.2 cubed = 140.6. So T = square root of 140.6 = about 11.9 years. (The actual value is 11.86 years — amazingly close!)'
                }
            ]
        },
        {
            id: 'gravity-slingshot',
            title: 'Gravity Slingshot',
            content: `
                <h2>Stealing Speed from Planets</h2>

                <p>Space is BIG. Really, really big. Even with powerful rockets, it takes a very long time to reach distant planets. But clever scientists found a trick: you can use a planet's gravity to <strong>speed up</strong> a spacecraft without using any fuel!</p>

                <p>This trick is called a <strong>gravity assist</strong> (or gravity slingshot). Here is how it works:</p>

                <ol>
                    <li>A spacecraft approaches a planet from behind (in the planet's orbital direction)</li>
                    <li>The planet's gravity pulls the spacecraft closer, speeding it up</li>
                    <li>As the spacecraft swings around the planet, it gets flung forward at a higher speed</li>
                    <li>The spacecraft "steals" a tiny bit of the planet's orbital energy (the planet slows down by an immeasurably tiny amount)</li>
                </ol>

                <div class="viz-placeholder" data-viz="gravity-assist-viz"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>The Voyager 2 spacecraft, launched in 1977, used gravity assists from Jupiter, Saturn, Uranus, and Neptune to visit all four outer planets! Without these speed boosts, the mission would have taken many more decades and required much more fuel.</p>
                        <p>Voyager 2 is now traveling at about 15.4 km/s and has left the solar system entirely!</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Think of it like a tennis ball bouncing off a moving train. If you throw a ball at a train that is coming toward you, the ball bounces back much faster than you threw it. The ball "steals" energy from the massive, moving train. A gravity assist works the same way — the spacecraft "bounces" off the planet's gravitational field and gains speed from the planet's orbital motion.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>You can also use gravity assists to <strong>slow down</strong>! By approaching a planet from the front (against its orbital direction), the spacecraft loses speed. This is useful when you want to enter orbit around a distant planet.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'gravity-assist-viz',
                    title: 'Gravity Assist Trajectory',
                    description: 'Watch a spacecraft use a planet\'s gravity to change direction and speed up!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 1, originX: 0, originY: 0});
                        var time = 0;
                        var running = false;

                        // Planet moves slowly across the screen
                        var planetSpeed = 0.8;
                        var planetY = 200;
                        var planetStartX = 250;
                        var planetR = 25;
                        var GM = 800;

                        // Spacecraft
                        var scX, scY, scVx, scVy;
                        var scTrail = [];
                        var approach = 0;

                        function resetSC() {
                            scX = 50;
                            scY = 100;
                            scVx = 2.0 + approach * 0.5;
                            scVy = 1.2;
                            scTrail = [];
                            time = 0;
                            running = false;
                        }

                        resetSC();

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Stars
                            ctx.fillStyle = '#ffffff';
                            var seeds = [23, 67, 89, 145, 200, 310, 420, 505, 589, 650, 30, 120, 260, 380, 490, 570, 610, 340, 160, 450];
                            for (var s = 0; s < seeds.length; s++) {
                                ctx.fillRect((seeds[s] * 3.1) % 700, (seeds[s] * 1.7) % 400, 1.5, 1.5);
                            }

                            // Planet
                            var planetX = planetStartX + planetSpeed * time;
                            ctx.fillStyle = '#cc8844';
                            ctx.beginPath();
                            ctx.arc(planetX, planetY, planetR, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = '#aa6622';
                            ctx.lineWidth = 2;
                            ctx.stroke();
                            viz.screenText('Planet', planetX, planetY - planetR - 10, '#cc8844', 11);

                            // Planet velocity arrow
                            ctx.strokeStyle = '#cc8844';
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(planetX + planetR + 5, planetY);
                            ctx.lineTo(planetX + planetR + 25, planetY);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(planetX + planetR + 25, planetY);
                            ctx.lineTo(planetX + planetR + 20, planetY - 4);
                            ctx.moveTo(planetX + planetR + 25, planetY);
                            ctx.lineTo(planetX + planetR + 20, planetY + 4);
                            ctx.stroke();

                            // Spacecraft trail
                            if (scTrail.length > 1) {
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i < scTrail.length; i++) {
                                    if (i === 0) ctx.moveTo(scTrail[i][0], scTrail[i][1]);
                                    else ctx.lineTo(scTrail[i][0], scTrail[i][1]);
                                }
                                ctx.stroke();
                            }

                            // Spacecraft
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(scX, scY, 4, 0, Math.PI * 2);
                            ctx.fill();

                            // Speed indicator
                            var scSpeed = Math.sqrt(scVx * scVx + scVy * scVy);
                            viz.screenText('Spacecraft speed: ' + scSpeed.toFixed(1), viz.width / 2, viz.height - 15, viz.colors.teal, 12);

                            // Velocity arrow on spacecraft
                            var vArrowScale = 8;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(scX, scY);
                            ctx.lineTo(scX + scVx * vArrowScale, scY + scVy * vArrowScale);
                            ctx.stroke();

                            viz.screenText('Gravity Assist (Slingshot)', viz.width / 2, 20, viz.colors.white, 16);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Approach Angle', 0, 4, approach, 0.1, function(v) {
                            approach = v;
                            resetSC();
                            draw();
                        });

                        VizEngine.createButton(controls, 'Launch Spacecraft', function() {
                            resetSC();
                            running = true;
                            viz.stopAnimation();
                            viz.animate(function() {
                                if (!running) { draw(); return; }

                                time += 0.5;

                                // Planet position
                                var planetX = planetStartX + planetSpeed * time;

                                // Gravity from planet to spacecraft
                                var dx = planetX - scX;
                                var dy = planetY - scY;
                                var dist = Math.sqrt(dx * dx + dy * dy);

                                if (dist < planetR) {
                                    running = false;
                                    viz.screenText('Crashed into planet!', viz.width / 2, viz.height / 2, viz.colors.red, 20);
                                    return;
                                }

                                if (dist < 300) {
                                    var force = GM / (dist * dist);
                                    scVx += force * (dx / dist) * 0.5;
                                    scVy += force * (dy / dist) * 0.5;
                                }

                                scX += scVx * 0.5;
                                scY += scVy * 0.5;

                                scTrail.push([scX, scY]);
                                if (scTrail.length > 1000) scTrail.shift();

                                // Off screen
                                if (scX > 750 || scX < -50 || scY > 450 || scY < -50) {
                                    running = false;
                                }

                                draw();
                            });
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            viz.stopAnimation();
                            resetSC();
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'In a gravity assist, the spacecraft speeds up. But energy is conserved! Where does the extra energy come from?',
                    hint: 'Think about the planet moving in its orbit. What happens to it?',
                    solution: 'The extra energy comes from the planet\'s orbital motion. The spacecraft "steals" a tiny amount of the planet\'s kinetic energy, causing the planet to slow down by an incredibly tiny amount. Since planets are so massive compared to spacecraft, this slowdown is completely immeasurable — but it is enough to give the small spacecraft a big speed boost!'
                }
            ]
        },
        {
            id: 'solar-system',
            title: 'Exploring the Solar System',
            content: `
                <h2>Our Cosmic Neighborhood</h2>

                <p>Everything we have learned in this course — forces, motion, gravity, circular motion — comes together beautifully in the solar system. The planets dance around the Sun, following Kepler's laws, held in place by gravity, each tracing out its own elliptical orbit.</p>

                <h3>The Inner Planets</h3>
                <p>Mercury, Venus, Earth, and Mars are small, rocky planets close to the Sun. They orbit quickly and have solid surfaces you could (theoretically) stand on.</p>

                <h3>The Outer Planets</h3>
                <p>Jupiter, Saturn, Uranus, and Neptune are gas giants (or ice giants). They are much farther from the Sun, orbit slowly, and are enormous — Jupiter alone could fit 1,300 Earths inside it!</p>

                <h3>And Beyond</h3>
                <p>Past Neptune lies the Kuiper Belt (where Pluto lives), and beyond that, the Oort Cloud — a vast sphere of icy objects that extends almost halfway to the nearest star.</p>

                <div class="viz-placeholder" data-viz="solar-system-tour"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>If the Sun were the size of a basketball, Earth would be a tiny peppercorn about 26 meters away. Jupiter would be a walnut about 135 meters away. Neptune would be a small marble about 780 meters away. And the nearest star? Another basketball about 7,000 kilometers away! Space is incredibly vast.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>Everything in this course — from a ball rolling on the ground to planets orbiting the Sun — follows the same fundamental laws of physics. Newton's laws of motion and his law of gravity explain it all. The same force that makes an apple fall from a tree keeps the Moon in orbit and holds galaxies together. That is the incredible power and beauty of physics!</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Looking Ahead</div>
                    <div class="env-body">
                        <p>Congratulations on completing this journey through forces and motion! You now understand the fundamental ideas that took humanity thousands of years to discover. From here, you can explore deeper into energy, waves, electricity, magnetism, and even the strange world of quantum physics. The adventure never ends!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'solar-system-tour',
                    title: 'Solar System Tour',
                    description: 'Explore our solar system! Watch the planets orbit the Sun at their relative speeds.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 1, originX: 0, originY: 0});
                        var time = 0;
                        var speedMult = 1.0;
                        var showLabels = true;
                        var centerX = 350;
                        var centerY = 200;

                        // Planet data: name, orbit radius (px), period (relative), size (px), color
                        var allPlanets = [
                            {name: 'Mercury', r: 35,  period: 0.24,  size: 3, color: '#bbbbbb'},
                            {name: 'Venus',   r: 55,  period: 0.62,  size: 4, color: '#ffcc44'},
                            {name: 'Earth',   r: 80,  period: 1.00,  size: 4, color: '#4488ff'},
                            {name: 'Mars',    r: 105, period: 1.88,  size: 3.5, color: '#dd5533'},
                            {name: 'Jupiter', r: 145, period: 11.86, size: 9, color: '#ddaa66'},
                            {name: 'Saturn',  r: 175, period: 29.5,  size: 7, color: '#ccbb77'}
                        ];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Stars background
                            ctx.fillStyle = '#ffffff';
                            for (var s = 0; s < 30; s++) {
                                var sx = ((s * 97 + 13) * 7) % 700;
                                var sy = ((s * 53 + 29) * 11) % 400;
                                ctx.fillRect(sx, sy, 1, 1);
                            }

                            // Sun glow
                            var gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 30);
                            gradient.addColorStop(0, '#ffcc00');
                            gradient.addColorStop(0.5, 'rgba(255,204,0,0.3)');
                            gradient.addColorStop(1, 'rgba(255,204,0,0)');
                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
                            ctx.fill();

                            // Sun
                            ctx.fillStyle = '#ffcc00';
                            ctx.beginPath();
                            ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
                            ctx.fill();

                            // Draw each planet
                            for (var p = 0; p < allPlanets.length; p++) {
                                var pl = allPlanets[p];

                                // Orbit path
                                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(centerX, centerY, pl.r, 0, Math.PI * 2);
                                ctx.stroke();

                                // Planet position
                                var angularSpeed = (2 * Math.PI) / (pl.period * 120);
                                var angle = angularSpeed * time;
                                var px = centerX + pl.r * Math.cos(angle);
                                var py = centerY - pl.r * Math.sin(angle);

                                // Planet
                                ctx.fillStyle = pl.color;
                                ctx.beginPath();
                                ctx.arc(px, py, pl.size, 0, Math.PI * 2);
                                ctx.fill();

                                // Saturn's ring
                                if (pl.name === 'Saturn') {
                                    ctx.strokeStyle = '#ccbb77';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.ellipse(px, py, pl.size + 5, 2, 0.3, 0, Math.PI * 2);
                                    ctx.stroke();
                                }

                                // Label
                                if (showLabels) {
                                    viz.screenText(pl.name, px, py - pl.size - 8, pl.color, 9);
                                }
                            }

                            viz.screenText('The Solar System', viz.width / 2, 20, viz.colors.white, 16);
                            viz.screenText('Not to scale — real distances are much larger!', viz.width / 2, viz.height - 15, viz.colors.text, 10);
                        }

                        viz.animate(function() {
                            time += 0.016 * speedMult;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Time Speed', 0.2, 10, speedMult, 0.1, function(v) {
                            speedMult = v;
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'If a new planet were discovered at 4 AU from the Sun (4 times Earth\'s distance), how long would its year be? Use Kepler\'s third law.',
                    hint: 'T squared = r cubed. With r = 4, compute 4 cubed and then take the square root.',
                    solution: 'Using T squared = r cubed: T squared = 4 cubed = 64. So T = square root of 64 = 8 years. A planet 4 times farther from the Sun than Earth would take 8 Earth years to complete one orbit.'
                },
                {
                    question: 'Name three different things that provide the centripetal force for circular motion in space. Give an example for each.',
                    hint: 'Think about what holds a satellite in orbit, what keeps a ball on a string, and what keeps a car on a curved road.',
                    solution: '1) Gravity — keeps the Moon orbiting Earth, planets orbiting the Sun, and satellites orbiting Earth. 2) Tension — a ball on a string being swung in a circle. 3) Friction — a car turning on a curved road. In space, gravity is almost always the centripetal force for orbital motion.'
                }
            ]
        }
    ]
});
