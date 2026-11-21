"use client";

import { useEffect } from "react";

interface MotionState {
  phase: number;
  stride: number;
  time: number;
  wag: number;
  gazeX: number;
  gazeY: number;
  blink: number;
  ear: number;
}

interface Pose {
  bodyRot: number;
  bodyX: number;
  bodyY: number;
  stretch: number;
  headX: number;
  headY: number;
  headRot: number;
  earL: number;
  earR: number;
  tail: number;
  fn: number;
  ff: number;
  bn: number;
  bf: number;
  sit: number;
  eyes: number;
  happy: number;
  tongue: number;
  mouth: number;
  front: number;
}

const BASE_POSE: Pose = {
  bodyRot: 0,
  bodyX: 0,
  bodyY: 0,
  stretch: 1,
  headX: 0,
  headY: 0,
  headRot: 0,
  earL: 0,
  earR: 0,
  tail: 0,
  fn: 0,
  ff: 0,
  bn: 0,
  bf: 0,
  sit: 0,
  eyes: 1,
  happy: 0,
  tongue: 0,
  mouth: 0,
  front: 0,
};

const POSES: Record<string, Pose> = {
  stand: BASE_POSE,
  walk: { ...BASE_POSE, tail: -6, tongue: 1 },
  sit: { ...BASE_POSE, bodyRot: -24, bodyY: -2, headX: -10, headY: -6, tail: 34, sit: 1, tongue: 1 },
  peek: { ...BASE_POSE, headY: 4, earL: -6, earR: 6, tail: -20, front: 1, tongue: 1 },
  snug: { ...BASE_POSE, headY: 9, headRot: 4, earL: 3, earR: -3, tail: -20, front: 1, tongue: 0 },
  lie: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 12, headY: 40, headRot: 3, fn: -84, ff: -80, sit: 1, tail: 58, tongue: 0 },
  sleep: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 14, headY: 44, headRot: -8, fn: -84, ff: -80, sit: 1, tail: 64, eyes: 0, earL: 4, earR: -4 },
  settle: { ...BASE_POSE, bodyRot: -5, bodyY: 22, headX: 10, headY: 16, fn: -84, ff: -80, sit: 1, tail: 40, tongue: 1 },
  hop: { ...BASE_POSE, bodyRot: -9, stretch: 1.06, headY: -6, fn: -42, ff: -32, bn: 40, bf: 30, earL: -26, earR: 26, tail: -24, tongue: 1 },
  sniff: { ...BASE_POSE, bodyRot: 7, headX: 16, headY: 32, headRot: 9, tail: -14, fn: 6, ff: 4 },
  bow: { ...BASE_POSE, bodyRot: 15, bodyY: 2, headX: 14, headY: 30, fn: -58, ff: -52, tail: -32, happy: 1, tongue: 1 },
  beg: { ...BASE_POSE, bodyRot: -36, bodyY: -6, headX: -18, headY: -18, sit: 1, fn: -70, ff: -64, tail: 30, happy: 1, tongue: 1 },
};

const POSE_KEYS = Object.keys(BASE_POSE) as (keyof Pose)[];

const a = [196, 206];
const s = [212, 100];
const i = [186, 194];
const o = [168, 192];
const n = [110, 194];
const r = [94, 192];
const h = [84, 150];
const l = [174, 82];
const c = [250, 82];

const b = (t: number) => Math.round(100 * t) / 100;
const rotStr = (t: number, [e, a]: number[]) => `rotate(${b(t)} ${e} ${a})`;
const lerp = (t: number, e: number) => 1 - Math.exp(-t / e);
const clampVal = (t: number, min = -1, max = 1) => Math.max(min, Math.min(max, t));

function lerpPose(from: Pose, to: Pose, alpha: number): Pose {
  const res = { ...from };
  for (const k of POSE_KEYS) {
    res[k] = from[k] + (to[k] - from[k]) * alpha;
  }
  return res;
}

