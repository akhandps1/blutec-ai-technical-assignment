'use client';

import React, { useEffect, useRef } from 'react';
import PupBuddySVG from './PupBuddySVG';

// Center anchor & dimensions
const D = { x: 150, y: 228 };
const DEFAULT_BOX = [48, 30, 288, 236];
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (v: number) => v * v * (3 - 2 * v);
const rangeToSmooth = (min: number, max: number, val: number) =>
  max === min ? +(val >= max) : smoothstep(clamp01((val - min) / (max - min)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Point {
  x: number;
  y: number;
}

interface Track {
  kind: 'page' | 'pin' | 'screen';
  top: number;
  from?: number;
  to?: number;
}

interface Stop {
  x: number;
  track: Track;
  s: number;
  behind: boolean;
  sink: number;
  box: number[];
}

interface StopMeta {
  scene: HTMLElement | null;
  pose: string;
  facing: number;
  act: string;
  looks: HTMLElement[];
  track: HTMLElement | null;
}

interface JourneyData {
  lane: boolean;
  stops: Stop[];
  meta: StopMeta[];
  holds: number[][];
  blend: number;
  mainTop: number;
}

function getStopPoint(stop: Stop, scrollY: number): Point {
  const track = stop.track;
  const top =
    track.kind === 'page'
      ? track.top - scrollY
      : track.kind === 'screen'
      ? track.top
      : scrollY < (track.from ?? 0)
      ? track.top - (scrollY - (track.from ?? 0))
      : scrollY > (track.to ?? 0)
      ? track.top - (scrollY - (track.to ?? 0))
      : track.top;
  return {
    x: stop.x + D.x * stop.s,
    y: top + D.y * stop.s,
  };
}

function findSegment(holds: number[][], scrollY: number): { k: number; t: number } {
  if (!holds.length || scrollY <= holds[0][1]) return { k: 0, t: 0 };
  for (let i = 0; i < holds.length - 1; i++) {
    const s = holds[i][1];
    const n = holds[i + 1][0];
    if (scrollY < n) return { k: i, t: clamp01((scrollY - s) / Math.max(1, n - s)) };
    if (scrollY <= holds[i + 1][1]) return { k: i + 1, t: 0 };
  }
  return { k: holds.length - 1, t: 0 };
}

const softMax = (x: number, limit: number, a: number) => {
  const s = (x - limit) / a;
  return s > 20 ? x : limit + a * Math.log1p(Math.exp(s));
};
const softMin = (x: number, limit: number, a: number) => -softMax(-x, -limit, a);

function clampToSafeArea(
  x: number,
  y: number,
  scale: number,
  box: number[],
  safe: { left: number; top: number; right: number; bottom: number },
  margin = 8
): Point {
  const leftInset = (D.x - box[0]) * scale;
  const rightInset = (box[2] - D.x) * scale;
  const topInset = (D.y - box[1]) * scale;
  const bottomInset = (box[3] - D.y) * scale;

  const resX =
    safe.right - safe.left > leftInset + rightInset
      ? softMin(softMax(x, safe.left + leftInset, margin), safe.right - rightInset, margin)
      : (safe.left + safe.right) / 2 - (rightInset - leftInset) / 2;

  const resY =
    safe.bottom - safe.top > topInset + bottomInset
      ? softMin(softMax(y, safe.top + topInset, margin), safe.bottom - bottomInset, margin)
      : safe.bottom - bottomInset;

  return { x: resX, y: resY };
}

const lerpBox = (b1: number[], b2: number[], t: number) => [
  lerp(b1[0], b2[0], t),
  lerp(b1[1], b2[1], t),
  lerp(b1[2], b2[2], t),
  lerp(b1[3], b2[3], t),
];

const bezier3 = (p0: Point, c1: Point, c2: Point, p1: Point, t: number): Point => {
  const l = 1 - t;
  const l3 = l * l * l;
  const l2t = 3 * l * l * t;
  const lt2 = 3 * l * t * t;
  const t3 = t * t * t;
  return {
    x: l3 * p0.x + l2t * c1.x + lt2 * c2.x + t3 * p1.x,
    y: l3 * p0.y + l2t * c1.y + lt2 * c2.y + t3 * p1.y,
  };
};

const POSE_BOXES: Record<string, number[]> = {
  sit: [50, 26, 284, 234],
  peek: [148, 34, 280, 163],
  snug: [148, 40, 280, 163],
  bow: [58, 56, 292, 236],
};
const getPoseBox = (pose: string) => POSE_BOXES[pose] ?? DEFAULT_BOX;
const SINK_W = D.y - 159; // 69
const M_FACTORS = [0.6, 0.86];
const E_FACTORS = [0.42, 0.78];
const TRICK_NAMES = ['jump', 'woof', 'love', 'sneeze'];
const setDataset = (el: HTMLElement, key: string, val: string) => {
  if (el.dataset[key] !== val) el.dataset[key] = val;
};

const PAW_PATH =
  'M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z';

// Pose models from module 1063
export interface Pose {
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

export const BASE_POSE: Pose = {
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

export const POSES: Record<string, Pose> = {
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
const lerpPose = (p1: Pose, p2: Pose, t: number): Pose => {
  const res = { ...p1 };
  for (const k of POSE_KEYS) res[k] = p1[k] + (p2[k] - p1[k]) * t;
  return res;
};

// Points
const ptBody = [196, 206];
const ptHead = [212, 100];
const ptFN = [186, 194];
const ptFF = [168, 192];
const ptBN = [110, 194];
const ptBF = [94, 192];
const ptTail = [84, 150];
const ptEarL = [174, 82];
const ptEarR = [250, 82];

const round2 = (v: number) => Math.round(100 * v) / 100;
const rotStr = (deg: number, [cx, cy]: number[]) => 'rotate(' + round2(deg) + ' ' + cx + ' ' + cy + ')';

function solveTransforms(pose: Pose, m: { phase: number; stride: number; time: number; wag: number; gazeX: number; gazeY: number; blink: number; ear: number }) {
  const sinPhase = Math.sin(m.phase);
  const sinPhasePi = Math.sin(m.phase + Math.PI);
  const stepAmp = 20 + 10 * m.stride;
  const bounceFactor = (1 - Math.cos(2 * m.phase)) / 2;
  const isMoving = +(m.stride > 0.01);
  const breath = Math.sin(2.4 * m.time) * (1 - isMoving);
  const bodyY = pose.bodyY - bounceFactor * (2.5 + 4 * m.stride) * isMoving + 0.6 * breath;
  const bodyRot = pose.bodyRot + 1.6 * Math.sin(m.phase) * isMoving;
  const invBodyRot = -pose.bodyRot;
  const wagAmp = 5 + 17 * m.wag;
  const wagFreq = 1.2 + 2.6 * m.wag;
  const tailRot = pose.tail + Math.sin(m.time * wagFreq * Math.PI * 2) * wagAmp;
  const headBob = -((1 - Math.cos(2 * m.phase - 0.7)) / 2) * (2 + 3 * m.stride) * isMoving + 0.9 * breath;

  return {
    body: 'translate(' + round2(pose.bodyX) + ' ' + round2(bodyY) + ') ' + rotStr(bodyRot, ptBody) + ' translate(' + ptBody[0] + ' 0) scale(' + round2(pose.stretch) + ' 1) translate(' + (-ptBody[0]) + ' 0)',
    fn: 'translate(' + ptFN[0] + ' ' + ptFN[1] + ') rotate(' + round2(pose.fn + invBodyRot + sinPhase * stepAmp * isMoving) + ')',
    ff: 'translate(' + ptFF[0] + ' ' + ptFF[1] + ') rotate(' + round2(pose.ff + invBodyRot + sinPhasePi * stepAmp * isMoving) + ')',
    bn: 'translate(' + ptBN[0] + ' ' + ptBN[1] + ') rotate(' + round2(pose.bn + sinPhasePi * stepAmp * isMoving) + ')',
    bf: 'translate(' + ptBF[0] + ' ' + ptBF[1] + ') rotate(' + round2(pose.bf + sinPhase * stepAmp * isMoving) + ')',
    tail: rotStr(tailRot, ptTail),
    haunch: 'translate(0 ' + round2(-0.06 * pose.bodyRot) + ')',
    head: 'translate(' + round2(pose.headX) + ' ' + round2(pose.headY + headBob) + ') ' + rotStr(pose.headRot + 1.4 * Math.sin(m.phase) * isMoving, ptHead),
    earL: rotStr(pose.earL + m.ear + 4 * Math.sin(2 * m.phase) * isMoving, ptEarL),
    earR: rotStr(pose.earR - m.ear - 4 * Math.sin(2 * m.phase) * isMoving, ptEarR),
    eyes: 'translate(' + round2(3.4 * m.gazeX) + ' ' + round2(2.6 * m.gazeY) + ')',
    blink: 'translate(0 ' + round2(98 * m.blink * 0.92) + ') scale(1 ' + round2(1 - 0.92 * m.blink) + ')',
    openEyes: round2(Math.max(0, pose.eyes - pose.happy)),
    happyEyes: round2(Math.min(pose.happy, pose.eyes)),
    shutEyes: round2(1 - pose.eyes),
    tongue: round2(pose.tongue * (1 - pose.mouth)),
    mouth: round2(pose.mouth),
    backLegs: round2(1 - pose.sit),
    haunchOpacity: round2(pose.sit * (1 - pose.front)),
    side: round2(1 - pose.front),
    ledge: round2(pose.front),
    shadow: 'translate(' + round2(0.6 * pose.bodyX) + ' 0) scale(' + round2(1 - 0.05 * bounceFactor * isMoving) + ' 1)',
    shadowOpacity: round2(0.12 * (1 - pose.front)),
  };
}

const ATTR_MAP: [string, string, string][] = [
  ['root', 'transform', 'root'],
  ['shadow', 'transform', 'shadow'],
  ['shadow', 'opacity', 'shadowOpacity'],
  ['body', 'transform', 'body'],
  ['body', 'opacity', 'side'],
  ['bf', 'transform', 'bf'],
  ['bf', 'opacity', 'backLegs'],
  ['bn', 'transform', 'bn'],
  ['bn', 'opacity', 'backLegs'],
  ['ff', 'transform', 'ff'],
  ['fn', 'transform', 'fn'],
  ['tail', 'transform', 'tail'],
  ['haunch', 'transform', 'haunch'],
  ['haunch', 'opacity', 'haunchOpacity'],
  ['head', 'transform', 'head'],
  ['earL', 'transform', 'earL'],
  ['earR', 'transform', 'earR'],
  ['eyes', 'transform', 'eyes'],
  ['open', 'opacity', 'openEyes'],
  ['blink', 'transform', 'blink'],
  ['happy', 'opacity', 'happyEyes'],
  ['shut', 'opacity', 'shutEyes'],
  ['tongue', 'opacity', 'tongue'],
  ['mouth', 'opacity', 'mouth'],
  ['ledge', 'opacity', 'ledge'],
];

const expDecay = (dt: number, lambda: number) => 1 - Math.exp(-dt / lambda);
const clampRange = (v: number, min = -1, max = 1) => Math.max(min, Math.min(max, v));

export class JourneyPupController {
  svg: SVGElement;
  els = new Map<string, SVGElement>();
  written = new Map<string, string>();
  pose: Pose;
  target: Pose;
  m = { phase: 0, stride: 0, time: 0, wag: 0.35, gazeX: 0, gazeY: 0, blink: 0, ear: 0 };
  facing = 1;
  facingTarget = 1;
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

  constructor(svg: SVGElement, initialPose = 'sit', facing = 1) {
    this.svg = svg;
    svg.querySelectorAll('[data-p]').forEach((el) => {
      const p = (el as SVGElement).dataset.p;
      if (p) this.els.set(p, el as SVGElement);
    });
    this.pose = { ...(POSES[initialPose] ?? POSES.sit) };
    this.target = this.pose;
    this.facing = facing;
    this.facingTarget = facing;
  }

  setPose(p: string | Pose) {
    this.target = typeof p === 'string' ? POSES[p] ?? POSES.sit : p;
  }
  jump(poseName: string, facing?: number) {
    this.pose = { ...(POSES[poseName] ?? POSES.sit) };
    this.target = this.pose;
    if (facing) this.facing = this.facingTarget = facing;
  }
  face(f: number, turn = 0.07) {
    this.facingTarget = f;
    this.turn = turn;
  }
  get facingDir() {
    return this.facingTarget;
  }
  stride(s: number) {
    this.strideTarget = clampRange(s, 0, 1);
  }
  advance(dist: number) {
    this.m.phase += (dist / 46) * Math.PI;
  }
  walkedTo(w: number) {
    this.m.phase = (w / 46) * Math.PI;
  }
  wag(w: number) {
    this.wagTarget = clampRange(w, 0, 1);
  }
  cock(t: number) {
    this.tiltTarget = t;
  }
  lookAt(point: Point | null) {
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
  }
  woof(time: number) {
    this.woofUntil = time + 0.34;
    this.bounceV = -150;
    this.earV += 260;
  }
  jolt(scale = 1) {
    this.earV += 220 * scale;
  }
  hop(scale = 1) {
    this.bounceV = -230 * scale;
    this.earV += 200 * scale;
  }
  yawn(time: number, dur = 0.9) {
    this.woofUntil = time + dur;
  }
  dash(offset: number) {
    this.offsetTarget = offset;
  }
  petting(isPet: boolean) {
    this.petTarget = +isPet;
  }
  reset() {
    this.offsetTarget = 0;
    this.tiltTarget = 0;
    this.petTarget = 0;
  }
  tick(dt: number, time: number) {
    dt = Math.min(dt, 0.05);
    const m = this.m;
    m.time = time;
    this.pose = lerpPose(this.pose, this.target, expDecay(dt, 0.16));
    this.facing += (this.facingTarget - this.facing) * expDecay(dt, this.turn);
    m.stride += (this.strideTarget - m.stride) * expDecay(dt, 0.12);
    if (m.stride < 0.012 && this.strideTarget === 0) m.stride = 0;
    m.wag += (this.wagTarget - m.wag) * expDecay(dt, 0.4);
    m.gazeX += (this.gazeTarget.x - m.gazeX) * expDecay(dt, 0.07);
    m.gazeY += (this.gazeTarget.y - m.gazeY) * expDecay(dt, 0.07);
    this.tilt += (this.tiltTarget + 3 * m.gazeX - this.tilt) * expDecay(dt, 0.18);
    this.earV += (-150 * m.ear - 10 * this.earV) * dt;
    m.ear = clampRange(m.ear + this.earV * dt, -28, 28);
    this.bounceV += (-260 * this.bounce - 16 * this.bounceV) * dt;
    this.bounce += this.bounceV * dt;

    const prevOffset = this.offset;
    this.offset += (this.offsetTarget - this.offset) * expDecay(dt, 0.2);
    if (Math.abs(this.offsetTarget - this.offset) < 0.05) this.offset = this.offsetTarget;
    const diff = Math.abs(this.offset - prevOffset);
    if (diff) this.advance(diff);
    const speed = dt > 0 ? Math.min(1, diff / dt / 180) : 0;
    this.pet += (this.petTarget - this.pet) * expDecay(dt, 0.15);

    if (time > this.nextBlink && this.pose.eyes > 0.6) {
      this.blinkAt = time;
      this.nextBlink = time + 2.2 + 3.8 * Math.random();
      if (Math.random() < 0.18) this.nextBlink = time + 0.32;
    }
    const blinkPhase = (time - this.blinkAt) / 0.15;
    m.blink = blinkPhase >= 0 && blinkPhase <= 1 ? Math.sin(blinkPhase * Math.PI) : 0;

    const effPose: Pose = {
      ...this.pose,
      headRot: this.pose.headRot + this.tilt,
      bodyRot: this.pose.bodyRot + this.lean,
      bodyY: this.pose.bodyY + this.bounce,
      headY: this.pose.headY + 1.15 * this.bounce,
      mouth: time < this.woofUntil ? 1 : this.pose.mouth,
      happy: Math.max(this.pose.happy, this.pet),
    };

    const resolved = solveTransforms(effPose, speed > m.stride ? { ...m, stride: speed } : m);
    const facingSign = Math.abs(this.facing) < 0.02 ? 0.02 * Math.sign(this.facing || 1) : this.facing;
    const rootTransform = 'translate(' + this.offset.toFixed(1) + ' 0) translate(150 0) scale(' + facingSign.toFixed(3) + ' 1) translate(-150 0)';

    for (const [part, attr, key] of ATTR_MAP) {
      const el = this.els.get(part);
      if (!el) continue;
      const val = key === 'root' ? rootTransform : String((resolved as Record<string, string | number>)[key]);
      const cacheKey = part + ':' + attr;
      if (this.written.get(cacheKey) !== val) {
        el.setAttribute(attr, val);
        this.written.set(cacheKey, val);
      }
    }
  }
}

// Trick scheduler
const TRICKS: Record<string, (ctx: { d: JourneyPupController; rest: Pose; facing: number; say: (msg: string, dur?: number) => void; hearts: () => void }, now: number) => [number, (t?: number) => void][]> = {
  woof: ({ d, say }, now) => [
    [now, (t) => { d.woof(t ?? now); say('woof!'); }],
    [now + 0.42, (t) => { d.woof(t ?? now); say('woof woof!'); }],
  ],
  spin: ({ d, rest, facing, say }, now) => [
    [now, () => { d.setPose('stand'); d.hop(0.5); }],
    [now + 0.14, () => d.face(facing === 1 ? -1 : 1)],
    [now + 0.38, () => d.face(facing)],
    [now + 0.62, () => d.face(facing === 1 ? -1 : 1)],
    [now + 0.86, () => { d.face(facing); say('wheee!'); }],
    [now + 1.3, () => d.setPose(rest)],
  ],
  beg: ({ d, rest, say }, now) => [
    [now, () => { d.setPose('beg'); d.wag(1); say('treat, please?', 1.7); }],
    [now + 1.9, () => { d.setPose(rest); d.wag(0.7); }],
  ],
  bow: ({ d, rest, say }, now) => [
    [now, () => { d.setPose('bow'); d.wag(1); say('play with me!'); }],
    [now + 0.55, () => d.hop(0.45)],
    [now + 1.7, () => { d.setPose(rest); d.wag(0.7); }],
  ],
  hop: ({ d, rest, say }, now) => [
    [now, () => { d.setPose('hop'); d.hop(1.1); say('boing!'); }],
    [now + 0.36, () => d.setPose(rest)],
    [now + 0.62, () => { d.setPose('hop'); d.hop(0.8); }],
    [now + 0.98, () => d.setPose(rest)],
  ],
  love: ({ d, rest, say, hearts }, now) => [
    [now, () => { d.setPose({ ...rest, happy: 1, tongue: 1 }); d.wag(1); hearts(); say('I like you!', 1.5); }],
    [now + 1.9, () => { d.setPose(rest); d.wag(0.7); }],
  ],
  tilt: ({ d, say }, now) => [
    [now, () => { d.cock(-14); say('hm?'); }],
    [now + 0.8, () => d.cock(12)],
    [now + 1.6, () => d.cock(0)],
  ],
  sneeze: ({ d, say }, now) => [
    [now, () => d.cock(-8)],
    [now + 0.32, (t) => { d.cock(10); d.jolt(1.4); d.hop(0.35); d.yawn(t ?? now, 0.22); say('achoo!'); }],
    [now + 0.8, () => d.cock(0)],
  ],
  zoomies: ({ d, rest, facing, say }, now) => [
    [now, () => { d.setPose('walk'); d.wag(1); say('zoomies!', 2); }],
    [now + 0.05, () => { d.face(1); d.dash(70); }],
    [now + 0.5, () => { d.face(-1); d.dash(-70); }],
    [now + 0.98, () => { d.face(1); d.dash(50); }],
    [now + 1.4, () => { d.face(-1); d.dash(-30); }],
    [now + 1.78, () => { d.face(1); d.dash(0); }],
    [now + 2.25, () => { d.face(facing); d.setPose(rest); d.wag(0.7); }],
  ],
  peekaboo: ({ d, say }, now) => [
    [now, () => d.setPose({ ...POSES.peek, headY: 120 })],
    [now + 0.55, () => { d.setPose('peek'); d.jolt(1.2); say('peekaboo!'); }],
  ],
};

function spawnHearts(container: HTMLElement, x: number, y: number) {
  for (let r = 0; r < 5; r++) {
    const heart = document.createElement('span');
    heart.className = 'pup-heart';
    heart.textContent = '♥';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    container.append(heart);
    const offsetX = (Math.random() - 0.5) * 90;
    const offsetY = -70 - 60 * Math.random();
    heart
      .animate(
        [
          { transform: 'translate(-50%, 0) scale(0.4)', opacity: 0 },
          { opacity: 1, offset: 0.2 },
          { transform: 'translate(calc(-50% + ' + offsetX.toFixed(0) + 'px), ' + offsetY.toFixed(0) + 'px) scale(1.1)', opacity: 0 },
        ],
        {
          duration: 1150 + 110 * r,
          delay: 80 * r,
          easing: 'cubic-bezier(.2,.7,.3,1)',
          fill: 'backwards',
        }
      )
      .finished.then(() => heart.remove(), () => heart.remove());
  }
}

// Global cue helper
export function cuePup(detail: { say?: string; look?: HTMLElement; secs?: number }) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('pup:cue', { detail }));
  }
}

let activeCleanup: (() => void) | null = null;

export default function PupJourney() {
  const layerRef = useRef<HTMLDivElement>(null);
  const actorRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const bubbleAtRef = useRef<HTMLSpanElement>(null);
  const printsRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeCleanup?.();

    const layer = layerRef.current;
    const actor = actorRef.current;
    const body = bodyRef.current;
    const bubble = bubbleRef.current;
    const bubbleAt = bubbleAtRef.current;
    const prints = printsRef.current;
    const probe = probeRef.current;
    if (!layer || !actor || !body || !bubble || !bubbleAt || !prints || !probe) return;

    const svg = body.querySelector('svg');
    if (!svg) return;

    const htmlEl = document.documentElement;
    let journeyData: JourneyData | null = null;
    let pupCtrl: JourneyPupController | null = null;
    let isRunning = false;
    const pawPads = Array.from(prints.children) as SVGElement[];
    let pawIndex = 0;
    let bubbleHideTime = 0;

    const showBubble = (text: string, now: number, dur = 1.4) => {
      bubble.textContent = text;
      bubble.dataset.show = 'true';
      bubbleHideTime = now + dur;
    };

    let mousePoint: { x: number; y: number; t: number } | null = null;
    let focusTarget: { el: HTMLElement; until: number } | null = null;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        mousePoint = { x: e.clientX, y: e.clientY, t: performance.now() / 1000 };
      }
    };

    const onPupCue = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const currentScene = currentStopIdx >= 0 ? journeyData?.meta[currentStopIdx]?.scene : null;
      if (!currentScene || (detail.look && !currentScene.contains(detail.look))) return;
      const now = performance.now() / 1000;
      if (detail.look) {
        focusTarget = { el: detail.look, until: now + (detail.secs ?? 1.6) };
      }
      if (detail.say) showBubble(detail.say, now);
    };

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target;
      if (t instanceof HTMLElement && t.matches('a, button, input, textarea, select, summary')) {
        focusTarget = { el: t, until: performance.now() / 1000 + 1.4 };
      }
    };

    let prevTime = performance.now() / 1000;
    let prevScrollY = window.scrollY;
    let lastPos: Point | null = null;
    let currentInterp: { x: number; y: number; s: number; k: number; t: number; front: boolean; airborne: boolean; walked: number } | null = null;
    const smoothOffset = { x: 0, y: 0, s: 0 };
    let stationaryTimer = 0;
    let currentStopIdx = -1;
    let stopEnterTime = 0;
    let lastInteractionTime = 0;
    let queue: [number, (t?: number) => void][] = [];
    let lookCycleTimer = 0;
    let lookIdx = -1;
    let treadmillPrevLeft: number | null = null;
    let treadmillIdleTimer = 0;
    let lastPawK = -1;
    let lastPawStep = 0;
    let nextAmbientBasketTime = 0;
    let lastScrollMotionTime = performance.now() / 1000;
    let scrollDirection = 1;
    let wasResting = false;
    let laneInterp: Point | null = null;
    let prevLaneAnchorY = 0;
    let laneAccumWalked = 0;
    let laneAnchorTop = 0;

    const getBottomBarTop = () => {
      const bar = document.querySelector('[data-whatsapp-bar]');
      const rect = bar?.getClientRects().length ? bar.getBoundingClientRect() : null;
      return rect && rect.height ? rect.top : window.innerHeight - 6;
    };

    const siteHeader = document.getElementById('site-header');

    // Build geometry and stops
    const buildJourney = (probeEl: HTMLElement): JourneyData => {
      const isMobile = window.matchMedia('(max-width: 767px), (pointer: coarse) and (max-height: 519px)').matches;
      const clientWidth = document.documentElement.clientWidth;
      const screenH = probeEl.getBoundingClientRect().height || window.innerHeight;
      const headerH = siteHeader?.offsetHeight ?? 76;
      const bar = document.querySelector('[data-whatsapp-bar]');
      const safeArea = {
        left: 10,
        top: headerH + 10,
        right: clientWidth - 10,
        bottom: screenH - 10 - (bar?.getClientRects().length ? bar.getBoundingClientRect().height : 0),
      };
      const mainEl = document.getElementById('main');
      const stops: Stop[] = [];
      const meta: StopMeta[] = [];
      const holdsRaw: number[][] = [];

      const addStopEl = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        const pose = el.dataset.pose || 'sit';
        const act = el.dataset.act ?? '';
        const baseScale = rect.width / 300;
        const scale = act === 'basket' || isMobile ? baseScale : 1.12 * baseScale;
        const center = pose === 'peek' ? { x: D.x, y: 159 } : D;

        // Track calculation
        let stickyParent: HTMLElement | null = null;
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          if (getComputedStyle(p).position === 'sticky') {
            stickyParent = p;
            break;
          }
        }

        let track: Track;
        if (!stickyParent) {
          track = { kind: 'page', top: rect.top + window.scrollY };
        } else {
          const stickyTop = parseFloat(getComputedStyle(stickyParent).top) || 0;
          const relTop = rect.top - stickyParent.getBoundingClientRect().top;
          const prevPosition = stickyParent.style.position;
          stickyParent.style.position = 'relative';
          const stickyRect = stickyParent.getBoundingClientRect();
          const parent = stickyParent.parentElement!;
          const parentBottom = parent.getBoundingClientRect().bottom - (parseFloat(getComputedStyle(parent).paddingBottom) || 0);
          stickyParent.style.position = prevPosition;

          const from = stickyRect.top + window.scrollY - stickyTop;
          const to = parentBottom + window.scrollY - stickyRect.height - stickyTop;
          track = to <= from ? { kind: 'page', top: stickyRect.top + window.scrollY + relTop } : { kind: 'pin', top: stickyTop + relTop, from, to };
        }

        if (track.kind !== 'screen') {
          track.top += center.y * (baseScale - scale);
        }

        const stop: Stop = {
          x: rect.left + center.x * (baseScale - scale),
          track,
          s: scale,
          behind: el.dataset.behind === 'true',
          sink: 0,
          box: getPoseBox(pose),
        };

        const scene = el.closest<HTMLElement>('[data-pup-scene]');
        stops.push(stop);
        meta.push({
          scene,
          pose,
          facing: el.dataset.facing === 'left' ? -1 : 1,
          act,
          looks: scene ? Array.from(scene.querySelectorAll<HTMLElement>('[data-pup-look]')) : [],
          track: act === 'treadmill' ? scene?.querySelector<HTMLElement>('[data-treadmill]') ?? null : null,
        });

        // Compute hold range for this stop
        let holdRange: number[];
        if (stop.track.kind === 'pin') {
          holdRange = [stop.track.from!, stop.track.to!];
        } else {
          const top = stop.track.top;
          const y0 = top + stop.box[1] * stop.s;
          const y1 = top + stop.box[3] * stop.s;
          const centerY = (y0 + y1) / 2;
          const safeH = safeArea.bottom - safeArea.top;
          const factors = isMobile ? M_FACTORS : E_FACTORS;
          let h0 = centerY - (safeArea.top + factors[1] * safeH);
          let h1 = centerY - (safeArea.top + factors[0] * safeH);
          h0 = Math.max(h0, y1 - safeArea.bottom);
          if (h0 > (h1 = Math.min(h1, y0 - safeArea.top))) {
            h0 = h1 = centerY - (safeArea.top + safeH / 2);
          }
          holdRange = [h0, h1];
        }

        if (!isMobile && scene && stop.track.kind === 'page' && act !== 'basket' && act !== 'peekaboo') {
          const safeH = safeArea.bottom - safeArea.top;
          const sceneTop = scene.getBoundingClientRect().top + window.scrollY - safeArea.top + 0.08 * safeH;
          const stopBottom = stop.track.top + stop.box[3] * stop.s - safeArea.bottom;
          if (holdRange[1] > sceneTop) {
            const maxScene = Math.max(sceneTop, stopBottom + 0.12 * safeH);
            holdRange = [Math.max(stopBottom, maxScene - Math.max(holdRange[1] - holdRange[0], 0.2 * safeH)), maxScene];
          }
        }
        holdsRaw.push(holdRange);
      };

      const stopEls = Array.from(document.querySelectorAll<HTMLElement>('[data-pup-stop]')).filter((e) => e.getClientRects().length);

      if (isMobile) {
        const laneStops = stopEls.filter((e) => e.dataset.lane === 'true');
        const first = laneStops[0];
        const last = laneStops.length > 1 ? laneStops[laneStops.length - 1] : undefined;
        if (first) addStopEl(first);

        const firstScene = meta[0]?.scene ?? null;
        const scenes = Array.from(document.querySelectorAll<HTMLElement>('#main [data-pup-scene]')).filter(
          (e) => e !== firstScene && e.getClientRects().length
        );
        const scale = Math.min(0.62, Math.max(0.5, clientWidth / 650));
        const peekBox = getPoseBox('peek');

        scenes.forEach((sc, idx) => {
          const isEven = idx % 2 === 0;
          const posX = isEven ? safeArea.left + 2 - peekBox[0] * scale : safeArea.right - 2 - peekBox[2] * scale;
          stops.push({
            x: posX,
            track: { kind: 'screen', top: 0 },
            s: scale,
            behind: false,
            sink: SINK_W,
            box: peekBox,
          });
          meta.push({
            scene: sc,
            pose: 'peek',
            facing: isEven ? 1 : -1,
            act: 'lane',
            looks: [],
            track: null,
          });
          const scRect = sc.getBoundingClientRect();
          const h0 = scRect.top + window.scrollY - 0.42 * screenH;
          const h1 = scRect.bottom + window.scrollY - 0.58 * screenH;
          holdsRaw.push(h0 <= h1 ? [h0, h1] : [(h0 + h1) / 2, (h0 + h1) / 2]);
        });

        if (last) addStopEl(last);
      } else {
        stopEls.forEach(addStopEl);
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Adjust holds so they do not overlap
      const computeHolds = (raw: number[][], dists: number[], maxSc: number) => {
        const ranges = raw.map((r) => (r[0] <= r[1] ? [r[0], r[1]] : [(r[0] + r[1]) / 2, (r[0] + r[1]) / 2]));
        if (!ranges.length) return ranges;
        ranges[0][0] = -Infinity;
        const last = ranges[ranges.length - 1];
        last[1] = Infinity;
        last[0] = Math.min(last[0], maxSc - 1);

        for (let i = 0; i < ranges.length - 1; i++) {
          const r1 = ranges[i];
          const r2 = ranges[i + 1];
          if (r2[0] < r1[1]) {
            const mid = (r1[1] + r2[0]) / 2;
            r1[1] = Math.max(r1[0], mid);
            r2[0] = Math.min(r2[1], mid);
            if (r2[0] < r1[1]) r2[0] = r1[1];
          }
          let gap = dists[i] - (r2[0] - r1[1]);
          if (gap > 0) {
            const d1 = Math.min(gap / 2, r1[1] - r1[0]);
            const d2 = Math.min(gap / 2, r2[1] - r2[0]);
            r1[1] -= d1;
            r2[0] += d2;
            const rem = Math.min((gap -= d1 + d2), r2[1] - r2[0]);
            r2[0] += rem;
            if ((gap -= rem) > 0) {
              r1[1] -= Math.min(gap, r1[1] - r1[0]);
            }
          }
        }
        for (const r of ranges) {
          if (r[1] < r[0]) r[1] = r[0];
        }
        return ranges;
      };

      const segDists = stops.slice(1).map((curr, idx) => {
        const prev = stops[idx];
        const vSpan = (E_FACTORS[1] - E_FACTORS[0]) * screenH;
        const minSpan = (isMobile ? 0.32 : 0.5) * screenH;
        return Math.min(1.4 * screenH, Math.max(minSpan, 1.15 * Math.hypot(Math.abs(curr.x + D.x * curr.s - (prev.x + D.x * prev.s)), vSpan)));
      });

      return {
        lane: isMobile,
        stops,
        meta,
        holds: computeHolds(holdsRaw, segDists, maxScroll),
        blend: 0.12 * screenH,
        mainTop: mainEl ? mainEl.getBoundingClientRect().top + window.scrollY : 0,
      };
    };

    // Interpolation along trajectory
    const evaluatePosition = (journey: JourneyData, scrollY: number) => {
      if (journey.lane) {
        const bot = getBottomBarTop();
        for (const s of journey.stops) {
          if (s.track.kind === 'screen') s.track.top = bot - 159 * s.s;
        }
      }

      const clientW = htmlEl.clientWidth;
      const topOffset = (siteHeader?.offsetHeight ?? 76) + 10;
      let safeArea: { left: number; top: number; right: number; bottom: number };
      if (journey.lane) {
        safeArea = { left: 10, top: topOffset, right: clientW - 10, bottom: getBottomBarTop() + 40 };
      } else {
        const bar = document.querySelector('[data-whatsapp-bar]');
        const barTop = bar?.getClientRects().length ? bar.getBoundingClientRect().top : window.innerHeight;
        safeArea = { left: 10, top: topOffset, right: clientW - 10, bottom: Math.min(window.innerHeight, barTop) - 10 };
      }

      const { k, t } = findSegment(journey.holds, scrollY);
      if (t <= 0 || k >= journey.stops.length - 1) {
        const curr = journey.stops[k];
        const pt = getStopPoint(curr, scrollY);
        const clamped = clampToSafeArea(pt.x, pt.y, curr.s, curr.box, safeArea);
        return {
          x: clamped.x,
          y: clamped.y,
          s: curr.s,
          front: !curr.behind,
          airborne: false,
          k,
          t: 0,
          walked: 0,
        };
      }

      const s0 = journey.stops[k];
      const s1 = journey.stops[k + 1];
      const holdEnd0 = journey.holds[k][1];
      const holdStart1 = journey.holds[k + 1][0];
      const span = Math.max(1, holdStart1 - holdEnd0);
      const v = clamp01((scrollY - holdEnd0) / span);
      const p0 = getStopPoint(s0, holdEnd0);
      const p1 = getStopPoint(s1, holdStart1);

      // Control points
      const dx = p1.x - p0.x;
      const safeWidth = safeArea.right - safeArea.left;
      const arm = Math.max(0.45 * Math.abs(dx), 0);
      const dir = dx >= 0 ? 1 : -1;
      let c1: Point = { x: p0.x + dir * arm, y: p0.y - s0.sink * s0.s };
      let c2: Point = { x: p1.x - dir * arm, y: p1.y - s1.sink * s1.s };
      const minDx = 0.14 * safeWidth;
      if (Math.abs(dx) < minDx) {
        const sideOffset = ((p0.x + p1.x) / 2 < (safeArea.left + safeArea.right) / 2 ? 1 : -1) * (minDx - Math.abs(dx)) * 0.9;
        c1 = { x: c1.x + sideOffset, y: lerp(p0.y, p1.y, 0.2) };
        c2 = { x: c2.x + sideOffset, y: lerp(p0.y, p1.y, 0.8) };
      }
      const clampPt = (pt: Point) => ({
        x: Math.min(safeArea.right, Math.max(safeArea.left, pt.x)),
        y: Math.min(safeArea.bottom, Math.max(safeArea.top, pt.y)),
      });
      c1 = clampPt(c1);
      c2 = clampPt(c2);

      const smoothV = v * v * v * (v * (6 * v - 15) + 10);
      const bezierPt = bezier3({ x: p0.x, y: p0.y - s0.sink * s0.s }, c1, c2, { x: p1.x, y: p1.y - s1.sink * s1.s }, smoothV);
      const scale = lerp(s0.s, s1.s, smoothstep(clamp01(v / 0.65)));

      const blendRange = Math.min(0.3, Math.max(0.06, journey.blend / span));
      const blend0 = 1 - rangeToSmooth(0, blendRange, v);
      const blend1 = rangeToSmooth(1 - blendRange, 1, v);

      const posY = bezierPt.y + blend0 * (getStopPoint(s0, scrollY).y - p0.y) + blend1 * (getStopPoint(s1, scrollY).y - p1.y)
        + s0.sink * s0.s * (1 - rangeToSmooth(0, 0.22, v)) + s1.sink * s1.s * rangeToSmooth(0.78, 1, v);
      const posX = bezierPt.x;

      let airborne = false;
      if (s0.behind && v < 0.36) {
        airborne = v < 0.32;
      }
      if (s1.behind && v > 0.68) {
        airborne = true;
      }
      if (s0.sink && v < 0.2) airborne = true;

      const front = !(s0.behind && v < 0.12 || s1.behind && v > 0.92);

      const boxInterp =
        v < 0.5
          ? lerpBox(s0.box, DEFAULT_BOX, rangeToSmooth(0, s0.sink ? 0.22 : s0.behind ? 0.36 : 0.06, v))
          : lerpBox(DEFAULT_BOX, s1.box, rangeToSmooth(s1.sink ? 0.78 : s1.behind ? 0.68 : 0.94, 1, v));

      const clamped = clampToSafeArea(posX, posY, scale, boxInterp, safeArea);

      // Distance walked along curve
      let walked = 0;
      let prevPt = { x: p0.x, y: p0.y - s0.sink * s0.s };
      const steps = Math.max(1, Math.ceil(32 * clamp01(smoothV)));
      for (let s = 1; s <= steps; s++) {
        const pt = bezier3({ x: p0.x, y: p0.y - s0.sink * s0.s }, c1, c2, { x: p1.x, y: p1.y - s1.sink * s1.s }, (s / steps) * clamp01(smoothV));
        walked += Math.hypot(pt.x - prevPt.x, pt.y - prevPt.y);
        prevPt = pt;
      }

      return {
        x: clamped.x,
        y: clamped.y,
        s: scale,
        front,
        airborne,
        k,
        t: v,
        walked,
      };
    };

    // Frame update loop
    let rafId: number;

    const tick = () => {
      if (!journeyData || !pupCtrl) return;
      const now = performance.now() / 1000;
      const dt = Math.min(0.05, now - prevTime);
      prevTime = now;

      const scrollY = window.scrollY;
      const scrollDelta = scrollY - prevScrollY;
      prevScrollY = scrollY;
      if (Math.abs(scrollDelta) > 0.5) {
        lastScrollMotionTime = now;
        scrollDirection = scrollDelta > 0 ? 1 : -1;
      }

      // Process trick queue
      while (queue.length && queue[0][0] <= now) {
        const item = queue.shift();
        if (item) item[1](now);
      }

      // Resting snap logic when stationary
      const effectiveScrollY =
        now - lastScrollMotionTime > 0.25
          ? (() => {
              const { k: s, t: n } = findSegment(journeyData.holds, scrollY);
              if (n <= 0 || s >= journeyData.stops.length - 1) return scrollY;
              const l = journeyData.stops[s];
              const r = journeyData.stops[s + 1];
              const minThreshold = l.sink ? 0.22 : 0.36 * +l.behind;
              const maxThreshold = r.sink ? 0.78 : r.behind ? 0.68 : 1;
              let d = n;
              if (n < minThreshold) d = n < minThreshold / 2 ? 0 : minThreshold;
              else if (n > maxThreshold) d = n > (1 + maxThreshold) / 2 ? 1 : maxThreshold;
              return d === n ? scrollY : journeyData.holds[s][1] + d * (journeyData.holds[s + 1][0] - journeyData.holds[s][1]);
            })()
          : scrollY;

      const pos = evaluatePosition(journeyData, effectiveScrollY);
      const isScreenTrack =
        journeyData.lane &&
        journeyData.stops[pos.k]?.track.kind === 'screen' &&
        (pos.t > 0 ? journeyData.stops[pos.k + 1] : journeyData.stops[pos.k])?.track.kind === 'screen';

      const decayFactor = Math.exp(-dt / 0.28);
      smoothOffset.x *= decayFactor;
      smoothOffset.y *= decayFactor;
      smoothOffset.s *= decayFactor;
      if (Math.abs(smoothOffset.x) < 0.05 && Math.abs(smoothOffset.y) < 0.05) {
        smoothOffset.x = smoothOffset.y = 0;
      }

      const isSnapping = effectiveScrollY !== scrollY;
      if (isSnapping !== wasResting && lastPos && !isScreenTrack) {
        smoothOffset.x = lastPos.x - pos.x;
        smoothOffset.y = lastPos.y - pos.y;
      }
      wasResting = isSnapping;

      const currentScale = pos.s + smoothOffset.s;
      let posX = pos.x + smoothOffset.x;
      let posY = pos.y + smoothOffset.y;
      const bottomBarTop = journeyData.lane ? getBottomBarTop() : 0;
      let isSettled = true;

      if (isScreenTrack) {
        if (!laneInterp) {
          laneInterp = lastPos ? { x: lastPos.x, y: lastPos.y - prevLaneAnchorY } : { x: posX, y: posY - bottomBarTop };
        }
        const alpha = 1 - Math.exp(-dt / 0.14);
        laneInterp.x += (posX - laneInterp.x) * alpha;
        laneInterp.y += (posY - bottomBarTop - laneInterp.y) * alpha;
        isSettled = Math.hypot(posX - laneInterp.x, posY - bottomBarTop - laneInterp.y) < 1.5;
        posX = laneInterp.x;
        posY = bottomBarTop + laneInterp.y;
      } else if (laneInterp) {
        smoothOffset.x = (lastPos?.x ?? posX) - pos.x;
        smoothOffset.y = (lastPos?.y ?? posY) - pos.y;
        posX = pos.x + smoothOffset.x;
        posY = pos.y + smoothOffset.y;
        laneInterp = null;
      }

      prevLaneAnchorY = bottomBarTop;
      currentInterp = { ...pos, x: posX, y: posY, s: currentScale };
      setDataset(layer, 'anchor', isScreenTrack ? 'bottom' : 'top');
      laneAnchorTop = isScreenTrack ? layer.getBoundingClientRect().top : 0;

      const isStopped = pos.t === 0 && isSettled;
      const stopIndex = pos.k;

      if (isStopped) {
        if (currentStopIdx !== stopIndex) {
          const meta = journeyData.meta[stopIndex];
          queue = [];
          focusTarget = null;
          currentStopIdx = stopIndex;
          stopEnterTime = now;
          lastInteractionTime = now;
          treadmillPrevLeft = null;
          pupCtrl.reset();
          pupCtrl.setPose(meta.pose);
          pupCtrl.face(meta.facing, 0.14);
          pupCtrl.stride(0);
          pupCtrl.wag(meta.act === 'basket' ? 0.3 : 0.7);
          pupCtrl.jolt(0.4);
          nextAmbientBasketTime = now + 2.4;
        }

        const currentMeta = journeyData.meta[stopIndex];

        // Treadmill walk synchronization in Meet section
        if (currentMeta.track && !queue.length) {
          const trackLeft = currentMeta.track.getBoundingClientRect().left;
          const delta = treadmillPrevLeft === null ? 0 : trackLeft - treadmillPrevLeft;
          treadmillPrevLeft = trackLeft;
          pupCtrl.walkedTo(-trackLeft / currentScale);
          if (Math.abs(delta) > 0.15) {
            treadmillIdleTimer = 0;
            pupCtrl.setPose('walk');
            pupCtrl.stride(1);
            pupCtrl.face(delta < 0 ? 1 : -1, 0.16);
          } else if ((treadmillIdleTimer += dt) > 0.25) {
            pupCtrl.setPose('stand');
            pupCtrl.stride(0);
          }
        }

        // Night question tilt
        if (currentMeta.act === 'tilt' && !queue.length && now - stopEnterTime > 1.2) {
          pupCtrl.cock(Math.sin(0.9 * now) > 0.35 ? 13 : Math.sin(0.9 * now) < -0.35 ? -10 : 0);
        }

        // Footer basket snuggle & yawn
        if (currentMeta.act === 'basket' && !queue.length && now > nextAmbientBasketTime) {
          nextAmbientBasketTime = now + 4.5 + 3 * Math.random();
          if (Math.random() < 0.7) {
            pupCtrl.jolt(0.55);
          } else {
            pupCtrl.yawn(now, 0.7);
          }
        }

        // Look at scene targets
        const hasExternalFocus = (focusTarget && focusTarget.until > now) || (mousePoint && now - mousePoint.t < 2.5);
        if (currentMeta.looks.length && !hasExternalFocus && now - stopEnterTime > 0.8 && now - lookCycleTimer > 1.7) {
          lookCycleTimer = now;
          lookIdx = (lookIdx + 1) % (currentMeta.looks.length + 1);
          if (lookIdx < currentMeta.looks.length) {
            focusTarget = { el: currentMeta.looks[lookIdx], until: now + 1.4 };
          }
        }

        if (Math.abs(scrollDelta) > 0.5) lastInteractionTime = now;

        // Ambient idle animation after 9s of waiting
        if (!queue.length && !currentMeta.track && currentMeta.act !== 'basket' && now - lastInteractionTime > 9) {
          lastInteractionTime = now;
          if (Math.random() < 0.55) {
            const ctx = {
              d: pupCtrl,
              rest: POSES[currentMeta.pose] ?? POSES.sit,
              facing: currentMeta.facing,
              say: (msg: string, dur?: number) => showBubble(msg, performance.now() / 1000, dur),
              hearts: () => {},
            };
            queue = TRICKS.tilt(ctx, now);
          } else {
            queue = [
              [now, () => pupCtrl?.wag(1)],
              [now + 2.4, () => pupCtrl?.wag(0.7)],
            ];
          }
        }
      } else {
        // Character is travelling
        if (currentStopIdx !== -1) {
          currentStopIdx = -1;
          queue = [];
          pupCtrl.reset();
        }

        const dist = lastPos ? Math.hypot(posX - lastPos.x, posY - lastPos.y) : 0;
        stationaryTimer = dist > 0.25 ? 0 : stationaryTimer + dt;

        let airborne = pos.airborne;
        if (journeyData.lane && pos.t > 0) {
          const s0 = journeyData.stops[stopIndex];
          const s1 = journeyData.stops[stopIndex + 1];
          if (s0.sink && pos.t < 0.22) airborne = scrollDirection > 0;
          else if (s1?.sink && pos.t > 0.78) airborne = scrollDirection < 0;
        }

        if (airborne) {
          pupCtrl.setPose('hop');
          pupCtrl.stride(0);
        } else if (stationaryTimer > 0.3) {
          pupCtrl.setPose('stand');
          pupCtrl.stride(0);
          if (stationaryTimer > 2.6 && stationaryTimer - dt <= 2.6) {
            showBubble('coming?', now);
          }
        } else {
          pupCtrl.setPose('walk');
          pupCtrl.stride(1);
        }

        pupCtrl.walkedTo((isScreenTrack ? (laneAccumWalked += dist) : pos.walked) / Math.max(0.05, currentScale));

        if (lastPos) {
          const deltaX = posX - lastPos.x;
          if (Math.abs(deltaX) > 0.6 && Math.abs(deltaX) > 0.35 * Math.abs(posY - lastPos.y)) {
            pupCtrl.face(deltaX > 0 ? 1 : -1, 0.16);
          }
        }

        // Paw print emission
        if (!journeyData.lane) {
          const pawStep = Math.floor(pos.walked / (34 * currentScale));
          if (lastPawK === stopIndex && pawStep !== lastPawStep && !pos.airborne && lastPos) {
            const isOdd = (pawStep & 1) === 1;
            const pawOffsetX = isOdd ? 186 : 110;
            const actorLeft = posX - D.x * currentScale;
            const actorTop = posY - D.y * currentScale;
            const px = actorLeft + (pupCtrl.facingDir > 0 ? pawOffsetX : 300 - pawOffsetX) * currentScale;
            const py = actorTop + 226 * currentScale + scrollY - journeyData.mainTop + (isOdd ? -4 : 4) * currentScale;
            const angle = Math.atan2(posY - lastPos.y + scrollDelta, posX - lastPos.x) + Math.PI / 2;
            const size = 14 * Math.max(0.75, 1.5 * currentScale);
            const pad = pawPads[pawIndex++ % pawPads.length];
            pad.style.transform = 'translate(' + (px - size / 2).toFixed(1) + 'px, ' + (py - size / 2).toFixed(1) + 'px) rotate(' + angle.toFixed(3) + 'rad)';
            pad.style.width = pad.style.height = size.toFixed(1) + 'px';
            pad.animate(
              [
                { opacity: 0 },
                { opacity: 0.45, offset: 0.08 },
                { opacity: 0.45, offset: 0.5 },
                { opacity: 0 },
              ],
              { duration: 2600, easing: 'ease-out' }
            );
          }
          lastPawK = stopIndex;
          lastPawStep = pawStep;
        }
      }

      lastPos = { x: posX, y: posY };

      // Update scene attributes
      journeyData.meta.forEach((m, idx) => {
        if (m.scene) {
          setDataset(m.scene, 'here', String(isStopped && idx === stopIndex));
          setDataset(m.scene, 'visited', String(idx <= stopIndex || (idx === stopIndex + 1 && pos.t > 0.92)));
        }
      });

      // Target gazing
      if (focusTarget && focusTarget.until > now) {
        const targetRect = focusTarget.el.getBoundingClientRect();
        pupCtrl.lookAt({ x: targetRect.left + targetRect.width / 2, y: targetRect.top + targetRect.height / 2 });
      } else if (mousePoint && now - mousePoint.t < 2.5) {
        pupCtrl.lookAt(mousePoint);
      } else {
        pupCtrl.lookAt(null);
      }

      // DOM Transform updates
      actor.style.transform = 'translate3d(' + (posX - D.x * currentScale).toFixed(2) + 'px, ' + (posY - D.y * currentScale - laneAnchorTop).toFixed(2) + 'px, 0)';
      body.style.transform = 'scale(' + currentScale.toFixed(4) + ')';
      setDataset(layer, 'front', String(pos.front));
      setDataset(actor, 'holding', String(isStopped));

      // Bubble position & auto-hide
      if (bubble.dataset.show === 'true') {
        if (now > bubbleHideTime) bubble.dataset.show = 'false';
        const bubbleX = (pupCtrl.facingDir > 0 ? 214 : 300 - 214) * currentScale;
        bubbleAt.style.transform = 'translate(' + bubbleX.toFixed(1) + 'px, ' + (30 * currentScale).toFixed(1) + 'px)';
      }

      pupCtrl.tick(dt, now);
      rafId = requestAnimationFrame(tick);
    };

    // Click handler on character
    let clickStreak = 0;
    let lastClickTime = 0;
    let lastTrick = '';

    const pickRandomTrick = (list: string[], prev: string) => {
      const candidates = list.filter((t) => t !== prev);
      return candidates[Math.floor(Math.random() * candidates.length)];
    };

    const onActorClick = () => {
      if (!pupCtrl || !journeyData) return;
      const now = performance.now() / 1000;
      clickStreak = now - lastClickTime < 0.7 ? clickStreak + 1 : 1;
      lastClickTime = now;
      lastInteractionTime = now;

      const ctx = {
        d: pupCtrl,
        rest: POSES[journeyData.meta[Math.max(0, currentInterp?.k ?? 0)]?.pose] ?? POSES.sit,
        facing: pupCtrl.facingDir,
        say: (msg: string, dur?: number) => showBubble(msg, performance.now() / 1000, dur),
        hearts: () => {
          if (currentInterp) {
            const hx = currentInterp.x - D.x * currentInterp.s + ((pupCtrl?.facingDir ?? 1) > 0 ? 212 : 300 - 212) * currentInterp.s;
            const hy = currentInterp.y - (D.y - 40) * currentInterp.s - laneAnchorTop;
            spawnHearts(layer, hx, hy);
          }
        },
      };

      if (currentStopIdx < 0) {
        const trick = pickRandomTrick(TRICK_NAMES, lastTrick);
        lastTrick = trick;
        if (trick === 'jump') {
          queue = [
            [now, () => { pupCtrl?.hop(1.35); showBubble(pickRandomTrick(['wheee!', 'boing!', 'yip!'], ''), now); }],
            [now + 0.5, () => pupCtrl?.hop(0.7)],
          ];
        } else if (trick === 'woof') {
          queue = [
            [now, (t) => { pupCtrl?.woof(t ?? now); showBubble('woof!', now); }],
            [now + 0.4, (t) => pupCtrl?.woof(t ?? now)],
          ];
        } else if (trick === 'love') {
          queue = [
            [now, () => { pupCtrl?.wag(1); pupCtrl?.hop(0.5); ctx.hearts(); showBubble('I like you!', now); }],
          ];
        } else {
          queue = [
            [now, (t) => { pupCtrl?.jolt(1.4); pupCtrl?.hop(0.4); pupCtrl?.yawn(t ?? now, 0.22); showBubble('achoo!', now); }],
          ];
        }
        return;
      }

      const currentMeta = journeyData.meta[currentStopIdx];
      let trickName = '';
      if (currentMeta.track) {
        trickName = pickRandomTrick(['woof', 'hop', 'love'], lastTrick);
      } else if (currentMeta.act === 'basket') {
        trickName = pickRandomTrick(['tilt', 'love', 'sneeze', 'woof'], lastTrick);
      } else if (currentMeta.pose === 'peek') {
        trickName = pickRandomTrick(['peekaboo', 'woof', 'tilt', 'sneeze'], lastTrick);
      } else {
        trickName = clickStreak >= 4 ? 'zoomies' : pickRandomTrick(['woof', 'spin', 'beg', 'bow', 'hop', 'love', 'tilt', 'sneeze'], lastTrick);
        if (trickName === 'zoomies') trickName = 'spin';
      }

      if (TRICKS[trickName]) {
        lastTrick = trickName;
        pupCtrl.reset();
        queue = TRICKS[trickName](ctx, now);
      }
    };

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && pupCtrl && currentStopIdx >= 0) {
        pupCtrl.petting(true);
        pupCtrl.wag(1);
      }
    };

    const onPointerLeave = () => {
      if (pupCtrl) {
        pupCtrl.petting(false);
        if (currentStopIdx >= 0) {
          pupCtrl.wag(journeyData?.meta[currentStopIdx]?.act === 'basket' ? 0.3 : 0.7);
        }
      }
    };

    // Init Journey
    const initJourney = () => {
      if (isRunning || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const data = buildJourney(probe);
      if (data.stops.length < 2) return;

      journeyData = data;
      isRunning = true;
      htmlEl.dataset.pup = data.lane ? 'lane' : 'live';
      layer.hidden = false;

      const firstMeta = data.meta[0];
      pupCtrl = new JourneyPupController(svg, firstMeta.pose, firstMeta.facing);
      prevScrollY = window.scrollY;
      lastPos = null;
      lastScrollMotionTime = prevTime = performance.now() / 1000;
      wasResting = false;
      laneInterp = null;

      const now = prevTime;
      const startPos = evaluatePosition(data, window.scrollY);
      if (startPos.k === 0 && startPos.t === 0 && firstMeta.act === 'peekaboo') {
        currentStopIdx = 0;
        stopEnterTime = now;
        const friends = firstMeta.scene?.querySelectorAll<HTMLElement>('[data-pup-friend]') ?? [];
        const f0 = friends[0];
        const fn = friends[friends.length - 1];
        queue = [
          [now + 0.1, () => pupCtrl?.setPose({ ...POSES.peek, headY: 120 })],
          [now + 0.7, (t) => { pupCtrl?.setPose('peek'); pupCtrl?.jolt(1.2); showBubble('peekaboo!', t ?? now, 1.6); }],
          [now + 1.5, (t) => { if (f0) focusTarget = { el: f0, until: (t ?? now) + 0.8 }; }],
          [now + 2.3, (t) => { if (fn) focusTarget = { el: fn, until: (t ?? now) + 0.8 }; }],
          [now + 3.1, () => { focusTarget = null; pupCtrl?.wag(1); }],
        ];
      } else {
        currentStopIdx = -1;
      }

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pup:cue', onPupCue);
      window.addEventListener('focusin', onFocusIn);
      actor.addEventListener('click', onActorClick);
      actor.addEventListener('pointerenter', onPointerEnter);
      actor.addEventListener('pointerleave', onPointerLeave);

      rafId = requestAnimationFrame(tick);
    };

    const stopJourney = () => {
      if (!isRunning) return;
      isRunning = false;
      cancelAnimationFrame(rafId);
      delete htmlEl.dataset.pup;
      layer.hidden = true;
      delete layer.dataset.anchor;
      laneAnchorTop = 0;
      journeyData?.meta.forEach((m) => {
        if (m.scene) {
          delete m.scene.dataset.here;
          delete m.scene.dataset.visited;
        }
      });
      journeyData = null;
      pupCtrl = null;
      currentStopIdx = -1;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pup:cue', onPupCue);
      window.removeEventListener('focusin', onFocusIn);
      actor.removeEventListener('click', onActorClick);
      actor.removeEventListener('pointerenter', onPointerEnter);
      actor.removeEventListener('pointerleave', onPointerLeave);
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!isRunning || !journeyData) return;
        const nextData = buildJourney(probe);
        if (nextData.stops.length < 2) return stopJourney();
        const prevInterp = currentInterp;
        const laneChanged = nextData.lane !== journeyData.lane;
        journeyData = nextData;
        htmlEl.dataset.pup = nextData.lane ? 'lane' : 'live';
        if (laneChanged) currentStopIdx = -1;
        if (prevInterp) {
          const nextPos = evaluatePosition(nextData, window.scrollY);
          smoothOffset.x = prevInterp.x - nextPos.x;
          smoothOffset.y = prevInterp.y - nextPos.y;
          smoothOffset.s = prevInterp.s - nextPos.s;
        }
      }, 120);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionPreferenceChange = () => {
      if (reducedMotionQuery.matches) stopJourney();
      else initJourney();
    };
    reducedMotionQuery.addEventListener('change', onMotionPreferenceChange);

    initJourney();
    document.fonts?.ready?.then(onResize);

    const cleanup = () => {
      stopJourney();
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      reducedMotionQuery.removeEventListener('change', onMotionPreferenceChange);
      if (activeCleanup === cleanup) activeCleanup = null;
    };

    activeCleanup = cleanup;
    return cleanup;
  }, []);

  return (
    <>
      <div ref={probeRef} aria-hidden={true} className="pup-probe" />
      <div ref={printsRef} aria-hidden={true} className="pup-prints">
        {Array.from({ length: 24 }).map((_, i) => (
          <svg key={i} viewBox="0 0 64 64">
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>
      <div ref={layerRef} aria-hidden={true} className="pup-layer" hidden={true} data-front="true">
        <div ref={actorRef} className="pup-actor">
          <div ref={bodyRef} className="pup-actor__body">
            <PupBuddySVG pose="peek" />
          </div>
          <span ref={bubbleAtRef} className="pup-bubble-at">
            <span ref={bubbleRef} className="pup-bubble" data-show="false" />
          </span>
        </div>
      </div>
    </>
  );
}
