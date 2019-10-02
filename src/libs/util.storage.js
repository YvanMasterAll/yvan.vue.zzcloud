/// 本地存储

export const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
}

export const getStore = name => {
    if (!name) return
    return window.localStorage.getItem(name)
}

/// 本地环境

// class Env {
//     constructor() {

//     }

//     setUser(data) {
//         setStore('user', data)
//     }

//     getUser() {
//         return JSON.parse(getStore('user'))
//     }
// }

// export const env = new Env()