/* ============================================================
   ♥  EDIT ME  ♥  — change the values below to personalise
   the whole site. Don't touch anything under the block.
   ============================================================ */
const CONFIG = {
  herName: "Vanshika",                          // ✏️ her name
  yourName: "P",                         // ✏️ your name (signs the letter)
  birthdayDate: "2026-11-10T11:30:00",        // ✏️ the big day: YYYY-MM-DDTHH:MM:SS

  letter: `Twenty-five looks exactly like you — luminous, warm, and impossible to look away from.

I planned every hour of this day, but the truth is, you're the gift. Thank you for saying yes to me, and yes to every ordinary Tuesday in between.

Happy birthday, my love. Here's to you — and to every birthday I get to plan from here on.`,

  itinerary: [
  { time: "11:30 AM", icon: "🎂", title: "Cake Cutting, At Home",
    note: "The day begins where the heart is — candles lit, everyone gathered around, and you cutting the first slice while the room sings slightly off-key." },
  { time: "12:30 PM", icon: "🥂", title: "Birthday Brunch",
    note: "Table reserved, glasses poured. A long, lazy brunch somewhere beautiful — because a girl turning twenty-five deserves to toast before noon." },
  { time: "3:30 PM", icon: "🚗", title: "The Long Drive (and a Surprise)",
    note: "Windows down, your playlist up, and a long drive wherever the road decides. Somewhere along the way… a little birthday fun I'm not telling you about yet." },
  { time: "8:00 PM", icon: "🕯️", title: "Candlelit Dinner",
    note: "The main event. A beautiful table, your favorite food, low lights, and a toast to the girl of the hour — dinner out, made entirely for you." },
  ],

  coupons: [
  { no: "01", title: "One Fancy Dinner Date",
    detail: "A candlelit dinner at any restaurant your heart names — dress up, pick the place, and the whole evening is on me, from the first toast to the last bite of dessert.",
    code: "DINNER·25·LOVE", fine: "valid forever · redeemable with one kiss" },
  { no: "02", title: "One Arcade Night",
    detail: "Air hockey, claw machines, racing games and zero mercy — tokens on me, bragging rights up for grabs, and the winner takes dessert.",
    code: "ARCADE·25·PLAY", fine: "no expiry · winner gets the last slice" },
  ],
};

/* ============================================================
   Everything below runs the site — no editing needed.
   ============================================================ */
const $ = s => document.querySelector(s);
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("js");

function ambient(){
  const box = $("#ambient"); if(!box || REDUCED) return;
  const colors = ["227,178,92","226,132,155","246,234,217"];
  for(let i=0;i<26;i++){
    const p = document.createElement("i"), s = (Math.random()*6+3).toFixed(1);
    p.className = "p";
    p.style.cssText = `left:${Math.random()*100}%;width:${s}px;height:${s}px;`+
      `background:rgba(${colors[i%3]},${(Math.random()*.35+.2).toFixed(2)});`+
      `--sway:${(Math.random()*120-60)|0}px;--o:${(Math.random()*.4+.25).toFixed(2)};`+
      `animation-duration:${(Math.random()*16+14).toFixed(1)}s;animation-delay:-${(Math.random()*20).toFixed(1)}s;`+
      `border-radius:${Math.random()>.5?"50%":"60% 40% 55% 45%"}`;
    box.appendChild(p);
  }
}

function burst(x,y){
  if(REDUCED) return;
  const colors = ["#e3b25c","#e2849b","#f6ead9","#f0d296"];
  for(let i=0;i<26;i++){
    const c = document.createElement("i"); c.className = "confetti";
    const a = Math.random()*Math.PI*2, d = Math.random()*140+60, sz = (Math.random()*6+5)|0;
    c.style.cssText = `left:${x}px;top:${y}px;width:${sz}px;height:${sz}px;background:${colors[i%4]};`+
      `--dx:${Math.cos(a)*d}px;--dy:${(Math.sin(a)*d-40)|0}px;--rot:${(Math.random()*540-270)|0}deg;`+
      `animation-duration:${(Math.random()*.5+.7).toFixed(2)}s;border-radius:${Math.random()>.5?"50%":"2px"}`;
    document.body.appendChild(c);
    c.addEventListener("animationend", () => c.remove());
  }
}

function scramble(el){
  const final = el.textContent;
  if(REDUCED){ el.textContent = final; return; }
  const glyphs = "AMORELUX✦♥*·";
  let f = 0, total = 26;
  const iv = setInterval(() => {
    f++;
    el.textContent = final.split("").map((c,i) =>
      c === " " ? " " : (i < f/total*final.length ? c : glyphs[(Math.random()*glyphs.length)|0])).join("");
    if(f >= total){ el.textContent = final; clearInterval(iv); }
  }, 42);
}

let cdTimer;
function startCountdown(){
  const dEl = $("#cdD"); if(!dEl) return;
  const target = new Date(CONFIG.birthdayDate).getTime();
  const pad = n => String(n).padStart(2,"0");
  function tick(){
    let t = target - Date.now();
    if(t <= 0){ $("#countdown").style.display = "none";
      $("#cdNote").textContent = "it's today — happy birthday, my love ✦";
      clearInterval(cdTimer); return; }
    const d = Math.floor(t/864e5); t%=864e5;
    const h = Math.floor(t/36e5);  t%=36e5;
    const m = Math.floor(t/6e4);   t%=6e4;
    const s = Math.floor(t/1e3);
    dEl.textContent = pad(d); $("#cdH").textContent = pad(h);
    $("#cdM").textContent = pad(m); $("#cdS").textContent = pad(s);
  }
  tick(); cdTimer = setInterval(tick, 1000);
}

