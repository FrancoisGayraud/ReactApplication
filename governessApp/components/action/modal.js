import {MODAL_VISIBLE} from './actionList';

export function modalIsVisible(bool) {
  return {
    type: MODAL_VISIBLE,
    isVisible: bool
  };
}
