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

// Portfolio project data with multiple images per project
export interface ProjectImage {
  id: string;
  src: string;
  title: string;
  description?: string;
  isVideo?: boolean;
  youtubeId?: string;   // ✅ for YouTube video ID
  thumbnail?: string;   // ✅ preview image for YouTube
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Photo' | 'Video' | '3D' | 'Branding';
  description: string;
  coverImage: string;
  images: ProjectImage[];
  client?: string;
  year: string;
  tags: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  // PHOTO PROJECTS
  {
    id: 'flowerknows',
    title: 'Flower Knows',
    category: 'Photo',
    description: 'Studio shots for Flower Knows: Violet Strawberry Rococo All-in Gift Set',
    coverImage: PhotoFlowerknows[0],
    year: '2024',
    tags: ['Creative', 'Product'],
    images: PhotoFlowerknows.map((src, idx) => ({
      id: `flowerknows-${idx + 1}`,
      src,
      title: `Flowerknows ${idx + 1}`
    }))
  },
  {
    id: 'capeaguilar',
    title: 'Cape D Aguilar',
    category: 'Photo',
    description: 'Scenic shots from Cape D Aguilar in Hong Kong using the iPhone 14 Pro',
    coverImage: PhotoCapeaguilar[3],
    year: '2024',
    tags: ['Landscape', 'Nature'],
    images: PhotoCapeaguilar.map((src, idx) => ({
      id: `capeaguilar-${idx + 1}`,
      src,
      title: `Cape Aguilar ${idx + 1}`
    }))
  },
  {
    id: 'casetify',
    title: 'Casetify Airpods Case',
    category: 'Photo',
    description: 'Product shots for Casetify Airpods Case.',
    coverImage: PhotoCasetify[0],
    year: '2024',
    tags: ['Product', 'Tech'],
    images: PhotoCasetify.map((src, idx) => ({
      id: `casetify-${idx + 1}`,
      src,
      title: `Casetify ${idx + 1}`
    }))
  },
  {
    id: 'foodphotog',
    title: 'Food Photography',
    category: 'Photo',
    description: 'Delicious food photography.',
    coverImage: PhotoFoodphotog[0],
    year: '2024',
    tags: ['Food'],
    images: PhotoFoodphotog.map((src, idx) => ({
      id: `foodphotog-${idx + 1}`,
      src,
      title: `Food Photo ${idx + 1}`
    }))
  },
  {
    id: 'kristel-photos',
    title: 'Portraits of my Partner',
    category: 'Photo',
    description: 'I love taking portraits of my partner and capturing special moments together.',
    coverImage: PhotoKristel[15],
    year: 'Mixed',
    tags: ['Partner', 'Portrait', 'Candid', 'Girl'],
    images: PhotoKristel.map((src, idx) => ({
      id: `kristel-${idx + 1}`,
      src,
      title: `Kristel Portrait ${idx + 1}`
    }))
  },
  {
    id: 'moto-adventures',
    title: 'Motorcycles & Adventures',
    category: 'Photo',
    description: 'Motorcycle journeys and adventures.',
    coverImage: PhotoMoto[4],
    year: '2024',
    tags: ['Moto', 'Adventure', 'Travel'],
    images: PhotoMoto.map((src, idx) => ({
      id: `moto-${idx + 1}`,
      src,
      title: `Moto Adventure ${idx + 1}`
    }))
  },
  {
    id: 'redconcept',
    title: 'Red Concept',
    category: 'Photo',
    description: 'Red-themed creative concept studio shoot',
    coverImage: PhotoRedconcept[5],
    year: '2024',
    tags: ['Creative', 'Red'],
    images: PhotoRedconcept.map((src, idx) => ({
      id: `redconcept-${idx + 1}`,
      src,
      title: `Red Concept ${idx + 1}`
    }))
  },
  {
    id: 'streethk',
    title: 'Streets of Hong Kong',
    category: 'Photo',
    description: 'Street photography in Hong Kong.',
    coverImage: PhotoStreethk[11],
    year: '2022-2024',
    tags: ['Street', 'Urban', 'HK'],
    images: PhotoStreethk.map((src, idx) => ({
      id: `streethk-${idx + 1}`,
      src,
      title: `Street HK ${idx + 1}`
    }))
  },
  {
    id: 'tattoo-branding',
    title: 'Tattoo Photography for JianL',
    category: 'Photo',
    description: 'Photography for business branding and marketing materials.',
    coverImage: PhotoTattoo[0],
    year: '2024',
    tags: ['Corporate', 'Branding', 'Professional', 'Business'],
    images: PhotoTattoo.map((src, idx) => ({
      id: `tattoo-${idx + 1}`,
      src,
      title: `Tattoo Branding ${idx + 1}`
    }))
  },

