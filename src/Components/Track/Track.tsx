import VDom from '@rflban/vdom';
import ImageButton from '../ImageButton/ImageButton';
import Caption from '../Caption/Caption';
import {
  LikeEmptyIcon,
  LikeFilledIcon,
  LogoIcon,
  PauseIcon,
  PlayIcon,
  MenuHorizontalIcon,
  MenuVerticalIcon,
} from '../../Icons';
import Pulsar from '../Pulsar/Pulsar';

export interface TrackProps {
  cover: string;
  title: VDom.VirtualElement | string;
  artist?: VDom.VirtualElement | string;
  playing?: boolean;
  compact?: boolean;
  num?: number;
  hideControls?: boolean;
  liked?: boolean;
  duration: number;
  listened: number;
  onClick?: (_e: MouseEvent) => void;
  onLike?: (_e: MouseEvent) => void;
  onUnlike?: (_e: MouseEvent) => void;
  onMenu?: (_e: MouseEvent) => void;
  onPlay?: (_e: MouseEvent) => void;
  onPause?: (_e: MouseEvent) => void;
}

interface TrackState {
  isHover: boolean;
}

const resolveDuration = (duration: number): string => {
  if (duration < 0) {
    return '-';
  }

  const seconds = duration % 60;
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 60 / 60);

  if (hours > 9) {
    return '>9:59:59';
  }

  const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (hours > 0) {
    return `${hours}:${formatted}`;
  }

  return formatted;
}

const resolveListened = (listened: number): string => {
  if (listened < 0) {
    return '-';
  }
  if (listened > 999_999_999) {
    return '>999 999 999';
  }

  return listened.toString();
}

export default class Track extends VDom.Component<TrackProps, TrackState> {
  state = {
    isHover: false,
  }

  mouseEnter = (_e: Event) => {
    this.setState({
      isHover: true,
    });
  }

  mouseLeave = (_e: Event) => {
    this.setState({
      isHover: false,
    });
  }

  clickHandler = (e: MouseEvent) => {
    const {
      liked,
      playing,
      onClick,
      onLike,
      onUnlike,
      onMenu,
      onPlay,
      onPause,
    } = this.props;

    onClick?.(e);

    const likeElement = (e.currentTarget as HTMLElement)
      .querySelector('.waveuiTrack__like');
    const menuElement = (e.currentTarget as HTMLElement)
      .querySelector('.waveuiTrack__menu');

    if (e.target instanceof HTMLElement) {
      if (likeElement?.contains(e.target)) {
        if (liked) {
          onUnlike?.(e);
        } else {
          onLike?.(e);
        }
      } else if (menuElement?.contains(e.target)) {
        console.log(e.target.getBoundingClientRect());
        onMenu?.(e);
      } else {
        if (playing) {
          onPause?.(e);
        } else {
          onPlay?.(e);
        }
      }
    }
  }

  getPrepend = (): VDom.VirtualElement | string => {
    const {
      playing,
      num,
    } = this.props;

    const {
      isHover
    } = this.state;

    if (playing) {
      if (isHover) {
        return <PauseIcon class="waveuiTrack__icon" />
      } else {
        return <Pulsar class="waveuiTrack__pulsar" />
      }
    } else {
      if (isHover) {
        return <PlayIcon class="waveuiTrack__icon" />
      } else {
        if (num && num <= 99 && num >= 0) {
          return num.toString().padStart(2, '0');
        } else {
          return <LogoIcon class="waveuiTrack__icon" />
        }
      }
    }
  }

  render(): VDom.VirtualElement {
    const classes = ['waveuiTrack'];

    const {
      cover,
      title,
      artist,
      playing,
      num,
      compact,
      listened,
      duration,
      hideControls,
      liked,
    } =  this.props;

    if (playing) {
      classes.push('waveuiTrack_playing');
    }
    if (hideControls) {
      classes.push('waveuiTrack_sneaky');
    }
    if (liked) {
      classes.push('waveuiTrack_liked');
    }

    return (
      <div
        class={`${classes.join(' ')}`}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={this.clickHandler}
      >
        <Caption size="l" class="waveuiTrack__prepend">
          {this.getPrepend()}
        </Caption>
        <img src={cover} class="waveuiTrack__cover" alt="TrackCover" />
        <div class="waveuiTrack__captions">
          <Caption size="s" class="waveuiTrack__title">
            {title}
          </Caption>
          {artist && (
            <Caption size="s" class="waveuiTrack__artist">
              {artist}
            </Caption>
          )}
        </div>
        {!compact && (
            <LikeFilledIcon class={`waveuiTrack__like ${liked ? '' : 'waveuiTrack__hidden'}`} />
        )}
        {!compact && (
          <Caption class="waveuiTrack__listened" size="s">
            {resolveListened(listened)}
          </Caption>
        )}
        {!compact && (
          <Caption class="waveuiTrack__duration" size="s">
            {resolveDuration(duration)}
          </Caption>
        )}
        <div class="waveuiTrack__menu waveuiTrack__hidden">
          <div class="waveuiTrack__menu__icon">
            <MenuHorizontalIcon class={compact ? 'waveuiTrack__menu__icon_vertical' : ''}/>
          </div>
        </div>
      </div>
    );
  }
}
