import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const navItems = [
  { id: "home", label: "HOME", icon: null },
  { id: "trip", label: "TRIP", icon: "fa-road" },
  { id: "photos", label: "PHOTOS", icon: "fa-th" },
  { id: "videoSection", label: "VIDEO", icon: "fa-camera" },
  { id: "about", label: "ABOUT", icon: "fa-user" },
];

const carouselSlides = [
  { src: "/assets/img7.png", alt: "tokyo" },
  { src: "/assets/img8.jpg", alt: "kyoto" },
  { src: "/assets/img9.jpg", alt: "osaka" },
];

const galleryPhotos = [
  { src: "/assets/img1.png", alt: "Tokyo Station" },
  { src: "/assets/img2.png", alt: "Hakone Railway" },
  { src: "/assets/img3.png", alt: "Kiyomizu Temple" },
  { src: "/assets/img4.png", alt: "Naro Park" },
  { src: "/assets/img5.png", alt: "Osaka Malls" },
  { src: "/assets/img6.png", alt: "Kindergarten Bus" },
];

function useScrollSpy(sectionIds) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      let current = "home";
      const middle = window.innerHeight / 2;

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= middle && rect.bottom >= middle) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  return { activeSection, isScrolled };
}

function Navbar() {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const { activeSection, isScrolled } = useScrollSpy(sectionIds);

  const handleClick = (event, id) => {
    event.preventDefault();

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="my-top" id="my-top">
      <div
        className={`my-bar ${isScrolled ? "my-bar-scrolled" : ""}`}
        id="my-bar"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.id === "home" ? "#home" : `#${item.id}`}
            onClick={(event) => handleClick(event, item.id)}
            className={activeSection === item.id ? "active" : ""}
          >
            {item.icon && <i className={`fa ${item.icon}`} aria-hidden="true" />}
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="bgimg-1" id="home">
      <h1 className="first-section text-xxl">MY TRIP TO JAPAN</h1>
    </div>
  );
}

function Carousel() {
  const [slideIndex, setSlideIndex] = useState(0);

  const changeSlide = (direction) => {
    setSlideIndex((current) => {
      const next = current + direction;
      if (next >= carouselSlides.length) return 0;
      if (next < 0) return carouselSlides.length - 1;
      return next;
    });
  };

  return (
    <div className="carousel-container">
      {carouselSlides.map((slide, index) => (
        <div
          key={slide.src}
          className="carou-slide fade"
          style={{ display: index === slideIndex ? "block" : "none" }}
        >
          <img src={slide.src} alt={slide.alt} />
        </div>
      ))}

      <button type="button" className="prev" onClick={() => changeSlide(-1)}>
        &#10094;
      </button>
      <button type="button" className="next" onClick={() => changeSlide(1)}>
        &#10095;
      </button>
    </div>
  );
}

function TripSection() {
  return (
    <div className="second-section" id="trip">
      <Carousel />
      <div className="content">
        <h3 className="second-title text-xl">TRIP INFORMATION</h3>
        <p className="trip-info">
          In July 2024, I organized a family trip to Japan that lasted ten days
          and took us through three amazing cities: Tokyo, Kyoto, and Osaka. I
          did not realize at first that July is part of Japan’s rainy season, so
          the weather brought a few surprises. Even with the rain, we were able
          to visit many of the well-known attractions in Tokyo and Kyoto. One
          funny moment was trying to see Mount Fuji, only to find its peak
          completely hidden by a thick cloud. It honestly looked more like a
          giant loaf of Fuji bread than a mountain. We also enjoyed plenty of
          delicious local food, explored different neighborhoods, and did lots of
          shopping. Most of all, it was a lovely trip filled with memories and
          time well spent with family.
        </p>
      </div>
    </div>
  );
}

function PhotoModal({ selectedPhoto, onClose }) {
  if (!selectedPhoto) return null;

  return (
    <div className="modal modal-open" onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <span className="closeModal" onClick={onClose} role="button" tabIndex={0}>
          &times;
        </span>
        <p id="modal-caption">{selectedPhoto.alt}</p>
        <img
          id="modal-img"
          className="modal-img"
          src={selectedPhoto.src}
          alt={selectedPhoto.alt}
        />
      </div>
    </div>
  );
}

function PhotoSection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (!selectedPhoto) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setSelectedPhoto(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selectedPhoto]);

  return (
    <div className="photo-section" id="photos">
      <div className="bgimg-3 third-section">
        <h3 className="third-title">OPEN TRIP DETAILS</h3>
      </div>

      <div className="photo-container">
        {galleryPhotos.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            onClick={() => setSelectedPhoto(photo)}
          />
        ))}
      </div>
      <PhotoModal
        selectedPhoto={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}

function VideoSection() {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {
      // Browser may block play(). Ignore safely.
    });
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div
      className="food"
      id="videoSection"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="fourth-title">MY YUMMY DIARY</h3>
      <video id="myvideo" ref={videoRef} muted loop playsInline>
        <source src="/assets/food.MP4" type="video/mp4" />
      </video>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="about-section" id="about">
      <div className="bgimg-4">
        <h3 className="about">ABOUT</h3>
        <h3 className="me">ME</h3>
      </div>
      <div className="content-aboutme">
        <p>
          Master’s student in Computer Science at the University of Illinois
          Urbana-Champaign. My interests lie in front- and back-end development,
          with a focus on designing user-friendly software and applications that
          improve people’s lives, promote sustainability, and make technology
          more accessible.
        </p>
        <p>
          I’m a bit of a mischievous soul who loves making silly faces and
          finding joy in the little things. One of my longest-running obsessions
          is Maplestory that I’ve been happily lost in that world for over ten
          years. Outside of gaming, I’m pretty normal. I enjoy watching movies,
          especially comedies and romantic ones, and I’m a big fan of Japanese
          anime. Light music helps me unwind, and I love spending time in nature,
          where everything feels peaceful and balanced. There’s something truly
          special about being surrounded by calm and beauty.
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="contact">
      <a href="#home" className="button">
        <i className="fa fa-arrow-up" aria-hidden="true" />
        To the top
      </a>

      <div className="link">
        <a
          href="https://www.linkedin.com/in/mengmeng-fang-04440b33/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="fa fa-linkedin" aria-hidden="true" />
        </a>

        <a href="mailto:mf57@illinois.edu" aria-label="Email me">
          <i className="fa fa-envelope" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <TripSection />
      <PhotoSection />
      <VideoSection />
      <AboutSection />
      <Footer />
    </>
  );
}
