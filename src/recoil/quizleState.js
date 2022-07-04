import {atom} from "recoil";

export const quizleState = atom(
    {
        key: 'quizleState',
        default: []
    }
);

export const useForm = atom(
    {
        key: 'formState',
        default: {category: '', question: ''}
    }
);