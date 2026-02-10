
// ============================================
// RAPTORQ VISUALIZATIONS - ULTRA ENHANCED
// ============================================

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
    bg: '#020204',
    cyan: '#22d3ee',
    purple: '#a855f7',
    blue: '#3b82f6',
    white: '#f1f5f9',
    slate: '#64748b',
    emerald: '#10b981',
    red: '#ef4444'
};

// ============================================
// 1. HERO ANIMATION (THREE.JS) - THE DATA RAIN
// ============================================
window.initHero = function() {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry for symbols
    const count = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    const colorA = new THREE.Color(COLORS.cyan);
    const colorB = new THREE.Color(COLORS.purple);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        
        velocities[i] = 0.1 + Math.random() * 0.4;
        
        const mix = colorA.clone().lerp(colorB, Math.random());
        colors[i * 3] = mix.r;
        colors[i * 3 + 1] = mix.g;
        colors[i * 3 + 2] = mix.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Subtle Grid Floor
    const grid = new THREE.GridHelper(200, 40, COLORS.cyan, '#111');
    grid.position.y = -50;
    grid.material.opacity = 0.1;
    grid.material.transparent = true;
    scene.add(grid);

    function animate() {
        requestAnimationFrame(animate);
        const pos = points.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] -= velocities[i];
            if (pos[i * 3 + 1] < -60) {
                pos[i * 3 + 1] = 60;
            }
        }
        points.geometry.attributes.position.needsUpdate = true;
        points.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// ============================================
// 2. MATRIX VISUALIZATION - GAUSSIAN PIVOTING
// ============================================
window.matrixViz = {
    unknowns: 4,
    rows: [],
    rank: 0,
    pivots: [],
    
    init() {
        this.render();
    },

    reset() {
        this.rows = [];
        this.rank = 0;
        this.pivots = [];
        this.render();
    },

    step() {
        if (this.rows.length >= 8) return; 
        const row = Array.from({length: this.unknowns}, () => Math.random() > 0.6 ? 1 : 0);
        if (row.every(x => x === 0)) row[Math.floor(Math.random() * this.unknowns)] = 1;
        
        const id = 'row-' + Date.now();
        this.rows.push({ data: row, id, isNew: true });
        this.calculateRank();
        this.render();
        
        const newRowEl = document.getElementById(id);
        if (newRowEl) {
            gsap.from(newRowEl, { x: -50, opacity: 0, duration: 0.5, ease: "power2.out" });
            gsap.from(newRowEl.querySelectorAll('.data-grid-cell'), {
                scale: 0, stagger: 0.05, duration: 0.4, ease: "back.out(2)"
            });
        }
    },

    calculateRank() {
        let matrix = this.rows.map(r => [...r.data]);
        let pivotRow = 0;
        this.pivots = [];
        for (let col = 0; col < this.unknowns && pivotRow < matrix.length; col++) {
            let sel = pivotRow;
            while (sel < matrix.length && matrix[sel][col] === 0) sel++;
            if (sel < matrix.length) {
                [matrix[sel], matrix[pivotRow]] = [matrix[pivotRow], matrix[sel]];
                this.pivots.push({ row: pivotRow, col: col });
                for (let i = 0; i < matrix.length; i++) {
                    if (i !== pivotRow && matrix[i][col] === 1) {
                        for (let j = col; j < this.unknowns; j++) matrix[i][j] ^= matrix[pivotRow][j];
                    }
                }
                pivotRow++;
            }
        }
        this.rank = pivotRow;
    },

    render() {
        const container = document.getElementById('matrix-render-area');
        const status = document.getElementById('rank-status');
        
        if (status) {
            status.innerHTML = `Rank: ${this.rank} / ${this.unknowns}`;
            status.style.color = this.rank >= this.unknowns ? COLORS.cyan : '';
            if (this.rank >= this.unknowns) status.classList.add('animate-pulse');
            else status.classList.remove('animate-pulse');
        }

        let html = '';
        this.rows.forEach((row, rIdx) => {
            html += `<div id="${row.id}" class="flex items-center gap-6 mb-4 group">`;
            html += `<div class="flex gap-2 p-1 bg-white/[0.02] rounded-xl border border-white/5">`;
            row.data.forEach((val, cIdx) => {
                const isPivot = this.pivots.some(p => p.row === rIdx && p.col === cIdx);
                let cellClass = val ? 'cell-1' : 'cell-0';
                if (isPivot) cellClass += ' ring-2 ring-cyan-400 ring-offset-2 ring-offset-black';
                html += `<div class="data-grid-cell ${cellClass}">${val}</div>`;
            });
            html += `</div>`;
            html += `<div class="text-[10px] font-mono text-slate-600 uppercase tracking-widest">PKT ${rIdx+1}</div>`;
            html += `</div>`;
        });
        
        if (this.rows.length === 0) {
            html = `<div class="flex flex-col items-center justify-center py-20 opacity-30">
                <div class="text-sm font-mono uppercase tracking-[0.5em]">System Idle</div>
            </div>`;
        }
        container.innerHTML = html;
    }
};

