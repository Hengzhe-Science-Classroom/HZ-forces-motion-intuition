window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch07',
    number: 7,
    title: 'Elastic Force',
    subtitle: 'The Power of Springs',
    sections: [
        {
            id: 'what-is-elasticity',
            title: 'What Is Elasticity?',
            content: `
                <h2>What Is Elasticity?</h2>
                <p>Have you ever stretched a rubber band and then let it go? It snaps right back to its original shape! That special property is called <strong>elasticity</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Elasticity</div>
                    <div class="env-body"><p>Elasticity is the ability of an object to return to its original shape after being stretched, squeezed, or bent.</p></div>
                </div>

                <p>Many things around you are elastic:</p>
                <ul>
                    <li><strong>Rubber bands</strong> &mdash; stretch them and they bounce back</li>
                    <li><strong>Springs</strong> &mdash; push or pull and they return to normal</li>
                    <li><strong>Trampolines</strong> &mdash; you land and get pushed back up!</li>
                    <li><strong>Bouncing balls</strong> &mdash; they squish on the ground and spring back</li>
                </ul>

                <p>When you stretch or compress an elastic object, it pushes back on you. That push-back is called <strong>elastic force</strong>. The more you deform it, the harder it pushes back.</p>

                <div class="env-block intuition">
                    <div class="env-title">Try This!</div>
                    <div class="env-body"><p>Hold a rubber band between your fingers. Slowly stretch it further and further. Can you feel the force getting stronger as you stretch more?</p></div>
                </div>

                <p>But be careful! If you stretch something <em>too far</em>, it might not bounce back. It could break or stay deformed. The point where an object stops being elastic is called the <strong>elastic limit</strong>.</p>

                <div class="viz-placeholder" data-viz="viz-elastic-demo"></div>

                <div class="env-block warning">
                    <div class="env-title">Elastic Limit</div>
                    <div class="env-body"><p>Every elastic object has a limit. If you stretch it beyond that limit, it will not return to its original shape. Think of pulling a spring too hard &mdash; it stays stretched out!</p></div>
                </div>
            `,
            visualizations: [{
                id: 'viz-elastic-demo',
                title: 'Elastic vs. Non-Elastic',
                description: 'Drag the handle to stretch the object. Watch what happens when you release!',
                setup: function(body, controls) {
                    var viz = new VizEngine(body, {width: 700, height: 300, scale: 40, originX: 100, originY: 150});
                    var stretchX = 0;
                    var released = false;
                    var returnSpeed = 0;
                    var isElastic = true;
                    var maxElastic = 8;
                    var broken = false;

                    var handle = viz.addDraggable('handle', 3, 0, viz.colors.orange, 10, function(x, y) {
                        if (broken) return;
                        released = false;
                        stretchX = Math.max(0, Math.min(x, 12));
                        handle.x = stretchX;
                        handle.y = 0;
                        if (stretchX > maxElastic) {
                            broken = true;
                        }
                        draw();
                    });

                    VizEngine.createButton(controls, 'Reset', function() {
                        stretchX = 3;
                        handle.x = 3;
                        handle.y = 0;
                        broken = false;
                        released = false;
                        draw();
                    });

                    VizEngine.createButton(controls, 'Release', function() {
                        if (!broken) {
                            released = true;
                            returnSpeed = 0.15;
                            animateReturn();
                        }
                    });

                    function drawSpring(startX, endX, yCenter, coils) {
                        var ctx = viz.ctx;
                        var sStart = viz.toScreen(startX, yCenter);
                        var sEnd = viz.toScreen(endX, yCenter);
                        var len = sEnd[0] - sStart[0];
                        ctx.strokeStyle = broken ? viz.colors.red : viz.colors.teal;
                        ctx.lineWidth = 2.5;
                        ctx.beginPath();
                        ctx.moveTo(sStart[0], sStart[1]);
                        var amplitude = 15;
                        for (var i = 0; i <= coils * 2; i++) {
                            var px = sStart[0] + (len * i) / (coils * 2);
                            var py = sStart[1] + (i % 2 === 0 ? -amplitude : amplitude);
                            ctx.lineTo(px, py);
                        }
                        ctx.lineTo(sEnd[0], sEnd[1]);
                        ctx.stroke();
                    }

                    function draw() {
                        viz.clear();
                        // Wall
                        var ctx = viz.ctx;
                        var wallScreen = viz.toScreen(0, 0);
                        ctx.fillStyle = '#3a3a5a';
                        ctx.fillRect(wallScreen[0] - 15, wallScreen[1] - 60, 15, 120);
                        // Hatching on wall
                        ctx.strokeStyle = '#5a5a7a';
                        ctx.lineWidth = 1;
                        for (var i = -50; i < 70; i += 10) {
                            ctx.beginPath();
                            ctx.moveTo(wallScreen[0] - 15, wallScreen[1] + i);
                            ctx.lineTo(wallScreen[0], wallScreen[1] + i + 10);
                            ctx.stroke();
                        }

                        // Spring
                        drawSpring(0, stretchX, 0, 10);

                        // Block
                        var blockScreen = viz.toScreen(stretchX, 0);
                        ctx.fillStyle = viz.colors.blue;
                        ctx.fillRect(blockScreen[0] - 15, blockScreen[1] - 20, 30, 40);
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = '11px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('Block', blockScreen[0], blockScreen[1]);

                        // Force arrow
                        if (stretchX > 0.5 && !broken) {
                            var forceLen = stretchX * 0.4;
                            viz.drawVector(stretchX, 1.5, stretchX - forceLen, 1.5, viz.colors.orange, 'F', 2.5);
                        }

                        // Status text
                        if (broken) {
                            viz.screenText('Stretched beyond elastic limit! Spring is broken.', viz.width / 2, 30, viz.colors.red, 14);
                        } else {
                            var stretch = stretchX - 3;
                            if (stretch < 0) stretch = 0;
                            viz.screenText('Extension: ' + stretch.toFixed(1) + ' units', viz.width / 2, 30, viz.colors.white, 14);
                        }

                        // Elastic limit marker
                        var limitScreen = viz.toScreen(maxElastic, 0);
                        ctx.strokeStyle = viz.colors.red + '66';
                        ctx.setLineDash([4, 4]);
                        ctx.beginPath();
                        ctx.moveTo(limitScreen[0], 0);
                        ctx.lineTo(limitScreen[0], viz.height);
                        ctx.stroke();
                        ctx.setLineDash([]);
                        viz.screenText('Elastic Limit', limitScreen[0], viz.height - 15, viz.colors.red, 11);

                        viz.drawDraggables();
                    }

                    function animateReturn() {
                        if (!released || broken) return;
                        stretchX -= returnSpeed * (stretchX - 3);
                        if (Math.abs(stretchX - 3) < 0.05) {
                            stretchX = 3;
                            handle.x = 3;
                            released = false;
                            draw();
                            return;
                        }
                        handle.x = stretchX;
                        draw();
                        requestAnimationFrame(animateReturn);
                    }

                    draw();
                }
            }],
            exercises: [
                {
                    question: 'Name three elastic objects you can find in your home.',
                    hint: 'Think about things that stretch or bounce back when you push them.',
                    solution: 'Examples: rubber bands, springs in a mattress, a sponge, a bouncing ball, hair ties, spring-loaded pens, or trampoline.'
                },
                {
                    question: 'What happens if you stretch a rubber band past its elastic limit?',
                    hint: 'Think about what "elastic limit" means.',
                    solution: 'If you stretch a rubber band past its elastic limit, it will not return to its original shape. It may stay permanently stretched or even snap and break.'
                }
            ]
        },
        {
            id: 'springs-and-rubber-bands',
            title: 'Springs & Rubber Bands',
            content: `
                <h2>Springs and Rubber Bands</h2>
                <p>Springs and rubber bands are the two most common elastic objects. But they work a bit differently!</p>

                <h3>How Springs Work</h3>
                <p>A spring is a coil of metal (or sometimes plastic) that can be both <strong>stretched</strong> and <strong>compressed</strong>:</p>
                <ul>
                    <li><strong>Stretching</strong> &mdash; pulling the spring longer than its natural length</li>
                    <li><strong>Compressing</strong> &mdash; pushing the spring shorter than its natural length</li>
                </ul>
                <p>In both cases, the spring pushes back toward its natural length. This restoring force is what makes springs so useful!</p>

                <div class="env-block example">
                    <div class="env-title">Springs Everywhere</div>
                    <div class="env-body">
                        <p>Springs are hidden inside many everyday objects:</p>
                        <ul>
                            <li>Click pens (the button springs back)</li>
                            <li>Car suspensions (absorb bumps in the road)</li>
                            <li>Mattresses (push back against your weight)</li>
                            <li>Trampolines (launch you into the air!)</li>
                        </ul>
                    </div>
                </div>

                <h3>How Rubber Bands Work</h3>
                <p>Rubber bands are made of stretchy rubber. Unlike springs, rubber bands mainly work by <strong>stretching</strong> (they cannot really be compressed).</p>

                <p>When you stretch a rubber band, the tiny molecules inside get pulled apart. They want to snap back together &mdash; that is the elastic force!</p>

                <div class="viz-placeholder" data-viz="viz-spring-vs-rubber"></div>

                <div class="env-block intuition">
                    <div class="env-title">Key Difference</div>
                    <div class="env-body"><p>Springs can be both stretched AND compressed. Rubber bands can only be stretched. But both produce elastic force that tries to return them to their natural shape.</p></div>
                </div>
            `,
            visualizations: [{
                id: 'viz-spring-vs-rubber',
                title: 'Spring vs. Rubber Band',
                description: 'Use the slider to stretch or compress. Notice that the rubber band only stretches!',
                setup: function(body, controls) {
                    var viz = new VizEngine(body, {width: 700, height: 350, scale: 30, originX: 120, originY: 175});
                    var displacement = 0;

                    var slider = VizEngine.createSlider(controls, 'Displacement', -4, 6, 0, 0.1, function(val) {
                        displacement = val;
                        draw();
                    });

                    function drawCoilSpring(startX, endX, y, coils, color) {
                        var ctx = viz.ctx;
                        var sStart = viz.toScreen(startX, y);
                        var sEnd = viz.toScreen(endX, y);
                        var len = sEnd[0] - sStart[0];
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 2.5;
                        ctx.beginPath();
                        ctx.moveTo(sStart[0], sStart[1]);
                        var amp = 12;
                        for (var i = 0; i <= coils * 2; i++) {
                            var px = sStart[0] + (len * i) / (coils * 2);
                            var py = sStart[1] + (i % 2 === 0 ? -amp : amp);
                            ctx.lineTo(px, py);
                        }
                        ctx.lineTo(sEnd[0], sEnd[1]);
                        ctx.stroke();
                    }

                    function drawRubberBand(startX, endX, y, color) {
                        var ctx = viz.ctx;
                        var sStart = viz.toScreen(startX, y);
                        var sEnd = viz.toScreen(endX, y);
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 6;
                        ctx.lineCap = 'round';
                        ctx.beginPath();
                        ctx.moveTo(sStart[0], sStart[1] - 3);
                        ctx.lineTo(sEnd[0], sEnd[1] - 3);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(sStart[0], sStart[1] + 3);
                        ctx.lineTo(sEnd[0], sEnd[1] + 3);
                        ctx.stroke();
                        ctx.lineWidth = 1;
                        ctx.lineCap = 'butt';
                    }

                    function draw() {
                        viz.clear();
                        var ctx = viz.ctx;

                        // Labels
                        viz.screenText('SPRING', 60, 65, viz.colors.teal, 14);
                        viz.screenText('RUBBER BAND', 60, 235, viz.colors.orange, 14);

                        // Wall for spring
                        var wallS = viz.toScreen(0, 2);
                        ctx.fillStyle = '#3a3a5a';
                        ctx.fillRect(wallS[0] - 10, wallS[1] - 40, 10, 80);

                        // Spring: full displacement range
                        var springEnd = 5 + displacement;
                        drawCoilSpring(0, springEnd, 2, 10, viz.colors.teal);

                        // Spring block
                        var bS = viz.toScreen(springEnd, 2);
                        ctx.fillStyle = viz.colors.blue;
                        ctx.fillRect(bS[0] - 12, bS[1] - 18, 24, 36);

                        // Natural length marker for spring
                        var natS = viz.toScreen(5, 2);
                        ctx.strokeStyle = viz.colors.muted;
                        ctx.setLineDash([3, 3]);
                        ctx.beginPath();
                        ctx.moveTo(natS[0], natS[1] - 50);
                        ctx.lineTo(natS[0], natS[1] + 50);
                        ctx.stroke();
                        ctx.setLineDash([]);

                        // Force arrow on spring
                        if (Math.abs(displacement) > 0.3) {
                            var forceDir = displacement > 0 ? -1 : 1;
                            var fMag = Math.abs(displacement) * 0.5;
                            viz.drawVector(springEnd, 3.5, springEnd + forceDir * fMag, 3.5, viz.colors.green, 'F', 2);
                        }

                        // Wall for rubber band
                        var wallR = viz.toScreen(0, -2.5);
                        ctx.fillStyle = '#3a3a5a';
                        ctx.fillRect(wallR[0] - 10, wallR[1] - 40, 10, 80);

                        // Rubber band: only stretches (displacement >= 0)
                        var rubberDisp = Math.max(0, displacement);
                        var rubberEnd = 5 + rubberDisp;
                        drawRubberBand(0, rubberEnd, -2.5, viz.colors.orange);

                        // Rubber band block
                        var bR = viz.toScreen(rubberEnd, -2.5);
                        ctx.fillStyle = viz.colors.blue;
                        ctx.fillRect(bR[0] - 12, bR[1] - 18, 24, 36);

                        // Natural length marker for rubber band
                        var natR = viz.toScreen(5, -2.5);
                        ctx.strokeStyle = viz.colors.muted;
                        ctx.setLineDash([3, 3]);
                        ctx.beginPath();
                        ctx.moveTo(natR[0], natR[1] - 50);
                        ctx.lineTo(natR[0], natR[1] + 50);
                        ctx.stroke();
                        ctx.setLineDash([]);

                        // Force arrow on rubber band
                        if (rubberDisp > 0.3) {
                            var fRMag = rubberDisp * 0.5;
                            viz.drawVector(rubberEnd, -1.2, rubberEnd - fRMag, -1.2, viz.colors.green, 'F', 2);
                        }

                        // Status
                        if (displacement < -0.1) {
                            viz.screenText('Spring: Compressed | Rubber Band: Cannot compress!', viz.width / 2, 20, viz.colors.white, 13);
                        } else if (displacement > 0.1) {
                            viz.screenText('Both: Stretched', viz.width / 2, 20, viz.colors.white, 13);
                        } else {
                            viz.screenText('Both at natural length', viz.width / 2, 20, viz.colors.muted, 13);
                        }
                    }

                    draw();
                }
            }],
            exercises: [
                {
                    question: 'A spring is compressed so it is shorter than its natural length. Which direction does the elastic force push?',
                    hint: 'The spring always tries to return to its natural length.',
                    solution: 'The elastic force pushes outward (away from the compression), trying to expand the spring back to its natural length.'
                }
            ]
        },
        {
            id: 'hookes-law',
            title: "Hooke's Law",
            content: `
                <h2>Hooke's Law: The Rule of Springs</h2>
                <p>Around 350 years ago, a scientist named Robert Hooke discovered a simple rule about springs:</p>

                <div class="env-block definition">
                    <div class="env-title">Hooke's Law (Simple Version)</div>
                    <div class="env-body">
                        <p>The more you stretch a spring, the harder it pulls back. The force is proportional to the stretch.</p>
                        <p>In math: \\( F = k \\times x \\)</p>
                        <ul>
                            <li>\\( F \\) = the elastic force (in Newtons)</li>
                            <li>\\( k \\) = the spring constant (how stiff the spring is)</li>
                            <li>\\( x \\) = the extension or compression (how far from natural length)</li>
                        </ul>
                    </div>
                </div>

                <p>What does this mean? If you stretch a spring by 1 cm and feel a force of 2 N, then stretching it by 2 cm gives you 4 N, and 3 cm gives you 6 N. <strong>Double the stretch = double the force!</strong></p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A spring has spring constant \\( k = 10 \\) N/m. If you stretch it by \\( x = 0.3 \\) m:</p>
                        <p>\\[ F = k \\times x = 10 \\times 0.3 = 3 \\text{ N} \\]</p>
                        <p>The spring pulls back with a force of 3 Newtons!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-hookes-law-graph"></div>

                <div class="env-block remark">
                    <div class="env-title">What Is the Spring Constant?</div>
                    <div class="env-body"><p>The spring constant \\( k \\) tells you how stiff a spring is. A large \\( k \\) means the spring is very stiff and hard to stretch. A small \\( k \\) means the spring is soft and easy to stretch. A trampoline spring is softer than a car suspension spring!</p></div>
                </div>

                <p>Hooke's Law works both ways: it applies to stretching <em>and</em> compressing a spring. The graph of force vs. extension is always a straight line &mdash; as long as you stay within the elastic limit.</p>
            `,
            visualizations: [{
                id: 'viz-hookes-law-graph',
                title: "Hooke's Law Graph Explorer",
                description: 'Drag the weight to stretch the spring. The graph shows how force increases with extension.',
                setup: function(body, controls) {
                    var viz = new VizEngine(body, {width: 700, height: 380, scale: 1, originX: 0, originY: 0});
                    var k = 3;
                    var extension = 2;

                    var kSlider = VizEngine.createSlider(controls, 'Spring stiffness (k)', 1, 8, 3, 0.5, function(val) {
                        k = val;
                        draw();
                    });

                    var xSlider = VizEngine.createSlider(controls, 'Extension (x)', 0, 5, 2, 0.1, function(val) {
                        extension = val;
                        draw();
                    });

                    function draw() {
                        viz.clear();
                        var ctx = viz.ctx;

                        // --- Left side: Spring animation ---
                        var leftW = 280;
                        // Ceiling
                        ctx.fillStyle = '#3a3a5a';
                        ctx.fillRect(40, 30, 200, 8);
                        // Hatching
                        ctx.strokeStyle = '#5a5a7a';
                        ctx.lineWidth = 1;
                        for (var h = 0; h < 200; h += 8) {
                            ctx.beginPath();
                            ctx.moveTo(40 + h, 30);
                            ctx.lineTo(48 + h, 22);
                            ctx.stroke();
                        }

                        // Spring
                        var springTop = 38;
                        var naturalLen = 80;
                        var springBottom = springTop + naturalLen + extension * 35;
                        var anchorX = 140;
                        ctx.strokeStyle = viz.colors.teal;
                        ctx.lineWidth = 2.5;
                        ctx.beginPath();
                        ctx.moveTo(anchorX, springTop);
                        var coils = 12;
                        var sLen = springBottom - springTop;
                        for (var i = 0; i <= coils * 2; i++) {
                            var py = springTop + (sLen * i) / (coils * 2);
                            var px = anchorX + (i % 2 === 0 ? -15 : 15);
                            ctx.lineTo(px, py);
                        }
                        ctx.lineTo(anchorX, springBottom);
                        ctx.stroke();

                        // Weight block
                        ctx.fillStyle = viz.colors.blue;
                        ctx.fillRect(anchorX - 25, springBottom, 50, 40);
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = '12px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText('Weight', anchorX, springBottom + 20);

                        // Natural length line
                        var natLine = springTop + naturalLen;
                        ctx.strokeStyle = viz.colors.muted;
                        ctx.setLineDash([4, 4]);
                        ctx.beginPath();
                        ctx.moveTo(anchorX - 60, natLine);
                        ctx.lineTo(anchorX + 60, natLine);
                        ctx.stroke();
                        ctx.setLineDash([]);
                        ctx.fillStyle = viz.colors.muted;
                        ctx.font = '10px -apple-system,sans-serif';
                        ctx.textAlign = 'left';
                        ctx.fillText('Natural length', anchorX + 35, natLine - 8);

                        // Extension bracket
                        if (extension > 0.1) {
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            var bx = anchorX + 55;
                            ctx.beginPath();
                            ctx.moveTo(bx, natLine);
                            ctx.lineTo(bx + 8, natLine);
                            ctx.moveTo(bx + 4, natLine);
                            ctx.lineTo(bx + 4, springBottom);
                            ctx.moveTo(bx, springBottom);
                            ctx.lineTo(bx + 8, springBottom);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('x = ' + extension.toFixed(1), bx + 12, (natLine + springBottom) / 2);
                        }

                        // Force value
                        var force = k * extension;
                        ctx.fillStyle = viz.colors.green;
                        ctx.font = 'bold 14px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('F = ' + k.toFixed(1) + ' x ' + extension.toFixed(1) + ' = ' + force.toFixed(1) + ' N', anchorX, springBottom + 60);

                        // --- Right side: Graph ---
                        var gx = 340;
                        var gy = 50;
                        var gw = 300;
                        var gh = 260;

                        // Axes
                        ctx.strokeStyle = viz.colors.axis;
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(gx, gy + gh);
                        ctx.lineTo(gx + gw, gy + gh);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(gx, gy + gh);
                        ctx.lineTo(gx, gy);
                        ctx.stroke();

                        ctx.fillStyle = viz.colors.text;
                        ctx.font = '12px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('Extension (x)', gx + gw / 2, gy + gh + 30);
                        ctx.save();
                        ctx.translate(gx - 35, gy + gh / 2);
                        ctx.rotate(-Math.PI / 2);
                        ctx.fillText('Force (F)', 0, 0);
                        ctx.restore();

                        // Graph line: F = k * x
                        var maxX = 5;
                        var maxF = 40;
                        ctx.strokeStyle = viz.colors.teal;
                        ctx.lineWidth = 2.5;
                        ctx.beginPath();
                        for (var xi = 0; xi <= maxX; xi += 0.05) {
                            var fi = k * xi;
                            var px = gx + (xi / maxX) * gw;
                            var py = gy + gh - (fi / maxF) * gh;
                            if (py < gy) break;
                            if (xi === 0) ctx.moveTo(px, py);
                            else ctx.lineTo(px, py);
                        }
                        ctx.stroke();

                        // Current point
                        var cpx = gx + (extension / maxX) * gw;
                        var cpy = gy + gh - (force / maxF) * gh;
                        if (cpy >= gy) {
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(cpx, cpy, 6, 0, Math.PI * 2);
                            ctx.fill();

                            // Dashed lines
                            ctx.strokeStyle = viz.colors.orange + '66';
                            ctx.setLineDash([3, 3]);
                            ctx.beginPath();
                            ctx.moveTo(cpx, cpy);
                            ctx.lineTo(cpx, gy + gh);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(cpx, cpy);
                            ctx.lineTo(gx, cpy);
                            ctx.stroke();
                            ctx.setLineDash([]);
                        }

                        // Tick labels
                        ctx.fillStyle = viz.colors.text;
                        ctx.font = '10px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'top';
                        for (var t = 0; t <= 5; t++) {
                            ctx.fillText(t, gx + (t / maxX) * gw, gy + gh + 5);
                        }
                        ctx.textAlign = 'right';
                        ctx.textBaseline = 'middle';
                        for (var tf = 0; tf <= maxF; tf += 10) {
                            var ty = gy + gh - (tf / maxF) * gh;
                            ctx.fillText(tf, gx - 8, ty);
                        }

                        // Title
                        ctx.fillStyle = viz.colors.white;
                        ctx.font = 'bold 13px -apple-system,sans-serif';
                        ctx.textAlign = 'center';
                        ctx.fillText('F = k x x  (k = ' + k.toFixed(1) + ')', gx + gw / 2, gy - 10);
                    }

                    draw();
                }
            }],
            exercises: [
                {
                    question: 'A spring has \\( k = 5 \\) N/m. You stretch it by 0.4 m. What is the elastic force?',
                    hint: 'Use Hooke\'s Law: \\( F = k \\times x \\).',
                    solution: '\\( F = 5 \\times 0.4 = 2 \\) N. The spring pulls back with 2 Newtons of force.'
                },
                {
                    question: 'Spring A has \\( k = 2 \\) N/m and Spring B has \\( k = 10 \\) N/m. Which is stiffer? If both are stretched by the same amount, which has more force?',
                    hint: 'A bigger spring constant means a stiffer spring.',
                    solution: 'Spring B is stiffer (\\( k = 10 \\) is larger). With the same extension, Spring B produces more force because \\( F = k \\times x \\) and its \\( k \\) is bigger.'
                }
            ]
        },
        {
            id: 'spring-scale',
            title: 'The Spring Scale',
            content: `
                <h2>The Spring Scale</h2>
                <p>One of the coolest uses of Hooke's Law is the <strong>spring scale</strong> (also called a <strong>Newton meter</strong>). It uses a spring to measure force!</p>

                <h3>How It Works</h3>
                <p>A spring scale has a spring inside with a pointer attached. When you hang something from it:</p>
                <ol>
                    <li>Gravity pulls the object down with a force (its weight)</li>
                    <li>The spring stretches until the elastic force matches the weight</li>
                    <li>The pointer shows how much the spring stretched</li>
                    <li>Since \\( F = k \\times x \\), we can read the force directly!</li>
                </ol>

                <div class="viz-placeholder" data-viz="viz-spring-scale"></div>

                <div class="env-block intuition">
                    <div class="env-title">Why This Works</div>
                    <div class="env-body"><p>When the object hangs still, the spring force exactly balances gravity. The spring stretches just enough to produce a force equal to the weight. So reading the stretch tells us the weight!</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Reading a Spring Scale</div>
                    <div class="env-body">
                        <p>A spring scale has \\( k = 20 \\) N/m. When you hang a fruit from it, the spring stretches by 0.15 m.</p>
                        <p>\\[ F = k \\times x = 20 \\times 0.15 = 3 \\text{ N} \\]</p>
                        <p>The fruit weighs about 3 Newtons (that is roughly 300 grams, or about one apple).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-rubber-band-launcher"></div>

                <div class="env-block remark">
                    <div class="env-title">Elastic Force in Fun!</div>
                    <div class="env-body"><p>Elastic force is not just for measuring! Bows and arrows, catapults, and slingshots all store energy in elastic materials and release it to launch things. The more you stretch, the more energy is stored, and the farther things fly!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-spring-scale',
                    title: 'Interactive Spring Scale',
                    description: 'Choose different objects to weigh. Watch the spring stretch!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 380, scale: 1, originX: 0, originY: 0});
                        var k = 20;
                        var currentWeight = 2;
                        var animExt = 0;
                        var targetExt = currentWeight / k * 100;

                        var objects = [
                            {name: 'Apple', weight: 1, color: '#e74c3c'},
                            {name: 'Book', weight: 3, color: '#3498db'},
                            {name: 'Water Bottle', weight: 5, color: '#2ecc71'},
                            {name: 'Brick', weight: 10, color: '#e67e22'},
                            {name: 'Feather', weight: 0.1, color: '#f1c40f'}
                        ];

                        objects.forEach(function(obj) {
                            VizEngine.createButton(controls, obj.name + ' (' + obj.weight + ' N)', function() {
                                currentWeight = obj.weight;
                                targetExt = currentWeight / k * 100;
                                animateSpring();
                            });
                        });

                        function animateSpring() {
                            var diff = targetExt - animExt;
                            if (Math.abs(diff) < 0.3) {
                                animExt = targetExt;
                                draw();
                                return;
                            }
                            animExt += diff * 0.12;
                            draw();
                            requestAnimationFrame(animateSpring);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = 200;

                            // Scale housing
                            ctx.fillStyle = '#2a2a4a';
                            ctx.fillRect(cx - 30, 20, 60, 340);
                            ctx.strokeStyle = '#4a4a6a';
                            ctx.lineWidth = 2;
                            ctx.strokeRect(cx - 30, 20, 60, 340);

                            // Hook at top
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(cx, 20, 10, Math.PI, 2 * Math.PI);
                            ctx.stroke();

                            // Spring inside
                            var springTop = 40;
                            var springBottom = springTop + 80 + animExt;
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(cx, springTop);
                            var coils = 10;
                            var sLen = springBottom - springTop;
                            for (var i = 0; i <= coils * 2; i++) {
                                var py = springTop + (sLen * i) / (coils * 2);
                                var px = cx + (i % 2 === 0 ? -12 : 12);
                                ctx.lineTo(px, py);
                            }
                            ctx.lineTo(cx, springBottom);
                            ctx.stroke();

                            // Pointer
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(cx + 12, springBottom);
                            ctx.lineTo(cx + 30, springBottom - 5);
                            ctx.lineTo(cx + 30, springBottom + 5);
                            ctx.closePath();
                            ctx.fill();

                            // Scale markings
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            for (var n = 0; n <= 10; n++) {
                                var my = 120 + n * (200 / 10);
                                ctx.strokeStyle = viz.colors.muted;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(cx + 30, my);
                                ctx.lineTo(cx + 40, my);
                                ctx.stroke();
                                ctx.fillText(n + ' N', cx + 44, my + 3);
                            }

                            // Object hanging
                            if (currentWeight > 0) {
                                var objY = springBottom + 10;
                                var objR = 15 + currentWeight * 1.5;
                                var objItem = objects.find(function(o) { return o.weight === currentWeight; });
                                var objColor = objItem ? objItem.color : viz.colors.blue;
                                ctx.fillStyle = objColor;
                                ctx.beginPath();
                                ctx.arc(cx, objY + objR, objR, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                var objName = objItem ? objItem.name : '';
                                ctx.fillText(objName, cx, objY + objR);
                            }

                            // Reading display
                            ctx.fillStyle = '#1a1a3a';
                            ctx.fillRect(380, 80, 260, 100);
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(380, 80, 260, 100);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Spring Scale Reading', 510, 105);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 28px -apple-system,sans-serif';
                            var reading = (animExt / 100 * k);
                            ctx.fillText(reading.toFixed(1) + ' N', 510, 145);

                            // Extension info
                            ctx.fillStyle = '#1a1a3a';
                            ctx.fillRect(380, 200, 260, 80);
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(380, 200, 260, 80);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            var ext = (animExt / 100);
                            ctx.fillText('Extension: ' + ext.toFixed(3) + ' m', 510, 225);
                            ctx.fillText('k = ' + k + ' N/m', 510, 248);
                            ctx.fillText('F = ' + k + ' x ' + ext.toFixed(3) + ' = ' + reading.toFixed(1) + ' N', 510, 270);
                        }

                        animateSpring();
                    }
                },
                {
                    id: 'viz-rubber-band-launcher',
                    title: 'Rubber Band Launcher',
                    description: 'Pull back the rubber band and release to launch the ball! More stretch = more distance.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 300, scale: 1, originX: 0, originY: 0});
                        var pullBack = 0;
                        var ballX = 120;
                        var ballY = 200;
                        var ballVx = 0;
                        var ballVy = 0;
                        var launched = false;
                        var maxDistance = 0;
                        var gravity = 400;

                        var pullSlider = VizEngine.createSlider(controls, 'Pull back', 0, 100, 0, 1, function(val) {
                            if (!launched) {
                                pullBack = val;
                                draw();
                            }
                        });

                        VizEngine.createButton(controls, 'Launch!', function() {
                            if (!launched && pullBack > 0) {
                                launched = true;
                                ballX = 120;
                                ballY = 200;
                                ballVx = pullBack * 4;
                                ballVy = -pullBack * 3;
                                maxDistance = 0;
                                animateBall();
                            }
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            launched = false;
                            ballX = 120;
                            ballY = 200;
                            ballVx = 0;
                            ballVy = 0;
                            pullBack = 0;
                            pullSlider.value = 0;
                            draw();
                        });

                        var lastTime = 0;
                        function animateBall() {
                            if (!launched) return;
                            var dt = 0.016;
                            ballX += ballVx * dt;
                            ballVy += gravity * dt;
                            ballY += ballVy * dt;

                            if (ballX - 120 > maxDistance) maxDistance = ballX - 120;

                            if (ballY >= 200 && ballVy > 0) {
                                launched = false;
                                ballY = 200;
                                draw();
                                return;
                            }

                            draw();
                            requestAnimationFrame(animateBall);
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Ground
                            ctx.fillStyle = '#1a3a1a';
                            ctx.fillRect(0, 210, 700, 90);
                            ctx.strokeStyle = '#2a5a2a';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(0, 210);
                            ctx.lineTo(700, 210);
                            ctx.stroke();

                            // Distance markers
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            for (var d = 0; d <= 500; d += 100) {
                                var dx = 120 + d;
                                if (dx > 680) break;
                                ctx.beginPath();
                                ctx.moveTo(dx, 210);
                                ctx.lineTo(dx, 220);
                                ctx.stroke();
                                ctx.fillText(d + ' px', dx, 232);
                            }

                            // Launcher post
                            ctx.fillStyle = '#3a3a5a';
                            ctx.fillRect(105, 150, 30, 60);

                            if (!launched) {
                                // Rubber band
                                var bandEndX = 120 - pullBack * 0.8;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 4;
                                ctx.beginPath();
                                ctx.moveTo(120, 170);
                                ctx.lineTo(bandEndX, 200);
                                ctx.lineTo(120, 230);
                                ctx.stroke();

                                // Ball at pull position
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(bandEndX, 200, 10, 0, Math.PI * 2);
                                ctx.fill();

                                // Force indicator
                                if (pullBack > 5) {
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.font = '12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('Force: ' + (pullBack * 0.5).toFixed(0) + ' N', bandEndX, 180);
                                }
                            } else {
                                // Rubber band relaxed
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 4;
                                ctx.beginPath();
                                ctx.moveTo(120, 170);
                                ctx.lineTo(120, 200);
                                ctx.lineTo(120, 230);
                                ctx.stroke();

                                // Flying ball
                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath();
                                ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Max distance display
                            if (maxDistance > 0) {
                                ctx.fillStyle = viz.colors.teal;
                                ctx.font = 'bold 14px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Distance: ' + Math.round(maxDistance) + ' px', 450, 40);
                            }

                            // Stretch info
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Pull back: ' + pullBack.toFixed(0) + '%', 350, 20);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A spring scale reads 4.5 N when an apple is hung from it. If the spring constant is \\( k = 30 \\) N/m, how far did the spring stretch?',
                    hint: 'Rearrange Hooke\'s Law: \\( x = F / k \\).',
                    solution: '\\( x = F / k = 4.5 / 30 = 0.15 \\) m, or 15 cm.'
                }
            ]
        }
    ]
});
