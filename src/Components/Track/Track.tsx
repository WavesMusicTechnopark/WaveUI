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
import { IMenu } from '../../Interfaces/Menu/Menu';
import Menu from '../Menu/Menu';
import MenuItem from '../MenuItem/MenuItem';
import play from '../../Icons/Play/Play';
import ModalMenu from '../ModalMenu/ModalMenu';

type Playlist = {
  title: string;
  handler: (_e: MouseEvent) => void;
};

export type TrackVisual = 'default' | 'playing' | 'paused';

export interface TrackProps {
  cover: string;
  title: VDom.VirtualElement | string;
  artist?: VDom.VirtualElement | string;
  visual?: TrackVisual;
  compact?: boolean;
  useModalMenu?: boolean;
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
  onResume?: (_e: MouseEvent) => void;
  onPause?: (_e: MouseEvent) => void;
  onCreatePlaylist?: (_e: MouseEvent) => void;
  artistWrapper?: (_n: VDom.VirtualElement) => VDom.VirtualElement;
  albumWrapper?: (_n: VDom.VirtualElement) => VDom.VirtualElement;
  playlists?: Playlist[];
  modalWrapper?: (_v: VDom.VirtualElement) => VDom.VirtualElement;
  menuExtension?: Array<{
    before: VDom.VirtualElement;
    name: string;
    action: () => void;
  }>;
}

const defaultWrapper = (n: VDom.VirtualElement) => n;

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

const resolveVisual = (visual?: TrackVisual): string => {
  switch (visual) {
    case 'paused':
      return 'waveuiTrack_paused';
    case 'playing':
      return 'waveuiTrack_playing';
    case 'default':
    default:
      return '';
  }
}

export default class Track extends VDom.Component<TrackProps, TrackState> {
  state = {
    isHover: false,
  }

  private menuRef = new VDom.Ref<IMenu>();

  private playlistsMenuRef = new VDom.Ref<IMenu>();

  private menuButtonRef = new VDom.Ref<HTMLElement>();

