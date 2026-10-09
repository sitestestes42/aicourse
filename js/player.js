/* AI Website Launch — lesson video player
 * Plain JavaScript, no dependencies.
 *  - Direct video files (.mp4, .webm, .ogv): custom accessible controls (play/pause, seek, volume,
 *    playback speed, captions when tracks are configured, fullscreen, keyboard shortcuts).
 *  - YouTube: official IFrame API (progress and resume), with its own controls for volume, speed,
 *    captions and fullscreen. Falls back to a plain embed if the API cannot load.
 *  - No URL configured: a clear placeholder. Nothing fake is ever shown.
 * Usage: var p = AWLPlayer.create({ title, description, config, saved, onSave }); parent.appendChild(p.el); p.destroy();
 */
(function () {
  "use strict";

  /* ---------- small helpers ---------- */
  function el(tag, attrs) {
    var e = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === false || v == null) return;
      if (k === "class") e.className = v;
      else if (k === "text") e.textContent = v;
      else if (k.indexOf("on") === 0) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? "" : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      e.appendChild(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return e;
  }
  function fmt(sec) {
    if (!isFinite(sec) || sec < 0) return "0:00";
    sec = Math.floor(sec);
    var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    return (h ? h + ":" + (m < 10 ? "0" : "") + m : m) + ":" + (s < 10 ? "0" : "") + s;
  }

  /* ---------- URL parsing ---------- */
  var YT_HOSTS = /^(www\.|m\.|music\.)?(youtube\.com|youtube-nocookie\.com)$/i;
  function parseSource(raw) {
    var url = (raw || "").trim();
    if (!url) return { kind: "none" };
    var u;
    try { u = new URL(url, window.location.href); } catch (e) { return { kind: "invalid", url: url }; }
    if (u.protocol !== "http:" && u.protocol !== "https:") return { kind: "invalid", url: url };
    var id = null, host = u.hostname;
    if (host === "youtu.be") id = u.pathname.split("/")[1];
    else if (YT_HOSTS.test(host)) {
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else { var m = u.pathname.match(/^\/(embed|shorts|live|v)\/([^/?#]+)/); if (m) id = m[2]; }
    }
    if (id !== null) return /^[A-Za-z0-9_-]{11}$/.test(id || "") ? { kind: "youtube", id: id, url: url } : { kind: "invalid", url: url };
    if (/\.(mp4|m4v|webm|ogv|ogg|mov)$/i.test(u.pathname)) return { kind: "file", url: u.href };
    return { kind: "invalid", url: url };
  }

  /* ---------- YouTube IFrame API loader (loaded once, only when needed) ---------- */
  var ytQueue = [], ytLoading = false, ytDone = false;
  function loadYT(cb) {
    if (window.YT && window.YT.Player) return cb(null);
    ytQueue.push(cb);
    if (ytLoading) return;
    ytLoading = true;
    function flush(err) { if (ytDone) return; ytDone = !err; var q = ytQueue; ytQueue = []; ytLoading = false; q.forEach(function (f) { f(err); }); }
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () { if (typeof prev === "function") prev(); flush(null); };
    var s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api"; s.async = true;
    s.onerror = function () { flush(new Error("load failed")); };
    document.head.appendChild(s);
    setTimeout(function () { if (!(window.YT && window.YT.Player)) flush(new Error("timeout")); }, 10000);
  }

  var SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  var uid = 0;

  function create(opts) {
    opts = opts || {};
    var cfg = opts.config || {};
    var saved = opts.saved || {};
    var src = parseSource(cfg.url);
    var state = { pos: saved.pos || 0, dur: saved.dur || cfg.duration || 0, rate: saved.rate || 1, watched: !!saved.watched };
    var lastSave = 0, destroyed = false, cleanup = [];

    function persist(force) {
      if (!opts.onSave) return;
      var now = Date.now();
      if (!force && now - lastSave < 5000) return;
      lastSave = now;
      opts.onSave({ pos: Math.floor(state.pos), dur: Math.floor(state.dur), rate: state.rate, watched: state.watched });
    }
    function track(pos, dur, ended) {
      if (isFinite(pos)) state.pos = pos;
      if (dur && isFinite(dur)) state.dur = dur;
      if (ended) { state.watched = true; state.pos = 0; }
      else if (state.dur && state.pos / state.dur >= 0.9) state.watched = true;
    }
    function resumeAt() {
      var p = saved.pos || 0, d = state.dur || 0;
      if (p > 5 && (!d || d - p > 8)) return p;
      return 0;
    }

    /* header */
    var durEl = el("span", { class: "vp-dur" }, cfg.duration ? fmt(cfg.duration) : "");
    function setDuration(d) { if (d && isFinite(d)) { state.dur = d; durEl.textContent = fmt(d); } }
    var head = el("div", { class: "vp-head" },
      el("div", {}, el("span", { class: "vp-eyebrow" }, "Video lesson"), el("h2", { class: "vp-title" }, cfg.title || opts.title || "Lesson video")), durEl);
    var desc = (cfg.description || opts.description) ? el("p", { class: "vp-desc" }, cfg.description || opts.description) : null;
    var note = el("div", { class: "vp-note", "aria-live": "polite" });
    function say(text, actions) {
      note.textContent = "";
      if (!text) return;
      note.appendChild(document.createTextNode(text));
      (actions || []).forEach(function (a) { note.appendChild(document.createTextNode(" ")); note.appendChild(el("button", { type: "button", class: "vp-link", onclick: a.fn }, a.label)); });
    }
    var root = el("section", { class: "vp", "aria-label": "Lesson video" }, head, desc);
    var stage = el("div", { class: "vp-stage" });
    root.appendChild(stage); root.appendChild(note);

    /* ---------- placeholder ---------- */
    if (src.kind === "none" || src.kind === "invalid") {
      var invalid = src.kind === "invalid";
      stage.appendChild(el("div", { class: "vp-empty" },
        el("div", { class: "vp-empty-ic", "aria-hidden": "true" }, "▶"),
        el("strong", {}, invalid ? "This video link can't be played" : "No video for this lesson yet"),
        el("p", {}, invalid
          ? "The link is not a YouTube address or a direct .mp4, .webm or .ogv file. The lesson transcript and all activities below still work."
          : "The full lesson transcript and every activity are below. This page will show the video here once one is added.")));
      root.classList.add("vp-none");
      return { el: root, destroy: function () {}, kind: src.kind };
    }

    /* ---------- direct video file ---------- */
    if (src.kind === "file") {
      var video = el("video", { class: "vp-video", playsinline: true, preload: "metadata", "aria-label": cfg.title || opts.title || "Lesson video" });
      if (cfg.poster) video.setAttribute("poster", cfg.poster);
      video.setAttribute("src", src.url); /* src on the element (not a <source> child) so load failures raise "error" on the video */
      var tracks = (cfg.captions || []).filter(function (t) { return t && t.src; });
      tracks.forEach(function (t, i) {
        video.appendChild(el("track", { kind: "captions", src: t.src, srclang: t.lang || "en", label: t.label || "Captions", default: false }));
      });
      var wrap = el("div", { class: "vp-frame", tabindex: "0", role: "group", "aria-label": "Video. Press space to play or pause, arrow keys to seek, F for fullscreen, M to mute." }, video);
      var big = el("button", { type: "button", class: "vp-big", "aria-label": "Play video" }, "▶");
      wrap.appendChild(big);
      var errBox = el("div", { class: "vp-err", hidden: true, role: "alert" });
      wrap.appendChild(errBox);

      var bPlay = el("button", { type: "button", class: "vp-btn", "aria-label": "Play" }, "▶");
      var tCur = el("span", { class: "vp-time" }, "0:00");
      var tDur = el("span", { class: "vp-time vp-time-dur" }, "/ " + fmt(state.dur));
      var seek = el("input", { type: "range", class: "vp-seek", min: "0", max: "1000", step: "1", value: "0", "aria-label": "Seek" });
      var bCC = tracks.length ? el("button", { type: "button", class: "vp-btn", "aria-label": "Captions", "aria-pressed": "false" }, "CC") : null;
      var speed = el("select", { class: "vp-speed", "aria-label": "Playback speed" });
      SPEEDS.forEach(function (s) { speed.appendChild(el("option", { value: String(s) }, s + "×")); });
      speed.value = SPEEDS.indexOf(state.rate) >= 0 ? String(state.rate) : "1";
      var bMute = el("button", { type: "button", class: "vp-btn", "aria-label": "Mute" }, "🔊");
      var vol = el("input", { type: "range", class: "vp-vol", min: "0", max: "1", step: "0.05", value: "1", "aria-label": "Volume" });
      var bFull = el("button", { type: "button", class: "vp-btn", "aria-label": "Fullscreen" }, "⛶");
      var bar = el("div", { class: "vp-controls" }, bPlay, tCur, tDur, seek, bCC, speed, bMute, vol, bFull);
      var box = el("div", { class: "vp-box" }, wrap, bar);
      stage.appendChild(box);

      var seeking = false;
      function toggle() { if (video.paused) { var p = video.play(); if (p && p.catch) p.catch(function () {}); } else video.pause(); }
      function updatePlayUI() {
        var playing = !video.paused && !video.ended;
        bPlay.textContent = playing ? "❚❚" : "▶"; bPlay.setAttribute("aria-label", playing ? "Pause" : "Play");
        big.hidden = playing; big.setAttribute("aria-label", "Play video");
      }
      function updateTimeUI() {
        var d = video.duration;
        tCur.textContent = fmt(video.currentTime);
        if (d && isFinite(d)) { tDur.textContent = "/ " + fmt(d); if (!seeking) seek.value = String(Math.round(video.currentTime / d * 1000)); }
        seek.setAttribute("aria-valuetext", fmt(video.currentTime) + " of " + fmt(d || 0));
      }
      function setCaptions(on) {
        for (var i = 0; i < video.textTracks.length; i++) video.textTracks[i].mode = (on && i === 0) ? "showing" : "hidden";
        if (bCC) { bCC.setAttribute("aria-pressed", String(!!on)); bCC.classList.toggle("on", !!on); }
      }
      function fullscreen() {
        var d = document, target = box;
        if (d.fullscreenElement || d.webkitFullscreenElement) { (d.exitFullscreen || d.webkitExitFullscreen).call(d); return; }
        if (target.requestFullscreen) target.requestFullscreen().catch(function () {});
        else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen();
        else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen(); /* iPhone Safari */
      }
      function on(t, e, f) { t.addEventListener(e, f); cleanup.push(function () { t.removeEventListener(e, f); }); }

      on(bPlay, "click", toggle); on(big, "click", toggle);
      on(video, "click", toggle);
      on(video, "play", updatePlayUI); on(video, "pause", function () { updatePlayUI(); track(video.currentTime, video.duration); persist(true); });
      on(video, "ended", function () { updatePlayUI(); track(0, video.duration, true); persist(true); updateTimeUI(); say("You finished this video. Watching does not complete the lesson: finish the activity, quiz and practice below."); });
      on(video, "timeupdate", function () { updateTimeUI(); if (!video.paused) { track(video.currentTime, video.duration); persist(false); } });
      on(video, "loadedmetadata", function () {
        setDuration(video.duration); updateTimeUI();
        video.playbackRate = parseFloat(speed.value) || 1;
        var p = resumeAt();
        if (p && p < video.duration - 1) {
          video.currentTime = p;
          say("Resumed from " + fmt(p) + ".", [{ label: "Start over", fn: function () { video.currentTime = 0; say(""); } }]);
        }
      });
      on(video, "volumechange", function () { vol.value = String(video.muted ? 0 : video.volume); bMute.textContent = (video.muted || video.volume === 0) ? "🔇" : "🔊"; bMute.setAttribute("aria-label", video.muted ? "Unmute" : "Mute"); });
      on(video, "error", function () {
        errBox.hidden = false; errBox.textContent = "";
        errBox.appendChild(document.createTextNode("This video could not be loaded. Check the link or your connection. "));
        errBox.appendChild(el("a", { href: src.url, target: "_blank", rel: "noopener" }, "Open the file directly"));
        big.hidden = true;
      });
      on(seek, "input", function () { seeking = true; var d = video.duration; if (d && isFinite(d)) { video.currentTime = seek.value / 1000 * d; } });
      on(seek, "change", function () { seeking = false; });
      on(speed, "change", function () { var r = parseFloat(speed.value) || 1; video.playbackRate = r; state.rate = r; persist(true); });
      on(vol, "input", function () { video.volume = parseFloat(vol.value); video.muted = video.volume === 0; });
      on(bMute, "click", function () { video.muted = !video.muted; });
      on(bFull, "click", fullscreen);
      if (bCC) on(bCC, "click", function () { setCaptions(bCC.getAttribute("aria-pressed") !== "true"); });
      on(wrap, "keydown", function (e) {
        if (e.target !== wrap) return;
        var k = e.key;
        if (k === " " || k === "k") { e.preventDefault(); toggle(); }
        else if (k === "ArrowRight") { e.preventDefault(); video.currentTime = Math.min((video.duration || 1e9), video.currentTime + 5); }
        else if (k === "ArrowLeft") { e.preventDefault(); video.currentTime = Math.max(0, video.currentTime - 5); }
        else if (k === "f") { e.preventDefault(); fullscreen(); }
        else if (k === "m") { e.preventDefault(); video.muted = !video.muted; }
        else if (k === "c" && bCC) { e.preventDefault(); setCaptions(bCC.getAttribute("aria-pressed") !== "true"); }
      });
      on(window, "pagehide", function () { track(video.currentTime, video.duration); persist(true); });
      setCaptions(false); updatePlayUI();

      return {
        el: root, kind: "file", video: video,
        destroy: function () {
          if (destroyed) return; destroyed = true;
          try { if (video.currentTime) { track(video.currentTime, video.duration); persist(true); } video.pause(); video.removeAttribute("src"); video.load(); } catch (e) {}
          cleanup.forEach(function (f) { f(); });
        }
      };
    }

    /* ---------- YouTube ---------- */
    var mount = el("div", { class: "vp-yt" });
    var frame = el("div", { class: "vp-frame vp-frame-yt" }, mount);
    stage.appendChild(frame);
    var ytp = null, timer = null;
    var startAt = resumeAt();
    var cleanEmbed = "https://www.youtube-nocookie.com/embed/" + src.id + "?rel=0&playsinline=1" + (startAt ? "&start=" + Math.floor(startAt) : "");

    function plainEmbed(msg) {
      mount.parentNode.replaceChild(el("iframe", {
        class: "vp-iframe", src: cleanEmbed, title: cfg.title || opts.title || "Lesson video",
        allow: "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen", allowfullscreen: true,
        referrerpolicy: "strict-origin-when-cross-origin", loading: "lazy"
      }), mount);
      say(msg);
    }
    function poll() {
      if (!ytp || !ytp.getCurrentTime) return;
      try { track(ytp.getCurrentTime(), ytp.getDuration()); setDuration(state.dur); persist(false); } catch (e) {}
    }
    loadYT(function (err) {
      if (destroyed) return;
      if (err) { plainEmbed("Progress saving is unavailable because the YouTube player script could not load."); return; }
      var vars = { rel: 0, playsinline: 1, modestbranding: 1, hl: "en" };
      if (startAt) vars.start = Math.floor(startAt);
      if (/^https?:$/.test(location.protocol)) vars.origin = location.origin;
      try {
        ytp = new YT.Player(mount, {
          host: "https://www.youtube-nocookie.com", videoId: src.id, playerVars: vars,
          events: {
            onReady: function () {
              try {
                if (state.rate && state.rate !== 1) ytp.setPlaybackRate(state.rate);
                setDuration(ytp.getDuration());
                var f = ytp.getIframe && ytp.getIframe();
                if (f) { f.classList.add("vp-iframe"); f.setAttribute("title", cfg.title || opts.title || "Lesson video"); }
              } catch (e) {}
              if (startAt) say("Resumed from " + fmt(startAt) + ".", [{ label: "Start over", fn: function () { try { ytp.seekTo(0, true); } catch (e) {} say(""); } }]);
            },
            onStateChange: function (e) {
              if (e.data === 1) { if (!timer) timer = setInterval(poll, 1000); }
              else {
                if (timer) { clearInterval(timer); timer = null; }
                if (e.data === 2) { poll(); persist(true); }
                if (e.data === 0) { track(0, state.dur, true); persist(true); say("You finished this video. Watching does not complete the lesson: finish the activity, quiz and practice below."); }
              }
            },
            onPlaybackRateChange: function (e) { state.rate = e.data; persist(true); },
            onError: function () { say("This YouTube video can't be played here. It may be private, removed, or blocked from embedding."); }
          }
        });
      } catch (e) { plainEmbed("Progress saving is unavailable for this video."); }
    });
    var onHide = function () { poll(); persist(true); };
    window.addEventListener("pagehide", onHide); cleanup.push(function () { window.removeEventListener("pagehide", onHide); });

    return {
      el: root, kind: "youtube",
      destroy: function () {
        if (destroyed) return; destroyed = true;
        if (timer) clearInterval(timer);
        try { poll(); if (state.pos) persist(true); if (ytp && ytp.destroy) ytp.destroy(); } catch (e) {}
        cleanup.forEach(function (f) { f(); });
      }
    };
  }

  window.AWLPlayer = { create: create, parseSource: parseSource, fmt: fmt };
})();
