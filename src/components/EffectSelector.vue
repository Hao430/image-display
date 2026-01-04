<script setup lang="ts">
// 导入i18n
import { useI18n } from 'vue-i18n'

// 使用i18n
const { t } = useI18n()

// 定义效果类型
type EffectType = 'glass' | 'focus'

// 定义组件属性
const props = defineProps<{
  currentEffect: EffectType
  isVisible: boolean
}>()

// 定义组件事件
const emit = defineEmits<{
  (e: 'effectChange', effect: EffectType): void
}>()

// 效果选项配置
const effectOptions = [
  { value: 'glass' as EffectType, label: t('app.glassEffect') },
  { value: 'focus' as EffectType, label: t('app.focusEffect') }
]

// 处理效果切换
const handleEffectChange = (effect: EffectType) => {
  emit('effectChange', effect)
}
</script>

<template>
  <div v-if="isVisible" class="effect-selector-section">
    <div class="effect-selector-container">
      <h3 class="effect-title">{{ t('app.selectEffect') }}</h3>
      <div class="effect-buttons">
        <button 
          v-for="option in effectOptions" 
          :key="option.value"
          @click="handleEffectChange(option.value)"
          :class="['effect-button', { active: currentEffect === option.value }]"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.effect-selector-section {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.effect-selector-container {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 5px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.effect-title {
  color: #333;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
}

.effect-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.effect-button {
  padding: 10px 20px;
  border: 2px solid #667eea;
  background: transparent;
  color: #667eea;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 14px;
}

.effect-button:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.effect-button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.effect-button.active:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .effect-selector-container {
    padding: 15px;
  }
  
  .effect-title {
    font-size: 16px;
  }
  
  .effect-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .effect-button {
    width: 100%;
    max-width: 200px;
  }
}
</style>