// The six places a costume piece can go. Every piece draws in the same 240 x 360
// coordinate system as the mannequin, so the layers line up on the stage.
export const SLOTS = [
  { id: 'head', label: 'Head', hint: 'Hats, horns and hair', thumb: '46 -4 148 148' },
  { id: 'face', label: 'Face', hint: 'Make-up and masks', thumb: '66 14 108 108' },
  { id: 'body', label: 'Outfit', hint: 'What you wear', thumb: '0 0 240 360' },
  { id: 'back', label: 'Back', hint: 'Capes and wings', thumb: '0 0 240 360' },
  { id: 'prop', label: 'Prop', hint: 'Something to hold', thumb: '0 0 240 360' },
  { id: 'sidekick', label: 'Sidekick', hint: 'A spooky friend', thumb: '0 0 240 360' },
] as const;

export type SlotId = (typeof SLOTS)[number]['id'];

export const SLOT_IDS = SLOTS.map((slot) => slot.id) as [SlotId, ...SlotId[]];

// Bottom to top. 'base' is the mannequin itself: capes go behind it, everything else on top.
export const LAYER_ORDER = ['back', 'base', 'body', 'face', 'head', 'prop', 'sidekick'] as const;

// Pieces are merged automatically, so their SVG may only draw - nothing that runs,
// loads or styles the rest of the page.
const UNSAFE_SVG = /<\s*\/?\s*(script|style|foreignObject|iframe|image|use|a|svg)\b|\son\w+\s*=|javascript:|href\s*=|url\s*\(/i;

export const isSafeSvg = (svg: string) => !UNSAFE_SVG.test(svg);
