export type ResourceFormState = {

  resourceTypeId: string;
  quantity: string;
  description: string;
  isSubmitting: boolean;
};


export type FormAction =
  | { type: 'UPDATE_FIELD'; field: keyof Omit<ResourceFormState, 'errors' | 'isSubmitting'>; value: string }
  | { type: 'SET_SUBMITTING'; status: boolean }
  | { type: 'RESET' };


export const initialState: ResourceFormState = {

  resourceTypeId: '',
  quantity: '',
  description: '',
  isSubmitting: false
};


export function formReducer(
  state: ResourceFormState,
  action: FormAction
): ResourceFormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
   
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.status
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
