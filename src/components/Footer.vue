<script setup lang="ts">
// Footer组件 - 显示页面底部信息
</script>

<template>
  <!-- 页脚信息 -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img src="/logo.png" alt="千幻图卡" />
      </div>
      <div class="footer-info">
        <p class="footer-title">千幻图卡</p>
        <div class="footer-links">
          <a href="https://image.hao430.xyz" target="_blank">域名：image.hao430.xyz</a>
          <a href="mailto:fervent430@163.com">邮箱：fervent430@163.com</a>
          <span>微信：wx2094411638</span>
          <a href="https://github.com/hao430" target="_blank">GitHub：github.com/hao430</a>
          <a href="https://github.com/hao430/image-display" target="_blank">项目仓库：image-display</a>
          <a href="mailto:fervent430@163.com">技术支持：fervent430@163.com</a>
        </div>
        <div class="footer-icp">
          <a href="http://beian.miit.gov.cn" target="_blank">湘ICP备2025125191号</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* 页脚样式 */
.footer {
  margin-top: 40px;
  padding: 30px 20px;
  width: 100%;
  max-width: 800px;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.footer-logo img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.footer-title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
  justify-content: center;
  font-size: 14px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #ffffff;
  text-decoration: underline;
}

.footer-links span {
  color: rgba(255, 255, 255, 0.8);
}

.footer-icp {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer {
    padding: 20px 15px;
  }
  
  .footer-logo img {
    width: 50px;
    height: 50px;
  }
  
  .footer-links {
    font-size: 13px;
    gap: 10px 15px;
  }
}

@media (max-width: 480px) {
  .footer-title {
    font-size: 16px;
  }
  
  .footer-links {
    font-size: 12px;
    gap: 8px 12px;
    flex-direction: column;
    align-items: center;
  }
  
  .footer-links a,
  .footer-links span {
    display: block;
  }
}
</style>