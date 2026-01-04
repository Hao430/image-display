<script setup lang="ts">
// 导入i18n
import { useI18n } from 'vue-i18n'
// 导入ref和defineExpose
import { ref } from 'vue'

// 使用i18n
const { t } = useI18n()

// 定义组件属性
defineProps<{
  previewUrl: string
}>()

// 获取图片容器元素
const imageContainerRef = ref<HTMLElement | null>(null)

// 暴露imageContainerRef给父组件
defineExpose({
  imageContainerRef
})
</script>

<template>
  <!-- 图片展示区域：当有预览URL时显示 -->
  <div v-if="previewUrl" class="image-section">
    <!-- 效果标题 -->
    <h3 class="effect-title">{{ t('app.glassEffect') }}</h3>
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
</template>

<style scoped>
/* 图片展示区域 */
.image-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

/* 效果标题 */
.effect-title {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
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
  border: 12px solid rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  opacity: 0.9;
  transition: none;
  transform: translate(0, 10px); /* 调整位置，与顶层图片形成错位 */
}

/* 底层卡片内的图片样式 */
.glass-card img {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  filter: blur(8px); /* 增加模糊效果 */
  opacity: 0.9; /* 提高不透明度 */
  transform: scale(1.05); /* 略微放大，增强层次感 */
  padding: 0px;
}

/* 顶层图片（圆角阴影效果） */
.top-image {
  position: relative;
  z-index: 10;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.top-image:hover {
  transform: scale(1.02);
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