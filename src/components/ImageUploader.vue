<script setup lang="ts">
// 导入Vue的响应式API
import { ref, computed } from 'vue'
// 导入i18n
import { useI18n } from 'vue-i18n'

// 使用i18n
const { t } = useI18n()

// 定义组件属性
defineProps<{
  isUploading: boolean
}>()

// 定义组件事件
const emit = defineEmits<{
  (e: 'fileSelected', file: File, previewUrl: string): void
  (e: 'upload'): void
  (e: 'reset'): void
  (e: 'download'): void
}>()

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

// 计算属性：动态生成按钮文本
const buttonText = computed(() => {
  if (uploadStatus.value === 'uploading') {
    return `${t('app.uploading')} ${uploadProgress.value}%`
  }
  if (previewUrl.value) {
    return t('app.downloadImage')
  }
  return t('app.uploadImage')
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
      errorMessage.value = t('errors.fileType')
      return
    }
    
    // 验证文件大小
    if (file.size > maxFileSize) {
      errorMessage.value = t('errors.fileSize')
      return
    }
    
    // 设置选中的文件
    selectedFile.value = file as File
    
    // 生成预览 URL
    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string
      emit('fileSelected', file as File, previewUrl.value)
    }
    reader.readAsDataURL(file as Blob)
  }
}

// 处理上传或下载
const handleAction = () => {
  if (!selectedFile.value) return
  
  if (previewUrl.value) {
    // 如果已经有预览图，则执行下载
    emit('download')
  } else {
    // 否则执行上传
    // 更新上传状态
    uploadStatus.value = 'uploading'
    errorMessage.value = ''
    uploadProgress.value = 0
    
    // 触发上传事件
    emit('upload')
    
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
}

// 重新选择文件
const handleReset = () => {
  selectedFile.value = null
  previewUrl.value = ''
  uploadStatus.value = 'idle'
  errorMessage.value = ''
  uploadProgress.value = 0
  emit('reset')
}
</script>

<template>
  <!-- 图片上传区域：包含文件选择、上传控制和状态反馈 -->
  <div class="upload-section">
    <!-- 上传容器：采用玻璃拟态设计 -->
    <div class="upload-container">
      <h2>{{ t('app.uploadImage') }}</h2>
      
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
          {{ selectedFile ? selectedFile.name : t('app.selectImage') }}
        </label>
      </div>
      
      <!-- 错误信息显示：当有错误时显示 -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <!-- 控制按钮：包含上传/下载和重置按钮 -->
      <div class="upload-controls">
        <button 
          @click="handleAction" 
          :disabled="!canUpload"
          class="upload-button"
        >
          {{ buttonText }}
        </button>
        <button 
          @click="handleReset" 
          :disabled="uploadStatus === 'uploading'"
          class="reset-button"
        >
          {{ t('app.reselect') }}
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
        {{ t('app.uploadSuccess') }}
      </div>
    </div>
  </div>
</template>

<style scoped>
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
}

@media (max-width: 480px) {
  .upload-container {
    padding: 15px;
  }
  
  .file-input-label {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>