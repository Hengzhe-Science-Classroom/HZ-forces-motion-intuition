window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch17',
    number: 17,
    title: 'Wheels & Gears',
    subtitle: 'The Power of Turning',
    sections: [
        {
            id: 'wheel-and-axle',
            title: 'Wheel and Axle',
            content: `
                <h2>Wheel and Axle</h2>
                <p>A <strong>wheel and axle</strong> is a simple machine made of a large wheel attached to a smaller rod called an axle. They spin together. When you turn the wheel, the axle turns too — but with greater force!</p>

                <div class="env-block definition">
                    <div class="env-title">How It Works</div>
                    <div class="env-body">
                        <p>The wheel and axle works like a rotating lever. The center of the axle is the fulcrum. The wheel's radius is the effort arm, and the axle's radius is the load arm.</p>
                        <p>\\[ \\text{Mechanical Advantage} = \\frac{\\text{Radius of Wheel}}{\\text{Radius of Axle}} \\]</p>
                        <p>A bigger wheel compared to the axle means more force multiplication!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-wheel-axle"></div>

                <div class="env-block example">
                    <div class="env-title">Everyday Examples</div>
                    <div class="env-body">
                        <p><strong>Steering wheel:</strong> The large wheel lets you turn the car's axle with little effort.</p>
                        <p><strong>Doorknob:</strong> The round knob is the wheel; the square rod inside is the axle.</p>
                        <p><strong>Screwdriver:</strong> The handle is the wheel; the shaft is the axle.</p>
                        <p><strong>Water faucet:</strong> The handle turns a small valve stem.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>Try opening a door by grabbing the narrow axle rod instead of the doorknob. It is much harder! The doorknob gives you a larger radius to push with, multiplying your turning force. This is why doorknobs exist!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-wheel-axle',
                    title: 'Wheel and Axle Force Multiplier',
                    description: 'See how a larger wheel multiplies force at the axle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 350, scale: 40, originX: 350, originY: 175});
                        var wheelRadius = 4;
                        var axleRadius = 1;
                        var effortForce = 20;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var cx = 300, cy = 175;
                            var ma = wheelRadius / axleRadius;
                            var loadForce = effortForce * ma;
                            var scale = 28;

                            // Wheel (outer circle)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.arc(cx, cy, wheelRadius * scale, 0, Math.PI * 2);
                            ctx.stroke();

                            // Wheel fill
                            ctx.fillStyle = viz.colors.blue + '15';
                            ctx.beginPath();
                            ctx.arc(cx, cy, wheelRadius * scale, 0, Math.PI * 2);
                            ctx.fill();

                            // Axle (inner circle)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.arc(cx, cy, axleRadius * scale, 0, Math.PI * 2);
                            ctx.stroke();

                            ctx.fillStyle = viz.colors.orange + '30';
                            ctx.beginPath();
                            ctx.arc(cx, cy, axleRadius * scale, 0, Math.PI * 2);
                            ctx.fill();

                            // Center dot
                            ctx.fillStyle = viz.colors.white;
                            ctx.beginPath();
                            ctx.arc(cx, cy, 4, 0, Math.PI * 2);
                            ctx.fill();

                            // Radius lines
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 3]);
                            ctx.beginPath();
                            ctx.moveTo(cx, cy);
                            ctx.lineTo(cx + wheelRadius * scale, cy);
                            ctx.stroke();

                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(cx, cy);
                            ctx.lineTo(cx, cy - axleRadius * scale);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Radius labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('R = ' + wheelRadius, cx + wheelRadius * scale / 2, cy + 18);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('r = ' + axleRadius, cx + 18, cy - axleRadius * scale / 2);

                            // Effort arrow on wheel (tangent, right side going down)
                            var ey = cy - wheelRadius * scale;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(cx + 10, ey);
                            ctx.lineTo(cx + 60, ey);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(cx + 65, ey);
                            ctx.lineTo(cx + 50, ey - 7);
                            ctx.lineTo(cx + 50, ey + 7);
                            ctx.closePath();
                            ctx.fill();
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Effort: ' + effortForce + ' N', cx + 70, ey + 5);

                            // Load arrow on axle
                            var ly = cy + axleRadius * scale;
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(cx + 10, ly);
                            ctx.lineTo(cx + 60, ly);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.moveTo(cx + 65, ly);
                            ctx.lineTo(cx + 50, ly - 7);
                            ctx.lineTo(cx + 50, ly + 7);
                            ctx.closePath();
                            ctx.fill();
                            ctx.fillText('Load: ' + loadForce.toFixed(0) + ' N', cx + 70, ly + 5);

                            // Info panel
                            var px = 520;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 15px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Mechanical Advantage', px, 60);

                            ctx.font = '14px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillText('MA = R / r = ' + wheelRadius + ' / ' + axleRadius + ' = ' + ma.toFixed(1), px, 90);

                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('Effort: ' + effortForce + ' N', px, 130);
                            ctx.fillText('Load: ' + loadForce.toFixed(0) + ' N', px, 155);

                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('Force multiplied ' + ma.toFixed(1) + 'x!', px, 190);

                            // Labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Wheel', cx, cy + wheelRadius * scale + 20);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Axle', cx, cy + axleRadius * scale + 18);
                        }

                        VizEngine.createSlider(controls, 'Wheel Radius', 2, 6, wheelRadius, 0.5, function(v) { wheelRadius = v; draw(); });
                        VizEngine.createSlider(controls, 'Axle Radius', 0.5, 3, axleRadius, 0.5, function(v) { axleRadius = v; draw(); });
                        VizEngine.createSlider(controls, 'Effort (N)', 5, 50, effortForce, 5, function(v) { effortForce = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A steering wheel has a radius of 20 cm and its axle has a radius of 2 cm. What is the mechanical advantage?',
                    hint: 'Divide the wheel radius by the axle radius.',
                    solution: 'MA = 20/2 = 10. The steering wheel multiplies your turning force by 10!'
                },
                {
                    question: 'Why is it harder to turn a door by the narrow latch rod than by the round doorknob?',
                    hint: 'Think about the radius of each.',
                    solution: 'The doorknob has a much larger radius than the narrow latch rod. A larger radius means you apply force farther from the center, giving you more mechanical advantage (more torque for the same effort).'
                }
            ]
        },
        {
            id: 'gear-basics',
            title: 'Gear Basics',
            content: `
                <h2>Gear Basics</h2>
                <p>A <strong>gear</strong> is a wheel with teeth around its edge. When two gears mesh (their teeth interlock), turning one gear makes the other turn too. Gears transfer and transform rotational motion.</p>

                <div class="env-block definition">
                    <div class="env-title">Key Gear Facts</div>
                    <div class="env-body">
                        <p>When two gears mesh:</p>
                        <p>1. They turn in <strong>opposite directions</strong>.</p>
                        <p>2. Their teeth move at the <strong>same speed</strong> where they touch.</p>
                        <p>3. A small gear turns <strong>faster</strong> than a large gear.</p>
                        <p>4. A large gear turns with <strong>more force</strong> than a small gear.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-gear-mesh"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>Gears are everywhere in machines! Clocks use dozens of tiny gears to keep time. Cars use gears to change speed. Even a hand-cranked pencil sharpener uses gears. Whenever you need to change the speed or force of rotation, gears are the answer.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-gear-mesh',
                    title: 'Gear Meshing Simulator',
                    description: 'Watch two gears mesh and turn together.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 350, scale: 40, originX: 350, originY: 175});
                        var teethA = 20;
                        var teethB = 10;
                        var speed = 1;
                        var angle = 0;

                        function drawGear(ctx, cx, cy, radius, teeth, rotation, color) {
                            var toothDepth = 8;
                            var toothWidth = Math.PI / teeth;

                            ctx.save();
                            ctx.translate(cx, cy);
                            ctx.rotate(rotation);

                            ctx.beginPath();
                            for (var i = 0; i < teeth; i++) {
                                var a1 = (i * 2 * Math.PI) / teeth;
                                var a2 = a1 + toothWidth * 0.3;
                                var a3 = a1 + toothWidth * 0.7;
                                var a4 = a1 + toothWidth;

                                ctx.lineTo((radius) * Math.cos(a1), (radius) * Math.sin(a1));
                                ctx.lineTo((radius + toothDepth) * Math.cos(a2), (radius + toothDepth) * Math.sin(a2));
                                ctx.lineTo((radius + toothDepth) * Math.cos(a3), (radius + toothDepth) * Math.sin(a3));
                                ctx.lineTo((radius) * Math.cos(a4), (radius) * Math.sin(a4));
                            }
                            ctx.closePath();
                            ctx.fillStyle = color + '40';
                            ctx.fill();
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Center circle
                            ctx.beginPath();
                            ctx.arc(0, 0, 8, 0, Math.PI * 2);
                            ctx.fillStyle = color;
                            ctx.fill();

                            // Spoke line for rotation visibility
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(0, 0);
                            ctx.lineTo(radius * 0.7, 0);
                            ctx.stroke();

                            ctx.restore();
                        }

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            var radiusA = teethA * 2.5;
                            var radiusB = teethB * 2.5;
                            var gap = 6;
                            var cxA = 280 - radiusA * 0.3;
                            var cxB = cxA + radiusA + radiusB + gap;
                            var cy = 190;

                            var rotA = angle;
                            var rotB = -angle * (teethA / teethB);

                            drawGear(ctx, cxA, cy, radiusA, teethA, rotA, viz.colors.blue);
                            drawGear(ctx, cxB, cy, radiusB, teethB, rotB, viz.colors.orange);

                            // Labels
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = 'bold 13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Gear A: ' + teethA + ' teeth', cxA, cy + radiusA + 30);

                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Gear B: ' + teethB + ' teeth', cxB, cy + radiusB + 30);

                            // Info
                            var ratio = teethA / teethB;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Gear Ratio: ' + teethA + ':' + teethB + ' = ' + ratio.toFixed(1) + ':1', 30, 30);

                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.muted;
                            ctx.fillText('Gear B turns ' + ratio.toFixed(1) + 'x faster than Gear A', 30, 55);
                            ctx.fillText('Gear A has ' + ratio.toFixed(1) + 'x more torque than Gear B', 30, 75);

                            // Direction arrows
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Gear A: clockwise', 30, 320);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Gear B: counter-clockwise', 30, 340);
                        }

                        viz.animate(function(t) {
                            angle += speed * 0.01;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Gear A Teeth', 8, 30, teethA, 2, function(v) { teethA = v; });
                        VizEngine.createSlider(controls, 'Gear B Teeth', 6, 24, teethB, 2, function(v) { teethB = v; });
                        VizEngine.createSlider(controls, 'Speed', 0, 3, speed, 0.5, function(v) { speed = v; });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Two meshing gears have 30 and 10 teeth. If the 30-tooth gear turns once, how many times does the 10-tooth gear turn?',
                    hint: 'Divide the number of teeth on the driving gear by the driven gear.',
                    solution: 'The 10-tooth gear turns 30/10 = 3 times for each turn of the 30-tooth gear. Smaller gears spin faster!'
                }
            ]
        },
        {
            id: 'gear-ratios',
            title: 'Gear Ratios',
            content: `
                <h2>Gear Ratios: Speed vs. Force</h2>
                <p>The <strong>gear ratio</strong> tells you how the speed and force change between two connected gears.</p>

                <div class="env-block definition">
                    <div class="env-title">Gear Ratio</div>
                    <div class="env-body">
                        <p>\\[ \\text{Gear Ratio} = \\frac{\\text{Teeth on Driven Gear}}{\\text{Teeth on Driving Gear}} \\]</p>
                        <p>If the ratio is <strong>greater than 1</strong>: the output is slower but has more force (like going uphill).</p>
                        <p>If the ratio is <strong>less than 1</strong>: the output is faster but has less force (like going fast on flat ground).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A motor gear has 10 teeth and drives a wheel gear with 40 teeth.</p>
                        <p>Gear ratio = 40/10 = 4:1</p>
                        <p>The wheel turns 4 times slower than the motor, but with 4 times the torque (turning force). This is great for climbing hills!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-gear-ratio"></div>

                <div class="env-block remark">
                    <div class="env-title">Gear Trains</div>
                    <div class="env-body"><p>You can chain multiple gear pairs together to get very large or very small ratios. A clock uses a gear train where one gear turns once per hour, and through several pairs of gears, the second hand turns once per minute — 60 times faster!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-gear-ratio',
                    title: 'Gear Ratio Explorer',
                    description: 'See how gear ratio affects speed and force.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 350, scale: 40, originX: 350, originY: 175});
                        var drivingTeeth = 10;
                        var drivenTeeth = 30;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var ratio = drivenTeeth / drivingTeeth;

                            // Bar chart comparison
                            var barStartX = 100;
                            var barY = 80;
                            var barMaxW = 250;
                            var barH = 30;

                            // Speed comparison
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Speed', 30, barY + 10);

                            // Driving speed bar (reference = 1)
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(barStartX, barY - barH / 2, barMaxW, barH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Input: 1x', barStartX + 5, barY + 5);

                            // Driven speed bar
                            var drivenSpeedW = barMaxW / ratio;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(barStartX, barY + barH + 5, drivenSpeedW, barH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Output: ' + (1 / ratio).toFixed(2) + 'x', barStartX + 5, barY + barH + 20);

                            // Force comparison
                            var forceY = barY + barH * 3 + 20;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.fillText('Force (Torque)', 30, forceY + 10);

                            // Driving force bar
                            var forceBarMax = 250;
                            var inputW = forceBarMax / Math.max(ratio, 1);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillRect(barStartX, forceY - barH / 2, inputW, barH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Input: 1x', barStartX + 5, forceY + 5);

                            // Driven force bar
                            var outputW = Math.min(inputW * ratio, forceBarMax);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillRect(barStartX, forceY + barH + 5, outputW, barH);
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillText('Output: ' + ratio.toFixed(1) + 'x', barStartX + 5, forceY + barH + 20);

                            // Gear ratio display
                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 18px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Gear Ratio = ' + drivenTeeth + ':' + drivingTeeth + ' = ' + ratio.toFixed(1) + ':1', 350, 30);

                            // Gear icons
                            var gx = 550;
                            // Small driving gear
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(gx, 120, drivingTeeth * 1.5, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillText('Drive', gx, 120);
                            ctx.fillText(drivingTeeth + 'T', gx, 135);

                            // Large driven gear
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(gx, 250, Math.min(drivenTeeth * 1.5, 60), 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Driven', gx, 250);
                            ctx.fillText(drivenTeeth + 'T', gx, 265);

                            // Result summary
                            ctx.fillStyle = viz.colors.green;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            if (ratio > 1) {
                                ctx.fillText('More torque, less speed (power mode)', 280, 310);
                            } else if (ratio < 1) {
                                ctx.fillText('More speed, less torque (speed mode)', 280, 310);
                            } else {
                                ctx.fillText('Equal speed and torque (1:1)', 280, 310);
                            }
                        }

                        VizEngine.createSlider(controls, 'Driving Gear Teeth', 6, 30, drivingTeeth, 2, function(v) { drivingTeeth = v; draw(); });
                        VizEngine.createSlider(controls, 'Driven Gear Teeth', 6, 40, drivenTeeth, 2, function(v) { drivenTeeth = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A motor gear with 15 teeth drives a gear with 45 teeth. What is the gear ratio? Is the output faster or slower?',
                    hint: 'Gear ratio = driven teeth / driving teeth. Ratio greater than 1 means slower output.',
                    solution: 'Gear ratio = 45/15 = 3:1. The output is 3 times slower but has 3 times the torque. This is useful for applications needing high force like lifting.'
                }
            ]
        },
        {
            id: 'bicycle-gears',
            title: 'Bicycle Gears',
            content: `
                <h2>Bicycle Gears</h2>
                <p>One of the best examples of gears in daily life is a <strong>bicycle</strong>! When you shift gears on a bike, you are changing the gear ratio between the pedal gear (chainring) and the wheel gear (sprocket).</p>

                <div class="env-block definition">
                    <div class="env-title">Bicycle Gear System</div>
                    <div class="env-body">
                        <p><strong>Low gear</strong> (big sprocket, small chainring): Easy to pedal, but you go slowly. Great for climbing hills!</p>
                        <p><strong>High gear</strong> (small sprocket, big chainring): Hard to pedal, but each pedal turn takes you far. Great for going fast on flat roads!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-bicycle-gears"></div>

                <div class="env-block example">
                    <div class="env-title">How Bike Gears Work</div>
                    <div class="env-body">
                        <p>A bicycle chain connects the front chainring (where you pedal) to the rear sprocket (on the back wheel).</p>
                        <p>If the chainring has 40 teeth and the sprocket has 20 teeth:</p>
                        <p>Each pedal turn = 40/20 = 2 wheel turns. You go fast!</p>
                        <p>If the chainring has 30 teeth and the sprocket has 30 teeth:</p>
                        <p>Each pedal turn = 30/30 = 1 wheel turn. Balanced speed and effort.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>Next time you ride a bike, pay attention to how shifting gears changes the feel. Low gears feel easy to spin but you move slowly. High gears feel heavy but you fly down the road. You are experiencing gear ratios in action!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-bicycle-gears',
                    title: 'Bicycle Gear System',
                    description: 'Switch between gears and see how speed and effort change.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 380, scale: 40, originX: 350, originY: 190});
                        var gearMode = 1; // 0=low, 1=medium, 2=high
                        var angle = 0;
                        var pedalAngle = 0;

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            var configs = [
                                {chainring: 28, sprocket: 28, label: 'Low Gear (Hill Climbing)', color: viz.colors.green},
                                {chainring: 38, sprocket: 19, label: 'Medium Gear (Cruising)', color: viz.colors.blue},
                                {chainring: 48, sprocket: 12, label: 'High Gear (Speed)', color: viz.colors.orange}
                            ];
                            var cfg = configs[gearMode];
                            var ratio = cfg.chainring / cfg.sprocket;

                            // Animation
                            var pedalSpeed = 0.02;
                            pedalAngle += pedalSpeed;
                            var wheelAngle = pedalAngle * ratio;

                            // Title
                            ctx.fillStyle = cfg.color;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(cfg.label, 350, 25);

                            // Frame
                            var chainringX = 250, chainringY = 230;
                            var sprocketX = 470, sprocketY = 230;
                            var chainringR = cfg.chainring * 0.8;
                            var sprocketR = cfg.sprocket * 0.8;

                            // Frame triangle
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.moveTo(chainringX, chainringY);
                            ctx.lineTo(sprocketX, sprocketY);
                            ctx.lineTo(350, 140);
                            ctx.lineTo(chainringX, chainringY);
                            ctx.stroke();

                            // Seat
                            ctx.fillStyle = '#4a3a2a';
                            ctx.fillRect(335, 130, 30, 8);

                            // Handlebars
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(sprocketX - 30, 140);
                            ctx.lineTo(sprocketX + 10, 120);
                            ctx.stroke();

                            // Chainring
                            ctx.strokeStyle = cfg.color;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(chainringX, chainringY, chainringR, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.fillStyle = cfg.color;
                            ctx.beginPath();
                            ctx.arc(chainringX, chainringY, 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Chainring teeth marks
                            for (var i = 0; i < cfg.chainring / 2; i++) {
                                var ta = pedalAngle + (i * 2 * Math.PI) / (cfg.chainring / 2);
                                ctx.beginPath();
                                ctx.moveTo(chainringX + chainringR * Math.cos(ta), chainringY + chainringR * Math.sin(ta));
                                ctx.lineTo(chainringX + (chainringR + 5) * Math.cos(ta), chainringY + (chainringR + 5) * Math.sin(ta));
                                ctx.stroke();
                            }

                            // Pedal arms
                            var pedalLen = 30;
                            ctx.strokeStyle = viz.colors.white;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(chainringX + pedalLen * Math.cos(pedalAngle), chainringY + pedalLen * Math.sin(pedalAngle));
                            ctx.lineTo(chainringX - pedalLen * Math.cos(pedalAngle), chainringY - pedalLen * Math.sin(pedalAngle));
                            ctx.stroke();

                            // Pedals
                            ctx.fillStyle = viz.colors.white;
                            ctx.fillRect(chainringX + pedalLen * Math.cos(pedalAngle) - 8, chainringY + pedalLen * Math.sin(pedalAngle) - 3, 16, 6);
                            ctx.fillRect(chainringX - pedalLen * Math.cos(pedalAngle) - 8, chainringY - pedalLen * Math.sin(pedalAngle) - 3, 16, 6);

                            // Sprocket (rear)
                            ctx.strokeStyle = cfg.color;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(sprocketX, sprocketY, sprocketR, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.fillStyle = cfg.color;
                            ctx.beginPath();
                            ctx.arc(sprocketX, sprocketY, 4, 0, Math.PI * 2);
                            ctx.fill();

                            // Rear wheel
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(sprocketX, sprocketY, 60, 0, Math.PI * 2);
                            ctx.stroke();

                            // Wheel spokes
                            for (var s = 0; s < 8; s++) {
                                var sa = wheelAngle + s * Math.PI / 4;
                                ctx.strokeStyle = viz.colors.muted + '80';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(sprocketX, sprocketY);
                                ctx.lineTo(sprocketX + 58 * Math.cos(sa), sprocketY + 58 * Math.sin(sa));
                                ctx.stroke();
                            }

                            // Front wheel
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(sprocketX + 100, sprocketY + 10, 50, 0, Math.PI * 2);
                            ctx.stroke();

                            // Chain (simplified line)
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(chainringX, chainringY - chainringR);
                            ctx.lineTo(sprocketX, sprocketY - sprocketR);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(chainringX, chainringY + chainringR);
                            ctx.lineTo(sprocketX, sprocketY + sprocketR);
                            ctx.stroke();

                            // Info panel
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Chainring: ' + cfg.chainring + ' teeth', 30, 60);
                            ctx.fillText('Sprocket: ' + cfg.sprocket + ' teeth', 30, 80);
                            ctx.fillText('Ratio: ' + ratio.toFixed(1) + ':1', 30, 100);
                            ctx.fillText('1 pedal turn = ' + ratio.toFixed(1) + ' wheel turns', 30, 125);

                            // Effort & speed indicators
                            var effortBar = gearMode === 0 ? 0.3 : (gearMode === 1 ? 0.6 : 0.9);
                            var speedBar = gearMode === 0 ? 0.3 : (gearMode === 1 ? 0.6 : 0.9);

                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Pedaling effort:', 30, 345);
                            ctx.fillStyle = '#333';
                            ctx.fillRect(150, 335, 120, 14);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(150, 335, 120 * effortBar, 14);

                            ctx.fillStyle = viz.colors.muted;
                            ctx.fillText('Top speed:', 310, 345);
                            ctx.fillStyle = '#333';
                            ctx.fillRect(410, 335, 120, 14);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(410, 335, 120 * speedBar, 14);

                            // Ground
                            ctx.fillStyle = '#1a2a1a';
                            ctx.fillRect(0, 358, 700, 22);
                        }

                        viz.animate(draw);

                        VizEngine.createButton(controls, 'Low Gear (Hill)', function() { gearMode = 0; });
                        VizEngine.createButton(controls, 'Medium Gear', function() { gearMode = 1; });
                        VizEngine.createButton(controls, 'High Gear (Speed)', function() { gearMode = 2; });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A bicycle chainring has 48 teeth and the rear sprocket has 16 teeth. How many times does the rear wheel turn for each pedal turn?',
                    hint: 'Divide chainring teeth by sprocket teeth.',
                    solution: 'Wheel turns = 48/16 = 3. Each pedal turn makes the wheel turn 3 times. This is a high gear, great for speed on flat roads!'
                },
                {
                    question: 'When riding uphill, should you switch to a gear with a larger or smaller rear sprocket? Why?',
                    hint: 'Uphill needs more force and less speed.',
                    solution: 'You should use a larger rear sprocket (low gear). This gives a smaller gear ratio, so each pedal turn moves the wheel less, but pedaling feels easier because you get more force. It is like the trade-off in all simple machines: less speed for more force.'
                }
            ]
        }
    ]
});