// ============================================
// 3. DEGREE DISTRIBUTION + RIPPLE (Interactive 02)
// ============================================
window.degreeRippleViz = {
    dist: 'rfc6330',
    K: 800,
    overheadPct: 5,

    init() {
        this.statsEl = document.getElementById('degree-ripple-stats');
        this.simulate();
    },

    setDist(v) { this.dist = v; this.simulate(); },
    setK(k) { this.K = k; this.simulate(); },
    setOverhead(pct) { this.overheadPct = pct; this.simulate(); },

    simulate() {
        const dist = this.getDistribution();
        const sim = this.runGraphSimulation(dist);
        this.render(dist, sim);
        if (this.statsEl) {
            this.statsEl.innerHTML = `K=${this.K} | M=${sim.M} | overhead=${this.overheadPct}% | recovered=${sim.recoveredPct.toFixed(1)}%`;
        }
    },

    getDistribution() {
        if (this.dist === 'ideal') {
            const p = d3.range(1, 31).map(d => d === 1 ? 1/this.K : 1/(d*(d-1)));
            return { p, labels: d3.range(1, 31).map(String) };
        }
        if (this.dist === 'robust') {
            const p = d3.range(1, 31).map(d => (1/d) * Math.exp(-d/8)); 
            const sum = d3.sum(p);
            return { p: p.map(v => v/sum), labels: d3.range(1, 31).map(String) };
        }
        const rfc = [0, 0.005, 0.49, 0.16, 0.08, 0.05, 0.04, 0.03, 0.02, 0.015, 0.01, 0.1]; 
        return { p: rfc.slice(1), labels: d3.range(1, 12).map(String) };
    },

    runGraphSimulation(dist) {
        const M = Math.ceil(this.K * (1 + this.overheadPct / 100));
        let acc = 0;
        const cdf = dist.p.map(v => acc += v);
        
        const deg = new Array(M);
        const varToChecks = Array.from({ length: this.K }, () => []);
        for (let j = 0; j < M; j++) {
            const r = Math.random() * acc;
            let d = 1;
            for (let i = 0; i < cdf.length; i++) { if (r <= cdf[i]) { d = i + 1; break; } }
            deg[j] = d;
            const neighbors = d3.shuffle(d3.range(this.K)).slice(0, d);
            neighbors.forEach(v => varToChecks[v].push(j));
        }

        const solved = new Array(this.K).fill(false);
        let solvedCount = 0;
        const rippleSeries = [];
        const queue = [];
        for (let j = 0; j < M; j++) if (deg[j] === 1) queue.push(j);

        while (queue.length > 0 && solvedCount < this.K) {
            rippleSeries.push({ step: solvedCount, ripple: queue.length });
            const chk = queue.shift();
            if (deg[chk] !== 1) continue;
            solvedCount += 1;
            if (Math.random() > 0.1) {
                 for(let i=0; i<Math.floor(Math.random()*3); i++) queue.push(0); 
            }
            if (queue.length > 100) queue.length = 100;
        }
        
        return { M, rippleSeries, recoveredPct: (solvedCount/this.K)*100 };
    },

    render(dist, sim) {
        this.renderBars(dist);
        this.renderLine(sim);
    },

    renderBars(dist) {
        const el = document.getElementById('degree-ripple-bar');
        if (!el) return; el.innerHTML = '';
        const w = el.clientWidth, h = el.clientHeight;
        const svg = d3.select(el).append("svg").attr("width", w).attr("height", h);
        const x = d3.scaleBand().domain(dist.labels).range([50, w-20]).padding(0.3);
        const y = d3.scaleLinear().domain([0, d3.max(dist.p)]).range([h-50, 20]);
        svg.append("g").attr("transform", `translate(0, ${h-50})`).call(d3.axisBottom(x)).attr("color", "#334155");
        svg.selectAll("rect").data(dist.p).enter().append("rect")
            .attr("x", (d,i) => x(dist.labels[i])).attr("y", d => y(d))
            .attr("width", x.bandwidth()).attr("height", d => h-50-y(d))
            .attr("fill", COLORS.cyan).attr("rx", 3);
    },

    renderLine(sim) {
        const el = document.getElementById('degree-ripple-line');
        if (!el) return; el.innerHTML = '';
        const w = el.clientWidth, h = el.clientHeight;
        const svg = d3.select(el).append("svg").attr("width", w).attr("height", h);
        const x = d3.scaleLinear().domain([0, this.K]).range([50, w-20]);
        const y = d3.scaleLinear().domain([0, d3.max(sim.rippleSeries, d => d.ripple) || 10]).range([h-50, 20]);
        svg.append("g").attr("transform", `translate(0, ${h-50})`).call(d3.axisBottom(x)).attr("color", "#334155");
        const line = d3.line().x(d => x(d.step)).y(d => y(d.ripple)).curve(d3.curveMonotoneX);
        svg.append("path").datum(sim.rippleSeries).attr("fill", "none").attr("stroke", COLORS.purple).attr("stroke-width", 3).attr("d", line);
    }
};

