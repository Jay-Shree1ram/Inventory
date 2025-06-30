export type ResourceFormState = {
  brand: string;
  model: string;
  specification: string;
  purchaseDate: string;
  warrantyExpiry: string;
  resourceTypeId: string;
  resourceClassId: string;
  resourceStatusId: string;
  batchId: string;
};


export type FormAction =
  | { type: 'UPDATE_FIELD'; field: keyof ResourceFormState; value: string }
  | { type: 'RESET' };


export const initialState: ResourceFormState = {
  brand: '',
  model: '',
  specification: '',
  purchaseDate: '',
  warrantyExpiry: '',
  resourceTypeId: '',
  resourceClassId: '',
  resourceStatusId: '',
  batchId: '',
};


export function formReducer(state: ResourceFormState, action: FormAction): ResourceFormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
