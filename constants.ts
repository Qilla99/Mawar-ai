
import type { AspectRatioOption, ClothingOption, Option } from './types';

export const CLOTHING_DATABASE: ClothingOption[] = [
  { id: "001", label: "1. Kaos putih polos + Jeans slim biru + Sneakers putih + Tote bag krem, anting stud" },
  { id: "002", label: "2. Kemeja denim lengan digulung + Celana kulot krem + Loafers cokelat + Jam tangan silver, kacamata hitam" },
  { id: "003", label: "3. Sweater abu oversized + Legging hitam + Ankle boots cokelat + Scrunchie, kalung tipis" },
  { id: "004", label: "4. Blouse putih berenda + Rok midi denim + Flat shoes nude + Tas selempang kecil, gelang manik" },
  { id: "005", label: "5. Kaos bergaris navy-putih + Celana chino beige + Sneakers pink pastel + Topi baseball, ear cuff" },
  { id: "006", label: "6. Cardigan rajut krem + Jeans ripped + Converse putih + Tas ransel mini, anting hoop" },
  { id: "007", label: "7. Tank top hitam + Celana pendek denim + Sandal slide putih + Kacamata aviator, gelang tali" },
  { id: "008", label: "8. Blouse floral pastel + Celana jogger abu + Sneakers chunky putih + Tas anyaman, kalung liontin" },
  { id: "009", label: "9. Kemeja kotak-kotak merah + Rok plisket krem + Oxford shoes cokelat + Ikat pinggang tipis, jam tangan" },
  { id: "010", label: "10. Hoodie abu + Celana cargo krem + Sneakers hitam + Beanie, tas pinggang" }
];

export const ASPECT_RATIOS: AspectRatioOption[] = [
  { value: "9:16", label: "Story (9:16)", icon: "📱" },
  { value: "1:1", label: "Square (1:1)", icon: "⬛" },
  { value: "16:9", label: "Wide (16:9)", icon: "📺" },
  { value: "3:4", label: "Portrait (3:4)", icon: "🖼️" }
];

export const CAMERA_ANGLES: Option[] = [
  { value: "eye_level", label: "Eye-level (setinggi mata)" },
  { value: "low_angle", label: "Low angle (dari bawah)" },
  { value: "high_angle", label: "High angle (dari atas)" },
  { value: "bird_eye", label: "Bird’s-eye view" },
  { value: "worm_eye", label: "Worm’s-eye view" },
  { value: "over_shoulder", label: "Over-the-shoulder" },
  { value: "close_up", label: "Close-up" },
  { value: "medium_shot", label: "Medium shot" },
  { value: "full_body", label: "Full body" },
  { value: "dutch_angle", label: "Dutch angle / tilted" }
];

export const POSES: Option[] = [
  { value: "standing_straight", label: "Berdiri tegak" },
  { value: "sitting_relaxed", label: "Duduk santai" },
  { value: "leaning_wall", label: "Bersandar di dinding" },
  { value: "walking_forward", label: "Berjalan ke depan" },
  { value: "peace_sign", label: "Peace sign (V-pose)" },
  { value: "heart_hands", label: "Heart hands (saranghae)" },
  { value: "looking_back", label: "Melihat ke belakang bahu" },
  { value: "hand_on_chin", label: "Tangan di dagu" },
  { value: "twirling", label: "Berputar (twirling)" },
  { value: "candid_laugh", label: "Candid tertawa" }
];

export const LOCATIONS: Option[] = [
  { value: "studio_soft", label: "Studio foto backdrop lembut" },
  { value: "street_city", label: "Jalan kota lampu neon" },
  { value: "cafe", label: "Kafe estetik kayu & tanaman" },
  { value: "room_kawaii", label: "Kamar kawaii boneka & pastel" },
  { value: "park", label: "Taman hijau berbunga" },
  { value: "beach", label: "Pantai golden hour" },
  { value: "night_city", label: "Kota malam bokeh" },
  { value: "rooftop", label: "Rooftop langit senja" },
  { value: "nature_forest", label: "Hutan cahaya matahari" },
  { value: "indoor_minimal", label: "Ruang minimalis putih" }
];

export const HAIRSTYLES: Option[] = [
  { value: "long_straight", label: "Panjang lurus" },
  { value: "long_wavy", label: "Panjang bergelombang" },
  { value: "medium_bob", label: "Bob sebahu" },
  { value: "short_pixie", label: "Pixie pendek" },
  { value: "twin_tails", label: "Twin tails kawaii" },
  { value: "ponytail_high", label: "Ponytail tinggi" },
  { value: "ponytail_low", label: "Ponytail rendah" },
  { value: "bun_messy", label: "Messy bun" },
  { value: "braid_single", label: "Kepang satu" },
  { value: "braid_double", label: "Kepang dua" },
  { value: "hijab_neat", label: "Hijab modern" }
];

export const MAKEUP_STYLES: Option[] = [
  { value: "no_makeup", label: "No-makeup natural" },
  { value: "soft_kawaii", label: "Soft kawaii pink blush" },
  { value: "glam", label: "Glam bold lipstick" },
  { value: "ig_filter", label: "IG Filter glowing" },
  { value: "e_girl", label: "E-girl intense blush" },
  { value: "ombre_lips", label: "Bibir ombre Korea" },
  { value: "fox_eyes", label: "Fox eyes" },
  { value: "freckles", label: "Freckles halus" }
];

export const PHOTOGRAPHY_STYLES: Option[] = [
  { value: "portrait_studio", label: "Portrait studio clean" },
  { value: "fashion_editorial", label: "Fashion editorial" },
  { value: "street_photography", label: "Street photography" },
  { value: "lifestyle", label: "Lifestyle candid" },
  { value: "beauty_closeup", label: "Beauty close-up" },
  { value: "fullbody_lookbook", label: "Full-body lookbook" },
  { value: "film_style", label: "Film / analog look" },
  { value: "high_key", label: "High-key bright" },
  { value: "low_key", label: "Low-key moody" },
  { value: "bokeh_background", label: "Bokeh background" }
];
