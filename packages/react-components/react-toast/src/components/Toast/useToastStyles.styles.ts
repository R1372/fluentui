import { makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ToastSlots, ToastState } from './Toast.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toastClassNames: SlotClassNames<ToastSlots> = {
  root: 'fui-Toast',
};

const useRootBaseClassName = makeResetStyles({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  ...shorthands.padding('12px', '12px'),
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
  boxShadow: tokens.shadow8,
  fontSize: tokens.fontSizeBase300,
  lineHeight: '20px',
  fontWeight: tokens.fontWeightSemibold,
  color: tokens.colorNeutralForeground1,
  backgroundColor: tokens.colorNeutralBackground1,
});

/**
 * Apply styling to the Toast slots based on the state
 */
export const useToastStyles_unstable = (state: ToastState): ToastState => {
  const rootBaseClassName = useRootBaseClassName();
  state.root.className = mergeClasses(toastClassNames.root, rootBaseClassName, state.root.className);

  return state;
};
