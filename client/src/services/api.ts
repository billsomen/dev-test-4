import axios from 'axios';
import { User } from '../utils/types';

const base_url = process.env.REACT_APP_SERVER_BASE_URL;

export function getActivity(id?: number): Promise<any> {
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'active-user': id || 0,
        }
    };

    return new Promise((resolve, reject) => {
        axios.get(`${base_url}/activity`, config)
            .then((result) => {
                resolve(result.data);
            })
            .catch((e) => {
                reject(e);
            })
    })
}

export function createUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.post(`${base_url}/user`, { ...user })
            .then((result) => {
                resolve(result.data);
            })
            .catch((e) => {
                reject(e.response?.data?.message);
            })
    })
}

export function getUserById(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
        axios.get(`${base_url}/user/${userId}`)
            .then((result) => {
                resolve(result.data);
            })
            .catch((e) => {
                reject(e.response?.data);
            })
    })
}