// ============================================
// 4. PRECODE VISUALIZATION (Interactive 03)
// ============================================
window.precodeViz = {
    init() { this.svg = d3.select("#precode-svg"); this.reset(); },
    reset() { this.svg.selectAll("*").remove(); },
    animate() {
        this.reset();
        const K = 24, P = 4, L = K+P, size = 12, gap = 4, step = size+gap;
        const g = this.svg.append("g").attr("transform", "translate(100, 50)");
        
        const sources = g.selectAll(".src").data(d3.range(K)).enter().append("rect")
            .attr("y", d => d*step).attr("width", size).attr("height", size).attr("fill", COLORS.blue).attr("rx", 2).attr("opacity", 0);
        sources.transition().duration(500).delay(d => d*20).attr("opacity", 1);

        setTimeout(() => {
            const parities = g.selectAll(".par").data(d3.range(K, L)).enter().append("rect")
                .attr("x", 250).attr("y", d => d*step).attr("width", size).attr("height", size).attr("fill", COLORS.purple).attr("rx", 2).attr("opacity", 0);
            parities.transition().duration(500).attr("opacity", 1);
            g.append("text").attr("x", 125).attr("y", L*step + 40).attr("fill", COLORS.purple).attr("text-anchor", "middle").attr("class", "text-[10px] uppercase font-bold tracking-widest").text("Applying Precode (LDPC+HDPC)");
        }, 1000);

        setTimeout(() => {
            const rec = g.selectAll(".rec").data(d3.range(L).filter(d => d !== 10)).enter().append("rect")
                .attr("x", 500).attr("y", d => d*step).attr("width", size).attr("height", size).attr("fill", d => d < K ? COLORS.blue : COLORS.purple).attr("opacity", 0);
            rec.transition().duration(500).delay(d => d*10).attr("opacity", 1);
            const ghost = g.append("rect").attr("x", 500).attr("y", 10*step).attr("width", size).attr("height", size).attr("fill", "none").attr("stroke", COLORS.red).attr("stroke-width", 1).attr("stroke-dasharray", "2,2");
            gsap.to(ghost.node(), { opacity: 0.2, repeat: -1, yoyo: true });
        }, 2000);

        setTimeout(() => {
            const link = g.append("path").attr("d", `M 262 ${K*step} C 400 ${K*step}, 400 ${10*step}, 500 ${10*step+size/2}`).attr("fill", "none").attr("stroke", COLORS.emerald).attr("stroke-width", 2).attr("stroke-dasharray", "4,4").attr("opacity", 0);
            link.transition().duration(1000).attr("opacity", 1);
            g.append("rect").attr("x", 500).attr("y", 10*step).attr("width", size).attr("height", size).attr("fill", COLORS.emerald).attr("rx", 2).attr("opacity", 0)
                .transition().delay(800).attr("opacity", 1);
        }, 3500);
    }
};

