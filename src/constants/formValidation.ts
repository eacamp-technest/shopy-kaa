import { RegisterOptions } from 'react-hook-form';
import { Regexs } from './regexs';

export class FormValidate {
    public static fullName = {
        required: {
            message: 'Full Name is required',
            value: true,
        },
        pattern: {
            value: Regexs.fullName,
            message: 'Full Name is not valid',
        },
    } as RegisterOptions;

    public static email = {
        required: {
            message: 'Email is required',
            value: true,
        },
        pattern: {
            value: Regexs.email,
            message: 'Email is not valid',
        },
    } as RegisterOptions;

    public static password = {
        required: {
            message: 'Password is required',
            value: true,
        },
        pattern: {
            value: Regexs.password,
            message: 'Password is not valid',
        },
    } as RegisterOptions;
}