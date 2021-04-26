import 'iframe-resizer/js/iframeResizer.contentWindow';
import './utils/initPostBridge';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import {
  Menu,
  Tag,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Switch,
  Checkbox,
  Radio,
  Divider,
  Cascader,
  Spin,
  Pagination,
  Empty,
  Row,
  Col,
  Space,
  Modal,
  Dropdown,
  Progress,
  Table,
  Tabs,
  Breadcrumb,
  Typography,
  Result,
  AutoComplete,
  Upload,
  Popconfirm,
  Popover,
  ConfigProvider,
} from 'ant-design-vue';

const app = createApp(App);

[
  router,
  Menu,
  Tag,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Switch,
  Checkbox,
  Radio,
  Divider,
  Cascader,
  Spin,
  Pagination,
  Empty,
  Row,
  Col,
  Space,
  Modal,
  Dropdown,
  Progress,
  Table,
  Tabs,
  Breadcrumb,
  Typography,
  Result,
  AutoComplete,
  Upload,
  Popconfirm,
  Popover,
  ConfigProvider,
].forEach(item => app.use(item));

app.mount('#app');
