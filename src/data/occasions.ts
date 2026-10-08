export interface Occasion {
  id: string;
  label: string;
  description: string;
  image: string;
  href: string;
}

export const OCCASIONS: Occasion[] = [
  {
    id: "wedding",
    label: "Wedding",
    description: "A timeless gift for new beginnings",
    image: "/coins/occasion-wedding.jpg",
    href: "/gold?occasion=wedding",
  },
  {
    id: "diwali",
    label: "Diwali",
    description: "Bring home prosperity",
    image: "/coins/divine-lakshmi.png",
    href: "/gold?occasion=diwali",
  },
  {
    id: "akshaya-tritiya",
    label: "Akshaya Tritiya",
    description: "An auspicious investment",
    image: "/coins/divine-ganesh.png",
    href: "/gold?occasion=akshaya-tritiya",
  },
  {
    id: "baby",
    label: "Baby",
    description: "A precious start to life",
    image: "/coins/divine-om.png",
    href: "/silver?occasion=baby",
  },
  {
    id: "anniversary",
    label: "Anniversary",
    description: "Celebrate everlasting bonds",
    image: "/coins/divine-radhakrishna.png",
    href: "/gold?occasion=anniversary",
  },
  {
    id: "corporate",
    label: "Corporate Gifts",
    description: "Meaningful business relations",
    image: "/coins/divine-hanuman.png",
    href: "/corporate",
  },
];