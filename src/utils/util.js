import { ElMessageBox, ElNotification } from 'element-plus'
import nProgress from 'nprogress'

// 提示
export function toast(message, type = 'success', dangerouslyUseHTMLString = false) {
  ElNotification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000
  })
}

export function showModel(content = '提示内容', title = '', type = 'warning') {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  })
}

// 显示全屏loading
export function showFullLoading() {
  nProgress.start()
}

// 隐藏全屏loading
export function hideFullLoading() {
  nProgress.done()
}
