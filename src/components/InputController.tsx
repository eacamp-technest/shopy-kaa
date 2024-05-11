import React from 'react';
import {Control, Controller, ControllerProps} from 'react-hook-form';
import {IInput, Input} from './TextFields';

interface IInputController extends IInput, Partial<ControllerProps> {
  control?: any;
  disabledControl?: boolean;
  errorMessage?: string;
}

export const InputController: React.FC<IInputController> = ({
  name,
  control,
  defaultValue,
  rules,
  disabled,
  disabledControl,
  errorMessage,
  ...inputProps
}) => {
  return (
    <Controller
      disabled={disabledControl}
      control={control}
      name={name as string}
      rules={rules}
      defaultValue={defaultValue}
      render={({field, fieldState: {error}}) => (
        <Input
          disabled={disabled}
          setValue={field.onChange}
          value={field.value}
          onBlur={field.onBlur}
          errorMessage={error?.message || errorMessage}
          {...inputProps}
        />
      )}
    />
  );
};
