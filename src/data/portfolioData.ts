import {
  Branding,
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
    title: 'Flowerknows Series',
    category: 'Photo',
    description: 'A series of creative photos for Flowerknows.',
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
    title: 'Cape Aguilar',
    category: 'Photo',
    description: 'Scenic shots from Cape Aguilar.',
    coverImage: PhotoCapeaguilar[0],
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
    title: 'Casetify Airpods',
    category: 'Photo',
    description: 'Product shots for Casetify Airpods.',
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
    coverImage: PhotoKristel[0],
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
    title: 'Moto Adventures',
    category: 'Photo',
    description: 'Motorcycle journeys and adventures.',
    coverImage: PhotoMoto[0],
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
    description: 'Red-themed creative concepts.',
    coverImage: PhotoRedconcept[0],
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
    title: 'Street HK',
    category: 'Photo',
    description: 'Street photography in Hong Kong.',
    coverImage: PhotoStreethk[0],
    year: '2024',
    tags: ['Street', 'Urban', 'HK'],
    images: PhotoStreethk.map((src, idx) => ({
      id: `streethk-${idx + 1}`,
      src,
      title: `Street HK ${idx + 1}`
    }))
  },
  {
    id: 'tattoo-branding',
    title: 'Tattoo Branding Project',
    category: 'Photo',
    description: 'Professional corporate photography for business branding and marketing materials.',
    coverImage: PhotoTattoo[0],
    year: '2024',
    tags: ['Corporate', 'Branding', 'Professional', 'Business'],
    images: PhotoTattoo.map((src, idx) => ({
      id: `tattoo-${idx + 1}`,
      src,
      title: `Tattoo Branding ${idx + 1}`
    }))
  },

  // BRANDING PROJECTS
  {
    id: 'brand-a',
    title: 'Brand A Identity',
    category: 'Branding',
    description: 'Branding and identity design for Brand A.',
    coverImage: Branding[0],
    year: '2024',
    tags: ['Branding', 'Identity', 'Design'],
    images: Branding.map((src, idx) => ({
      id: `brand-a-${idx + 1}`,
      src,
      title: `Brand A ${idx + 1}`
    }))
  },
  {
    id: 'brand-b',
    title: 'Brand B Campaign',
    category: 'Branding',
    description: 'Branding campaign for Brand B.',
    coverImage: Branding[0],
    year: '2024',
    tags: ['Branding', 'Campaign'],
    images: Branding.map((src, idx) => ({
      id: `brand-b-${idx + 1}`,
      src,
      title: `Brand B ${idx + 1}`
    }))
  },
  {
    id: 'branding-general',
    title: 'General Branding Portfolio',
    category: 'Branding',
    description: 'Various branding projects.',
    coverImage: Branding[0],
    year: '2024',
    tags: ['Branding', 'Portfolio'],
    images: Branding.map((src, idx) => ({
      id: `branding-${idx + 1}`,
      src,
      title: `Branding ${idx + 1}`
    }))
  },

  // 3D PROJECTS
  {
    id: '3d-resort',
    title: 'Luxury Resort Visualization',
    category: '3D',
    description: 'Photorealistic 3D architectural visualization for a luxury resort development.',
    coverImage: ThreeD[0],
    year: '2024',
    tags: ['Architecture', '3D Rendering', 'Luxury', 'Visualization'],
    images: ThreeD.map((src, idx) => ({
      id: `3d-resort-${idx + 1}`,
      src,
      title: `Resort Visualization ${idx + 1}`
    }))
  },
  {
    id: '3d-product',
    title: 'Product Design Showcase',
    category: '3D',
    description: 'High-end 3D product visualization for consumer electronics and luxury goods.',
    coverImage: ThreeD[0],
    year: '2024',
    tags: ['Product Design', '3D Modeling', 'Rendering', 'Commercial'],
    images: ThreeD.map((src, idx) => ({
      id: `3d-product-${idx + 1}`,
      src,
      title: `Product Visualization ${idx + 1}`
    }))
  },
  {
    id: '3d-general',
    title: 'General 3D Portfolio',
    category: '3D',
    description: 'Various 3D projects.',
    coverImage: ThreeD[0],
    year: '2024',
    tags: ['3D', 'Portfolio'],
    images: ThreeD.map((src, idx) => ({
      id: `3d-general-${idx + 1}`,
      src,
      title: `3D ${idx + 1}`
    }))
  },

  // VIDEO PROJECTS
  {
    id: 'music-video',
    title: 'Music Video Production',
    category: 'Video',
    description: 'Creative music video with dynamic cinematography and post-production effects.',
    coverImage: ThreeD[0],
    year: '2024',
    tags: ['Music Video', 'Cinematography', 'Creative', 'Post-Production'],
    images: ThreeD.map((src, idx) => ({
      id: `music-video-${idx + 1}`,
      src,
      title: `Music Video Frame ${idx + 1}`,
      isVideo: true
    }))
  },
  {
    id: 'corporate-documentary',
    title: 'Corporate Documentary',
    category: 'Video',
    description: 'Professional documentary showcasing company culture and business operations.',
    coverImage: ThreeD[0],
    year: '2024',
    tags: ['Documentary', 'Corporate', 'Storytelling', 'Interview'],
    images: ThreeD.map((src, idx) => ({
      id: `corporate-doc-${idx + 1}`,
      src,
      title: `Corporate Documentary Frame ${idx + 1}`,
      isVideo: true
    }))
  }
];

export const categoryLabels = {
  Photo: "Photo",
  Video: "Video",
  "3D": "3D",
  Branding: "Branding"
};