function resolveTransforms(t: Pose, e: MotionState) {
  const d = Math.sin(e.phase);
  const f = Math.sin(e.phase + Math.PI);
  const p = 20 + 10 * e.stride;
  const g = (1 - Math.cos(2 * e.phase)) / 2;
  const u = +(e.stride > 0.01);
  const m = Math.sin(2.4 * e.time) * (1 - u);
  const w = t.bodyY - g * (2.5 + 4 * e.stride) * u + 0.6 * m;
  const M = t.bodyRot + 1.6 * Math.sin(e.phase) * u;
  const k = -t.bodyRot;
  const j = 5 + 17 * e.wag;
  const v = 1.2 + 2.6 * e.wag;
  const tailRot = t.tail + Math.sin(e.time * v * Math.PI * 2) * j;
  const T = -((1 - Math.cos(2 * e.phase - 0.7)) / 2) * (2 + 3 * e.stride) * u + 0.9 * m;

  return {
    body: `translate(${b(t.bodyX)} ${b(w)}) ${rotStr(M, a)} translate(${a[0]} 0) scale(${b(t.stretch)} 1) translate(${-a[0]} 0)`,
    fn: `translate(${i[0]} ${i[1]}) rotate(${b(t.fn + k + d * p * u)})`,
    ff: `translate(${o[0]} ${o[1]}) rotate(${b(t.ff + k + f * p * u)})`,
    bn: `translate(${n[0]} ${n[1]}) rotate(${b(t.bn + f * p * u)})`,
    bf: `translate(${r[0]} ${r[1]}) rotate(${b(t.bf + d * p * u)})`,
    tail: rotStr(tailRot, h),
    haunch: `translate(0 ${b(-0.06 * t.bodyRot)})`,
    head: `translate(${b(t.headX)} ${b(t.headY + T)}) ${rotStr(t.headRot + 1.4 * Math.sin(e.phase) * u, s)}`,
    earL: rotStr(t.earL + e.ear + 4 * Math.sin(2 * e.phase) * u, l),
    earR: rotStr(t.earR - e.ear - 4 * Math.sin(2 * e.phase) * u, c),
    eyes: `translate(${b(3.4 * e.gazeX)} ${b(2.6 * e.gazeY)})`,
    blink: `translate(0 ${b(98 * e.blink * 0.92)}) scale(1 ${b(1 - 0.92 * e.blink)})`,
    openEyes: b(Math.max(0, t.eyes - t.happy)),
    happyEyes: b(Math.min(t.happy, t.eyes)),
    shutEyes: b(1 - t.eyes),
    tongue: b(t.tongue * (1 - t.mouth)),
    mouth: b(t.mouth),
    backLegs: b(1 - t.sit),
    haunchOpacity: b(t.sit * (1 - t.front)),
    side: b(1 - t.front),
    ledge: b(t.front),
    shadow: `translate(${b(0.6 * t.bodyX)} 0) scale(${b(1 - 0.05 * g * u)} 1)`,
    shadowOpacity: b(0.12 * (1 - t.front)),
  };
}

const ATTR_MAP: [string, string, string][] = [
  ["root", "transform", "root"],
  ["shadow", "transform", "shadow"],
  ["shadow", "opacity", "shadowOpacity"],
  ["body", "transform", "body"],
  ["body", "opacity", "side"],
  ["bf", "transform", "bf"],
  ["bf", "opacity", "backLegs"],
  ["ff", "transform", "ff"],
  ["tail", "transform", "tail"],
  ["bn", "transform", "bn"],
  ["bn", "opacity", "backLegs"],
  ["fn", "transform", "fn"],
  ["haunch", "transform", "haunch"],
  ["haunch", "opacity", "haunchOpacity"],
  ["head", "transform", "head"],
  ["earL", "transform", "earL"],
  ["earR", "transform", "earR"],
  ["eyes", "transform", "eyes"],
  ["open", "opacity", "openEyes"],
  ["blink", "transform", "blink"],
  ["happy", "opacity", "happyEyes"],
  ["shut", "opacity", "shutEyes"],
  ["tongue", "opacity", "tongue"],
  ["mouth", "opacity", "mouth"],
  ["ledge", "opacity", "ledge"],
];

