window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch04',
    number: 4,
    title: 'Motion Graphs',
    subtitle: 'Telling Stories with Lines',
    sections: [
        {
            id: 'reading-distance-time',
            title: 'Reading Distance-Time Graphs',
            content: `
                <h2>Stories on a Graph</h2>
                <p>Imagine you're watching a friend walk to school. You can describe their whole trip with just a picture called a <strong>distance-time graph</strong>.</p>

                <div class="env-block definition">
                    <div class="env-title">Distance-Time Graph</div>
                    <div class="env-body"><p>A graph that shows <em>how far</em> something has traveled at <em>each moment in time</em>. Time goes along the horizontal axis and distance goes up the vertical axis.</p></div>
                </div>

                <p>Here is the key idea: every point on the graph tells you <strong>where</strong> something is at a certain <strong>time</strong>.</p>

                <ul>
                    <li>A <strong>flat line</strong> means the object is standing still &mdash; distance is not changing.</li>
                    <li>A <strong>line going up</strong> means the object is moving away.</li>
                    <li>A <strong>steep line</strong> means it is moving fast; a <strong>gentle line</strong> means it is moving slowly.</li>
                </ul>

                <div class="env-block intuition">
                    <div class="env-title">Think of It This Way</div>
                    <div class="env-body"><p>A distance-time graph is like a story. The beginning is on the left, and as you read to the right, time passes. The height of the line tells you where the character is in the story!</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-dt-reader"></div>

                <p>Try the interactive graph above. Click the <strong>Play</strong> button and watch the car move along the road while the graph draws itself. Notice how flat parts mean the car stops, and steep parts mean it moves fast!</p>
            `,
            visualizations: [
                {
                    id: 'viz-dt-reader',
                    title: 'Distance-Time Graph Reader',
                    description: 'Watch an object move while the distance-time graph draws in real time.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 1, originX: 80, originY: 310 });
                        var segments = [
                            { dur: 2, speed: 40 },
                            { dur: 1.5, speed: 0 },
                            { dur: 2, speed: 80 },
                            { dur: 1, speed: 0 },
                            { dur: 2.5, speed: 30 }
                        ];
                        var totalTime = 0;
                        for (var i = 0; i < segments.length; i++) totalTime += segments[i].dur;
                        var maxDist = 0;
                        var d = 0;
                        for (var i = 0; i < segments.length; i++) { d += segments[i].speed * segments[i].dur; }
                        maxDist = d;

                        var scaleX = 550 / totalTime;
                        var scaleY = 250 / maxDist;

                        var playing = false;
                        var startTimeStamp = 0;
                        var animTime = 0;

                        function getDistance(t) {
                            var elapsed = 0;
                            var dist = 0;
                            for (var i = 0; i < segments.length; i++) {
                                var segEnd = elapsed + segments[i].dur;
                                if (t <= segEnd) {
                                    dist += segments[i].speed * (t - elapsed);
                                    return dist;
                                }
                                dist += segments[i].speed * segments[i].dur;
                                elapsed = segEnd;
                            }
                            return dist;
                        }

                        function draw(currentT) {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Draw axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(80, 310);
                            ctx.lineTo(650, 310);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(80, 310);
                            ctx.lineTo(80, 40);
                            ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Time (seconds)', 365, 340);
                            ctx.save();
                            ctx.translate(25, 175);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Distance (meters)', 0, 0);
                            ctx.restore();

                            // Tick marks
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var t = 0; t <= totalTime; t += 1) {
                                var px = 80 + t * scaleX;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(t.toFixed(0), px, 314);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(px, 310); ctx.lineTo(px, 40); ctx.stroke();
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var dd = 0; dd <= maxDist; dd += 40) {
                                var py = 310 - dd * scaleY;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(dd.toFixed(0), 72, py);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(80, py); ctx.lineTo(650, py); ctx.stroke();
                            }

                            // Draw graph line up to currentT
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            var steps = Math.floor(currentT * 30);
                            for (var s = 0; s <= steps; s++) {
                                var tt = (s / 30);
                                if (tt > totalTime) tt = totalTime;
                                var dd = getDistance(tt);
                                var px = 80 + tt * scaleX;
                                var py = 310 - dd * scaleY;
                                if (s === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Current point
                            var curDist = getDistance(Math.min(currentT, totalTime));
                            var cpx = 80 + Math.min(currentT, totalTime) * scaleX;
                            var cpy = 310 - curDist * scaleY;
                            ctx.fillStyle = viz.colors.orange;
                            ctx.beginPath();
                            ctx.arc(cpx, cpy, 6, 0, Math.PI * 2);
                            ctx.fill();

                            // Draw car (simple rectangle) on road at top
                            var roadY = 22;
                            var carX = 80 + (curDist / maxDist) * 550;
                            ctx.fillStyle = '#1a1a40';
                            ctx.fillRect(80, roadY - 8, 570, 16);
                            ctx.strokeStyle = viz.colors.muted || viz.colors.text;
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(80, roadY + 8); ctx.lineTo(650, roadY + 8); ctx.stroke();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.fillRect(carX - 15, roadY - 6, 30, 12);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('CAR', carX, roadY);

                            // Status text
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('t = ' + Math.min(currentT, totalTime).toFixed(1) + ' s,  d = ' + curDist.toFixed(0) + ' m', 400, 45);
                        }

                        draw(0);

                        VizEngine.createButton(controls, 'Play', function() {
                            if (playing) return;
                            playing = true;
                            animTime = 0;
                            startTimeStamp = 0;
                            viz.animate(function(timestamp) {
                                if (startTimeStamp === 0) startTimeStamp = timestamp;
                                animTime = (timestamp - startTimeStamp) / 1000;
                                draw(animTime);
                                if (animTime >= totalTime + 0.5) {
                                    viz.stopAnimation();
                                    playing = false;
                                    draw(totalTime);
                                }
                            });
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            viz.stopAnimation();
                            playing = false;
                            animTime = 0;
                            draw(0);
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'On a distance-time graph, what does a flat horizontal line mean?',
                    hint: 'Think about what happens to the distance when time passes but the line stays the same height.',
                    solution: 'A flat horizontal line means the object is not moving (it is at rest). The distance stays the same while time passes.'
                },
                {
                    question: 'If a line on a distance-time graph goes steeply upward, is the object moving fast or slow?',
                    hint: 'A steep line means the distance changes a lot in a short time.',
                    solution: 'The object is moving fast. A steep line means a large distance is covered in a short time, which means high speed.'
                }
            ]
        },
        {
            id: 'drawing-distance-time',
            title: 'Drawing Distance-Time Graphs',
            content: `
                <h2>From Story to Graph</h2>
                <p>Now let's go the other way &mdash; you have a story, and you need to draw the graph!</p>

                <div class="env-block example">
                    <div class="env-title">Example: A Dog's Walk</div>
                    <div class="env-body">
                        <p>A dog walks 20 meters in 4 seconds, then stops for 3 seconds to sniff a tree, then runs 30 meters in 2 seconds.</p>
                        <p>To draw this, we plot three pieces:</p>
                        <ul>
                            <li>0 to 4 s: line goes from 0 m to 20 m (gentle slope)</li>
                            <li>4 to 7 s: flat line at 20 m (standing still)</li>
                            <li>7 to 9 s: line goes from 20 m to 50 m (steep slope &mdash; fast!)</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-graph-builder"></div>

                <div class="env-block remark">
                    <div class="env-title">Pro Tip</div>
                    <div class="env-body"><p>When drawing a distance-time graph, always start by marking your time values on the horizontal axis and your distance values on the vertical axis. Then plot the key points and connect them!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-graph-builder',
                    title: 'Graph Builder',
                    description: 'Build a distance-time graph by placing waypoints, then watch the animation.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 1, originX: 80, originY: 310 });
                        var waypoints = [
                            { t: 0, d: 0 },
                            { t: 4, d: 20 },
                            { t: 7, d: 20 },
                            { t: 9, d: 50 }
                        ];
                        var maxT = 10;
                        var maxD = 60;
                        var scaleX = 550 / maxT;
                        var scaleY = 250 / maxD;

                        var currentWP = 0;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(80, 310); ctx.lineTo(650, 310); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(80, 310); ctx.lineTo(80, 40); ctx.stroke();

                            // Labels
                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Time (s)', 365, 340);
                            ctx.save();
                            ctx.translate(25, 175);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Distance (m)', 0, 0);
                            ctx.restore();

                            // Grid
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var t = 0; t <= maxT; t++) {
                                var px = 80 + t * scaleX;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(t, px, 314);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(px, 310); ctx.lineTo(px, 40); ctx.stroke();
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var dd = 0; dd <= maxD; dd += 10) {
                                var py = 310 - dd * scaleY;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(dd, 72, py);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(80, py); ctx.lineTo(650, py); ctx.stroke();
                            }

                            // Draw line segments
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (var i = 0; i <= currentWP && i < waypoints.length; i++) {
                                var px = 80 + waypoints[i].t * scaleX;
                                var py = 310 - waypoints[i].d * scaleY;
                                if (i === 0) ctx.moveTo(px, py);
                                else ctx.lineTo(px, py);
                            }
                            ctx.stroke();

                            // Draw waypoints
                            for (var i = 0; i < waypoints.length; i++) {
                                var px = 80 + waypoints[i].t * scaleX;
                                var py = 310 - waypoints[i].d * scaleY;
                                var col = i <= currentWP ? viz.colors.orange : viz.colors.muted || viz.colors.text;
                                ctx.fillStyle = col;
                                ctx.beginPath();
                                ctx.arc(px, py, 6, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'bottom';
                                ctx.fillText('(' + waypoints[i].t + ', ' + waypoints[i].d + ')', px + 8, py - 4);
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            if (currentWP < waypoints.length - 1) {
                                ctx.fillText('Click "Next Point" to add the next part of the story.', 120, 50);
                            } else {
                                ctx.fillText('Graph complete! The dog walked, stopped, then ran.', 120, 50);
                            }
                        }

                        draw();

                        VizEngine.createButton(controls, 'Next Point', function() {
                            if (currentWP < waypoints.length - 1) {
                                currentWP++;
                                draw();
                            }
                        });

                        VizEngine.createButton(controls, 'Reset', function() {
                            currentWP = 0;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A cat walks 10 meters in 5 seconds, rests for 3 seconds, then walks 15 meters in 2 seconds. What are the key points you would plot on a distance-time graph?',
                    hint: 'Find the time and distance at the start, end of each segment, and where the cat stops.',
                    solution: 'The key points are: (0, 0), (5, 10), (8, 10), (10, 25). At t=0 the cat starts, at t=5 it has walked 10 m, from t=5 to t=8 it rests at 10 m, and by t=10 it has reached 25 m.'
                }
            ]
        },
        {
            id: 'speed-from-slope',
            title: 'Speed from Graphs',
            content: `
                <h2>The Slope Secret</h2>
                <p>Here is the most powerful idea about distance-time graphs: the <strong>steepness</strong> (slope) of the line tells you the <strong>speed</strong>!</p>

                <div class="env-block definition">
                    <div class="env-title">Slope = Speed</div>
                    <div class="env-body">
                        <p>On a distance-time graph:</p>
                        \\[\\text{speed} = \\frac{\\text{change in distance}}{\\text{change in time}} = \\frac{\\Delta d}{\\Delta t}\\]
                        <p>This is exactly the slope of the line!</p>
                    </div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Why Does This Work?</div>
                    <div class="env-body"><p>Think about it: speed is "how much distance you cover per unit of time." That is exactly what slope measures &mdash; how much the line goes up for each step to the right!</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-slope-calc"></div>

                <div class="env-block example">
                    <div class="env-title">Reading Speed from the Graph</div>
                    <div class="env-body">
                        <p>If a line goes from the point \\((2, 10)\\) to \\((6, 50)\\), then:</p>
                        \\[\\text{speed} = \\frac{50 - 10}{6 - 2} = \\frac{40}{4} = 10 \\text{ m/s}\\]
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-slope-calc',
                    title: 'Slope Calculator',
                    description: 'Drag the endpoints to change the slope and see the speed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 1, originX: 80, originY: 310 });
                        var maxT = 10;
                        var maxD = 100;
                        var scaleX = 550 / maxT;
                        var scaleY = 250 / maxD;

                        var p1 = { t: 1, d: 10 };
                        var p2 = { t: 7, d: 70 };

                        function toPx(t, d) {
                            return [80 + t * scaleX, 310 - d * scaleY];
                        }
                        function fromPx(px, py) {
                            var t = (px - 80) / scaleX;
                            var d = (310 - py) / scaleY;
                            t = Math.max(0, Math.min(maxT, Math.round(t)));
                            d = Math.max(0, Math.min(maxD, Math.round(d / 5) * 5));
                            return { t: t, d: d };
                        }

                        var dragging = null;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(80, 310); ctx.lineTo(650, 310); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(80, 310); ctx.lineTo(80, 40); ctx.stroke();

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Time (s)', 365, 340);
                            ctx.save();
                            ctx.translate(25, 175);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Distance (m)', 0, 0);
                            ctx.restore();

                            // Grid
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var t = 0; t <= maxT; t++) {
                                var px = 80 + t * scaleX;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(t, px, 314);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(px, 310); ctx.lineTo(px, 40); ctx.stroke();
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var dd = 0; dd <= maxD; dd += 20) {
                                var py = 310 - dd * scaleY;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(dd, 72, py);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(80, py); ctx.lineTo(650, py); ctx.stroke();
                            }

                            // Draw the line segment
                            var s1 = toPx(p1.t, p1.d);
                            var s2 = toPx(p2.t, p2.d);
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke();

                            // Rise and run indicators
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 1.5;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s1[1]); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(s2[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke();
                            ctx.setLineDash([]);

                            // Labels for rise/run
                            ctx.fillStyle = viz.colors.orange;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            ctx.fillText('\u0394t = ' + (p2.t - p1.t), (s1[0] + s2[0]) / 2, s1[1] + 6);
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText('\u0394d = ' + (p2.d - p1.d), s2[0] + 6, (s1[1] + s2[1]) / 2);

                            // Draw draggable points
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath(); ctx.arc(s1[0], s1[1], 8, 0, Math.PI * 2); ctx.fill();
                            ctx.fillStyle = viz.colors.green;
                            ctx.beginPath(); ctx.arc(s2[0], s2[1], 8, 0, Math.PI * 2); ctx.fill();

                            // Speed display
                            var dt = p2.t - p1.t;
                            var dd = p2.d - p1.d;
                            var speed = dt !== 0 ? (dd / dt) : 0;
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Speed = ' + dd + ' / ' + dt + ' = ' + speed.toFixed(1) + ' m/s', 120, 50);

                            // Point labels
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'bottom';
                            ctx.fillText('(' + p1.t + ', ' + p1.d + ')', s1[0] + 10, s1[1] - 4);
                            ctx.fillText('(' + p2.t + ', ' + p2.d + ')', s2[0] + 10, s2[1] - 4);
                        }

                        draw();

                        // Mouse interaction for dragging points
                        viz.canvas.addEventListener('mousedown', function(e) {
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            var s1 = toPx(p1.t, p1.d);
                            var s2 = toPx(p2.t, p2.d);
                            if (Math.sqrt((mx - s1[0]) * (mx - s1[0]) + (my - s1[1]) * (my - s1[1])) < 15) {
                                dragging = p1;
                            } else if (Math.sqrt((mx - s2[0]) * (mx - s2[0]) + (my - s2[1]) * (my - s2[1])) < 15) {
                                dragging = p2;
                            }
                        });
                        viz.canvas.addEventListener('mousemove', function(e) {
                            if (!dragging) return;
                            var rect = viz.canvas.getBoundingClientRect();
                            var mx = e.clientX - rect.left;
                            var my = e.clientY - rect.top;
                            var pt = fromPx(mx, my);
                            dragging.t = pt.t;
                            dragging.d = pt.d;
                            draw();
                        });
                        viz.canvas.addEventListener('mouseup', function() { dragging = null; });
                        viz.canvas.addEventListener('mouseleave', function() { dragging = null; });
                    }
                }
            ],
            exercises: [
                {
                    question: 'A distance-time graph shows a straight line from (0, 0) to (5, 30). What is the speed?',
                    hint: 'Speed = change in distance / change in time.',
                    solution: 'Speed = (30 - 0) / (5 - 0) = 30 / 5 = 6 m/s.'
                },
                {
                    question: 'If the slope of a distance-time graph is zero, what can you say about the object?',
                    hint: 'A slope of zero means the line is flat.',
                    solution: 'The object is not moving (it is at rest). A slope of zero means no distance is being covered as time passes.'
                }
            ]
        },
        {
            id: 'comparing-motions',
            title: 'Comparing Motions on Graphs',
            content: `
                <h2>Two Runners, One Graph</h2>
                <p>One of the coolest things about graphs is that you can put <strong>multiple motions on the same graph</strong> and compare them instantly!</p>

                <div class="env-block intuition">
                    <div class="env-title">How to Compare</div>
                    <div class="env-body">
                        <p>When two lines are on the same graph:</p>
                        <ul>
                            <li>A <strong>steeper line</strong> means that object is faster.</li>
                            <li>Where two lines <strong>cross</strong>, the objects are at the same place at the same time!</li>
                            <li>If one line is <strong>always above</strong> another, that object is always ahead.</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-compare-motions"></div>

                <div class="env-block warning">
                    <div class="env-title">Common Mistake</div>
                    <div class="env-body"><p>Two lines crossing does NOT mean the objects crash into each other. It means they happen to be at the same distance from the start at the same time. They could be on completely different paths!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-compare-motions',
                    title: 'Compare Two Motions',
                    description: 'Adjust the speeds of two runners and compare their distance-time graphs.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, { width: 700, height: 350, scale: 1, originX: 80, originY: 310 });
                        var maxT = 10;
                        var maxD = 100;
                        var scaleX = 550 / maxT;
                        var scaleY = 250 / maxD;

                        var speed1 = 8;
                        var speed2 = 5;
                        var head2 = 20;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;

                            // Axes
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath(); ctx.moveTo(80, 310); ctx.lineTo(650, 310); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(80, 310); ctx.lineTo(80, 40); ctx.stroke();

                            ctx.fillStyle = viz.colors.text;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Time (s)', 365, 340);
                            ctx.save();
                            ctx.translate(25, 175);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText('Distance (m)', 0, 0);
                            ctx.restore();

                            // Grid
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'top';
                            for (var t = 0; t <= maxT; t++) {
                                var px = 80 + t * scaleX;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(t, px, 314);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(px, 310); ctx.lineTo(px, 40); ctx.stroke();
                            }
                            ctx.textAlign = 'right';
                            ctx.textBaseline = 'middle';
                            for (var dd = 0; dd <= maxD; dd += 20) {
                                var py = 310 - dd * scaleY;
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText(dd, 72, py);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(80, py); ctx.lineTo(650, py); ctx.stroke();
                            }

                            // Runner A: starts at 0
                            ctx.strokeStyle = viz.colors.blue;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(80, 310);
                            var endD1 = Math.min(speed1 * maxT, maxD);
                            var endT1 = endD1 / speed1;
                            ctx.lineTo(80 + endT1 * scaleX, 310 - endD1 * scaleY);
                            ctx.stroke();

                            // Runner B: starts at head2
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.moveTo(80, 310 - head2 * scaleY);
                            var endD2 = Math.min(head2 + speed2 * maxT, maxD);
                            var endT2 = (endD2 - head2) / speed2;
                            ctx.lineTo(80 + endT2 * scaleX, 310 - endD2 * scaleY);
                            ctx.stroke();

                            // Crossing point
                            if (speed1 !== speed2) {
                                var crossT = head2 / (speed1 - speed2);
                                if (crossT > 0 && crossT <= maxT) {
                                    var crossD = speed1 * crossT;
                                    if (crossD >= 0 && crossD <= maxD) {
                                        var cpx = 80 + crossT * scaleX;
                                        var cpy = 310 - crossD * scaleY;
                                        ctx.fillStyle = viz.colors.green;
                                        ctx.beginPath(); ctx.arc(cpx, cpy, 7, 0, Math.PI * 2); ctx.fill();
                                        ctx.fillStyle = viz.colors.white;
                                        ctx.font = '11px -apple-system,sans-serif';
                                        ctx.textAlign = 'left';
                                        ctx.textBaseline = 'bottom';
                                        ctx.fillText('Meet! t=' + crossT.toFixed(1) + 's', cpx + 8, cpy - 4);
                                    }
                                }
                            }

                            // Legend
                            ctx.fillStyle = viz.colors.blue;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'top';
                            ctx.fillText('Runner A: ' + speed1 + ' m/s, starts at 0 m', 120, 48);
                            ctx.fillStyle = viz.colors.orange;
                            ctx.fillText('Runner B: ' + speed2 + ' m/s, starts at ' + head2 + ' m', 120, 68);
                        }

                        draw();

                        VizEngine.createSlider(controls, 'Speed A (m/s)', 1, 15, speed1, 1, function(v) {
                            speed1 = v;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'Speed B (m/s)', 1, 15, speed2, 1, function(v) {
                            speed2 = v;
                            draw();
                        });
                        VizEngine.createSlider(controls, 'B head start (m)', 0, 50, head2, 5, function(v) {
                            head2 = v;
                            draw();
                        });
                    }
                }
            ],
            exercises: [
                {
                    question: 'Runner A moves at 6 m/s from the start. Runner B starts 18 m ahead but only moves at 3 m/s. After how many seconds does Runner A catch up?',
                    hint: 'Set up the equation: 6t = 18 + 3t, then solve for t.',
                    solution: 'Runner A distance = 6t. Runner B distance = 18 + 3t. They meet when 6t = 18 + 3t, so 3t = 18, t = 6 seconds.'
                },
                {
                    question: 'On a distance-time graph, two lines cross at the point (4, 20). What does this tell you?',
                    hint: 'The crossing point gives a time and a distance. What does it mean for both objects to share these values?',
                    solution: 'At time t = 4 seconds, both objects are at a distance of 20 meters from the starting point. They are at the same position at that moment.'
                }
            ]
        }
    ]
});
