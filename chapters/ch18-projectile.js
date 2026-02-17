window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch18',
    number: 18,
    title: 'Projectile Motion',
    subtitle: 'Where Does the Ball Land?',
    sections: [
        {
            id: 'throwing-things',
            title: 'Throwing Things',
            content: `
                <h2>What Happens When You Throw a Ball?</h2>

                <p>Have you ever thrown a ball to a friend? Or tossed a paper airplane across the room? When an object is launched into the air, we call it a <strong>projectile</strong>. A projectile is anything that moves through the air under the pull of gravity (and without an engine or propeller helping it along).</p>

                <p>Here is the really cool secret about projectile motion: the horizontal and vertical parts of the motion are completely independent! That means:</p>

                <ul>
                    <li><strong>Horizontally</strong>, the ball keeps moving at the same speed (ignoring air resistance). Nothing is pushing or pulling it sideways.</li>
                    <li><strong>Vertically</strong>, gravity pulls the ball downward, making it speed up as it falls — just like free fall!</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Imagine you are standing on a cliff and you hold two balls. You throw one ball horizontally and drop the other ball straight down at the exact same moment. Which one hits the ground first?</p>
                        <p>Surprisingly, they hit the ground at the <strong>same time</strong>! The horizontal throw does not change how fast the ball falls. Gravity pulls both balls down equally.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="drop-vs-throw"></div>

                <p>This is one of the most important ideas in physics: horizontal and vertical motions do not affect each other. We can think about them separately and then combine them to get the full picture.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition</div>
                    <div class="env-body">
                        <p>A <strong>projectile</strong> is any object that is launched into the air and then moves only under the influence of gravity. Its path is called a <strong>trajectory</strong>.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'drop-vs-throw',
                    title: 'Drop vs. Throw',
                    description: 'Watch two balls: one dropped, one thrown sideways. They hit the ground at the same time!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 40, originX: 80, originY: 40});
                        var g = 9.8;
                        var t = 0;
                        var running = false;
                        var vx = 4;
                        var startHeight = 8;
                        var trailDrop = [];
                        var trailThrow = [];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw ground
                            ctx.fillStyle = '#2a4a2a';
                            var groundY = viz.toScreen(0, 0)[1];
                            ctx.fillRect(0, groundY, viz.width, viz.height - groundY);

                            // Draw cliff
                            ctx.fillStyle = '#4a3a2a';
                            var cliffLeft = viz.toScreen(-1, 0)[0];
                            var cliffTop = viz.toScreen(0, startHeight)[1];
                            ctx.fillRect(0, cliffTop, cliffLeft + viz.scale, groundY - cliffTop);

                            // Compute positions
                            var dropY = startHeight - 0.5 * g * t * t;
                            var throwX = vx * t;
                            var throwY = startHeight - 0.5 * g * t * t;

                            if (dropY < 0) { dropY = 0; }
                            if (throwY < 0) { throwY = 0; }

                            // Trails
                            if (running && dropY > 0) {
                                trailDrop.push([0, dropY]);
                                trailThrow.push([throwX, throwY]);
                            }

                            // Draw trails
                            ctx.globalAlpha = 0.4;
                            for (var i = 0; i < trailDrop.length; i++) {
                                var sd = viz.toScreen(trailDrop[i][0], trailDrop[i][1]);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(sd[0], sd[1], 3, 0, Math.PI * 2); ctx.fill();
                            }
                            for (var i = 0; i < trailThrow.length; i++) {
                                var st = viz.toScreen(trailThrow[i][0], trailThrow[i][1]);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(st[0], st[1], 3, 0, Math.PI * 2); ctx.fill();
                            }
                            ctx.globalAlpha = 1.0;

                            // Draw horizontal dashed line connecting both balls
                            if (running && dropY > 0) {
                                viz.drawSegment(0, dropY, throwX, throwY, viz.colors.muted || '#555', 1, true);
                            }

                            // Draw balls
                            viz.drawPoint(0, dropY, viz.colors.orange, 'Dropped', 8);
                            viz.drawPoint(throwX, throwY, viz.colors.blue, 'Thrown', 8);

                            // Labels
                            viz.screenText('Drop vs. Throw Experiment', viz.width / 2, 20, viz.colors.white, 16);
                            viz.screenText('Both balls fall at the same rate!', viz.width / 2, viz.height - 15, viz.colors.teal, 12);
                            viz.screenText('t = ' + t.toFixed(2) + ' s', viz.width - 60, 20, viz.colors.yellow, 12);
                        }

                        draw();

                        VizEngine.createButton(controls, 'Launch!', function() {
                            t = 0;
                            trailDrop = [];
                            trailThrow = [];
                            running = true;
                            viz.stopAnimation();
                            viz.animate(function() {
                                if (running) {
                                    t += 0.016;
                                    var dropY = startHeight - 0.5 * g * t * t;
                                    if (dropY <= 0) {
                                        running = false;
                                    }
                                }
                                draw();
                            });
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            viz.stopAnimation();
                            t = 0;
                            running = false;
                            trailDrop = [];
                            trailThrow = [];
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'If you throw a ball horizontally from a tall building, what happens to its horizontal speed as it falls? (Ignore air resistance.)',
                    hint: 'Think about what forces act horizontally on the ball after it leaves your hand.',
                    solution: 'The horizontal speed stays the same! There is no horizontal force acting on the ball (ignoring air resistance), so it keeps moving sideways at the same speed the entire time.'
                },
                {
                    question: 'A ball is dropped from a cliff. At the same instant, another ball is thrown horizontally from the same height. Which one reaches the ground first?',
                    hint: 'Remember: horizontal and vertical motions are independent.',
                    solution: 'They reach the ground at the same time! Both balls start at the same height with zero vertical speed, and gravity pulls them down equally. The horizontal throw does not change the vertical fall.'
                }
            ]
        },
        {
            id: 'parabolic-paths',
            title: 'Parabolic Paths',
            content: `
                <h2>The Beautiful Curve of a Thrown Ball</h2>

                <p>When you combine steady horizontal motion with accelerating vertical motion, something wonderful happens: the ball traces out a smooth curve called a <strong>parabola</strong>.</p>

                <p>Let us see why with a little math. If you launch a ball horizontally with speed \\(v\\), then after time \\(t\\):</p>

                <ul>
                    <li>Horizontal position: \\(x = v \\cdot t\\)</li>
                    <li>Vertical drop: \\(y = \\frac{1}{2} g \\cdot t^2\\)</li>
                </ul>

                <p>If we solve for \\(t\\) from the first equation (\\(t = x / v\\)) and plug it into the second, we get:</p>

                \\[y = \\frac{g}{2v^2} \\cdot x^2\\]

                <p>This is the equation of a parabola! Every projectile (without air resistance) follows a parabolic path.</p>

                <div class="viz-placeholder" data-viz="projectile-launcher"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A ball is thrown horizontally at 5 m/s from a 20 m tall building. How far from the building does it land?</p>
                        <p>First, find the fall time: \\(20 = \\frac{1}{2}(9.8)t^2\\), so \\(t \\approx 2.0\\) seconds.</p>
                        <p>Then, horizontal distance: \\(x = 5 \\times 2.0 = 10\\) meters from the building.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Watch a water fountain. The streams of water trace parabolas! The faster the water shoots out, the wider and flatter the curve. The slower it goes, the steeper and narrower the curve. Nature loves parabolas!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'projectile-launcher',
                    title: 'Projectile Launcher',
                    description: 'Change the launch angle and speed to see different trajectories.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 18, originX: 60, originY: 340});
                        var g = 9.8;
                        var angle = 45;
                        var speed = 15;
                        var t = 0;
                        var running = false;
                        var trail = [];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Ground
                            var gy = viz.toScreen(0, 0)[1];
                            ctx.fillStyle = '#2a4a2a';
                            ctx.fillRect(0, gy, viz.width, viz.height - gy);

                            // Grid lines
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var i = 0; i <= 35; i += 5) {
                                var sx = viz.toScreen(i, 0)[0];
                                ctx.beginPath(); ctx.moveTo(sx, gy); ctx.lineTo(sx, 0); ctx.stroke();
                            }
                            for (var j = 0; j <= 15; j += 5) {
                                var sy = viz.toScreen(0, j)[1];
                                ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(viz.width, sy); ctx.stroke();
                            }

                            // Axis labels
                            viz.screenText('Distance (m)', viz.width / 2, viz.height - 5, viz.colors.text, 11);

                            var rad = angle * Math.PI / 180;
                            var vx = speed * Math.cos(rad);
                            var vy = speed * Math.sin(rad);

                            // Draw predicted full trajectory (faint)
                            ctx.strokeStyle = viz.colors.muted || '#444';
                            ctx.lineWidth = 1;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            var first = true;
                            for (var tp = 0; tp < 10; tp += 0.02) {
                                var px = vx * tp;
                                var py = vy * tp - 0.5 * g * tp * tp;
                                if (py < 0) break;
                                var sp = viz.toScreen(px, py);
                                if (first) { ctx.moveTo(sp[0], sp[1]); first = false; }
                                else { ctx.lineTo(sp[0], sp[1]); }
                            }
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Draw trail
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i < trail.length; i++) {
                                var sp = viz.toScreen(trail[i][0], trail[i][1]);
                                if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                else ctx.lineTo(sp[0], sp[1]);
                            }
                            ctx.stroke();

                            // Draw launcher
                            var launcherLen = 1.5;
                            viz.drawSegment(0, 0, launcherLen * Math.cos(rad), launcherLen * Math.sin(rad), viz.colors.orange, 4);

                            // Current ball position
                            var bx = vx * t;
                            var by = vy * t - 0.5 * g * t * t;
                            if (by < 0) by = 0;

                            if (running || trail.length > 0) {
                                viz.drawPoint(bx, by, viz.colors.blue, '', 7);
                            }

                            // Velocity vectors at ball
                            if (running && by > 0) {
                                var curVy = vy - g * t;
                                var vecScale = 0.15;
                                viz.drawVector(bx, by, bx + vx * vecScale, by, viz.colors.teal, 'vx', 1.5);
                                viz.drawVector(bx, by, bx, by + curVy * vecScale, viz.colors.orange, 'vy', 1.5);
                            }

                            // Info
                            viz.screenText('Angle: ' + angle + '°  Speed: ' + speed.toFixed(1) + ' m/s', viz.width / 2, 20, viz.colors.white, 14);

                            // Range calculation
                            var range = (speed * speed * Math.sin(2 * rad)) / g;
                            var maxH = (vy * vy) / (2 * g);
                            viz.screenText('Range: ' + range.toFixed(1) + ' m   Max Height: ' + maxH.toFixed(1) + ' m', viz.width / 2, 40, viz.colors.teal, 12);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Angle (°)', 5, 85, angle, 1, function(v) {
                            angle = v;
                            t = 0; running = false; trail = [];
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Speed (m/s)', 5, 25, speed, 0.5, function(v) {
                            speed = v;
                            t = 0; running = false; trail = [];
                            draw();
                        });
                        VizEngine.createButton(controls, 'Fire!', function() {
                            t = 0;
                            trail = [];
                            running = true;
                            viz.stopAnimation();
                            viz.animate(function() {
                                if (running) {
                                    t += 0.016;
                                    var rad = angle * Math.PI / 180;
                                    var vx = speed * Math.cos(rad);
                                    var vy = speed * Math.sin(rad);
                                    var bx = vx * t;
                                    var by = vy * t - 0.5 * g * t * t;
                                    if (by <= 0 && t > 0.05) {
                                        running = false;
                                        by = 0;
                                    }
                                    trail.push([bx, Math.max(0, by)]);
                                }
                                draw();
                            });
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            viz.stopAnimation();
                            t = 0; running = false; trail = [];
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Why does a projectile follow a parabolic path instead of a straight line?',
                    hint: 'Think about what happens when you combine constant horizontal speed with increasing vertical speed.',
                    solution: 'A projectile follows a parabola because its horizontal motion is constant (no force sideways) while its vertical motion accelerates due to gravity. The combination of steady sideways movement and increasing downward speed creates the curved parabolic shape.'
                }
            ]
        },
        {
            id: 'launch-angle',
            title: 'Launch Angle Matters',
            content: `
                <h2>Aiming High vs. Aiming Low</h2>

                <p>When you throw a ball at an angle, some of the speed goes horizontal and some goes vertical. The <strong>launch angle</strong> determines how the speed splits:</p>

                <ul>
                    <li>Horizontal speed: \\(v_x = v \\cdot \\cos(\\theta)\\)</li>
                    <li>Vertical speed: \\(v_y = v \\cdot \\sin(\\theta)\\)</li>
                </ul>

                <p>where \\(v\\) is the total launch speed and \\(\\theta\\) is the angle above horizontal.</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Think of it like sharing a pie. If you aim mostly upward (big angle), most of the speed goes into going up — the ball goes very high but not very far. If you aim mostly sideways (small angle), the ball goes far but not high enough to stay in the air for long.</p>
                        <p>The best balance? Right in the middle!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="angle-comparison"></div>

                <p>Look at the pattern in the visualization above. Notice how 30° and 60° give the same range? So do 20° and 70°. Angles that add up to 90° always produce the same range! This is because \\(\\sin(2\\theta)\\) has a symmetry: \\(\\sin(2 \\times 30°) = \\sin(60°)\\) and \\(\\sin(2 \\times 60°) = \\sin(120°) = \\sin(60°)\\).</p>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>These results assume flat ground and no air resistance. In real life, air resistance changes things. A baseball pitcher knows that spin and air resistance can make the ball curve in unexpected ways!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'angle-comparison',
                    title: 'Angle Comparison',
                    description: 'See how different launch angles produce different trajectories with the same speed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 14, originX: 40, originY: 350});
                        var g = 9.8;
                        var speed = 18;
                        var angles = [15, 30, 45, 60, 75];
                        var angleColors = [];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Ground
                            var gy = viz.toScreen(0, 0)[1];
                            ctx.fillStyle = '#2a4a2a';
                            ctx.fillRect(0, gy, viz.width, viz.height - gy);

                            angleColors = [viz.colors.red, viz.colors.orange, viz.colors.green, viz.colors.blue, viz.colors.purple];

                            // Draw each trajectory
                            for (var a = 0; a < angles.length; a++) {
                                var ang = angles[a];
                                var rad = ang * Math.PI / 180;
                                var vx = speed * Math.cos(rad);
                                var vy = speed * Math.sin(rad);
                                var totalT = 2 * vy / g;

                                ctx.strokeStyle = angleColors[a];
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var first = true;
                                for (var tp = 0; tp <= totalT; tp += 0.02) {
                                    var px = vx * tp;
                                    var py = vy * tp - 0.5 * g * tp * tp;
                                    if (py < 0) py = 0;
                                    var sp = viz.toScreen(px, py);
                                    if (first) { ctx.moveTo(sp[0], sp[1]); first = false; }
                                    else { ctx.lineTo(sp[0], sp[1]); }
                                }
                                ctx.stroke();

                                // Label at peak
                                var peakT = vy / g;
                                var peakX = vx * peakT;
                                var peakY = vy * peakT - 0.5 * g * peakT * peakT;
                                viz.drawText(ang + '°', peakX, peakY + 1, angleColors[a], 12);
                            }

                            viz.screenText('Same speed, different angles', viz.width / 2, 20, viz.colors.white, 16);
                            viz.screenText('Notice: 30° and 60° land at the same distance!', viz.width / 2, viz.height - 15, viz.colors.teal, 12);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Speed (m/s)', 8, 25, speed, 0.5, function(v) {
                            speed = v;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'At what angle should you throw a ball to make it go the highest possible? What about the farthest?',
                    hint: 'For maximum height, you want all the speed going upward. For maximum range, think about the balance.',
                    solution: 'For maximum height, throw straight up at 90 degrees — all the speed goes into going up. For maximum range (on flat ground, no air resistance), throw at 45 degrees. This gives the best balance between horizontal speed and time in the air.'
                },
                {
                    question: 'If you launch a ball at 30 degrees and it lands 50 meters away, how far will it land if you launch it at 60 degrees with the same speed?',
                    hint: 'What do 30 degrees and 60 degrees add up to?',
                    solution: 'It also lands 50 meters away! Angles that add up to 90 degrees (called complementary angles) give the same range. This is because the range formula uses sin(2 times the angle), and sin(60 degrees) equals sin(120 degrees).'
                }
            ]
        },
        {
            id: 'range-optimization',
            title: 'The Perfect Angle',
            content: `
                <h2>Finding the Maximum Range</h2>

                <p>The range of a projectile (how far it goes on flat ground) is given by a beautiful formula:</p>

                \\[R = \\frac{v^2 \\sin(2\\theta)}{g}\\]

                <p>where \\(v\\) is the launch speed, \\(\\theta\\) is the launch angle, and \\(g\\) is gravity (about 9.8 m/s).</p>

                <p>Since \\(\\sin(2\\theta)\\) is biggest when \\(2\\theta = 90°\\), the maximum range happens at:</p>

                \\[\\theta = 45°\\]

                <p>This is the <strong>magic angle</strong> for maximum distance! It perfectly balances time in the air with horizontal speed.</p>

                <div class="viz-placeholder" data-viz="basketball-shot"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A soccer player kicks a ball at 20 m/s. What is the maximum range?</p>
                        <p>Using \\(\\theta = 45°\\): \\(R = \\frac{20^2 \\times \\sin(90°)}{9.8} = \\frac{400}{9.8} \\approx 40.8\\) meters.</p>
                        <p>That is about half a soccer field!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>The 45-degree rule only works on flat ground with no air resistance. In real sports, the optimal angle is often less than 45 degrees because of air drag, spin, and the fact that you might be throwing from a height (like a basketball player shooting from chest height toward a hoop).</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Basketball players actually shoot at angles higher than 45 degrees for most shots. Why? Because the hoop is above them! When your target is higher than your launch point, a steeper angle gives a better chance of going in. The ball enters the hoop more steeply, which means it has a bigger "window" to fall through.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'basketball-shot',
                    title: 'Basketball Shot Simulator',
                    description: 'Try to get the ball in the hoop by adjusting the angle and power!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 25, originX: 60, originY: 340});
                        var g = 9.8;
                        var angle = 55;
                        var power = 8;
                        var t = 0;
                        var running = false;
                        var trail = [];
                        var scored = false;
                        var hoopX = 10;
                        var hoopY = 3.05;
                        var rimRadius = 0.45;
                        var launchY = 1.8;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Ground
                            var gy = viz.toScreen(0, 0)[1];
                            ctx.fillStyle = '#2a4a2a';
                            ctx.fillRect(0, gy, viz.width, viz.height - gy);

                            // Court floor
                            ctx.fillStyle = '#8B6914';
                            ctx.fillRect(0, gy - 3, viz.width, 3);

                            // Backboard
                            var bbX = viz.toScreen(hoopX + 0.3, 0)[0];
                            var bbTop = viz.toScreen(0, hoopY + 1.2)[1];
                            var bbBot = viz.toScreen(0, hoopY - 0.3)[1];
                            ctx.fillStyle = '#ccc';
                            ctx.fillRect(bbX, bbTop, 4, bbBot - bbTop);

                            // Hoop (rim)
                            var rimLeft = viz.toScreen(hoopX - rimRadius, hoopY)[0];
                            var rimRight = viz.toScreen(hoopX + rimRadius, hoopY)[0];
                            var rimY = viz.toScreen(0, hoopY)[1];
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(rimLeft, rimY);
                            ctx.lineTo(rimRight, rimY);
                            ctx.stroke();

                            // Pole
                            var poleX = viz.toScreen(hoopX + 0.3, 0)[0];
                            ctx.strokeStyle = '#888';
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(poleX, gy);
                            ctx.lineTo(poleX, bbTop);
                            ctx.stroke();

                            // Player (simple stick figure)
                            var playerX = viz.toScreen(0, 0)[0];
                            var playerFootY = gy - 3;
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            // Body
                            ctx.beginPath();
                            ctx.moveTo(playerX, playerFootY);
                            ctx.lineTo(playerX, playerFootY - 50);
                            ctx.stroke();
                            // Head
                            ctx.beginPath();
                            ctx.arc(playerX, playerFootY - 56, 6, 0, Math.PI * 2);
                            ctx.stroke();
                            // Arms
                            var rad = angle * Math.PI / 180;
                            ctx.beginPath();
                            ctx.moveTo(playerX - 12, playerFootY - 35);
                            ctx.lineTo(playerX, playerFootY - 40);
                            ctx.lineTo(playerX + 15 * Math.cos(rad), playerFootY - 40 - 15 * Math.sin(rad));
                            ctx.stroke();

                            // Trail
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            for (var i = 0; i < trail.length; i++) {
                                var sp = viz.toScreen(trail[i][0], trail[i][1]);
                                if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                else ctx.lineTo(sp[0], sp[1]);
                            }
                            ctx.stroke();

                            // Ball
                            if (running || trail.length > 0) {
                                var rad2 = angle * Math.PI / 180;
                                var vx = power * Math.cos(rad2);
                                var vy = power * Math.sin(rad2);
                                var bx = vx * t;
                                var by = launchY + vy * t - 0.5 * g * t * t;
                                if (by < 0) by = 0;

                                // Ball
                                var bs = viz.toScreen(bx, by);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(bs[0], bs[1], 8, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.strokeStyle = '#333';
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }

                            // Score message
                            if (scored) {
                                viz.screenText('SCORE!', viz.width / 2, viz.height / 2, viz.colors.green, 28);
                            }

                            viz.screenText('Angle: ' + angle + '°  Power: ' + power.toFixed(1) + ' m/s', viz.width / 2, 20, viz.colors.white, 14);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Angle (°)', 20, 80, angle, 1, function(v) {
                            angle = v;
                            t = 0; running = false; trail = []; scored = false;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Power (m/s)', 3, 15, power, 0.2, function(v) {
                            power = v;
                            t = 0; running = false; trail = []; scored = false;
                            draw();
                        });
                        VizEngine.createButton(controls, 'Shoot!', function() {
                            t = 0;
                            trail = [];
                            scored = false;
                            running = true;
                            viz.stopAnimation();
                            viz.animate(function() {
                                if (running) {
                                    t += 0.016;
                                    var rad = angle * Math.PI / 180;
                                    var vx = power * Math.cos(rad);
                                    var vy = power * Math.sin(rad);
                                    var bx = vx * t;
                                    var by = launchY + vy * t - 0.5 * g * t * t;

                                    trail.push([bx, Math.max(0, by)]);

                                    // Check if ball passes through hoop
                                    var dx = bx - hoopX;
                                    var dy = by - hoopY;
                                    if (Math.abs(dx) < rimRadius && Math.abs(dy) < 0.15 && (vy * t - g * t) < 0) {
                                        scored = true;
                                        running = false;
                                    }
                                    if (by <= 0 && t > 0.1) {
                                        running = false;
                                    }
                                }
                                draw();
                            });
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            viz.stopAnimation();
                            t = 0; running = false; trail = []; scored = false;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Using the range formula, calculate the range of a ball launched at 30 degrees with a speed of 10 m/s. (Use g = 9.8 m/s squared.)',
                    hint: 'Use the formula R = v squared times sin(2 times angle) divided by g. Remember sin(60 degrees) is about 0.866.',
                    solution: 'R = (10 squared times sin(60 degrees)) / 9.8 = (100 times 0.866) / 9.8 = 86.6 / 9.8 = about 8.8 meters.'
                }
            ]
        }
    ]
});
