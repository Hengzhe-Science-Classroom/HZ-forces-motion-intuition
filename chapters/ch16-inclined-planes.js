window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch16',
    number: 16,
    title: 'Inclined Planes & Screws',
    subtitle: 'Going Around Saves Effort',
    sections: [
        {
            id: 'ramp-advantage',
            title: 'The Ramp Advantage',
            content: `
                <h2>The Ramp Advantage</h2>
                <p>Imagine you need to load a heavy box into a truck. You could lift it straight up — but that is really hard! Instead, you could use a <strong>ramp</strong> (an inclined plane) to slide it up gently.</p>

                <div class="env-block definition">
                    <div class="env-title">Inclined Plane</div>
                    <div class="env-body">
                        <p>An <strong>inclined plane</strong> is a flat surface tilted at an angle. It lets you raise something to a higher level using less force — but you have to push it a longer distance along the ramp.</p>
                    </div>
                </div>

                <p>The longer and gentler the ramp, the less force you need. A steep ramp needs more force, but the distance is shorter. A gentle ramp needs less force, but you walk a longer path.</p>

                <div class="viz-placeholder" data-viz="viz-ramp-basic"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>Think about hiking up a mountain. A straight cliff is impossible to climb, but a winding trail with gentle slopes lets you reach the top easily. The trail is just a very long inclined plane!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-ramp-basic',
                    title: 'Ramp vs. Lifting',
                    description: 'Compare the force needed to lift straight up vs. using a ramp.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 350, scale: 40, originX: 50, originY: 280});
                        var rampAngle = 30;
                        var loadWeight = 100;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var angleRad = rampAngle * Math.PI / 180;
                            var height = 150;
                            var rampLength = height / Math.sin(angleRad);
                            var baseLength = height / Math.tan(angleRad);
                            var rampForce = loadWeight * Math.sin(angleRad);

                            // Scale to fit
                            var scale = Math.min(400 / baseLength, 200 / height);
                            var bx = 80;
                            var by = 280;
                            var rampEndX = bx + baseLength * scale;
                            var rampEndY = by - height * scale;

                            // Ground
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(40, by);
                            ctx.lineTo(660, by);
                            ctx.stroke();

                            // Ramp triangle
                            ctx.fillStyle = '#2a3a2a';
                            ctx.beginPath();
                            ctx.moveTo(bx, by);
                            ctx.lineTo(rampEndX, by);
                            ctx.lineTo(rampEndX, rampEndY);
                            ctx.closePath();
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.stroke();

                            // Height label
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(rampEndX + 10, by);
                            ctx.lineTo(rampEndX + 10, rampEndY);
                            ctx.stroke();
                            ctx.setLineDash([]);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('h', rampEndX + 15, (by + rampEndY) / 2);

                            // Angle arc
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.arc(bx, by, 40, -angleRad, 0);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText(rampAngle + '°', bx + 45, by - 10);

                            // Box on ramp
                            var boxDist = 0.4;
                            var boxX = bx + baseLength * scale * boxDist;
                            var boxY = by - height * scale * boxDist;
                            ctx.save();
                            ctx.translate(boxX, boxY);
                            ctx.rotate(-angleRad);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(-18, -30, 36, 30);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(loadWeight + ' N', 0, -15);
                            ctx.restore();

                            // Force arrow along ramp
                            var arrowLen = 60;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(boxX - 25, boxY + 10);
                            var ax = boxX - 25 + arrowLen * Math.cos(-angleRad + Math.PI);
                            var ay = boxY + 10 + arrowLen * Math.sin(-angleRad + Math.PI);
                            ctx.lineTo(boxX + arrowLen * Math.cos(angleRad) * 0.5, boxY - arrowLen * Math.sin(angleRad) * 0.5);
                            ctx.stroke();

                            // Comparison panel (right side)
                            var px = 480;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Comparison:', px, 50);

                            // Lift straight up
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('Lift straight up:', px, 80);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Force = ' + loadWeight + ' N', px, 100);

                            // Use ramp
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Use ramp (' + rampAngle + '°):', px, 140);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Force = ' + rampForce.toFixed(1) + ' N', px, 160);

                            // Savings
                            var savings = ((1 - rampForce / loadWeight) * 100).toFixed(0);
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.fillText('Save ' + savings + '% effort!', px, 200);

                            // Trade-off
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('But push ' + (1 / Math.sin(angleRad)).toFixed(1) + 'x the distance', px, 225);
                        }

                        VizEngine.createSlider(controls, 'Ramp Angle (°)', 5, 80, rampAngle, 5, function(v) { rampAngle = v; draw(); });
                        VizEngine.createSlider(controls, 'Load Weight (N)', 50, 200, loadWeight, 10, function(v) { loadWeight = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A ramp is 5 meters long and 1 meter high. To push a 100 N box up, how much force is needed along the ramp (ignoring friction)?',
                    hint: 'Force along ramp = Weight x (height / ramp length).',
                    solution: 'Force = 100 x (1/5) = 20 N. The ramp reduces the needed force to just one-fifth of the weight!'
                },
                {
                    question: 'Why do parking garages use spiral ramps instead of elevators for cars?',
                    hint: 'Think about the advantage of a gentle slope.',
                    solution: 'A spiral ramp is a long, gentle inclined plane. Cars can drive up under their own power because the ramp makes the climb gradual. An elevator strong enough to lift a car would be very expensive and slow.'
                }
            ]
        },
        {
            id: 'ramp-force',
            title: 'Calculating Ramp Force',
            content: `
                <h2>Calculating Ramp Force</h2>
                <p>We can figure out exactly how much force is needed to push something up a ramp. It depends on the angle!</p>

                <div class="env-block definition">
                    <div class="env-title">The Ramp Equation</div>
                    <div class="env-body">
                        <p>The force needed to push an object up a smooth ramp (no friction) is:</p>
                        <p>\\[ F_{\\text{ramp}} = W \\times \\sin(\\theta) \\]</p>
                        <p>where \\(W\\) is the weight of the object and \\(\\theta\\) is the angle of the ramp.</p>
                        <p>This can also be written as:</p>
                        <p>\\[ F_{\\text{ramp}} = W \\times \\frac{\\text{height}}{\\text{ramp length}} \\]</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-ramp-force-calc"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A box weighs 200 N. The ramp is 4 meters long and 1 meter high.</p>
                        <p>\\( F = 200 \\times \\frac{1}{4} = 50 \\text{ N} \\)</p>
                        <p>You only need 50 N instead of 200 N! But you push for 4 meters instead of lifting 1 meter.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Conservation of Energy</div>
                    <div class="env-body"><p>Notice that Force x Distance is the same either way: \\(200 \\times 1 = 50 \\times 4 = 200\\) Joules. The ramp does not save work — it just spreads it over a longer distance so you use less force at each moment.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-ramp-force-calc',
                    title: 'Inclined Plane Force Calculator',
                    description: 'Change the angle and see how the needed force changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 350, scale: 40, originX: 350, originY: 175});
                        var angle = 30;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var rad = angle * Math.PI / 180;
                            var weight = 100;
                            var forceRamp = weight * Math.sin(rad);
                            var forceNormal = weight * Math.cos(rad);

                            var cx = 300, cy = 250;
                            var rampLen = 260;
                            var topX = cx + rampLen * Math.cos(rad);
                            var topY = cy - rampLen * Math.sin(rad);
                            var baseX = cx + rampLen * Math.cos(rad);

                            // Ramp
                            ctx.fillStyle = '#1a2a3a';
                            ctx.beginPath();
                            ctx.moveTo(cx, cy);
                            ctx.lineTo(baseX, cy);
                            ctx.lineTo(topX, topY);
                            ctx.closePath();
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Object on ramp
                            var objDist = 0.45;
                            var objX = cx + rampLen * objDist * Math.cos(rad);
                            var objY = cy - rampLen * objDist * Math.sin(rad);

                            ctx.save();
                            ctx.translate(objX, objY);
                            ctx.rotate(-rad);

                            // Box
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillRect(-18, -30, 36, 30);

                            // Weight arrow (down in rotated frame)
                            ctx.restore();

                            // Weight vector (straight down)
                            var arrowScale = 0.8;
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(objX, objY);
                            ctx.lineTo(objX, objY + weight * arrowScale);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.red;
                            ctx.beginPath();
                            ctx.moveTo(objX, objY + weight * arrowScale + 5);
                            ctx.lineTo(objX - 8, objY + weight * arrowScale - 8);
                            ctx.lineTo(objX + 8, objY + weight * arrowScale - 8);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('W = ' + weight + ' N', objX + 12, objY + weight * arrowScale * 0.5);

                            // Force along ramp (component)
                            var fLen = forceRamp * arrowScale;
                            var fDirX = Math.cos(rad);
                            var fDirY = -Math.sin(rad);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.setLineDash([6, 4]);
                            ctx.beginPath();
                            ctx.moveTo(objX, objY + weight * arrowScale + 5);
                            ctx.lineTo(objX - fLen * fDirX, objY + weight * arrowScale + 5 + fLen * fDirY);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Angle label
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(angle + '°', cx + 55, cy - 12);

                            // Force results panel
                            var px = 30;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Force Breakdown', px, 40);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('Weight: ' + weight + ' N (down)', px, 70);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Along ramp: ' + forceRamp.toFixed(1) + ' N', px, 95);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Perpendicular: ' + forceNormal.toFixed(1) + ' N', px, 120);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('F = W x sin(' + angle + '°) = ' + forceRamp.toFixed(1) + ' N', px, 155);
                        }

                        VizEngine.createSlider(controls, 'Ramp Angle (°)', 5, 85, angle, 5, function(v) { angle = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A 500 N crate needs to be pushed up a ramp at 20 degrees. What force is needed along the ramp? (sin 20° is about 0.34)',
                    hint: 'Use the formula F = W x sin(angle).',
                    solution: 'F = 500 x sin(20°) = 500 x 0.34 = 170 N. Much less than lifting 500 N straight up!'
                }
            ]
        },
        {
            id: 'screws-wrapped-ramps',
            title: 'Screws: Wrapped Ramps',
            content: `
                <h2>Screws: Wrapped Ramps</h2>
                <p>Here is a surprising fact: a <strong>screw</strong> is really just an inclined plane wrapped around a cylinder! Look closely at a screw — the thread spirals around like a tiny ramp going up.</p>

                <div class="env-block definition">
                    <div class="env-title">The Screw</div>
                    <div class="env-body">
                        <p>A <strong>screw</strong> converts rotational motion into linear motion. When you turn a screw, the thread (which is a wrapped ramp) pushes it forward into the material. Each full turn moves the screw forward by one thread spacing, called the <strong>pitch</strong>.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-screw-ramp"></div>

                <div class="env-block example">
                    <div class="env-title">Why Screws Are Powerful</div>
                    <div class="env-body">
                        <p>When you turn a screwdriver, your hand travels a large circle. But the screw only moves forward a tiny bit (one pitch). This gives a huge mechanical advantage! A small turning force creates a large forward force.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>Try wrapping a right triangle (a ramp shape) of paper around a pencil. You will see the long edge of the triangle spiral around just like a screw thread! This shows that a screw really is a wrapped inclined plane.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-screw-ramp',
                    title: 'Screw as Spiral Ramp',
                    description: 'Watch a ramp wrap around a cylinder to become a screw.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 350, scale: 40, originX: 350, originY: 175});
                        var wrapAmount = 0;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            if (wrapAmount < 0.3) {
                                // Show flat ramp
                                var rampW = 300;
                                var rampH = 120;
                                var rx = 200;
                                var ry = 280;

                                ctx.fillStyle = '#2a3a2a';
                                ctx.beginPath();
                                ctx.moveTo(rx, ry);
                                ctx.lineTo(rx + rampW, ry);
                                ctx.lineTo(rx + rampW, ry - rampH);
                                ctx.closePath();
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.stroke();

                                // Label
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('An inclined plane (ramp)', 350, 50);
                                ctx.font = '14px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.muted;
                                ctx.fillText('Move the slider to wrap it around a cylinder...', 350, 80);

                                // Dimensions
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('length', rx + rampW / 2, ry + 20);
                                ctx.fillText('height (pitch)', rx + rampW + 30, ry - rampH / 2);
                            } else {
                                // Show screw
                                var screwX = 350;
                                var screwTop = 80;
                                var screwBot = 300;
                                var screwR = 20;

                                // Cylinder body
                                ctx.fillStyle = '#3a3a5a';
                                ctx.fillRect(screwX - screwR, screwTop, screwR * 2, screwBot - screwTop);
                                ctx.strokeStyle = viz.colors.muted;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(screwX - screwR, screwTop, screwR * 2, screwBot - screwTop);

                                // Thread (spiral)
                                var turns = 6;
                                var pitch = (screwBot - screwTop) / turns;
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 3;
                                for (var t = 0; t < turns; t++) {
                                    var ty = screwTop + t * pitch;
                                    // Thread extending outward
                                    ctx.beginPath();
                                    ctx.moveTo(screwX - screwR - 8, ty);
                                    ctx.lineTo(screwX + screwR + 8, ty + pitch * 0.5);
                                    ctx.stroke();
                                }

                                // Screw tip
                                ctx.fillStyle = '#3a3a5a';
                                ctx.beginPath();
                                ctx.moveTo(screwX - screwR, screwBot);
                                ctx.lineTo(screwX, screwBot + 25);
                                ctx.lineTo(screwX + screwR, screwBot);
                                ctx.closePath();
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.muted;
                                ctx.stroke();

                                // Pitch label
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(screwX + screwR + 20, screwTop + pitch);
                                ctx.lineTo(screwX + screwR + 20, screwTop + pitch * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.fillText('pitch', screwX + screwR + 25, screwTop + pitch * 1.5);

                                // Labels
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = 'bold 16px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('A screw = wrapped ramp!', 350, 40);

                                ctx.fillStyle = viz.colors.muted;
                                ctx.font = '13px -apple-system,sans-serif';
                                ctx.fillText('The thread spirals like', 150, 160);
                                ctx.fillText('a ramp around a pole.', 150, 180);
                                ctx.fillText('Each turn moves forward', 560, 160);
                                ctx.fillText('by one pitch distance.', 560, 180);

                                // Rotation arrow
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(screwX, screwTop - 15, 25, 0.5, Math.PI * 1.5);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath();
                                var arrowAngle = Math.PI * 1.5;
                                ctx.moveTo(screwX + 25 * Math.cos(arrowAngle), screwTop - 15 + 25 * Math.sin(arrowAngle));
                                ctx.lineTo(screwX + 20 * Math.cos(arrowAngle) + 8, screwTop - 15 + 25 * Math.sin(arrowAngle) + 6);
                                ctx.lineTo(screwX + 30 * Math.cos(arrowAngle) + 2, screwTop - 15 + 25 * Math.sin(arrowAngle) + 6);
                                ctx.closePath();
                                ctx.fill();
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('Turn', screwX, screwTop - 45);
                            }
                        }

                        VizEngine.createSlider(controls, 'Wrap Around', 0, 1, wrapAmount, 0.1, function(v) { wrapAmount = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'How is a screw similar to an inclined plane?',
                    hint: 'Think about what happens if you unwrap the thread of a screw.',
                    solution: 'A screw is an inclined plane (ramp) wrapped around a cylinder. The thread acts like a spiral ramp. When you turn the screw, you are essentially pushing along this tiny ramp, converting a large circular motion into a small forward motion with great force.'
                }
            ]
        },
        {
            id: 'wedges',
            title: 'Wedges',
            content: `
                <h2>Wedges: Splitting Force</h2>
                <p>A <strong>wedge</strong> is another form of the inclined plane. While a ramp stays still and you push objects up it, a wedge moves through or into materials to split them apart or hold them in place.</p>

                <div class="env-block definition">
                    <div class="env-title">Wedge</div>
                    <div class="env-body">
                        <p>A wedge is like two inclined planes stuck together back-to-back. When you push a wedge forward, the sloped sides push outward, splitting things apart. The thinner the wedge, the greater the splitting force.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-wedge"></div>

                <div class="env-block example">
                    <div class="env-title">Wedges Everywhere</div>
                    <div class="env-body">
                        <p><strong>Axe:</strong> The blade is a wedge that splits wood.</p>
                        <p><strong>Knife:</strong> The sharp edge is a very thin wedge.</p>
                        <p><strong>Door stopper:</strong> A wedge that holds a door open.</p>
                        <p><strong>Your teeth:</strong> Front teeth are wedge-shaped for biting!</p>
                        <p><strong>Zipper:</strong> Uses a tiny wedge to open and close the teeth.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>A sharp knife cuts better than a dull one because it is a thinner wedge. The thinner the wedge, the more the downward force gets converted into sideways splitting force. This is why we sharpen blades!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-wedge',
                    title: 'Wedge Splitting Demo',
                    description: 'See how a wedge converts downward force into sideways splitting force.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 350, scale: 40, originX: 350, originY: 175});
                        var wedgeAngle = 30;
                        var pushForce = 100;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var halfAngle = (wedgeAngle / 2) * Math.PI / 180;
                            var splitForce = pushForce / (2 * Math.tan(halfAngle));

                            var cx = 350, tipY = 280, topY = 80;
                            var halfWidth = (tipY - topY) * Math.tan(halfAngle);

                            // Wood block (split)
                            var gap = Math.min(halfWidth * 0.5, 30);
                            ctx.fillStyle = '#4a3020';
                            ctx.fillRect(cx - halfWidth - gap - 60, 100, 60, 200);
                            ctx.fillRect(cx + halfWidth + gap, 100, 60, 200);

                            // Crack lines
                            ctx.strokeStyle = '#2a1a10';
                            ctx.lineWidth = 1;
                            for (var i = 0; i < 5; i++) {
                                var cy = 120 + i * 35;
                                ctx.beginPath();
                                ctx.moveTo(cx - halfWidth - gap - 50, cy);
                                ctx.lineTo(cx - halfWidth - gap - 10, cy + 5);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(cx + halfWidth + gap + 50, cy);
                                ctx.lineTo(cx + halfWidth + gap + 10, cy + 5);
                                ctx.stroke();
                            }

                            // Wedge
                            ctx.fillStyle = viz.colors.teal + 'cc';
                            ctx.beginPath();
                            ctx.moveTo(cx, tipY);
                            ctx.lineTo(cx - halfWidth, topY);
                            ctx.lineTo(cx + halfWidth, topY);
                            ctx.closePath();
                            ctx.fill();
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Push force arrow (down)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(cx, 30);
                            ctx.lineTo(cx, topY - 5);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(cx, topY);
                            ctx.lineTo(cx - 8, topY - 15);
                            ctx.lineTo(cx + 8, topY - 15);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(pushForce + ' N', cx, 22);

                            // Split force arrows (sideways)
                            var arrowY = 190;
                            // Left
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(cx - halfWidth, arrowY);
                            ctx.lineTo(cx - halfWidth - 70, arrowY);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(cx - halfWidth - 75, arrowY);
                            ctx.lineTo(cx - halfWidth - 58, arrowY - 8);
                            ctx.lineTo(cx - halfWidth - 58, arrowY + 8);
                            ctx.closePath();
                            ctx.fill();

                            // Right
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(cx + halfWidth, arrowY);
                            ctx.lineTo(cx + halfWidth + 70, arrowY);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(cx + halfWidth + 75, arrowY);
                            ctx.lineTo(cx + halfWidth + 58, arrowY - 8);
                            ctx.lineTo(cx + halfWidth + 58, arrowY + 8);
                            ctx.closePath();
                            ctx.fill();

                            // Labels
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'right';
                            ctx.fillText(splitForce.toFixed(0) + ' N', cx - halfWidth - 80, arrowY - 5);
                            ctx.textAlign = 'left';
                            ctx.fillText(splitForce.toFixed(0) + ' N', cx + halfWidth + 80, arrowY - 5);

                            // Angle label
                            ctx.fillStyle = viz.colors.yellow;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(wedgeAngle + '°', cx, tipY - 25);

                            // Info
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('Thinner wedge = more splitting force', 350, 330);
                        }

                        VizEngine.createSlider(controls, 'Wedge Angle (°)', 10, 90, wedgeAngle, 5, function(v) { wedgeAngle = v; draw(); });
                        VizEngine.createSlider(controls, 'Push Force (N)', 50, 200, pushForce, 10, function(v) { pushForce = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why is a sharp knife easier to cut with than a dull knife?',
                    hint: 'Think about the angle of the wedge.',
                    solution: 'A sharp knife has a thinner wedge angle, which converts more of the downward push into sideways splitting force. A dull knife has a wider angle and wastes more force pushing down instead of cutting sideways.'
                },
                {
                    question: 'Name two wedges you can find at home and explain how they work.',
                    hint: 'Look in the kitchen, at doors, or in your toolbox.',
                    solution: 'Examples: A kitchen knife (thin wedge that splits food apart), a door stopper (wedge pushed under the door to hold it), a nail (pointed wedge pushed into wood), or a chisel (wedge for carving).'
                }
            ]
        }
    ]
});
