import {
  Branding,
  PhotoKristel,
  PhotoLandscape,
  PhotoMoto,
  PhotoStreet,
  PhotoStudio,
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
  // Photography Projects
  {
    id: 'kristel-photos',
    title: 'Portraits of my Partner',
    category: 'Photo',
    description: 'I love taking portraits of my partner and capturing special moments together.',
    coverImage: PhotoKristel[0], // Use the first image as cover
    client: 'K******',
    year: 'Mixed',
    tags: ['Partner', 'Portrait', 'Candid', 'Girl'],
    images: PhotoKristel.map((src, idx) => ({
      id: `kristel-${idx + 1}`,
      src,
      title: `Kristel Portrait ${idx + 1}`
    }))
  },
  {
    id: 'fashion-editorial',
    title: 'Fashion Editorial Series',
    category: 'Photo',
    description: 'High-fashion editorial photography with creative styling and dramatic lighting.',
    coverImage: PhotoStudio[0],
    client: 'Fashion Magazine',
    year: '2024',
    tags: ['Fashion', 'Editorial', 'Studio', 'Creative'],
    images: PhotoStudio.map((src, idx) => ({
      id: `studio-${idx + 1}`,
      src,
      title: `Studio Editorial ${idx + 1}`
    }))
  },
  {
    id: 'corporate-branding',
    title: 'Corporate Branding Project',
    category: 'Photo',
    description: 'Professional corporate photography for business branding and marketing materials.',
    coverImage: PhotoTattoo[0],
    client: 'Tech Startup',
    year: '2024',
    tags: ['Corporate', 'Branding', 'Professional', 'Business'],
    images: PhotoTattoo.map((src, idx) => ({
      id: `tattoo-${idx + 1}`,
      src,
      title: `Tattoo Branding ${idx + 1}`
    }))
  },
  {
    id: 'landscape-series',
    title: 'Landscape Series',
    category: 'Photo',
    description: 'Scenic landscapes from various locations.',
    coverImage: PhotoLandscape[0],
    client: 'Personal',
    year: '2024',
    tags: ['Landscape', 'Nature', 'Scenery'],
    images: PhotoLandscape.map((src, idx) => ({
      id: `landscape-${idx + 1}`,
      src,
      title: `Landscape ${idx + 1}`
    }))
  },
  {
    id: 'moto-adventures',
    title: 'Moto Adventures',
    category: 'Photo',
    description: 'Motorcycle journeys and adventures.',
    coverImage: PhotoMoto[0],
    client: 'Personal',
    year: '2024',
    tags: ['Moto', 'Adventure', 'Travel'],
    images: PhotoMoto.map((src, idx) => ({
      id: `moto-${idx + 1}`,
      src,
      title: `Moto Adventure ${idx + 1}`
    }))
  },
  {
    id: 'street-photography',
    title: 'Street Photography',
    category: 'Photo',
    description: 'Candid moments and urban life.',
    coverImage: PhotoStreet[0],
    client: 'Personal',
    year: '2024',
    tags: ['Street', 'Urban', 'Candid'],
    images: PhotoStreet.map((src, idx) => ({
      id: `street-${idx + 1}`,
      src,
      title: `Street Photo ${idx + 1}`
    }))
  },

  // Video Production Projects (using PhotoMoto as placeholder, update if you have video thumbnails)
  {
    id: 'music-video-production',
    title: 'Music Video Production',
    category: 'Video',
    description: 'Creative music video with dynamic cinematography and post-production effects.',
    coverImage: PhotoMoto[0],
    client: 'Independent Artist',
    year: '2024',
    tags: ['Music Video', 'Cinematography', 'Creative', 'Post-Production'],
    images: PhotoMoto.map((src, idx) => ({
      id: `music-video-${idx + 1}`,
      src,
      title: `Music Video Frame ${idx + 1}`,
      isVideo: true // Set true if these are video thumbnails
    }))
  },
  {
    id: 'corporate-documentary',
    title: 'Corporate Documentary',
    category: 'Video',
    description: 'Professional documentary showcasing company culture and business operations.',
    coverImage: PhotoStreet[0],
    client: 'Fortune 500 Company',
    year: '2024',
    tags: ['Documentary', 'Corporate', 'Storytelling', 'Interview'],
    images: PhotoStreet.map((src, idx) => ({
      id: `corporate-doc-${idx + 1}`,
      src,
      title: `Corporate Documentary Frame ${idx + 1}`,
      isVideo: true // Set true if these are video thumbnails
    }))
  },

  // 3D Projects
  {
    id: 'architectural-visualization',
    title: 'Luxury Resort Visualization',
    category: '3D',
    description: 'Photorealistic 3D architectural visualization for a luxury resort development.',
    coverImage: ThreeD[0],
    client: 'Architecture Firm',
    year: '2024',
    tags: ['Architecture', '3D Rendering', 'Luxury', 'Visualization'],
    images: ThreeD.map((src, idx) => ({
      id: `3d-arch-${idx + 1}`,
      src,
      title: `3D Visualization ${idx + 1}`
    }))
  },
  {
    id: 'product-visualization',
    title: 'Product Design Showcase',
    category: '3D',
    description: 'High-end 3D product visualization for consumer electronics and luxury goods.',
    coverImage: ThreeD[1],
    client: 'Consumer Electronics Brand',
    year: '2024',
    tags: ['Product Design', '3D Modeling', 'Rendering', 'Commercial'],
    images: ThreeD.map((src, idx) => ({
      id: `3d-product-${idx + 1}`,
      src,
      title: `3D Product ${idx + 1}`
    }))
  },

  // Branding projects
  {
    id: 'beauty-branding-series',
    title: 'Beauty Branding Portfolio',
    category: 'Branding',
    description: 'Professional beauty and fashion branding with natural skin enhancement techniques.',
    coverImage: Branding[0],
    client: 'Beauty Brand',
    year: '2024',
    tags: ['Beauty', 'Branding', 'Fashion', 'Skin Enhancement'],
    images: Branding.map((src, idx) => ({
      id: `branding-${idx + 1}`,
      src,
      title: `Branding ${idx + 1}`
    }))
  },
  {
    id: 'commercial-compositing',
    title: 'Commercial Compositing',
    category: 'Branding',
    description: 'Complex photo compositing and manipulation for advertising and commercial use.',
    coverImage: Branding[1],
    client: 'Advertising Agency',
    year: '2024',
    tags: ['Compositing', 'Commercial', 'Advertising', 'Digital Art'],
    images: Branding.map((src, idx) => ({
      id: `branding-commercial-${idx + 1}`,
      src,
      title: `Branding Commercial ${idx + 1}`
    }))
  }
];

export const categoryLabels = {
  Photo: "Photo",
  Video: "Video Production", 
  "3D": "3D",
  Branding: "Branding"
};