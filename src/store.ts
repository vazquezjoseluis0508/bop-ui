import { init, RematchRootState } from "@rematch/core";
import { createLogger } from "redux-logger";
import { models, RootModel } from "./models/rootModels";

console.log(`
  ***********************************
                                               
           S t a r t i n g         
    
    B I N G O   O A S I S  P I L A R 

  ************************************

  `);

const logger = createLogger({
  predicate: () => !!(window as any).stateLogging,
});

let middlewares = [logger];

export const store = init({
  models,
  plugins: [],
  redux: { middlewares },
});

// Export types
export type extractStateFromModel<a extends RootModel> = {
  [modelKey in keyof a]: a[modelKey]["state"];
};
export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type ApplicationState = RematchRootState<typeof models>;
