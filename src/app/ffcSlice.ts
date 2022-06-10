import ffcClient from 'ffc-js-client-side-sdk';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, store } from './store';
import { IFeatureFlag, IFeatureFlagChange, IOption, IVariationOption } from 'ffc-js-client-side-sdk/esm/types';

import { flagsDefaultValues, option } from './ffcConfig';

export interface FfcState {
    flags: {[key: string]: string};
}

const initialState: FfcState = {
    flags: {}
};

export const ffcSlice = createSlice({
    name: 'ffc',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      // Use the PayloadAction type to declare the contents of `action.payload`
      updateFfcFlags: (state, action: PayloadAction<{[key: string]: string}>) => {
        const flags = new Proxy({}, {
            get(target, prop: string, receiver) {
              if (typeof prop === 'symbol') {
                return;
              }
                
              return ffcClient.variation(prop, flagsDefaultValues[prop] || ''); 
            }
          })
        
        state.flags = flags;
      }
    }
  });

const { updateFfcFlags } = ffcSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectFfc = (state: RootState) => state.ffc.flags;

const _option: IOption = Object.assign(
  { 
    anonymous: true, 
    enableDataSync: true,
    bootstrap: Object.keys(flagsDefaultValues).map(k => ({
      id: k,
      variation: flagsDefaultValues[k],
      variationOptions: [] as IVariationOption[]
    })) as IFeatureFlag[]
  }, 
  option || {}
);
  
ffcClient.init(_option);

ffcClient.on('ff_update', (changes: any[]) => {
  if (changes.length > 0){
    store.dispatch(updateFfcFlags({}));
  }
});

ffcClient.waitUntilReady().then((data: any[]) => {
  if (data.length) {
    store.dispatch(updateFfcFlags({}));
  }
});


export default ffcSlice.reducer;

