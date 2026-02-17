window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch20',
    number: 20,
    title: 'Vibration & Pendulum',
    subtitle: 'Swinging Back and Forth',
    sections: [
        {
            id: 'what-is-vibration',
            title: 'What Is Vibration?',
            content: `
                <h2>Back and Forth, Again and Again</h2>

                <p>Pluck a guitar string. Watch it blur as it vibrates back and forth incredibly fast. Push a child on a swing and watch them go back and forth in a steady rhythm. These are both examples of <strong>vibration</strong> — a motion that repeats itself over and over.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition</div>
                    <div class="env-body">
                        <p><strong>Oscillation</strong> (or vibration) is any motion that repeats in a regular pattern. One complete back-and-forth motion is called a <strong>cycle</strong>.</p>
                        <p>The <strong>period</strong> (\\(T\\)) is the time for one complete cycle. The <strong>frequency</strong> (\\(f\\)) is the number of cycles per second, measured in <strong>Hertz</strong> (Hz). They are related by \\(f = 1/T\\).</p>
                        <p>The <strong>amplitude</strong> is the maximum displacement from the resting (equilibrium) position.</p>
                    </div>
                </div>

                <p>Oscillation is everywhere in nature:</p>
                <ul>
                    <li>Your heartbeat</li>
                    <li>Sound waves</li>
                    <li>Ocean waves</li>
                    <li>A bouncing ball</li>
                    <li>A vibrating phone</li>
                    <li>Atoms jiggling in a solid</li>
                </ul>

                <div class="viz-placeholder" data-viz="tuning-fork-viz"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Put your fingers gently on your throat and hum. You can feel the vibration! Your vocal cords are oscillating back and forth hundreds of times per second, creating sound waves. A deep voice vibrates at about 100 Hz (100 times per second), while a high voice might reach 300 Hz or more.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'tuning-fork-viz',
                    title: 'Tuning Fork Vibration',
                    description: 'Watch how a vibrating object creates a wave pattern as it oscillates.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 40, originX: 100, originY: 200});
                        var freq = 1.5;
                        var amplitude = 2.0;
                        var time = 0;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw equilibrium line
                            viz.drawSegment(-2, 0, 14, 0, viz.colors.grid, 1, true);

                            // Draw the tuning fork prong
                            var y = amplitude * Math.sin(2 * Math.PI * freq * time);

                            // Fork body
                            ctx.fillStyle = viz.colors.text;
                            var forkBase = viz.toScreen(-1.5, 0);
                            ctx.fillRect(forkBase[0] - 3, forkBase[1] - 40, 6, 80);

                            // Fork prong (top)
                            var prongTop = viz.toScreen(-1, y);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 4;
                            ctx.beginPath();
                            ctx.moveTo(forkBase[0], forkBase[1] - 40);
                            ctx.quadraticCurveTo(prongTop[0], prongTop[1] - 40, prongTop[0] + 15, prongTop[1] - 20);
                            ctx.stroke();

                            // Fork prong (bottom - mirror)
                            var prongBot = viz.toScreen(-1, -y);
                            ctx.beginPath();
                            ctx.moveTo(forkBase[0], forkBase[1] + 40);
                            ctx.quadraticCurveTo(prongBot[0], prongBot[1] + 40, prongBot[0] + 15, prongBot[1] + 20);
                            ctx.stroke();

                            // Wave trace showing oscillation over time
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            var first = true;
                            for (var x = 0; x <= 13; x += 0.05) {
                                var waveY = amplitude * Math.sin(2 * Math.PI * freq * (time - x * 0.15));
                                var sp = viz.toScreen(x, waveY);
                                if (first) { ctx.moveTo(sp[0], sp[1]); first = false; }
                                else { ctx.lineTo(sp[0], sp[1]); }
                            }
                            ctx.stroke();

                            // Amplitude markers
                            viz.drawSegment(-0.3, 0, -0.3, amplitude, viz.colors.orange, 1.5);
                            viz.drawSegment(-0.5, amplitude, -0.1, amplitude, viz.colors.orange, 1.5);
                            viz.drawSegment(-0.5, 0, -0.1, 0, viz.colors.orange, 1.5);
                            viz.drawText('A', -0.7, amplitude / 2, viz.colors.orange, 13);

                            // Moving dot on the wave start
                            viz.drawPoint(0, y, viz.colors.blue, '', 7);

                            viz.screenText('Vibration and Wave Pattern', viz.width / 2, 20, viz.colors.white, 16);
                            viz.screenText('Frequency: ' + freq.toFixed(1) + ' Hz   Period: ' + (1 / freq).toFixed(2) + ' s', viz.width / 2, viz.height - 15, viz.colors.text, 12);
                        }

                        viz.animate(function() {
                            time += 0.016;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Frequency (Hz)', 0.5, 4, freq, 0.1, function(v) {
                            freq = v;
                        });
                        VizEngine.createSlider(controls, 'Amplitude', 0.5, 3, amplitude, 0.1, function(v) {
                            amplitude = v;
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A swing completes 10 full back-and-forth swings in 20 seconds. What is the period and frequency of the swing?',
                    hint: 'Period is the time for one cycle. Frequency is the number of cycles per second.',
                    solution: 'Period T = 20 seconds / 10 cycles = 2 seconds per cycle. Frequency f = 1/T = 1/2 = 0.5 Hz (half a cycle per second).'
                },
            ]
        },
        {
            id: 'the-pendulum',
            title: 'The Pendulum',
            content: `
                <h2>The Grandfather Clock's Secret</h2>

                <p>A <strong>pendulum</strong> is one of the simplest and most beautiful oscillating systems. It is just a weight (called a <strong>bob</strong>) hanging from a string or rod that swings back and forth.</p>

                <p>Pendulums have been used for centuries to keep time. Galileo first noticed that a pendulum swings with a remarkably steady rhythm — the time for each swing is almost exactly the same, no matter how big or small the swing!</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Legend says that young Galileo was sitting in a cathedral watching a chandelier swing back and forth. He timed the swings using his own pulse and realized that even as the chandelier slowed down and the swings got smaller, each swing took the same amount of time. This discovery led to the first pendulum clocks!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="pendulum-sim"></div>

                <p>What makes the pendulum swing? Gravity! When the bob is pulled to one side, gravity pulls it back toward the center. But when it gets to the center, it is moving fast, so it overshoots and swings to the other side. Then gravity pulls it back again. This back-and-forth dance between gravity and inertia creates the oscillation.</p>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>The restoring force on a pendulum (for small angles) is approximately:</p>
                        <p>\\[F \\approx -mg \\sin(\\theta) \\approx -mg\\theta\\]</p>
                        <p>The minus sign means the force always points back toward the center — that is what makes it a <strong>restoring force</strong>.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'pendulum-sim',
                    title: 'Pendulum Simulator',
                    description: 'Change the length and watch how the period changes. Try different masses too!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 60, originX: 350, originY: 60});
                        var g = 9.8;
                        var length = 2.0;
                        var mass = 1.0;
                        var theta = 0.5;
                        var omega = 0;
                        var damping = 0.001;
                        var trail = [];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Pivot point
                            viz.drawPoint(0, 0, viz.colors.white, '', 5);

                            // String
                            var bobX = length * Math.sin(theta);
                            var bobY = -length * Math.cos(theta);
                            viz.drawSegment(0, 0, bobX, bobY, viz.colors.white, 2);

                            // Equilibrium line (dashed)
                            viz.drawSegment(0, 0, 0, -length - 0.5, viz.colors.grid, 1, true);

                            // Angle arc
                            if (Math.abs(theta) > 0.05) {
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                var arcR = 30;
                                var startA = Math.PI / 2;
                                var endA = Math.PI / 2 - theta;
                                ctx.arc(viz.toScreen(0, 0)[0], viz.toScreen(0, 0)[1], arcR, Math.min(startA, endA), Math.max(startA, endA));
                                ctx.stroke();
                            }

                            // Trail
                            trail.push([bobX, bobY]);
                            if (trail.length > 40) trail.shift();
                            for (var i = 0; i < trail.length; i++) {
                                var alpha = (i / trail.length) * 0.4;
                                var ts = viz.toScreen(trail[i][0], trail[i][1]);
                                ctx.fillStyle = 'rgba(88,166,255,' + alpha + ')';
                                ctx.beginPath();
                                ctx.arc(ts[0], ts[1], 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            // Bob
                            var bobRadius = Math.max(6, Math.min(14, mass * 8));
                            var bs = viz.toScreen(bobX, bobY);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(bs[0], bs[1], bobRadius, 0, Math.PI * 2);
                            ctx.fill();

                            // Gravity vector on bob
                            var gVecScale = 0.08 * mass;
                            viz.drawVector(bobX, bobY, bobX, bobY - g * gVecScale, viz.colors.red, 'mg', 1.5);

                            // Info
                            var period = 2 * Math.PI * Math.sqrt(length / g);
                            viz.screenText('Pendulum Simulator', viz.width / 2, 20, viz.colors.white, 16);
                            viz.screenText('Length: ' + length.toFixed(1) + ' m   Mass: ' + mass.toFixed(1) + ' kg   Period: ' + period.toFixed(2) + ' s', viz.width / 2, viz.height - 15, viz.colors.teal, 12);
                        }

                        viz.animate(function() {
                            // Simple pendulum physics (exact ODE, not small angle)
                            var alpha = -(g / length) * Math.sin(theta);
                            omega += alpha * 0.016;
                            omega *= (1 - damping);
                            theta += omega * 0.016;
                            draw();
                        });

                        VizEngine.createSlider(controls, 'Length (m)', 0.5, 4, length, 0.1, function(v) {
                            length = v;
                            trail = [];
                        });
                        VizEngine.createSlider(controls, 'Mass (kg)', 0.2, 3, mass, 0.1, function(v) {
                            mass = v;
                        });
                        VizEngine.createButton(controls, 'Big Push', function() {
                            theta = 1.2;
                            omega = 0;
                            trail = [];
                        });
                        VizEngine.createButton(controls, 'Small Push', function() {
                            theta = 0.3;
                            omega = 0;
                            trail = [];
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'What provides the restoring force in a pendulum?',
                    hint: 'Think about what pulls the bob back toward the center of its swing.',
                    solution: 'Gravity provides the restoring force. When the bob swings to one side, the component of gravity along the arc of the swing pulls it back toward the lowest point (equilibrium position).'
                }
            ]
        },
        {
            id: 'period-and-length',
            title: 'Period Depends on Length',
            content: `
                <h2>The Surprising Rule of Pendulums</h2>

                <p>Here is one of the most surprising facts about pendulums: the period (time for one swing) depends on the <strong>length</strong> of the string, but NOT on the <strong>mass</strong> of the bob!</p>

                <p>The formula for the period of a simple pendulum (with small swings) is:</p>

                \\[T = 2\\pi\\sqrt{\\frac{L}{g}}\\]

                <p>where \\(L\\) is the length and \\(g\\) is gravity (about 9.8 m/s on Earth).</p>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Why does mass not matter? It is the same reason all objects fall at the same rate! A heavier bob has more gravity pulling on it, but it also has more inertia resisting the motion. These two effects perfectly cancel out, leaving the period independent of mass.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="length-period-graph"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>What length pendulum has a period of exactly 1 second?</p>
                        <p>We need \\(T = 1\\) s, so: \\(1 = 2\\pi\\sqrt{L/9.8}\\)</p>
                        <p>Solving: \\(L = \\frac{9.8}{4\\pi^2} \\approx 0.25\\) m = 25 cm</p>
                        <p>A 25 cm pendulum ticks once per second! Grandfather clocks use a pendulum about 1 meter long, which gives a 2-second period (1 second each way).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark</div>
                    <div class="env-body">
                        <p>The formula only works for small swings (less than about 15 degrees). For larger swings, the period is slightly longer, and the math gets more complicated. But for small swings, the formula is remarkably accurate.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'length-period-graph',
                    title: 'Length vs. Period',
                    description: 'See how the period changes as you adjust the pendulum length. Watch the graph build!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 1, originX: 100, originY: 350});
                        var g = 9.8;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Custom axes for this graph
                            var left = 100;
                            var right = 650;
                            var top = 40;
                            var bottom = 340;
                            var maxL = 5;
                            var maxT = 5;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(left, bottom);
                            ctx.lineTo(right, bottom);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(left, bottom);
                            ctx.lineTo(left, top);
                            ctx.stroke();

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var i = 1; i <= 5; i++) {
                                var gx = left + (i / maxL) * (right - left);
                                ctx.beginPath(); ctx.moveTo(gx, bottom); ctx.lineTo(gx, top); ctx.stroke();
                                viz.screenText(i + '', gx, bottom + 15, viz.colors.text, 11);
                            }
                            for (var j = 1; j <= 5; j++) {
                                var gy = bottom - (j / maxT) * (bottom - top);
                                ctx.beginPath(); ctx.moveTo(left, gy); ctx.lineTo(right, gy); ctx.stroke();
                                viz.screenText(j + ' s', left - 25, gy, viz.colors.text, 11);
                            }

                            // Axis labels
                            viz.screenText('Length (m)', (left + right) / 2, bottom + 35, viz.colors.white, 13);
                            viz.screenText('Period (s)', left - 55, (top + bottom) / 2, viz.colors.white, 13);

                            // Plot the curve T = 2pi sqrt(L/g)
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var first = true;
                            for (var L = 0; L <= maxL; L += 0.02) {
                                var T = 2 * Math.PI * Math.sqrt(L / g);
                                var px = left + (L / maxL) * (right - left);
                                var py = bottom - (T / maxT) * (bottom - top);
                                if (py < top) break;
                                if (first) { ctx.moveTo(px, py); first = false; }
                                else { ctx.lineTo(px, py); }
                            }
                            ctx.stroke();

                            // Plot some example points
                            var examples = [0.25, 1.0, 2.0, 4.0];
                            var colors = [viz.colors.orange, viz.colors.teal, viz.colors.green, viz.colors.purple];
                            for (var e = 0; e < examples.length; e++) {
                                var eL = examples[e];
                                var eT = 2 * Math.PI * Math.sqrt(eL / g);
                                var epx = left + (eL / maxL) * (right - left);
                                var epy = bottom - (eT / maxT) * (bottom - top);
                                ctx.fillStyle = colors[e];
                                ctx.beginPath();
                                ctx.arc(epx, epy, 6, 0, Math.PI * 2);
                                ctx.fill();
                                viz.screenText('L=' + eL + ', T=' + eT.toFixed(2) + 's', epx + 10, epy - 10, colors[e], 10, 'left');
                            }

                            viz.screenText('Pendulum Period vs. Length', viz.width / 2, 20, viz.colors.white, 16);
                            viz.screenText('T = 2pi sqrt(L/g)  --  Period does NOT depend on mass!', viz.width / 2, top - 5, viz.colors.teal, 11);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'You have two pendulums. Pendulum A is 1 meter long with a 1 kg bob. Pendulum B is 1 meter long with a 5 kg bob. Which one has a longer period?',
                    hint: 'Look at the period formula. Does mass appear in it?',
                    solution: 'They have the same period! The period formula T = 2 pi sqrt(L/g) only depends on length and gravity, not mass. Both pendulums are 1 meter long, so both have the same period of about 2.0 seconds.'
                },
                {
                    question: 'If you want to make a pendulum swing twice as fast (half the period), how should you change the length?',
                    hint: 'If T is halved, what happens to L in the formula T = 2 pi sqrt(L/g)?',
                    solution: 'You need to make the length one-quarter as long. Since T is proportional to the square root of L, halving T means you need L to be (1/2) squared = 1/4 of the original. For example, a 1-meter pendulum with period 2 seconds would become a 0.25-meter pendulum with period 1 second.'
                }
            ]
        },
        {
            id: 'resonance-intro',
            title: 'Resonance',
            content: `
                <h2>The Power of Perfectly Timed Pushes</h2>

                <p>Have you ever pushed someone on a swing? You quickly learn that timing matters! If you push at just the right moment — when the swing is at the top of its arc and starting to come back — each push adds to the motion and the swing goes higher and higher. But if you push at random times, the swing barely moves or even slows down.</p>

                <p>This is <strong>resonance</strong>: when you apply a force at the same frequency as the natural frequency of an oscillating system, the energy builds up and the motion gets bigger and bigger.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition</div>
                    <div class="env-body">
                        <p><strong>Resonance</strong> occurs when an external force is applied at a frequency that matches the natural frequency of a system. The amplitude of oscillation grows dramatically when this happens.</p>
                        <p>The <strong>natural frequency</strong> is the frequency at which a system oscillates on its own when disturbed.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="resonance-demo"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p><strong>Singing to break a glass</strong>: Every wine glass has a natural frequency. If a singer hits exactly that note, the glass vibrates more and more until it shatters! (This really works, though you need a very loud, pure note.)</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body">
                        <p>Resonance can be dangerous! The famous Tacoma Narrows Bridge in 1940 collapsed because wind caused it to vibrate at its natural frequency. Engineers now carefully design bridges, buildings, and machines to avoid resonance at common frequencies.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body">
                        <p>Musical instruments use resonance in a beautiful way. When you pluck a guitar string, the body of the guitar resonates at the same frequency, making the sound much louder. The shape and size of the body are carefully designed to resonate well across many notes.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'resonance-demo',
                    title: 'Resonance: Pushing a Swing',
                    description: 'Match the push frequency to the natural frequency and watch the amplitude grow!',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 400, scale: 60, originX: 200, originY: 60});
                        var g = 9.8;
                        var length = 1.5;
                        var theta = 0.1;
                        var omega = 0;
                        var damping = 0.01;
                        var pushFreq = 1.0;
                        var naturalFreq = 1 / (2 * Math.PI * Math.sqrt(length / g));
                        var pushStrength = 2.0;
                        var time = 0;
                        var maxAmplitude = 0;
                        var amplitudeHistory = [];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Pivot
                            viz.drawPoint(0, 0, viz.colors.white, '', 5);

                            // Pendulum
                            var bobX = length * Math.sin(theta);
                            var bobY = -length * Math.cos(theta);
                            viz.drawSegment(0, 0, bobX, bobY, viz.colors.white, 2);

                            // Bob
                            var bs = viz.toScreen(bobX, bobY);
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.arc(bs[0], bs[1], 10, 0, Math.PI * 2);
                            ctx.fill();

                            // Push indicator
                            var pushPhase = Math.sin(2 * Math.PI * pushFreq * time);
                            if (pushPhase > 0.8) {
                                viz.screenText('PUSH!', 120, 200, viz.colors.orange, 18);
                            }

                            // Amplitude graph on the right side
                            var graphLeft = 420;
                            var graphRight = 680;
                            var graphTop = 40;
                            var graphBottom = 360;

                            // Graph border
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(graphLeft, graphBottom);
                            ctx.lineTo(graphRight, graphBottom);
                            ctx.lineTo(graphRight, graphTop);
                            ctx.stroke();

                            // Graph labels
                            viz.screenText('Amplitude Over Time', (graphLeft + graphRight) / 2, graphTop - 10, viz.colors.white, 12);

                            // Plot amplitude history
                            if (amplitudeHistory.length > 1) {
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var graphW = graphRight - graphLeft;
                                var graphH = graphBottom - graphTop;
                                var maxShow = 200;
                                var start = Math.max(0, amplitudeHistory.length - maxShow);
                                for (var i = start; i < amplitudeHistory.length; i++) {
                                    var px = graphLeft + ((i - start) / maxShow) * graphW;
                                    var py = graphBottom - (Math.min(amplitudeHistory[i], 2) / 2) * graphH;
                                    if (i === start) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                            }

                            // Info
                            naturalFreq = 1 / (2 * Math.PI * Math.sqrt(length / g));
                            var natPeriod = 1 / naturalFreq;
                            viz.screenText('Natural freq: ' + naturalFreq.toFixed(2) + ' Hz', viz.width / 2, viz.height - 35, viz.colors.teal, 12);
                            viz.screenText('Push freq: ' + pushFreq.toFixed(2) + ' Hz', viz.width / 2, viz.height - 15, viz.colors.orange, 12);

                            var diff = Math.abs(pushFreq - naturalFreq);
                            if (diff < 0.05) {
                                viz.screenText('RESONANCE! Frequencies match!', viz.width / 2, viz.height - 55, viz.colors.green, 14);
                            }
                        }

                        viz.animate(function() {
                            time += 0.016;

                            // External push force
                            var push = pushStrength * Math.sin(2 * Math.PI * pushFreq * time);

                            // Pendulum physics with driving force
                            var alpha = -(g / length) * Math.sin(theta) - damping * omega + push * 0.016;
                            omega += alpha * 0.016;
                            theta += omega * 0.016;

                            // Track amplitude
                            var currentAmp = Math.abs(theta);
                            if (currentAmp > maxAmplitude) maxAmplitude = currentAmp;
                            amplitudeHistory.push(currentAmp);
                            if (amplitudeHistory.length > 400) amplitudeHistory.shift();

                            draw();
                        });

                        VizEngine.createSlider(controls, 'Push Freq (Hz)', 0.2, 2.0, pushFreq, 0.01, function(v) {
                            pushFreq = v;
                        });
                        VizEngine.createSlider(controls, 'Push Strength', 0, 5, pushStrength, 0.1, function(v) {
                            pushStrength = v;
                        });
                        VizEngine.createButton(controls, 'Match Natural Freq', function() {
                            pushFreq = naturalFreq;
                            amplitudeHistory = [];
                            theta = 0.1;
                            omega = 0;
                            time = 0;
                        });
                        VizEngine.createButton(controls, 'Reset', function() {
                            theta = 0.1;
                            omega = 0;
                            time = 0;
                            amplitudeHistory = [];
                            maxAmplitude = 0;
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'When pushing a friend on a swing, should you push randomly or at a specific timing? Why?',
                    hint: 'Think about when the swing is at the right position for your push to add energy.',
                    solution: 'You should push at a specific timing — once per swing, right when the swing reaches the top of its arc and starts to come back toward you. This matches the natural frequency of the swing (resonance), so each push adds energy and the swing goes higher. Random pushes sometimes add energy and sometimes take it away, so they are not effective.'
                },
                {
                    question: 'Soldiers marching across a bridge are sometimes told to break step (stop marching in rhythm). Why?',
                    hint: 'Think about what happens when many feet hit the bridge at the same rhythm...',
                    solution: 'If soldiers march in step, their synchronized footfalls apply a periodic force to the bridge. If the marching frequency happens to match the bridge\'s natural frequency, resonance could make the bridge oscillate dangerously — large enough to damage or even collapse it! Breaking step means the forces are random and do not build up through resonance.'
                }
            ]
        }
    ]
});
