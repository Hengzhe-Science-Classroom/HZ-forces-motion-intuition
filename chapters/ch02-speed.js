window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Speed',
    subtitle: 'Who Is Faster?',
    sections: [
        {
            id: 'what-is-speed',
            title: 'What Is Speed?',
            content: `
                <h2>What Is Speed?</h2>
                <p>A cheetah and a turtle both move -- but the cheetah covers a lot more ground in the same amount of time. The cheetah is <strong>faster</strong>. Speed is what tells us how fast something is moving.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition: Speed</div>
                    <div class="env-body"><p><strong>Speed</strong> tells us how much distance an object covers in a certain amount of time. It answers the question: "How fast?"</p></div>
                </div>

                <p>Think about it this way: if two runners start at the same line and run for 10 seconds, the one who gets farther has the greater speed.</p>

                <div class="env-block intuition">
                    <div class="env-title">Speed in Everyday Life</div>
                    <div class="env-body">
                        <p>When your parent drives, the speedometer on the dashboard shows the car's speed. It might say 60 km/h, which means the car covers 60 kilometers every hour.</p>
                        <p>When you walk, your speed might be about 5 km/h. A bicycle goes about 15 km/h. A jet airplane flies at around 900 km/h!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-speed-race"></div>

                <div class="env-block remark">
                    <div class="env-title">Units of Speed</div>
                    <div class="env-body">
                        <p>Speed is measured in units of distance per time:</p>
                        <p><strong>km/h</strong> (kilometers per hour) -- used for cars</p>
                        <p><strong>m/s</strong> (meters per second) -- used in science</p>
                        <p><strong>mph</strong> (miles per hour) -- used in the US and UK</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-speed-race',
                    title: 'Race: Who Is Faster?',
                    description: 'Watch different animals and vehicles race to compare their speeds',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 50, originY: 175 });
                        var racers = [
                            { name: 'Turtle', speed: 0.3, color: viz.colors.green },
                            { name: 'Person', speed: 1.4, color: viz.colors.blue },
                            { name: 'Bicycle', speed: 4.2, color: viz.colors.teal },
                            { name: 'Car', speed: 16.7, color: viz.colors.orange },
                            { name: 'Cheetah', speed: 8.3, color: viz.colors.yellow }
                        ];
                        var running = false;
                        var elapsed = 0;
                        var startTime = 0;
                        var maxDist = 550;
                        var timeScale = 1.0;

                        function draw(t) {
                            viz.clear();
                            var ctx = viz.ctx;

                            if (running) {
                                elapsed = (t - startTime) * 0.001 * timeScale;
                            }

                            viz.screenText('Speed Race!', viz.width / 2, 18, viz.colors.white, 16, 'center');
                            viz.screenText('Time: ' + elapsed.toFixed(1) + ' s', viz.width / 2, 38, viz.colors.teal, 13, 'center');

                            var laneHeight = 55;
                            var topY = 60;

                            for (var i = 0; i < racers.length; i++) {
                                var r = racers[i];
                                var laneY = topY + i * laneHeight;

                                // Lane background
                                ctx.fillStyle = '#1a1a40';
                                ctx.fillRect(60, laneY, maxDist, laneHeight - 5);
                                ctx.strokeStyle = viz.colors.text + '33';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(60, laneY, maxDist, laneHeight - 5);

                                // Racer label
                                viz.screenText(r.name, 30, laneY + 15, r.color, 11, 'center');
                                viz.screenText(r.speed.toFixed(1) + ' m/s', 30, laneY + 32, viz.colors.text, 9, 'center');

                                // Racer position
                                var dist = r.speed * elapsed;
                                var px = 60 + Math.min(dist / 20 * maxDist / (maxDist / 20), maxDist - 15);
                                if (px > 60 + maxDist - 15) px = 60 + maxDist - 15;

                                // Trail
                                ctx.fillStyle = r.color + '22';
                                ctx.fillRect(60, laneY + 2, px - 60, laneHeight - 9);

                                // Racer dot
                                ctx.fillStyle = r.color;
                                ctx.beginPath(); ctx.arc(px, laneY + laneHeight / 2 - 2, 10, 0, Math.PI * 2); ctx.fill();

                                // Distance label
                                viz.screenText((r.speed * elapsed).toFixed(1) + ' m', px, laneY + laneHeight - 10, r.color, 9, 'center');
                            }

                            // Finish line
                            ctx.strokeStyle = viz.colors.red;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(60 + maxDist, topY); ctx.lineTo(60 + maxDist, topY + racers.length * laneHeight); ctx.stroke();
                            ctx.setLineDash([]);
                        }

                        VizEngine.createButton(controls, 'Start Race', function() {
                            running = true;
                            elapsed = 0;
                            startTime = performance.now();
                        });
                        VizEngine.createButton(controls, 'Stop', function() { running = false; });
                        VizEngine.createButton(controls, 'Reset', function() {
                            running = false;
                            elapsed = 0;
                        });
                        VizEngine.createSlider(controls, 'Time Scale', 0.2, 3.0, 1.0, 0.1, function(v) { timeScale = v; });

                        viz.animate(draw);
                        return { stopAnimation: function() { viz.stopAnimation(); } };
                    }
                }
            ],
            exercises: [
                {
                    question: 'A dog runs across a park in 5 seconds. A cat runs the same distance in 8 seconds. Which animal is faster?',
                    hint: 'The faster one covers the same distance in less time.',
                    solution: 'The dog is faster because it covers the same distance in less time (5 seconds vs 8 seconds).'
                },
                {
                    question: 'A car travels at 90 km/h. What does the "per hour" part mean?',
                    hint: 'Think about what happens in one hour of driving.',
                    solution: '"Per hour" means "in one hour." So 90 km/h means the car covers 90 kilometers in one hour of driving. If it drove for 2 hours at that speed, it would cover 180 km.'
                }
            ]
        },
        {
            id: 'calculating-speed',
            title: 'Calculating Speed',
            content: `
                <h2>Calculating Speed</h2>
                <p>Now let's learn the formula for speed. It is one of the most useful formulas in all of physics!</p>

                <div class="env-block definition">
                    <div class="env-title">Speed Formula</div>
                    <div class="env-body">
                        <p>\\[\\text{speed} = \\frac{\\text{distance}}{\\text{time}}\\]</p>
                        <p>Or using letters: \\(v = \\frac{d}{t}\\)</p>
                        <p>where \\(v\\) is speed, \\(d\\) is distance, and \\(t\\) is time.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">What This Formula Means</div>
                    <div class="env-body">
                        <p>Imagine you walk 12 meters in 4 seconds. Your speed is:</p>
                        <p>\\[v = \\frac{12 \\text{ m}}{4 \\text{ s}} = 3 \\text{ m/s}\\]</p>
                        <p>This means you cover 3 meters every second!</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-speed-calc"></div>

                <div class="env-block example">
                    <div class="env-title">Example 1</div>
                    <div class="env-body">
                        <p>A cyclist rides 100 meters in 20 seconds. What is the cyclist's speed?</p>
                        <p>\\[v = \\frac{d}{t} = \\frac{100 \\text{ m}}{20 \\text{ s}} = 5 \\text{ m/s}\\]</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 2</div>
                    <div class="env-body">
                        <p>A bus travels at 60 km/h for 3 hours. How far does it go?</p>
                        <p>We can rearrange: \\(d = v \\times t = 60 \\times 3 = 180\\) km.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">The Magic Triangle</div>
                    <div class="env-body">
                        <p>You can rearrange the speed formula three ways:</p>
                        <p>\\(v = \\frac{d}{t}\\) (find speed)</p>
                        <p>\\(d = v \\times t\\) (find distance)</p>
                        <p>\\(t = \\frac{d}{v}\\) (find time)</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-speed-calc',
                    title: 'Speed Calculator',
                    description: 'Set distance and time, and watch the speed be calculated',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 175 });
                        var distance = 100;
                        var time = 10;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var speed = distance / time;

                            // Title
                            viz.screenText('Speed Calculator', viz.width / 2, 25, viz.colors.white, 18, 'center');

                            // Formula display
                            viz.screenText('v = d / t', viz.width / 2, 65, viz.colors.teal, 16, 'center');

                            // Values
                            viz.screenText('Distance (d) = ' + distance.toFixed(0) + ' m', viz.width / 2, 105, viz.colors.blue, 15, 'center');
                            viz.screenText('Time (t) = ' + time.toFixed(1) + ' s', viz.width / 2, 130, viz.colors.green, 15, 'center');

                            // Divider
                            ctx.strokeStyle = viz.colors.text + '66';
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(200, 150); ctx.lineTo(500, 150); ctx.stroke();

                            // Result
                            viz.screenText('Speed (v) = ' + speed.toFixed(2) + ' m/s', viz.width / 2, 180, viz.colors.orange, 20, 'center');

                            // Visual bar representing distance
                            var barWidth = 400;
                            var barHeight = 30;
                            var barX = 150;
                            var barY = 215;

                            ctx.fillStyle = viz.colors.blue + '33';
                            ctx.fillRect(barX, barY, barWidth, barHeight);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 1;
                            ctx.strokeRect(barX, barY, barWidth, barHeight);
                            viz.screenText(distance.toFixed(0) + ' meters', barX + barWidth / 2, barY + barHeight / 2, viz.colors.blue, 12, 'center');

                            // Show speed segments
                            var numSegments = Math.min(Math.floor(time), 20);
                            if (numSegments > 0) {
                                var segWidth = barWidth / numSegments;
                                for (var i = 0; i < numSegments; i++) {
                                    ctx.strokeStyle = viz.colors.orange + '66';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(barX + (i + 1) * segWidth, barY);
                                    ctx.lineTo(barX + (i + 1) * segWidth, barY + barHeight);
                                    ctx.stroke();
                                }
                                viz.screenText('Each segment = ' + speed.toFixed(1) + ' m (one second of travel)', viz.width / 2, barY + barHeight + 20, viz.colors.text, 11, 'center');
                            }

                            // km/h conversion
                            var kmh = speed * 3.6;
                            viz.screenText('That is ' + kmh.toFixed(1) + ' km/h', viz.width / 2, 310, viz.colors.text, 13, 'center');
                        }

                        VizEngine.createSlider(controls, 'Distance (m)', 10, 500, 100, 10, function(v) { distance = v; draw(); });
                        VizEngine.createSlider(controls, 'Time (s)', 1, 60, 10, 0.5, function(v) { time = v; draw(); });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A runner covers 200 meters in 25 seconds. What is the runner\'s speed?',
                    hint: 'Use the formula: speed = distance / time.',
                    solution: 'Speed = 200 m / 25 s = 8 m/s. The runner covers 8 meters every second.'
                },
                {
                    question: 'A car travels at 80 km/h for 2.5 hours. How far does the car travel?',
                    hint: 'Use the rearranged formula: distance = speed x time.',
                    solution: 'Distance = speed x time = 80 km/h x 2.5 h = 200 km. The car travels 200 kilometers.'
                }
            ]
        },
        {
            id: 'comparing-speeds',
            title: 'Comparing Speeds',
            content: `
                <h2>Comparing Speeds</h2>
                <p>Now that you know how to calculate speed, let's compare speeds of different things in the world!</p>

                <div class="env-block intuition">
                    <div class="env-title">Speed Hall of Fame</div>
                    <div class="env-body">
                        <p>Here are some amazing speeds from nature and technology:</p>
                        <p>Snail: about 0.001 m/s (that's 1 millimeter per second!)</p>
                        <p>Walking human: about 1.4 m/s</p>
                        <p>Usain Bolt (fastest human): about 10.4 m/s</p>
                        <p>Cheetah: about 30 m/s</p>
                        <p>Speed of sound: about 343 m/s</p>
                        <p>Speed of light: 300,000,000 m/s (the fastest thing in the universe!)</p>
                    </div>
                </div>

                <p>To compare speeds fairly, we need to make sure we use the <strong>same units</strong>. You cannot compare 50 km/h with 20 m/s directly without converting one of them first!</p>

                <div class="env-block example">
                    <div class="env-title">Converting Units</div>
                    <div class="env-body">
                        <p>To convert km/h to m/s: divide by 3.6</p>
                        <p>To convert m/s to km/h: multiply by 3.6</p>
                        <p>Example: 72 km/h = 72 / 3.6 = 20 m/s</p>
                        <p>Example: 15 m/s = 15 x 3.6 = 54 km/h</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-speed-compare"></div>
            `,
            visualizations: [
                {
                    id: 'viz-speed-compare',
                    title: 'Speed Comparison Chart',
                    description: 'Compare speeds of different animals and vehicles on a visual scale',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 40, originX: 350, originY: 175 });
                        var showKmh = false;

                        var items = [
                            { name: 'Snail', speed: 0.001, color: viz.colors.text },
                            { name: 'Tortoise', speed: 0.07, color: viz.colors.green },
                            { name: 'Walking', speed: 1.4, color: viz.colors.blue },
                            { name: 'Running', speed: 5, color: viz.colors.teal },
                            { name: 'Bicycle', speed: 8, color: viz.colors.purple },
                            { name: 'Cheetah', speed: 30, color: viz.colors.yellow },
                            { name: 'Car (highway)', speed: 30, color: viz.colors.orange },
                            { name: 'Bullet Train', speed: 83, color: viz.colors.red },
                            { name: 'Airplane', speed: 250, color: viz.colors.pink }
                        ];

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            viz.screenText('Speed Comparison', viz.width / 2, 20, viz.colors.white, 16, 'center');
                            viz.screenText(showKmh ? 'Units: km/h' : 'Units: m/s', viz.width / 2, 40, viz.colors.teal, 12, 'center');

                            var maxSpeed = 250;
                            var barMaxWidth = 380;
                            var startX = 180;
                            var topY = 60;
                            var barHeight = 22;
                            var gap = 8;

                            for (var i = 0; i < items.length; i++) {
                                var item = items[i];
                                var y = topY + i * (barHeight + gap);
                                var displaySpeed = showKmh ? item.speed * 3.6 : item.speed;
                                var barW = Math.max(2, (Math.log10(item.speed + 0.001) + 3) / (Math.log10(maxSpeed) + 3) * barMaxWidth);

                                // Label
                                viz.screenText(item.name, startX - 10, y + barHeight / 2, item.color, 11, 'right');

                                // Bar
                                ctx.fillStyle = item.color + '44';
                                ctx.fillRect(startX, y, barW, barHeight);
                                ctx.fillStyle = item.color;
                                ctx.fillRect(startX, y, barW, 3);

                                // Speed number
                                var speedText = displaySpeed < 1 ? displaySpeed.toFixed(3) : displaySpeed.toFixed(1);
                                var unit = showKmh ? ' km/h' : ' m/s';
                                viz.screenText(speedText + unit, startX + barW + 8, y + barHeight / 2, item.color, 10, 'left');
                            }

                            viz.screenText('(Logarithmic scale -- each bar step is 10x bigger!)', viz.width / 2, 340, viz.colors.text, 10, 'center');
                        }

                        VizEngine.createButton(controls, 'Show m/s', function() { showKmh = false; draw(); });
                        VizEngine.createButton(controls, 'Show km/h', function() { showKmh = true; draw(); });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Convert 108 km/h to m/s.',
                    hint: 'To convert from km/h to m/s, divide by 3.6.',
                    solution: '108 km/h / 3.6 = 30 m/s.'
                },
                {
                    question: 'A cheetah runs at 30 m/s and a car drives at 100 km/h. Which is faster?',
                    hint: 'Convert to the same units first!',
                    solution: 'Convert 100 km/h to m/s: 100 / 3.6 = 27.8 m/s. The cheetah at 30 m/s is faster than the car at 27.8 m/s!'
                }
            ]
        },
        {
            id: 'distance-time-graphs',
            title: 'Distance-Time Graphs',
            content: `
                <h2>Distance-Time Graphs</h2>
                <p>One of the best ways to understand motion is to draw a picture of it! A <strong>distance-time graph</strong> shows how far an object has traveled at each moment in time.</p>

                <div class="env-block definition">
                    <div class="env-title">Distance-Time Graph</div>
                    <div class="env-body">
                        <p>A <strong>distance-time graph</strong> has time on the horizontal axis (\\(x\\)-axis) and distance on the vertical axis (\\(y\\)-axis). Each point on the graph tells you how far the object is from the start at that moment.</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Reading the Graph</div>
                    <div class="env-body">
                        <p><strong>A straight line going up</strong> = constant speed (the object moves the same amount each second).</p>
                        <p><strong>A steeper line</strong> = faster speed (more distance covered per second).</p>
                        <p><strong>A flat horizontal line</strong> = the object is stopped (distance is not changing).</p>
                        <p><strong>A curved line bending upward</strong> = speeding up (accelerating).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-dt-graph"></div>

                <div class="env-block example">
                    <div class="env-title">Example: Reading a Graph</div>
                    <div class="env-body">
                        <p>If a graph shows a straight line from (0, 0) to (10, 50), the object traveled 50 meters in 10 seconds.</p>
                        <p>Speed = 50 m / 10 s = 5 m/s.</p>
                        <p>The slope (steepness) of the line IS the speed!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-dt-graph',
                    title: 'Distance-Time Graph Builder',
                    description: 'Adjust the speed and see how the distance-time graph changes',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 1, originX: 80, originY: 300 });
                        var speed1 = 3;
                        var speed2 = 6;
                        var showSecond = true;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Custom axes for distance-time
                            var leftMargin = 80;
                            var bottomMargin = 50;
                            var plotWidth = 550;
                            var plotHeight = 250;
                            var plotLeft = leftMargin;
                            var plotBottom = 300;
                            var plotTop = plotBottom - plotHeight;

                            // Grid
                            ctx.strokeStyle = viz.colors.grid;
                            ctx.lineWidth = 0.5;
                            for (var gx = 0; gx <= 10; gx++) {
                                var px = plotLeft + gx * plotWidth / 10;
                                ctx.beginPath(); ctx.moveTo(px, plotTop); ctx.lineTo(px, plotBottom); ctx.stroke();
                            }
                            for (var gy = 0; gy <= 5; gy++) {
                                var py = plotBottom - gy * plotHeight / 5;
                                ctx.beginPath(); ctx.moveTo(plotLeft, py); ctx.lineTo(plotLeft + plotWidth, py); ctx.stroke();
                            }

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(plotLeft, plotTop); ctx.lineTo(plotLeft, plotBottom); ctx.lineTo(plotLeft + plotWidth, plotBottom); ctx.stroke();

                            // Axis labels
                            viz.screenText('Time (s)', plotLeft + plotWidth / 2, plotBottom + 35, viz.colors.text, 13, 'center');
                            ctx.save();
                            ctx.translate(20, plotTop + plotHeight / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Distance (m)', 0, 0);
                            ctx.restore();

                            // Tick labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var tx = 0; tx <= 10; tx++) {
                                ctx.fillText(String(tx), plotLeft + tx * plotWidth / 10, plotBottom + 5);
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            var maxDist = 60;
                            for (var ty = 0; ty <= 5; ty++) {
                                ctx.fillText(String(ty * maxDist / 5), plotLeft - 5, plotBottom - ty * plotHeight / 5);
                            }

                            // Plot line 1
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i <= 100; i++) {
                                var t = i / 10;
                                var d = speed1 * t;
                                var sx = plotLeft + t * plotWidth / 10;
                                var sy = plotBottom - (d / maxDist) * plotHeight;
                                if (sy < plotTop) break;
                                if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
                            }
                            ctx.stroke();
                            viz.screenText('Object 1: ' + speed1.toFixed(1) + ' m/s', plotLeft + plotWidth - 80, plotTop + 20, viz.colors.blue, 12, 'center');

                            // Plot line 2
                            if (showSecond) {
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var j = 0; j <= 100; j++) {
                                    var t2 = j / 10;
                                    var d2 = speed2 * t2;
                                    var sx2 = plotLeft + t2 * plotWidth / 10;
                                    var sy2 = plotBottom - (d2 / maxDist) * plotHeight;
                                    if (sy2 < plotTop) break;
                                    if (j === 0) ctx.moveTo(sx2, sy2); else ctx.lineTo(sx2, sy2);
                                }
                                ctx.stroke();
                                viz.screenText('Object 2: ' + speed2.toFixed(1) + ' m/s', plotLeft + plotWidth - 80, plotTop + 40, viz.colors.orange, 12, 'center');
                            }

                            // Slope explanation
                            viz.screenText('Steeper line = faster speed!', viz.width / 2, 20, viz.colors.teal, 13, 'center');
                        }

                        VizEngine.createSlider(controls, 'Speed 1 (m/s)', 0.5, 10, 3, 0.5, function(v) { speed1 = v; draw(); });
                        VizEngine.createSlider(controls, 'Speed 2 (m/s)', 0.5, 10, 6, 0.5, function(v) { speed2 = v; draw(); });
                        VizEngine.createButton(controls, 'Toggle Object 2', function() { showSecond = !showSecond; draw(); });

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'On a distance-time graph, Object A has a steeper line than Object B. Which one is moving faster?',
                    hint: 'A steeper line means more distance in the same time.',
                    solution: 'Object A is moving faster. A steeper line on a distance-time graph means the object covers more distance in each unit of time, which means it has a greater speed.'
                },
                {
                    question: 'On a distance-time graph, a line is perfectly horizontal (flat). What does this mean about the object?',
                    hint: 'If the distance is not changing as time passes...',
                    solution: 'A flat horizontal line means the object has stopped. The distance is not changing even though time is passing, so the speed is zero.'
                }
            ]
        }
    ]
});
