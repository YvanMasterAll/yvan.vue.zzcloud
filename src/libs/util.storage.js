/// 本地存储

const storage = {} 

storage.setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

storage.getStore = name => {
    if (!name) return
    return window.localStorage.getItem(name)
}

export default storage