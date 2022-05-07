import VDom from '@rflban/vdom';
import HorizontalScroll from './HorizontalScroll';
import ImageCard from '../ImageCard/ImageCard';

export default {
  title: 'Components/HorizontalScroll',
  argTypes: {
  }
}

const Template = (items: any, args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    controlsCenterOffset: args.controlsCenterOffset,
    scrollStep: args.scrollStep,
    gap: args.gap,
  };

  VDom.render(
    (
      <HorizontalScroll {...props}>
        {items}
      </HorizontalScroll>
    ),
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
};

const albums = [];
for (let i = 0; i < 20; ++i) {
  albums.push(
    <ImageCard
      src="https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png"
      title="Damn."
      label="Kendrick Lamar"
      size="l"
    />
  );
}

export const Albums = Template.bind({}, albums);
Albums.args = {
  controlsCenterOffset: 41,
  scrollStep: 180,
  gap: 20,
  ...defaultArgs,
}
