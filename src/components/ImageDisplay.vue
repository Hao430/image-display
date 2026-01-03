<script setup lang="ts">
// 导入i18n
import { useI18n } from 'vue-i18n'
// 导入ref
import { ref } from 'vue'
// 导入html2canvas
import html2canvas from 'html2canvas'

// 使用i18n
const { t } = useI18n()

// 定义组件属性
defineProps<{
  previewUrl: string
}>()

// 获取图片容器元素
const imageContainerRef = ref<HTMLElement | null>(null)

// 下载图片功能
const downloadImage = async () => {
  if (!imageContainerRef.value) return
  
  try {
    // 使用html2canvas将DOM转换为canvas
    const canvas = await html2canvas(imageContainerRef.value, {
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

// 暴露downloadImage方法给父组件
defineExpose({
  downloadImage
})
</script>

<template>
  <!-- 图片展示区域：当有预览URL时显示 -->
  <div v-if="previewUrl" class="image-section">
    <!-- 图片容器（承载两张叠放的图片） -->
    <div class="image-container" ref="imageContainerRef">
      <!-- 底层玻璃拟态卡片：包含模糊的图片和玻璃效果，增强视觉层次感 -->
      <div class="glass-card">
        <!-- 底层图片：模糊化处理，作为背景 -->
        <img :src="previewUrl" alt="图片背景层" />
      </div>

      <!-- 顶层图片：清晰显示，具有圆角阴影效果，作为主要展示内容 -->
      <img 
        class="top-image" 
        :src="previewUrl" 
        alt="上传的图片" 
        title="点击查看大图"
      />
    </div>
  </div>
  
  <!-- 提示信息：当没有图片时显示 -->
  <div v-else class="hint-message">
    {{ t('app.pleaseUploadImage') }}
  </div>
</template>

<style scoped>
/* 图片展示区域 */
.image-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

/* 图片容器样式（承载两张叠放的图片） */
.image-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 450px;
  text-align: center;
  padding: 60px;
}

/* 底层玻璃拟态卡片容器 */
.glass-card {
  position: absolute;
  width: calc(100% - 40px);
  border-radius: 20px;
  padding: 0px;
  border: 12px solid #ffffff;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  /* filter: blur(2px); */
  opacity: 0.8;
  transition: none;
}

/* 底层卡片内的图片样式 */
.glass-card img {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  filter: blur(3px);
  opacity: 0.7;
}

/* 顶层图片（圆角阴影效果） */
.top-image {
  position: relative;
  z-index: 10;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.top-image:hover {
  transform: scale(1.02);
}

/* 提示信息 */
.hint-message {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .image-container {
    max-width: 100%;
    padding: 40px 20px;
  }
}

@media (max-width: 480px) {
  .image-container {
    padding: 30px 15px;
  }
}
</style>