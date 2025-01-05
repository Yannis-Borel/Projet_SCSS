export interface Homepage {
    // ... existing interfaces ...
    partners: {
      title: string;
      description: string;
      buttonText: string;
      partnerBoxes: Array<{
        backgroundColor: string;
        logoColor: string;
      }>;
    };
  }