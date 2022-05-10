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
  MenuVerticalIcon, AddPlaylistIcon, SingerRightIcon, AlbumIcon, PlusIcon, PlaylistIcon,
} from '../../Icons';
import Pulsar from '../Pulsar/Pulsar';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem/MenuItem';
import play from '../../Icons/Play/Play';

type Playlist = {
  name: string;
  handler: (_e: MouseEvent) => void;
};

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
  onCreatePlaylist?: (_e: MouseEvent) => void;
  artistWrapper?: (_n: VDom.VirtualElement) => VDom.VirtualElement;
  albumWrapper?: (_n: VDom.VirtualElement) => VDom.VirtualElement;
  playlists?: Playlist[];
}

const defaultWrapper = (n: VDom.VirtualElement) => VDom.VirtualElement;

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

  private menuRef = new VDom.Ref<Menu>();

  private playlistsMenuRef = new VDom.Ref<Menu>();

  private menuButtonRef = new VDom.Ref<HTMLElement>();

  private likeButtonRef = new VDom.Ref();

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

    const { instance: menu } = this.menuRef;
    const { instance: menuButton } = this.menuButtonRef;
    const likeButton: HTMLElement = (this.likeButtonRef.instance as any)?.rootDOM;

    onClick?.(e);

    if (e.target instanceof HTMLElement) {
      if (likeButton?.contains(e.target)) {
        if (liked) {
          onUnlike?.(e);
        } else {
          onLike?.(e);
        }
      } else if (menuButton.contains(e.target)) {
        onMenu?.(e);
        if (!menu.rootDOM.contains(e.target)) {
          menu.toggle();
        }
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

  onPlaylistsItemEnter = (_e: MouseEvent): void => {
    this.playlistsMenuRef.instance.open();
  }

  onPlaylistsItemLeave = (_e: MouseEvent): void => {
    this.playlistsMenuRef.instance.close();
  }

  onMenuBlur = (e: MouseEvent): void => {
    const { instance: menu } = this.menuRef;

    if (!(e.currentTarget as Node).contains(e.relatedTarget as Node)) {
      menu.close();
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
      playlists,
      onLike,
      onUnlike,
      onCreatePlaylist,
      albumWrapper = defaultWrapper,
      artistWrapper = defaultWrapper,
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
            <LikeFilledIcon
              ref={this.likeButtonRef}
              class={`waveuiTrack__like ${liked ? '' : 'waveuiTrack__hidden'}`}
            />
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
        <div
          ref={this.menuButtonRef}
          class="waveuiTrack__menu waveuiTrack__hidden"
          onBlur={this.onMenuBlur}
          tabindex="-1"
        >
          <div class="waveuiTrack__menu__icon">
            <MenuHorizontalIcon class={compact ? 'waveuiTrack__menu__icon_vertical' : ''}/>
          </div>
          <Menu ref={this.menuRef}>
            {
              liked
              ? (
                  <MenuItem
                    blurOnClick
                    onClick={onUnlike}
                    before={<LikeFilledIcon style={{ height: '35%' }}/>}
                  >
                    Remove from favorites
                  </MenuItem>
                )
              : (
                  <MenuItem
                    blurOnClick
                    onClick={onLike}
                    before={<LikeEmptyIcon style={{ height: '35%' }}/>}
                  >
                    Add to favorites
                  </MenuItem>
                )
            }
            <div>
              <MenuItem
                onMouseEnter={this.onPlaylistsItemEnter}
                onMouseLeave={this.onPlaylistsItemLeave}
                before={<AddPlaylistIcon style={{ height: '45%' }}/>}
                submenu={
                  <Menu
                    scrollable
                    pos="end"
                    side="left"
                    ref={this.playlistsMenuRef}
                  >
                    <MenuItem
                      blurOnClick
                      before={<PlusIcon style={{ height: '35%' }}/>}
                      onClick={onCreatePlaylist}
                    >
                      Create new playlist
                    </MenuItem>
                    {playlists?.map((playlist) => (
                      <MenuItem
                        blurOnClick
                        before={<PlaylistIcon style={{ height: '45%' }}/>}
                        onClick={playlist.handler}
                      >
                        {playlist.name}
                      </MenuItem>
                    ))}
                  </Menu>
                }
              >
                Add to playlist
              </MenuItem>
            </div>
            {artistWrapper(
              <MenuItem
                blurOnClick
                before={<SingerRightIcon style={{ height: '35%' }}/>}
              >
                Go to artist
              </MenuItem>
            )}
            {albumWrapper(
              <MenuItem
                blurOnClick
                before={<AlbumIcon style={{ height: '35%' }}/>}
              >
                Go to album
              </MenuItem>
            )}
          </Menu>
        </div>
      </div>
    );
  }
}
