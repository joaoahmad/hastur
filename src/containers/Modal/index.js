import Modal from './Modal';
import Portal from './Portal';
import { modalEmitter } from './emitter';
import reducer from './redux';
import * as modalActions from './redux';

export { Modal, Portal, reducer, modalActions }
export default modalEmitter
