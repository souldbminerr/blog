---
title: sys-HDR writeup
date: 2026-08-20
---

# sys-HDR writeup

So... I got High Dynamic Range (HDR) working on Switch 1*

*Pseudo HDR via tone mapping and color curve tricks

So, there is a tool that can adjust display color known as Fizeau. It's well established and overall a cool homebrew.
Fizeau adjusts colors using the Tegra X1's Color Management Unit (CMU), using it to apply a variety of static and linear effects.

However, the CMU is far more capable than that.
nVidia states that it can do:
• Gamma (tone curve) conversion
• Color gamut conversion
• Allow conversion of sRGB content for a non-sRGB panel, for predictable colors (color matching)
• Enhanced PRISM2 display for these panels, as the PRISM2 algorithm assumes sRGB gamma
• Enable TCON and panels with non sRGB response
• Allows color calibrated displays, and enables end-to-end Camera / ISP -> Display color quality

It's a pretty powerful piece of hardware, and can adjust the color tone curves.
This feature allows us to do pseudo-HDR.

So that's what sys-HDR does. It modifies the tone curves to fake HDR. (this is similar to what the Switch2 does actually, although S2 will get a better output. Perhaps in future version I can look into matching S2)

There are various algorithms implemented, those allowing tuning of the curves, which can make a **huge** difference in games. No photo will ever do justice to how good it looks in person.
Here's some games with sys-HDR on/off — drag the slider to compare.

<ImageCompare
  before="./lm3hdroff.png"
  after="./lm3hdron.png"
  beforeLabel="HDR off"
  afterLabel="HDR on"
/>

<ImageCompare
  before="./smghdroff.png"
  after="./smghdron.png"
  beforeLabel="HDR off"
  afterLabel="HDR on"
/>

<ImageCompare
  before="./spmhdroff.png"
  after="./spmhdron.png"
  beforeLabel="HDR off"
  afterLabel="HDR on"
/>

---

← [Back to posts](../../)
