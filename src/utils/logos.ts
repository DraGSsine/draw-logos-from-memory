export interface Logo {
  id: string;
  brandName: string;
  description: string;
  primaryColor: string;
  difficulty: "easy" | "medium" | "hard";
  imageUrl: string;
}

export const logos: Logo[] = [
  {
    id: "apple",
    brandName: "Apple",
    description: "A simple apple with a bite taken out of it",
    primaryColor: "#000000",
    difficulty: "easy",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png",
  },
  {
    id: "nike",
    brandName: "Nike",
    description: "The famous swoosh",
    primaryColor: "#000000",
    difficulty: "easy",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
  },
  {
    id: "mcdonalds",
    brandName: "McDonald's",
    description: "The golden arches",
    primaryColor: "#FFC72C",
    difficulty: "easy",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
  },
  {
    id: "starbucks",
    brandName: "Starbucks",
    description: "A twin-tailed mermaid or siren",
    primaryColor: "#006241",
    difficulty: "medium",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
  },
  {
    id: "twitter",
    brandName: "Twitter",
    description: "A simple blue bird",
    primaryColor: "#1DA1F2",
    difficulty: "medium",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/1200px-Logo_of_Twitter.svg.png",
  },
  {
    id: "adidas",
    brandName: "Adidas",
    description: "Three parallel stripes or mountain shape",
    primaryColor: "#000000",
    difficulty: "medium",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png",
  },
  {
    id: "volkswagen",
    brandName: "Volkswagen",
    description: "The letters V and W stacked within a circle",
    primaryColor: "#003399",
    difficulty: "hard",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/1200px-Volkswagen_logo_2019.svg.png",
  },
  {
    id: "pepsi",
    brandName: "Pepsi",
    description: "Red, white and blue circle with a wavy line",
    primaryColor: "#004B93",
    difficulty: "hard",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_logo_2014.svg/1200px-Pepsi_logo_2014.svg.png",
  },
  {
    id: "google",
    brandName: "Google",
    description: "Colorful text with blue, red, yellow, and green",
    primaryColor: "#4285F4",
    difficulty: "medium",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
  },
  {
    id: "amazon",
    brandName: "Amazon",
    description: "Arrow pointing from A to Z with a smile",
    primaryColor: "#FF9900",
    difficulty: "medium",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
  },
  {
    id: "microsoft",
    brandName: "Microsoft",
    description: "Four colored squares forming a larger square",
    primaryColor: "#F25022",
    difficulty: "easy",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
  },
  {
    id: "coca-cola",
    brandName: "Coca-Cola",
    description: "Distinctive flowing red script",
    primaryColor: "#F40009",
    difficulty: "easy",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1200px-Coca-Cola_logo.svg.png",
  },
  {
    id: "coca-cola",
    brandName: "Coca-Cola",
    description: "Distinctive flowing red script",
    primaryColor: "#F40009",
    difficulty: "easy",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1200px-Coca-Cola_logo.svg.png",
  },
  {
    id: "tesla",
    brandName: "Tesla",
    description:
      "Stylized 'T' shape that resembles a cross-section of an electric motor",
    primaryColor: "#E82127",
    difficulty: "medium",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/1200px-Tesla_logo.png",
  },
];

// Function to get a random logo
export const getRandomLogo = (exclude: string[] = []): Logo => {
  const availableLogos = logos.filter((logo) => !exclude.includes(logo.id));
  if (availableLogos.length === 0) return logos[0];

  const randomIndex = Math.floor(Math.random() * availableLogos.length);
  return availableLogos[randomIndex];
};

// Function to get a logo by id
export const getLogoById = (id: string): Logo | undefined => {
  return logos.find((logo) => logo.id === id);
};
