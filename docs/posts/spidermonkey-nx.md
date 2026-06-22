---
title: Spidermonkey-NX Writeup
date: 2026-06-22
---

# Spidermonkey-NX

So... I ported JavaScript to switch.
To start, I tried compiling SpiderMonkey. It didnt work, so there was a lot more work to do. Turns out, there is a dependency on a bunch of rust packages (including jsrust) that require rust stdlib. The switch rust target doesn't have stdlib. So I either reimplement rust stdlib for Switch or remove stdlib dependencies. I chose to remove the dependencies as I felt it would be easier. There was also a dependency on wast, and since I didn't intend to port WASM I just removed it. Maybe in the future I could port it? After a bunch of patches i got it to compile. Then there was fixing a bunch of crashes pertaining to memory allocation, threading and more. Then it finally ran.

Now time to port 0 A.D. to Switch (which is why I ported spidermonkey instead of something like quickjs).

Note: There is no JIT. I am not insane enough to attempt to get JIT working

---

← [Back to posts](./)