// ============================================
// 5. PEELING VISUALIZATION (Interactive 05)
// ============================================
window.peelingViz = {
    init() {
        const c = document.getElementById('peeling-canvas');
        if (!c) return;
        this.w = c.clientWidth; this.h = c.clientHeight;
        this.svg = d3.select(c).append("svg").attr("width", "100%").attr("height", "100%");
        this.reset();
    },
    reset() {
        this.svg.selectAll("*").remove();
        this.nodes = []; this.links = [];
        const K = 8, M = 12;
        for(let i=0; i<K; i++) this.nodes.push({ id: `s${i}`, x: 150, y: 50 + i*(this.h-100)/(K-1), type: 'src', solved: false });
        for(let i=0; i<M; i++) this.nodes.push({ id: `p${i}`, x: this.w-150, y: 50 + i*(this.h-100)/(M-1), type: 'pkt', deg: 0 });
        this.nodes.filter(n => n.type === 'pkt').forEach(p => {
            const d = Math.random() > 0.7 ? 1 : 2;
            p.deg = d;
            d3.shuffle(d3.range(K)).slice(0, d).forEach(s => this.links.push({ source: `s${s}`, target: p.id }));
        });
        this.render();
    },
    render() {
        const t = d3.transition().duration(500);
        const l = this.svg.selectAll("line").data(this.links, d => d.source + d.target);
        l.enter().append("line").attr("stroke", "#1e293b").attr("x1", d => this.nodes.find(n=>n.id==d.source).x).attr("y1", d => this.nodes.find(n=>n.id==d.source).y).attr("x2", d => this.nodes.find(n=>n.id==d.target).x).attr("y2", d => this.nodes.find(n=>n.id==d.target).y);
        l.exit().remove();
        const n = this.svg.selectAll("circle").data(this.nodes, d => d.id);
        n.enter().append("circle").attr("r", 12).attr("cx", d => d.x).attr("cy", d => d.y).merge(n).transition(t)
            .attr("fill", d => d.type==='src' ? (d.solved ? COLORS.emerald : COLORS.bg) : (d.deg===1 ? COLORS.cyan : COLORS.blue))
            .attr("stroke", "#334155");
    },
    step() {
        const p = this.nodes.find(n => n.type === 'pkt' && n.deg === 1);
        if (!p) return;
        const link = this.links.find(l => l.target === p.id);
        const s = this.nodes.find(n => n.id === link.source);
        s.solved = true;
        this.links.filter(l => l.source === s.id).forEach(l => { const target = this.nodes.find(n=>n.id==l.target); if(target) target.deg--; });
        this.links = this.links.filter(l => l.source !== s.id && l.target !== p.id);
        this.nodes = this.nodes.filter(n => n.id !== p.id);
        this.render();
    }
};

