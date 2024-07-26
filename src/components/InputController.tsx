import React, {useCallback} from 'react';
import {Control, Controller, ControllerProps} from 'react-hook-form';
import {IInput, Input} from './TextFields';
import {Manipulators} from 'utils/manipulator';

interface IInputController
  extends Omit<IInput, 'defaultValue'>,
    Partial<ControllerProps> {
  control?: any;
  disabledControl?: boolean;
  errorMessage?: string;
  manipulator?: 'cardNumber';
}

export const InputController: React.FC<IInputController> = ({
  name,
  control,
  defaultValue,
  rules,
  disabled,
  disabledControl,
  errorMessage,
  manipulator,
  maxLength,

  ...inputProps
}) => {
  const handleValueChange = useCallback(
    (value: string, onChange: (value: string) => void) => {
      if (manipulator === 'cardNumber') {
        onChange(Manipulators.cardNumber(value));
      } else {
        onChange(value);
      }
    },
    [manipulator],
  );
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
          maxLength={maxLength}
          setValue={value => handleValueChange(value, field.onChange)}
          value={field.value}
          onBlur={field.onBlur}
          errorMessage={error?.message || errorMessage}
          {...inputProps}
        />
      )}
    />
  );
};
