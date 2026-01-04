// 修改 src/App.vue
<script setup lang="ts">
// 导入Vue的响应式API
import { ref, computed } from 'vue'
// 导入i18n相关
import { useI18n } from 'vue-i18n'
import { changeLanguage } from './i18n'
// 导入组件
import ImageUploader from './components/ImageUploader.vue'
import GlassEffectDisplay from './components/GlassEffectDisplay.vue'
import FocusEffectDisplay from './components/FocusEffectDisplay.vue'
// 移除未使用的 DownloadButton 导入
import Footer from './components/Footer.vue'

// 使用i18n
const { t, locale } = useI18n()

// 响应式状态管理
const previewUrl = ref<string>('') // 图片预览URL
const isUploading = ref<boolean>(false) // 是否正在上传

// 移除未使用的 ref 声明
// const glassEffectRef = ref<any>(null)
// const focusEffectRef = ref<any>(null)

// 计算属性：是否显示效果组件
const showEffects = computed(() => {
  return !!previewUrl.value
})

// 切换语言
const toggleLanguage = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  changeLanguage(newLocale as 'zh' | 'en')
}

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
    
    <!-- 图片展示区域：并列展示两种效果 -->
    <div v-if="showEffects" class="effects-container">
      <!-- 玻璃拟态效果 -->
      <div class="effect-item">
        <GlassEffectDisplay 
          :preview-url="previewUrl" 
        />
      </div>
      
      <!-- 主体突出效果 -->
      <div class="effect-item">
        <FocusEffectDisplay 
          :preview-url="previewUrl" 
        />
      </div>
    </div>
    
    <!-- 提示信息：当没有图片时显示 -->
    <div v-else class="hint-message">
      {{ t('app.pleaseUploadImage') }}
    </div>
    
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

/* 效果容器样式 */
.effects-container {
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  margin: 20px 0;
}

/* 单个效果项样式 */
.effect-item {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  .app-container {
    padding: 10px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .effects-container {
    gap: 20px;
  }
  
  .effect-item {
    min-width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 20px;
  }
  
  .effects-container {
    gap: 15px;
  }
}
</style>
