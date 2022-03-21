import { Dialog } from "quasar";

export function tokenError() {
    Dialog.create({
        title: 'Token Error',
        message: 'Please try refreshing page.'
    })
}

export function loginError() {
    Dialog.create({
        title: 'Login Error',
        message: 'Please login and refresh page.'
    })
}

export function browserError() {
    Dialog.create({
        title: 'Browser Error',
        message: 'Your browser is not supported.'
    })
}