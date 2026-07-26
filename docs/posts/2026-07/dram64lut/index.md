---
title: DRAM 64LUT
date: 2026-07-25
---

# How I made DRAM 64LUT on  Switch

When Lightos got Multiple Ram Freqs working, he noticed something weird. After he added more than 32 ram frequencies to the table, the console wouldn't boot.
After a bit of RE, me and him determined that patching this limit out would have been infesable. 

A lot of time passed. We also remembered that meha had also tried to do it but failed due to the inherent complexity.
For HOC 3.0.0 I decided to look into it again. There was a simple guard that capped the limit, but raising it wouldn't work. The EMC LUT data is stored in various tables and those would have to be expanded for full function.
There weere a bunch of these including buffers for freq rates to SOC voltages. 
The nice thing is that the DVB table didnt need expansion as it was perfect already.

What I did was freed some space by NOPing out some checks that were redundant with our patches. This also freed up some space for one table.

After these patches the DRAM freq could be changed to a extended entry but clkrst didn't report it. Turns out clkrst uses a lot of tables derived at runtime, so instead of patching it I just hacked in the extra frequencies. 
I thought it worked after this, but there was one other thing. Whenever I opened a game the SOC Voltage would spike to it's vMax. Intrestingly this didn't happen in Switchfin. Turns out due to the relocations the structs for SOC engines and other related items were too small, so when the max freq was too high it would request a invalid value causing the SOC volt to be to high.
To fix this I created a cave of data in pcv memory large enough to relocate and resize the structures. This fixed the bug! To my knowlage, it's now fully working :)

---

← [Back to posts](../../)
