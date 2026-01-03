<script setup lang="ts">
// 导入Vue的响应式API
import { ref, computed } from 'vue'

// 图片上传组件 - 实现图片上传、预览和展示功能
// 作者: AI Assistant
// 日期: 2026-01-03

// 响应式状态管理
const selectedFile = ref<File | null>(null) // 选中的文件对象
const previewUrl = ref<string>('') // 图片预览URL
const uploadProgress = ref<number>(0) // 上传进度（0-100）
const uploadStatus = ref<'idle' | 'uploading' | 'success' | 'error'>('idle') // 上传状态
const errorMessage = ref<string>('') // 错误信息

// 配置常量
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] // 允许上传的图片类型
const maxFileSize = 20 * 1024 * 1024 // 文件大小限制（20MB）

// 计算属性：是否可以执行上传操作
const canUpload = computed(() => {
  return selectedFile.value !== null && uploadStatus.value !== 'uploading'
})

// 计算属性：动态生成上传按钮文本
const uploadButtonText = computed(() => {
  if (uploadStatus.value === 'uploading') {
    return `上传中... ${uploadProgress.value}%`
  }
  return '上传图片'
})

// 处理文件选择
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]
    
    // 确保file不是undefined
    if (!file) return
    
    // 重置状态
    errorMessage.value = ''
    
    // 验证文件类型
    if (!allowedTypes.includes(file.type)) {
      errorMessage.value = '只支持 JPG、PNG、GIF 和 WebP 格式的图片'
      return
    }
    
    // 验证文件大小
    if (file.size > maxFileSize) {
      errorMessage.value = '图片大小不能超过 20MB'
      return
    }
    
    // 设置选中的文件
    selectedFile.value = file as File
    
    // 生成预览 URL
    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string
    }
    reader.readAsDataURL(file as Blob)
  }
}

// 模拟上传功能
const handleUpload = () => {
  if (!selectedFile.value) return
  
  // 重置状态
  uploadStatus.value = 'uploading'
  errorMessage.value = ''
  uploadProgress.value = 0
  
  // 模拟上传进度
  const interval = setInterval(() => {
    uploadProgress.value += 10
    
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      uploadStatus.value = 'success'
      
      // 模拟网络延迟
      setTimeout(() => {
        uploadProgress.value = 0
      }, 1000)
    }
  }, 300)
}

// 重新选择文件
const handleReset = () => {
  selectedFile.value = null
  previewUrl.value = ''
  uploadStatus.value = 'idle'
  errorMessage.value = ''
  uploadProgress.value = 0
}
</script>

<template>
  <!-- 主应用容器 -->
  <div class="app-container">
    <!-- 页面标题 -->
    <h1>图片展示</h1>
    
    <!-- 图片上传区域：包含文件选择、上传控制和状态反馈 -->
    <div class="upload-section">
      <!-- 上传容器：采用玻璃拟态设计 -->
      <div class="upload-container">
        <h2>上传图片</h2>
        
        <!-- 文件选择：自定义样式的文件输入框 -->
        <div class="file-input-wrapper">
          <input 
            type="file" 
            id="fileInput" 
            accept="image/*" 
            @change="handleFileChange"
            :disabled="uploadStatus === 'uploading'"
          />
          <label for="fileInput" class="file-input-label">
            {{ selectedFile ? selectedFile.name : '选择图片' }}
          </label>
        </div>
        
        <!-- 错误信息显示：当有错误时显示 -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <!-- 上传控制按钮：包含上传和重置按钮 -->
        <div class="upload-controls">
          <button 
            @click="handleUpload" 
            :disabled="!canUpload"
            class="upload-button"
          >
            {{ uploadButtonText }}
          </button>
          <button 
            @click="handleReset" 
            :disabled="uploadStatus === 'uploading'"
            class="reset-button"
          >
            重新选择
          </button>
        </div>
        
        <!-- 上传进度条：上传过程中显示 -->
        <div v-if="uploadStatus === 'uploading'" class="progress-container">
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: `${uploadProgress}%` }"
            ></div>
          </div>
          <span class="progress-text">{{ uploadProgress }}%</span>
        </div>
        
        <!-- 上传成功提示：上传完成后显示 -->
        <div v-if="uploadStatus === 'success'" class="success-message">
          图片上传成功！
        </div>
      </div>
    </div>
    
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
    <div v-if="!previewUrl" class="hint-message">
      请上传一张图片来查看效果
    </div>
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

/* 上传区域样式 */
.upload-section {
  width: 100%;
  max-width: 500px;
  margin-bottom: 40px;
}

.upload-container {
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 5px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.upload-container h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
}

/* 文件输入样式 */
.file-input-wrapper {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.file-input-wrapper input[type="file"] {
  display: none;
}

.file-input-label {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.file-input-label:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* 按钮样式 */
.upload-controls {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.upload-button, .reset-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.upload-button {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
}

.upload-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.upload-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reset-button {
  background: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.reset-button:hover:not(:disabled) {
  background: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.reset-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 进度条样式 */
.progress-container {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex: 1;
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%);
  transition: width 0.3s ease;
  border-radius: 5px;
}

.progress-text {
  font-size: 14px;
  font-weight: 500;
  color: #666;
  min-width: 40px;
  text-align: right;
}

/* 消息样式 */
.error-message {
  color: #f44336;
  background: #ffebee;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #ffcdd2;
}

.success-message {
  color: #4CAF50;
  background: #e8f5e8;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #c8e6c9;
  animation: fadeIn 0.5s ease;
}

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
  top: 30px;
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

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  
  .upload-container {
    padding: 20px;
  }
  
  .upload-container h2 {
    font-size: 18px;
  }
  
  .upload-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .upload-button, .reset-button {
    width: 100%;
    max-width: 200px;
  }
  
  .image-container {
    max-width: 100%;
    padding: 40px 20px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 20px;
  }
  
  .upload-container {
    padding: 15px;
  }
  
  .file-input-label {
    padding: 10px 20px;
    font-size: 14px;
  }
  
  .image-container {
    padding: 30px 15px;
  }
}
</style>
