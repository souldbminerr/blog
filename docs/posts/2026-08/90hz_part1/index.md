---
title: 90Hz OLED Part 1
date: 2026-08-07
---

# 90Hz OLED Part 1

It's time for Horizon OC 3.0, but the real painful part. 90Hz is still unfinished and is a WIP but I wanted to document what I found so far.

First, a bit of background. The switch OLED is commonly known to support 4K60FPS in the dock, but fewer people know that the internal display can actually handle 90hz. The panel is made for it. However, the DDIC isn't made for it so it won't work for all. 75hz however should work for everyone and is a nice middleground. (I will release a payload for people to test compatibility at some point)

Traditionally, OLED was limited to 64hz, with some select units handling 65Hz. There is a reason for this. DSI specification has a bunch of parameters and if they are outside the acceptable range there will be a calibration error. This results in "green hell". The limit is 64.96hz, although I am unsure why some units can tolerate it and still handle 65hz.

90hz is a different story. It's a very high freq so the entire DSI clock tree and MIPI Pad bias must be recalibrated, which is painful... You also can't adjust the PixelClock divider to get it easier due to some other DSI nuances.

The samsung panel on the switch also has no refresh rate register so it's even more puzzling. I am yet to get it to work, but i will write a post and release a video when i do :)

---

← [Back to posts](../../)
