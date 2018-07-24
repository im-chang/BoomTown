import { combineReducers } from 'redux';
import ShareItemPreviewReducer from './ShareItemPreview';

export default combineReducers({
    shareItemPreview: ShareItemPreviewReducer,
})