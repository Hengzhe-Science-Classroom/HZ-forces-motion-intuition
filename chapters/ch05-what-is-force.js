window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch05',
    number: 5,
    title: 'What Is Force',
    subtitle: 'The Secret of Pushes and Pulls',
    sections: [
        {
            id: 'pushes-and-pulls',
            title: 'Pushes and Pulls',
            content: `
                <h2>The Invisible Hands of Nature</h2>
                <p>Every time something starts moving, speeds up, slows down, or changes direction, there is a <strong>force</strong> at work. Forces are everywhere &mdash; you just need to know where to look!</p>

                <div class="env-block definition">
                    <div class="env-title">What Is a Force?</div>
                    <div class="env-body"><p>A <strong>force</strong> is a push or a pull that can change the motion of an object. Forces can make things speed up, slow down, change direction, or change shape.</p></div>
                </div>

                <p>Think about your daily life:</p>
                <ul>
                    <li>You <strong>push</strong> a door open.</li>
                    <li>You <strong>pull</strong> a wagon.</li>
                    <li>Wind <strong>pushes</strong> a kite into the sky.</li>
                    <li>A magnet <strong>pulls</strong> a paper clip toward it.</li>
                    <li>Gravity <strong>pulls</strong> a ball back to the ground.</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">Contact vs. Non-Contact</div>
                    <div class="env-body">
                        <p>Some forces need <strong>touching</strong> (contact forces): pushing a box, kicking a ball, pulling a rope.</p>
                        <p>Other forces work <strong>at a distance</strong> (non-contact forces): gravity pulls you down without touching you, magnets attract metal through the air!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-push-pull"></div>
            `,
            visualizations: [
                {
                    id: 'viz-push-pull',
                    title: 'Push and Pull Explorer',
                    description: 'Apply push and pull forces to a box and watch it move.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 300, scale: 1, originX: 0, originY: 0 });
                        var boxX = 350;
                        var boxV = 0;
                        var force = 0;
                        var friction = 0.97;
                        var pushing = false;

                        function drawScene() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Ground
                            ctx.fillStyle = '#1a2a1a';
                            ctx.fillRect(0, 220, 700, 80);
                            ctx.strokeStyle = viz.colors.green;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(0, 220);
                            ctx.lineTo(700, 220);
                            ctx.stroke();

                            // Box
                            var bw = 60;
                            var bh = 50;
                            var bx = boxX - bw / 2;
                            var by = 220 - bh;
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(bx, by, bw, bh);
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(bx, by, bw, bh);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('BOX', boxX, 220 - bh / 2);

                            // Force arrow
                            if (Math.abs(force) > 0.1) {
                                var arrowLen = force * 3;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 4;
                                ctx.beginPath();
                                ctx.moveTo(boxX, 195 - bh / 2);
                                ctx.lineTo(boxX + arrowLen, 195 - bh / 2);
                                ctx.stroke();
                                // Arrowhead
                                var dir = force > 0 ? 1 : -1;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(boxX + arrowLen, 195 - bh / 2);
                                ctx.lineTo(boxX + arrowLen - dir * 12, 195 - bh / 2 - 8);
                                ctx.lineTo(boxX + arrowLen - dir * 12, 195 - bh / 2 + 8);
                                ctx.closePath();
                                ctx.fill();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText(Math.abs(force).toFixed(0) + ' N', boxX + arrowLen / 2, 195 - bh / 2 - 10);
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Click the buttons to push or pull the box!', 350, 15);

                            // Velocity display
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Velocity: ' + boxV.toFixed(1) + ' m/s', 20, 260);
                        }

                        viz.animate(function() {
                            boxV += force * 0.02;
                            boxV *= friction;
                            boxX += boxV;
                            if (boxX < 40) { boxX = 40; boxV = 0; }
                            if (boxX > 660) { boxX = 660; boxV = 0; }
                            if (!pushing) force *= 0.9;
                            drawScene();
                        });

                        var pushRightBtn = VizEngine.createButton(controls, 'Push Right \u2192', function() {
                            force = 30;
                            pushing = true;
                            setTimeout(function() { pushing = false; }, 300);
                        });
                        var pushLeftBtn = VizEngine.createButton(controls, '\u2190 Pull Left', function() {
                            force = -30;
                            pushing = true;
                            setTimeout(function() { pushing = false; }, 300);
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            boxX = 350;
                            boxV = 0;
                            force = 0;
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Name three examples of contact forces and three examples of non-contact forces from everyday life.',
                    hint: 'Contact forces require touching. Non-contact forces work through empty space.',
                    solution: 'Contact forces: pushing a shopping cart, pulling a door handle, kicking a soccer ball. Non-contact forces: gravity pulling you down, a magnet attracting a fridge magnet, static electricity making your hair stick to a balloon.'
                },
                {
                    question: 'A book is sitting still on a table. Are there any forces acting on it?',
                    hint: 'Think about gravity and what the table does.',
                    solution: 'Yes! Gravity pulls the book downward, and the table pushes the book upward with an equal force. The two forces balance out, so the book stays still.'
                }
            ]
        },
        {
            id: 'measuring-force',
            title: 'Measuring Force',
            content: `
                <h2>How Strong Is That Push?</h2>
                <p>We measure force in units called <strong>Newtons</strong>, named after Sir Isaac Newton. The symbol is <strong>N</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">The Newton</div>
                    <div class="env-body">
                        <p>One Newton (1 N) is roughly the force you need to hold a small apple in your hand. It is the force that gives a 1 kg object an acceleration of \\(1 \\text{ m/s}^2\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Everyday Forces</div>
                    <div class="env-body">
                        <ul>
                            <li>Lifting an apple: about 1 N</li>
                            <li>Lifting a textbook: about 20 N</li>
                            <li>Pushing a heavy door: about 50 N</li>
                            <li>Your weight (if you weigh 40 kg): about 400 N</li>
                        </ul>
                    </div>
                </div>

                <p>We measure forces using a <strong>spring scale</strong> (also called a Newton meter). When you pull on it, the spring stretches, and the scale tells you how many Newtons of force you are applying.</p>

                <div class="viz-placeholder" data-viz="viz-spring-scale"></div>
            `,
            visualizations: [
                {
                    id: 'viz-spring-scale',
                    title: 'Spring Scale Simulator',
                    description: 'Drag downward to apply force and see the spring stretch.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 380, scale: 1, originX: 0, originY: 0 });
                        var appliedForce = 0;
                        var maxForce = 50;
                        var dragging = false;
                        var dragStartY = 0;

                        function drawSpringScale() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = 350;
                            var topY = 30;
                            var springRestLen = 80;
                            var springStretch = (appliedForce / maxForce) * 120;
                            var springLen = springRestLen + springStretch;
                            var hookY = topY + 40 + springLen;

                            // Support bar
                            ctx.fillStyle = viz.colors.axis;
                            ctx.fillRect(cx - 60, topY, 120, 8);

                            // Scale body (rectangle)
                            ctx.fillStyle = '#1a2a3a';
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.fillRect(cx - 25, topY + 8, 50, 30);
                            ctx.strokeRect(cx - 25, topY + 8, 50, 30);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('N meter', cx, topY + 23);

                            // Spring (zigzag)
                            var springTop = topY + 38;
                            var coils = 10;
                            var coilH = springLen / coils;
                            var coilW = 16;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(cx, springTop);
                            for (var i = 0; i < coils; i++) {
                                var y1 = springTop + i * coilH;
                                var y2 = springTop + (i + 0.5) * coilH;
                                var y3 = springTop + (i + 1) * coilH;
                                var dir = (i % 2 === 0) ? 1 : -1;
                                ctx.lineTo(cx + dir * coilW, y2);
                                ctx.lineTo(cx, y3);
                            }
                            ctx.stroke();

                            // Hook
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(cx, hookY + 10, 10, Math.PI, 0);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(cx, hookY);
                            ctx.lineTo(cx, hookY + 10);
                            ctx.stroke();

                            // Object hanging
                            if (appliedForce > 0) {
                                var objY = hookY + 20;
                                var objSize = 15 + appliedForce * 0.4;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(cx, objY + objSize / 2, objSize, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                var mass = (appliedForce / 10).toFixed(1);
                                ctx.fillText(mass + ' kg', cx, objY + objSize / 2);
                            }

                            // Reading display
                            ctx.fillStyle = '#0a1a2a';
                            ctx.fillRect(cx + 80, topY + 50, 160, 70);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(cx + 80, topY + 50, 160, 70);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 24px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(appliedForce.toFixed(1) + ' N', cx + 160, topY + 75);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Force Reading', cx + 160, topY + 105);

                            // Scale markings on the left
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var n = 0; n <= maxForce; n += 10) {
                                var markY = topY + 38 + springRestLen * (n / maxForce) + (n / maxForce) * 120;
                                ctx.fillText(n + ' N', cx - 35, Math.min(markY, topY + 38 + springRestLen + 120));
                            }

                            // Drag instruction
                            ctx.fillStyle = viz.colors.muted || viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('Use the slider to apply force', 350, 370);
                        }

                        drawSpringScale();

                        VizEngine.createSlider(controls, 'Applied Force (N)', 0, maxForce, 0, 1, function(v) {
                            appliedForce = v;
                            drawSpringScale();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A spring scale reads 25 N when an object hangs from it. What does this tell you?',
                    hint: 'The spring scale measures the pulling force of gravity on the object.',
                    solution: 'The gravitational force (weight) pulling the object downward is 25 Newtons. This is how hard gravity pulls on that object.'
                },
                {
                    question: 'About how many Newtons does it take to lift a 2 kg bag of sugar? (Hint: 1 kg weighs about 10 N on Earth.)',
                    hint: 'Multiply the mass by 10 to get the approximate weight in Newtons.',
                    solution: 'It takes about 20 N. Since 1 kg weighs roughly 10 N, a 2 kg bag needs 2 x 10 = 20 N of lifting force.'
                }
            ]
        },
        {
            id: 'force-arrows',
            title: 'Force Arrows',
            content: `
                <h2>Drawing Invisible Forces</h2>
                <p>Forces are invisible, but scientists have a clever way to show them: <strong>force arrows</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Force Arrow (Vector)</div>
                    <div class="env-body">
                        <p>A force arrow tells you two things at once:</p>
                        <ul>
                            <li><strong>Direction:</strong> the way the arrow points shows which way the force pushes or pulls.</li>
                            <li><strong>Strength:</strong> a longer arrow means a stronger force.</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Think of It This Way</div>
                    <div class="env-body"><p>Imagine you are giving directions to a friend: "Push THAT way, and push HARD!" A force arrow captures both pieces of information in one picture.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-force-arrows"></div>

                <div class="env-block remark">
                    <div class="env-title">Where Do We Draw the Arrow?</div>
                    <div class="env-body"><p>The arrow starts at the point where the force is applied. For example, if you push a box from the left, the arrow starts on the left side of the box and points to the right.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-force-arrows',
                    title: 'Force Arrow Playground',
                    description: 'Drag the tip of the force arrow to change its direction and strength.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 200 });

                        var tipX = 3;
                        var tipY = 2;

                        viz.addDraggable('tip', tipX, tipY, viz.colors.orange, 10, function(x, y) {
                            tipX = x;
                            tipY = y;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();

                            // Draw the force arrow from origin
                            var mag = Math.sqrt(tipX * tipX + tipY * tipY);
                            var forceN = (mag * 10).toFixed(1);
                            var angleDeg = (Math.atan2(tipY, tipX) * 180 / Math.PI).toFixed(0);

                            if (mag > 0.1) {
                                viz.drawVector(0, 0, tipX, tipY, viz.colors.orange, '', 4);
                            }

                            // Draw the object at origin
                            var ctx = viz.ctx;
                            var s = viz.toScreen(0, 0);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(s[0] - 20, s[1] - 20, 40, 40);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('OBJ', s[0], s[1]);

                            // Draw components (dashed)
                            if (mag > 0.3) {
                                viz.drawSegment(0, 0, tipX, 0, viz.colors.teal, 1.5, true);
                                viz.drawSegment(tipX, 0, tipX, tipY, viz.colors.purple, 1.5, true);
                                // Labels
                                viz.screenText('Fx = ' + (tipX * 10).toFixed(1) + ' N', viz.toScreen(tipX / 2, 0)[0], viz.toScreen(tipX / 2, 0)[1] + 18, viz.colors.teal, 12);
                                viz.screenText('Fy = ' + (tipY * 10).toFixed(1) + ' N', viz.toScreen(tipX, tipY / 2)[0] + 50, viz.toScreen(tipX, tipY / 2)[1], viz.colors.purple, 12);
                            }

                            // Info display
                            viz.screenText('Force: ' + forceN + ' N', 120, 30, viz.colors.white, 15);
                            viz.screenText('Direction: ' + angleDeg + '\u00B0', 120, 50, viz.colors.white, 15);
                            viz.screenText('Drag the orange dot!', 560, 330, viz.colors.muted || viz.colors.text, 12);

                            viz.drawDraggables();
                        }

                        viz.animate(function() {
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Two force arrows point in the same direction. One is 5 cm long and the other is 2 cm long. Which represents the stronger force?',
                    hint: 'Longer arrows represent stronger forces.',
                    solution: 'The 5 cm arrow represents the stronger force. The length of a force arrow shows the magnitude (strength) of the force.'
                }
            ]
        },
        {
            id: 'combining-forces',
            title: 'Combining Forces',
            content: `
                <h2>When Forces Team Up</h2>
                <p>In real life, objects usually have <strong>more than one force</strong> acting on them at the same time. What happens when multiple forces act together?</p>

                <div class="env-block definition">
                    <div class="env-title">Net Force (Total Force)</div>
                    <div class="env-body">
                        <p>The <strong>net force</strong> is the overall force you get when you combine all the individual forces acting on an object. It tells you the final effect on the object's motion.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Same Direction vs. Opposite Direction</div>
                    <div class="env-body">
                        <p><strong>Same direction:</strong> forces add up. If you and your friend both push a box to the right with 10 N each, the net force is 20 N to the right.</p>
                        <p><strong>Opposite directions:</strong> forces subtract. If you push right with 10 N and your friend pushes left with 6 N, the net force is 4 N to the right.</p>
                        <p><strong>Balanced forces:</strong> if forces cancel out perfectly (net force = 0), the object does not change its motion!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-combine-forces"></div>

                <div class="env-block warning">
                    <div class="env-title">Watch Out!</div>
                    <div class="env-body"><p>Just because forces are balanced does not mean there are no forces. A book on a table has gravity pulling it down and the table pushing it up. The forces are balanced (net force = 0), but both forces are definitely there!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-combine-forces',
                    title: 'Force Combination Visualizer',
                    description: 'Adjust two horizontal forces and see the net force.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 300, scale: 1, originX: 0, originY: 0 });
                        var forceA = 20;
                        var forceB = -10;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = 350;
                            var cy = 150;
                            var pxPerN = 4;

                            // Object
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(cx - 25, cy - 25, 50, 50);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('BOX', cx, cy);

                            // Force A arrow (from right side of box)
                            var aLen = forceA * pxPerN;
                            if (Math.abs(forceA) > 0.5) {
                                var aStart = forceA > 0 ? cx + 25 : cx - 25;
                                var aEnd = aStart + aLen;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 6;
                                ctx.beginPath();
                                ctx.moveTo(aStart, cy - 15);
                                ctx.lineTo(aEnd, cy - 15);
                                ctx.stroke();
                                var dirA = forceA > 0 ? 1 : -1;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(aEnd, cy - 15);
                                ctx.lineTo(aEnd - dirA * 12, cy - 15 - 8);
                                ctx.lineTo(aEnd - dirA * 12, cy - 15 + 8);
                                ctx.closePath();
                                ctx.fill();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText('F1 = ' + forceA.toFixed(0) + ' N', (aStart + aEnd) / 2, cy - 28);
                            }

                            // Force B arrow
                            var bLen = forceB * pxPerN;
                            if (Math.abs(forceB) > 0.5) {
                                var bStart = forceB > 0 ? cx + 25 : cx - 25;
                                var bEnd = bStart + bLen;
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 6;
                                ctx.beginPath();
                                ctx.moveTo(bStart, cy + 15);
                                ctx.lineTo(bEnd, cy + 15);
                                ctx.stroke();
                                var dirB = forceB > 0 ? 1 : -1;
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.moveTo(bEnd, cy + 15);
                                ctx.lineTo(bEnd - dirB * 12, cy + 15 - 8);
                                ctx.lineTo(bEnd - dirB * 12, cy + 15 + 8);
                                ctx.closePath();
                                ctx.fill();
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('F2 = ' + forceB.toFixed(0) + ' N', (bStart + bEnd) / 2, cy + 28);
                            }

                            // Net force
                            var net = forceA + forceB;
                            var netLen = net * pxPerN;

                            // Draw net force below
                            var netY = 240;
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('Net Force:', cx - 120, netY);

                            if (Math.abs(net) > 0.5) {
                                var nStart = cx;
                                var nEnd = cx + netLen;
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 6;
                                ctx.beginPath();
                                ctx.moveTo(nStart, netY);
                                ctx.lineTo(nEnd, netY);
                                ctx.stroke();
                                var dirN = net > 0 ? 1 : -1;
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath();
                                ctx.moveTo(nEnd, netY);
                                ctx.lineTo(nEnd - dirN * 12, netY - 8);
                                ctx.lineTo(nEnd - dirN * 12, netY + 8);
                                ctx.closePath();
                                ctx.fill();
                            }

                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            var dirLabel = net > 0 ? ' \u2192' : (net < 0 ? ' \u2190' : '');
                            ctx.fillText('Net = ' + net.toFixed(0) + ' N' + dirLabel, cx, netY + 30);

                            if (Math.abs(net) < 0.5) {
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.fillText('BALANCED!', cx, netY + 55);
                            }

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Combining Two Forces', 350, 15);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Force 1 (N)', -40, 40, forceA, 1, function(v) {
                            forceA = v;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Force 2 (N)', -40, 40, forceB, 1, function(v) {
                            forceB = v;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'You push a cart to the right with 15 N, and friction pushes back with 5 N. What is the net force?',
                    hint: 'When forces act in opposite directions, subtract the smaller from the larger.',
                    solution: 'Net force = 15 N - 5 N = 10 N to the right. The cart accelerates to the right.'
                },
                {
                    question: 'Two people pull a rope in opposite directions with 30 N each. What is the net force on the rope?',
                    hint: 'Equal forces in opposite directions...',
                    solution: 'Net force = 30 N - 30 N = 0 N. The forces are balanced, so the rope does not accelerate.'
                },
                {
                    question: 'Three friends push a broken-down car. Two push forward with 100 N each, and one pushes forward with 50 N. What is the total pushing force?',
                    hint: 'When all forces point in the same direction, add them up.',
                    solution: 'Total force = 100 + 100 + 50 = 250 N forward. All three forces point in the same direction, so they simply add together.'
                }
            ]
        }
    ]
});
