import { PostBridge } from '@kaokei/post-bridge';
import router from '../router';

import { message as antdMessage } from 'ant-design-vue';

const appName = 'demo-vue3';

PostBridge.registerMethods({
  replaceState(route = {}) {
    const path = route.path;
    // 这里需要/作为前缀
    const newPath = path[0] === '/' ? path : '/' + path;
    if (router.currentRoute.value.path !== newPath) {
      router.replace(newPath);
    }
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
    const route = router.resolve(to);
    return router.replace(to).then(
      () =>
        postBridge &&
        postBridge.call('pushState', {
          appName,
          path: route.href,
        }),
      err => {
        console.error('router.pushTopState: ', err);
      }
    );
  }
};

router.replaceTopState = to => {
  if (window.top === window.self) {
    return router.replace(to);
  } else {
    const route = router.resolve(to);
    return router.replace(to).then(
      () =>
        postBridge &&
        postBridge.call('replaceState', {
          appName,
          path: route.href,
        }),
      err => {
        console.error('router.replaceTopState: ', err);
      }
    );
  }
};

router.afterEach(() => {
  postBridge && postBridge.call('resetScroll');
});

function getPositive(num) {
  return num > 0 ? num : 0;
}

export function prepareIframe() {
  return postBridge.request('fixIframe').then(rect => {
    console.log('rect :>> ', rect);
    const realBottom = rect.viewHeight - rect.bottom;
    const realRight = rect.viewWidth - rect.right;
    const padding = `${getPositive(rect.top)}px ${getPositive(
      realRight
    )}px ${getPositive(realBottom)}px ${getPositive(rect.left)}px`;
    console.log('padding :>> ', padding);
    document.body.style.padding = padding;
    document.body.style.backgroundColor = 'transparent';
  });
}

export function resetIframe() {
  return postBridge.request('unfixIframe').then(() => {
    document.body.style.padding = '0px';
    document.body.style.backgroundColor = '#fff';
  });
}
