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
    id: 'luxury-wedding-hk',
    title: 'Luxury Wedding Collection',
    category: 'Photo',
    description: 'Elegant wedding photography capturing intimate moments in Hong Kong\'s most prestigious venues.',
    coverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    client: 'Private Client',
    year: '2024',
    tags: ['Wedding', 'Luxury', 'Hong Kong', 'Portrait'],
    images: [
      {
        id: 'wedding-1',
        src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Ceremony Moments',
        description: 'Capturing the sacred moments of the wedding ceremony'
      },
      {
        id: 'wedding-2',
        src: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Reception Details',
        description: 'Elegant reception setup and decoration details'
      },
      {
        id: 'wedding-3',
        src: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Couple Portraits',
        description: 'Romantic couple portraits in natural lighting'
      },
      {
        id: 'wedding-4',
        src: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Candid Moments',
        description: 'Spontaneous moments of joy and celebration'
      }
    ]
  },
  {
    id: 'fashion-editorial',
    title: 'Fashion Editorial Series',
    category: 'Photo',
    description: 'High-fashion editorial photography with creative styling and dramatic lighting.',
    coverImage: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
    client: 'Fashion Magazine',
    year: '2024',
    tags: ['Fashion', 'Editorial', 'Studio', 'Creative'],
    images: [
      {
        id: 'fashion-1',
        src: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Studio Setup',
        description: 'Professional studio fashion photography'
      },
      {
        id: 'fashion-2',
        src: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Creative Angles',
        description: 'Dynamic poses and creative composition'
      },
      {
        id: 'fashion-3',
        src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Detail Shots',
        description: 'Close-up details of fashion accessories'
      }
    ]
  },
  {
    id: 'corporate-branding',
    title: 'Corporate Branding Project',
    category: 'Photo',
    description: 'Professional corporate photography for business branding and marketing materials.',
    coverImage: 'https://images.pexels.com/photos/3184464/pexels-photo-3184464.jpeg?auto=compress&cs=tinysrgb&w=800',
    client: 'Tech Startup',
    year: '2024',
    tags: ['Corporate', 'Branding', 'Professional', 'Business'],
    images: [
      {
        id: 'corp-1',
        src: 'https://images.pexels.com/photos/3184464/pexels-photo-3184464.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Executive Portraits',
        description: 'Professional headshots for company executives'
      },
      {
        id: 'corp-2',
        src: 'https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Office Environment',
        description: 'Modern office spaces and work environments'
      },
      {
        id: 'corp-3',
        src: 'https://images.pexels.com/photos/3184462/pexels-photo-3184462.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Team Collaboration',
        description: 'Team meetings and collaborative work sessions'
      }
    ]
  },

  // Video Production Projects
  {
    id: 'music-video-production',
    title: 'Music Video Production',
    category: 'Video',
    description: 'Creative music video with dynamic cinematography and post-production effects.',
    coverImage: 'https://images.pexels.com/photos/3184461/pexels-photo-3184461.jpeg?auto=compress&cs=tinysrgb&w=800',
    client: 'Independent Artist',
    year: '2024',
    tags: ['Music Video', 'Cinematography', 'Creative', 'Post-Production'],
    images: [
      {
        id: 'music-1',
        src: 'https://images.pexels.com/photos/3184461/pexels-photo-3184461.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Performance Shots',
        description: 'Dynamic performance and lip-sync sequences',
        isVideo: true
      },
      {
        id: 'music-2',
        src: 'https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Creative Sequences',
        description: 'Artistic and conceptual video sequences',
        isVideo: true
      },
      {
        id: 'music-3',
        src: 'https://images.pexels.com/photos/3184459/pexels-photo-3184459.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Behind the Scenes',
        description: 'Production process and setup documentation'
      }
    ]
  },
  {
    id: 'corporate-documentary',
    title: 'Corporate Documentary',
    category: 'Video',
    description: 'Professional documentary showcasing company culture and business operations.',
    coverImage: 'https://images.pexels.com/photos/3184458/pexels-photo-3184458.jpeg?auto=compress&cs=tinysrgb&w=800',
    client: 'Fortune 500 Company',
    year: '2024',
    tags: ['Documentary', 'Corporate', 'Storytelling', 'Interview'],
    images: [
      {
        id: 'doc-1',
        src: 'https://images.pexels.com/photos/3184458/pexels-photo-3184458.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Executive Interviews',
        description: 'In-depth interviews with company leadership',
        isVideo: true
      },
      {
        id: 'doc-2',
        src: 'https://images.pexels.com/photos/3184457/pexels-photo-3184457.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Workplace Culture',
        description: 'Capturing authentic workplace interactions',
        isVideo: true
      },
      {
        id: 'doc-3',
        src: 'https://images.pexels.com/photos/3184456/pexels-photo-3184456.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Production Process',
        description: 'Manufacturing and operational processes'
      }
    ]
  },

  // 3D Projects
  {
    id: 'architectural-visualization',
    title: 'Luxury Resort Visualization',
    category: '3D',
    description: 'Photorealistic 3D architectural visualization for a luxury resort development.',
    coverImage: 'https://images.pexels.com/photos/3184455/pexels-photo-3184455.jpeg?auto=compress&cs=tinysrgb&w=800',
    client: 'Architecture Firm',
    year: '2024',
    tags: ['Architecture', '3D Rendering', 'Luxury', 'Visualization'],
    images: [
      {
        id: 'arch-1',
        src: 'https://images.pexels.com/photos/3184455/pexels-photo-3184455.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Exterior Views',
        description: 'Stunning exterior architectural renderings'
      },
      {
        id: 'arch-2',
        src: 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Interior Spaces',
        description: 'Luxurious interior design visualizations'
      },
      {
        id: 'arch-3',
        src: 'https://images.pexels.com/photos/3184453/pexels-photo-3184453.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Landscape Design',
        description: 'Integrated landscape and environmental design'
      },
      {
        id: 'arch-4',
        src: 'https://images.pexels.com/photos/3184452/pexels-photo-3184452.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Night Renderings',
        description: 'Atmospheric night-time architectural views'
      }
    ]
  },
  {
    id: 'product-visualization',
    title: 'Product Design Showcase',
    category: '3D',
    description: 'High-end 3D product visualization for consumer electronics and luxury goods.',
    coverImage: 'https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg?auto=compress&cs=tinysrgb&w=800',
    client: 'Consumer Electronics Brand',
    year: '2024',
    tags: ['Product Design', '3D Modeling', 'Rendering', 'Commercial'],
    images: [
      {
        id: 'prod-1',
        src: 'https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Hero Product Shots',
        description: 'Premium product renderings for marketing'
      },
      {
        id: 'prod-2',
        src: 'https://images.pexels.com/photos/3184450/pexels-photo-3184450.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Technical Details',
        description: 'Detailed technical and feature visualizations'
      },
      {
        id: 'prod-3',
        src: 'https://images.pexels.com/photos/3184449/pexels-photo-3184449.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Lifestyle Context',
        description: 'Products shown in real-world usage scenarios'
      }
    ]
  },

  // Branding projects
  {
    id: 'beauty-branding-series',
    title: 'Beauty branding Portfolio',
    category: 'Branding',
    description: 'Professional beauty and fashion branding with natural skin enhancement techniques.',
    coverImage: 'https://images.pexels.com/photos/3184448/pexels-photo-3184448.jpeg?auto=compress&cs=tinysrgb&w=800',
    client: 'Beauty Brand',
    year: '2024',
    tags: ['Beauty', 'branding', 'Fashion', 'Skin Enhancement'],
    images: [
      {
        id: 'beauty-1',
        src: 'https://images.pexels.com/photos/3184448/pexels-photo-3184448.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Before & After',
        description: 'Natural beauty enhancement and skin branding'
      },
      {
        id: 'beauty-2',
        src: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Color Grading',
        description: 'Professional color correction and grading'
      },
      {
        id: 'beauty-3',
        src: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Detail Enhancement',
        description: 'Fine detail work and texture enhancement'
      }
    ]
  },
  {
    id: 'commercial-compositing',
    title: 'Commercial Compositing',
    category: 'Branding',
    description: 'Complex photo compositing and manipulation for advertising and commercial use.',
    coverImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
    client: 'Advertising Agency',
    year: '2024',
    tags: ['Compositing', 'Commercial', 'Advertising', 'Digital Art'],
    images: [
      {
        id: 'comp-1',
        src: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Creative Composites',
        description: 'Complex multi-image compositing work'
      },
      {
        id: 'comp-2',
        src: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Background Replacement',
        description: 'Seamless background and environment changes'
      },
      {
        id: 'comp-3',
        src: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1200',
        title: 'Digital Artistry',
        description: 'Creative digital art and manipulation techniques'
      }
    ]
  }
];

export const categoryLabels = {
  Photo: "Photo",
  Video: "Video Production", 
  "3D": "3D",
  Branding: "Branding"
};