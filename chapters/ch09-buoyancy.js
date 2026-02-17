window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch09',
    number: 9,
    title: 'Buoyancy',
    subtitle: 'Why Ships Can Float',
    sections: [
        {
            id: 'sinking-and-floating',
            title: 'Sinking & Floating',
            content: `
                <h2>Sinking and Floating</h2>
                <p>Drop a rock into a pond &mdash; it sinks straight to the bottom. Toss in a piece of wood &mdash; it bobs on the surface. Why do some things float and others sink?</p>

                <p>When you put an object in water, two forces battle each other:</p>
                <ol>
                    <li><strong>Gravity</strong> pulls the object DOWN (its weight)</li>
                    <li><strong>Buoyancy</strong> pushes the object UP</li>
                </ol>

                <div class="env-block definition">
                    <div class="env-title">Buoyancy</div>
                    <div class="env-body"><p>Buoyancy (also called the buoyant force) is the upward force that a fluid (like water or air) exerts on an object placed in it. It is what makes things feel lighter in water!</p></div>
                </div>

                <p>The result of this battle determines what happens:</p>
                <ul>
                    <li>If <strong>weight > buoyancy</strong> &rarr; the object <strong>sinks</strong></li>
                    <li>If <strong>weight < buoyancy</strong> &rarr; the object <strong>floats</strong></li>
                    <li>If <strong>weight = buoyancy</strong> &rarr; the object <strong>hovers</strong> (stays in place)</li>
                </ul>

                <div class="viz-placeholder" data-viz="viz-buoyancy-pool"></div>

                <div class="env-block intuition">
                    <div class="env-title">Try This at Home!</div>
                    <div class="env-body"><p>Fill a bowl with water. Try dropping in different objects: a coin, a cork, a grape, an orange (with and without the peel!). Which float and which sink? You might be surprised!</p></div>
                </div>
            `,
            visualizations: [{
                id: 'viz-buoyancy-pool',
                title: 'Buoyancy Pool',
                description: 'Drop different objects into the water and watch them sink or float!',
                setup: function(body, controls) {
                    var viz = new VizEngine(body, {width: 700, height: 380, scale: 1, originX: 0, originY: 0});
                    var waterTop = 120;
                    var waterBottom = 340;

                    var objects = [
                        {name: 'Rock', density: 2.5, color: '#7a7a7a', radius: 18, x: 0, y: 0, vy: 0, active: false},
                        {name: 'Wood', density: 0.6, color: '#c4a35a', radius: 20, x: 0, y: 0, vy: 0, active: false},
                        {name: 'Steel Ball', density: 7.8, color: '#a0a0b0', radius: 14, x: 0, y: 0, vy: 0, active: false},
                        {name: 'Cork', density: 0.24, color: '#e8d5a0', radius: 16, x: 0, y: 0, vy: 0, active: false},
                        {name: 'Ice Cube', density: 0.92, color: '#c0e8ff', radius: 18, x: 0, y: 0, vy: 0, active: false},
                        {name: 'Rubber Duck', density: 0.3, color: '#f0d040', radius: 20, x: 0, y: 0, vy: 0, active: false}
                    ];
                    var waterDensity = 1.0;
                    var nextDropX = 100;
                    var animating = false;

                    objects.forEach(function(obj) {
                        VizEngine.createButton(controls, 'Drop ' + obj.name, function() {
                            obj.active = true;
                            obj.x = nextDropX;
                            obj.y = 40;
                            obj.vy = 0;
                            nextDropX += 100;
                            if (nextDropX > 600) nextDropX = 100;
                            if (!animating) animate();
                        });
                    });

                    VizEngine.createButton(controls, 'Clear All', function() {
                        objects.forEach(function(obj) { obj.active = false; });
                        nextDropX = 100;
                        animating = false;
                        draw();
                    });

                    function animate() {
                        animating = true;
                        var dt = 0.016;
                        var gravity = 300;
                        var drag = 3;
                        var anyMoving = false;

                        objects.forEach(function(obj) {
                            if (!obj.active) return;
                            var submergedFraction = 0;
                            if (obj.y + obj.radius > waterTop) {
                                var subDepth = Math.min(obj.y + obj.radius - waterTop, obj.radius * 2);
                                submergedFraction = subDepth / (obj.radius * 2);
                            }
                            var buoyantAccel = submergedFraction * (waterDensity / obj.density) * gravity;
                            var netAccel = gravity - buoyantAccel;
                            if (submergedFraction > 0) {
                                obj.vy += netAccel * dt;
                                obj.vy *= (1 - drag * dt);
                            } else {
                                obj.vy += gravity * dt;
                            }
                            obj.y += obj.vy * dt;

                            // Floor collision
                            if (obj.y + obj.radius > waterBottom) {
                                obj.y = waterBottom - obj.radius;
                                obj.vy = 0;
                            }
                            // Ceiling
                            if (obj.y - obj.radius < 0) {
                                obj.y = obj.radius;
                                obj.vy = 0;
                            }

                            if (Math.abs(obj.vy) > 0.5) anyMoving = true;
                        });

                        draw();

                        if (anyMoving) {
                            requestAnimationFrame(animate);
                        } else {
                            animating = false;
                        }
                    }

                    function draw() {
                        viz.clear();
                        var ctx = viz.ctx;

                        // Water
                        ctx.fillStyle = '#0a3a6a55';
                        ctx.fillRect(30, waterTop, 640, waterBottom - waterTop);

                        // Water surface waves
                        ctx.strokeStyle = '#4a9aff44';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        for (var wx = 30; wx <= 670; wx += 2) {
                            var wy = waterTop + Math.sin(wx * 0.05 + Date.now() * 0.002) * 2;
                            if (wx === 30) ctx.moveTo(wx, wy);
                            else ctx.lineTo(wx, wy);
                        }
                        ctx.stroke();

                        // Pool walls
                        ctx.strokeStyle = '#4a4a7a';
                        ctx.lineWidth = 3;
                        ctx.strokeRect(30, 50, 640, waterBottom - 50 + 10);

                        // Water label
                        ctx.fillStyle = '#4a9aff88';
                        ctx.font = '14px -apple-system,sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillText('Water (density = 1.0)', 40, waterTop + 25);

                        // Objects
                        objects.forEach(function(obj) {
                            if (!obj.active) return;

                            // Object body
                            ctx.fillStyle = obj.color;
                            ctx.beginPath();
                            ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = obj.color === '#c0e8ff' ? '#80a8d0' : '#ffffff33';
                            ctx.lineWidth = 1;
                            ctx.stroke();

                            // Name
                            ctx.fillStyle = '#000';
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(obj.name, obj.x, obj.y);

                            // Density label
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('d=' + obj.density, obj.x, obj.y + obj.radius + 12);

                            // Force arrows (when settled)
                            if (Math.abs(obj.vy) < 1) {
                                // Weight arrow (down)
                                var wLen = 20;
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(obj.x - 8, obj.y);
                                ctx.lineTo(obj.x - 8, obj.y + wLen);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.purple;
                                ctx.beginPath();
                                ctx.moveTo(obj.x - 8, obj.y + wLen);
                                ctx.lineTo(obj.x - 12, obj.y + wLen - 6);
                                ctx.lineTo(obj.x - 4, obj.y + wLen - 6);
                                ctx.closePath();
                                ctx.fill();

                                // Buoyancy arrow (up)
                                var subFrac = 0;
                                if (obj.y + obj.radius > waterTop) {
                                    var sd = Math.min(obj.y + obj.radius - waterTop, obj.radius * 2);
                                    subFrac = sd / (obj.radius * 2);
                                }
                                if (subFrac > 0) {
                                    var bLen = subFrac * 20 * (waterDensity / obj.density);
                                    bLen = Math.min(bLen, 35);
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(obj.x + 8, obj.y);
                                    ctx.lineTo(obj.x + 8, obj.y - bLen);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.beginPath();
                                    ctx.moveTo(obj.x + 8, obj.y - bLen);
                                    ctx.lineTo(obj.x + 4, obj.y - bLen + 6);
                                    ctx.lineTo(obj.x + 12, obj.y - bLen + 6);
                                    ctx.closePath();
                                    ctx.fill();
                                }
                            }
                        });

                        // Legend
                        ctx.fillStyle = viz.colors.purple;
                        ctx.font = '11px -apple-system,sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillText('Purple arrow = Weight (down)', 40, waterBottom + 25);
                        ctx.fillStyle = viz.colors.teal;
                        ctx.fillText('Teal arrow = Buoyancy (up)', 280, waterBottom + 25);

                        // Title hint
                        ctx.fillStyle = viz.colors.muted;
                        ctx.font = '12px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Objects with density < 1.0 float, density > 1.0 sink', 350, 45);
                    }

                    draw();
                }
            }],
            exercises: [
                {
                    question: 'A plastic toy has a density of 0.8 g/cm3. Will it float or sink in water (density = 1.0 g/cm3)?',
                    hint: 'Compare the density of the toy to the density of water.',
                    solution: 'The toy will FLOAT because its density (0.8) is less than the density of water (1.0). Objects less dense than the fluid they are in will float.'
                },
                {
                    question: 'Why does a steel ship float even though steel is much denser than water?',
                    hint: 'Think about the shape of the ship. Is it solid steel?',
                    solution: 'A steel ship is not a solid block of steel &mdash; it is a hollow shell filled with air. The overall density of the ship (steel + air inside) is less than water, so it floats. The shape spreads the weight over a large volume.'
                }
            ]
        },
        {
            id: 'density-determines',
            title: 'Density Decides',
            content: `
                <h2>What Determines Floating? Density!</h2>
                <p>The secret behind sinking and floating is <strong>density</strong> &mdash; how much stuff is packed into a given space.</p>

                <div class="env-block definition">
                    <div class="env-title">Density</div>
                    <div class="env-body">
                        <p>Density measures how much mass is packed into a volume:</p>
                        <p>\\[ \\text{density} = \\frac{\\text{mass}}{\\text{volume}} \\]</p>
                        <p>Common unit: grams per cubic centimeter (g/cm\\(^3\\)) or kg/m\\(^3\\).</p>
                    </div>
                </div>

                <p>The rule is beautifully simple:</p>
                <ul>
                    <li>If the object's density is <strong>less</strong> than the fluid &rarr; it <strong>floats</strong></li>
                    <li>If the object's density is <strong>more</strong> than the fluid &rarr; it <strong>sinks</strong></li>
                    <li>If the densities are <strong>equal</strong> &rarr; the object <strong>hovers</strong></li>
                </ul>

                <div class="env-block example">
                    <div class="env-title">Density Examples</div>
                    <div class="env-body">
                        <ul>
                            <li>Water: 1.0 g/cm\\(^3\\)</li>
                            <li>Ice: 0.92 g/cm\\(^3\\) (that is why ice floats!)</li>
                            <li>Wood: 0.4 &ndash; 0.8 g/cm\\(^3\\) (most wood floats)</li>
                            <li>Steel: 7.8 g/cm\\(^3\\) (sinks like a rock)</li>
                            <li>Cork: 0.24 g/cm\\(^3\\) (floats high)</li>
                            <li>Cooking oil: 0.92 g/cm\\(^3\\) (floats on water)</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-density-comparator"></div>

                <div class="env-block intuition">
                    <div class="env-title">Why Does Ice Float?</div>
                    <div class="env-body"><p>Ice is one of the rare substances that is LESS dense as a solid than as a liquid. This is super important! If ice sank, lakes would freeze from the bottom up, killing all the fish. Instead, ice floats on top and insulates the water below, keeping aquatic life alive in winter.</p></div>
                </div>
            `,
            visualizations: [{
                id: 'viz-density-comparator',
                title: 'Density Comparator',
                description: 'Adjust the mass and volume of a block to see how density determines sinking or floating.',
                setup: function(body, controls) {
                    var viz = new VizEngine(body, {width: 700, height: 380, scale: 1, originX: 0, originY: 0});
                    var mass = 50;
                    var volume = 80;

                    var massSlider = VizEngine.createSlider(controls, 'Mass (g)', 10, 200, 50, 1, function(val) {
                        mass = val;
                        draw();
                    });

                    var volSlider = VizEngine.createSlider(controls, 'Volume (cm3)', 20, 200, 80, 1, function(val) {
                        volume = val;
                        draw();
                    });

                    function draw() {
                        viz.clear();
                        var ctx = viz.ctx;
                        var density = mass / volume;
                        var waterDensity = 1.0;
                        var floats = density < waterDensity;
                        var hovers = Math.abs(density - waterDensity) < 0.05;

                        // --- Left side: Pool ---
                        var poolLeft = 40;
                        var poolRight = 340;
                        var waterSurface = 140;
                        var poolBottom = 330;

                        // Water
                        ctx.fillStyle = '#0a3a6a55';
                        ctx.fillRect(poolLeft, waterSurface, poolRight - poolLeft, poolBottom - waterSurface);
                        ctx.strokeStyle = '#4a4a7a';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(poolLeft, 80, poolRight - poolLeft, poolBottom - 80);

                        // Block size based on volume
                        var blockSize = Math.sqrt(volume) * 3;
                        var blockX = (poolLeft + poolRight) / 2;
                        var blockY;

                        if (hovers) {
                            blockY = waterSurface + (poolBottom - waterSurface) / 2;
                        } else if (floats) {
                            // Float: partially submerged
                            var submergedFraction = density / waterDensity;
                            blockY = waterSurface + blockSize * submergedFraction - blockSize / 2;
                        } else {
                            // Sink
                            blockY = poolBottom - blockSize / 2 - 10;
                        }

                        // Block
                        var shade = density > 1.5 ? '#5a5a8a' : density > 1 ? '#6a7aaa' : '#8aaaca';
                        ctx.fillStyle = shade;
                        ctx.fillRect(blockX - blockSize / 2, blockY - blockSize / 2, blockSize, blockSize);
                        ctx.strokeStyle = viz.colors.white + '44';
                        ctx.strokeRect(blockX - blockSize / 2, blockY - blockSize / 2, blockSize, blockSize);

                        // Block label
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = '11px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(density.toFixed(2), blockX, blockY);

                        // Water surface line
                        ctx.strokeStyle = '#4a9aff88';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(poolLeft, waterSurface);
                        ctx.lineTo(poolRight, waterSurface);
                        ctx.stroke();

                        // Water density label
                        ctx.fillStyle = '#4a9aff';
                        ctx.font = '11px -apple-system,sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillText('Water: 1.00 g/cm3', poolLeft + 5, waterSurface + 15);

                        // Status
                        var statusColor = hovers ? viz.colors.yellow : floats ? viz.colors.green : viz.colors.red;
                        var statusText = hovers ? 'HOVERS' : floats ? 'FLOATS' : 'SINKS';
                        ctx.fillStyle = statusColor;
                        ctx.font = 'bold 18px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText(statusText, (poolLeft + poolRight) / 2, 100);

                        // --- Right side: Info panel ---
                        var px = 380;
                        ctx.fillStyle = '#1a1a3a';
                        ctx.fillRect(px, 80, 290, 250);
                        ctx.strokeStyle = viz.colors.teal;
                        ctx.lineWidth = 1;
                        ctx.strokeRect(px, 80, 290, 250);

                        ctx.fillStyle = viz.colors.white;
                        ctx.font = 'bold 16px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Density Calculator', px + 145, 110);

                        ctx.font = '14px -apple-system,sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillStyle = viz.colors.orange;
                        ctx.fillText('Mass: ' + mass.toFixed(0) + ' g', px + 20, 145);
                        ctx.fillStyle = viz.colors.blue;
                        ctx.fillText('Volume: ' + volume.toFixed(0) + ' cm3', px + 20, 175);
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = 'bold 14px -apple-system,sans-serif';
                        ctx.fillText('Density = mass / volume', px + 20, 210);
                        ctx.fillStyle = viz.colors.teal;
                        ctx.font = 'bold 20px -apple-system,sans-serif';
                        ctx.fillText('= ' + density.toFixed(2) + ' g/cm3', px + 20, 240);

                        // Comparison
                        ctx.font = '13px -apple-system,sans-serif';
                        ctx.fillStyle = viz.colors.muted;
                        ctx.fillText('Water density: 1.00 g/cm3', px + 20, 275);
                        ctx.fillStyle = statusColor;
                        ctx.font = 'bold 13px -apple-system,sans-serif';
                        if (hovers) {
                            ctx.fillText('Density = Water  -->  Object hovers!', px + 20, 305);
                        } else if (floats) {
                            ctx.fillText('Density < Water  -->  Object floats!', px + 20, 305);
                        } else {
                            ctx.fillText('Density > Water  -->  Object sinks!', px + 20, 305);
                        }
                    }

                    draw();
                }
            }],
            exercises: [
                {
                    question: 'An object has a mass of 120 g and a volume of 150 cm\\(^3\\). What is its density? Will it float in water?',
                    hint: 'Density = mass / volume. Compare to water (1.0 g/cm\\(^3\\)).',
                    solution: 'Density = 120 / 150 = 0.8 g/cm\\(^3\\). Since 0.8 < 1.0, the object will FLOAT in water.'
                },
                {
                    question: 'Why does oil always float on top of water when you mix them?',
                    hint: 'Think about the densities of oil and water.',
                    solution: 'Oil has a lower density (about 0.9 g/cm\\(^3\\)) than water (1.0 g/cm\\(^3\\)). Since oil is less dense, it floats on top. They also do not mix because oil and water molecules do not attract each other.'
                }
            ]
        },
        {
            id: 'archimedes-principle',
            title: "Archimedes' Principle",
            content: `
                <h2>Archimedes' Principle</h2>
                <p>About 2,200 years ago, a Greek scientist named Archimedes made one of the greatest discoveries in physics &mdash; supposedly while taking a bath!</p>

                <div class="env-block definition">
                    <div class="env-title">Archimedes' Principle</div>
                    <div class="env-body">
                        <p>When an object is placed in a fluid, the buoyant force pushing it up equals the weight of the fluid it pushes aside (displaces).</p>
                        <p>\\[ F_{\\text{buoyant}} = \\text{weight of displaced fluid} \\]</p>
                    </div>
                </div>

                <p>Think about it this way: when you get into a bathtub, your body pushes water out of the way. That displaced water would have had a certain weight. Archimedes says the upward buoyant force on you equals exactly that weight!</p>

                <div class="env-block example">
                    <div class="env-title">Eureka!</div>
                    <div class="env-body"><p>Legend says that when Archimedes discovered this while in the bath, he was so excited that he jumped out and ran through the streets shouting "Eureka!" (meaning "I found it!"). He had figured out how to tell if a crown was made of pure gold by measuring the water it displaced.</p></div>
                </div>

                <h3>Why Does This Work?</h3>
                <p>Imagine a block of water sitting inside a lake. The surrounding water pushes on it from all sides. The bottom of the block gets more pressure (it is deeper), so the upward push on the bottom is bigger than the downward push on the top. This net upward push is the buoyant force &mdash; and it exactly supports the weight of that block of water.</p>
                <p>Now replace that water block with a rock. The surrounding water still pushes the same way. So the buoyant force equals the weight of water that would fill that space &mdash; the displaced water!</p>

                <div class="env-block remark">
                    <div class="env-title">Simple Rule</div>
                    <div class="env-body">
                        <p>A floating object displaces exactly its own weight in water. That is why a heavy ship still floats &mdash; it pushes aside a huge amount of water!</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'A block is placed in water and displaces 500 cm\\(^3\\) of water. What is the buoyant force? (Water weighs about 1 g per cm\\(^3\\), and 1000 g weighs about 10 N.)',
                    hint: 'Find the weight of 500 cm\\(^3\\) of water, then convert to Newtons.',
                    solution: '500 cm\\(^3\\) of water has mass 500 g. Weight = 500 / 1000 x 10 = 5 N. The buoyant force is 5 N upward.'
                },
                {
                    question: 'You hold a ball underwater and let go. If the ball weighs 2 N but displaces water weighing 5 N, what happens?',
                    hint: 'Compare the buoyant force (5 N up) to the weight (2 N down).',
                    solution: 'The buoyant force (5 N up) is greater than the weight (2 N down). The net force is 3 N upward, so the ball shoots up to the surface and floats!'
                }
            ]
        },
        {
            id: 'submarine-balloon',
            title: 'Submarines & Hot Air Balloons',
            content: `
                <h2>Submarines and Hot Air Balloons</h2>
                <p>Humans have built amazing machines that use buoyancy to rise and sink on command!</p>

                <h3>Submarines</h3>
                <p>A submarine controls its depth by changing its overall density:</p>
                <ul>
                    <li>To <strong>dive</strong>: the submarine fills tanks with water, making it heavier and denser than the surrounding water &rarr; it sinks</li>
                    <li>To <strong>rise</strong>: it pumps water out and fills the tanks with air, making it lighter &rarr; it floats up</li>
                    <li>To <strong>hover</strong>: it adjusts until its density matches the water exactly</li>
                </ul>

                <h3>Hot Air Balloons</h3>
                <p>A hot air balloon works on the same principle, but in air instead of water!</p>
                <ul>
                    <li>Hot air is <strong>less dense</strong> than cold air</li>
                    <li>The balloon fills with hot air, making its overall density less than the surrounding cold air</li>
                    <li>Buoyancy in the air pushes it UP!</li>
                    <li>To descend, let the air cool (or release hot air) &mdash; density increases</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">The Same Trick</div>
                    <div class="env-body"><p>Submarines and hot air balloons use the exact same principle: control your density relative to the fluid around you. Denser than the fluid = sink. Less dense = rise. It works in water AND air!</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-design-boat"></div>

                <div class="env-block example">
                    <div class="env-title">Buoyancy Everywhere</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Fish</strong> have swim bladders &mdash; gas-filled pouches that they inflate or deflate to change depth, just like a submarine!</li>
                            <li><strong>Life jackets</strong> are filled with foam or air pockets, making your overall density less than water</li>
                            <li><strong>Ships</strong> have huge hollow hulls filled with air, giving them very low average density</li>
                            <li><strong>Helium balloons</strong> rise because helium is much less dense than air</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Loading a Ship</div>
                    <div class="env-body"><p>Every ship has a maximum safe load. If you put too much cargo on a ship, it sinks deeper and deeper in the water. Eventually, water can come over the sides and the ship sinks! Ships have a line painted on the hull called the <strong>Plimsoll line</strong> that shows the maximum safe water level.</p></div>
                </div>
            `,
            visualizations: [{
                id: 'viz-design-boat',
                title: 'Design-a-Boat Challenge',
                description: 'Adjust the hull size and cargo weight. Can you keep the boat floating?',
                setup: function(body, controls) {
                    var viz = new VizEngine(body, {width: 700, height: 380, scale: 1, originX: 0, originY: 0});
                    var hullWidth = 200;
                    var hullDepth = 60;
                    var cargo = 5;
                    var boatDensityFactor = 0.15;

                    var widthSlider = VizEngine.createSlider(controls, 'Hull width', 80, 350, 200, 5, function(val) {
                        hullWidth = val;
                        draw();
                    });

                    var depthSlider = VizEngine.createSlider(controls, 'Hull depth', 30, 120, 60, 2, function(val) {
                        hullDepth = val;
                        draw();
                    });

                    var cargoSlider = VizEngine.createSlider(controls, 'Cargo (tons)', 0, 30, 5, 1, function(val) {
                        cargo = val;
                        draw();
                    });

                    function draw() {
                        viz.clear();
                        var ctx = viz.ctx;

                        var waterLine = 220;
                        var boatCenterX = 260;

                        // Volume in arbitrary units
                        var hullVolume = hullWidth * hullDepth;
                        // Mass: hull structure + cargo
                        var hullMass = hullWidth * 0.3 + hullDepth * 0.2;
                        var totalMass = hullMass + cargo * 10;
                        // Buoyancy capacity: proportional to volume
                        var maxBuoyancy = hullVolume * 0.08;
                        // Submersion fraction
                        var submersion = totalMass / maxBuoyancy;
                        var sinking = submersion > 1.0;
                        var submergedDepth = Math.min(submersion, 1.0) * hullDepth;

                        // Boat vertical position
                        var boatY = waterLine - hullDepth + submergedDepth;
                        if (sinking) {
                            boatY = waterLine + 30;
                        }

                        // Water
                        ctx.fillStyle = '#0a3a6a44';
                        ctx.fillRect(0, waterLine, 700, 160);

                        // Water surface
                        ctx.strokeStyle = '#4a9aff66';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        for (var wx = 0; wx <= 700; wx += 3) {
                            var wy = waterLine + Math.sin(wx * 0.03) * 2;
                            if (wx === 0) ctx.moveTo(wx, wy);
                            else ctx.lineTo(wx, wy);
                        }
                        ctx.stroke();

                        if (!sinking) {
                            // Boat hull
                            ctx.fillStyle = '#5a3a2a';
                            ctx.beginPath();
                            ctx.moveTo(boatCenterX - hullWidth / 2, boatY);
                            ctx.lineTo(boatCenterX - hullWidth / 2 + 15, boatY + hullDepth);
                            ctx.lineTo(boatCenterX + hullWidth / 2 - 15, boatY + hullDepth);
                            ctx.lineTo(boatCenterX + hullWidth / 2, boatY);
                            ctx.closePath();
                            ctx.fill();
                            ctx.strokeStyle = '#8a6a4a';
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Deck
                            ctx.fillStyle = '#7a5a3a';
                            ctx.fillRect(boatCenterX - hullWidth / 2, boatY - 5, hullWidth, 5);

                            // Cargo boxes
                            var numBoxes = Math.min(cargo, 15);
                            var boxW = 18;
                            var boxH = 14;
                            var boxesPerRow = Math.floor((hullWidth - 30) / (boxW + 4));
                            if (boxesPerRow < 1) boxesPerRow = 1;
                            for (var bi = 0; bi < numBoxes; bi++) {
                                var row = Math.floor(bi / boxesPerRow);
                                var col = bi % boxesPerRow;
                                var bx = boatCenterX - (boxesPerRow * (boxW + 4)) / 2 + col * (boxW + 4) + 2;
                                var by = boatY - 5 - (row + 1) * (boxH + 2);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(bx, by, boxW, boxH);
                                ctx.strokeStyle = '#c08040';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(bx, by, boxW, boxH);
                            }

                            // Waterline on boat
                            var actualWL = boatY + hullDepth - submergedDepth;
                            ctx.strokeStyle = viz.colors.red;
                            ctx.setLineDash([4, 4]);
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(boatCenterX - hullWidth / 2 - 20, waterLine);
                            ctx.lineTo(boatCenterX + hullWidth / 2 + 20, waterLine);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Force arrows
                            // Weight
                            var wArrowLen = totalMass * 0.8;
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(boatCenterX, boatY + hullDepth);
                            ctx.lineTo(boatCenterX, boatY + hullDepth + wArrowLen);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath();
                            ctx.moveTo(boatCenterX, boatY + hullDepth + wArrowLen);
                            ctx.lineTo(boatCenterX - 6, boatY + hullDepth + wArrowLen - 8);
                            ctx.lineTo(boatCenterX + 6, boatY + hullDepth + wArrowLen - 8);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Weight', boatCenterX + 10, boatY + hullDepth + wArrowLen / 2);

                            // Buoyancy
                            var bArrowLen = submersion * maxBuoyancy * 0.04;
                            bArrowLen = Math.min(bArrowLen, wArrowLen);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(boatCenterX, boatY + hullDepth);
                            ctx.lineTo(boatCenterX, boatY + hullDepth - bArrowLen);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.moveTo(boatCenterX, boatY + hullDepth - bArrowLen);
                            ctx.lineTo(boatCenterX - 6, boatY + hullDepth - bArrowLen + 8);
                            ctx.lineTo(boatCenterX + 6, boatY + hullDepth - bArrowLen + 8);
                            ctx.closePath();
                            ctx.fill();
                            ctx.textAlign = 'right';
                            ctx.fillText('Buoyancy', boatCenterX - 10, boatY + hullDepth - bArrowLen / 2);
                        } else {
                            // SINKING!
                            ctx.fillStyle = '#5a3a2a88';
                            ctx.beginPath();
                            ctx.moveTo(boatCenterX - hullWidth / 2, boatY);
                            ctx.lineTo(boatCenterX - hullWidth / 2 + 15, boatY + hullDepth);
                            ctx.lineTo(boatCenterX + hullWidth / 2 - 15, boatY + hullDepth);
                            ctx.lineTo(boatCenterX + hullWidth / 2, boatY);
                            ctx.closePath();
                            ctx.fill();

                            // Bubbles
                            for (var b = 0; b < 10; b++) {
                                var bx = boatCenterX - 50 + Math.random() * 100;
                                var by2 = waterLine + 10 + Math.random() * 60;
                                var br = 3 + Math.random() * 5;
                                ctx.strokeStyle = '#ffffff33';
                                ctx.beginPath();
                                ctx.arc(bx, by2, br, 0, Math.PI * 2);
                                ctx.stroke();
                            }
                        }

                        // Info panel
                        ctx.fillStyle = '#1a1a3a';
                        ctx.fillRect(440, 50, 240, 150);
                        ctx.strokeStyle = sinking ? viz.colors.red : viz.colors.green;
                        ctx.lineWidth = 2;
                        ctx.strokeRect(440, 50, 240, 150);

                        ctx.fillStyle = viz.colors.white;
                        ctx.font = 'bold 14px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Boat Status', 560, 75);

                        ctx.font = '12px -apple-system,sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillStyle = viz.colors.blue;
                        ctx.fillText('Hull volume: ' + hullVolume.toFixed(0), 455, 100);
                        ctx.fillStyle = viz.colors.orange;
                        ctx.fillText('Cargo: ' + cargo + ' tons', 455, 120);
                        ctx.fillStyle = viz.colors.muted;
                        ctx.fillText('Submersion: ' + (submersion * 100).toFixed(0) + '%', 455, 140);

                        if (sinking) {
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('SINKING!', 560, 175);
                        } else if (submersion > 0.85) {
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('WARNING: Almost sinking!', 560, 175);
                        } else {
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Floating safely!', 560, 175);
                        }

                        // Title
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = 'bold 16px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Design Your Boat', 260, 30);
                    }

                    draw();
                }
            }],
            exercises: [
                {
                    question: 'How does a submarine sink? How does it rise back to the surface?',
                    hint: 'Think about filling and emptying tanks inside the submarine.',
                    solution: 'To sink, the submarine fills ballast tanks with water, increasing its overall density above water. To rise, it pumps the water out and fills the tanks with compressed air, decreasing its density below water so buoyancy pushes it up.'
                },
                {
                    question: 'A hot air balloon is floating at a steady height. What can you say about its overall density compared to the surrounding air?',
                    hint: 'If it is not rising or sinking, what must be true about the forces?',
                    solution: 'If the balloon is hovering at a steady height, its overall density (hot air + basket + passengers) must equal the density of the surrounding air. The weight downward equals the buoyant force upward, so it neither rises nor sinks.'
                }
            ]
        }
    ]
});
