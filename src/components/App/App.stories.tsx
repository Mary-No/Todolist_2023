import React from "react";
import {action} from '@storybook/addon-actions'
import App from "./App";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";


export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}
export const AppWithReduxBaseExample = () => {
    return <App demo={true}/>
}