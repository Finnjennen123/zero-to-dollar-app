export interface Theme {
  id: string;
  name: string;
  accent: string;
  accentHover: string;
  accentSoft: string;
}

export const THEMES: Theme[] = [
  { 
    id: "warm-coral",   
    name: "Warm Coral",   
    accent: "#E8735A", 
    accentHover: "#D8614A", 
    accentSoft: "rgba(232,115,90,0.12)" 
  },
  { 
    id: "ocean-blue",   
    name: "Ocean Blue",   
    accent: "#3B82C4", 
    accentHover: "#2E6BA8", 
    accentSoft: "rgba(59,130,196,0.12)" 
  },
  { 
    id: "forest-green", 
    name: "Forest Green", 
    accent: "#5B8C6A", 
    accentHover: "#4A7557", 
    accentSoft: "rgba(91,140,106,0.12)" 
  },
  { 
    id: "dusty-rose",   
    name: "Dusty Rose",   
    accent: "#C57B7B", 
    accentHover: "#A86363", 
    accentSoft: "rgba(197,123,123,0.12)" 
  },
  { 
    id: "midnight-dark",
    name: "Midnight",     
    accent: "#1E1E2E", 
    accentHover: "#0F0F1E", 
    accentSoft: "rgba(30,30,46,0.12)" 
  },
  { 
    id: "golden-hour",  
    name: "Golden Hour",  
    accent: "#D4A853", 
    accentHover: "#BE9340", 
    accentSoft: "rgba(212,168,83,0.12)" 
  },
];
