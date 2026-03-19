import {
  BrandingJoaquinsantos,
  BrandingMkjp,
  BrandingPausepaws,
  BrandingTgms,
  PhotoCapeaguilar,
  PhotoCasetify,
  PhotoFlowerknows,
  PhotoFoodphotog,
  PhotoKristel,
  PhotoMoto,
  PhotoRedconcept,
  PhotoStreethk,
  PhotoTattoo,
  ThreeD
} from '../images';

export interface ProjectImage {
  id: string;
  src: string;
  title: string;
  description?: string;
  isVideo?: boolean;
  youtubeId?: string;
  thumbnail?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Videos' | 'Photos'; // CHANGED: Strictly Videos or Photos
  description: string;
  coverImage: string;
  images: ProjectImage[];
  client?: string;
  year: string;
  tags: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  // === VIDEO PROJECTS ===
  {
    id: 'PenroseLyric',
    title: 'Video | Lexie Liu - Penrose Lyric Video',
    category: 'Videos',
    description: 'Kinetic Typography lyric video for Lexie Liu\'s "Penrose" using Adobe After Effects and Premiere Pro.',
    coverImage: 'https://img.youtube.com/vi/eLaTL3bNzvc/hqdefault.jpg',
    client: 'Personal',
    year: '2025',
    tags: ['Kinetic Typography', 'Motion Graphics', 'Music Video'],
    images: [
      {
        id: 'penrose-lyric-1',
        src: 'https://youtu.be/eLaTL3bNzvc',
        youtubeId: 'eLaTL3bNzvc',
        thumbnail: 'https://img.youtube.com/vi/eLaTL3bNzvc/hqdefault.jpg',
        title: 'Lexie Liu - Penrose Lyric Video',
        description: 'Simple Lyric Video for Lexie Liu\'s "Penrose" using Kinetic Typography techniques in Adobe After Effects and Premiere Pro.',
        isVideo: true
      },
    ]
  },
  {
    id: 'cinematic-reel-2024',
    title: 'Reel | Claws by Tenshi',
    category: 'Videos',
    description: 'Handheld shooting and colour grading work using S-Log 2 ITX 709 Matrix on an 8 bit camera (Sony A6400)',
    coverImage: 'https://img.youtube.com/vi/6ZqdL4Pbz6Q/maxresdefault.jpg',
    client: 'Personal',
    year: '2025',
    tags: ['Cinematography', 'Color Grading', 'Handheld Rig'],
    images: [
      {
        id: 'cinematic-reel-2024-1',
        src: 'https://youtu.be/6ZqdL4Pbz6Q',
        youtubeId: '6ZqdL4Pbz6Q',
        thumbnail: 'https://img.youtube.com/vi/6ZqdL4Pbz6Q/maxresdefault.jpg',
        title: 'Cinematic Reel 2024',
        description: 'A collection of my cinematic work from 2024.',
        isVideo: true
      },
    ]
  },
  {
    id: 'JS Color Grading',
    title: 'Reel | Color Grading for Joaquin Santos',
    category: 'Videos',
    description: 'Joaquin Santos commissioned me to grade his motorcycle footage shot on several camera sources (DJI Osmo, DJI Mini 4 Pro, and GoPro Hero 9)',
    coverImage: 'https://img.youtube.com/vi/2HXWvLMD5cw/maxresdefault.jpg',
    client: 'Personal',
    year: '2025',
    tags: ['Color Pipeline', 'Documentary Edit', 'Multi-Cam'],
    images: [
      {
        id: 'js-color-grading-1',
        src: 'https://youtu.be/2HXWvLMD5cw',
        youtubeId: '2HXWvLMD5cw',
        thumbnail: 'https://img.youtube.com/vi/2HXWvLMD5cw/maxresdefault.jpg',
        title: 'JS Color Grading',
        description: 'Color Grading Reel for Joaquin Santos Motorcycle Documentary',
        isVideo: true
      },
    ]
  },
  {
    id: 'al80-color-grading',
    title: 'Reel | AL80 Keyboard Color Grading',
    category: 'Videos',
    description: 'Color grading work on a keyboard unboxing shot using the Sony A6400 with the Sony 35mm 1.8 OSS lens.',
    coverImage: 'https://img.youtube.com/vi/uBmibJMn9qs/maxresdefault.jpg',
    client: 'Personal',
    year: '2025',
    tags: ['Product Video', 'Color Grading', 'Tech B-Roll'],
    images: [
      {
        id: 'al80-cg-1',
        src: 'https://youtube.com/shorts/uBmibJMn9qs',
        youtubeId: 'uBmibJMn9qs',
        thumbnail: 'https://img.youtube.com/vi/uBmibJMn9qs/maxresdefault.jpg',
        title: 'Reel | AL80 Keyboard Color Grading',
        description: 'Color grading work on a keyboard unboxing shot using the Sony A6400 with the Sony 35mm 1.8 OSS lens.',
        isVideo: true
      },
    ]
  },
  {
    id: 'metrohk-cinematic',
    title: 'Reel | Hong Kong Metro',
    category: 'Videos',
    description: 'Shot using the Sony A6400 (16-50 kit lens OSS, Sony 50mm 1.8 OSS, and Sony 35mm 1.8 OSS). This was my first exposure to color grading, video setting, color spaces, and a lot of other things.',
    coverImage: 'https://img.youtube.com/vi/rV5BhvNZmcI/maxresdefault.jpg',
    client: 'Personal',
    year: '2024',
    tags: ['Urban Cinematography', 'Travel Film', 'Color Spaces'],
    images: [
      {
        id: 'metrohk-cinematic-1',
        src: 'https://youtube.com/shorts/rV5BhvNZmcI',
        youtubeId: 'rV5BhvNZmcI',
        thumbnail: 'https://img.youtube.com/vi/rV5BhvNZmcI/maxresdefault.jpg',
        title: 'Reel | Hong Kong Metro',
        description: 'Shot using the Sony A6400 (16-50 kit lens OSS, Sony 50mm 1.8 OSS, and Sony 35mm 1.8 OSS). This was my first exposure to color grading, video setting, color spaces, and a lot of other things. This is where I started',
        isVideo: true
      },
    ]
  },

