---
title: How Horizon OC works
date: 2026-08-22
---

# How Horizon OC works

Since I have been seeing much misconception on how Horizon OC works, here's a post to clear it up.

Horizon OC is a overclocking tool for Switch. It intercepts early in the boot chain during process loading. 

The patched loader (source code is availabile [here](https://github.com/Horizon-OC/Horizon-OC/tree/main/Source/Atmosphere/stratosphere/loader/source/oc)) patches pcv and ptm to enable overclocks.

PCV stands for **P**ower **C**ontrol **V**oltage, while PTM stands for  **P**ower **T**hermal **M**anagement.

The main patches we apply are as follows:

Uncap the CPU/GPU frequencies
Uncap voltages
Adjust RAM timings

Next, here's a description on what each does (mariko only!):

CpuFreqVdd: Adjust CPU Max Clock

CpuVoltDvfs: Adjust CVB meta for new voltages and Vmins

CpuVoltThermals: Adjust the thermal profiles for new vmins/vmax

CpuVoltDfll: Adjust CLDVFS (nvidia cpu voltage control mechanism) tunings for undervolting

GpuVoltDvfs: Adjust Gpu Vmax/Vmin

GpuVoltThermals: Adjust the Vmin and optionally raise the 1125mV VMAX cap

GpuMaxFreqAsm:
This is a more complex one. It checks for a assembly pattern and adjusts the max clock in the pattern

GpuFreqPllMax: Adjust GPU PLL max entries for >1305mhz

GpuFreqPllLimit: Adjust another pll max entry for >1305Mhz

MemMtcTableAutoAdjust: Adjust DRAM timings for improved performance. Not explaining this one in detail as it's the most complex patch

MemMtcPllmbDivisor: Adjust the PLL division for frequencies to properly target the frequency
Fun fact: Nintendo has a bug in some of their MTC tables that causes incorrect PLL division

MemFreqMtcTable: 
Another complex one. Clear and extend the MTC table region so we can put more tables in there

MemFreqDvbTable: Apply a custom DVB curve for SOC voltage to properly scale with RAM OC

MemFreqMax: Self explanitory.

MemMtcTableAsm: Detailed more in the HOC 2.4 writeup, but essentially it adjusts the mtc table counting function

NvLogUartRedirect:
Ok this is actually the most complicated patch. It allows us to get access to unused logging from PCV for debugging. Super helpful for repairing dead consoles as well.
This one creates a bunch of custom code and redirects a bunch of call sites to get proper logging output, compilcated by vaargs. The custom code is stored in a "cave" region.

BusFreqReloc:
Another complex one: Relocates the SOC BUS tables to another region, as if you enlarge the memory tables they also need to be enlarged, otherwise there will be a bug with games causing too high soc volt

ForceVerbosity: Patches out logging verbosity so we get more debug output.

EmcSocLutReloc: Actually relocate the EMC dvfs list. Pretty complex patch so dont want to explain it at this time. Probably for HOC 3 writeup

EmcDvfsCountLimit: Another self explanitory one.

EmcRateListLimit: Pretty obvious.

EmcVddqVolt: Increase VDDQ voltage via I2C and inform pcv of the change

SocVoltAsm: Adjust SOC voltage init function for the higher limit

SocVoltLimit: Adjust the SOC volt table for the new voltages

EmcRateSessLimit: Partial patch of the ipc commands, needs work still.

CpuPtmBoost: Self explanitory

MemPtm: Adjust PTM limit for memory clock

Now that I have explained everything in loader, I will publish another post explaining hoc-clk later.

---

← [Back to posts](../../)
