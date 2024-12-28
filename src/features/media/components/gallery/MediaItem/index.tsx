import React from 'react';
import { MediaItemProps } from '../../../types';
import { MediaItemContainer } from './MediaItemContainer';
import { MediaContent } from './MediaContent';
import { MediaInfo } from './MediaInfo';

export const MediaItem: React.FC<MediaItemProps> = ({ item }) => (
  <MediaItemContainer>
    <MediaContent item={item} />
    <MediaInfo item={item} />
  </MediaItemContainer>
);