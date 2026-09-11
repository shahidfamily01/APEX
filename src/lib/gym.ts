import CardioZoneImg from "@/assets/Services_Pictures/Cardio Zone.jpeg";
import CardioCrossfitImg from "@/assets/Services_Pictures/Cardio and Crossfit.jpeg";
import LockerRoomsImg from "@/assets/Services_Pictures/Locker Rooms.jpeg";
import SpinCyclingImg from "@/assets/Services_Pictures/Spin and Cycling.jpeg";
import StrengthMachinesImg from "@/assets/Services_Pictures/Strength and machines.jpeg";

const imageUrls = {
  logo: "/images/apex-logo-transparent.png",
  hero: "/images/trainers/Najam.jpeg",
  trainerOne: "/images/trainers/Najam.jpeg",
  trainerTwo: "/images/trainers/Adil.jpeg",
  trainerThree: "/images/trainers/Fasih.jpeg",
  trainerLadies: "/images/trainers/Shezadi.jpeg",
  cardioTreadmills:
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=85",
  cableTraining:
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85",
  strengthFloor:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85",
  boxingZone:
    "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=85",
  cardioZone:
    "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=85",
  spinBikes:
    "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1200&q=85",
  cyclingStudio:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=85",
  strengthMachine:
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85",
  memberLockers:
    "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1200&q=85",
  nutritionShelf:
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=85",
} as const;

export const najamUrl = imageUrls.hero;
export const logoUrl = imageUrls.logo;

export const MEMBER_STAT = "2500+";

export const GYM = {
  name: "Apex Fit Club",
  email: "apexfitclub@gmail.com",
  whatsapp: "923305966918",
  whatsappDisplay: "0330-5966918",
  address:
    "Opposite 1st Floor Madina Tower, Near Punjab Cash and Carry, Range Road, Rawalpindi",
  mapQuery: "Apex Fit Club Rawalpindi",
  socials: {
    tiktok: "https://www.tiktok.com/@apexfitclub_official",
    instagram: "https://www.instagram.com/apexfitclub_official/",
    facebook: "",
  },
} as const;

