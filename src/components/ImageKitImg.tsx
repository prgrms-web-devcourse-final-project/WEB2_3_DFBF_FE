import defaultImage from '@assets/images/default.png';

interface ImageKitImgProps {
  src: string; // Spotify 이미지 URL
  width: number;
  height: number;
  alt?: string;
  className?: string;
}

export default function ImageKitImg({
  src,
  width,
  height,
  alt = '앨범 이미지',
  className = '',
}: ImageKitImgProps) {
  const imagePath = src?.split('/image/')[1];

  return (
    <img
      className={className}
      src={`https://ik.imagekit.io/${import.meta.env.VITE_IMAGEKIT_ID}/${imagePath}?tr=w-${width * 2},h-${height * 2}`}
      width={width}
      height={height}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.onerror = null; // 무한 루프 방지
        target.src = defaultImage; // 고정 기본 이미지
      }}
      alt={alt}
    />
  );
}
