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

    public static cardNumber = {
        required: {
            message: 'CardNumber is required',
            value: true,
        },
        pattern: {
            value: Regexs.Visa_Master_Card,
            message: 'CardNumber is not valid',
        }
    } as RegisterOptions;

    public static holderName = {
        required: {
            message: 'HolderName is required',
            value: true,
        },
        pattern: {
            value: Regexs.holderName,
            message: 'HolderName is not valid',
        }
    } as RegisterOptions;

    public static cvv = {
        required: {
            message: 'CVV is required',
            value: true,
        },
        pattern: {
            value: /^[0-9]{3,4}$/,
            message: 'CVV is not valid',
            message: 'Card Number is required',
            value: true,
        },
        pattern: {
            value: Regexs.cardNumber,
            message: 'Card Number is not valid',
        },
    } as RegisterOptions;

    public static cardHolder = {
        required: {
            message: 'Card Holder is required',
            value: true,
        },
        pattern: {
            value: Regexs.cardHolder,
            message: 'Card Holder is not valid',
        },
    } as RegisterOptions;

    public static expirationDate = {
        required: {
            message: 'Expiration Date is required',
            value: true,
        },
        pattern: {
            value: Regexs.expirationDate,
            message: 'Expiration Date is not valid',
        },
    } as RegisterOptions;
}
