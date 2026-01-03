<script setup lang="ts">
// 导入Vue的响应式API
import { ref } from 'vue'
// 导入组件
import ImageUploader from './components/ImageUploader.vue'
import ImageDisplay from './components/ImageDisplay.vue'
import Footer from './components/Footer.vue'

// 响应式状态管理
const previewUrl = ref<string>('') // 图片预览URL
const isUploading = ref<boolean>(false) // 是否正在上传

// 处理文件选择事件
const handleFileSelected = (_file: File, url: string) => {
  previewUrl.value = url
}

// 处理上传事件
const handleUpload = () => {
  isUploading.value = true
}

// 处理重置事件
const handleReset = () => {
  previewUrl.value = ''
  isUploading.value = false
}
</script>

<template>
  <!-- 主应用容器 -->
  <div class="app-container">
    <!-- 页面标题 -->
    <h1>千幻图卡</h1>
    
    <!-- 图片上传组件 -->
    <ImageUploader 
      :is-uploading="isUploading"
      @file-selected="handleFileSelected"
      @upload="handleUpload"
      @reset="handleReset"
    />
    
    <!-- 图片展示组件 -->
    <ImageDisplay :preview-url="previewUrl" />
    
    <!-- 页脚组件 -->
    <Footer />
  </div>
</template>

<style scoped>
/* 全局样式 */
.app-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-family: 'Microsoft YaHei', 'PingFang SC', Arial, sans-serif;
}

/* 标题样式 */
h1 {
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-container {
    padding: 10px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 20px;
  }
}
</style>
