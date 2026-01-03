<script setup lang="ts">
// 导入Vue的响应式API
import { computed } from 'vue'
// 导入i18n
import { useI18n } from 'vue-i18n'
// 导入html2canvas
import html2canvas from 'html2canvas'

// 使用i18n
const { t } = useI18n()

// 定义组件属性
const props = defineProps<{
  isVisible: boolean
  imageContainer: HTMLElement | null
  isLoading: boolean
}>()

// 计算属性：按钮是否可点击
const isDisabled = computed(() => {
  return props.isLoading || !props.imageContainer
})

// 计算属性：按钮文本
const buttonText = computed(() => {
  if (props.isLoading) {
    return `${t('app.uploading')}...`
  }
  return t('app.downloadImage')
})

// 下载图片功能
const handleDownload = async () => {
  if (!props.imageContainer) return
  
  try {
    // 使用html2canvas将DOM转换为canvas
    const canvas = await html2canvas(props.imageContainer, {
      backgroundColor: 'transparent',
      scale: 2, // 提高分辨率，避免失真
      useCORS: true, // 允许加载跨域图片
      logging: false
    })
    
    // 将canvas转换为blob
    canvas.toBlob((blob) => {
      if (!blob) return
      
      // 创建下载链接
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `image-${Date.now()}.png`
      link.click()
      
      // 释放URL对象
      URL.revokeObjectURL(link.href)
    }, 'image/png', 1.0) // 使用PNG格式，质量为1.0
  } catch (error) {
    console.error('下载图片失败:', error)
  }
}
</script>

<template>
  <div v-if="isVisible" class="download-section">
    <button 
      @click="handleDownload" 
      :disabled="isDisabled"
      class="download-button"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<style scoped>
.download-section {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.download-button {
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.download-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.download-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>