function spawnHearts(container: HTMLElement, x: number, y: number) {
  for (let s = 0; s < 5; s++) {
    const heart = document.createElement("span");
    heart.className = "pup-heart";
    heart.textContent = "♥";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    container.append(heart);
    const offsetX = (Math.random() - 0.5) * 90;
    const offsetY = -70 - 60 * Math.random();
    heart
      .animate(
        [
          { transform: "translate(-50%, 0) scale(0.4)", opacity: 0 },
          { opacity: 1, offset: 0.2 },
          { transform: `translate(calc(-50% + ${offsetX.toFixed(0)}px), ${offsetY.toFixed(0)}px) scale(1.1)`, opacity: 0 },
        ],
        {
          duration: 1150 + 110 * s,
          delay: 80 * s,
          easing: "cubic-bezier(.2,.7,.3,1)",
          fill: "backwards",
        }
      )
      .finished.then(() => heart.remove(), () => heart.remove());
  }
}

class PupController {
  svg: SVGElement;
  container: HTMLElement;
  bubble: HTMLElement | null;
  els = new Map<string, SVGElement>();
  written = new Map<string, string>();
  m: MotionState = {
    phase: 0,
    stride: 0,
    time: 0,
    wag: 0.35,
    gazeX: 0,
    gazeY: 0,
    blink: 0,
    ear: 0,
  };
  strideTarget = 0;
  wagTarget = 0.35;
  gazeTarget = { x: 0, y: 0 };
  tilt = 0;
  tiltTarget = 0;
  earV = 0;
  nextBlink = 1.2;
  blinkAt = -1;
  woofUntil = 0;
  bounce = 0;
  bounceV = 0;
  offset = 0;
  offsetTarget = 0;
  pet = 0;
  petTarget = 0;
  turn = 0.07;
  lean = 0;
  facing: number;
  facingTarget: number;
  pose: Pose;
  target: Pose;
  restPose: Pose;
  queue: [number, (t: number) => void][] = [];
  lastTime = 0;
  idleTimer = 0;
  bubbleHideAt = 0;
  clickStreak = 0;
  lastClick = 0;

  constructor(container: HTMLElement, initialPoseName = "sit", facing = 1) {
    this.container = container;
    const svg = container.querySelector("svg");
    if (!svg) throw new Error("No SVG in pup-buddy");
    this.svg = svg;
    this.bubble = container.querySelector(".pup-bubble");

    this.facing = facing;
    this.facingTarget = facing;
    this.restPose = { ...(POSES[initialPoseName] || POSES.sit) };
    this.pose = { ...this.restPose };
    this.target = this.pose;

    svg.querySelectorAll("[data-p]").forEach((el) => {
      const p = (el as SVGElement).dataset.p;
      if (p) this.els.set(p, el as SVGElement);
    });

    this.wag(0.6);
  }

  setPose(p: Pose | string) {
    this.target = typeof p === "string" ? POSES[p] || POSES.sit : p;
  }

  wag(w: number) {
    this.wagTarget = clampVal(w, 0, 1);
  }

  cock(t: number) {
    this.tiltTarget = t;
  }

  hop(scale = 1) {
    this.bounceV = -230 * scale;
    this.earV += 200 * scale;
  }

  woof(t: number) {
    this.woofUntil = t + 0.34;
    this.bounceV = -150;
    this.earV += 260;
  }

  jolt(scale = 1) {
    this.earV += 220 * scale;
  }

