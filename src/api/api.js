import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY':
        //prompt('введите API-KEY: 6f64cf5a-ac39-4bb3-b8f0-ac9bfff85905')
        '6f64cf5a-ac39-4bb3-b8f0-ac9bfff85905'
            // '5160903f-9c0d-4410-9648-4f4d38fe0254'
    },
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`Users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            })
    },

    postFollow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },

    deleteFollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    }

}

export const authAPI = {
    checkMyAuth() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    },

    login(loginData) {
        return instance.post(`auth/login`, loginData)
            .then(response => {
                return response.data;
            })
    },

    logout() {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data;
            })
    }
}

export const profileAPI = {


    async getUserInfo(userId) {
        let response = await instance.get(`profile/${userId}`);
        return response.data;
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },

    putStatus(status) {
        return instance.put(`profile/status`, { status: status })
            .then(response => {
                return response.data;
            })
    },

    putUserInfo(data) {
        return instance.put(`profile`, data)
            .then(response => {
                return response;
            })
    },

    savePhoto(file) {
        const formData = new FormData(); //создфем объект и запихиваем туда пришедший файл
        formData.append('image', file);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const securityAPI = {

    async getCaptcha() {
        const response = await instance.get('security/get-captcha-url');
        return response.data;
    }
}

export const dialogsAPI = {

    async startDialog(userId) { // start dialog with any users
        const response = await instance.put(`dialogs/${userId}`);
        return response;
    },

    async getAllDialogs() { // get all dialogs
        const response = await instance.get(`dialogs`);
        return response;
    },

    async getMessagesList(userId) { // get  messages list with current user
        const response = await instance.get(`dialogs/${userId}/messages`);
        return response;
    },

    sendMessage(userId, message) { // send message to your current user
        return instance.post(`dialogs/${userId}/messages`, { body: message })
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            })
    },

    async viewedMessage(messageId) { // make current message viewed
        const response = await instance.get(`dialogs/messages/${messageId}/viewed`);
        return response;
    },

    async countNewMessage() { // count of new messages
        const response = await instance.get(`dialogs/messages/new/count`);
        return response;
    },

    async returnNewMessage(userId, date) { // return messages newer than date
        const response = await instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`);
        return response;
    },



    // async postMessageToSpam(messageId) { // send current message to spam
    //     const response = await instance.post(`dialogs/messages/${messageId}/spam`);
    //     return response;
    // },

    // async deleteMessage(messageId) { // delete current message for owner only
    //     const response = await instance.delete(`dialogs/messages/${messageId}`);
    //     return response;
    // },

    // async restoreMessage(messageId) { // restore from deleted and spam current message
    //     const response = await instance.put(`dialogs/messages/${messageId}/restore`);
    //     return response;
    // },

    // async returnNewMessage(userId, date) { // return messages newer than date
    //     const response = await instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`);
    //     return response;
    // },



}