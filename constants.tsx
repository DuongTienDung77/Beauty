import React from 'react';
import type { Feature, Style } from './types';

export const PremiumIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5L14.326 8.326L21.5 9.5L16.25 14.5L17.652 21.652L12 18L6.348 21.652L7.75 14.5L2.5 9.5L9.674 8.326L12 1.5Z" />
    </svg>
);

const newIconUrl = 'https://megicmediaai.byethost33.com/icon12.png';
const placeholderImage = newIconUrl;

const intensityStyles: Style[] = [
    { id: 'none', label: 'Không', englishLabel: 'None', type: 'intensity', value: 'None' },
    { id: 'light', label: 'Nhẹ', englishLabel: 'Light', type: 'intensity', value: 'Light' },
    { id: 'medium', label: 'Vừa', englishLabel: 'Medium', type: 'intensity', value: 'Medium' },
    { id: 'strong', label: 'Mạnh', englishLabel: 'Strong', type: 'intensity', value: 'Strong', isPremium: true },
];

const smileStyles: Style[] = [
    { id: 'none', label: 'Không', englishLabel: 'None', type: 'intensity', value: 'None' },
    { id: 'subtle', label: 'Cười mỉm', englishLabel: 'Subtle Lift', type: 'intensity', value: 'Subtle' },
    { id: 'gentle', label: 'Nhẹ nhàng', englishLabel: 'Gentle Smile', type: 'intensity', value: 'Gentle' },
    { id: 'joyful', label: 'Rạng rỡ', englishLabel: 'Joyful Beam', type: 'intensity', value: 'Joyful', isPremium: true },
];

// --- New Style Definitions ---

const appleLightingStyles: Style[] = [
    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
    { id: 'natural', label: 'Tự nhiên', englishLabel: 'Natural Light', type: 'image', value: newIconUrl },
    { id: 'studio', label: 'Studio', englishLabel: 'Studio Light', type: 'image', value: newIconUrl, isPremium: true },
    { id: 'dramatic', label: 'Kịch tính', englishLabel: 'Dramatic', type: 'image', value: newIconUrl },
];

const filmStockStyles: Style[] = [
    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
    { id: 'fuji', label: 'Fuji', englishLabel: 'Fuji Velvia', type: 'image', value: newIconUrl },
    { id: 'kodak', label: 'Kodak', englishLabel: 'Kodak Portra', type: 'image', value: newIconUrl, isPremium: true },
    { id: 'agfa', label: 'Agfa', englishLabel: 'Agfa Vista', type: 'image', value: newIconUrl },
];

const flashTypeStyles: Style[] = [
    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
    { id: 'direct', label: 'Trực tiếp', englishLabel: 'Direct Flash', type: 'image', value: newIconUrl },
    { id: 'ring', label: 'Ring', englishLabel: 'Ring Flash', type: 'image', value: newIconUrl, isPremium: true },
    { id: 'soft', label: 'Mềm', englishLabel: 'Soft Bounce', type: 'image', value: newIconUrl },
];

const flashGelStyles: Style[] = [
    { id: 'none', label: 'Không', englishLabel: 'None', type: 'color', value: 'transparent' },
    { id: 'warm', label: 'Ấm', englishLabel: 'Warm Gel', type: 'color', value: '#FFDDC1' },
    { id: 'cool', label: 'Lạnh', englishLabel: 'Cool Gel', type: 'color', value: '#D6EAF8' },
    { id: 'red', label: 'Đỏ', englishLabel: 'Red Gel', type: 'color', value: '#FADBD8', isPremium: true },
];

const seasonalFilterStyles: Style[] = [
    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
    { id: 'spring', label: 'Xuân', englishLabel: 'Spring', type: 'image', value: newIconUrl },
    { id: 'summer', label: 'Hè', englishLabel: 'Summer', type: 'image', value: newIconUrl },
    { id: 'autumn', label: 'Thu', englishLabel: 'Autumn', type: 'image', value: newIconUrl, isPremium: true },
    { id: 'winter', label: 'Đông', englishLabel: 'Winter', type: 'image', value: newIconUrl },
];

const idPhotoBgStyles: Style[] = [
    { id: 'none', label: 'Không', englishLabel: 'None', type: 'color', value: 'transparent' },
    { id: 'white', label: 'Trắng', englishLabel: 'White', type: 'color', value: '#FFFFFF', promptInstruction: "Carefully cut out the main subject and place them on a clean, solid white background suitable for an ID photo." },
    { id: 'blue', label: 'Xanh', englishLabel: 'Blue', type: 'color', value: '#E1F5FE', promptInstruction: "Carefully cut out the main subject and place them on a clean, solid light blue background suitable for an ID photo." },
    { id: 'gray', label: 'Xám', englishLabel: 'Gray', type: 'color', value: '#EEEEEE', isPremium: true, promptInstruction: "Carefully cut out the main subject and place them on a clean, solid light gray background suitable for an ID photo." },
];