  yawn(t: number, dur = 0.9) {
    this.woofUntil = t + dur;
  }

  dash(offset: number) {
    this.offsetTarget = offset;
  }

  face(f: number) {
    this.facingTarget = f;
    this.container.setAttribute("data-facing", f < 0 ? "left" : "right");
  }

  petting(isPet: boolean) {
    this.petTarget = isPet ? 1 : 0;
    this.wag(isPet ? 1 : 0.6);
  }

  say(msg: string, dur = 1.4) {
    if (!this.bubble) {
      let b = this.container.querySelector<HTMLElement>(".pup-bubble");
      if (!b) {
        b = document.createElement("span");
        b.className = "pup-bubble";
        b.setAttribute("aria-hidden", "true");
        this.container.appendChild(b);
      }
      this.bubble = b;
    }
    this.bubble.textContent = msg;
    this.bubble.dataset.show = "true";
    this.bubbleHideAt = performance.now() / 1000 + dur;
  }

  lookAt(point: { x: number; y: number } | null) {
    if (!point) {
      this.gazeTarget = { x: 0, y: 0 };
      return;
    }
    const rect = this.svg.getBoundingClientRect();
    const anchorX = this.facingTarget > 0 ? 212 : 300 - 212;
    const centerX = rect.left + (anchorX / 300) * rect.width;
    const centerY = rect.top + (98 / 240) * rect.height;
    const dx = point.x - centerX;
    const dy = point.y - centerY;
    const dist = Math.hypot(dx, dy) || 1;
    const norm = Math.min(1, dist / 160);

    this.gazeTarget = {
      x: (dx / dist) * norm * this.facingTarget,
      y: (dy / dist) * norm,
    };

    // Auto flip facing if cursor crosses horizontal threshold
    if (point.x < rect.left + rect.width * 0.3) {
      this.face(-1);
    } else if (point.x > rect.left + rect.width * 0.7) {
      this.face(1);
    }
  }

  playTrick(trickName: string, now: number) {
    const say = (t: string, d = 1.4) => this.say(t, d);
    const hearts = () => {
      const cx = this.container.clientWidth * (this.facingTarget > 0 ? 0.7 : 0.3);
      const cy = 0.25 * this.container.clientHeight;
      spawnHearts(this.container, cx, cy);
    };

    switch (trickName) {
      case "woof":
        this.queue.push(
          [now, (t) => { this.woof(t); say("woof!"); }],
          [now + 0.42, (t) => { this.woof(t); say("woof woof!"); }]
        );
        break;
      case "beg":
        this.queue.push(
          [now, () => { this.setPose("beg"); this.wag(1); say("treat, please?", 1.7); }],
          [now + 1.9, () => { this.setPose(this.restPose); this.wag(0.7); }]
        );
        break;
      case "bow":
        this.queue.push(
          [now, () => { this.setPose("bow"); this.wag(1); say("play with me!"); }],
          [now + 0.55, () => this.hop(0.45)],
          [now + 1.7, () => { this.setPose(this.restPose); this.wag(0.7); }]
        );
        break;
      case "hop":
        this.queue.push(
          [now, () => { this.setPose("hop"); this.hop(1.1); say("boing!"); }],
          [now + 0.36, () => this.setPose(this.restPose)],
          [now + 0.62, () => { this.setPose("hop"); this.hop(0.8); }],
          [now + 0.98, () => this.setPose(this.restPose)]
        );
        break;
      case "love":
        this.queue.push(
          [now, () => {
            this.setPose({ ...this.restPose, happy: 1, tongue: 1 });
            this.wag(1);
            hearts();
            say("I like you!", 1.5);
          }],
          [now + 1.9, () => { this.setPose(this.restPose); this.wag(0.7); }]
        );
        break;
      case "tilt":
        this.queue.push(
          [now, () => { this.cock(-14); say("hm?"); }],
          [now + 0.8, () => this.cock(12)],
          [now + 1.6, () => this.cock(0)]
        );
        break;
      case "sneeze":
        this.queue.push(
          [now, () => this.cock(-8)],
          [now + 0.32, (t) => {
            this.cock(10);
            this.jolt(1.4);
            this.hop(0.35);
            this.yawn(t, 0.22);
            say("achoo!");
          }],
          [now + 0.8, () => this.cock(0)]
        );
        break;
      case "zoomies":
        this.queue.push(
          [now, () => { this.setPose("walk"); this.wag(1); say("zoomies!", 2); }],
          [now + 0.05, () => { this.face(1); this.dash(70); }],
          [now + 0.5, () => { this.face(-1); this.dash(-70); }],
          [now + 0.98, () => { this.face(1); this.dash(50); }],
          [now + 1.4, () => { this.face(-1); this.dash(-30); }],
          [now + 1.78, () => { this.face(1); this.dash(0); }],
          [now + 2.25, () => { this.face(this.facingTarget); this.setPose(this.restPose); this.wag(0.7); }]
        );
        break;
      default:
        this.queue.push([now, () => { this.hop(0.6); say("woof!"); }]);
    }
  }

