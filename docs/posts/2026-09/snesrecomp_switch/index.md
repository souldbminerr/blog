---
title: How I ported SNESRecomp to Switch
date: 2026-09-12
---

# How I ported SNESRecomp to Switch

So, in case you don't know, I really love the SNES. I have played a extremely large amount of SMW and DKC. It's one of the few retro consoles I physically own as well.

When I heard that someone figured out how to recompile SNES games to run semi-natively on other platforms I was very intrested in a switch port (the switch is my favorite console by the way).

Turns out that this is ridiculously easy. I just had to write some init code, makefile and make performance improvements by removing debug stuff.

After that I ported DKC1/2. This wasn't that bad, as it was just some SDL stuff, gamepad, platform declerations, etc.

But the pain started in DKC3. The initial process was simple, but due to CPU overhead there was audio crackling and poor performance. So I had to optimize it.
The biggest gains came from removing debug stuff and adding LTO, as for some insane reason it compiles each bank in like 100 parts.
Now it runs somewhat well with mild oc.
But the real fix was reaching out to the oringal dev, they optimized it for up to 2x performance, so now it runs pretty well aside from audio issues.

---

← [Back to posts](../../)