  // === PHOTO PROJECTS ===
  {
    id: 'flowerknows',
    title: 'Flower Knows',
    category: 'Photos',
    description: 'Studio shots for Flower Knows: Violet Strawberry Rococo All-in Gift Set',
    coverImage: PhotoFlowerknows[0],
    year: '2024',
    client: 'Flower Knows',
    tags: ['Product Photography', 'Studio Lighting', 'Commercial'],
    images: PhotoFlowerknows.map((src, idx) => ({
      id: `flowerknows-${idx + 1}`,
      src,
      title: `Flowerknows ${idx + 1}`
    }))
  },
  {
    id: 'casetify',
    title: 'Casetify Airpods Case',
    category: 'Photos',
    description: 'Product shots for Casetify Airpods Case.',
    coverImage: PhotoCasetify[0],
    year: '2024',
    client: 'Casetify',
    tags: ['Tech Accessories', 'Product Photography', 'Commercial'],
    images: PhotoCasetify.map((src, idx) => ({
      id: `casetify-${idx + 1}`,
      src,
      title: `Casetify ${idx + 1}`
    }))
  },
  {
    id: 'redconcept',
    title: 'Red Concept',
    category: 'Photos',
    description: 'Red-themed creative concept studio shoot',
    coverImage: PhotoRedconcept[5],
    year: '2024',
    tags: ['Creative Direction', 'Conceptual', 'Studio Photography'],
    images: PhotoRedconcept.map((src, idx) => ({
      id: `redconcept-${idx + 1}`,
      src,
      title: `Red Concept ${idx + 1}`
    }))
  },
  {
    id: 'foodphotog',
    title: 'Food Photography',
    category: 'Photos',
    description: 'Delicious food photography.',
    coverImage: PhotoFoodphotog[0],
    year: '2024',
    tags: ['Food Styling', 'Commercial Photography'],
    images: PhotoFoodphotog.map((src, idx) => ({
      id: `foodphotog-${idx + 1}`,
      src,
      title: `Food Photo ${idx + 1}`
    }))
  },
  {
    id: 'tattoo-branding',
    title: 'Tattoo Photography for JianL',
    category: 'Photos',
    description: 'Photography for business branding and marketing materials.',
    coverImage: PhotoTattoo[0],
    year: '2024',
    client: 'JianL Tattoos',
    tags: ['Brand Photography', 'Corporate Identity', 'Lifestyle'],
    images: PhotoTattoo.map((src, idx) => ({
      id: `tattoo-${idx + 1}`,
      src,
      title: `Tattoo Branding ${idx + 1}`
    }))
  },
  {
    id: 'moto-adventures',
    title: 'Motorcycles & Adventures',
    category: 'Photos',
    description: 'Motorcycle journeys and adventures.',
    coverImage: PhotoMoto[4],
    year: '2024',
    tags: ['Automotive', 'Action Photography', 'Lifestyle'],
    images: PhotoMoto.map((src, idx) => ({
      id: `moto-${idx + 1}`,
      src,
      title: `Moto Adventure ${idx + 1}`
    }))
  },
  {
    id: 'streethk',
    title: 'Streets of Hong Kong',
    category: 'Photos',
    description: 'Street photography in Hong Kong.',
    coverImage: PhotoStreethk[11],
    year: '2022-2024',
    tags: ['Street Photography', 'Urban Landscapes', 'Candid'],
    images: PhotoStreethk.map((src, idx) => ({
      id: `streethk-${idx + 1}`,
      src,
      title: `Street HK ${idx + 1}`
    }))
  },
  {
    id: 'capeaguilar',
    title: 'Cape D Aguilar',
    category: 'Photos',
    description: 'Scenic shots from Cape D Aguilar in Hong Kong using the iPhone 14 Pro',
    coverImage: PhotoCapeaguilar[3],
    year: '2024',
    tags: ['Nature', 'Landscape', 'Mobile Photography'],
    images: PhotoCapeaguilar.map((src, idx) => ({
      id: `capeaguilar-${idx + 1}`,
      src,
      title: `Cape Aguilar ${idx + 1}`
    }))
  },
  {
    id: 'kristel-photos',
    title: 'Portraits of my Partner',
    category: 'Photos',
    description: 'I love taking portraits of my partner and capturing special moments together.',
    coverImage: PhotoKristel[15],
    year: 'Mixed',
    tags: ['Portraiture', 'Lifestyle Photography', 'Candid'],
    images: PhotoKristel.map((src, idx) => ({
      id: `kristel-${idx + 1}`,
      src,
      title: `Kristel Portrait ${idx + 1}`
    }))
  },

