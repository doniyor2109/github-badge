// ADD_BADGE

export const ADD_BADGE = 'ADD_BADGE';

export function addBadgeMessage(id) {
  return { type: ADD_BADGE, id };
}

// REMOVE_BADGE

export const REMOVE_BADGE = 'REMOVE_BADGE';

export function removeBadgeMessage(id) {
  return { type: REMOVE_BADGE, id };
}
