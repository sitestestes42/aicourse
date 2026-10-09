/* AI Website Launch — learning platform */
(function () {
  "use strict";

  /* ------------------------------------------------------------ helpers */
  var PASS = (window.AWL_CONFIG && AWL_CONFIG.PASS_MARK) || 70;
  var root = document.getElementById("main");
  var activePlayer = null; /* the lesson video player currently on screen, so it can be cleaned up on navigation */

  function h(tag, attrs) {
    var e = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === false || v == null) return;
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else if (k.indexOf("on") === 0) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? "" : v);
    });
    for (var i = 2; i < arguments.length; i++) append(e, arguments[i]);
    return e;
  }
  function append(e, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { append(e, x); }); return; }
    e.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
  }
  function shuffle(a) {
    var r = a.slice();
    for (var i = r.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = r[i]; r[i] = r[j]; r[j] = t; }
    return r;
  }
  function copyText(t, btn) {
    function ok() { if (btn) { var o = btn.textContent; btn.textContent = "Copied"; setTimeout(function () { btn.textContent = o; }, 1400); } }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, ok);
    else { var ta = h("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove(); ok(); }
  }
  var LETTERS = ["A", "B", "C", "D", "E", "F"];

  /* ------------------------------------------------------------ state */
  var KEY = "awl_v1";
  var S;
  try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
  S = S || {};
  S.name = S.name || "";
  S.xp = S.xp || 0;
  S.awarded = S.awarded || {};
  S.lessons = S.lessons || {};
  S.quizzes = S.quizzes || {};
  S.ach = S.ach || {};
  S.log = S.log || [];
  S.miniBrief = S.miniBrief || null;
  S.tools = S.tools || {};
  S.video = S.video || {}; /* per-lesson video position: { pos, dur, rate, watched } */
  delete S.certDate; /* legacy field from the removed certificate feature */
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function log(t) { S.log.unshift({ t: t, d: Date.now() }); S.log = S.log.slice(0, 12); }
  function toast(title, sub) {
    var t = h("div", { class: "toast" }, h("b", {}, title), sub ? " · " + sub : "");
    document.getElementById("toasts").appendChild(t);
    setTimeout(function () { t.remove(); }, 3600);
  }
  function award(key, xp, label) {
    if (S.awarded[key]) return false;
    S.awarded[key] = 1; S.xp += xp; log("+" + xp + " XP · " + label); save(); updateXP();
    toast("+" + xp + " XP", label);
    return true;
  }
  function unlock(id) {
    if (S.ach[id]) return;
    S.ach[id] = Date.now();
    var a = ACHIEVEMENTS.filter(function (x) { return x.id === id; })[0];
    log("Achievement unlocked · " + a.title); save();
    toast("Achievement unlocked", a.title);
  }
  function level() { return Math.floor(S.xp / 150) + 1; }
  function updateXP() {
    var x = document.getElementById("xp-total"), l = document.getElementById("xp-level");
    if (x) x.textContent = S.xp + " XP";
    if (l) l.textContent = "Level " + level();
  }

  /* ------------------------------------------------------------ data helpers */
  var LIVE = CURRICULUM.filter(function (m) { return m.status === "live" && window.COURSE && COURSE[m.id]; });
  function allLessons() {
    var out = [];
    LIVE.forEach(function (m) { COURSE[m.id].lessons.forEach(function (l) { out.push({ lesson: l, mod: m }); }); });
    return out;
  }
  function findLesson(id) { return allLessons().filter(function (x) { return x.lesson.id === id; })[0]; }
  function ls(id) { return (S.lessons[id] = S.lessons[id] || { act: false, practice: "", chal: "", done: false }); }
  function lessonDone(id) { return !!(S.lessons[id] && S.lessons[id].done); }
  function quizState(key) { return S.quizzes[key]; }
  function modLessonCount(m) { return COURSE[m.id].lessons.length; }
  function modDoneCount(m) { return COURSE[m.id].lessons.filter(function (l) { return lessonDone(l.id); }).length; }
  function moduleComplete(m) {
    var c = COURSE[m.id];
    if (!c || modDoneCount(m) < c.lessons.length) return false;
    if (c.quiz) { var q = quizState("m:" + m.id); if (!q || !q.passed) return false; }
    return true;
  }
  function checkModule(m) {
    if (moduleComplete(m)) award("mod:" + m.id, 100, "Module " + m.n + " completed");
  }
  function totalPlanned() { return CURRICULUM.reduce(function (a, m) { return a + m.planned; }, 0); }
  function doneLessons() { return allLessons().filter(function (x) { return lessonDone(x.lesson.id); }).length; }
  function coursePct() { return Math.round(doneLessons() / totalPlanned() * 100); }
  function quizAvg() {
    var v = Object.keys(S.quizzes).map(function (k) { return S.quizzes[k].best; });
    return v.length ? Math.round(v.reduce(function (a, b) { return a + b; }, 0) / v.length) : null;
  }
  function projectsDone() { return S.miniBrief ? 1 : 0; }
  function nextLesson() {
    var list = allLessons();
    for (var i = 0; i < list.length; i++) if (!lessonDone(list[i].lesson.id)) return list[i];
    return null;
  }

  /* ------------------------------------------------------------ questions & quizzes */
  /* Shuffle answer order so the correct letter varies. True/False and two-option items keep their order. */
  function mixed(q) {
    if (q.opts.length < 3) return q;
    var order = shuffle(q.opts.map(function (_, i) { return i; }));
    return {
      q: q.q, prompt: q.prompt, review: q.review, why: q.why,
      opts: order.map(function (i) { return q.opts[i]; }),
      fb: order.map(function (i) { return (q.fb && q.fb[i]) || ""; }),
      a: order.indexOf(q.a)
    };
  }
  function renderQuestion(q, idx, o) {
    o = o || {};
    q = mixed(q);
    var box = h("div", { class: "q" });
    if (q.review) box.appendChild(h("span", { class: "pill review", title: "Spaced review of an earlier module" }, "Review · " + q.review));
    var qt = h("div", { class: "qt" });
    if (o.html) qt.innerHTML = q.q || q.prompt; else qt.textContent = (idx != null ? (idx + 1) + ". " : "") + q.q;
    box.appendChild(qt);
    var fbBox = h("div", { "aria-live": "polite" });
    var buttons = [];
    var answered = false;
    q.opts.forEach(function (text, i) {
      var b = h("button", { type: "button", class: "opt" }, h("span", { class: "k" }, LETTERS[i]), h("span", {}, text));
      b.addEventListener("click", function () {
        if (answered) return;
        var right = i === q.a;
        if (right) {
          answered = true;
          b.classList.add("right");
          fbBox.innerHTML = ""; fbBox.appendChild(h("div", { class: "feedback ok" }, "Correct. " + q.why));
          buttons.forEach(function (x) { x.disabled = true; });
          if (o.onAnswer) o.onAnswer(true);
        } else {
          b.classList.add("wrong");
          fbBox.innerHTML = "";
          if (o.retry) {
            b.disabled = true;
            fbBox.appendChild(h("div", { class: "feedback no" }, "Not quite. " + (q.fb[i] || "") + " Try again."));
          } else {
            answered = true;
            buttons.forEach(function (x, k) { x.disabled = true; if (k === q.a) x.classList.add("right"); });
            fbBox.appendChild(h("div", { class: "feedback no" }, (q.fb[i] || "That is not the best answer.") + " The correct answer is " + LETTERS[q.a] + ". " + q.why));
            if (o.onAnswer) o.onAnswer(false);
          }
        }
      });
      buttons.push(b); box.appendChild(b);
    });
    box.appendChild(fbBox);
    return box;
  }

  function renderQuiz(questions, key, onPass, title) {
    var wrap = h("div");
    function build() {
      wrap.innerHTML = "";
      var results = [];
      var list = h("div");
      var out = h("div", { class: "result" });
      questions.forEach(function (q, i) {
        list.appendChild(renderQuestion(q, i, {
          onAnswer: function (ok) {
            results[i] = ok;
            var n = results.filter(function (x) { return x !== undefined; }).length;
            if (n === questions.length) finish();
          }
        }));
      });
      function finish() {
        var correct = results.filter(Boolean).length;
        var pct = Math.round(correct / questions.length * 100);
        var passed = pct >= PASS;
        var prev = S.quizzes[key] || { best: 0, passed: false };
        S.quizzes[key] = { best: Math.max(prev.best, pct), last: pct, passed: prev.passed || passed };
        save();
        unlock("first-quiz");
        out.innerHTML = "";
        out.appendChild(h("div", { class: "score" }, correct + " / " + questions.length + " · " + pct + "%"));
        out.appendChild(h("div", { class: "feedback " + (passed ? "ok" : "no") },
          passed ? "Passed. Nicely done." : "Not yet. The pass mark is " + PASS + "%. Review the explanations and try again."));
        var retry = h("button", { class: "btn btn-sm", type: "button", onclick: build }, "Retake check");
        out.appendChild(retry);
        if (passed) {
          award("quiz:" + key, 20, "Quiz passed");
          if (onPass) onPass();
        }
      }
      wrap.appendChild(list); wrap.appendChild(out);
    }
    build();
    return wrap;
  }

  /* ------------------------------------------------------------ activity renderers */
  function actSequence(a, done) {
    var wrap = h("div");
    wrap.appendChild(h("p", {}, a.prompt));
    var seq = h("div", { class: "seq" });
    var list = h("ol", { class: "stepslog" });
    var msg = h("div", { "aria-live": "polite" });
    var idx = a.steps.map(function (_, i) { return i; });
    var order = shuffle(idx);
    if (order.join() === idx.join()) order.push(order.shift());
    var next = 0;
    order.forEach(function (k) {
      var b = h("button", { type: "button", class: "chip" }, a.steps[k].t);
      b.addEventListener("click", function () {
        if (k === next) {
          b.disabled = true;
          list.appendChild(h("li", {}, h("strong", {}, a.steps[k].t + ". "), a.steps[k].d));
          next++;
          msg.className = ""; msg.textContent = "";
          if (next === a.steps.length) {
            msg.className = "feedback ok"; msg.textContent = "Correct. You completed the whole sequence.";
            done();
          }
        } else {
          b.classList.add("shake"); setTimeout(function () { b.classList.remove("shake"); }, 320);
          msg.className = "feedback no";
          msg.textContent = "Not yet. Think about what must already have happened before this step.";
        }
      });
      seq.appendChild(b);
    });
    wrap.appendChild(seq); wrap.appendChild(msg); wrap.appendChild(list);
    return wrap;
  }

  function actMatch(a, done) {
    var wrap = h("div");
    wrap.appendChild(h("p", {}, a.prompt));
    var defs = shuffle(a.pairs.map(function (p) { return p.def; }));
    var selects = [];
    a.pairs.forEach(function (p) {
      var sel = h("select", { "aria-label": "Match for " + p.term }, h("option", { value: "" }, "Choose…"));
      defs.forEach(function (d) { sel.appendChild(h("option", { value: d }, d)); });
      selects.push(sel);
      wrap.appendChild(h("div", { class: "match-row" }, h("strong", {}, p.term), sel));
    });
    var out = h("div", { class: "result", "aria-live": "polite" });
    wrap.appendChild(h("button", { type: "button", class: "btn btn-sm btn-dark", onclick: function () {
      out.innerHTML = ""; var ok = 0;
      a.pairs.forEach(function (p, i) {
        if (selects[i].value === p.def) ok++;
        else if (selects[i].value) out.appendChild(h("div", { class: "feedback no" }, p.term + ": not quite. " + p.why));
        else out.appendChild(h("div", { class: "feedback no" }, p.term + ": choose an answer first."));
      });
      if (ok === a.pairs.length) { out.innerHTML = ""; out.appendChild(h("div", { class: "feedback ok" }, "All correct. " + a.pairs.map(function (p) { return p.why; }).join(" "))); done(); }
      else out.insertBefore(h("div", { class: "feedback info" }, ok + " of " + a.pairs.length + " correct. Fix the others and check again."), out.firstChild);
    } }, "Check my matches"));
    wrap.appendChild(out);
    return wrap;
  }

  function actMulti(a, done) {
    var wrap = h("div");
    wrap.appendChild(h("p", {}, a.prompt));
    var sel = {};
    var out = h("div", { class: "result", "aria-live": "polite" });
    a.opts.forEach(function (t, i) {
      var b = h("button", { type: "button", class: "opt", "aria-pressed": "false" }, h("span", { class: "k" }, "☐"), h("span", {}, t));
      b.addEventListener("click", function () {
        sel[i] = !sel[i];
        b.classList.toggle("sel", sel[i]); b.setAttribute("aria-pressed", String(!!sel[i]));
        b.firstChild.textContent = sel[i] ? "☑" : "☐";
      });
      wrap.appendChild(b);
    });
    wrap.appendChild(h("button", { type: "button", class: "btn btn-sm btn-dark", onclick: function () {
      out.innerHTML = "";
      var chosen = a.opts.map(function (_, i) { return i; }).filter(function (i) { return sel[i]; });
      var good = chosen.length === a.a.length && chosen.every(function (i) { return a.a.indexOf(i) >= 0; });
      if (good) { out.appendChild(h("div", { class: "feedback ok" }, "Correct. " + a.why)); done(); }
      else {
        out.appendChild(h("div", { class: "feedback no" }, "Not quite. Check again."));
        chosen.forEach(function (i) { if (a.a.indexOf(i) < 0 && a.fb[i]) out.appendChild(h("div", { class: "feedback info" }, "“" + a.opts[i] + "” — " + a.fb[i])); });
        if (chosen.length < a.a.length) out.appendChild(h("div", { class: "feedback info" }, "You missed at least one correct choice."));
      }
    } }, "Check my answers"));
    wrap.appendChild(out);
    return wrap;
  }

  function actSandbox(a, done) {
    var wrap = h("div");
    wrap.appendChild(h("p", {}, a.prompt));
    var ta = h("textarea", { spellcheck: "false", "aria-label": "Code editor" });
    ta.value = a.starter;
    var frame = h("iframe", { sandbox: "allow-scripts", title: "Live preview" });
    var list = h("ul", { class: "checks" });
    var items = a.checks.map(function (c) { var li = h("li", {}, c.label); list.appendChild(li); return li; });
    var finished = false, timer;
    function run() {
      frame.srcdoc = ta.value;
      var all = true;
      a.checks.forEach(function (c, i) {
        var ok = new RegExp(c.re, "i").test(ta.value);
        items[i].className = ok ? "ok" : ""; if (!ok) all = false;
      });
      if (all && !finished) { finished = true; done(); toast("Editor tasks complete", "Nice work"); }
    }
    ta.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(run, 350); });
    wrap.appendChild(h("div", { class: "sandbox" }, ta, frame));
    wrap.appendChild(list);
    wrap.appendChild(h("button", { type: "button", class: "btn btn-sm", onclick: function () { ta.value = a.starter; run(); } }, "Reset code"));
    run();
    return wrap;
  }

  function actPromptFix(a, done) {
    var wrap = h("div");
    wrap.appendChild(h("p", {}, a.prompt));
    wrap.appendChild(h("div", { class: "compare" }, h("div", { class: "bad" }, h("h4", {}, "Weak prompt"), h("p", {}, "“" + a.weak + "”"))));
    var ta = h("textarea", { "aria-label": "Your improved prompt", placeholder: "Write your improved prompt here…" });
    var out = h("div", { class: "result", "aria-live": "polite" });
    wrap.appendChild(ta);
    wrap.appendChild(h("div", { style: "margin-top:10px" }, h("button", { type: "button", class: "btn btn-sm btn-dark", onclick: function () {
      var t = ta.value; out.innerHTML = ""; var n = 0;
      var ul = h("ul", { class: "checks" });
      a.criteria.forEach(function (c) { var ok = new RegExp(c.re, "i").test(t); if (ok) n++; ul.appendChild(h("li", { class: ok ? "ok" : "" }, c.label)); });
      var pass = n >= a.pass && t.length > 60;
      out.appendChild(h("div", { class: "score" }, n + " / " + a.criteria.length));
      out.appendChild(ul);
      out.appendChild(h("div", { class: "feedback " + (pass ? "ok" : "no") }, pass ? "Strong improvement. The AI now has far less to guess." : "Add more of the missing parts (at least " + a.pass + " are needed) and write a fuller prompt, then score again."));
      if (pass) done();
    } }, "Score my prompt")));
    wrap.appendChild(out);
    return wrap;
  }

  function briefText(b, name) {
    return "WEBSITE BRIEF — " + name + "\n\nAudience: " + b.audience + "\nPrimary goal: " + b.goal + "\nPrimary CTA: " + b.cta + "\nPages: " + b.pages.join(", ") + "\nTone: " + b.tone;
  }
  function renderBriefDoc(b, name) {
    var dl = h("dl", { class: "briefdoc" });
    [["Project", name], ["Audience", b.audience], ["Primary goal", b.goal], ["Primary call to action", b.cta], ["Pages", b.pages.join(" · ")], ["Tone", b.tone]].forEach(function (r) {
      dl.appendChild(h("dt", {}, r[0])); dl.appendChild(h("dd", {}, r[1]));
    });
    return dl;
  }
  function actProjectPick(a, done) {
    var wrap = h("div");
    wrap.appendChild(h("p", {}, a.prompt));
    var grid = h("div", { class: "projects" });
    var out = h("div", { "aria-live": "polite" });
    function show(o) {
      out.innerHTML = "";
      out.appendChild(renderBriefDoc(o.brief, o.name));
      var cp = h("button", { type: "button", class: "btn btn-sm", style: "margin-top:12px", onclick: function (e) { copyText(briefText(o.brief, o.name), e.target); } }, "Copy brief");
      out.appendChild(cp);
    }
    a.options.forEach(function (o) {
      var b = h("button", { type: "button", class: "pc" }, h("div", { class: "ic", "aria-hidden": "true" }, o.icon), h("b", {}, o.name), h("span", {}, o.line));
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(grid.children, function (c) { c.classList.remove("sel"); });
        b.classList.add("sel");
        S.miniBrief = { id: o.id, name: o.name, brief: o.brief }; save();
        show(o);
        award("proj:mini", 50, "Project milestone: mini brief");
        done();
      });
      grid.appendChild(b);
    });
    wrap.appendChild(grid); wrap.appendChild(out);
    if (S.miniBrief) {
      var cur = a.options.filter(function (o) { return o.id === S.miniBrief.id; })[0];
      if (cur) { show(cur); Array.prototype.forEach.call(grid.children, function (c, i) { if (a.options[i].id === cur.id) c.classList.add("sel"); }); }
    }
    return wrap;
  }

  /* ------------------------------------------------------------ Prompt Builder (lesson + tool) */
  var PB_FIELDS = [
    ["role", "Role", "e.g. a senior front-end developer with strong visual taste"],
    ["context", "Context", "e.g. NOVA is a premium coffee and bakery in a city neighborhood"],
    ["goal", "Goal", "e.g. Create the hero section of the home page"],
    ["audience", "Audience", "e.g. Busy local professionals and weekend families"],
    ["technology", "Technology", "e.g. Semantic HTML and CSS only. No frameworks."],
    ["design", "Design", "e.g. Warm, editorial, generous spacing, one accent color"],
    ["requirements", "Requirements", "e.g. One headline, one subheading, one primary button"],
    ["constraints", "Constraints", "e.g. No lorem ipsum. No gradients. Keep it keyboard accessible."],
    ["output", "Output Format", "e.g. One HTML file with CSS in a style tag. Briefly explain choices."]
  ];
  function buildPrompt(v) {
    var parts = [];
    PB_FIELDS.forEach(function (f) { if (v[f[0]] && v[f[0]].trim()) parts.push(f[1].toUpperCase() + "\n" + (f[0] === "role" && !/^you are/i.test(v.role.trim()) ? "You are " + v.role.trim() : v[f[0]].trim())); });
    return parts.join("\n\n");
  }
  function renderPromptBuilder(onGenerate) {
    var wrap = h("div");
    var vals = {};
    var out = h("div", { class: "out", "aria-live": "polite" }, "Your prompt will appear here as you fill in the fields.");
    var count = h("p", { class: "feedback info" }, "0 of 9 fields filled");
    function refresh() {
      var n = PB_FIELDS.filter(function (f) { return vals[f[0]] && vals[f[0]].trim(); }).length;
      count.textContent = n + " of 9 fields filled" + (n >= 6 ? " — ready to generate" : " — fill at least 6");
      out.textContent = n ? buildPrompt(vals) : "Your prompt will appear here as you fill in the fields.";
      gen.disabled = n < 6; cp.disabled = n < 1;
    }
    PB_FIELDS.forEach(function (f) {
      var id = "pb-" + f[0] + Math.floor(Math.random() * 1e5);
      var ta = h("textarea", { id: id, placeholder: f[2], style: "min-height:70px" });
      ta.addEventListener("input", function () { vals[f[0]] = ta.value; refresh(); });
      wrap.appendChild(h("label", { class: "f", for: id }, f[1]));
      wrap.appendChild(ta);
    });
    var gen = h("button", { type: "button", class: "btn btn-primary", style: "margin-top:16px", disabled: true, onclick: function () {
      S.tools.prompt = (S.tools.prompt || 0) + 1; save();
      unlock("prompt-builder"); log("Generated a prompt with the Prompt Builder"); save();
      toast("Prompt generated", "Copy it into your AI tool");
      if (onGenerate) onGenerate();
    } }, "Generate prompt");
    var cp = h("button", { type: "button", class: "btn", style: "margin:16px 0 0 8px", disabled: true, onclick: function (e) { copyText(buildPrompt(vals), e.target); } }, "Copy prompt");
    wrap.appendChild(count); wrap.appendChild(gen); wrap.appendChild(cp); wrap.appendChild(out);
    refresh();
    return wrap;
  }

  /* ------------------------------------------------------------ lesson view */
  function section(num, title, body) {
    return h("section", { class: "section" }, h("h2", {}, h("span", { class: "num" }, num), title), body);
  }
  function renderLesson(id) {
    var f = findLesson(id);
    if (!f) return notFound();
    var L = f.lesson, M = f.mod, st = ls(id);
    var list = allLessons();
    var pos = list.indexOf(f);
    var nextL = list[pos + 1];
    var page = h("article", { class: "lesson" });
    page.appendChild(h("div", { class: "crumbs" }, h("a", { href: "#/course" }, "Course"), " / ", h("a", { href: "#/module/" + M.id }, "Module " + M.n + " · " + M.title)));
    page.appendChild(h("h1", {}, L.title));
    page.appendChild(h("div", { class: "meta" },
      h("span", { class: "pill live" }, "Module " + M.n),
      h("span", { class: "pill" }, "≈ " + L.time + " min"),
      h("span", { class: "pill" }, "Lesson " + (COURSE[M.id].lessons.indexOf(L) + 1) + " of " + COURSE[M.id].lessons.length),
      st.done ? h("span", { class: "pill done" }, "Completed") : null,
      (S.video[id] && S.video[id].watched) ? h("span", { class: "pill" }, "Video watched") : null));
    page.appendChild(h("p", { class: "objective" }, h("strong", {}, "Learning objective. "), L.objective));

    /* video + transcript */
    var vcfg = (window.LESSON_VIDEOS && LESSON_VIDEOS[id]) || {};
    var paras = L.script.split(/\n\n+/).map(function (p) { return h("p", {}, p); });
    var player = window.AWLPlayer ? AWLPlayer.create({
      title: L.title, description: L.objective, config: vcfg, saved: S.video[id],
      onSave: function (v) { S.video[id] = v; save(); }
    }) : null;
    activePlayer = player;
    page.appendChild(h("div", { class: "section" },
      player ? player.el : null,
      h("details", { class: "script", open: !(player && player.kind !== "none" && player.kind !== "invalid") },
        h("summary", {}, h("span", {}, "Lesson transcript (instructor script)"), h("span", { "aria-hidden": "true" }, "▾")),
        h("div", { class: "t" }, paras))));

    page.appendChild(section("Intro", "Introduction", h("div", { class: "prose" }, h("p", {}, L.intro))));
    page.appendChild(section("Explain", "Main explanation", h("div", { class: "prose", html: L.explain.join("") })));
    page.appendChild(section("Examples", "Practical examples", h("div", { class: "prose", html: L.examples.join("") })));

    /* activity */
    var actStatus = h("span", { class: "pill " + (st.act ? "done" : "") }, st.act ? "Activity complete" : "In progress");
    function actDone() { if (!st.act) { st.act = true; save(); } actStatus.className = "pill done"; actStatus.textContent = "Activity complete"; refreshComplete(); }
    var a = L.activity, actBody;
    if (a.type === "sequence") actBody = actSequence(a, actDone);
    else if (a.type === "match") actBody = actMatch(a, actDone);
    else if (a.type === "multi") actBody = actMulti(a, actDone);
    else if (a.type === "sandbox") actBody = actSandbox(a, actDone);
    else if (a.type === "promptfix") actBody = actPromptFix(a, actDone);
    else if (a.type === "projectpick") actBody = actProjectPick(a, actDone);
    else if (a.type === "promptbuilder") actBody = h("div", {}, h("p", {}, a.prompt), renderPromptBuilder(function () { actDone(); }));
    else if (a.type === "mcq") actBody = h("div", {}, renderQuestion({ q: a.prompt, opts: a.opts, a: a.a, why: a.why, fb: a.fb }, null, { html: true, retry: true, onAnswer: function (ok) { if (ok) actDone(); } }));
    else actBody = h("p", {}, "Activity unavailable.");
    page.appendChild(section("Do", "Interactive activity", h("div", { class: "activity" }, h("div", { style: "display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap" }, h("div", {}, h("span", { class: "tag" }, "Interactive"), h("h3", {}, a.title)), actStatus), actBody)));

    /* knowledge check */
    var qs = quizState("l:" + id);
    var qStatus = h("span", { class: "pill " + (qs && qs.passed ? "done" : "") }, qs && qs.passed ? "Passed" : "Not passed yet");
    page.appendChild(section("Check", "Knowledge check", h("div", { class: "card" }, h("p", { class: "feedback info" }, "Answer all questions. You need " + PASS + "% to pass, and you can retry."), qStatus, renderQuiz(L.quiz, "l:" + id, function () { qStatus.className = "pill done"; qStatus.textContent = "Passed"; refreshComplete(); }))));

    /* practice */
    var pTa = h("textarea", { "aria-label": "Practice response", placeholder: "Write your response…" });
    pTa.value = st.practice || "";
    var pCount = h("small", { style: "color:var(--ink-3)" });
    function pUpd() { pCount.textContent = pTa.value.trim().length + " / " + L.practice.min + " characters minimum"; }
    pTa.addEventListener("input", function () { st.practice = pTa.value; save(); pUpd(); refreshComplete(); });
    pUpd();
    page.appendChild(section("Practice", "Practice exercise", h("div", { class: "card" }, h("p", {}, L.practice.prompt), pTa, pCount)));

    /* challenge */
    var cTa = h("textarea", { "aria-label": "Challenge response", placeholder: "Write your challenge response…" });
    cTa.value = st.chal || "";
    var cOut = h("div", { class: "result", "aria-live": "polite" });
    if (S.awarded["chal:" + id]) cOut.appendChild(h("div", { class: "feedback ok" }, "Challenge completed. +30 XP earned."));
    var cBtn = h("button", { type: "button", class: "btn btn-sm btn-dark", style: "margin-top:10px", onclick: function () {
      st.chal = cTa.value; save(); cOut.innerHTML = "";
      if (cTa.value.trim().length >= L.challenge.min) { award("chal:" + id, 30, "Challenge completed"); cOut.appendChild(h("div", { class: "feedback ok" }, "Challenge complete. Strong thinking.")); }
      else cOut.appendChild(h("div", { class: "feedback no" }, "Write at least " + L.challenge.min + " characters so the answer is meaningful."));
    } }, "Submit challenge");
    page.appendChild(section("Challenge", "Challenge (optional, +30 XP)", h("div", { class: "card" }, h("p", {}, L.challenge.prompt), cTa, cBtn, cOut)));

    page.appendChild(section("Recap", "Summary", h("div", { class: "prose" }, h("p", {}, L.summary))));
    page.appendChild(h("section", { class: "section" }, h("h3", {}, "Key takeaways"), h("ul", { class: "takeaways" }, L.takeaways.map(function (t) { return h("li", {}, t); }))));
    page.appendChild(h("p", {}, h("strong", {}, "Next step. "), L.next));

    /* completion bar */
    var rA = h("span"), rQ = h("span"), rP = h("span");
    var cBtnDone = h("button", { type: "button", class: "btn btn-primary", onclick: finish }, "Complete lesson");
    function refreshComplete() {
      var q2 = quizState("l:" + id);
      var okA = st.act, okQ = !!(q2 && q2.passed), okP = (st.practice || "").trim().length >= L.practice.min;
      rA.className = okA ? "ok" : ""; rA.textContent = (okA ? "✓" : "○") + " Activity";
      rQ.className = okQ ? "ok" : ""; rQ.textContent = (okQ ? "✓" : "○") + " Check " + PASS + "%+";
      rP.className = okP ? "ok" : ""; rP.textContent = (okP ? "✓" : "○") + " Practice";
      cBtnDone.disabled = !(okA && okQ && okP) || st.done;
      cBtnDone.textContent = st.done ? "Lesson completed" : "Complete lesson";
    }
    function finish() {
      st.done = true; save();
      award("lesson:" + id, 10, "Lesson completed");
      unlock("first-step"); log("Completed lesson · " + L.title); save();
      checkModule(M); refreshComplete();
      var go = nextL ? "#/lesson/" + nextL.lesson.id : "#/module/" + M.id;
      toast("Lesson complete", nextL ? "Continuing to the next lesson" : "Back to the module");
      setTimeout(function () { location.hash = go; }, 900);
    }
    var bar = h("div", { class: "complete" }, h("div", { class: "reqs" }, rA, rQ, rP), cBtnDone);
    page.appendChild(bar);
    /* keep the sticky completion bar from covering the video controls while the video is on screen */
    if (player && window.IntersectionObserver) {
      var io = new IntersectionObserver(function (entries) { bar.classList.toggle("is-hidden", entries[entries.length - 1].isIntersecting); });
      setTimeout(function () { if (player.el.isConnected) io.observe(player.el); }, 0); /* observe after the page is attached */
    }
    refreshComplete();
    return page;
  }

  /* ------------------------------------------------------------ pages */
  function notFound() { return h("div", {}, h("h1", {}, "Page not found"), h("p", {}, h("a", { href: "#/dashboard" }, "Back to dashboard"))); }

  function renderDashboard() {
    var p = h("div");
    if (!S.name) {
      var inp = h("input", { type: "text", id: "nm", placeholder: "Your name", "aria-label": "Your name", maxlength: "60" });
      var form = h("form", { class: "card", style: "margin-bottom:20px", onsubmit: function (e) { e.preventDefault(); if (inp.value.trim()) { S.name = inp.value.trim(); save(); route(); } } },
        h("strong", {}, "Welcome. What should we call you?"), h("div", { style: "display:flex;gap:10px;margin-top:10px;flex-wrap:wrap" }, h("div", { style: "flex:1;min-width:200px" }, inp), h("button", { class: "btn btn-primary", type: "submit" }, "Save name")),
        h("small", { style: "color:var(--ink-3)" }, "Everything is stored in this browser."));
      p.appendChild(form);
    }
    var nl = nextLesson();
    var hr = h("h1", {}, S.name ? "Welcome back, " + S.name + "." : "Welcome to AI Website Launch.");
    p.appendChild(hr);
    var cont = h("div", { class: "hero-card", style: "margin:18px 0 22px" });
    if (nl) {
      var started = doneLessons() > 0;
      cont.appendChild(h("span", { class: "eyebrow", style: "color:#ffcf9f" }, "Continue learning"));
      cont.appendChild(h("h2", {}, nl.lesson.title));
      cont.appendChild(h("p", {}, "Module " + nl.mod.n + " · " + nl.mod.title + " · about " + nl.lesson.time + " minutes"));
      cont.appendChild(h("a", { class: "btn btn-primary", href: "#/lesson/" + nl.lesson.id }, started ? "Resume lesson" : "Start your first lesson"));
    } else {
      cont.appendChild(h("span", { class: "eyebrow", style: "color:#ffcf9f" }, "Up to date"));
      cont.appendChild(h("h2", {}, "You have finished every available lesson."));
      cont.appendChild(h("p", {}, "More modules are being released. Meanwhile, use the Tools to practice."));
      cont.appendChild(h("a", { class: "btn btn-primary", href: "#/tools" }, "Open tools"));
    }
    p.appendChild(cont);

    var avg = quizAvg();
    var stats = h("div", { class: "grid g4" },
      stat(S.xp, "XP · Level " + level()),
      stat(doneLessons() + " / " + totalPlanned(), "Lessons completed"),
      stat(projectsDone(), "Projects completed"),
      stat(avg == null ? "–" : avg + "%", "Quiz average"));
    p.appendChild(stats);

    var pct = coursePct();
    var cur = nl ? nl.mod : null;
    var left = h("div", { class: "card" }, h("h3", {}, "Course progress"),
      h("div", { style: "display:flex;gap:22px;align-items:center;flex-wrap:wrap" },
        h("div", { class: "ring", style: "--p:" + pct }, h("div", {}, pct + "%")),
        h("div", { style: "flex:1;min-width:180px" }, h("p", {}, h("strong", {}, "Current module: "), cur ? "Module " + cur.n + " · " + cur.title : "All available modules complete"),
          h("p", {}, h("strong", {}, "Current lesson: "), nl ? nl.lesson.title : "None"),
          h("div", { class: "bar", role: "progressbar", "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100" }, h("i", { style: "width:" + pct + "%" })))));
    var capstone = h("div", { class: "card" }, h("h3", {}, "Capstone progress"), h("div", { class: "bar" }, h("i", { style: "width:0%" })),
      h("p", { style: "margin-top:10px;color:var(--ink-2)" }, "0% · The Capstone Wizard unlocks in Module 12 after you complete the NOVA build and the 100-point audit."));
    p.appendChild(h("div", { class: "grid g2", style: "margin-top:18px" }, left, capstone));

    /* daily review */
    var pool = [];
    allLessons().forEach(function (x) { if (lessonDone(x.lesson.id)) x.lesson.quiz.forEach(function (q) { pool.push(q); }); });
    if (pool.length) {
      var day = Math.floor(Date.now() / 86400000);
      var q = pool[day % pool.length];
      p.appendChild(h("div", { class: "card", style: "margin-top:18px" }, h("span", { class: "pill review" }, "Daily review"), h("h3", { style: "margin-top:10px" }, "Quick recall"), renderQuestion(q, null, {})));
    }

    var path = h("ul", { class: "path" });
    CURRICULUM.forEach(function (m) {
      var live = m.status === "live" && window.COURSE && COURSE[m.id];
      var inner = [h("div", { class: "n" }, m.n), h("div", {}, h("strong", {}, m.title), h("small", {}, live ? modDoneCount(m) + " of " + modLessonCount(m) + " lessons" + (moduleComplete(m) ? " · complete" : "") : m.blurb)),
        h("span", { class: "pill " + (live ? (moduleComplete(m) ? "done" : "live") : "") }, live ? (moduleComplete(m) ? "Complete" : "Available") : "Coming soon")];
      path.appendChild(h("li", {}, live ? h("a", { href: "#/module/" + m.id }, inner) : h("div", { class: "row soon" }, inner)));
    });
    p.appendChild(h("h2", { style: "margin-top:34px" }, "Learning path"));
    p.appendChild(path);

    p.appendChild(h("h2", { style: "margin-top:34px" }, "Achievements"));
    var ag = h("div", { class: "grid g3" });
    ACHIEVEMENTS.forEach(function (a) {
      var on = !!S.ach[a.id];
      ag.appendChild(h("div", { class: "ach" + (on ? " on" : "") }, h("div", { class: "ic", "aria-hidden": "true" }, on ? "★" : "☆"), h("div", {}, h("b", {}, a.title), h("span", {}, on ? a.desc : a.desc + " (" + a.hint + ")"))));
    });
    p.appendChild(ag);

    p.appendChild(h("h2", { style: "margin-top:34px" }, "Recent activity"));
    var act = h("div", { class: "card" });
    if (S.log.length) S.log.slice(0, 8).forEach(function (e) { act.appendChild(h("div", { class: "cta-item" }, h("span", {}, e.t), h("small", { style: "color:var(--ink-3)" }, new Date(e.d).toLocaleDateString()))); });
    else act.appendChild(h("p", { style: "margin:0;color:var(--ink-2)" }, "Nothing yet. Complete your first lesson and it will appear here."));
    p.appendChild(act);
    return p;
  }
  function stat(n, l) { return h("div", { class: "card stat" }, h("div", { class: "num" }, String(n)), h("div", { class: "lbl" }, l)); }

  function renderCourse() {
    var p = h("div", {}, h("h1", {}, "The course"), h("p", { style: "color:var(--ink-2)" }, "Thirteen modules take you from how websites work to launching your own. Modules 00 to 02 are available now."));
    var path = h("ul", { class: "path" });
    CURRICULUM.forEach(function (m) {
      var live = m.status === "live" && window.COURSE && COURSE[m.id];
      var inner = [h("div", { class: "n" }, m.n), h("div", {}, h("strong", {}, m.title), h("small", {}, m.blurb)),
        h("span", { class: "pill " + (live ? (moduleComplete(m) ? "done" : "live") : "") }, live ? (moduleComplete(m) ? "Complete" : modDoneCount(m) + "/" + modLessonCount(m)) : "Coming soon")];
      path.appendChild(h("li", {}, live ? h("a", { href: "#/module/" + m.id }, inner) : h("div", { class: "row soon" }, inner)));
    });
    p.appendChild(path);
    return p;
  }

  function renderModule(id) {
    var m = CURRICULUM.filter(function (x) { return x.id === id; })[0];
    if (!m || !COURSE[id]) return notFound();
    var c = COURSE[id];
    var p = h("div", {}, h("div", { class: "crumbs" }, h("a", { href: "#/course" }, "Course"), " / Module " + m.n), h("span", { class: "eyebrow" }, "Module " + m.n), h("h1", {}, m.title), h("p", { style: "color:var(--ink-2)" }, m.blurb));
    var pct = Math.round(modDoneCount(m) / c.lessons.length * 100);
    p.appendChild(h("div", { class: "bar", style: "margin:14px 0 22px" }, h("i", { style: "width:" + pct + "%" })));
    var path = h("ul", { class: "path" });
    c.lessons.forEach(function (l, i) {
      var d = lessonDone(l.id);
      path.appendChild(h("li", {}, h("a", { href: "#/lesson/" + l.id }, h("div", { class: "n" }, m.n.replace(/^0/, "") + "." + (i + 1)), h("div", {}, h("strong", {}, l.title), h("small", {}, "≈ " + l.time + " min · " + l.objective)), h("span", { class: "pill " + (d ? "done" : "live") }, d ? "Done" : "Open"))));
    });
    if (c.quiz) {
      var q = quizState("m:" + id);
      path.appendChild(h("li", {}, h("a", { href: "#/quiz/" + id }, h("div", { class: "n" }, "★"), h("div", {}, h("strong", {}, c.quiz.title), h("small", {}, c.quiz.questions.length + " questions · includes review questions")), h("span", { class: "pill " + (q && q.passed ? "done" : "live") }, q ? (q.passed ? "Passed " + q.best + "%" : "Retry") : "Open"))));
    }
    p.appendChild(path);
    if (moduleComplete(m)) p.appendChild(h("div", { class: "feedback ok", style: "margin-top:20px" }, "Module complete. +100 XP earned."));
    return p;
  }

  function renderModuleQuiz(id) {
    var m = CURRICULUM.filter(function (x) { return x.id === id; })[0];
    var c = COURSE[id];
    if (!m || !c || !c.quiz) return notFound();
    var p = h("div", {}, h("div", { class: "crumbs" }, h("a", { href: "#/module/" + id }, "Module " + m.n), " / Quiz"), h("h1", {}, c.quiz.title));
    p.appendChild(h("p", { style: "color:var(--ink-2)" }, "Pass mark " + PASS + "%. Questions marked Review revisit earlier modules."));
    p.appendChild(h("div", { class: "card" }, renderQuiz(c.quiz.questions, "m:" + id, function () { checkModule(m); }, c.quiz.title)));
    p.appendChild(h("p", { style: "margin-top:18px" }, h("a", { class: "btn", href: "#/module/" + id }, "Back to module")));
    return p;
  }

  /* ------------------------------------------------------------ tools */
  var TOOLS = [
    { id: "prompt", title: "AI Prompt Generator", desc: "Nine fields. One structured prompt.", live: true },
    { id: "brief", title: "Website Brief Generator", desc: "Answer a few questions and get a complete brief.", live: true },
    { id: "cta", title: "CTA Generator", desc: "Clear, action-led button copy for any goal.", live: true },
    { id: "sitemap", title: "Sitemap Builder", desc: "Plan pages and hierarchy.", hint: "Module 03" },
    { id: "audit", title: "Website Audit", desc: "The 100-point scoring system.", hint: "Module 11" },
    { id: "a11y", title: "Accessibility Checklist", desc: "Check semantics, contrast and keyboard use.", hint: "Module 07" },
    { id: "seo", title: "SEO Checklist", desc: "Titles, metadata and structure.", hint: "Module 08" },
    { id: "resp", title: "Responsive Checklist", desc: "Test every screen size.", hint: "Module 06" },
    { id: "debug", title: "AI Debugging Assistant", desc: "Turn bugs into precise prompts.", hint: "Module 09" },
    { id: "client", title: "Client Brief Generator", desc: "Brief clients like a professional.", hint: "Module 03" },
    { id: "launch", title: "Website Launch Checklist", desc: "Everything to check before going live.", hint: "Module 10" },
    { id: "score", title: "Website Quality Score", desc: "A fast health score for any site.", hint: "Module 11" }
  ];
  function renderTools() {
    var p = h("div", {}, h("h1", {}, "Bonus tools"), h("p", { style: "color:var(--ink-2)" }, "Real working tools you can use on any project. Three are available now. The rest unlock as their modules are released."));
    var g = h("div", { class: "grid g3" });
    TOOLS.forEach(function (t) {
      var body = [h("h3", {}, t.title), h("p", { style: "margin:0;color:var(--ink-2)" }, t.desc), t.live ? h("span", { class: "pill live" }, "Open tool") : h("span", { class: "pill" }, "Unlocks with " + t.hint)];
      g.appendChild(t.live ? h("a", { class: "card toolcard", href: "#/tool/" + t.id }, body) : h("div", { class: "card toolcard locked" }, body));
    });
    p.appendChild(g);
    return p;
  }
  function renderTool(id) {
    var t = TOOLS.filter(function (x) { return x.id === id && x.live; })[0];
    if (!t) return notFound();
    var p = h("div", {}, h("div", { class: "crumbs" }, h("a", { href: "#/tools" }, "Tools"), " / " + t.title), h("h1", {}, t.title), h("p", { style: "color:var(--ink-2)" }, t.desc));
    var body;
    if (id === "prompt") body = renderPromptBuilder();
    else if (id === "brief") body = toolBrief();
    else body = toolCTA();
    p.appendChild(h("div", { class: "card" }, body));
    return p;
  }
  function field(label, el, id) { return [h("label", { class: "f", for: id }, label), el]; }
  function toolBrief() {
    var wrap = h("div");
    var ids = {};
    var specs = [
      ["name", "Business or project name", "text", "e.g. NOVA Coffee & Bakery"],
      ["offer", "What do you offer?", "text", "e.g. Specialty coffee and fresh pastries"],
      ["audience", "Who is it for? Be specific.", "text", "e.g. Busy local professionals and weekend families"],
      ["goal", "Primary goal (one only)", "text", "e.g. Increase morning pre-orders"],
      ["cta", "Primary call to action", "text", "e.g. Order for pickup"],
      ["tone", "Tone and feeling", "text", "e.g. Warm, crafted, unhurried"],
      ["pages", "Pages (comma separated)", "text", "e.g. Home, Menu, Order, Visit"]
    ];
    specs.forEach(function (s) {
      var i = h("input", { type: "text", id: "bf-" + s[0], placeholder: s[3] });
      ids[s[0]] = i;
      field(s[1], i, "bf-" + s[0]).forEach(function (x) { wrap.appendChild(x); });
    });
    var out = h("div", { class: "out", style: "display:none" });
    var cp = h("button", { type: "button", class: "btn", style: "margin:12px 0 0 8px;display:none", onclick: function (e) { copyText(out.textContent, e.target); } }, "Copy brief");
    wrap.appendChild(h("button", { type: "button", class: "btn btn-primary", style: "margin-top:16px", onclick: function () {
      var v = {}; Object.keys(ids).forEach(function (k) { v[k] = ids[k].value.trim(); });
      if (!v.name || !v.audience || !v.goal || !v.cta) { out.style.display = "block"; out.textContent = "Please fill in at least the name, audience, goal and call to action."; return; }
      var pages = v.pages ? v.pages.split(",").map(function (s) { return s.trim(); }).filter(Boolean) : ["Home"];
      out.style.display = "block"; cp.style.display = "inline-flex";
      out.textContent = "WEBSITE BRIEF — " + v.name + "\n\n1. WHAT IT IS\n" + v.name + (v.offer ? " offers " + v.offer + "." : ".") + "\n\n2. AUDIENCE\n" + v.audience + "\n\n3. PRIMARY GOAL\n" + v.goal + "\n\n4. PRIMARY CALL TO ACTION\n" + v.cta + " (appears in the header, the hero and the final section)\n\n5. PAGES\n" + pages.map(function (x, i) { return (i + 1) + ". " + x; }).join("\n") + "\n\n6. TONE\n" + (v.tone || "Clear and friendly.") + "\n\n7. SUCCESS MEASURE\nTrack how many visitors complete: \"" + v.cta + "\".\n\n8. RISKS TO AVOID\nVague audience, several competing goals, invented claims or testimonials, and pages that do not support the goal.";
      S.tools.brief = (S.tools.brief || 0) + 1; save();
    } }, "Generate brief"));
    wrap.appendChild(cp); wrap.appendChild(out);
    return wrap;
  }
  function toolCTA() {
    var wrap = h("div");
    var thing = h("input", { type: "text", id: "cta-thing", placeholder: "e.g. your morning pastry box" });
    var goal = h("select", { id: "cta-goal" }, [["buy", "Get someone to buy or order"], ["book", "Get someone to book or reserve"], ["signup", "Get someone to sign up or try"], ["contact", "Get someone to get in touch"], ["learn", "Get someone to explore or learn"]].map(function (x) { return h("option", { value: x[0] }, x[1]); }));
    var tone = h("select", { id: "cta-tone" }, [["friendly", "Friendly"], ["premium", "Premium"], ["direct", "Direct"]].map(function (x) { return h("option", { value: x[0] }, x[1]); }));
    field("What does the visitor get?", thing, "cta-thing").forEach(function (x) { wrap.appendChild(x); });
    field("Goal", goal, "cta-goal").forEach(function (x) { wrap.appendChild(x); });
    field("Tone", tone, "cta-tone").forEach(function (x) { wrap.appendChild(x); });
    var out = h("div", { style: "margin-top:16px", "aria-live": "polite" });
    var T = {
      buy: { friendly: ["Order {t} today", "Get {t} delivered", "Treat yourself to {t}"], premium: ["Reserve {t}", "Order {t}", "Discover {t}"], direct: ["Buy {t}", "Order now", "Get {t}"] },
      book: { friendly: ["Save your spot", "Book {t} in two minutes", "Reserve your table"], premium: ["Request your reservation", "Book {t}", "Secure your date"], direct: ["Book now", "Reserve {t}", "Check availability"] },
      signup: { friendly: ["Start free today", "Try {t} for free", "Join in a minute"], premium: ["Begin your trial", "Request early access", "Get started with {t}"], direct: ["Start free trial", "Sign up", "Try {t}"] },
      contact: { friendly: ["Say hello", "Tell us about {t}", "Ask us anything"], premium: ["Start a conversation", "Request a consultation", "Get in touch"], direct: ["Contact us", "Get a free quote", "Request a call"] },
      learn: { friendly: ["See how it works", "Explore {t}", "Take a look inside"], premium: ["Explore the collection", "Discover {t}", "View the story"], direct: ["Learn more", "See {t}", "View details"] }
    };
    wrap.appendChild(h("button", { type: "button", class: "btn btn-primary", style: "margin-top:16px", onclick: function () {
      var t = thing.value.trim() || "it";
      out.innerHTML = "";
      T[goal.value][tone.value].forEach(function (s) {
        var text = s.replace("{t}", t);
        text = text.charAt(0).toUpperCase() + text.slice(1);
        var len = text.split(/\s+/).length;
        out.appendChild(h("div", { class: "cta-item" }, h("div", {}, h("b", {}, text), h("div", { style: "font-size:.8rem;color:var(--ink-3)" }, len + " words · " + (len <= 4 ? "ideal length" : "consider shortening"))), h("button", { type: "button", class: "btn btn-sm", onclick: function (e) { copyText(text, e.target); } }, "Copy")));
      });
      out.appendChild(h("div", { class: "feedback info" }, "A strong CTA starts with a verb, promises a clear result and removes friction. Use only one primary CTA per screen."));
    } }, "Generate CTAs"));
    wrap.appendChild(out);
    return wrap;
  }

  /* ------------------------------------------------------------ router */
  function route() {
    var parts = (location.hash || "#/dashboard").replace(/^#\//, "").split("/");
    var page = parts[0] || "dashboard", id = parts[1];
    if (page === "certificate") { location.replace("#/dashboard"); return; } /* removed feature: old links go to the dashboard */
    if (activePlayer) { try { activePlayer.destroy(); } catch (e) {} activePlayer = null; }
    var view;
    try {
      if (page === "dashboard") view = renderDashboard();
      else if (page === "course") view = renderCourse();
      else if (page === "module") view = renderModule(id);
      else if (page === "lesson") view = renderLesson(id);
      else if (page === "quiz") view = renderModuleQuiz(id);
      else if (page === "tools") view = renderTools();
      else if (page === "tool") view = renderTool(id);
      else view = notFound();
    } catch (err) {
      console.error(err);
      view = h("div", { class: "card" }, h("h2", {}, "Something went wrong"), h("p", {}, "This page could not be displayed. Return to the dashboard and try again."), h("a", { class: "btn", href: "#/dashboard" }, "Dashboard"));
    }
    root.innerHTML = ""; root.appendChild(view);
    var navKey = { dashboard: "dashboard", course: "course", module: "course", lesson: "course", quiz: "course", tools: "tools", tool: "tools" }[page];
    Array.prototype.forEach.call(document.querySelectorAll("[data-nav]"), function (a) { if (a.getAttribute("data-nav") === navKey) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    window.scrollTo(0, 0); root.focus({ preventScroll: true });
    updateXP();
  }
  window.addEventListener("hashchange", route);
  route();
})();
