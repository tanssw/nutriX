try {
    let data = localStorage.getItem('userData')
    window.ReactNativeWebView.postMessage(data)
} catch (error) {
    console.error(error)
}