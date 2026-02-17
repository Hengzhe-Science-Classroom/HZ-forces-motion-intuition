window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch15',
    number: 15,
    title: 'Pulleys',
    subtitle: 'Lift Heavy Things Easily',
    sections: [
        {
            id: 'fixed-pulleys',
            title: 'Fixed Pulleys',
            content: `
                <h2>Fixed Pulleys: Changing Direction</h2>
                <p>A <strong>pulley</strong> is a wheel with a groove that holds a rope. The simplest type is a <strong>fixed pulley</strong> — it is attached to a ceiling or frame and does not move up or down.</p>

                <div class="env-block definition">
                    <div class="env-title">Fixed Pulley</div>
                    <div class="env-body">
                        <p>A fixed pulley changes the <em>direction</em> of the force. Instead of pushing up to lift a heavy box, you pull down on the rope. Pulling down is easier because you can use your own body weight to help!</p>
                        <p>However, a fixed pulley does <strong>not</strong> reduce the force needed. You still pull with the same force as the weight of the load.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-fixed-pulley"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>Think of a flag pole! You pull the rope down, and the flag goes up. That is a fixed pulley in action. You are not using less force — you are just changing the direction so it is more convenient.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-fixed-pulley',
                    title: 'Fixed Pulley Demo',
                    description: 'See how a fixed pulley changes the direction of force.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 380, scale: 40, originX: 350, originY: 190});
                        var pullAmount = 0.5;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var loadY = 320 - pullAmount * 180;
                            var ropeEndY = 100 + pullAmount * 180;

                            // Ceiling
                            ctx.fillStyle = '#2a2a4a';
                            ctx.fillRect(200, 30, 300, 15);
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(200, 45);
                            ctx.lineTo(500, 45);
                            ctx.stroke();

                            // Pulley mount
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(350, 45);
                            ctx.lineTo(350, 70);
                            ctx.stroke();

                            // Pulley wheel
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(350, 85, 15, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.arc(350, 85, 4, 0, Math.PI * 2);
                            ctx.fill();

                            // Rope - left side (load)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(335, 85);
                            ctx.lineTo(335, loadY);
                            ctx.stroke();

                            // Rope - over pulley
                            ctx.beginPath();
                            ctx.arc(350, 85, 15, Math.PI, 0, false);
                            ctx.stroke();

                            // Rope - right side (pull)
                            ctx.beginPath();
                            ctx.moveTo(365, 85);
                            ctx.lineTo(365, ropeEndY);
                            ctx.stroke();

                            // Load box
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(310, loadY, 50, 40);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('10 N', 335, loadY + 20);

                            // Hand / effort arrow
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(365, ropeEndY);
                            ctx.lineTo(355, ropeEndY - 15);
                            ctx.lineTo(375, ropeEndY - 15);
                            ctx.closePath();
                            ctx.fill();

                            // Labels
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Pull: 10 N', 385, ropeEndY);
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillText('Load: 10 N', 250, loadY + 20);

                            ctx.fillStyle = viz.colors.teal;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Fixed Pulley', 350, 20);

                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '13px -apple-system,sans-serif';
                            ctx.fillText('Same force, different direction!', 350, 370);
                        }

                        VizEngine.createSlider(controls, 'Pull Rope', 0, 1, pullAmount, 0.05, function(v) { pullAmount = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A box weighs 50 N. If you use a single fixed pulley, how much force do you need to lift it?',
                    hint: 'Does a fixed pulley change the amount of force needed?',
                    solution: 'You need 50 N. A fixed pulley only changes the direction of the force, not the amount.'
                },
                {
                    question: 'Why is it useful to change the direction of a force, even if the force stays the same?',
                    hint: 'Think about which direction is easier for your body to push.',
                    solution: 'Pulling down is easier than pushing up because you can use your own body weight to help. It is also more comfortable to stand on the ground and pull than to climb up and push.'
                }
            ]
        },
        {
            id: 'movable-pulleys',
            title: 'Movable Pulleys',
            content: `
                <h2>Movable Pulleys: Cutting Force in Half</h2>
                <p>A <strong>movable pulley</strong> is attached to the load and moves up with it. One end of the rope is tied to the ceiling, and you pull the other end.</p>

                <div class="env-block definition">
                    <div class="env-title">Movable Pulley Advantage</div>
                    <div class="env-body">
                        <p>With a movable pulley, two sections of rope support the load. This means each section carries half the weight. You only need to pull with <strong>half the force</strong>!</p>
                        <p>\\[ \\text{Effort} = \\frac{\\text{Load}}{2} \\]</p>
                        <p>But there is a trade-off: you must pull the rope <strong>twice as far</strong> to lift the load the same height.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-movable-pulley"></div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>It is like a magic trick: you get to use less force, but you have to pull more rope. The total work (force times distance) stays the same. Nature never gives you something for nothing!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-movable-pulley',
                    title: 'Movable Pulley Demo',
                    description: 'See how a movable pulley cuts the needed force in half.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 380, scale: 40, originX: 350, originY: 190});
                        var loadWeight = 100;
                        var pullAmount = 0.3;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var effort = loadWeight / 2;
                            var pulleyY = 260 - pullAmount * 150;
                            var ropeEndY = 60 + pullAmount * 150;

                            // Ceiling
                            ctx.fillStyle = '#2a2a4a';
                            ctx.fillRect(180, 30, 340, 15);
                            ctx.strokeStyle = viz.colors.muted;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(180, 45);
                            ctx.lineTo(520, 45);
                            ctx.stroke();

                            // Fixed anchor point
                            ctx.fillStyle = viz.colors.muted;
                            ctx.beginPath();
                            ctx.arc(300, 50, 5, 0, Math.PI * 2);
                            ctx.fill();

                            // Rope segment 1: anchor to pulley (left side)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(300, 55);
                            ctx.lineTo(300, pulleyY);
                            ctx.stroke();

                            // Movable pulley
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(330, pulleyY, 15, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.teal;
                            ctx.beginPath();
                            ctx.arc(330, pulleyY, 4, 0, Math.PI * 2);
                            ctx.fill();

                            // Rope segment 2: pulley to pull (right side up)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(345, pulleyY);
                            ctx.lineTo(400, pulleyY);
                            ctx.lineTo(400, ropeEndY);
                            ctx.stroke();

                            // Rope over pulley
                            ctx.beginPath();
                            ctx.arc(330, pulleyY, 15, Math.PI, 0, false);
                            ctx.stroke();

                            // Load hanging from pulley
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(305, pulleyY + 18, 50, 40);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(loadWeight + ' N', 330, pulleyY + 38);

                            // Pull arrow
                            ctx.fillStyle = viz.colors.blue;
                            ctx.beginPath();
                            ctx.moveTo(400, ropeEndY + 5);
                            ctx.lineTo(390, ropeEndY - 10);
                            ctx.lineTo(410, ropeEndY - 10);
                            ctx.closePath();
                            ctx.fill();

                            // Rope section labels
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.orange;
                            ctx.textAlign = 'left';
                            ctx.fillText('T1', 280, (55 + pulleyY) / 2);
                            ctx.fillText('T2', 410, (ropeEndY + pulleyY) / 2);

                            // Info
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillStyle = viz.colors.blue;
                            ctx.fillText('Effort: ' + effort + ' N', 480, ropeEndY + 5);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('Force cut in half!', 350, 370);

                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Two rope sections share the load equally', 350, 355);
                        }

                        VizEngine.createSlider(controls, 'Load (N)', 20, 200, loadWeight, 10, function(v) { loadWeight = v; draw(); });
                        VizEngine.createSlider(controls, 'Pull Rope', 0, 1, pullAmount, 0.05, function(v) { pullAmount = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'You need to lift a 200 N box using a single movable pulley. How much force do you need?',
                    hint: 'A movable pulley shares the load between two rope segments.',
                    solution: 'You need 200/2 = 100 N. The movable pulley cuts the needed force in half.'
                }
            ]
        },
        {
            id: 'pulley-systems',
            title: 'Pulley Systems',
            content: `
                <h2>Pulley Systems: More Pulleys, Less Force</h2>
                <p>What if one pulley can cut force in half? What happens if we add more pulleys? The force gets divided even further!</p>

                <div class="env-block definition">
                    <div class="env-title">Compound Pulley System</div>
                    <div class="env-body">
                        <p>By combining fixed and movable pulleys, we create a <strong>pulley system</strong> (also called a block and tackle). The more rope sections supporting the load, the less force you need:</p>
                        <p>\\[ \\text{Effort} = \\frac{\\text{Load}}{n} \\]</p>
                        <p>where \\(n\\) is the number of rope sections supporting the load.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-pulley-system"></div>

                <div class="env-block example">
                    <div class="env-title">Example</div>
                    <div class="env-body">
                        <p>A crane uses a pulley system with 6 supporting ropes. To lift a 6000 N steel beam:</p>
                        <p>\\( \\text{Effort} = \\frac{6000}{6} = 1000 \\text{ N} \\)</p>
                        <p>But the rope must be pulled 6 times the lifting distance!</p>
                    </div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">The Trade-Off</div>
                    <div class="env-body"><p>More pulleys = less force, but more rope to pull. If you use 4 pulleys and lift a box 1 meter, you must pull 4 meters of rope. The total work is always the same!</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-pulley-system',
                    title: 'Build-a-Pulley System',
                    description: 'Add pulleys and see how the required force changes.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 380, scale: 40, originX: 350, originY: 190});
                        var numPulleys = 1;
                        var loadWeight = 120;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var effort = loadWeight / numPulleys;

                            // Title
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 16px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(numPulleys + (numPulleys === 1 ? ' Pulley' : ' Pulleys'), 350, 25);

                            // Ceiling
                            ctx.fillStyle = '#2a2a4a';
                            ctx.fillRect(100, 40, 500, 12);

                            // Draw simple representations
                            var startX = 350 - (numPulleys - 1) * 40;
                            for (var i = 0; i < numPulleys; i++) {
                                var px = startX + i * 80;
                                var isFixed = i % 2 === 0;
                                var py = isFixed ? 75 : 200;

                                // Mount line for fixed
                                if (isFixed) {
                                    ctx.strokeStyle = viz.colors.muted;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(px, 52);
                                    ctx.lineTo(px, py - 15);
                                    ctx.stroke();
                                }

                                // Pulley
                                ctx.strokeStyle = isFixed ? viz.colors.teal : viz.colors.purple;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(px, py, 12, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.fillStyle = isFixed ? viz.colors.teal : viz.colors.purple;
                                ctx.beginPath();
                                ctx.arc(px, py, 3, 0, Math.PI * 2);
                                ctx.fill();

                                // Label
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText(isFixed ? 'Fixed' : 'Movable', px, py + 25);
                            }

                            // Rope representation (simplified)
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.setLineDash([4, 3]);
                            if (numPulleys === 1) {
                                ctx.beginPath();
                                ctx.moveTo(startX - 12, 75);
                                ctx.lineTo(startX - 12, 270);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(startX + 12, 75);
                                ctx.lineTo(startX + 12, 140);
                                ctx.stroke();
                            }
                            ctx.setLineDash([]);

                            // Load
                            ctx.fillStyle = viz.colors.red;
                            var loadX = numPulleys <= 2 ? startX : startX + 40;
                            ctx.fillRect(loadX - 30, 270, 60, 40);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 12px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText(loadWeight + ' N', loadX, 290);

                            // Force comparison bar chart
                            var barX = 520;
                            var barMaxH = 150;
                            var barW = 50;

                            // Original force bar
                            ctx.fillStyle = viz.colors.red + '66';
                            ctx.fillRect(barX, 310 - barMaxH, barW, barMaxH);
                            ctx.fillStyle = viz.colors.red;
                            ctx.font = '11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('No pulley', barX + barW / 2, 325);
                            ctx.fillText(loadWeight + ' N', barX + barW / 2, 310 - barMaxH - 10);

                            // Reduced force bar
                            var reducedH = barMaxH / numPulleys;
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillRect(barX + barW + 15, 310 - reducedH, barW, reducedH);
                            ctx.fillStyle = viz.colors.green;
                            ctx.fillText('With pulleys', barX + barW + 15 + barW / 2, 325);
                            ctx.fillText(effort.toFixed(0) + ' N', barX + barW + 15 + barW / 2, 310 - reducedH - 10);

                            // Summary
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('Effort = ' + loadWeight + ' / ' + numPulleys + ' = ' + effort.toFixed(1) + ' N', 250, 340);
                            ctx.fillStyle = viz.colors.muted;
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillText('Rope to pull: ' + numPulleys + 'x the lifting distance', 250, 360);
                        }

                        VizEngine.createSlider(controls, 'Number of Pulleys', 1, 6, numPulleys, 1, function(v) { numPulleys = v; draw(); });
                        VizEngine.createSlider(controls, 'Load (N)', 60, 300, loadWeight, 10, function(v) { loadWeight = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'A pulley system has 4 rope sections supporting the load. If the load is 200 N, how much effort is needed?',
                    hint: 'Divide the load by the number of supporting rope sections.',
                    solution: 'Effort = 200/4 = 50 N. You only need 50 N of force, but you must pull 4 times the distance.'
                }
            ]
        },
        {
            id: 'real-world-pulleys',
            title: 'Real-World Pulleys',
            content: `
                <h2>Real-World Pulleys</h2>
                <p>Pulleys are used all around us in amazing ways!</p>

                <div class="env-block example">
                    <div class="env-title">Pulleys in Action</div>
                    <div class="env-body">
                        <p><strong>Construction cranes</strong> use compound pulley systems to lift steel beams weighing thousands of kilograms.</p>
                        <p><strong>Elevators</strong> use pulleys with counterweights so the motor only needs to lift the difference between the elevator and its counterweight.</p>
                        <p><strong>Flagpoles</strong> use a simple fixed pulley so you can raise a flag from the ground.</p>
                        <p><strong>Sailing ships</strong> used dozens of pulleys to let a small crew control huge heavy sails.</p>
                        <p><strong>Window blinds</strong> use tiny pulleys to let you raise and lower them easily.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="viz-crane-pulley"></div>

                <div class="env-block remark">
                    <div class="env-title">Fun Fact</div>
                    <div class="env-body"><p>The ancient Greeks used pulley systems called "polyspastos" to build massive temples. A single person could lift a stone block weighing over 100 kg using a system of multiple pulleys!</p></div>
                </div>

                <div class="env-block intuition">
                    <div class="env-title">Discovery</div>
                    <div class="env-body"><p>An elevator with a counterweight is brilliant. If the elevator cabin weighs 5000 N and the counterweight also weighs 5000 N, the motor only needs to lift the weight of the passengers! This saves huge amounts of energy.</p></div>
                </div>
            `,
            visualizations: [
                {
                    id: 'viz-crane-pulley',
                    title: 'Crane Pulley System',
                    description: 'See how a crane uses pulleys to lift heavy loads.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {width: 700, height: 380, scale: 40, originX: 350, originY: 190});
                        var liftAmount = 0;

                        function draw() {
                            viz.clear();
                            var ctx = viz.ctx;
                            var loadY = 320 - liftAmount * 150;

                            // Ground
                            ctx.fillStyle = '#1a2a1a';
                            ctx.fillRect(0, 340, 700, 40);

                            // Crane tower
                            ctx.fillStyle = '#3a3a5a';
                            ctx.fillRect(80, 40, 30, 300);

                            // Crane arm
                            ctx.fillStyle = '#4a4a6a';
                            ctx.fillRect(80, 40, 350, 18);

                            // Pulley at tip
                            ctx.strokeStyle = viz.colors.teal;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(400, 55, 12, 0, Math.PI * 2);
                            ctx.stroke();

                            // Cable from pulley to load
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(400, 67);
                            ctx.lineTo(400, loadY);
                            ctx.stroke();

                            // Hook
                            ctx.strokeStyle = viz.colors.yellow;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(400, loadY + 5, 8, 0, Math.PI);
                            ctx.stroke();

                            // Load (steel beam)
                            ctx.fillStyle = viz.colors.red;
                            ctx.fillRect(355, loadY + 15, 90, 30);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 11px -apple-system,sans-serif';
                            ctx.textAlign = 'center';
                            ctx.fillText('2000 kg', 400, loadY + 30);

                            // Counterweight
                            var cwY = 200 + liftAmount * 50;
                            ctx.fillStyle = viz.colors.purple;
                            ctx.fillRect(50, cwY, 50, 35);
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = '10px -apple-system,sans-serif';
                            ctx.fillText('CW', 75, cwY + 18);

                            // Cable to counterweight
                            ctx.strokeStyle = viz.colors.orange;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(95, 48);
                            ctx.lineTo(95, cwY);
                            ctx.stroke();

                            // Info panel
                            ctx.fillStyle = viz.colors.white;
                            ctx.font = 'bold 14px -apple-system,sans-serif';
                            ctx.textAlign = 'left';
                            ctx.fillText('Crane Pulley System', 480, 80);
                            ctx.font = '12px -apple-system,sans-serif';
                            ctx.fillStyle = viz.colors.muted;
                            ctx.fillText('Multiple pulleys inside', 480, 100);
                            ctx.fillText('reduce motor effort.', 480, 118);
                            ctx.fillText('Counterweight helps', 480, 146);
                            ctx.fillText('balance the load.', 480, 164);
                        }

                        VizEngine.createSlider(controls, 'Lift Height', 0, 1, liftAmount, 0.05, function(v) { liftAmount = v; draw(); });
                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'An elevator weighs 8000 N and its counterweight weighs 8000 N. If there are 3 passengers totaling 2000 N inside, how much force must the motor provide?',
                    hint: 'The counterweight balances the empty elevator. What is left?',
                    solution: 'The motor only needs to lift the passenger weight: 2000 N. The counterweight balances the elevator cabin itself.'
                },
                {
                    question: 'A sailing ship uses a pulley system with 3 supporting ropes to raise a 900 N sail. How much force does a sailor need to pull?',
                    hint: 'Divide the load by the number of supporting rope segments.',
                    solution: 'Effort = 900/3 = 300 N. The pulley system reduces the needed force to one-third.'
                }
            ]
        }
    ]
});
