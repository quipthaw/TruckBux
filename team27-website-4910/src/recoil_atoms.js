import {
    atom,
} from 'recoil';

//Context for the rest of the App
const localStorageEffect = key => ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};
const userType = atom({
    key: 'userType',
    default: '0',
    effects: [
        localStorageEffect('userType'),
    ]
});
const userName = atom({
    key: 'userName',
    default: '',
    effects: [
        localStorageEffect('userName'),
    ]
});
const userFName = atom({
    key: 'userFName',
    default: '',
    effects: [
        localStorageEffect('userFName'),
    ]
});
const userLName = atom({
    key: 'userLName',
    default: '',
    effects: [
        localStorageEffect('userLName'),
    ]
});
const userEmail = atom({
    key: 'userEmail',
    default: '',
    effects: [
        localStorageEffect('userEmail'),
    ]
});
const userBio = atom({
    key: 'userBio',
    default: '',
    effects: [
        localStorageEffect('userBio'),
    ]
});

export {
    userType,
    userName,
    userFName,
    userLName,
    userEmail,
    userBio,
};