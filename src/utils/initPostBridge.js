import PostBridge from './postBridge';
import router from '../router';

import { RouteLocationRaw } from 'vue-router';
import { message as antdMessage } from 'ant-design-vue';

PostBridge.registerMethods({
  pushState(path = '') {
    // 这里需要/作为前缀
    const newPath = path[0] === '/' ? path : '/' + path;
    router.push(newPath);
  },
  replaceState(path = '') {
    // 这里需要/作为前缀
    const newPath = path[0] === '/' ? path : '/' + path;
    router.replace(newPath);
  },
  go(args) {
    router.go(args);
  },
});

PostBridge.start();

export const postBridge = new PostBridge(window.top);

export const message = {
  success(msg) {
    if (window.top === window.self) {
      antdMessage.success(msg);
    } else {
      postBridge.call('messageSuccess', msg);
    }
  },
  info(msg) {
    if (window.top === window.self) {
      antdMessage.info(msg);
    } else {
      postBridge.call('messageInfo', msg);
    }
  },
  warning(msg) {
    if (window.top === window.self) {
      antdMessage.warning(msg);
    } else {
      postBridge.call('messageWarning', msg);
    }
  },
  error(msg) {
    if (window.top === window.self) {
      antdMessage.error(msg);
    } else {
      postBridge.call('messageError', msg);
    }
  },
};

router.pushTopState = to => {
  if (window.top === window.self) {
    return router.push(to);
  } else {
    return Promise.resolve().then(
      () => postBridge && postBridge.call('pushState', to)
    );
  }
};

router.replaceTopState = to => {
  if (window.top === window.self) {
    return router.replace(to);
  } else {
    return Promise.resolve().then(
      () => postBridge && postBridge.call('replaceState', to)
    );
  }
};

router.afterEach(() => {
  postBridge && postBridge.call('resetScroll');
});
