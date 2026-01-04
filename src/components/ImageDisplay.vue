<script setup lang="ts">
// 导入i18n
import { useI18n } from 'vue-i18n'
// 导入ref和defineExpose
import { ref } from 'vue'

// 使用i18n
const { t } = useI18n()

// 定义效果类型
type EffectType = 'glass' | 'focus'

// 定义组件属性
defineProps<{
  previewUrl: string
  effect: EffectType
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
    <!-- 图片容器（承载两张叠放的图片） -->
    <div class="image-container" ref="imageContainerRef">
      <!-- 玻璃拟态效果 -->
      <div v-if="effect === 'glass'" class="effect-wrapper">
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
      
      <!-- 主体突出效果 -->
      <div v-else-if="effect === 'focus'" class="effect-wrapper">
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
  filter: blur(5px);
  opacity: 0.7;
  padding: 0px;
}

/* 效果包装器 */
.effect-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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

/* 主体突出效果 - 底层图片 */
.bottom-image {
  /* 图片宽度100%，等比缩放 */
  width: 100%;
  /* 高度自动，保持原图比例 */
  height: auto;
  /* 确保图片不裁剪，完整显示 */
  object-fit: contain;
  /* 添加图片圆角效果 */
  border-radius: 16px;
  /* 添加柔和阴影 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  /* 确保在容器底部 */
  z-index: 1;
}

/* 主体突出效果 - 顶层透明容器（悬浮边框效果） */
.focus-frame {
  /* 绝对定位，在图片中央 */
  position: absolute;
  top: 50%;
  left: 50%;
  /* 居中偏移 */
  transform: translate(-50%, -50%);
  /* 容器大小小于图片，约为图片的70% */
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
  /* 圆角效果 */
  border-radius: 12px;
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