// --- Skin Tone Presets ---
const skinToneVariants = [
    { id: 'STV_PORCELAIN_COOL', name: 'Porcelain Cool (Rosa-Peach)' },
    { id: 'STV_FAIR_NEUTRAL', name: 'Fair Neutral (Neutral-Pink)' },
    { id: 'STV_LIGHT_WARM', name: 'Light Warm (Peach-Gold)' },
    { id: 'STV_MEDIUM_NEUTRAL', name: 'Medium Neutral (Balanced Beige)' },
    { id: 'STV_OLIVE_NEUTRAL', name: 'Olive Neutral (Green-Undertone Control)' },
    { id: 'STV_TAN_GOLDEN', name: 'Tan Golden (Sun-kissed)' },
    { id: 'STV_DEEP_WARM', name: 'Deep Warm (Amber Chestnut)' },
    { id: 'STV_DEEP_NEUTRAL', name: 'Deep Neutral (Balanced Ebony)' },
    { id: 'STV_ASIAN_NEUTRAL_PINK', name: 'East-Asian Neutral Pink' },
    { id: 'STV_SOUTH_ASIAN_GOLD_OLIVE', name: 'South-Asian Golden Olive' },
    { id: 'STV_UNIFORM_MATCH', name: 'Uniform Match (Face–Neck–Chest)' },
    { id: 'PG01', name: 'Porcelain Glow – Neutral Ivory' },
    { id: 'PG02', name: 'Porcelain Glow – Warm Peach' },
    { id: 'PG03', name: 'Porcelain Glow – Cool Rose' },
    { id: 'PG04', name: 'Porcelain Glow – Freckle Friendly' },
    { id: 'PG05', name: 'Porcelain Glow – Oily Control' },
    { id: 'PG06', name: 'Porcelain Glow – Jewelry Macro' },
    { id: 'PG07', name: 'Porcelain Glow – High Key Ivory' },
    { id: 'PG08', name: 'Porcelain Glow – Low Key Cocoa' },
    { id: 'PG09', name: 'Porcelain Glow – Soft Film' },
    { id: 'PG10', name: 'Porcelain Glow – Quick Mobile' },
];

const skinToneAdjustmentStyles: Style[] = [
    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
    // Fix: Add explicit return type 'Style' to the map function to prevent TypeScript from widening the 'type' property to 'string'.
    ...skinToneVariants.map((variant, index): Style => ({
        id: variant.id,
        label: variant.name.split('(')[0].split('–')[0].trim(),
        englishLabel: variant.name,
        type: 'image',
        value: newIconUrl,
        isPremium: (index + 2) % 4 === 0,
        promptInstruction: `Retouch the skin to have a '${variant.name}' tone and look. Preserve natural skin texture.`
    })),
];


const genericIconUrl = "https://megicmediaai.byethost33.com/icon12.png";

