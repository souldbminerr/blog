<script setup>
import { ref } from 'vue'

const props = defineProps({
  before: { type: String, required: true },
  after: { type: String, required: true },
  beforeLabel: { type: String, default: 'Before' },
  afterLabel: { type: String, default: 'After' }
})

const pos = ref(50)
const dragging = ref(false)
const container = ref(null)

function updateFromClientX(clientX) {
  const rect = container.value.getBoundingClientRect()
  const pct = ((clientX - rect.left) / rect.width) * 100
  pos.value = Math.min(100, Math.max(0, pct))
}

function onPointerDown(e) {
  dragging.value = true
  updateFromClientX(e.clientX)
}

function onPointerMove(e) {
  if (!dragging.value) return
  updateFromClientX(e.clientX)
}

function onPointerUp() {
  dragging.value = false
}
</script>

<template>
  <div
    ref="container"
    class="image-compare"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointerleave="onPointerUp"
  >
    <img :src="after" :alt="afterLabel" class="image-compare-base" draggable="false" />
    <div class="image-compare-overlay" :style="{ clipPath: `inset(0 ${100 - pos}% 0 0)` }">
      <img :src="before" :alt="beforeLabel" draggable="false" />
    </div>
    <div class="image-compare-handle" :style="{ left: pos + '%' }">
      <div class="image-compare-handle-line"></div>
      <div class="image-compare-handle-grip">⇔</div>
    </div>
    <div class="image-compare-label image-compare-label-left">{{ beforeLabel }}</div>
    <div class="image-compare-label image-compare-label-right">{{ afterLabel }}</div>
  </div>
</template>

<style scoped>
.image-compare {
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  cursor: ew-resize;
  user-select: none;
  touch-action: none;
  margin: 1.5rem 0;
}

.image-compare-base,
.image-compare-overlay img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.image-compare-overlay {
  position: absolute;
  inset: 0;
}

.image-compare-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  pointer-events: none;
}

.image-compare-handle-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: #fff;
  transform: translateX(-50%);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
}

.image-compare-handle-grip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
}

.image-compare-label {
  position: absolute;
  bottom: 8px;
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  border-radius: 4px;
  pointer-events: none;
  letter-spacing: 0.02em;
}

.image-compare-label-left {
  left: 8px;
}

.image-compare-label-right {
  right: 8px;
}
</style>
