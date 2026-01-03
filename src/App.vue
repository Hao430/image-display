<script setup lang="ts">
// 导入Vue的响应式API
import { ref, computed } from 'vue'
// 导入i18n相关
import { useI18n } from 'vue-i18n'
import { changeLanguage } from './i18n'
// 导入组件
import ImageUploader from './components/ImageUploader.vue'
import ImageDisplay from './components/ImageDisplay.vue'
import DownloadButton from './components/DownloadButton.vue'
import Footer from './components/Footer.vue'

// 使用i18n
const { t, locale } = useI18n()

// 响应式状态管理
const previewUrl = ref<string>('') // 图片预览URL
const isUploading = ref<boolean>(false) // 是否正在上传

// 获取ImageDisplay组件实例
const imageDisplayRef = ref<any>(null)

// 计算属性：是否显示下载按钮
const showDownloadButton = computed(() => {
  return !!previewUrl.value
})

// 计算属性：获取图片容器元素
const imageContainer = computed(() => {
  if (!imageDisplayRef.value) return null
  // defineExpose 直接暴露了 ref 对象，所以不需要访问 .value
  return imageDisplayRef.value.imageContainerRef || null
})

// 处理文件选择事件
const handleFileSelected = (_file: File, url: string) => {
  previewUrl.value = url
  // 添加一个延时，确保DOM已经更新
  setTimeout(() => {
    console.log('ImageDisplay ref:', imageDisplayRef.value)
    console.log('ImageContainer ref:', imageDisplayRef.value?.imageContainerRef)
  }, 100)
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

// 切换语言
const toggleLanguage = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  changeLanguage(newLocale as 'zh' | 'en')
}
</script>

<template>
  <!-- 主应用容器 -->
  <div class="app-container">
    <!-- 语言切换按钮 -->
    <button class="language-toggle" @click="toggleLanguage">
      {{ locale === 'zh' ? 'English' : '中文' }}
    </button>
    <!-- 页面标题 -->
    <h1>{{ t('app.title') }}</h1>
    
    <!-- 图片上传组件 -->
    <ImageUploader 
      :is-uploading="isUploading"
      @file-selected="handleFileSelected"
      @upload="handleUpload"
      @reset="handleReset"
    />
    
    <!-- 图片展示组件 -->
    <ImageDisplay 
      ref="imageDisplayRef"
      :preview-url="previewUrl" 
    />
    
    <!-- 下载按钮组件 -->
    <DownloadButton 
      :is-visible="showDownloadButton"
      :image-container="imageContainer"
      :is-loading="isUploading"
    />
    
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

/* 语言切换按钮 */
.language-toggle {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #667eea;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.language-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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