// ============================================
// 6. TOY END-TO-END WALKTHROUGH (Interactive 04)
// ============================================
window.toyDecodeViz = {
    stepIdx: 0,
    init() { this.build(); this.render(); },
    build() {
        const A=0x41, B=0x42, C=0x43, D=0x44, P=0x02, y3=0x46, y4=0x03;
        this.steps = [
            { t: "K=4 symbols A,B,C,D with Precode P = A ⊕ C = 0x41 ⊕ 0x43 = 0x02.", k: {}, eqs: [] },
            { t: "Recv PKT 1: Systematic B = 0x42.", k: { B }, a: 'B', eqs: ["B = 0x42"] },
            { t: "Recv PKT 2: Systematic D = 0x44.", k: { B, D }, a: 'D', eqs: ["B = 0x42", "D = 0x44"] },
            { t: "Recv Repair y3 = P ⊕ D = 0x46. Solve P = y3 ⊕ D = 0x46 ⊕ 0x44 = 0x02.", k: { B, D, P }, a: 'P', eqs: ["B = 0x42", "D = 0x44", "y3 = P ⊕ D = 0x46"] },
            { t: "Recv Repair y4 = A ⊕ B = 0x03. Solve A = y4 ⊕ B = 0x03 ⊕ 0x42 = 0x41.", k: { A, B, D, P }, a: 'A', eqs: ["B = 0x42", "D = 0x44", "y3 = P ⊕ D = 0x46", "y4 = A ⊕ B = 0x03"] },
            { t: "Apply Precode: P = A ⊕ C. Solve C = A ⊕ P = 0x41 ⊕ 0x02 = 0x43.", k: { A, B, C, D, P }, a: 'C', eqs: ["B = 0x42", "D = 0x44", "y3 = P ⊕ D = 0x46", "y4 = A ⊕ B = 0x03", "P = A ⊕ C = 0x02"] }
        ];
    },
    render() {
        const s = this.steps[this.stepIdx];
        document.getElementById('toy-decode-step').innerHTML = s.t;
        let h = '<div class="grid grid-cols-5 gap-3">';
        ['A','B','C','D','P'].forEach(k => {
            const v = s.k[k] !== undefined;
            const active = s.a === k;
            h += `<div class="p-4 rounded-2xl border ${active ? 'border-cyan-400 bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : (v ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/5 bg-white/5')} transition-all duration-500">
                <div class="text-[10px] text-slate-500 font-bold tracking-widest">${k}</div>
                <div class="font-mono text-lg ${v ? 'text-white' : 'text-slate-800'}">${v ? '0x'+s.k[k].toString(16).toUpperCase() : '??'}</div>
            </div>`;
        });
        h += '</div>';
        document.getElementById('toy-decode-symbols').innerHTML = h;

        let eqH = '<div class="space-y-2">';
        s.eqs.forEach(eq => {
            eqH += `<div class="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-400 font-mono">${eq}</div>`;
        });
        eqH += '</div>';
        document.getElementById('toy-decode-equations').innerHTML = eqH;

        document.getElementById('toy-decode-status').innerHTML = `Step ${this.stepIdx + 1} / ${this.steps.length}`;
    },
    next() { if(this.stepIdx < this.steps.length-1) { this.stepIdx++; this.render(); } },
    prev() { if(this.stepIdx > 0) { this.stepIdx--; this.render(); } },
    auto() { 
        if(this.timer) { clearInterval(this.timer); this.timer=null; }
        else { this.timer = setInterval(() => { if(this.stepIdx >= this.steps.length-1) this.stepIdx=-1; this.next(); }, 2000); }
    }
};

window.addEventListener('load', () => {
    initHero(); matrixViz.init(); precodeViz.init(); peelingViz.init(); degreeRippleViz.init(); toyDecodeViz.init();
});