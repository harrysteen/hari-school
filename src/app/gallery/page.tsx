'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ALBUMS, GALLERY_ITEMS, type GalleryVideo } from '@/data/gallery';

const VIDEOS_FILTER = '🎬 Videos';
const FILTERS = ['All', ...Object.values(ALBUMS), VIDEOS_FILTER];

// Video tile: plays a short muted preview on hover (desktop) or when scrolled into view (touch screens)
function VideoTile({ item, onOpen }: { item: GalleryVideo; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const tileRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  useEffect(() => {
    // Touch screens have no hover, so autoplay the preview while the tile is mostly visible
    if (!window.matchMedia('(hover: none)').matches || !tileRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? play() : stop()),
      { threshold: 0.6 }
    );
    observer.observe(tileRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={tileRef}
      type="button"
      className={`gallery-tile gallery-video-tile ${playing ? 'is-playing' : ''}`}
      onClick={onOpen}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      aria-label={`Play video: ${item.alt}`}
    >
      <video
        ref={videoRef}
        src={item.preview}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="none"
        style={{ aspectRatio: item.shape === 'tall' ? '9 / 16' : '16 / 9' }}
      />
      <span className="video-play-badge" aria-hidden="true">▶</span>
      <span className="video-duration">🎬 {item.duration}</span>
      <span className="gallery-tile-caption">{item.alt}</span>
    </button>
  );
}

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  // Index (within the filtered list) of the item open in the lightbox, or null when closed
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(() => {
    if (filter === 'All') return GALLERY_ITEMS;
    if (filter === VIDEOS_FILTER) return GALLERY_ITEMS.filter((i) => i.type === 'video');
    return GALLERY_ITEMS.filter((i) => i.album === filter);
  }, [filter]);
  const total = items.length;

  const countFor = (f: string) =>
    f === 'All' ? GALLERY_ITEMS.length
      : f === VIDEOS_FILTER ? GALLERY_ITEMS.filter((i) => i.type === 'video').length
      : GALLERY_ITEMS.filter((i) => i.album === f).length;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + total) % total)),
    [total]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, step]);

  const current = openIndex === null ? null : items[openIndex];

  return (
    <div style={{ backgroundColor: '#FBF9F4', minHeight: '100vh', color: '#1F1813' }}>
      {/* Header */}
      <header className="site-nav">
        <div className="container nav-wrapper">
          <Link href="/" className="logo-link">
            <Image src="/images/school-logo.png" alt="Hari E-Techno School emblem" width={52} height={52} className="logo-emblem" priority />
            <div className="logo-text">
              <Image src="/images/school-name.png" alt="Hari Educational Institutions" width={1600} height={110} className="logo-name" priority />
              <span className="logo-sub-text">RAJANAGARAM • AP</span>
            </div>
          </Link>

          <Link href="/" className="btn-pill btn-white" style={{ fontSize: '13.5px', padding: '8px 16px' }}>
            ← Back<span className="hide-on-phone"> to Main Site</span>
          </Link>
        </div>
      </header>

      {/* Title */}
      <section className="gallery-page-hero">
        <div className="container">
          <span className="badge-tag" style={{ background: '#FFEDE9', color: '#FF5E3A', border: 'none' }}>
            📸 Life at Hari
          </span>
          <h1 className="gallery-page-title">
            Our School <span className="text-coral">Gallery</span>
          </h1>
          <p className="gallery-page-subtitle">
            Celebrations, classrooms and everyday moments from HARI E-TECHNO SCHOOL &amp; HARI JUNIOR COLLEGE, Rajanagaram.
          </p>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 'clamp(48px, 8vw, 96px)' }}>
        {/* Filter chips */}
        <div className="gallery-filters" role="tablist" aria-label="Filter gallery">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`gallery-chip ${filter === f ? 'active' : ''}`}
              onClick={() => { setFilter(f); setOpenIndex(null); }}
            >
              {f} <span className="gallery-chip-count">{countFor(f)}</span>
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="gallery-masonry" key={filter}>
          {items.map((item, i) =>
            item.type === 'video' ? (
              <VideoTile key={item.src} item={item} onOpen={() => setOpenIndex(i)} />
            ) : (
              <button
                key={item.src}
                type="button"
                className="gallery-tile"
                onClick={() => setOpenIndex(i)}
                aria-label={`Open photo: ${item.alt}`}
              >
                <img src={item.src} alt={item.alt} loading={i < 6 ? 'eager' : 'lazy'} />
                <span className="gallery-tile-caption">{item.alt}</span>
              </button>
            )
          )}
        </div>

        {/* Visit CTA */}
        <div className="gallery-cta">
          <div>
            <div className="gallery-cta-title">See it for yourself</div>
            <div className="gallery-cta-text">Visit our Rajanagaram campus and meet our teachers.</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="tel:07799114947" className="btn-pill btn-white">📞 077991 14947</a>
            <Link href="/#admissions" className="btn-pill btn-coral-gradient">Admissions 2026–27 ↗</Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {current && openIndex !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={current.alt} onClick={close}>
          <button type="button" className="lightbox-btn lightbox-close" onClick={close} aria-label="Close">✕</button>
          <button
            type="button"
            className="lightbox-btn lightbox-prev"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous"
          >
            ‹
          </button>
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            {current.type === 'video' ? (
              <video key={current.src} src={current.src} poster={current.poster} controls autoPlay playsInline />
            ) : (
              <img src={current.src} alt={current.alt} />
            )}
            <figcaption>
              <span>{current.alt}</span>
              <span className="lightbox-count">{openIndex + 1} / {total}</span>
            </figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-btn lightbox-next"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
