---
title: HOC 2.4.0 writeup
date: 2026-06-07
---

# HOC 2.4.0 writeup

I'm pretty happy with HOC 2.4, so might as well go into the development process.\
The focus of the update was to improve Erista support (mariko is better, but erista users still exist)\
The main addition was a real MRF/DVFS for erista like it's mariko counterpart. Erista *did* have MRF but it was rather limited and didnt't extend the MTC table list, it only overwrote the 3 tables which have no use. DVFS was not present before this as coming up with the curves would be painful.

For mrf the code is similar-ish to the mariko implementation but the MemMtcTableAsm patch is very different.\
The mariko patch did work with little modification on FW <=21.0.0, but when tried on FW 22.0.0+ it didn't work. It turns out Nintendo's compiler reordered the entire function. Before it used to be a switch jumptable, on FW 22 it's a bunch of if statements.\
The way we ended up working around this without writing 2 seperate patches is by examining the ASM. The strcmp/bl for nn::pcv::GetHardwareType and adrp x1, s_ModuleResetStatus_ was in the same location. The problem is that our anchor checks for a adrp and will match at this. Patching this will result in problems. So what I did was check the opcodes and see if they were the same as the expected bad opcodes- if so, then skip them. The patch runs 4 times and will find the good opcodes, validate them, and patch the mov.

For dvfs it was honestly rather simple. The mariko code works on Erista but needed a minor change to properly validate the table (GpuBootVolt is different on Mariko and Erista). Then it was just a matter of making the brackets, removing mariko only checks, and fixing it up.

Making the brackets was honestly not that bad, i just went from 1733->2400MHz in 5mV increments from 725mV vmin, going down 10mv each bracket. This works well and i havent got issue reports with it :)

---

← [Back to posts](/posts/)