export const FEATURES: Feature[] = [
    { 
        id: 'apple_mode', 
        label: 'Chế độ Apple', 
        englishLabel: 'Apple Mode', 
        icon: <img src={genericIconUrl} alt="Chế độ Apple" className="w-full h-full object-contain" />,
        subFeatures: [
            { id: 'lighting', label: 'Ánh sáng', englishLabel: 'Lighting', styles: appleLightingStyles },
            { id: 'color_profile', label: 'Màu sắc', englishLabel: 'Color Profile', styles: intensityStyles },
        ]
    },
    { 
        id: 'camera_film', 
        label: 'Camera Film', 
        englishLabel: 'Camera Film', 
        icon: <img src={genericIconUrl} alt="Camera Film" className="w-full h-full object-contain" />,
        subFeatures: [
            { id: 'film_stock', label: 'Loại phim', englishLabel: 'Film Stock', styles: filmStockStyles },
            { id: 'grain', label: 'Nhiễu hạt', englishLabel: 'Grain', styles: intensityStyles },
        ]
    },
    { 
        id: 'flash', 
        label: 'Camera phát sáng', 
        englishLabel: 'Flash Camera', 
        icon: <img src={genericIconUrl} alt="Camera phát sáng" className="w-full h-full object-contain" />,
        subFeatures: [
            { id: 'flash_type', label: 'Kiểu Flash', englishLabel: 'Flash Type', styles: flashTypeStyles },
            { id: 'color_gel', label: 'Gel màu', englishLabel: 'Color Gel', styles: flashGelStyles, isPremium: true },
        ]
    },
    { 
        id: 'ai_filter', 
        label: 'Bộ lọc AI', 
        englishLabel: 'AI Filter', 
        icon: <img src={genericIconUrl} alt="Bộ lọc AI" className="w-full h-full object-contain" />,
        badge: 'Free',
        subFeatures: [
            { id: 'seasonal', label: 'Theo mùa', englishLabel: 'Seasonal', styles: seasonalFilterStyles },
            { id: 'artistic', label: 'Nghệ thuật', englishLabel: 'Artistic', styles: [
                { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                { id: 'cartoon', label: 'Hoạt hình', englishLabel: 'Cartoon', type: 'image', value: newIconUrl, promptInstruction: "Redraw the photo in a vibrant cartoon style." },
                { id: 'oil_painting', label: 'Sơn dầu', englishLabel: 'Oil Painting', type: 'image', value: newIconUrl, promptInstruction: "Transform the photo into a classical oil painting." },
                { id: 'pencil_sketch', label: 'Phác thảo', englishLabel: 'Pencil Sketch', type: 'image', value: newIconUrl, promptInstruction: "Convert the photo into a detailed pencil sketch." },
            ] },
        ]
    },
    {
        id: 'hd_quality', label: 'Chất lượng hình ảnh', englishLabel: 'Image Quality', icon: <img src={genericIconUrl} alt="Chất lượng hình ảnh" className="w-full h-full object-contain" />, badge: 'Hot', isPremium: true,
        subFeatures: [
            {
                id: 'enhancement_level', label: 'Mức độ', englishLabel: 'Enhancement Level',
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'intensity', value: 'None' },
                    { id: 'hd', label: 'Nét hơn', englishLabel: 'Sharpen HD', type: 'intensity', value: 'HD', promptInstruction: "Enhance the image to HD quality, improving sharpness and clarity." },
                    { id: 'upscale', label: 'Nâng cấp 4K', englishLabel: '4K Upscale', type: 'intensity', value: '4K', isPremium: true, promptInstruction: "Upscale the image to 4K resolution, intelligently adding detail and refining textures for a high-definition result." },
                    { id: 'denoise', label: 'Giảm nhiễu', englishLabel: 'Denoise', type: 'intensity', value: 'Denoise', promptInstruction: "Apply noise reduction to the image, smoothing out grain while preserving important details." },
                ]
            }
        ]
    },
    {
        id: 'beautify', label: 'Làm đẹp', englishLabel: 'Beautify', icon: <img src={genericIconUrl} alt="Làm đẹp" className="w-full h-full object-contain" />,
        subFeatures: [
            {
                id: 'hair_style', label: 'Kiểu Tóc', englishLabel: 'Hairstyle',
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'wavy_curls', label: 'Xoăn Sóng', englishLabel: 'Wavy Curls', type: 'image', value: newIconUrl, promptInstruction: "Change the person's hairstyle to beautiful, flowing wavy curls." },
                    { id: 'sleek_straight', label: 'Thẳng Mượt', englishLabel: 'Sleek Straight', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Change the person's hairstyle to sleek, straight hair." },
                    { id: 'chic_bob', label: 'Bob Cá Tính', englishLabel: 'Chic Bob', type: 'image', value: newIconUrl, promptInstruction: "Change the person's hairstyle to a chic bob cut." },
                    { id: 'elegant_updo', label: 'Búi Cao', englishLabel: 'Elegant Updo', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Change the person's hairstyle to an elegant updo." },
                ]
            },
            { id: 'smooth_skin', label: 'Làm mịn', englishLabel: 'Smooth Skin', styles: intensityStyles, promptInstruction: "Smooth the person's skin, reducing blemishes and wrinkles to a '{{style}}' degree while keeping a natural texture." },
            { id: 'concealer', label: 'Che khuyết điểm', englishLabel: 'Concealer', isPremium: true, styles: intensityStyles, promptInstruction: "Apply digital concealer to cover blemishes and imperfections to a '{{style}}' degree." },
            { id: 'remove_oil', label: 'Loại Bỏ Dầu', englishLabel: 'Remove Oiliness', styles: intensityStyles, promptInstruction: "Reduce shine and oiliness on the skin to a '{{style}}' degree for a more matte finish." },
            { id: 'slim_face', label: 'Thon gọn', englishLabel: 'Slim Face', styles: intensityStyles, promptInstruction: "Realistically and subtly slim the subject's face, focusing on the jawline and cheeks. Apply the effect to a '{{style}}' degree." },
            {
                id: 'skin_tone', label: 'Màu da', englishLabel: 'Skin Tone',
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'color', value: 'transparent' },
                    { id: 'ivory', label: 'Trắng Sứ', englishLabel: 'Fair Ivory', type: 'color', value: '#FFFAF0', promptInstruction: "Adjust the skin tone to a 'Fair Ivory' shade." },
                    { id: 'beige', label: 'Tự Nhiên', englishLabel: 'Natural Beige', type: 'color', value: '#F5DEB3', promptInstruction: "Adjust the skin tone to a 'Natural Beige' shade." },
                    { id: 'honey', label: 'Mật Ong', englishLabel: 'Warm Honey', type: 'color', value: '#D2A679', isPremium: true, promptInstruction: "Adjust the skin tone to a 'Warm Honey' shade." },
                    { id: 'bronze', label: 'Bánh Mật', englishLabel: 'Sun-kissed Bronze', type: 'color', value: '#A0522D', promptInstruction: "Adjust the skin tone to a 'Sun-kissed Bronze' shade." },
                ]
            },
            { id: 'expression_sub', label: 'Nụ cười', englishLabel: 'Smile Adjustment', styles: smileStyles, promptInstruction: "Adjust the person's expression to create a '{{style}}'." },
            {
                id: '3d_lighting', label: 'Bắt sáng 3D', englishLabel: '3D Lighting', isPremium: true,
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'natural', label: 'Tự nhiên', englishLabel: 'Soft Natural', type: 'image', value: newIconUrl, promptInstruction: "Apply a soft, natural 3D lighting effect to enhance facial features." },
                    { id: 'studio', label: 'Studio', englishLabel: 'Bright Studio', type: 'image', value: newIconUrl, promptInstruction: "Apply a bright, professional studio lighting effect to the portrait." },
                    { id: 'contour', label: 'Tạo khối', englishLabel: 'Dramatic Contour', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Apply dramatic contour lighting to sculpt and define the facial features." },
                    { id: 'golden_hour', label: 'Hoàng hôn', englishLabel: 'Golden Hour', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Relight the portrait with the warm, soft glow of a 'Golden Hour' sunset." },
                ]
            },
            { id: 'face_lift', label: 'Nâng cơ', englishLabel: 'Face Lift', isPremium: true, styles: intensityStyles, promptInstruction: "Apply a subtle digital face lift effect, tightening the jawline and brow area to a '{{style}}' degree." },
            { id: 'acne_removal', label: 'Xoá mụn', englishLabel: 'Acne Removal', isPremium: true, styles: intensityStyles, promptInstruction: "Remove acne and skin blemishes with a '{{style}}' intensity, ensuring the skin texture looks natural." },
            { id: 'remove_double_chin', label: 'Nọng cằm', englishLabel: 'Remove Double Chin', isPremium: true, styles: intensityStyles, promptInstruction: "Reduce or remove the appearance of a double chin to a '{{style}}' degree, defining the jawline." },
            { id: 'remove_dark_circles', label: 'Xoá thâm', englishLabel: 'Remove Dark Circles', isPremium: true, styles: intensityStyles, promptInstruction: "Reduce the appearance of dark circles under the eyes with a '{{style}}' intensity." },
            { id: 'teeth_whitening', label: 'Làm trắng', englishLabel: 'Teeth Whitening', styles: intensityStyles, promptInstruction: "Whiten the teeth to a '{{style}}' degree, making sure they look bright but natural." },
        ]
    },
    {
        id: 'skin_tone_adjustment',
        label: 'Tinh chỉnh da',
        englishLabel: 'Skin Tone Adjustment',
        icon: <img src={genericIconUrl} alt="Tinh chỉnh da" className="w-full h-full object-contain" />,
        isPremium: true,
        subFeatures: [
            {
                id: 'skin_tone_presets',
                label: 'Cài đặt sẵn',
                englishLabel: 'Presets',
                styles: skinToneAdjustmentStyles,
            },
        ]
    },
    { 
        id: 'remove_bg', 
        label: 'Xóa BG', 
        englishLabel: 'Remove Background', 
        icon: <img src={genericIconUrl} alt="Xóa BG" className="w-full h-full object-contain" />,
        badge: 'NEW',
        subFeatures: [
            { 
              id: 'replace_background', label: 'Thay nền', englishLabel: 'Replace Background',
              styles: [
                  { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                  { id: 'transparent', label: 'Trong suốt', englishLabel: 'Transparent', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Carefully cut out the main subject from the photo and place it on a transparent background." },
                  { id: 'white', label: 'Trắng', englishLabel: 'White', type: 'image', value: newIconUrl, promptInstruction: "Carefully cut out the main subject from the photo and place it on a clean, solid white background." },
                  { id: 'city', label: 'Thành phố', englishLabel: 'City', type: 'image', value: newIconUrl, promptInstruction: "Carefully cut out the main subject from the photo and place them on a realistic, slightly blurred city street background." },
              ] 
            }
        ]
    },
    {
        id: 'ai_portrait', label: 'Chân dung AI', englishLabel: 'AI Portrait', icon: <img src={genericIconUrl} alt="Chân dung AI" className="w-full h-full object-contain" />,
        subFeatures: [
            {
                id: 'style', label: 'Phong cách', englishLabel: 'Style',
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'classic', label: 'Cổ điển', englishLabel: 'Classic', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Transform the photo into a classic, timeless portrait." },
                    { id: 'cartoon', label: 'Hoạt hình', englishLabel: 'Cartoon', type: 'image', value: newIconUrl, promptInstruction: "Redraw the portrait in a vibrant cartoon style." },
                    { id: 'oil_painting', label: 'Sơn dầu', englishLabel: 'Oil Painting', type: 'image', value: newIconUrl, promptInstruction: "Transform the portrait into a classical oil painting." },
                    { id: 'pencil_sketch', label: 'Phác thảo', englishLabel: 'Pencil Sketch', type: 'image', value: newIconUrl, promptInstruction: "Convert the portrait into a detailed pencil sketch." },
                    { id: 'watercolor', label: 'Màu nước', englishLabel: 'Watercolor', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Recreate the portrait in a soft and flowing watercolor style." },
                    { id: 'pop_art', label: 'Pop Art', englishLabel: 'Pop Art', type: 'image', value: newIconUrl, promptInstruction: "Reimagine the portrait in a bold and colorful Pop Art style, reminiscent of Andy Warhol." },
                    { id: 'cyberpunk', label: 'Cyberpunk', englishLabel: 'Cyberpunk', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Transform the portrait into a futuristic, neon-lit Cyberpunk style." },
                ]
            }
        ]
    },
    {
        id: 'hair', label: 'Tóc', englishLabel: 'Hair', icon: <img src={genericIconUrl} alt="Tóc" className="w-full h-full object-contain" />,
        subFeatures: [
            {
                id: 'nhuom', label: 'Nhuộm', englishLabel: 'Dye',
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'mat_ong', label: 'Mật ong', englishLabel: 'Honey Brown', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Change the hair color to a warm 'Honey Brown'." },
                    { id: 'vang_teddy', label: 'Vàng Teddy', englishLabel: 'Teddy Blonde', type: 'image', value: newIconUrl, promptInstruction: "Change the hair color to a 'Teddy Blonde' shade." },
                    { id: 'lanh', label: 'Lạnh', englishLabel: 'Cool Tone', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Change the hair color to a 'Cool Tone' brown." },
                    { id: 'da_bao', label: 'Da báo', englishLabel: 'Leopard', type: 'image', value: newIconUrl, promptInstruction: "Apply a bold leopard print pattern to the hair." },
                    { id: 'line_cam', label: 'Line cam', englishLabel: 'Orange Streaks', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Add vibrant orange streaks to the hair." },
                    { id: 'line_mai_do', label: 'Line mái đỏ', englishLabel: 'Red Bangs', type: 'image', value: newIconUrl, promptInstruction: "Color the bangs/fringe a bright red color." },
                    { id: 'than_tre', label: 'Than tre', englishLabel: 'Charcoal', type: 'image', value: newIconUrl, promptInstruction: "Change the hair color to a deep 'Charcoal' black." },
                    { id: 'ash_gray', label: 'Xám khói', englishLabel: 'Ash Gray', type: 'image', value: newIconUrl, promptInstruction: "Change the hair color to a trendy 'Ash Gray'." },
                    { id: 'pastel_pink', label: 'Hồng phấn', englishLabel: 'Pastel Pink', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Change the hair color to a soft 'Pastel Pink'." },
                    { id: 'electric_blue', label: 'Xanh dương', englishLabel: 'Electric Blue', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Change the hair color to a vivid 'Electric Blue'." },
                ]
            },
            {
                id: 'kieu_toc', label: 'Kiểu tóc', englishLabel: 'Hairstyle',
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'long_wavy', label: 'Xoăn dài', englishLabel: 'Long Wavy', type: 'image', value: newIconUrl, promptInstruction: "Change the hairstyle to long and wavy." },
                    { id: 'sleek_ponytail', label: 'Đuôi ngựa', englishLabel: 'Sleek Ponytail', type: 'image', value: newIconUrl, promptInstruction: "Change the hairstyle to a sleek ponytail." },
                    { id: 'pixie_cut', label: 'Tóc Pixie', englishLabel: 'Pixie Cut', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Change the hairstyle to a short pixie cut." },
                    { id: 'messy_bun', label: 'Búi rối', englishLabel: 'Messy Bun', type: 'image', value: newIconUrl, promptInstruction: "Change the hairstyle to a casual messy bun." },
                ]
            },
        ]
    },
    { 
        id: 'expand_bg', 
        label: 'Mở rộng nền', 
        englishLabel: 'Expand Background', 
        icon: <img src={genericIconUrl} alt="Mở rộng nền" className="w-full h-full object-contain" />,
        promptInstruction: "You are an AI with outpainting capabilities. Expand the background of the image to a '{{style}}' aspect ratio using a content-aware fill that seamlessly matches the original image's style, lighting, and content.",
        subFeatures: [
            { id: 'ratio', label: 'Tỷ lệ', englishLabel: 'Aspect Ratio', styles: [
                { id: 'none', label: 'Không', englishLabel: 'None', type: 'intensity', value: 'None' },
                { id: 'square', label: '1:1', englishLabel: 'Square 1:1', type: 'intensity', value: '1:1' },
                { id: 'portrait', label: '4:5', englishLabel: 'Portrait 4:5', type: 'intensity', value: '4:5' },
                { id: 'story', label: '9:16', englishLabel: 'Story 9:16', type: 'intensity', value: '9:16', isPremium: true },
            ]},
        ]
    },
    {
        id: 'expression', label: 'Biểu cảm', englishLabel: 'Expression', icon: <img src={genericIconUrl} alt="Biểu cảm" className="w-full h-full object-contain" />,
        subFeatures: [
            {
                id: 'emotion', label: 'Cảm xúc', englishLabel: 'Emotion',
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'happy', label: 'Vui vẻ', englishLabel: 'Happy', type: 'image', value: newIconUrl, promptInstruction: "Modify the person's expression to be genuinely happy, with a natural smile." },
                    { id: 'wink', label: 'Nháy mắt', englishLabel: 'Wink', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Modify the person's expression to give a playful wink." },
                    { id: 'surprised', label: 'Ngạc nhiên', englishLabel: 'Surprised', type: 'image', value: newIconUrl, promptInstruction: "Modify the person's expression to look surprised." },
                    { id: 'sultry', label: 'Quyến rũ', englishLabel: 'Sultry', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Modify the person's expression to be sultry and alluring." },
                ]
            }
        ]
    },
    { 
        id: 'id_photo', 
        label: 'Ảnh thẻ', 
        englishLabel: 'ID Photo', 
        icon: <img src={genericIconUrl} alt="Ảnh thẻ" className="w-full h-full object-contain" />,
        subFeatures: [
            { id: 'background_color', label: 'Màu nền', englishLabel: 'Background Color', styles: idPhotoBgStyles },
        ]
    },
    { 
        id: 'narrow', 
        label: 'Hẹp', 
        englishLabel: 'Narrow', 
        icon: <img src={genericIconUrl} alt="Hẹp" className="w-full h-full object-contain" />,
        subFeatures: [
            { id: 'face_shape', label: 'Hình dáng mặt', englishLabel: 'Face Shape', styles: intensityStyles, promptInstruction: "Subtly narrow the overall face shape to a '{{style}}' degree." },
            { id: 'nose', label: 'Mũi', englishLabel: 'Nose', styles: intensityStyles, isPremium: true, promptInstruction: "Subtly narrow the nose to a '{{style}}' degree." },
        ]
    },
    { 
        id: 'dark_circles', 
        label: 'Quầng thâm', 
        englishLabel: 'Dark Circles', 
        icon: <img src={genericIconUrl} alt="Quầng thâm" className="w-full h-full object-contain" />,
        promptInstruction: "Reduce the appearance of dark circles under the eyes with a '{{style}}' intensity.",
        subFeatures: [
            { id: 'concealment', label: 'Che phủ', englishLabel: 'Concealment', styles: intensityStyles },
        ]
    },
    { 
        id: 'double_chin', 
        label: 'Nọng cằm', 
        englishLabel: 'Double Chin', 
        icon: <img src={genericIconUrl} alt="Nọng cằm" className="w-full h-full object-contain" />,
        promptInstruction: "Reduce or remove the appearance of a double chin to a '{{style}}' degree, defining the jawline.",
        subFeatures: [
            { id: 'reduction', label: 'Giảm', englishLabel: 'Reduction', styles: intensityStyles },
        ]
    },
    { 
        id: 'ai_enhance', 
        label: 'Nâng cao bằng AI', 
        englishLabel: 'AI Enhance', 
        icon: <img src={genericIconUrl} alt="Nâng cao bằng AI" className="w-full h-full object-contain" />,
        badge: 'Hot',
        isPremium: true,
        subFeatures: [
            { id: 'auto_correction', label: 'Tự động sửa', englishLabel: 'Auto Correction', styles: intensityStyles, promptInstruction: "Automatically correct and enhance the lighting, color, and contrast of the photo to a '{{style}}' degree." },
            { id: 'color_boost', label: 'Tăng màu', englishLabel: 'Color Boost', styles: intensityStyles, isPremium: true, promptInstruction: "Boost the vibrance and saturation of the colors in the photo to a '{{style}}' degree." },
        ]
    },
    { 
        id: 'head_size', 
        label: 'Cỡ đầu', 
        englishLabel: 'Head Size', 
        icon: <img src={genericIconUrl} alt="Cỡ đầu" className="w-full h-full object-contain" />,
        promptInstruction: "Adjust the size of the person's head by a '{{style}}' amount.",
        subFeatures: [
            { id: 'size', label: 'Kích thước', englishLabel: 'Size', styles: intensityStyles },
        ]
    },
    {
        id: 'makeup', label: 'Trang điểm', englishLabel: 'Makeup', icon: <img src={genericIconUrl} alt="Trang điểm" className="w-full h-full object-contain" />,
        subFeatures: [
            {
                id: 'son_moi', label: 'Son môi', englishLabel: 'Lipstick',
                promptInstruction: "Apply a '{{style}}' colored lipstick to the lips.",
                hasIntensitySlider: true,
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'color', value: 'transparent' },
                    { id: 'rd01', label: 'RD01', englishLabel: 'RD01 Red', type: 'color', value: '#C7383B' },
                    { id: 'pk04', label: 'PK04', englishLabel: 'PK04 Pink', type: 'color', value: '#E87A7D', isPremium: true },
                    { id: 'pk01', label: 'PK01', englishLabel: 'PK01 Light Pink', type: 'color', value: '#EA89A0' },
                    { id: 'pk03', label: 'PK03', englishLabel: 'PK03 Deep Pink', type: 'color', value: '#E9527E', isPremium: true },
                    { id: 'or01', label: 'OR01', englishLabel: 'OR01 Orange', type: 'color', value: '#E26D4F' },
                    { id: 'cr01', label: 'CR01', englishLabel: 'CR01 Coral', type: 'color', value: '#E58572' },
                    { id: 'rd03', label: 'RD03', englishLabel: 'RD03 Deep Red', type: 'color', value: '#B92B27', isPremium: true },
                    { id: 'vl04', label: 'VL04', englishLabel: 'VL04 Violet', type: 'color', value: '#D0A9C5' },
                    { id: 'br01', label: 'BR01', englishLabel: 'BR01 Brown', type: 'color', value: '#A15F54' },
                    { id: 'pk05', label: 'PK05', englishLabel: 'PK05 Fuchsia', type: 'color', value: '#D94A8C' },
                    { id: 'nude_beige', label: 'Nude Be', englishLabel: 'Nude Beige', type: 'color', value: '#C9A995' },
                    { id: 'dusty_rose', label: 'Hồng Đất', englishLabel: 'Dusty Rose', type: 'color', value: '#B56B73' },
                    { id: 'berry_plum', label: 'Mận Chín', englishLabel: 'Berry Plum', type: 'color', value: '#8E3A59', isPremium: true },
                ]
            },
            {
                id: 'plump_lips', label: 'Môi đầy đặn', englishLabel: 'Plump Lips', styles: intensityStyles,
                promptInstruction: "Subtly increase the fullness of the lips to a '{{style}}' degree."
            },
            {
                id: 'kieu_son', label: 'Kiểu son', englishLabel: 'Lip Style', isPremium: true,
                styles: [
                    { id: 'none_finish', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'matte_finish', label: 'Lì', englishLabel: 'Matte', type: 'image', value: newIconUrl, promptInstruction: "Change the lipstick finish to matte." },
                    { id: 'glossy_finish', label: 'Bóng', englishLabel: 'Glossy', type: 'image', value: newIconUrl, promptInstruction: "Change the lipstick finish to glossy." },
                    { id: 'satin_finish', label: 'Satin', englishLabel: 'Satin', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Change the lipstick finish to satin." },
                    { id: 'gradient_finish', label: 'Gradient', englishLabel: 'Gradient', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Apply lipstick in a gradient or ombre style." },
                ]
            },
            {
                id: 'ma_hong', label: 'Má Hồng', englishLabel: 'Blush',
                promptInstruction: "Apply a '{{style}}' colored blush to the cheeks.",
                hasIntensitySlider: true,
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'color', value: 'transparent' },
                    { id: 'rd01_blush', label: 'RD01', englishLabel: 'RD01 Red', type: 'color', value: '#E88B8C' },
                    { id: 'br01_blush', label: 'BR01', englishLabel: 'BR01 Brown', type: 'color', value: '#D4A392', isPremium: true },
                    { id: 'pk01_blush', label: 'PK01', englishLabel: 'PK01 Pink', type: 'color', value: '#F0A2B1' },
                    { id: 'vl01_blush', label: 'VL01', englishLabel: 'VL01 Violet', type: 'color', value: '#D6A6C7', isPremium: true },
                    { id: 'nd01_blush', label: 'ND01', englishLabel: 'ND01 Nude', type: 'color', value: '#E6A89A' },
                    { id: 'or01_blush', label: 'OR01', englishLabel: 'OR01 Orange', type: 'color', value: '#F0A88A' },
                    { id: 'peach_puff', label: 'Hồng Đào', englishLabel: 'Peach Puff', type: 'color', value: '#FFDAB9' },
                    { id: 'rose_pink', label: 'Hồng Phấn', englishLabel: 'Rose Pink', type: 'color', value: '#E7ACCF', isPremium: true },
                ]
            },
            {
                id: 'duong_vien', label: 'Tạo khối', englishLabel: 'Contour',
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'soft_sculpt', label: 'Nhẹ nhàng', englishLabel: 'Soft Sculpt', type: 'image', value: newIconUrl, promptInstruction: "Apply soft, natural contouring to define the face." },
                    { id: 'round_face', label: 'Mặt tròn', englishLabel: 'For Round Face', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Apply contouring makeup suitable for a round face shape to add definition." },
                    { id: 'square_face', label: 'Mặt vuông', englishLabel: 'For Square Face', type: 'image', value: newIconUrl, promptInstruction: "Apply contouring makeup to soften the angles of a square face shape." },
                    { id: 'oval_face', label: 'Mặt Oval', englishLabel: 'For Oval Face', type: 'image', value: newIconUrl, promptInstruction: "Apply contouring makeup to enhance an oval face shape." },
                    { id: 'strobing', label: 'Strobing', englishLabel: 'Strobing', type: 'image', value: newIconUrl, isPremium: true, promptInstruction: "Apply highlighter to the high points of the face for a strobing effect." },
                ]
            },
            {
                id: 'may', label: 'Mày', englishLabel: 'Eyebrows',
                promptInstruction: "Reshape the eyebrows to a '{{style}}' style.",
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'vong_cung', label: 'Vòng cung', englishLabel: 'Natural Arch', type: 'image', value: newIconUrl },
                    { id: 'duoi', label: 'Đuôi', englishLabel: 'Straight', type: 'image', value: newIconUrl, isPremium: true },
                    { id: 'tu_nhien', label: 'Tự nhiên', englishLabel: 'Full & Natural', type: 'image', value: newIconUrl },
                    { id: 'dam', label: 'Đậm', englishLabel: 'Bold', type: 'image', value: newIconUrl, isPremium: true },
                ]
            },
            {
                id: 'mau_long_may', label: 'Màu lông mày', englishLabel: 'Eyebrow Color',
                promptInstruction: "Change the eyebrow color to '{{style}}'.",
                styles: [
                    { id: 'none_brow_color', label: 'Mặc định', englishLabel: 'Default', type: 'color', value: 'transparent' },
                    { id: 'soft_black', label: 'Đen', englishLabel: 'Soft Black', type: 'color', value: '#363636' },
                    { id: 'dark_brown', label: 'Nâu Đậm', englishLabel: 'Dark Brown', type: 'color', value: '#5C4033' },
                    { id: 'light_brown', label: 'Nâu Sáng', englishLabel: 'Light Brown', type: 'color', value: '#966953', isPremium: true },
                    { id: 'ash_blonde', label: 'Vàng tro', englishLabel: 'Ash Blonde', type: 'color', value: '#B2BEB5' },
                ]
            },
            {
                id: 'long_mi', label: 'Lông mi', englishLabel: 'Eyelashes', isPremium: true,
                promptInstruction: "Apply '{{style}}' style false eyelashes.",
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'h_ngay_lashes', label: 'H.ngày', englishLabel: 'Daily Natural', type: 'image', value: newIconUrl },
                    { id: 'barbie', label: 'Barbie', englishLabel: 'Barbie Doll', type: 'image', value: newIconUrl, isPremium: true },
                    { id: 'xuong_2', label: 'Xuồng 2', englishLabel: 'Wispy', type: 'image', value: newIconUrl },
                    { id: 'manga_3', label: 'Manga 3', englishLabel: 'Manga', type: 'image', value: newIconUrl, isPremium: true },
                ]
            },
            {
                id: 'ke_mat', label: 'Kẻ mắt', englishLabel: 'Eyeliner',
                promptInstruction: "Apply eyeliner in a '{{style}}' style.",
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'tail', label: 'Winged', englishLabel: 'Winged', type: 'image', value: newIconUrl },
                    { id: 'natural', label: 'Natural', englishLabel: 'Natural', type: 'image', value: newIconUrl },
                    { id: 'rose', label: 'Rose', englishLabel: 'Rose', type: 'image', value: newIconUrl, isPremium: true },
                    { id: 'classic', label: 'Classic', englishLabel: 'Classic', type: 'image', value: newIconUrl },
                    { id: 'double_wing', label: 'Cánh kép', englishLabel: 'Double Wing', type: 'image', value: newIconUrl, isPremium: true },
                    { id: 'graphic', label: 'Đồ họa', englishLabel: 'Graphic Liner', type: 'image', value: newIconUrl },
                ]
            },
            {
                id: 've_mat', label: 'Vẽ mắt', englishLabel: 'Eyeshadow',
                promptInstruction: "Apply '{{style}}' eyeshadow.",
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'kem', label: 'Kem', englishLabel: 'Cream', type: 'image', value: newIconUrl },
                    { id: 'chai', label: 'Trà', englishLabel: 'Tea', type: 'image', value: newIconUrl, isPremium: true },
                    { id: 'hoang_gia', label: 'Hoàng gia', englishLabel: 'Royal', type: 'image', value: newIconUrl },
                    { id: 'cat', label: 'Cát', englishLabel: 'Sand', type: 'image', value: newIconUrl, isPremium: true },
                    { id: 'gach', label: 'Gạch', englishLabel: 'Brick', type: 'image', value: newIconUrl },
                    { id: 'smokey', label: 'Mắt khói', englishLabel: 'Smokey Eye', type: 'image', value: newIconUrl },
                    { id: 'glitter', label: 'Kim tuyến', englishLabel: 'Glitter Pop', type: 'image', value: newIconUrl, isPremium: true },
                    { id: 'cut_crease', label: 'Cut Crease', englishLabel: 'Cut Crease', type: 'image', value: newIconUrl, isPremium: true },
                    { id: 'halo_eye', label: 'Mắt Halo', englishLabel: 'Halo Eye', type: 'image', value: newIconUrl },
                ]
            },
            {
                id: 'tan_nhang', label: 'Tàn nhang', englishLabel: 'Freckles',
                promptInstruction: "Add '{{style}}' style freckles to the face.",
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'lam_tam', label: 'Lấm tấm', englishLabel: 'Lightly Dotted', type: 'image', value: newIconUrl },
                    { id: 'duoi_bong_mat', label: 'Dưới bọng mắt', englishLabel: 'Under Eye', type: 'image', value: newIconUrl },
                    { id: 'nang', label: 'Nâng', englishLabel: 'Across Nose and Cheeks', type: 'image', value: newIconUrl },
                ]
            },
            {
                id: 'kinh_ap_trong', label: 'Kính áp tròng', englishLabel: 'Contact Lenses',
                promptInstruction: "Change the eye color and style to look like '{{style}}' contact lenses.",
                styles: [
                    { id: 'none', label: 'Không', englishLabel: 'None', type: 'image', value: placeholderImage },
                    { id: 'hao_quang', label: 'Hào Quang', englishLabel: 'Aura', type: 'image', value: newIconUrl },
                    { id: 'mau_vang', label: 'Màu vàng', englishLabel: 'Yellow', type: 'image', value: newIconUrl },
                    { id: 'mat_sang', label: 'Mắt sáng', englishLabel: 'Bright Eyes', type: 'image', value: newIconUrl, isPremium: true },
                    { id: 'xam_tro', label: 'Xám tro', englishLabel: 'Ash Gray', type: 'image', value: newIconUrl },
                    { id: 'trong_den', label: 'Tròng Đen', englishLabel: 'Black Pupil', type: 'image', value: newIconUrl, isPremium: true },
                    { id: 'cat_eye', label: 'Mắt mèo', englishLabel: 'Cat Eye', type: 'image', value: newIconUrl, isPremium: true },
                    { id: 'heterochromia', label: 'Dị sắc', englishLabel: 'Heterochromia', type: 'image', value: newIconUrl },
                ]
            },
        ]
    },
];
