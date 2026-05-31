export interface Practical {
    id: string;
    number: number;
    title: string;
    aim: string;
    code?: string;
    explanation?: string;
    language?: string;
  }
  
  export interface Subject {
    id: string;
    url: string;
    name: string;
    iconName: string; // Used to dynamic render Lucide icons
    description: string;
    themeColor: string; // e.g. 'purple', 'blue', 'emerald'
    practicalCount: number;
    practicals: Practical[];
  }
  
  export interface Testimonial {
    id: string;
    name: string;
    role: string;
    avatar: string;
    comment: string;
    college: string;
    rating: number;
  }
  
  export interface Feature {
    id: string;
    iconName: string;
    title: string;
    description: string;
    badge?: string;
  }
  
  export interface Step {
    number: number;
    title: string;
    description: string;
    badge: string;
  }
  