  handleClick() {
    const now = performance.now() / 1000;
    this.clickStreak = now - this.lastClick < 0.7 ? this.clickStreak + 1 : 1;
    this.lastClick = now;

    const tricks = ["woof", "beg", "bow", "hop", "love", "tilt", "sneeze"];
    const trick = this.clickStreak >= 4 ? "zoomies" : tricks[Math.floor(Math.random() * tricks.length)];
    this.queue = [];
    this.playTrick(trick, now);
    while (this.queue.length && this.queue[0][0] <= now) {
      const item = this.queue.shift();
      if (item) item[1](now);
    }
  }

  tick(dt: number, now: number) {
    dt = Math.min(dt, 0.05);
    const m = this.m;
    m.time = now;

    // Process queued actions
    while (this.queue.length && this.queue[0][0] <= now) {
      const item = this.queue.shift();
      if (item) item[1](now);
    }

    // Speech bubble auto hide
    if (this.bubble && this.bubble.dataset.show === "true" && now > this.bubbleHideAt) {
      this.bubble.dataset.show = "false";
    }

    // Natural random ambient actions
    if (!this.queue.length && now - this.idleTimer > 9) {
      this.idleTimer = now;
      if (Math.random() < 0.5) {
        this.playTrick("tilt", now);
      } else {
        this.wag(1);
        setTimeout(() => this.wag(0.6), 2200);
      }
    }

    // Physics smoothing
    this.pose = lerpPose(this.pose, this.target, lerp(dt, 0.16));
    this.facing += (this.facingTarget - this.facing) * lerp(dt, this.turn);
    m.stride += (this.strideTarget - m.stride) * lerp(dt, 0.12);
    if (m.stride < 0.012 && this.strideTarget === 0) m.stride = 0;
    m.wag += (this.wagTarget - m.wag) * lerp(dt, 0.4);
    m.gazeX += (this.gazeTarget.x - m.gazeX) * lerp(dt, 0.07);
    m.gazeY += (this.gazeTarget.y - m.gazeY) * lerp(dt, 0.07);
    this.tilt += (this.tiltTarget + 3 * m.gazeX - this.tilt) * lerp(dt, 0.18);
    this.earV += (-150 * m.ear - 10 * this.earV) * dt;
    m.ear = clampVal(m.ear + this.earV * dt, -28, 28);
    this.bounceV += (-260 * this.bounce - 16 * this.bounceV) * dt;
    this.bounce += this.bounceV * dt;

    const prevOffset = this.offset;
    this.offset += (this.offsetTarget - this.offset) * lerp(dt, 0.2);
    if (Math.abs(this.offsetTarget - this.offset) < 0.05) this.offset = this.offsetTarget;
    const dOffset = Math.abs(this.offset - prevOffset);
    if (dOffset) m.phase += (dOffset / 46) * Math.PI;

    this.pet += (this.petTarget - this.pet) * lerp(dt, 0.15);

    // Natural blink cycle
    if (now > this.nextBlink && this.pose.eyes > 0.6) {
      this.blinkAt = now;
      this.nextBlink = now + 2.2 + 3.8 * Math.random();
      if (Math.random() < 0.18) this.nextBlink = now + 0.32;
    }
    const blinkPhase = (now - this.blinkAt) / 0.15;
    m.blink = blinkPhase >= 0 && blinkPhase <= 1 ? Math.sin(blinkPhase * Math.PI) : 0;

    const effectivePose: Pose = {
      ...this.pose,
      headRot: this.pose.headRot + this.tilt,
      bodyRot: this.pose.bodyRot + this.lean,
      bodyY: this.pose.bodyY + this.bounce,
      headY: this.pose.headY + 1.15 * this.bounce,
      mouth: now < this.woofUntil ? 1 : this.pose.mouth,
      happy: Math.max(this.pose.happy, this.pet),
    };

    const resolved = resolveTransforms(effectivePose, m);
    const facingSign = Math.abs(this.facing) < 0.02 ? 0.02 * Math.sign(this.facing || 1) : this.facing;
    const rootTransform = `translate(${this.offset.toFixed(1)} 0) translate(${150} 0) scale(${facingSign.toFixed(3)} 1) translate(${-150} 0)`;

    for (const [part, attr, key] of ATTR_MAP) {
      const el = this.els.get(part);
      if (!el) continue;
      const val = key === "root" ? rootTransform : String((resolved as Record<string, string | number>)[key]);
      const cacheKey = `${part}:${attr}`;
      if (this.written.get(cacheKey) !== val) {
        el.setAttribute(attr, val);
        this.written.set(cacheKey, val);
      }
    }
  }
}

