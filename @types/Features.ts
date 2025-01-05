// types/Features.ts
export interface Feature {
    title: string;
    description: string;
  }
  
  // Update Homepage.ts to include features
  export interface Homepage {
    // ... existing interfaces ...
    features: {
      sectionTitle: string;
      subtitle: string;
      featuresList: Feature[];
    };
  }