  // === DESIGN / 3D PROJECTS (Categorized under Photos) ===
  {
    id: 'mkjp',
    title: 'MKJP Branding',
    category: 'Photos',
    description: 'Logos for MKJP, an Interior Design student in the Philippines.',
    coverImage: BrandingMkjp[0],
    year: '2025',
    client: 'MKJP',
    tags: ['Brand Identity', 'Logo Design'],
    images: BrandingMkjp.map((src, idx) => ({
      id: `mkjp-${idx + 1}`,
      src,
      title: `MKJP ${idx + 1}`
    }))
  },
  {
    id: 'pausepaws',
    title: 'Pausepaws Branding',
    category: 'Photos',
    description: 'Branding work for Pausepaws, a pet grooming service concept.',
    coverImage: BrandingPausepaws[7],
    year: '2025',
    client: 'Concept',
    tags: ['Brand Concept', 'Identity Design'],
    images: BrandingPausepaws.map((src, idx) => ({
      id: `pausepaws-${idx + 1}`,
      src,
      title: `Pausepaws ${idx + 1}`
    }))
  },
  {
    id: 'tgms',
    title: 'TGMS Branding',
    category: 'Photos',
    description: 'Branding for TheGrace Medical Services.',
    coverImage: BrandingTgms[0],
    year: '2024',
    client: 'TheGrace Medical Services',
    tags: ['Corporate Design', 'Brand Identity'],
    images: BrandingTgms.map((src, idx) => ({
      id: `tgms-${idx + 1}`,
      src,
      title: `TGMS ${idx + 1}`
    }))
  },
  {
    id: 'joaquinsantos',
    title: 'Joaquin Santos Branding',
    category: 'Photos',
    description: 'Branding and identity design for Joaquin Santos, a music producer based in the Philippines.',
    coverImage: BrandingJoaquinsantos[0],
    year: '2019',
    client: 'Joaquin Santos',
    tags: ['Brand Identity', 'Music Industry'],
    images: BrandingJoaquinsantos.map((src, idx) => ({
      id: `joaquinsantos-${idx + 1}`,
      src,
      title: `Joaquin Santos ${idx + 1}`
    }))
  },
  {
    id: 'mod-3d',
    title: '3D Sanctuary Hills',
    category: 'Photos',
    description: 'A showcase of 3D models, texturing, staging, and rendering in 3DS Max based on the Sanctuary Hills map from Fallout 4.',
    coverImage: ThreeD[10],
    year: '2024',
    tags: ['3D Modeling', 'Environment Design', 'Texturing'],
    images: ThreeD.map((src, idx) => ({
      id: `mod-3d-${idx + 1}`,
      src,
      title: `3D Model ${idx + 1}`
    }))
  }
];

// CHANGED: These labels automatically build the buttons on your App.tsx portfolio section
export const categoryLabels = {
  Videos: "Video Production",
  Photos: "Photography"
};