export default function PupBuddyManager() {
  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const controllers: PupController[] = [];
    const elements = document.querySelectorAll<HTMLElement>(".pup-buddy[data-live]");

    elements.forEach((container) => {
      const svg = container.querySelector("svg");
      if (!svg) return;

      // Determine initial pose
      let initialPose = "sit";
      const ariaLabel = (svg.getAttribute("aria-label") || "").toLowerCase();
      if (ariaLabel.includes("peeking") || container.closest(".tp-hero")) {
        initialPose = "peek";
      } else if (ariaLabel.includes("snug") || container.closest(".tp-footer")) {
        initialPose = "snug";
      } else if (container.closest(".tp-meet")) {
        initialPose = "sit";
      } else if (container.closest(".tp-paths")) {
        initialPose = "stand";
      }

      const initialFacing = container.getAttribute("data-facing") === "left" ? -1 : 1;
      try {
        const ctrl = new PupController(container, initialPose, initialFacing);
        controllers.push(ctrl);

        container.addEventListener("pointerenter", () => ctrl.petting(true));
        container.addEventListener("pointerleave", () => ctrl.petting(false));
        container.addEventListener("click", () => ctrl.handleClick());
      } catch (err) {
        console.warn("PupController init failed for element", err);
      }
    });

    let lastMouse: { x: number; y: number } | null = null;
    let lastMouseMove = 0;

    const onPointerMove = (e: PointerEvent) => {
      lastMouse = { x: e.clientX, y: e.clientY };
      lastMouseMove = performance.now() / 1000;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let rafId: number;
    let prev = performance.now() / 1000;

    const loop = () => {
      const now = performance.now() / 1000;
      const dt = now - prev;
      prev = now;

      const activeMouse = lastMouse && now - lastMouseMove < 3 ? lastMouse : null;

      controllers.forEach((ctrl) => {
        ctrl.lookAt(activeMouse);
        ctrl.tick(dt, now);
      });

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return null;
}
