import { makeResetStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ToastBodySlots, ToastBodyState } from './ToastBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toastBodyClassNames: SlotClassNames<ToastBodySlots> = {
  root: 'fui-ToastBody',
  subtitle: 'fui-ToastBody__subtitle',
};

const useRootBaseClassName = makeResetStyles({
  gridColumnStart: 2,
  gridColumnEnd: 3,
  paddingTop: '6px',
  fontSize: tokens.fontSizeBase300,
  lineHeight: tokens.fontSizeBase300,
  fontWeight: tokens.fontWeightRegular,
});

const useSubtitleBaseClassName = makeResetStyles({
  paddingTop: '4px',
  gridColumnStart: 2,
  gridColumnEnd: 3,
  fontSize: tokens.fontSizeBase200,
  lineHeight: tokens.fontSizeBase200,
  fontWeight: tokens.fontWeightRegular,
  color: tokens.colorNeutralForeground2,
});

/**
 * Apply styling to the ToastBody slots based on the state
 */
export const useToastBodyStyles_unstable = (state: ToastBodyState): ToastBodyState => {
  const rootBaseClassName = useRootBaseClassName();
  const subtitleBaseClassName = useSubtitleBaseClassName();
  state.root.className = mergeClasses(toastBodyClassNames.root, rootBaseClassName, state.root.className);

  if (state.subtitle) {
    state.subtitle.className = mergeClasses(
      toastBodyClassNames.subtitle,
      subtitleBaseClassName,
      state.subtitle.className,
    );
  }

  return state;
};
