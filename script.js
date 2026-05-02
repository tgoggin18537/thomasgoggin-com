/* =========================================
   thomasgoggin.com / script
   ========================================= */

(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const body = document.body;
  const voiceToggle = document.getElementById("voiceToggle");

  function applyVoice(state) {
    body.dataset.voice = state;
    document.querySelectorAll("[data-formal][data-real]").forEach((el) => {
      el.textContent = state === "formal" ? el.dataset.formal : el.dataset.real;
    });
    try { localStorage.setItem("tg-voice", state); } catch (_) {}
  }

  let savedVoice = "real";
  try { savedVoice = localStorage.getItem("tg-voice") || "real"; } catch (_) {}
  applyVoice(savedVoice);

  const seenHint = (() => { try { return localStorage.getItem("tg-hint-seen") === "1"; } catch (_) { return false; } })();
  if (!seenHint) {
    setTimeout(() => document.body.classList.add("show-voice-hint"), 1400);
    setTimeout(() => {
      document.body.classList.remove("show-voice-hint");
      try { localStorage.setItem("tg-hint-seen", "1"); } catch (_) {}
    }, 12000);
  }

  function dismissHint() {
    document.body.classList.remove("show-voice-hint");
    try { localStorage.setItem("tg-hint-seen", "1"); } catch (_) {}
  }

  voiceToggle?.addEventListener("click", () => {
    const next = body.dataset.voice === "real" ? "formal" : "real";
    applyVoice(next);
    dismissHint();
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    if (e.key.toLowerCase() === "v" && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const next = body.dataset.voice === "real" ? "formal" : "real";
      applyVoice(next);
      dismissHint();
    }
  });

  // -------- custom cursor --------
  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursorRing");
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  if (cursor && cursorRing && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();
    const hoverables = "a, button, .station, [role='button'], .stack-item, .approach-item, .contact-mail, .case-disclose";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverables)) cursorRing.classList.add("hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverables)) cursorRing.classList.remove("hover");
    });
  }

  // -------- case study data --------
  const cases = {
    reception: {
      eyebrow: "RECEPTIONIST · voice ai",
      title: { formal: "An AI receptionist that answers every call.", real: "The bot that picks up while youre on a roof." },
      tagline: { formal: "Voice agent. Books strategy calls 24/7.", real: "Voice bot that books calls so the owner can stay on the job site." },
      wow: { type: "voice-call", accent: "#FF6B35" },
      build: [
        {
          label: "voice agent",
          body: {
            formal: "Custom voice on Retell tuned to the businesss tone. Branded greeting, knows your services, your hours, your booking rules.",
            real: "Picks up calls in a real voice, not robot voice. Knows what you sell and what you dont. (For one client, the bot books strategy calls 24/7 while the owner is on the job site.)"
          }
        },
        {
          label: "calendar integration",
          body: {
            formal: "Real Cal.com lookup, real availability, real confirmations. Slots that get booked are actually booked.",
            real: "When the bot says 2:30 Thursday is open, 2:30 Thursday is actually open. Books it for real."
          }
        },
        {
          label: "CRM handoff",
          body: {
            formal: "Booking triggers a workflow. Lead drops into the right pipeline stage. SMS confirmation fires. Owner gets notified.",
            real: "Booking lands in your CRM, lead gets pinged, you get notified. (Pre-launch on one client this almost broke. The GHL had no number assigned, so the SMS step looked successful but never fired. Caught it in a test booking, fixed it, no funnel saw the bug.)"
          }
        }
      ],
      stack: ["Retell AI", "Cal.com", "GoHighLevel", "Twilio", "Cloudflare"]
    },

    spiffy: {
      eyebrow: "SMS SALES · spring break travel",
      title: { formal: "A voice-matched SMS sales bot.", real: "Texts like the founder. Sells like the founder. Isnt the founder." },
      tagline: { formal: "Custom SMS bot that books trips in the founders exact voice.", real: "A bot that texts exactly like the guy who runs it. Closes leads while hes asleep." },
      wow: { type: "sms-thread", accent: "#FFB800", bgUser: "#1f2737", bgBot: "#FFB800", textBot: "#0a0d14",
        threads: [
          [
            { who: "lead", text: "yo cancun still open for march" },
            { who: "bot", text: "yoooo march wide open. how many of yall?" },
            { who: "lead", text: "8 of us" },
            { who: "bot", text: "perfect size. condo on the beach or hotel w pool deck?" },
            { who: "lead", text: "condo w pool tho" },
            { who: "bot", text: "say less. dropping the link. lock-ins per head so youre good even if a couple chickens out lol" },
            { who: "lead", text: "lol bet. cheapest one?" },
            { who: "bot", text: "for 8 the budget pick is ~$480/head all-in. condo, breakfast, transfers. send it?" }
          ],
          [
            { who: "lead", text: "thinking cabo for my girls bday. yall do that?" },
            { who: "bot", text: "cabo is the move. how many heads + dates?" },
            { who: "lead", text: "8 of us. march 14-21" },
            { who: "bot", text: "got you. couples vibe or party house?" },
            { who: "lead", text: "both lol mostly couples" },
            { who: "bot", text: "perfect. dropping a 2br oceanfront + a party villa. lock-in is per head, $250 holds your spot" },
            { who: "lead", text: "ok send" },
            { who: "bot", text: "sent. lmk if you want me to break out the costs once you see them" }
          ],
          [
            { who: "lead", text: "punta cana for 4 dudes spring break?" },
            { who: "bot", text: "ayyyy. dates?" },
            { who: "lead", text: "march 8-15" },
            { who: "bot", text: "all-inclusive or you wanna cook" },
            { who: "lead", text: "all-inclusive for sure" },
            { who: "bot", text: "got 3 spots that fit 4. budget pick is $620/head. flights, drinks, food, pool" },
            { who: "lead", text: "say less. send" },
            { who: "bot", text: "link in your texts. quick deposit and youre locked" }
          ],
          [
            { who: "lead", text: "thinking miami feb. costs?" },
            { who: "bot", text: "miami feb is sneaky cheap. how many?" },
            { who: "lead", text: "5" },
            { who: "bot", text: "south beach or a few blocks back" },
            { who: "lead", text: "south beach if its not crazy" },
            { who: "bot", text: "got a spot 2 blocks off ocean. $310/head 4 nights. send the link?" },
            { who: "lead", text: "yep" },
            { who: "bot", text: "sending. youll see the deposit option in there too. flexible if anyone bails" }
          ],
          [
            { who: "lead", text: "bachelorette in tulum, 10 girls. doable?" },
            { who: "bot", text: "tulum bach is a vibe. dates?" },
            { who: "lead", text: "april 4-9" },
            { who: "bot", text: "got you. cenote day, beach club, and the villa. want the full play or pick + choose?" },
            { who: "lead", text: "full play sounds amazing" },
            { who: "bot", text: "$890/head all in. villa, transfers, beach club table, cenote. lock-ins per head so flakers dont kill you" },
            { who: "lead", text: "PERFECT lol send" },
            { who: "bot", text: "sending now. youll get the deposit link in 30 sec" }
          ]
        ]
      },
      build: [
        {
          label: "voice-matched prompt engineering",
          body: {
            formal: "Six months of historical sales transcripts fed into prompt iteration. Eval against would the founder actually say this.",
            real: "I pull your actual texts, run them through prompt iteration. If a reply reads like ChatGPT, the prompt gets rewritten. (For one client that meant matching a specific tone. Playful, fast, no corporate bullshit.)"
          }
        },
        {
          label: "edge compute + state",
          body: {
            formal: "Cloudflare Workers for compute, Durable Objects for per-conversation state, KV for fast lookups. Sub-200ms latency.",
            real: "Per-conversation state on the edge. Fast enough that the lead doesnt notice its a bot."
          }
        },
        {
          label: "CRM handoff",
          body: {
            formal: "Booking links delivered, pipeline stage advanced, owner notified when a deal closes.",
            real: "When it closes them, the link drops, your CRM advances, you get the ping."
          }
        }
      ],
      stack: ["Cloudflare Workers", "Durable Objects", "KV", "Anthropic Claude", "GoHighLevel"]
    },

    ava: {
      eyebrow: "SMS SETTER · concierge medical",
      title: { formal: "An SMS setter bot for a concierge medical practice.", real: "The setter that books before the office opens." },
      tagline: { formal: "Voice-matched intake bot that qualifies leads and books consults via SMS.", real: "Texts new patients. Qualifies them. Books the consult. All before the front desk pours coffee." },
      wow: { type: "eval-grid", accent: "#A855F7" },
      build: [
        {
          label: "voice-matched prompt engineering",
          body: {
            formal: "Iterated against historical conversation data until the bot matches the brands tone. Multiple rounds of tuning, eval at every step.",
            real: "Pull your real conversations, eval every reply, rewrite if it sounds AI. (For one concierge practice it took three rounds. V1 too clinical, V2 too sales-y, V3 hit it.)"
          }
        },
        {
          label: "eval pipeline",
          body: {
            formal: "Every prompt change runs through 50+ test conversations scored on tone, accuracy, personality match, and hallucination. No prompt ships without passing.",
            real: "Built an eval rig that runs every change through 50 conversation simulations. Four-axis scoring. Catches regressions before they hit a real user. No lol-let-me-try-this-prompt shipping."
          }
        },
        {
          label: "CRM handoff",
          body: {
            formal: "Bot ships qualified leads into the pipeline with full context. Booking link delivered, stage advanced, owner notified.",
            real: "Once it qualifies the lead, the booking link drops, your CRM advances, you get pinged."
          }
        }
      ],
      stack: ["Cloudflare Workers", "Anthropic Claude", "GoHighLevel", "Eval Pipeline", "Custom Prompt Iteration"]
    },

    leadflo: {
      eyebrow: "BACKEND · custom systems",
      title: { formal: "Custom backend systems.", real: "Backend that doesnt break when the team grows." },
      tagline: { formal: "Multi-tenant architecture, custom-coded landing pages, automation pipelines, replication tooling.", real: "When the off-the-shelf stack hits its ceiling, this is what gets built underneath." },
      wow: { type: "lead-flow", accent: "#FFB800" },
      build: [
        {
          label: "multi-tenant architecture",
          body: {
            formal: "Sub-account structure rebuilt for replication. Templates for landing pages, workflows, custom values, calendars. New accounts spin up from a clean baseline.",
            real: "Cleaned up the chaos. Every account follows the same template now. (For one platform, onboarding went from 2 days to 15 minutes.)"
          }
        },
        {
          label: "custom-coded landing pages",
          body: {
            formal: "HTML/CSS pages that pull every dynamic field from the CRM. Conditional rendering for per-account variations. Drops into a Custom HTML block.",
            real: "Built a landing page that pulls every field from the CRM. Phone, address, partners, hours, services. Hides whole sections automatically when fields are empty. Drops in and just works."
          }
        },
        {
          label: "automation pipelines",
          body: {
            formal: "Lead capture, tagging, enrichment, contact attempts, booking, post-booking nurture. Every step logs to the CRM for visibility.",
            real: "Lead comes in, gets tagged, gets enriched, gets contacted, gets booked, gets nurtured. Every step logged. Nothing falls through."
          }
        }
      ],
      stack: ["GoHighLevel", "Custom HTML/CSS", "Merge Tag Architecture", "Conditional Rendering", "Multi-tenant Replication"]
    }
  };

  // -------- WOW renderers --------
  function wowSmsThread(w, key) {
    const pool = Array.isArray(w.threads) && w.threads.length ? w.threads : [w.thread];
    const thread = pool[Math.floor(Math.random() * pool.length)];
    const items = thread.map((m, i) => {
      const isBot = m.who === "bot";
      const cls = isBot ? "wow-msg wow-msg-bot" : "wow-msg wow-msg-user";
      const style = `background:${isBot ? w.bgBot : w.bgUser};color:${isBot ? w.textBot : "#fff"};animation-delay:${i * 0.85}s`;
      return `<div class="${cls}" style="${style}"><span class="wow-msg-inner">${m.text}</span></div>`;
    }).join("");
    return `
      <div class="wow wow-sms" data-wow="${key}">
        <div class="wow-frame">
          <div class="wow-frame-bar">
            <span class="wow-frame-dot"></span>
            <span class="wow-frame-label">live thread · sample</span>
          </div>
          <div class="wow-thread">${items}</div>
        </div>
      </div>`;
  }

  function wowVoiceCall(w, key) {
    const calls = [
      {
        from: "+1 (***) ***-2841",
        name: "█████ █.",
        transcript: [
          { who: "bot",  text: "Hey, this is the front desk. How can I help?", delay: 0.4 },
          { who: "user", text: "yeah im trying to figure out if my insurance works with you guys", delay: 2.4 },
          { who: "bot",  text: "Good question. Were a concierge practice so we dont actually bill insurance, we run on a flat membership instead.", delay: 4.4 },
          { who: "user", text: "oh okay how does that work", delay: 7.6 },
          { who: "bot",  text: "Easiest way is I send you the one-pager and we hop on tomorrow if it makes sense. Whats a good email?", delay: 9.0 }
        ]
      },
      {
        from: "+1 (***) ***-7193",
        name: "███████",
        transcript: [
          { who: "bot",  text: "Hey, front desk.", delay: 0.4 },
          { who: "user", text: "this is mike i got booked for friday and i need to push it back", delay: 2.0 },
          { who: "bot",  text: "Mike, all good. Let me pull you up real quick.", delay: 4.2 },
          { who: "bot",  text: "Yep, friday at 2. What day works better for you?", delay: 6.4 },
          { who: "user", text: "tuesday after 4 if you got it", delay: 8.8 },
          { who: "bot",  text: "Tuesday 4:30 is open. Locking that in. Confirmation is on the way, anything else while youre on?", delay: 10.4 }
        ]
      },
      {
        from: "+1 (***) ***-0584",
        name: "█████ ███████",
        transcript: [
          { who: "bot",  text: "Hey, front desk. Whats going on?", delay: 0.4 },
          { who: "user", text: "im locked out at home and i think im on your service plan", delay: 2.2 },
          { who: "bot",  text: "Lets check. Whats the address?", delay: 4.6 },
          { who: "user", text: "1402 maple", delay: 6.2 },
          { who: "bot",  text: "Got you. Youre on the priority plan, closest tech is 18 out. Want me to send him?", delay: 7.6 },
          { who: "user", text: "yes please", delay: 10.6 },
          { who: "bot",  text: "On the way. Stay somewhere safe, hell call when hes pulling up.", delay: 12.0 }
        ]
      }
    ];
    const callPanels = calls.map((c, i) => `
      <div class="vc-call ${i === 0 ? 'vc-active' : ''}" data-idx="${i}">
        <div class="vc-meta">
          <div class="vc-meta-pair"><span class="vc-meta-label">FROM</span><span class="vc-meta-value vc-blur">${c.from}</span></div>
          <div class="vc-meta-pair"><span class="vc-meta-label">CALLER</span><span class="vc-meta-value vc-blur">${c.name}</span></div>
        </div>
        <div class="vc-call-row">
          <div class="vc-avatar">
            <div class="vc-pulse"></div>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div class="vc-waveform">
            ${Array.from({ length: 24 }).map((_, j) => `<span class="vc-wave-bar" style="animation-delay:${(j * 0.05).toFixed(2)}s"></span>`).join("")}
          </div>
        </div>
        <div class="vc-transcript">
          ${c.transcript.map(m => `<div class="vc-tx vc-tx-${m.who}" style="animation-delay:${m.delay}s">${m.text}</div>`).join("")}
        </div>
      </div>
    `).join("");
    const dots = calls.map((_, i) => `<span class="vc-dot ${i === 0 ? 'vc-dot-active' : ''}" data-idx="${i}"></span>`).join("");
    return `
      <div class="wow wow-call-cycle" data-wow="${key}" style="--accent:${w.accent}">
        <div class="wow-frame">
          <div class="wow-frame-bar">
            <span class="wow-frame-dot wow-frame-dot-ring"></span>
            <span class="wow-frame-label">incoming · live</span>
            <span class="vc-dots">${dots}</span>
          </div>
          <div class="vc-stack">${callPanels}</div>
        </div>
      </div>`;
  }

  function wowEvalGrid(w, key) {
    return `
      <div class="wow wow-eval-active" data-wow="${key}" style="--accent:${w.accent}">
        <div class="wow-frame">
          <div class="wow-frame-bar">
            <span class="wow-frame-dot wow-frame-dot-purple"></span>
            <span class="wow-frame-label">eval pipeline · screening every reply before it ships</span>
            <span class="ev-counter"><span class="ev-pass">47</span>/<span class="ev-total">50</span> <span class="ev-counter-lbl">passing</span></span>
          </div>
          <div class="ev-body">
            <div class="ev-bubble">
              <div class="ev-bubble-head">CANDIDATE REPLY</div>
              <div class="ev-bubble-text"></div>
            </div>
            <div class="ev-axes">
              <div class="ev-axis" data-axis="tone">
                <span class="ev-axis-name">tone</span>
                <span class="ev-axis-mark"></span>
              </div>
              <div class="ev-axis" data-axis="accuracy">
                <span class="ev-axis-name">accuracy</span>
                <span class="ev-axis-mark"></span>
              </div>
              <div class="ev-axis" data-axis="personality">
                <span class="ev-axis-name">matches-personality</span>
                <span class="ev-axis-mark"></span>
              </div>
              <div class="ev-axis" data-axis="hallucinations">
                <span class="ev-axis-name">no-hallucinations</span>
                <span class="ev-axis-mark"></span>
              </div>
            </div>
            <div class="ev-result">
              <span class="ev-result-stamp"></span>
              <span class="ev-result-note"></span>
            </div>
          </div>
        </div>
      </div>`;
  }

  function wowLeadFlow(w, key) {
    // BACKEND: multi-lane control room. each lane is a distinct workflow type
    // running in parallel, packed with packets representing live executions.
    const lanes = [
      { id: "capture",  name: "lead capture",     meta: "webhook · form · api",        color: "#FFB800", count: 2418, packets: 5 },
      { id: "enrich",   name: "lead enrichment",  meta: "data lookup · scoring",       color: "#FF8C42", count: 1892, packets: 4 },
      { id: "sms",      name: "sms dispatch",     meta: "twilio · drip · scheduled",   color: "#39FF14", count: 4210, packets: 6 },
      { id: "calendar", name: "calendar sync",    meta: "cal.com · ghl · ics",         color: "#A855F7", count:  887, packets: 3 },
      { id: "tagging",  name: "crm tagging",      meta: "stage · pipeline · custom",   color: "#39bdef", count: 2134, packets: 4 },
      { id: "webhook",  name: "webhook routing",  meta: "incoming · transform · fan",  color: "#FF6B35", count: 1306, packets: 4 }
    ];
    const lanesHtml = lanes.map((l, li) => {
      const packets = Array.from({ length: l.packets }).map((_, pi) => {
        const dur = (3.2 + (pi * 0.31) + (li * 0.13)).toFixed(2);
        const delay = ((pi * (4.0 / l.packets)) + (li * 0.18)).toFixed(2);
        return `<span class="ops-packet" style="animation-duration:${dur}s;animation-delay:${delay}s"></span>`;
      }).join("");
      return `
        <div class="ops-lane" data-lane="${l.id}" style="--lane:${l.color}">
          <div class="ops-lane-head">
            <span class="ops-lane-dot"></span>
            <span class="ops-lane-name">${l.name}</span>
            <span class="ops-lane-meta">${l.meta}</span>
          </div>
          <div class="ops-lane-track">${packets}</div>
          <div class="ops-lane-count" data-count="${l.count}">${l.count.toLocaleString()}</div>
        </div>`;
    }).join("");
    return `
      <div class="wow wow-ops" data-wow="${key}" style="--accent:${w.accent}">
        <div class="wow-frame">
          <div class="wow-frame-bar">
            <span class="wow-frame-dot"></span>
            <span class="wow-frame-label">backend ops · multi-tenant</span>
            <span class="ops-counter"><span class="ops-counter-n">12,847</span><span class="ops-counter-tail">&nbsp;executions today</span></span>
          </div>
          <div class="ops-grid">${lanesHtml}</div>
          <div class="ops-legend">
            <span class="ops-legend-item"><span class="ops-legend-dot"></span>running now</span>
            <span class="ops-legend-sep">·</span>
            <span class="ops-legend-item">auto-recovers on failure</span>
            <span class="ops-legend-sep">·</span>
            <span class="ops-legend-item">every step logged to crm</span>
          </div>
        </div>
      </div>`;
  }

  const wowRenderers = {
    "sms-thread": wowSmsThread,
    "voice-call": wowVoiceCall,
    "eval-grid": wowEvalGrid,
    "lead-flow": wowLeadFlow
  };

  // -------- case study overlay --------
  const overlay = document.getElementById("caseOverlay");
  const overlayContent = document.getElementById("caseContent");
  const overlayClose = document.getElementById("caseClose");

  function getVoice() { return body.dataset.voice; }

  // -------- timer registry (intervals/timeouts owned by the open case) --------
  let activeTimers = [];
  function clearActiveTimers() {
    activeTimers.forEach(id => { clearInterval(id); clearTimeout(id); });
    activeTimers = [];
  }

  // -------- receptionist call cycle --------
  function startCallCycle(container) {
    const calls = container.querySelectorAll(".vc-call");
    const dots = container.querySelectorAll(".vc-dot");
    if (!calls.length) return;
    calls[0].classList.add("vc-playing");
    if (calls.length < 2) return;
    let idx = 0;
    const cycleMs = 16000;
    const tick = () => {
      calls[idx].classList.remove("vc-active", "vc-playing");
      dots[idx]?.classList.remove("vc-dot-active");
      idx = (idx + 1) % calls.length;
      void calls[idx].offsetWidth;
      calls[idx].classList.add("vc-active", "vc-playing");
      dots[idx]?.classList.add("vc-dot-active");
    };
    const id = setInterval(tick, cycleMs);
    activeTimers.push(id);
  }

  // -------- ava active eval cycle --------
  function startEvalCycle(container) {
    const samples = [
      {
        text: "Hi! Just saw your message, happy to walk you through what we offer whenever's good.",
        tone: true, accuracy: true, personality: true, hallucinations: true,
        result: "shipped", note: "ready for production"
      },
      {
        text: "Yo we can 100% guarantee youll feel better in 30 days no questions asked.",
        tone: false, accuracy: false, personality: false, hallucinations: false,
        result: "rejected", note: "tone · medical guarantee · prompt rewrite"
      },
      {
        text: "Totally, the consult is free. Want to grab a slot this week?",
        tone: true, accuracy: true, personality: true, hallucinations: true,
        result: "shipped", note: "ready for production"
      },
      {
        text: "Dr. Kim trained under three Nobel laureates and has 30+ years of experience.",
        tone: true, accuracy: false, personality: true, hallucinations: false,
        result: "rejected", note: "unverified credential claim · prompt rewrite"
      },
      {
        text: "Got it, let me grab you Tuesday at 10. Sound good?",
        tone: true, accuracy: true, personality: true, hallucinations: true,
        result: "shipped", note: "ready for production"
      }
    ];
    const bubbleText = container.querySelector(".ev-bubble-text");
    const axes = {
      tone: container.querySelector('[data-axis="tone"]'),
      accuracy: container.querySelector('[data-axis="accuracy"]'),
      personality: container.querySelector('[data-axis="personality"]'),
      hallucinations: container.querySelector('[data-axis="hallucinations"]')
    };
    const stamp = container.querySelector(".ev-result-stamp");
    const note = container.querySelector(".ev-result-note");
    const passEl = container.querySelector(".ev-pass");
    const totalEl = container.querySelector(".ev-total");
    if (!bubbleText || !stamp || !note) return;

    let idx = 0, pass = 47, total = 50;

    function play() {
      const s = samples[idx];
      // reset
      bubbleText.textContent = s.text;
      Object.values(axes).forEach(a => a && a.classList.remove("ev-axis-pass", "ev-axis-fail", "ev-axis-active"));
      stamp.textContent = "";
      stamp.className = "ev-result-stamp";
      note.textContent = "";
      container.classList.remove("ev-shipped", "ev-rejected");
      void container.offsetWidth;
      container.classList.add("ev-running");

      const order = ["tone", "accuracy", "personality", "hallucinations"];
      order.forEach((k, i) => {
        const t1 = setTimeout(() => {
          axes[k]?.classList.add("ev-axis-active");
        }, 700 + i * 600);
        const t2 = setTimeout(() => {
          axes[k]?.classList.remove("ev-axis-active");
          axes[k]?.classList.add(s[k] ? "ev-axis-pass" : "ev-axis-fail");
        }, 1100 + i * 600);
        activeTimers.push(t1, t2);
      });

      const stampTimer = setTimeout(() => {
        const shipped = s.result === "shipped";
        stamp.textContent = shipped ? "SHIPPED" : "REJECTED";
        stamp.classList.add(shipped ? "ev-stamp-shipped" : "ev-stamp-rejected");
        note.textContent = s.note || "";
        container.classList.add(shipped ? "ev-shipped" : "ev-rejected");
        total += 1;
        if (shipped) pass += 1;
        if (passEl) passEl.textContent = pass;
        if (totalEl) totalEl.textContent = total;
      }, 3700);
      activeTimers.push(stampTimer);

      const nextTimer = setTimeout(() => {
        idx = (idx + 1) % samples.length;
        play();
      }, 5400);
      activeTimers.push(nextTimer);
    }

    play();
  }

  // -------- leadflo pipe cycle (one-at-a-time discrete ticks) --------
  function startOpsCycle(container) {
    // tick the top counter to feel alive; per-lane counters tick in sync with packets
    const counterN = container.querySelector(".ops-counter-n");
    const laneCounts = container.querySelectorAll(".ops-lane-count");
    if (!counterN) return;
    let total = 12847;
    const id = setInterval(() => {
      if (!container.isConnected) return;
      // top counter increments by random 1-4
      const inc = 1 + Math.floor(Math.random() * 4);
      total += inc;
      counterN.textContent = total.toLocaleString();
      // pick a random lane and increment its counter by 1
      if (laneCounts.length) {
        const idx = Math.floor(Math.random() * laneCounts.length);
        const cell = laneCounts[idx];
        const cur = parseInt(cell.dataset.count, 10) || 0;
        const nxt = cur + 1;
        cell.dataset.count = String(nxt);
        cell.textContent = nxt.toLocaleString();
        // pulse the lane briefly
        const lane = cell.closest(".ops-lane");
        if (lane) {
          lane.classList.add("ops-lane-pulse");
          const t = setTimeout(() => lane.classList.remove("ops-lane-pulse"), 420);
          activeTimers.push(t);
        }
      }
    }, 700);
    activeTimers.push(id);
  }

  function renderCase(key) {
    const c = cases[key];
    if (!c) return;
    const v = getVoice();
    const buildHtml = (c.build || []).map((s) => `
      <div class="case-section">
        <div class="case-section-h">${s.label}</div>
        <p class="case-section-body">${s.body[v]}</p>
      </div>`).join("");
    const stackHtml = c.stack.map(s => `<span class="case-stack-tag">${s}</span>`).join("");
    let wowHtml = "";
    if (c.wow && wowRenderers[c.wow.type]) {
      wowHtml = wowRenderers[c.wow.type](c.wow, key);
    }

    overlayContent.innerHTML = `
      <div class="case-eyebrow"><span class="dot"></span>${c.eyebrow}</div>
      <h2 class="case-title">${c.title[v]}</h2>
      <p class="case-tagline">${c.tagline[v]}</p>
      ${wowHtml}
      <button class="case-disclose" type="button" aria-expanded="false">
        <span class="case-disclose-text" data-collapsed="learn more →" data-expanded="less ↑">learn more →</span>
      </button>
      <div class="case-context">
        ${buildHtml}
        <div class="case-section">
          <div class="case-section-h">stack</div>
          <div class="case-stack">${stackHtml}</div>
        </div>
      </div>
    `;
    clearActiveTimers();
    overlay.classList.add("active");
    overlay.dataset.openCase = key;
    document.body.style.overflow = "hidden";
    overlayContent.classList.remove("context-expanded");
    overlayContent.classList.remove("playing");
    requestAnimationFrame(() => overlayContent.classList.add("playing"));

    const disc = overlayContent.querySelector(".case-disclose");
    const discText = disc?.querySelector(".case-disclose-text");
    disc?.addEventListener("click", () => {
      const expanded = overlayContent.classList.toggle("context-expanded");
      disc.setAttribute("aria-expanded", String(expanded));
      if (discText) discText.textContent = expanded ? discText.dataset.expanded : discText.dataset.collapsed;
    });

    // start receptionist call cycle
    const callCycle = overlayContent.querySelector(".wow-call-cycle");
    if (callCycle) startCallCycle(callCycle);

    // start ava active eval cycle
    const evalActive = overlayContent.querySelector(".wow-eval-active");
    if (evalActive) startEvalCycle(evalActive);

    // start backend ops cycle (control room ticker)
    const ops = overlayContent.querySelector(".wow-ops");
    if (ops) startOpsCycle(ops);
  }

  function closeCase() {
    clearActiveTimers();
    overlay.classList.remove("active");
    overlayContent.classList.remove("playing");
    overlayContent.classList.remove("context-expanded");
    delete overlay.dataset.openCase;
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".station").forEach((el) => {
    el.addEventListener("click", () => {
      const key = el.dataset.station;
      if (!key) return;
      if (key === "offer") { window.location.href = "/setter-bot"; return; }
      renderCase(key);
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const key = el.dataset.station;
        if (!key) return;
        if (key === "offer") { window.location.href = "/setter-bot"; return; }
        renderCase(key);
      }
    });
  });
  overlayClose?.addEventListener("click", closeCase);
  overlay?.addEventListener("click", (e) => { if (e.target === overlay) closeCase(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) closeCase();
  });

  voiceToggle?.addEventListener("click", () => {
    if (overlay.classList.contains("active") && overlay.dataset.openCase) {
      renderCase(overlay.dataset.openCase);
    }
  });

  console.log("%c thomasgoggin.com ", "background:#FFB800;color:#0a0d14;padding:6px 10px;font-family:monospace;font-weight:bold;font-size:12px");
  console.log("%c built late at night, in one sitting, on purpose. ", "color:#8a93a8;font-family:monospace;font-size:11px");
  console.log("%c ↓ press 'V' to flip the voice ↓ ", "color:#FFB800;font-family:monospace;font-size:11px");
})();
