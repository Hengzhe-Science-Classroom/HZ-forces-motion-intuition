window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch08',
    number: 8,
    title: 'Friction',
    subtitle: 'Why Things Stop',
    sections: [
        {
            id: 'what-is-friction',
            title: 'What Is Friction?',
            content: `
                <h2>What Is Friction?</h2>
                <p>Kick a ball across the grass. Does it roll forever? No! It slows down and eventually stops. But why? There is no one pushing back on it. Or is there?</p>

                <p>The answer is <strong>friction</strong> &mdash; a force that opposes motion whenever two surfaces touch and slide against each other.</p>

                <div class="env-block definition">
                    <div class="env-title">Friction</div>
                    <div class="env-body"><p>Friction is a force that acts between two surfaces in contact. It always pushes <strong>opposite</strong> to the direction of motion (or attempted motion), slowing things down.</p></div>
                </div>

                <p>Where does friction come from? If you zoom in really close on any surface &mdash; even one that looks smooth &mdash; you would see tiny bumps and grooves. When two surfaces touch, these bumps catch on each other, creating a force that resists sliding.</p>

                <div class="viz-placeholder" data-viz="viz-friction-intro"></div>

                <div class="env-block intuition">
                    <div class="env-title">Feel the Friction</div>
                    <div class="env-body"><p>Rub your palms together quickly. Feel the warmth? That heat comes from friction! The rougher the surfaces, the more friction and the more heat you feel.</p></div>
                </div>

                <p>Without friction, the world would be very strange. You could not walk (your feet would slip), cars could not drive (tires would spin in place), and you could never pick anything up!</p>
            `,
            visualizations: [{
                id: 'viz-friction-intro',
                title: 'Friction Slows Things Down',
                description: 'Push the block and watch friction slow it down. Try different push strengths!',
                setup: function(body, controls) {
                    var viz = new VizEngine(body, {width: 700, height: 300, scale: 1, originX: 0, originY: 0});
                    var blockX = 80;
                    var blockV = 0;
                    var friction = 150;
                    var pushing = false;
                    var pushForce = 300;
                    var animating = false;

                    VizEngine.createSlider(controls, 'Push strength', 100, 600, 300, 10, function(val) {
                        pushForce = val;
                    });

                    VizEngine.createButton(controls, 'Push!', function() {
                        blockX = 80;
                        blockV = pushForce;
                        pushing = false;
                        if (!animating) animate();
                    });

                    VizEngine.createButton(controls, 'Reset', function() {
                        blockX = 80;
                        blockV = 0;
                        animating = false;
                        draw();
                    });

                    function animate() {
                        animating = true;
                        var dt = 0.016;

                        if (blockV > 0) {
                            blockV -= friction * dt;
                            if (blockV < 0) blockV = 0;
                            blockX += blockV * dt;
                        }

                        draw();

                        if (blockV > 0.1 && blockX < 650) {
                            requestAnimationFrame(animate);
                        } else {
                            blockV = 0;
                            animating = false;
                            draw();
                        }
                    }

                    function draw() {
                        viz.clear();
                        var ctx = viz.ctx;

                        // Ground with texture
                        ctx.fillStyle = '#2a2a1a';
                        ctx.fillRect(0, 200, 700, 100);
                        ctx.strokeStyle = '#4a4a3a';
                        ctx.lineWidth = 1;
                        for (var i = 0; i < 700; i += 6) {
                            var h = Math.random() * 3 + 1;
                            ctx.beginPath();
                            ctx.moveTo(i, 200);
                            ctx.lineTo(i, 200 - h);
                            ctx.stroke();
                        }

                        // Block
                        ctx.fillStyle = viz.colors.blue;
                        ctx.fillRect(blockX - 25, 155, 50, 45);
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = '11px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('Block', blockX, 178);

                        // Friction arrow (opposing motion)
                        if (blockV > 1) {
                            var fLen = Math.min(blockV * 0.15, 80);
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(blockX, 145);
                            ctx.lineTo(blockX - fLen, 145);
                            ctx.stroke();
                            // Arrowhead
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.moveTo(blockX - fLen, 145);
                            ctx.lineTo(blockX - fLen + 8, 140);
                            ctx.lineTo(blockX - fLen + 8, 150);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Friction', blockX - fLen / 2, 133);

                            // Velocity arrow
                            var vLen = Math.min(blockV * 0.15, 80);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(blockX, 165);
                            ctx.lineTo(blockX + vLen, 165);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.moveTo(blockX + vLen, 165);
                            ctx.lineTo(blockX + vLen - 8, 160);
                            ctx.lineTo(blockX + vLen - 8, 170);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Velocity', blockX + vLen / 2, 158);
                        }

                        // Speed display
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = 'bold 14px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Speed: ' + blockV.toFixed(1) + ' px/s', 350, 30);

                        if (blockV < 0.1 && blockX > 85) {
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillText('Stopped! Friction brought it to rest.', 350, 60);
                        }

                        // Zoom-in surface view
                        ctx.fillStyle = '#1a1a3a';
                        ctx.fillRect(480, 80, 200, 100);
                        ctx.strokeStyle = viz.colors.muted;
                        ctx.strokeRect(480, 80, 200, 100);
                        ctx.fillStyle = viz.colors.muted;
                        ctx.font = '10px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Zoomed-in surface view', 580, 95);

                        // Draw bumpy surfaces
                        ctx.strokeStyle = viz.colors.teal;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(490, 140);
                        var bumps = [495,133, 505,140, 515,131, 525,140, 535,134, 545,140, 555,132, 565,140, 575,135, 585,140, 595,133, 605,140, 615,136, 625,140, 635,133, 645,140, 655,135, 665,140, 670,140];
                        for (var b = 0; b < bumps.length; b += 2) {
                            ctx.lineTo(bumps[b], bumps[b+1]);
                        }
                        ctx.stroke();

                        ctx.strokeStyle = viz.colors.orange;
                        ctx.beginPath();
                        ctx.moveTo(490, 138);
                        var bumps2 = [500,145, 510,137, 520,146, 530,138, 540,144, 550,137, 560,145, 570,138, 580,143, 590,137, 600,145, 610,138, 620,144, 630,137, 640,145, 650,138, 660,143, 670,138];
                        for (var b2 = 0; b2 < bumps2.length; b2 += 2) {
                            ctx.lineTo(bumps2[b2], bumps2[b2+1]);
                        }
                        ctx.stroke();
                    }

                    draw();
                }
            }],
            exercises: [
                {
                    question: 'A hockey puck slides across ice and eventually stops. What force caused it to stop?',
                    hint: 'Even ice has a little bit of this force.',
                    solution: 'Friction between the puck and the ice surface caused it to slow down and stop. Ice has very little friction, so the puck slides a long way before stopping.'
                },
                {
                    question: 'You push a box to the right. In which direction does friction act?',
                    hint: 'Friction always opposes motion.',
                    solution: 'Friction acts to the LEFT &mdash; opposite to the direction of motion. Friction always pushes against the way an object is moving.'
                }
            ]
        },
        {
            id: 'types-of-friction',
            title: 'Types of Friction',
            content: `
                <h2>Static vs. Kinetic Friction</h2>
                <p>There are two main types of friction you should know about:</p>

                <div class="env-block definition">
                    <div class="env-title">Static Friction</div>
                    <div class="env-body"><p><strong>Static friction</strong> keeps things still. It prevents an object from starting to move. You have to push hard enough to overcome static friction before anything slides.</p></div>
                </div>

                <p>Think about pushing a heavy box on the floor. At first, you push gently and nothing happens &mdash; static friction matches your push exactly. You push harder, still nothing. Then suddenly, when you push hard enough, the box starts to slide!</p>

                <div class="env-block definition">
                    <div class="env-title">Kinetic Friction</div>
                    <div class="env-body"><p><strong>Kinetic friction</strong> (also called sliding friction) acts on objects that are already moving. It is usually <em>less</em> than static friction.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-static-kinetic"></div>

                <div class="env-block intuition">
                    <div class="env-title">Why Is Static Friction Bigger?</div>
                    <div class="env-body"><p>When an object sits still, the surface bumps have time to settle into each other, like puzzle pieces locking together. Once the object starts moving, the bumps are skipping over each other, so there is less grip. That is why it is harder to START pushing something than to KEEP it moving!</p></div>
                </div>

                <p>There are other types of friction too:</p>
                <ul>
                    <li><strong>Rolling friction</strong> &mdash; when a wheel or ball rolls (very small!)</li>
                    <li><strong>Air resistance</strong> &mdash; friction with air (important for fast objects)</li>
                    <li><strong>Fluid friction</strong> &mdash; friction in water or other liquids</li>
                </ul>
            `,
            visualizations: [{
                id: 'viz-static-kinetic',
                title: 'Static vs. Kinetic Friction',
                description: 'Slowly increase the push force. Watch the block stay still (static friction) then suddenly start moving (kinetic friction).',
                setup: function(body, controls) {
                    var viz = new VizEngine(body, {width: 700, height: 350, scale: 1, originX: 0, originY: 0});
                    var pushForce = 0;
                    var staticMax = 50;
                    var kineticF = 30;
                    var blockX = 120;
                    var blockV = 0;
                    var moving = false;
                    var animId = null;
                    var forceHistory = [];

                    var forceSlider = VizEngine.createSlider(controls, 'Push Force (N)', 0, 80, 0, 1, function(val) {
                        pushForce = val;
                        if (!moving && pushForce >= staticMax) {
                            moving = true;
                        }
                        if (moving && pushForce < kineticF) {
                            moving = false;
                            blockV = 0;
                        }
                        if (!animId) startAnim();
                    });

                    VizEngine.createButton(controls, 'Reset', function() {
                        pushForce = 0;
                        blockX = 120;
                        blockV = 0;
                        moving = false;
                        forceHistory = [];
                        forceSlider.value = 0;
                        if (animId) {
                            cancelAnimationFrame(animId);
                            animId = null;
                        }
                        draw();
                    });

                    function startAnim() {
                        var dt = 0.016;

                        if (moving) {
                            var netForce = pushForce - kineticF;
                            blockV += netForce * dt * 2;
                            if (blockV < 0) blockV = 0;
                            blockX += blockV * dt;
                            if (blockX > 600) {
                                blockX = 120;
                            }
                        }

                        // Record friction force for graph
                        var frictionNow = 0;
                        if (!moving) {
                            frictionNow = Math.min(pushForce, staticMax);
                        } else {
                            frictionNow = kineticF;
                        }
                        forceHistory.push({push: pushForce, friction: frictionNow});
                        if (forceHistory.length > 200) forceHistory.shift();

                        draw();

                        if (moving || pushForce > 0) {
                            animId = requestAnimationFrame(startAnim);
                        } else {
                            animId = null;
                        }
                    }

                    function draw() {
                        viz.clear();
                        var ctx = viz.ctx;

                        // Ground
                        ctx.fillStyle = '#2a2a1a';
                        ctx.fillRect(0, 220, 450, 130);

                        // Block
                        ctx.fillStyle = moving ? viz.colors.orange : viz.colors.blue;
                        ctx.fillRect(blockX - 30, 170, 60, 50);
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = '12px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(moving ? 'Moving!' : 'Still', blockX, 195);

                        // Push force arrow
                        if (pushForce > 1) {
                            var pLen = pushForce * 0.8;
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(blockX - 40, 195);
                            ctx.lineTo(blockX - 40 - pLen, 195);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath();
                            ctx.moveTo(blockX - 35, 195);
                            ctx.lineTo(blockX - 43, 190);
                            ctx.lineTo(blockX - 43, 200);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Push: ' + pushForce.toFixed(0) + ' N', blockX - 40 - pLen / 2, 182);
                        }

                        // Friction arrow
                        var fNow = moving ? kineticF : Math.min(pushForce, staticMax);
                        if (fNow > 1) {
                            var fLen = fNow * 0.8;
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(blockX + 40, 195);
                            ctx.lineTo(blockX + 40 + fLen, 195);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.moveTo(blockX + 35, 195);
                            ctx.lineTo(blockX + 43, 190);
                            ctx.lineTo(blockX + 43, 200);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Friction: ' + fNow.toFixed(0) + ' N', blockX + 40 + fLen / 2, 182);
                        }

                        // Status
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = 'bold 13px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        if (!moving && pushForce < staticMax) {
                            ctx.fillText('Static friction matches your push. Block stays still.', 225, 150);
                        } else if (!moving) {
                            ctx.fillText('Push harder to overcome static friction!', 225, 150);
                        } else {
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Block is sliding! Kinetic friction is lower than static.', 225, 150);
                        }

                        // Right side: Graph
                        var gx = 470;
                        var gy = 30;
                        var gw = 210;
                        var gh = 180;

                        ctx.fillStyle = '#0e0e25';
                        ctx.fillRect(gx - 5, gy - 5, gw + 40, gh + 50);

                        // Axes
                        ctx.strokeStyle = viz.colors.axis;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(gx, gy + gh);
                        ctx.lineTo(gx + gw, gy + gh);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(gx, gy + gh);
                        ctx.lineTo(gx, gy);
                        ctx.stroke();

                        ctx.fillStyle = viz.colors.text;
                        ctx.font = '10px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Applied Force', gx + gw / 2, gy + gh + 25);
                        ctx.textAlign = 'right';
                        ctx.fillText('Friction', gx - 8, gy + gh / 2);

                        // Static friction line (rises with applied force)
                        ctx.strokeStyle = viz.colors.teal;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(gx, gy + gh);
                        var sTopX = gx + (staticMax / 80) * gw;
                        var sTopY = gy + gh - (staticMax / 80) * gh;
                        ctx.lineTo(sTopX, sTopY);
                        ctx.stroke();

                        // Drop to kinetic
                        ctx.strokeStyle = viz.colors.orange;
                        ctx.setLineDash([4, 3]);
                        ctx.beginPath();
                        ctx.moveTo(sTopX, sTopY);
                        var kY = gy + gh - (kineticF / 80) * gh;
                        ctx.lineTo(sTopX, kY);
                        ctx.stroke();
                        ctx.setLineDash([]);

                        // Kinetic friction line (constant)
                        ctx.strokeStyle = viz.colors.orange;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(sTopX, kY);
                        ctx.lineTo(gx + gw, kY);
                        ctx.stroke();

                        // Labels
                        ctx.fillStyle = viz.colors.teal;
                        ctx.font = '10px -apple-system,sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillText('Static', gx + 5, sTopY + 15);
                        ctx.fillStyle = viz.colors.orange;
                        ctx.fillText('Kinetic', sTopX + 10, kY - 5);

                        // Current point on graph
                        var cpx = gx + (pushForce / 80) * gw;
                        var cpy;
                        if (!moving) {
                            cpy = gy + gh - (Math.min(pushForce, staticMax) / 80) * gh;
                        } else {
                            cpy = kY;
                        }
                        ctx.fillStyle = viz.colors.white;
                        ctx.beginPath();
                        ctx.arc(cpx, cpy, 5, 0, Math.PI * 2);
                        ctx.fill();

                        // Legend
                        ctx.fillStyle = viz.colors.muted;
                        ctx.font = '10px -apple-system,sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillText('Static max: ' + staticMax + ' N', gx, gy + gh + 38);
                        ctx.fillText('Kinetic: ' + kineticF + ' N', gx + 110, gy + gh + 38);
                    }

                    draw();
                }
            }],
            exercises: [
                {
                    question: 'Why is it harder to start pushing a heavy box than to keep it moving once it has started?',
                    hint: 'Think about the difference between static and kinetic friction.',
                    solution: 'Static friction (which keeps the box still) is greater than kinetic friction (which acts while the box slides). So you need a bigger push to START moving the box. Once it is sliding, less force is needed to keep it going.'
                }
            ]
        },
        {
            id: 'what-affects-friction',
            title: 'What Affects Friction?',
            content: `
                <h2>What Affects Friction?</h2>
                <p>Not all friction is the same. Some surfaces are slippery (like ice), and some are grippy (like sandpaper). What makes the difference?</p>

                <h3>1. Surface Roughness</h3>
                <p>Rougher surfaces have more friction. The tiny bumps on rough surfaces interlock more, creating a stronger grip.</p>
                <ul>
                    <li><strong>Ice</strong> &mdash; very smooth, very little friction</li>
                    <li><strong>Tile floor</strong> &mdash; fairly smooth, moderate friction</li>
                    <li><strong>Carpet</strong> &mdash; rough fibers, lots of friction</li>
                    <li><strong>Sandpaper</strong> &mdash; extremely rough, maximum friction</li>
                </ul>

                <h3>2. Weight (Normal Force)</h3>
                <p>Heavier objects experience more friction! When you push down harder on a surface, the bumps press together more tightly, making it harder to slide.</p>

                <div class="env-block remark">
                    <div class="env-title">The Friction Formula</div>
                    <div class="env-body">
                        <p>Friction depends on two things: \\( f = \\mu \\times N \\)</p>
                        <ul>
                            <li>\\( \\mu \\) (mu) = the friction coefficient (how rough the surfaces are)</li>
                            <li>\\( N \\) = the normal force (how hard the surfaces press together, usually equal to the weight)</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-friction-factors"></div>

                <div class="env-block intuition">
                    <div class="env-title">Surprising Fact</div>
                    <div class="env-body"><p>Friction does NOT depend on the size of the contact area! A small block and a large block of the same weight on the same surface have the same friction force. This surprised scientists when they first discovered it!</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-surface-compare"></div>
            `,
            visualizations: [
                {
                    id: 'viz-friction-factors',
                    title: 'Friction Factor Explorer',
                    description: 'Change the surface type and weight to see how friction changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 340, scale: 1, originX: 0, originY: 0});
                        var weight = 10;
                        var surfaceType = 0;
                        var surfaces = [
                            {name: 'Ice', mu: 0.05, color: '#a8d8ea'},
                            {name: 'Wood', mu: 0.3, color: '#c4a35a'},
                            {name: 'Rubber on Concrete', mu: 0.7, color: '#5a5a5a'},
                            {name: 'Sandpaper', mu: 1.0, color: '#d4a574'}
                        ];

                        VizEngine.createSlider(controls, 'Weight (N)', 1, 30, 10, 1, function(val) {
                            weight = val;
                            draw();
                        });

                        surfaces.forEach(function(s, i) {
                            VizEngine.createButton(controls, s.name, function() {
                                surfaceType = i;
                                draw();
                            });
                        });

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var surf = surfaces[surfaceType];
                            var frictionForce = surf.mu * weight;

                            // Surface
                            ctx.fillStyle = surf.color + '44';
                            ctx.fillRect(30, 200, 300, 40);
                            ctx.strokeStyle = surf.color;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(30, 200, 300, 40);

                            // Surface texture
                            ctx.strokeStyle = surf.color + '88';
                            ctx.lineWidth = 1;
                            var bumpSize = surf.mu * 5;
                            for (var i = 30; i < 330; i += 4) {
                                var h = Math.random() * bumpSize + 0.5;
                                ctx.beginPath();
                                ctx.moveTo(i, 200);
                                ctx.lineTo(i, 200 - h);
                                ctx.stroke();
                            }

                            // Block (size based on weight)
                            var blockSize = 30 + weight * 0.8;
                            var blockX = 180;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(blockX - blockSize / 2, 200 - blockSize, blockSize, blockSize);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(weight + ' N', blockX, 200 - blockSize / 2);

                            // Weight arrow (down)
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2.5;
                            var wLen = weight * 1.5;
                            ctx.beginPath();
                            ctx.moveTo(blockX, 200);
                            ctx.lineTo(blockX, 200 + wLen);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.purple;
                            ctx.beginPath();
                            ctx.moveTo(blockX, 200 + wLen);
                            ctx.lineTo(blockX - 5, 200 + wLen - 8);
                            ctx.lineTo(blockX + 5, 200 + wLen - 8);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('W', blockX + 15, 200 + wLen / 2);

                            // Friction arrow
                            var fLen = frictionForce * 3;
                            if (fLen > 2) {
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(blockX + blockSize / 2 + 5, 200 - blockSize / 2);
                                ctx.lineTo(blockX + blockSize / 2 + 5 + fLen, 200 - blockSize / 2);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.red;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Friction: ' + frictionForce.toFixed(1) + ' N', blockX + blockSize / 2 + 5 + fLen / 2, 200 - blockSize / 2 - 12);
                            }

                            // Info panel
                            ctx.fillStyle = '#1a1a3a';
                            ctx.fillRect(380, 50, 290, 190);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(380, 50, 290, 190);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Friction Calculator', 525, 75);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Surface: ' + surf.name, 400, 105);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Coefficient (mu): ' + surf.mu.toFixed(2), 400, 130);
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillText('Weight (N): ' + weight.toFixed(0), 400, 155);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Normal force (N): ' + weight.toFixed(0), 400, 180);

                            ctx.fillStyle = viz.colors.red;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('f = mu x N = ' + surf.mu.toFixed(2) + ' x ' + weight.toFixed(0) + ' = ' + frictionForce.toFixed(1) + ' N', 400, 215);

                            // Surface name label
                            ctx.fillStyle = surf.color;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(surf.name, 180, 250);
                        }

                        draw();
                    }
                },
                {
                    id: 'viz-surface-compare',
                    title: 'Ice Skating vs. Carpet',
                    description: 'Push a block on different surfaces and compare how far it slides.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 320, scale: 1, originX: 0, originY: 0});
                        var iceX = 100;
                        var carpetX = 100;
                        var iceV = 0;
                        var carpetV = 0;
                        var iceFriction = 15;
                        var carpetFriction = 200;
                        var pushStrength = 300;
                        var animating = false;

                        VizEngine.createButton(controls, 'Push Both!', function() {
                            iceX = 100;
                            carpetX = 100;
                            iceV = pushStrength;
                            carpetV = pushStrength;
                            if (!animating) animate();
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            iceX = 100;
                            carpetX = 100;
                            iceV = 0;
                            carpetV = 0;
                            animating = false;
                            draw();
                        });

                        function animate() {
                            animating = true;
                            var dt = 0.016;

                            if (iceV > 0) {
                                iceV -= iceFriction * dt;
                                if (iceV < 0) iceV = 0;
                                iceX += iceV * dt;
                            }
                            if (carpetV > 0) {
                                carpetV -= carpetFriction * dt;
                                if (carpetV < 0) carpetV = 0;
                                carpetX += carpetV * dt;
                            }

                            draw();

                            if (iceV > 0.1 || carpetV > 0.1) {
                                requestAnimationFrame(animate);
                            } else {
                                animating = false;
                                draw();
                            }
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Ice surface (top)
                            ctx.fillStyle = '#1a3a5a';
                            ctx.fillRect(30, 100, 640, 30);
                            ctx.fillStyle = '#a8d8ea44';
                            ctx.fillRect(30, 100, 640, 30);
                            viz.screenText('ICE', 20, 115, viz.colors.teal, 12, 'right');

                            // Carpet surface (bottom)
                            ctx.fillStyle = '#3a1a1a';
                            ctx.fillRect(30, 230, 640, 30);
                            // Carpet texture
                            ctx.fillStyle = '#8a4a2a';
                            for (var i = 30; i < 670; i += 4) {
                                ctx.fillRect(i, 230, 2, Math.random() * 4 + 2);
                            }
                            viz.screenText('CARPET', 20, 245, viz.colors.orange, 12, 'right');

                            // Ice block
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(iceX - 20, 70, 40, 30);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Block', iceX, 88);

                            // Carpet block
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(carpetX - 20, 200, 40, 30);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Block', carpetX, 218);

                            // Distance labels
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('Ice distance: ' + Math.round(iceX - 100) + ' px    Speed: ' + iceV.toFixed(0), 100, 55);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Carpet distance: ' + Math.round(carpetX - 100) + ' px    Speed: ' + carpetV.toFixed(0), 100, 185);

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Same push, different surfaces!', 350, 25);

                            // Result
                            if (iceV < 0.1 && carpetV < 0.1 && (iceX > 105 || carpetX > 105)) {
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                var ratio = (iceX - 100) / Math.max(carpetX - 100, 1);
                                ctx.fillText('Ice block traveled ' + ratio.toFixed(1) + 'x farther! Less friction = more sliding.', 350, 290);
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why do car tires have textured treads instead of being perfectly smooth?',
                    hint: 'Think about what happens on a wet road if there is no grip.',
                    solution: 'Tire treads increase friction between the tire and the road, especially in wet conditions. The grooves channel water away and the rough texture grips the road better, helping the car stop and turn safely.'
                },
                {
                    question: 'You push a 5 kg box on a surface with friction coefficient \\( \\mu = 0.4 \\). If gravity is about 10 N/kg, what is the friction force?',
                    hint: 'First find the weight (N = mg), then use f = mu x N.',
                    solution: 'Weight: \\( N = 5 \\times 10 = 50 \\) N. Friction: \\( f = 0.4 \\times 50 = 20 \\) N.'
                }
            ]
        },
        {
            id: 'friction-is-useful',
            title: 'Friction Is Useful!',
            content: `
                <h2>Friction Is Our Friend</h2>
                <p>We often think of friction as a problem &mdash; it makes things harder to push, wears things out, and wastes energy as heat. But actually, friction is incredibly useful!</p>

                <h3>Walking</h3>
                <p>When you walk, your foot pushes backward on the ground. Friction pushes your foot <em>forward</em>, propelling you ahead. Without friction, every step would be like walking on ice!</p>

                <h3>Writing</h3>
                <p>Your pencil works because friction between the pencil tip and paper scrapes off tiny bits of graphite, leaving marks. Without friction, writing would be impossible.</p>

                <h3>Brakes</h3>
                <p>Cars, bicycles, and trains all use friction to stop. Brake pads press against a wheel, and friction converts the motion energy into heat, slowing the vehicle down.</p>

                <div class="env-block example">
                    <div class="env-title">Friction Helps Us Every Day</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Walking and running</strong> &mdash; feet grip the ground</li>
                            <li><strong>Holding objects</strong> &mdash; friction between your fingers and things</li>
                            <li><strong>Brakes</strong> &mdash; stop cars, bikes, roller coasters</li>
                            <li><strong>Nails and screws</strong> &mdash; friction holds them in wood</li>
                            <li><strong>Matches</strong> &mdash; friction creates heat to light them</li>
                            <li><strong>Climbing</strong> &mdash; shoes grip rocks and walls</li>
                        </ul>
                    </div>
                </div>

                <h3>When We Reduce Friction</h3>
                <p>Sometimes we want LESS friction:</p>
                <ul>
                    <li><strong>Oil in engines</strong> &mdash; lubricant reduces friction between moving parts</li>
                    <li><strong>Ball bearings</strong> &mdash; turn sliding friction into rolling friction</li>
                    <li><strong>Ice skating</strong> &mdash; thin blade on smooth ice means very little friction</li>
                    <li><strong>Waterslides</strong> &mdash; water acts as a lubricant!</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">The Right Amount</div>
                    <div class="env-body"><p>Life is about having the right amount of friction in the right place. We want lots of friction under our shoes and car tires, but very little friction inside machines. Engineers carefully choose materials and lubricants to control friction.</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body"><p>Friction always produces heat. That is why rubbing your hands together warms them up, and why car brakes get hot. In machines, too much friction can cause overheating and damage &mdash; that is why we use oil!</p></div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'List two situations where we WANT friction and two where we want to REDUCE it.',
                    hint: 'Think about when grip helps and when sliding is better.',
                    solution: 'Want friction: (1) Walking on the ground (feet need grip), (2) Car brakes (need friction to stop). Reduce friction: (1) Engine parts (oil reduces wear), (2) Ice skating (smooth blade on smooth ice for speed).'
                },
                {
                    question: 'Why do basketball players sometimes wipe the bottom of their shoes during a game?',
                    hint: 'What happens when dust gets on your shoes?',
                    solution: 'Dust and sweat on the shoe sole reduce friction. Wiping the shoes removes the dust, restoring the grip (friction) between the shoes and the court. More friction means better traction for quick stops and direction changes.'
                }
            ]
        }
    ]
});
