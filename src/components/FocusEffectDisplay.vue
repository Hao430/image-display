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
    <h3 class="effect-title">{{ t('app.focusEffect') }}</h3>
    <!-- 图片容器（承载两张叠放的图片） -->
    <div class="image-container" ref="imageContainerRef">
      <!-- 底层图片 -->
      <img 
        class="bottom-image" 
        :src="previewUrl" 
        alt="上传的图片" 
        title="点击查看大图"
      />
      
      <!-- 顶层透明容器（悬浮边框效果） -->
      <div class="focus-frame"></div>
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

/* 图片容器样式 */
.image-container {
  position: relative;
  display: inline-block;
  max-width: 450px;
  text-align: center;
  padding: 0;
  margin: 60px 0;
}

/* 底层图片 */
.bottom-image {
  /* 图片宽度100%，等比缩放 */
  width: 100%;
  /* 高度自动，保持原图比例 */
  height: auto;
  /* 确保图片完全贴合容器，不产生间隙 */
  object-fit: cover;
  /* 添加图片圆角效果 */
  border-radius: 16px;
  /* 添加柔和阴影 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  /* 确保在容器底部 */
  z-index: 1;
}

/* 顶层透明容器（悬浮边框效果） */
.focus-frame {
  /* 绝对定位，在图片中央 */
  position: absolute;
  /* 与图片容器边缘保持15%的距离，实现30%的内边距效果 */
  top: 15%;
  left: 15%;
  /* 自适应大小，宽高为图片容器的70% */
  width: 70%;
  height: 70%;
  /* 确保在图片之上 */
  z-index: 10;

  /* 完全透明背景 */
  background: transparent;
  /* 边框外发光效果，增强悬浮感 */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1),
              0 0 40px rgba(0, 0, 0, 0.9),
              inset 0 0 20px rgba(255, 255, 255, 0.4);
  /* 圆角效果，与图片保持一致 */
  border-radius: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .image-container {
    max-width: 100%;
    padding: 0;
  }
}

@media (max-width: 480px) {
  .image-container {
    padding: 0;
  }
}
</style>