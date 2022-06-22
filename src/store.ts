import { init, RematchRootState } from '@rematch/core'
import { createLogger } from 'redux-logger'
import immer from '@rematch/immer'
import { models, RootModel } from './models/rootModels'

console.log(`
  ***********************************
                                               
      S t a r t i n g           
    
    B I N G O   O A S I S  P I L A R 

  ************************************

  `)

const logger = createLogger({
  predicate: () => !!(window as any).stateLogging,
})

let immerInstance: any = immer
let middlewares = [logger]

export const store = init({ models, plugins: [immerInstance()], redux: { middlewares } })

// Export types
export type extractStateFromModel<a extends RootModel> = {
  [modelKey in keyof a]: a[modelKey]['state']
}
export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type ApplicationState = RematchRootState<typeof models>