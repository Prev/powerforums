import { reducer as formReducer } from 'redux-form';
import { reducer as modalReducer } from 'redux-modal';
import { loadingBarReducer } from 'react-redux-loading-bar';

import {loginReducer} from './containers/Login/reducer';
import {nodeViewReducer} from './containers/NodeView/reducer';
import {nodeEditorReducer} from './containers/NodeEditor/reducer';
import {signUpReducer} from './containers/SignUp/reducer';

const allReducers = {
    modal: modalReducer,
    form: formReducer,
    loadingBar: loadingBarReducer,
    login: loginReducer,
    nodeView: nodeViewReducer,
    nodeEditor: nodeEditorReducer,
    signUp: signUpReducer,
};
export default allReducers;