export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  GYM.mapQuery,
)}&t=&z=15&ie=UTF8&iwloc=B&output=embed`;
export const mapDirectionsUrl = "https://share.google/6tCcEpGw42O940tnn";

export const services = [
  {
    title: "Personal Training",
    desc: "One-on-one coaching built around your goals and schedule.",
    photo: imageUrls.strengthFloor,
  },
  {
    title: "Group Fitness Classes",
    desc: "High-energy sessions that keep the whole floor moving.",
    photo: imageUrls.cyclingStudio,
  },
  {
    title: "Cardio & CrossFit",
    desc: "Conditioning circuits, treadmills, rowers and functional rigs.",
    photo: CardioCrossfitImg,
  },
  {
    title: "Strength & Machines",
    desc: "Full cable stations, plate machines and a loaded free-weight floor.",
    photo: StrengthMachinesImg,
  },
  {
    title: "Boxing & Kickboxing",
    desc: "Bag work, pad rounds and conditioning on the turf zone.",
    photo: imageUrls.boxingZone,
  },
  {
    title: "Spin & Cycling",
    desc: "Indoor cycling bikes for fat loss and endurance sessions.",
    photo: SpinCyclingImg,
  },
  {
    title: "Nutritional Counseling",
    desc: "Diet plans matched to your training block and budget.",
    photo: imageUrls.nutritionShelf,
  },
  {
    title: "Locker Rooms",
    desc: "Clean, secure changing area and lockers for every member.",
    photo: LockerRoomsImg,
  },
  {
    title: "Cardio Zone",
    desc: "Treadmills, ellipticals and steady-state cardio equipment.",
    photo: CardioZoneImg,
  },
  {
    title: "Physiotherapy & Recovery",
    desc: "Injury screening, recovery work and mobility support.",
    photo: imageUrls.strengthMachine,
  },
] as const;

export type Trainer = {
  name: string;
  role: string;
  experience: string;
  specialties: string[];
  certifications?: string[];
  bio: string;
  whatsapp: string;
  phoneDisplay: string;
  photo: string | null;
  owner: boolean;
};

export const trainers: Trainer[] = [
  {
    name: "Najam Ali Tariq",
    role: "Owner",
    experience: "10 years experience",
    specialties: ["Strength", "Muscle Gain", "Fat Loss", "Cardio", "CrossFit", "HIIT"],
    bio: "Founder of Apex Fit Club. Builds complete transformation plans covering strength, conditioning and full body building coaching.",
    whatsapp: "923305966918",
    phoneDisplay: "0330-5966918",
    photo: imageUrls.trainerOne,
    owner: true,
  },
  {
    name: "Adil",
    role: "Manager",
    experience: "7 years experience",
    specialties: [
      "Boxing",
      "Kickboxing",
      "Strength",
      "Cardio",
      "CrossFit",
      "HIIT",
      "Fat Loss",
      "Diet Plan",
    ],
    bio: "Manages the training floor and coaches boxing, kickboxing, CrossFit and conditioning alongside strength programming.",
    whatsapp: "923335210375",
    phoneDisplay: "0333-5210375",
    photo: imageUrls.trainerTwo,
    owner: false,
  },
  {
    name: "Fasih",
    role: "Trainer",
    experience: "5 years experience",
    specialties: ["Strength", "Muscle Gain", "Fat Loss"],
    bio: "Floor trainer working one-on-one with members on technique, routine planning and steady progress.",
    whatsapp: "923224052167",
    phoneDisplay: "0322-4052167",
    photo: imageUrls.trainerThree,
    owner: false,
  },
  {
    name: "Arslan",
    role: "Trainer",
    experience: "",
    specialties: ["Cardio", "Strength", "Muscle Gain", "Full Body Fitness", "Diet Plan"],
    bio: "Coach for members who want power, conditioning, clean lifting form and full body fitness.",
    whatsapp: "923150428249",
    phoneDisplay: "0315-0428249",
    photo: null,
    owner: false,
  },
];

export const ladiesTrainers: Trainer[] = [
  {
    name: "Shehzadi Wafa Waqar",
    role: "Ladies Master Trainer",
    experience: "PSCA Certified — Level I, II & III",
    specialties: ["Get Pro Fitness", "Strength and Cardio"],
    certifications: [
      "PSCA Level I Certified",
      "PSCA Level II (Fitness, Nutrition & Rehabilitation)",
      "PSCA Level III Certified — Master Trainer (Sports Nutrition, Fitness, Gym, Rehabilitation & First Aid)",
    ],
    bio: "Ladies-only master trainer coaching strength, cardio, nutrition and rehabilitation in our private women's hours.",
    whatsapp: "923110091690",
    phoneDisplay: "0311-0091690",
    photo: imageUrls.trainerLadies,
    owner: false,
  },
];

export const trainersFor = (gender: "male" | "female") =>
  gender === "female" ? ladiesTrainers : trainers;

export const plans = [
  { name: "Admission Fee", price: 1000, note: "One-time, on joining" },
  { name: "Strength Training", price: 2500, note: "Per month" },
  { name: "Cardio", price: 3000, note: "Per month" },
  { name: "Strength + Cardio", price: 5000, note: "Per month", featured: true },
  { name: "Trial (1 Day)", price: 200, note: "Single session" },
  { name: "One-Day Cardio + Gym Pass", price: 400, note: "Single day" },
] as const;

export const offers = [
  "Pay 6 months upfront → get 1 month FREE",
  "Pay 1 year upfront → get 2 months FREE",
] as const;

export const timings = {
  gents: ["6:00 AM – 10:00 AM", "4:00 PM – 1:00 AM"],
  ladies: ["10:00 AM – 4:00 PM"],
} as const;

export const waLink = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
