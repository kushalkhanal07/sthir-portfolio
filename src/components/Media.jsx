import Artwork from './Artwork';

/**
 * Renders a media object from data/projects.js.
 *   { kind: 'artwork', variant, props, ratio, caption }
 *   { kind: 'image',   src, alt, ratio, caption }
 *
 * Aspect ratio is reserved up-front so nothing shifts while loading.
 */
export default function Media({ media, className = '', priority = false, caption = true, sizes = '100vw' }) {
  if (!media) return null;
  const ratio = media.ratio || '4/3';
  const style = { aspectRatio: ratio.replace('/', ' / ') };

  return (
    <figure className={`media ${className}`}>
      <div className="media-frame" style={style}>
        {media.kind === 'image' ? (
          <img
            src={media.src}
            srcSet={media.srcSet}
            sizes={media.srcSet ? sizes : undefined}
            alt={media.alt || ''}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <Artwork variant={media.variant} props={media.props} title={media.alt} />
        )}
      </div>
      {caption && media.caption && <figcaption className="media__caption mono">{media.caption}</figcaption>}
    </figure>
  );
}
