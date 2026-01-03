<script setup lang="ts">
// 定义组件属性
defineProps<{
  previewUrl: string
}>()
</script>

<template>
  <!-- 图片展示区域：当有预览URL时显示 -->
  <div v-if="previewUrl" class="image-section">
    <!-- 图片容器（承载两张叠放的图片） -->
    <div class="image-container">
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
    请上传一张图片来查看效果
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
  border-radius: 16px;
  padding: 0px;
  border: 8px solid #ffffff;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 5px 32px rgba(0, 0, 0, 0.05);
  filter: blur(2px);
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
  box-shadow: 0 5px 32px rgba(0, 0, 0, 0.7);
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