  private menuWrapperRef = new VDom.Ref<HTMLElement>();

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
      visual,
      onClick,
      onLike,
      onUnlike,
      onMenu,
      onPlay,
      onResume,
      onPause,
      useModalMenu,
    } = this.props;

    const { instance: menu } = this.menuRef;
    const { instance: menuButton } = this.menuButtonRef;
    const { instance: menuWrapper } = this.menuWrapperRef;
    const likeButton: HTMLElement = (this.likeButtonRef.instance as any)?.rootDOM;

    onClick?.(e);

    if (e.target instanceof HTMLElement) {
      if (likeButton?.contains(e.target)) {
        if (liked) {
          onUnlike?.(e);
        } else {
          onLike?.(e);
        }
      } else if (menuWrapper.contains(e.target)) {
        onMenu?.(e);
        if (menuButton.contains(e.target)) {
          menu.toggle();
        }
      } else {
        switch (visual) {
          case 'playing':
            onPause?.(e);
            break;
          case 'paused':
            onResume?.(e);
            break;
          case 'default':
          default:
            onPlay?.(e);
            break;
        }
      }
    }
  }

  getPrepend = (): VDom.VirtualElement | string => {
    const {
      visual,
      num,
    } = this.props;

    const {
      isHover
    } = this.state;

    if (visual === 'playing') {
      if (isHover) {
        return <PauseIcon class="waveuiTrack__icon" />
      } else {
        return <Pulsar class="waveuiTrack__pulsar" />
      }
    } else {
      if (isHover) {
        return <PlayIcon class="waveuiTrack__icon" />
      } else if (visual === 'paused') {
        return <PauseIcon class="waveuiTrack__icon" />
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

  onPlaylistsItemClick = (_e: MouseEvent): void => {
    this.playlistsMenuRef.instance.open();
  }

  render(): VDom.VirtualElement {
    const classes = ['waveuiTrack'];

    const {
      cover,
      title,
      artist,
      visual,
      num,
      compact,
      useModalMenu,
      listened,
      duration,
      hideControls,
      liked,
      playlists,
      onLike,
      onUnlike,
      onCreatePlaylist,
      menuExtension,
      modalWrapper = defaultWrapper,
      albumWrapper = defaultWrapper,
      artistWrapper = defaultWrapper,
    } =  this.props;

    classes.push(resolveVisual(visual));

    if (hideControls) {
      classes.push('waveuiTrack_sneaky');
    }
    if (liked) {
      classes.push('waveuiTrack_liked');
    }

    const menuItemSize = useModalMenu ? 'l' : 's';
    const MenuComponent = useModalMenu ? ModalMenu : Menu;
    const additionalMenuProps = useModalMenu ? {
      wrapper: modalWrapper,
    } : {};

    return (
      <div
        class={`${classes.join(' ')}`}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={this.clickHandler}
      >
        <Caption
          size="l"
          class="waveuiTrack__prepend"
        >
          {this.getPrepend()}
        </Caption>
        <img src={cover} class="waveuiTrack__cover" alt="TrackCover" />
        <div class="waveuiTrack__captions">
          <Caption
            align="left"
            size="s"
            class="waveuiTrack__title"
          >
            {title}
          </Caption>
          {artist && (
            <Caption
              align="left"
              size="s"
              class="waveuiTrack__artist"
            >
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
          ref={this.menuWrapperRef}
          class="waveuiTrack__menu"
        >
          <div class="waveuiTrack__menu__icon waveuiTrack__hidden">
            <MenuHorizontalIcon class={compact ? 'waveuiTrack__menu__icon_vertical' : ''}/>
          </div>
          <div
            ref={this.menuButtonRef}
            class="waveuiTrack__menu__clickable"
          />
          <MenuComponent
            {...additionalMenuProps}
            ref={this.menuRef}
          >
            {
              liked
              ? (
                  <MenuItem
                    size={menuItemSize}
                    closeOnClick
                    onClick={onUnlike}
                    before={<LikeFilledIcon style={{ height: '35%' }}/>}
                  >
                    Remove from favorites
                  </MenuItem>
                )
              : (
                  <MenuItem
                    size={menuItemSize}
                    closeOnClick
                    onClick={onLike}
                    before={<LikeEmptyIcon style={{ height: '35%' }}/>}
                  >
                    Add to favorites
                  </MenuItem>
                )
            }
            <div>
              <MenuItem
                size={menuItemSize}
                onMouseEnter={!useModalMenu ? this.onPlaylistsItemEnter : undefined}
                onMouseLeave={!useModalMenu ? this.onPlaylistsItemLeave : undefined}
                onClick={useModalMenu ? this.onPlaylistsItemClick : undefined}
                before={<AddPlaylistIcon style={{ height: '45%' }}/>}
                submenu={
                  <MenuComponent
                    scrollable
                    pos="end"
                    side="left"
                    ref={this.playlistsMenuRef}
                  >
                    <MenuItem
                      size={menuItemSize}
                      closeOnClick={-1}
                      before={<PlusIcon style={{ height: '35%' }}/>}
                      onClick={onCreatePlaylist}
                    >
                      Create new playlist
                    </MenuItem>
                    {playlists?.map((playlist) => (
                      <MenuItem
                        closeOnClick={-1}
                        size={menuItemSize}
                        before={<PlaylistIcon style={{ height: '45%' }}/>}
                        onClick={playlist.handler}
                      >
                        {playlist.title}
                      </MenuItem>
                    ))}
                  </MenuComponent>
                }
              >
                Add to playlist
              </MenuItem>
            </div>
            {artistWrapper(
              <MenuItem
                size={menuItemSize}
                closeOnClick
                before={<SingerRightIcon style={{ height: '35%' }}/>}
              >
                Go to artist
              </MenuItem>
            )}
            {albumWrapper(
              <MenuItem
                size={menuItemSize}
                closeOnClick
                before={<AlbumIcon style={{ height: '35%' }}/>}
              >
                Go to album
              </MenuItem>
            )}
            {menuExtension?.map((item) => (
              <MenuItem
                size={menuItemSize}
                closeOnClick
                before={item.before}
                onClick={item.action}
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuComponent>
        </div>
      </div>
    );
  }
}
