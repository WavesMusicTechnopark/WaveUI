import VDom from '@rflban/vdom';
import TrackComponent from './Track';

export default {
  title: 'Components/Track',
  argTypes: {
    playing: {
      control: 'boolean',
    },
    compact: {
      control: 'boolean',
    },
    hideControls: {
      control: 'boolean',
    },
    liked: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
    onLike: {
      action: 'liked',
    },
    onUnlike: {
      action: 'unliked',
    },
    onMenu: {
      action: 'menu',
    },
    onPlay: {
      action: 'played',
    },
    onPause: {
      action: 'paused',
    },
    onCreatePlaylist: {
      action: 'playlist created',
    },
  },
}

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    cover: 'https://i1.sndcdn.com/artworks-000243880049-el1cla-t500x500.jpg',
    title: 'Спам',
    artist: (
      <a
        href="#"
        style={{
          ['text-decoration']: 'none',
          color: 'inherit',
        }}
      >
        Дайте танк (!)
      </a>
    ),
    num: +args.num,
    playing: args.playing,
    duration: +args.duration,
    listened: +args.listened,
    compact: args.compact,
    hideControls: args.hideControls,
    liked: args.liked,
    onClick: args.onClick,
    onLike: args.onLike,
    onUnlike: args.onUnlike,
    onMenu: args.onMenu,
    onPlay: args.onPlay,
    onPause: args.onPause,
    onCreatePlaylist: args.onCreatePlaylist,
    playlists: [
      { name: 'My first playlist', handler: (_e: MouseEvent): void => {} },
      { name: 'Study music', handler: (_e: MouseEvent): void => {} },
      { name: 'Workout', handler: (_e: MouseEvent): void => {} },
      { name: 'Party', handler: (_e: MouseEvent): void => {} },
      { name: 'Rock', handler: (_e: MouseEvent): void => {} },
      { name: 'R&B', handler: (_e: MouseEvent): void => {} },
      { name: 'Britpop', handler: (_e: MouseEvent): void => {} },
      { name: 'Rap', handler: (_e: MouseEvent): void => {} },
      { name: 'Newest', handler: (_e: MouseEvent): void => {} },
    ],
    albumWrapper: (n: VDom.VirtualElement) => (
      <a
        href="#"
        style={{
          ['text-decoration']: 'none',
          color: 'inherit',
        }}
      >
        {n}
      </a>
    ),
    artistWrapper: (n: VDom.VirtualElement) => (
      <a
        href="#"
        style={{
          ['text-decoration']: 'none',
          color: 'inherit',
        }}
      >
        {n}
      </a>
    ),
  }

  VDom.render(
    <TrackComponent {...props}/>,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
  num: 1,
  duration: 1,
  listened: 1,
  playing: false,
  compact: false,
  hideControls: false,
  liked: false,
}

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
}