  // VIDEO PROJECTS
  {
    id: 'metrohk-cinematic',
    title: 'Metro - Short Cinematic of Hong Kong (Sony A6400)',
    category: 'Video',
    description: 'A fun shoot covering North Point, Causeway Bay, Wanchai, and a Ferry ride to TST.',
    coverImage: 'https://img.youtube.com/vi/HWcVawM4OMc/maxresdefault.jpg',
    client: 'Personal',
    year: '2024',
    tags: ['Cinematography', 'Creative', 'Post-Production'],
    images: [
      {
        id: 'metrohk-cinematic-1',
        src: 'https://youtube.com/shorts/HWcVawM4OMc',
        youtubeId: 'HWcVawM4OMc',
        thumbnail: 'https://img.youtube.com/vi/HWcVawM4OMc/maxresdefault.jpg',
        title: 'Metro - Short Cinematic of Hong Kong (Sony A6400)',
        description: 'A fun shoot covering North Point, Causeway Bay, Wanchai, and a Ferry ride to TST.',
        isVideo: true
      },
     // {
       // id: 'music-2',
       // src: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
       // youtubeId: '9bZkp7q19f0',
       // thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
       // title: 'Creative Sequences',
      //  description: 'Artistic and conceptual video sequences',
      //  isVideo: true
     // },
      //{
       // id: 'music-3',
       // src: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      //  youtubeId: 'kJQP7kiw5Fk',
       // thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
       // title: 'Behind the Scenes',
       // description: 'Production process and setup documentation',
       // isVideo: tru
     // }
    ]
  },
  {
    id: 'corporate-documentary',
    title: 'Corporate Documentary',
    category: 'video',
    description: 'Professional documentary showcasing company culture and business operations.',
    coverImage: 'https://img.youtube.com/vi/QH2-TGUlwu4/maxresdefault.jpg',
    client: 'Fortune 500 Company',
    year: '2024',
    tags: ['Documentary', 'Corporate', 'Storytelling', 'Interview'],
    images: [
      {
        id: 'doc-1',
        src: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
        youtubeId: 'QH2-TGUlwu4',
        thumbnail: 'https://img.youtube.com/vi/QH2-TGUlwu4/maxresdefault.jpg',
        title: 'Executive Interviews',
        description: 'In-depth interviews with company leadership',
        isVideo: true
      },
      {
        id: 'doc-2',
        src: 'https://www.youtube.com/watch?v=nfWlot6h_JM',
        youtubeId: 'nfWlot6h_JM',
        thumbnail: 'https://img.youtube.com/vi/nfWlot6h_JM/maxresdefault.jpg',
        title: 'Workplace Culture',
        description: 'Capturing authentic workplace interactions',
        isVideo: true
      },
      {
        id: 'doc-3',
        src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        youtubeId: 'dQw4w9WgXcQ',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        title: 'Production Process',
        description: 'Manufacturing and operational processes',
        isVideo: true
      }
    ]
  },


  // BRANDING PROJECTS
  {
    id: 'joaquinsantos',
    title: 'Joaquin Santos Branding',
    category: 'Branding',
    description: 'Branding and identity design for Joaquin Santos, a music producer based in the Philippines.',
    coverImage: BrandingJoaquinsantos[0],
    year: '2019',
    tags: ['Branding', 'Identity', 'Design'],
    images: BrandingJoaquinsantos.map((src, idx) => ({
      id: `joaquinsantos-${idx + 1}`,
      src,
      title: `Joaquin Santos ${idx + 1}`
    }))
  },
  {
    id: 'mkjp',
    title: 'MKJP Branding',
    category: 'Branding',
    description: 'Logos for MKJP, an Interior Design student in the Philippines.',
    coverImage: BrandingMkjp[0],
    year: '2025',
    tags: ['Branding', 'Campaign'],
    images: BrandingMkjp.map((src, idx) => ({
      id: `mkjp-${idx + 1}`,
      src,
      title: `MKJP ${idx + 1}`
    }))
  },
  {
    id: 'pausepaws',
    title: 'Pausepaws Branding',
    category: 'Branding',
    description: 'Branding work for Pausepaws, a pet grooming service concept.',
    coverImage: BrandingPausepaws[7],
    year: '2025',
    tags: ['Branding', 'Work'],
    images: BrandingPausepaws.map((src, idx) => ({
      id: `pausepaws-${idx + 1}`,
      src,
      title: `Pausepaws ${idx + 1}`
    }))
  },
  {
    id: 'tgms',
    title: 'TGMS Branding',
    category: 'Branding',
    description: 'Branding for TheGrace Medical Services.',
    coverImage: BrandingTgms[0],
    year: '2024',
    tags: ['Branding', 'Portfolio'],
    images: BrandingTgms.map((src, idx) => ({
      id: `tgms-${idx + 1}`,
      src,
      title: `TGMS ${idx + 1}`
    }))
  },

  // 3D PROJECT
  {
    id: 'mod-3d',
    title: '3D Sanctuary Hills',
    category: '3D',
    description: 'A showcase of 3D models, texturing, staging, and rendering in 3DS Max based on the Sanctuary Hills map from Fallout 4.',
    coverImage: ThreeD[10],
    year: '2024',
    tags: ['3D', 'Modelling', 'Showcase'],
    images: ThreeD.map((src, idx) => ({
      id: `mod-3d-${idx + 1}`,
      src,
      title: `3D Model ${idx + 1}`
    }))
  }
];

export const categoryLabels = {
  Photo: "Photo",
  Video: "Video",
  "3D": "3D",
  Branding: "Branding"
};