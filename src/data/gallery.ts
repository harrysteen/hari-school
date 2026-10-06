// School photos and videos shown on /gallery (and the home page strip).
// shape: 'tall' = portrait, 'wide' = landscape.

export type GalleryPhoto = {
  type: 'photo';
  src: string;
  alt: string;
  shape: 'tall' | 'wide';
  album: string;
};

export type GalleryVideo = {
  type: 'video';
  src: string;      // full video with sound, played in the lightbox
  preview: string;  // short muted clip played on hover
  poster: string;   // still image shown before playing
  alt: string;
  shape: 'tall' | 'wide';
  album: string;
  duration: string;
};

export type GalleryItem = GalleryPhoto | GalleryVideo;

// Turns a Dropbox share link (…&dl=0) into a direct link a <video> tag can play
const dropbox = (shareUrl: string) => shareUrl.replace(/([?&])dl=0/, '$1raw=1');

export const ALBUMS = {
  freshers: 'Freshers Party 2026',
  campus: 'Campus Life',
} as const;

const photo = (n: number, shape: 'tall' | 'wide', alt: string, album: string): GalleryPhoto => ({
  type: 'photo',
  src: `/images/gallery/gallery-${n}.jpg`,
  shape,
  alt,
  album,
});

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    type: 'video',
    src: dropbox('https://www.dropbox.com/scl/fi/aldt9v2ihwi95lzwwh9nu/IMG_0432.MOV?rlkey=8or88mp7bytsexaewtjticej8&st=o77nabjq&dl=0'),
    preview: '/videos/freshers-dance-preview.mp4',
    poster: '/videos/freshers-dance-poster.jpg',
    alt: 'Boys group dance performance at the Freshers Party',
    shape: 'wide',
    album: ALBUMS.freshers,
    duration: '4:09',
  },
  photo(11, 'tall', 'Young performer in traditional dress on stage', ALBUMS.freshers),
  photo(12, 'wide', 'Students and staff on the Freshers Party stage', ALBUMS.freshers),
  photo(15, 'tall', 'Little performers in traditional pattu langa', ALBUMS.freshers),
  photo(13, 'wide', 'Students posing at the Freshers Party', ALBUMS.freshers),
  {
    type: 'video',
    src: dropbox('https://www.dropbox.com/scl/fi/9bo5wkkdqat5p46rw8pw6/VN20260922_110538.mp4?rlkey=t57jw6334bc2mbcgil400261s&st=9clukn4l&dl=0'),
    preview: '/videos/freshers-cake-preview.mp4',
    poster: '/videos/freshers-cake-poster.jpg',
    alt: 'Cake cutting celebration at the Freshers Party',
    shape: 'tall',
    album: ALBUMS.freshers,
    duration: '0:44',
  },
  photo(20, 'tall', 'Classical dance performance', ALBUMS.freshers),
  photo(16, 'wide', 'Group photo at the Freshers Party', ALBUMS.freshers),
  photo(10, 'tall', 'Guests seated at the Freshers Party', ALBUMS.freshers),
  photo(18, 'wide', 'Students performing on stage', ALBUMS.freshers),
  photo(19, 'tall', 'Dance performance by students', ALBUMS.freshers),
  photo(14, 'wide', 'Parents and guests in the audience', ALBUMS.freshers),
  photo(21, 'wide', 'Stage performance with the crowd cheering', ALBUMS.freshers),
  photo(17, 'wide', 'Crowd enjoying the Freshers Party', ALBUMS.freshers),

  photo(1, 'tall', 'Christmas celebration beside the school buses', ALBUMS.campus),
  photo(2, 'wide', 'Teachers at a school celebration', ALBUMS.campus),
  photo(4, 'tall', 'Traditional lamp lighting ceremony', ALBUMS.campus),
  photo(3, 'wide', 'Hari school staff together', ALBUMS.campus),
  photo(6, 'tall', 'Hari, Principal & Academic Director', ALBUMS.campus),
  photo(5, 'wide', 'Students lined up in school uniform', ALBUMS.campus),
  photo(7, 'wide', 'Teachers on stage at a school event', ALBUMS.campus),
  photo(8, 'wide', 'Staff group photo at a school function', ALBUMS.campus),
  photo(9, 'wide', 'Celebration event at the school', ALBUMS.campus),
];

// Photos used in the scrolling strip on the home page
export const HERO_PHOTOS: GalleryPhoto[] = GALLERY_ITEMS.filter(
  (item): item is GalleryPhoto => item.type === 'photo' && item.album === ALBUMS.campus
);
