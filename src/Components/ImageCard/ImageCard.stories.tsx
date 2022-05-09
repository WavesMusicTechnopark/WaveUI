import VDom from '@rflban/vdom';
import ImageCard from './ImageCard';
import { AlbumIcon, SingerRightIcon } from '../../Icons';

export default {
  title: 'Components/ImageCard',
  argTypes: {
    icon: {
      control: 'boolean',
    },
    rounded: {
      control: 'boolean',
    },
    direction: {
      control: 'select',
      options: ['row', 'column'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
    },
  }
}

const Template = (icon: any, args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    imageWrapper: (image: VDom.VirtualElement) => (
      <a
        href="#"
        style={{
          ['text-decoration']: 'none',
          color: 'inherit',
        }}
      >
        {image}
      </a>
    ),
    align: args.align,
    direction: args.direction,
    size: args.size,
    src: args.src,
    icon: args.icon && icon,
    rounded: args.rounded,
    title: (
      <a
        href="#"
        style={{
          ['text-decoration']: 'none',
          color: 'inherit',
        }}
      >
        {args.title}
      </a>
    ),
    label: args.label,
  };

  VDom.render(
    <ImageCard {...props}/>,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
  icon: true,
  direction: 'column',
}

export const WithoutLabel = Template.bind({}, (<SingerRightIcon style={{height: '25%'}}/>));
WithoutLabel.args = {
  src: 'https://www.kendricklamar.com/sites/g/files/aaj321/f/styles/suzuki_breakpoints_image_mobile-lg_sq/public/photo/201707/13/19955250_2359106054314953_8557416230665846784_n.jpg?itok=eME9LuIE',
  title: 'Kendrick Lamar',
  rounded: true,
  align: 'center',
  size: 'm',
  ...defaultArgs,
}

export const WithLabel = Template.bind({}, (<AlbumIcon style={{height: '25%'}}/>));
WithLabel.args = {
  src: 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png',
  title: 'Damn.',
  label: 'Kendrick Lamar',
  rounded: false,
  align: 'left',
  size: 'l',
  ...defaultArgs,
}