function renderTimeline(){
  const tl = $("#timeline"); if(!tl) return;
  CONFIG.itinerary.forEach((ev,i) => {
    const item = document.createElement("div");
    item.className = "tl-item" + (i%2 ? " alt" : "");
    item.innerHTML = `
      <div class="tl-node"><span>${ev.icon || "✦"}</span></div>
      <div class="tl-card" data-n="${String(i+1).padStart(2,"0")}">
        <span class="tl-time">${ev.time}</span>
        <h3>${ev.title}</h3>
        <p>${ev.note}</p>
      </div>`;
    tl.appendChild(item);
  });
}

function markRedeemed(t, animate){
  t.classList.add("redeemed"); if(!animate) t.classList.add("no-anim");
  const btn = t.querySelector(".redeem");
  btn.textContent = "Redeemed ✓"; btn.disabled = true;
}

function renderCoupons(){
  const wrap = $("#coupons"); if(!wrap) return;
  CONFIG.coupons.forEach(c => {
    const w = document.createElement("div"); w.setAttribute("data-reveal","");
    w.innerHTML = `
      <article class="ticket" data-id="${c.no}">
        <div class="stub"><span class="stub-heart">♥</span><span class="stub-no">Nº ${c.no}</span><span class="stub-word">coupon</span></div>
        <div class="t-body">
          <p class="t-kicker">birthday coupon · no expiry</p>
          <h3 class="t-title">${c.title}</h3>
          <p class="t-detail">${c.detail}</p>
          <div class="t-row">
            <span class="t-code">CODE · ${c.code}</span>
            <button class="redeem" type="button">Redeem ♥</button>
          </div>
          <p class="t-fine">${c.fine}</p>
        </div>
        <div class="stamp" aria-hidden="true">REDEEMED ♥</div>
      </article>`;
    wrap.appendChild(w);
    const t = w.querySelector(".ticket");
    if(localStorage.getItem("redeemed-"+c.no)) markRedeemed(t, false);
  });
  wrap.querySelectorAll(".redeem").forEach(btn => btn.addEventListener("click", e => {
    const t = e.target.closest(".ticket");
    if(t.classList.contains("redeemed")) return;
    markRedeemed(t, true);
    localStorage.setItem("redeemed-"+t.dataset.id, "1");
    burst(e.clientX, e.clientY);
  }));
}

function observer(){
  const els = document.querySelectorAll("[data-reveal], .tl-item");
  if(!("IntersectionObserver" in window) || REDUCED){ els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver(es => es.forEach(en => {
    if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold:.15 });
  els.forEach(e => io.observe(e));
}

function tlProgress(){
  const tl = $("#timeline"), bar = $("#tlProgress"); if(!tl || !bar) return;
  let raf = null;
  function upd(){ raf = null;
    const r = tl.getBoundingClientRect();
    bar.style.height = Math.min(Math.max(innerHeight*.65 - r.top, 0), r.height) + "px"; }
  addEventListener("scroll", () => { if(!raf) raf = requestAnimationFrame(upd); }, {passive:true});
  addEventListener("resize", upd); upd();
}

function tilt(){
  if(REDUCED || !matchMedia("(pointer:fine)").matches) return;
  document.querySelectorAll(".ticket").forEach(t => {
    t.addEventListener("mousemove", e => {
      const r = t.getBoundingClientRect(),
            x = (e.clientX-r.left)/r.width-.5, y = (e.clientY-r.top)/r.height-.5;
      t.style.transform = `perspective(900px) rotateY(${(x*5).toFixed(2)}deg) rotateX(${(-y*5).toFixed(2)}deg)`;
    });
    t.addEventListener("mouseleave", () => { t.style.transform = ""; });
  });
}

function afterOpen(){
  startCountdown();
  const n = $("#herNameHero");
  if(n){ n.textContent = CONFIG.herName; scramble(n); }
  burst(innerWidth/2, innerHeight*.38);
}

function envelope(){
  const scene = $("#envelopeScene");
  if(!scene){ document.body.classList.add("opened"); afterOpen(); return; }
  const env = $("#envelope"); let opened = false;
  $("#seal").addEventListener("click", () => {
    if(opened) return; opened = true;
    env.classList.add("open");
    setTimeout(() => scene.classList.add("done"), 2050);
    setTimeout(() => { document.body.classList.add("opened"); afterOpen(); }, 2500);
    setTimeout(() => scene.remove(), 2950);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-yourname]").forEach(e => e.textContent = CONFIG.yourName);
  const envName = $("#envName"); if(envName) envName.textContent = CONFIG.herName;
  const heroName = $("#herNameHero"); if(heroName) heroName.textContent = CONFIG.herName;
  const d = $("#dateLine");
  if(d) d.textContent = new Date(CONFIG.birthdayDate).toLocaleDateString(undefined,
    { weekday:"long", year:"numeric", month:"long", day:"numeric" });
  const lt = $("#letterText"); if(lt) lt.textContent = CONFIG.letter;
  ambient(); renderTimeline(); renderCoupons();
  observer(); tlProgress(); tilt(); envelope();
  const reset = $("#resetCoupons");
  if(reset) reset.addEventListener("click", e => {
    e.preventDefault();
    Object.keys(localStorage).filter(k => k.startsWith("redeemed-")).forEach(k => localStorage.removeItem(k));
    location.reload();
  });
});
