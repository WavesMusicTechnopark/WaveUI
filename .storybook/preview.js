import VDom from '@rflban/vdom';
import '../src/index.scss';
import '../src/tokens/default-dark.css';
import { addDecorator } from '@storybook/html';

addDecorator((storyFunc) => {
  document.querySelectorAll('.waveuiModalDisplayer__root')
    .forEach((root) => {
      root.componentsContainer[0].props.parent.willUmount();
    });
  return storyFunc();
})

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#0B1220'
      }
    ],
  },
}
