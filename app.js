/* ============================================================
   BAYOUNI SANITARY WARE - Interactive App Logic (Bilingual & AI Chatbot)
   بايوني للأدوات الصحية - المنطق التفاعلي (ثنائي اللغة وبوت المحادثة الذكي)
   ============================================================ */

'use strict';

/* ─── STATE ──────────────────────────────────────────────── */
const state = {
  cart: JSON.parse(localStorage.getItem('bayouni_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('bayouni_wishlist') || '[]'),
  currentFilter: 'all',
  currentSlide: 0,
  statsAnimated: false,
  searchQuery: '',
  currentLang: localStorage.getItem('bayouni_lang') || 'ar',
  currentTheme: localStorage.getItem('bayouni_theme') || 'light'
};

/* ─── TRANSLATIONS DICTIONARY ────────────────────────────── */
const translations = {
  ar: {
    announcement_truck: "توصيل مجاني لجميع مناطق المملكة للطلبات فوق ٥٠٠ ريال",
    announcement_warranty: "ضمان ٥ سنوات على جميع الخلاطات",
    announcement_phone: "اتصل بنا: ٠٥٣٩٤٧١٠٥٥",
    nav_home: "الرئيسية",
    nav_products: "المنتجات",
    nav_categories: "الأقسام",
    nav_why_us: "لماذا نحن",
    nav_testimonials: "آراء العملاء",
    nav_contact: "تواصل معنا",
    nav_packages: "بكجات بايوني",
    nav_toilets: "كراسي الحمام",
    toilet_floor: "كراسي ارضي (افرنجي)",
    toilet_wall: "كراسي معلقة",
    nav_basins: "المغاسل",
    basin_decor: "مغاسل ديكور",
    basin_by_size: "فرز بالمقاس",
    basin_60: "مغاسل 60 سم",
    basin_80: "مغاسل 80 سم",
    basin_100: "مغاسل 100 سم",
    basin_120: "مغاسل 120 سم",
    basin_150: "مغاسل 150 سم",
    basin_wall: "مغاسل معلقة",
    basin_external: "حوض خارجي",
    basin_drain: "هراب مغسلة",
    nav_mirrors: "المرايات",
    mirror_40: "مرايات 40 سم",
    mirror_60: "مرايات 60 سم",
    mirror_70: "مرايات 70 سم",
    mirror_80: "مرايات 80 سم",
    mirror_100: "مرايات 100 سم",
    mirror_120: "مرايات 120 سم",
    mirror_150: "مرايات 150 سم وأكبر",
    announcement_text: "خليك مميز… بتصاميم استثنائية وأناقة تدوم",
    hero_badge: "تأسست عام 1977 - جودة نثق بها",
    hero_title_1: "جمال حمامك العصري",
    hero_title_2: "يبدأ بتفاصيل بايوني",
    hero_desc: "نحن فخورون بتقديم أرقى تصاميم الخلاطات، المرايات الذكية، وأعمدة الدش المصنوعة بأعلى جودة تضمن المتانة والفخامة في آن واحد.",
    hero_btn_shop: "تسوق المجموعات",
    hero_btn_warranty: "مميزات الضمان لدينا",
    mouse_scroll: "اسحب للأسفل",
    stat_year_title: "تاريخ التأسيس العريق",
    stat_products_title: "منتج متميز في معارضنا",
    stat_satisfaction_title: "نسبة رضا وثقة العملاء",
    stat_branches_title: "فرعاً ومعرضاً في المملكة",
    offer_summer_title: "تخفيضات الصيف",
    offer_summer_desc: "خصم يصل إلى ٣٠٪ على أنظمة الدش الحرارية",
    offer_summer_btn: "تسوق الآن",
    offer_primo_title: "مجموعة بريمو الجديدة",
    offer_primo_desc: "خلاطات ذهبية فاخرة وصلت حصرياً لمعارضنا",
    offer_primo_btn: "اكتشف",
    offer_install_title: "خدمة التركيب المجاني",
    offer_install_desc: "مع كل طلب فوق ٢٠٠٠ ريال تركيب مجاني",
    offer_install_btn: "تعرف أكثر",
    products_sub: "تسوّق الآن",
    products_title: "مجموعتنا الفاخرة الموصى بها",
    products_desc: "أدوات صحية مصممة خصيصاً لتواكب أرقى متطلبات البناء العصري في المملكة مع ضمان حقيقي 5 سنوات.",
    filter_all: "الكل",
    filter_mixers: "الخلاطات",
    filter_mirrors: "المرايات",
    filter_showers: "أنظمة الشاور",
    filter_basins: "الأحواض",
    filter_accessories: "الإكسسوارات",
    categories_sub: "أقسامنا",
    categories_title: "استكشف منتجاتنا حسب الفئة",
    categories_desc: "اختر قسماً وقم بتصميم مساحتك الخاصة مع حلولنا الصحية المتكاملة.",
    category_mixers_title: "خلاطات فاخرة",
    category_mixers_desc: "أكثر من 120 خلاط مطابخ وبانيوهات ومغاسل",
    category_mirrors_title: "المرايات الذكية",
    category_mirrors_desc: "أحدث المرايا المضيئة بخواص ضد الضباب واللمس",
    category_showers_title: "أنظمة الدش",
    category_showers_desc: "أطقم شاور حرارية ودش مطري بلمسات عصرية",
    category_basins_title: "أحواض ومغاسل",
    category_basins_desc: "أحواض سيراميك ورخامية بتشطيبات مميزة",
    category_link_text: "تصفح المنتجات",
    brands_sub: "شركاؤنا",
    brands_desc: "نوفر منتجات أشهر العلامات التجارية العالمية في الأدوات الصحية",
    why_us_sub: "لماذا نحن؟",
    why_us_title: "تجربة اقتناء خالية من القلق",
    why_us_desc: "نلتزم بالجمع بين المظهر الخلاب والعملية الفائقة مع باقة خدمات تدعم ثقة عملائنا.",
    why_us_card_1_title: "ضمان حقيقي 5 سنوات",
    why_us_card_1_desc: "جميع خلاطاتنا وأنظمة الشاور نوفر عليها ضماناً لمدة 5 سنوات ضد عيوب التصنيع وتغير الألوان.",
    why_us_card_2_title: "شحن وتوصيل آمن",
    why_us_card_2_desc: "خدمة توصيل سريعة لكافة مدن المملكة للتأكد من وصول أدواتك الصحية خالية من الخدوش.",
    why_us_card_3_title: "قطع غيار أصلية",
    why_us_card_3_desc: "نوفر صيانة مستمرة وقطع غيار لجميع منتجاتنا في جميع فروعنا الموزعة في المملكة.",
    why_us_card_4_title: "استشارات فنية مجانية",
    why_us_card_4_desc: "فريق فني متكامل وجاهز لمساعدتك في حساب المقاسات واختيار المناسب لديكور منزلك.",
    testimonials_sub: "قالوا عنا",
    testimonials_title: "آراء عملائنا الكرام",
    testimonials_desc: "نحن فخورون بالثقة التي يمنحنا إياها ملاك الفلل والمهندسون في مشاريعهم.",
    contact_sub: "تواصل معنا",
    contact_title: "نحن هنا لخدمتك",
    contact_desc: "فريقنا متاح لمساعدتك في اختيار المنتج المناسب وتقديم الاستشارات الفنية مجاناً.",
    contact_method_phone: "اتصل بنا مباشرة",
    contact_method_whatsapp: "واتساب",
    contact_method_whatsapp_sub: "ابدأ محادثة الآن",
    contact_method_email: "البريد الإلكتروني",
    contact_method_address: "عنواننا",
    contact_method_address_val: "الخبر - شارع الملك خالد / الدمام",
    contact_hours_title: "أوقات الدوام",
    contact_hours_sat_thu: "السبت - الخميس",
    contact_hours_sat_thu_val: "٩ص - ١٠م",
    contact_hours_fri: "الجمعة",
    contact_hours_fri_val: "٤م - ١٠م",
    contact_form_title: "أرسل لنا استفساراً",
    contact_form_name_label: "الاسم الكامل",
    contact_form_name_placeholder: "محمد العتيبي",
    contact_form_phone_label: "رقم الجوال",
    contact_form_subject_label: "الموضوع",
    contact_form_subject_default: "اختر الموضوع",
    contact_form_subject_1: "استفسار عن منتج",
    contact_form_subject_2: "طلب عرض سعر",
    contact_form_subject_3: "خدمة ما بعد البيع",
    contact_form_subject_4: "شراكة تجارية",
    contact_form_message_label: "رسالتك",
    contact_form_message_placeholder: "اكتب استفسارك أو طلبك هنا...",
    contact_form_submit: "إرسال الاستفسار",
    newsletter_title: "كن أول من يعلم عن عروضنا الحصرية",
    newsletter_desc: "انضم إلى نشرتنا الإخبارية البريدية للحصول على أحدث الكتالوجات والتصاميم الفاخرة والعروض الخاصة بالمشاريع.",
    newsletter_input_placeholder: "أدخل بريدك الإلكتروني",
    newsletter_btn: "اشترك الآن",
    footer_brand_desc: "منذ عام 1977، نقوم بتجهيز أجمل الحمامات والمشاريع في المملكة العربية السعودية بأرقى المنتجات والحلول الصحية المبتكرة.",
    footer_links_section: "أقسام الموقع",
    footer_categories_section: "فئات المنتجات",
    footer_cat_mixers: "الخلاطات الصحية",
    footer_cat_mirrors: "المرايات الذكية LED",
    footer_cat_showers: "أنظمة دش الاستحمام",
    footer_cat_basins: "المغاسل والأحواض",
    footer_contact_section: "تواصل معنا",
    footer_address: "الخبر - شارع الملك خالد / الدمام - المنطقة الشرقية",
    footer_copyright: "شركة بايوني للأدوات الصحية. جميع الحقوق محفوظة.",
    chat_agent_name: "مساعد بايوني الذكي",
    chat_agent_status: "نشط الآن",
    chat_welcome: "مرحباً بك في بايوني للأدوات الصحية! 💦 أنا مساعدك الافتراضي، كيف يمكنني خدمتك اليوم؟ يمكنك سؤالي عن المنتجات، الضمان، التوصيل، أو الفروع.",
    chat_input_placeholder: "اكتب رسالتك هنا...",
    wishlist_title: "المفضلة",
    cart_title: "عربة التسوق",
    cart_subtotal: "المجموع الفرعي:",
    cart_discount: "الخصم المطبق:",
    cart_total: "الإجمالي:",
    cart_tax_info: "*الأسعار تشمل ضريبة القيمة المضافة ١٥٪",
    cart_checkout_btn: "إتمام الطلب والدفع",
    search_placeholder: "ابحث عن خلاط، شاور، مراية، حوض...",
    search_popular: "عمليات بحث شائعة:",
    search_tag_mixer: "خلاط",
    search_tag_mirror: "مراية LED",
    search_tag_shower: "شاور حراري",
    search_tag_basin: "مغسلة سيراميك",
    search_cancel: "إلغاء",
    checkout_success_title: "تم استلام طلبك بنجاح!",
    checkout_success_desc: "شكراً لشرائك من بايوني للأدوات الصحية. سيقوم ممثل خدمة العملاء بالتواصل معك قريباً لتأكيد تفاصيل الشحن والتركيب.",
    checkout_order_id: "رقم الطلب:",
    checkout_order_date: "تاريخ الطلب:",
    checkout_order_total: "المبلغ الإجمالي:",
    checkout_success_btn: "موافق، العودة للمتجر",
    toast_added_cart: "تمت إضافة المنتج للسلة",
    toast_added_wishlist: "تمت الإضافة للمفضلة",
    toast_removed_wishlist: "تمت الإزالة من المفضلة",
    toast_empty_cart: "السلة فارغة!",
    toast_checkout_done: "تم تأكيد طلبك بنجاح! 🎉",
    toast_newsletter: "تم الاشتراك بنجاح! سنرسل لك أحدث العروض.",
    toast_review_success: "تم نشر تقييمك بنجاح! شكراً لك.",
    toast_review_error: "من فضلك أدخل اسمك وتعليقك",
    toast_contact_success: "تم إرسال استفسارك بنجاح. سيتواصل معك فريقنا قريباً.",
    toast_contact_error: "يرجى تعبئة الاسم ورقم الجوال على الأقل.",
    cart_empty_msg: "سلة التسوق فارغة",
    cart_continue_shopping: "استمر في التسوق",
    wishlist_empty_msg: "المفضلة فارغة حتى الآن",
    quick_view_title: "تقييمات العملاء",
    quick_view_your_rating: "تقييمك:",
    quick_view_name_placeholder: "اسمك",
    quick_view_comment_placeholder: "أضف تعليقك...",
    quick_view_send_btn: "إرسال التقييم",
    quick_view_finish_label: "اختر التشطيب:",
    search_no_results: "لا توجد نتائج لـ",
    whatsapp_tooltip: "تواصل معنا"
  },
  en: {
    announcement_truck: "Free delivery across KSA for orders above 500 SAR",
    announcement_warranty: "5-Year warranty on all mixers",
    announcement_phone: "Call us: 0539471055",
    nav_home: "Home",
    nav_products: "Products",
    nav_categories: "Categories",
    nav_why_us: "Why Us",
    nav_testimonials: "Testimonials",
    nav_contact: "Contact Us",
    nav_packages: "Bayouni Packages",
    nav_toilets: "Toilets",
    toilet_floor: "Floor Toilets (Western)",
    toilet_wall: "Wall-hung Toilets",
    nav_basins: "Basins",
    basin_decor: "Decorative Basins",
    basin_by_size: "Filter by Size",
    basin_60: "Basins 60 cm",
    basin_80: "Basins 80 cm",
    basin_100: "Basins 100 cm",
    basin_120: "Basins 120 cm",
    basin_150: "Basins 150 cm",
    basin_wall: "Wall-hung Basins",
    basin_external: "External Basin",
    basin_drain: "Basin Drain",
    nav_mirrors: "Mirrors",
    mirror_40: "Mirrors 40 cm",
    mirror_60: "Mirrors 60 cm",
    mirror_70: "Mirrors 70 cm",
    mirror_80: "Mirrors 80 cm",
    mirror_100: "Mirrors 100 cm",
    mirror_120: "Mirrors 120 cm",
    mirror_150: "Mirrors 150 cm & Larger",
    announcement_text: "Be unique... with exceptional designs and lasting elegance",
    hero_badge: "Established 1977 - Quality You Trust",
    hero_title_1: "Modern Bath Elegance",
    hero_title_2: "Starts with Bayouni",
    hero_desc: "We are proud to present premium mixer designs, smart mirrors, and shower columns manufactured with high quality ensuring durability and luxury.",
    hero_btn_shop: "Shop Collections",
    hero_btn_warranty: "Our Warranty Features",
    mouse_scroll: "Scroll Down",
    stat_year_title: "Year of Establishment",
    stat_products_title: "Premium Products in Showrooms",
    stat_satisfaction_title: "Client Satisfaction Rate",
    stat_branches_title: "Branches in the Kingdom",
    offer_summer_title: "Summer Sales",
    offer_summer_desc: "Save up to 30% on thermostatic shower systems",
    offer_summer_btn: "Shop Now",
    offer_primo_title: "New Primo Collection",
    offer_primo_desc: "Luxurious gold mixers arrived exclusively to our showrooms",
    offer_primo_btn: "Discover",
    offer_install_title: "Free Installation Service",
    offer_install_desc: "Free installation on orders above 2000 SAR",
    offer_install_btn: "Learn More",
    products_sub: "Shop Now",
    products_title: "Our Recommended Premium Collection",
    products_desc: "Sanitary ware specially designed to meet the highest standards of modern construction in KSA with a real 5-year warranty.",
    filter_all: "All",
    filter_mixers: "Mixers",
    filter_mirrors: "Mirrors",
    filter_showers: "Showers",
    filter_basins: "Basins",
    filter_accessories: "Accessories",
    categories_sub: "Our Categories",
    categories_title: "Explore Products by Category",
    categories_desc: "Choose a category and design your own space with our integrated sanitary solutions.",
    category_mixers_title: "Luxurious Mixers",
    category_mixers_desc: "Over 120 mixers for kitchens, bathtubs, and basins",
    category_mirrors_title: "Smart Mirrors",
    category_mirrors_desc: "Latest illuminated mirrors with anti-fog and touch sensor",
    category_showers_title: "Shower Systems",
    category_showers_desc: "Thermostatic shower sets and rain showers with modern touches",
    category_basins_title: "Basins & Sinks",
    category_basins_desc: "Ceramic and marble basins with distinct finishes",
    category_link_text: "Browse Products",
    brands_sub: "Our Partners",
    brands_desc: "We provide products from the world's most famous sanitary brands",
    why_us_sub: "Why Us?",
    why_us_title: "An Anxiety-Free Experience",
    why_us_desc: "We are committed to combining stunning looks with high functionality with services that support client trust.",
    why_us_card_1_title: "Real 5-Year Warranty",
    why_us_card_1_desc: "All our faucets and shower systems come with a 5-year warranty against manufacturing defects and color change.",
    why_us_card_2_title: "Secure Shipping & Delivery",
    why_us_card_2_desc: "Fast delivery service to all KSA cities to ensure your products arrive scratch-free.",
    why_us_card_3_title: "Original Spare Parts",
    why_us_card_3_desc: "We provide ongoing maintenance and spare parts for all products in all KSA branches.",
    why_us_card_4_title: "Free Technical Consultation",
    why_us_card_4_desc: "A fully integrated technical team ready to help you measure and choose the best style for your home.",
    testimonials_sub: "Testimonials",
    testimonials_title: "What Our Clients Say",
    testimonials_desc: "We are proud of the trust given to us by villa owners and engineers in their projects.",
    contact_sub: "Contact Us",
    contact_title: "We Are Here to Help",
    contact_desc: "Our team is available to help you choose the right product and provide free technical consultation.",
    contact_method_phone: "Call Us Directly",
    contact_method_whatsapp: "WhatsApp",
    contact_method_whatsapp_sub: "Start chat now",
    contact_method_email: "Email",
    contact_method_address: "Our Address",
    contact_method_address_val: "Khobar - King Khalid St / Dammam",
    contact_hours_title: "Working Hours",
    contact_hours_sat_thu: "Saturday - Thursday",
    contact_hours_sat_thu_val: "9 AM - 10 PM",
    contact_hours_fri: "Friday",
    contact_hours_fri_val: "4 PM - 10 PM",
    contact_form_title: "Send Us an Inquiry",
    contact_form_name_label: "Full Name",
    contact_form_name_placeholder: "e.g. Mohammed Al-Otaibi",
    contact_form_phone_label: "Mobile Number",
    contact_form_subject_label: "Subject",
    contact_form_subject_default: "Choose Subject",
    contact_form_subject_1: "Product Inquiry",
    contact_form_subject_2: "Request Quotation",
    contact_form_subject_3: "After-Sales Service",
    contact_form_subject_4: "Business Partnership",
    contact_form_message_label: "Your Message",
    contact_form_message_placeholder: "Write your inquiry or request here...",
    contact_form_submit: "Send Inquiry",
    newsletter_title: "Be the First to Know About Exclusive Offers",
    newsletter_desc: "Join our email newsletter to get the latest catalogs, luxury designs, and special project offers.",
    newsletter_input_placeholder: "Enter your email address",
    newsletter_btn: "Subscribe Now",
    footer_brand_desc: "Since 1977, we have been equipping the most beautiful bathrooms and projects in Saudi Arabia with premium products and innovative solutions.",
    footer_links_section: "Site Sections",
    footer_categories_section: "Product Categories",
    footer_cat_mixers: "Sanitary Mixers",
    footer_cat_mirrors: "Smart LED Mirrors",
    footer_cat_showers: "Shower Systems",
    footer_cat_basins: "Sinks & Basins",
    footer_contact_section: "Contact Us",
    footer_address: "Khobar - King Khalid St / Dammam - Eastern Province",
    footer_copyright: "Bayouni Sanitary Ware. All rights reserved.",
    chat_agent_name: "Bayouni Smart Helper",
    chat_agent_status: "Active Now",
    chat_welcome: "Welcome to Bayouni Sanitary Ware! 💦 I am your virtual assistant, how can I help you today? You can ask me about products, warranty, delivery, or branches.",
    chat_input_placeholder: "Type your message here...",
    wishlist_title: "Wishlist",
    cart_title: "Shopping Cart",
    cart_subtotal: "Subtotal:",
    cart_discount: "Discount Applied:",
    cart_total: "Total:",
    cart_tax_info: "*Prices include 15% VAT",
    cart_checkout_btn: "Complete Checkout",
    search_placeholder: "Search for faucets, mirrors, showers, basins...",
    search_popular: "Popular searches:",
    search_tag_mixer: "Faucets",
    search_tag_mirror: "LED Mirrors",
    search_tag_shower: "Shower",
    search_tag_basin: "Basin",
    search_cancel: "Cancel",
    checkout_success_title: "Order Placed Successfully!",
    checkout_success_desc: "Thank you for shopping at Bayouni Sanitary Ware. A customer service representative will contact you shortly to confirm shipping and installation details.",
    checkout_order_id: "Order ID:",
    checkout_order_date: "Order Date:",
    checkout_order_total: "Total Amount:",
    checkout_success_btn: "Done, Return to Store",
    toast_added_cart: "Product added to cart",
    toast_added_wishlist: "Added to wishlist",
    toast_removed_wishlist: "Removed from wishlist",
    toast_empty_cart: "Cart is empty!",
    toast_checkout_done: "Order confirmed successfully! 🎉",
    toast_newsletter: "Subscribed successfully! We'll send you latest offers.",
    toast_review_success: "Review posted successfully! Thank you.",
    toast_review_error: "Please enter your name and comment",
    toast_contact_success: "Inquiry sent successfully. We will contact you soon.",
    toast_contact_error: "Please enter at least your name and mobile number.",
    cart_empty_msg: "Your cart is empty",
    cart_continue_shopping: "Continue Shopping",
    wishlist_empty_msg: "Your wishlist is empty",
    quick_view_title: "Customer Reviews",
    quick_view_your_rating: "Your Rating:",
    quick_view_name_placeholder: "Your name",
    quick_view_comment_placeholder: "Add comment...",
    quick_view_send_btn: "Send Review",
    quick_view_finish_label: "Select Finish:",
    search_no_results: "No results found for",
    whatsapp_tooltip: "Contact Us"
  }
};

/* ─── PRODUCT DATA ───────────────────────────────────────── */
const products = [
  {
    id: 1,
    name_ar: 'خلاط مطبخ نحاس ذهبي متحرك',
    name_en: 'Premium Brass Gold Kitchen Faucet',
    category: 'mixers',
    categoryLabel_ar: 'الخلاطات',
    categoryLabel_en: 'Mixers',
    image: 'assets/kitchen_faucet.png',
    price: 499,
    oldPrice: 699,
    rating: 4.9,
    reviewCount: 128,
    badge: 'featured',
    badgeLabel_ar: 'الأكثر مبيعاً',
    badgeLabel_en: 'Best Seller',
    description_ar: 'خلاط مطبخ مصنوع من النحاس الصلب المطلي بالذهب، يأتي بذراع متحركة 360° لسهولة الاستخدام. يضمن ضغطاً مائياً قوياً وحرارة ثابتة مع ضمان 5 سنوات.',
    description_en: 'Kitchen faucet made of solid brass with gold plating, featuring a 360° rotating spout for easy operation. Ensures strong water pressure and stable temperature with a 5-year warranty.',
    finishes_ar: ['كروم', 'ذهبي', 'أسود مطفي'],
    finishes_en: ['Chrome', 'Gold', 'Matte Black'],
    reviews_ar: [
      { author: 'محمد العتيبي', stars: 5, text: 'جودة ممتازة والذهبي جميل جداً في المطبخ.' },
      { author: 'سارة الحربي', stars: 4, text: 'خلاط راقٍ وتركيبه سهل.' }
    ],
    reviews_en: [
      { author: 'Mohammed Al-Otaibi', stars: 5, text: 'Excellent quality and the gold looks beautiful in the kitchen.' },
      { author: 'Sarah Al-Harbi', stars: 4, text: 'Elegant mixer and very easy to install.' }
    ]
  },
  {
    id: 2,
    name_ar: 'مراية ذكية LED دائرية مضادة للبخار',
    name_en: 'Smart LED Anti-Fog Round Mirror',
    category: 'mirrors',
    categoryLabel_ar: 'المرايات',
    categoryLabel_en: 'Mirrors',
    image: 'assets/led_mirror.png',
    price: 799,
    oldPrice: 999,
    rating: 4.8,
    reviewCount: 92,
    badge: 'new',
    badgeLabel_ar: 'جديد',
    badgeLabel_en: 'New',
    description_ar: 'مراية مستديرة بإضاءة LED محيطية دافئة وباردة قابلة للتعديل. مقاومة للبخار 100% وبها زر تشغيل لمسي ومستشعر حركة ذكي.',
    description_en: 'Round smart mirror with warm and cool dimmable ambient LED lighting. 100% anti-fog with a touch power button and smart motion sensor.',
    finishes_ar: ['إطار أسود', 'إطار ذهبي', 'بدون إطار'],
    finishes_en: ['Black Frame', 'Gold Frame', 'Frameless'],
    reviews_ar: [
      { author: 'خالد الدوسري', stars: 5, text: 'إضاءتها رائعة وتضيء الحمام بشكل خرافي.' }
    ],
    reviews_en: [
      { author: 'Khaled Al-Dossari', stars: 5, text: 'Amazing lighting, illuminates the bathroom beautifully.' }
    ]
  },
  {
    id: 3,
    name_ar: 'عمود دش حراري أسود مطفي متكامل',
    name_en: 'Thermostatic Matte Black Shower System',
    category: 'showers',
    categoryLabel_ar: 'أنظمة الشاور',
    categoryLabel_en: 'Shower Systems',
    image: 'assets/shower_system.png',
    price: 1299,
    oldPrice: 1599,
    rating: 4.9,
    reviewCount: 74,
    badge: 'sale',
    badgeLabel_ar: 'خصم 20%',
    badgeLabel_en: '20% OFF',
    description_ar: 'عمود شاور فاخر بتحكم حراري دقيق ودش أيدي ورأس دش مطري. مصنوع من الفولاذ المقاوم للصدأ بطلاء أسود مطفي أنيق ومتين.',
    description_en: 'Luxury shower column with precise thermostatic control, hand shower, and rain shower head. Made of stainless steel with a sleek, durable matte black finish.',
    finishes_ar: ['أسود مطفي', 'كروم', 'ذهبي'],
    finishes_en: ['Matte Black', 'Chrome', 'Gold'],
    reviews_ar: [
      { author: 'فيصل الشمراني', stars: 5, text: 'أفضل شاور جربته في حياتي. الحرارة ثابتة تماماً.' },
      { author: 'نورة القحطاني', stars: 5, text: 'يعطي تجربة فندقية داخل البيت.' }
    ],
    reviews_en: [
      { author: 'Faisal Al-Shamrani', stars: 5, text: 'Best shower I ever tried. Temperature remains perfectly stable.' },
      { author: 'Noura Al-Qahtani', stars: 5, text: 'Gives a premium hotel-like experience at home.' }
    ]
  },
  {
    id: 4,
    name_ar: 'حوض مغسلة سيراميك إيطالي مُعلق',
    name_en: 'Wall-Hung Italian Ceramic Bathroom Sink',
    category: 'basins',
    categoryLabel_ar: 'الأحواض',
    categoryLabel_en: 'Basins',
    image: 'assets/ceramic_sink.png',
    price: 399,
    oldPrice: 599,
    rating: 4.7,
    reviewCount: 61,
    badge: 'featured',
    badgeLabel_ar: 'موصى به',
    badgeLabel_en: 'Recommended',
    description_ar: 'حوض مغسلة من السيراميك الإيطالي الفاخر مع تشطيب ناعم مقاوم للخدش والبقع. تصميم معلق عصري يمنح الحمام مساحة بصرية أوسع.',
    description_en: 'Premium Italian ceramic bathroom sink with a smooth scratch- and stain-resistant finish. Modern wall-hung design that maximizes visual space.',
    finishes_ar: ['أبيض ناصع', 'رمادي فاتح', 'أسود فحمي'],
    finishes_en: ['Bright White', 'Light Grey', 'Charcoal Black'],
    reviews_ar: [
      { author: 'أحمد الزهراني', stars: 5, text: 'تركيبه سهل والتشطيب ناعم جداً.' }
    ],
    reviews_en: [
      { author: 'Ahmed Al-Zahrani', stars: 5, text: 'Easy to install and the finish is super smooth.' }
    ]
  },
  {
    id: 5,
    name_ar: 'خلاط بانيو حر ثلاثي نحاس أصفر',
    name_en: 'Freestanding Solid Brass Tub Filler',
    category: 'mixers',
    categoryLabel_ar: 'الخلاطات',
    categoryLabel_en: 'Mixers',
    image: 'assets/bath_mixer.png',
    price: 899,
    oldPrice: 1299,
    rating: 4.9,
    reviewCount: 47,
    badge: 'sale',
    badgeLabel_ar: 'خصم 30%',
    badgeLabel_en: '30% OFF',
    description_ar: 'خلاط بانيو حر قائم مصنوع من النحاس الأصفر الصلب مع صمام ثلاثي الاتجاهات وتدفق مائي متحكم به. لمسة فاخرة كلاسيكية لحمامات الضيوف.',
    description_en: 'Freestanding bath mixer made of solid brass with a 3-way valve and controlled water flow. A classic, luxurious touch for guest bathrooms.',
    finishes_ar: ['ذهبي برونزي', 'كروم', 'نيكل مصقول'],
    finishes_en: ['Bronze Gold', 'Chrome', 'Brushed Nickel'],
    reviews_ar: [
      { author: 'عبدالله العمري', stars: 5, text: 'تحفة فنية. الذهبي البرونزي أضاف فخامة للبانيو.' }
    ],
    reviews_en: [
      { author: 'Abdullah Al-Omari', stars: 5, text: 'A masterpiece. The bronze gold added pure luxury to the tub.' }
    ]
  },
  {
    id: 6,
    name_ar: 'طقم إكسسوارات حمام ستانلس 6 قطع',
    name_en: '6-Piece Stainless Steel Bath Accessory Set',
    category: 'accessories',
    categoryLabel_ar: 'الإكسسوارات',
    categoryLabel_en: 'Accessories',
    image: 'assets/bath_accessories.png',
    price: 299,
    oldPrice: 499,
    rating: 4.6,
    reviewCount: 113,
    badge: 'featured',
    badgeLabel_ar: 'جودة ممتازة',
    badgeLabel_en: 'Premium',
    description_ar: 'طقم إكسسوارات حمام متكامل من الاستانلس ستيل 316 يشمل: حامل فوط، حلقة مناشف، حامل ورق، رف إضافي، خطاف ثوب، وزجاج تسنين.',
    description_en: 'Complete bathroom accessories set made of 316 stainless steel, including towel bar, towel ring, paper holder, shelf, robe hook, and tumbler holder.',
    finishes_ar: ['كروم لامع', 'أسود مطفي', 'ذهبي برونزي'],
    finishes_en: ['Polished Chrome', 'Matte Black', 'Bronze Gold'],
    reviews_ar: [
      { author: 'ريم السعد', stars: 4, text: 'الطقم متناسق جداً والتثبيت قوي.' }
    ],
    reviews_en: [
      { author: 'Reem Al-Saad', stars: 4, text: 'The set is very cohesive and the installation is solid.' }
    ]
  }
];

/* ─── DOM REFERENCES ─────────────────────────────────────── */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ─── HELPERS ────────────────────────────────────────────── */
const toLocalNumerals = (n, lang) => {
  if (lang === 'ar') {
    return String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  }
  return String(n);
};

const formatPrice = (p) => {
  const lang = state.currentLang;
  if (lang === 'ar') {
    return `${toLocalNumerals(p.toLocaleString(), 'ar')} ر.س`;
  }
  return `${p.toLocaleString()} SAR`;
};

const calcDiscount = (cur, old) => Math.round((1 - cur / old) * 100);

function saveStorage() {
  localStorage.setItem('bayouni_cart', JSON.stringify(state.cart));
  localStorage.setItem('bayouni_wishlist', JSON.stringify(state.wishlist));
}

/* ─── TOAST NOTIFICATIONS ────────────────────────────────── */
function showToast(msgKey, type = 'default', icon = 'fas fa-check-circle', isLiteral = false) {
  const container = $('toast-container');
  if (!container) return;

  const msg = isLiteral ? msgKey : (translations[state.currentLang][msgKey] || msgKey);

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="${icon}"></i><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ─── STAR RENDERER ──────────────────────────────────────── */
function renderStars(rating, small = false) {
  const size = small ? '' : '';
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  let html = '<div class="stars">';
  for (let i = 0; i < full;  i++) html += `<i class="fas fa-star${size}"></i>`;
  if (half) html += `<i class="fas fa-star-half-stroke${size}"></i>`;
  for (let i = 0; i < empty; i++) html += `<i class="far fa-star${size}"></i>`;
  html += '</div>';
  return html;
}

/* ─── PRELOADER ──────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = $('preloader');
    if (loader) loader.classList.add('hidden');
  }, 1200);
});

/* ─── NAVBAR SCROLL BEHAVIOUR ────────────────────────────── */
const navbar = $('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Highlight active nav link
  const sections = $$('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
    if (!link) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
  });
}, { passive: true });

/* ─── MOBILE MENU ────────────────────────────────────────── */
const toggleMobileMenuBtn = $('mobile-menu-toggle');
if (toggleMobileMenuBtn) {
  toggleMobileMenuBtn.addEventListener('click', () => {
    $('mobile-menu-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

const closeMobileMenu = () => {
  $('mobile-menu-overlay').classList.remove('open');
  document.body.style.overflow = '';
};
const mobileMenuCloseBtn = $('mobile-menu-close');
if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
$$('.mobile-link').forEach(a => a.addEventListener('click', closeMobileMenu));

/* ─── PRODUCT CARD BUILDER ───────────────────────────────── */
function buildProductCard(product, index) {
  const lang = state.currentLang;
  const name = lang === 'ar' ? product.name_ar : product.name_en;
  const categoryLabel = lang === 'ar' ? product.categoryLabel_ar : product.categoryLabel_en;
  const badgeLabel = lang === 'ar' ? product.badgeLabel_ar : product.badgeLabel_en;

  const discount = product.oldPrice ? calcDiscount(product.price, product.oldPrice) : 0;
  const isWishlisted = state.wishlist.includes(product.id);
  const card = document.createElement('div');
  card.className = 'product-card fade-in';
  card.dataset.category = product.category;
  card.dataset.id = product.id;
  card.style.animationDelay = `${index * 60}ms`;

  card.innerHTML = `
    <div class="product-img-wrap">
      ${product.badge ? `<div class="product-badges"><span class="badge-pill ${product.badge}">${badgeLabel}</span></div>` : ''}
      <div class="card-quick-actions">
        <button class="quick-action-btn wishlist-toggle ${isWishlisted ? 'wishlisted' : ''}" data-id="${product.id}" aria-label="Wishlist">
          <i class="fa${isWishlisted ? 's' : 'r'} fa-heart"></i>
        </button>
        <button class="quick-action-btn quick-view-btn" data-id="${product.id}" aria-label="Quick View">
          <i class="fas fa-eye"></i>
        </button>
      </div>
      <img src="${product.image}" alt="${name}" loading="lazy">
    </div>
    <div class="product-body">
      <div class="product-category">${categoryLabel}</div>
      <h3 class="product-name">${name}</h3>
      <div class="product-rating">
        ${renderStars(product.rating)}
        <span class="rating-count">(${toLocalNumerals(product.reviewCount, lang)} ${lang === 'ar' ? 'تقييم' : 'reviews'})</span>
      </div>
      <div class="product-price-row">
        <div class="price-group">
          <span class="current-price">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
        </div>
        ${discount > 0 ? `<span class="discount-tag">${lang === 'ar' ? 'خصم' : 'OFF'} ${toLocalNumerals(discount, lang)}٪</span>` : ''}
      </div>
      <button class="add-to-cart-btn" data-id="${product.id}">
        <i class="fas fa-shopping-bag"></i>
        <span data-i18n="add_to_cart">${lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
      </button>
    </div>
  `;

  // Cart button
  card.querySelector('.add-to-cart-btn').addEventListener('click', () => addToCart(product.id));
  // Quick view
  card.querySelector('.quick-view-btn').addEventListener('click', () => openProductModal(product.id));
  // Wishlist
  card.querySelector('.wishlist-toggle').addEventListener('click', e => toggleWishlist(product.id, e.currentTarget));

  return card;
}

/* ─── RENDER PRODUCTS ────────────────────────────────────── */
function renderProducts(filter = 'all') {
  const grid = $('products-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  filtered.forEach((p, i) => grid.appendChild(buildProductCard(p, i)));
}

/* ─── FILTER TABS ────────────────────────────────────────── */
$$('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.currentFilter = btn.dataset.filter;
    renderProducts(state.currentFilter);
  });
});

/* ─── FOOTER CATEGORY LINKS ──────────────────────────────── */
$$('.category-filter-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const filter = link.dataset.filter;
    const tabBtn = document.querySelector(`.tab-btn[data-filter="${filter}"]`);
    if (tabBtn) {
      $$('.tab-btn').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      renderProducts(filter);
    }
    const section = $('products');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ─── CATEGORY CARDS ─────────────────────────────────────── */
$$('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    const filter = card.dataset.category;
    const tabBtn = document.querySelector(`.tab-btn[data-filter="${filter}"]`);
    if (tabBtn) {
      $$('.tab-btn').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      renderProducts(filter);
    }
    const section = $('products');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ─── CART LOGIC ─────────────────────────────────────────── */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const existing = state.cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ id: productId, qty: 1 });
  }
  saveStorage();
  updateCartUI();
  
  const name = state.currentLang === 'ar' ? product.name_ar : product.name_en;
  showToast(`${state.currentLang === 'ar' ? 'تمت إضافة' : 'Added'} "${name}" ${state.currentLang === 'ar' ? 'للسلة' : 'to cart'}`, 'success', 'fas fa-circle-check', true);

  // Animate button
  const btn = document.querySelector(`.product-card[data-id="${productId}"] .add-to-cart-btn`);
  if (btn) {
    const span = btn.querySelector('span');
    btn.classList.add('added');
    span.textContent = state.currentLang === 'ar' ? 'تمت الإضافة ✓' : 'Added ✓';
    setTimeout(() => { 
      btn.classList.remove('added'); 
      span.textContent = state.currentLang === 'ar' ? 'أضف للسلة' : 'Add to Cart'; 
    }, 1800);
  }

  // Bump badge
  const badge = $('cart-count');
  if (badge) {
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }
}

window.removeFromCart = function(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  saveStorage();
  updateCartUI();
  renderCartItems();
};

window.changeQty = function(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveStorage();
  updateCartUI();
  renderCartItems();
};

function updateCartUI() {
  const total = state.cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = $('cart-count');
  if (badge) badge.textContent = total;
  const drawerCount = $('cart-drawer-count');
  if (drawerCount) drawerCount.textContent = total;

  // Totals
  let subtotal = 0, discount = 0;
  state.cart.forEach(item => {
    const p = products.find(pr => pr.id === item.id);
    if (!p) return;
    subtotal += item.qty * p.price;
    if (p.oldPrice) discount += item.qty * (p.oldPrice - p.price);
  });
  
  const subtotalVal = $('cart-subtotal');
  const discountVal = $('cart-discount');
  const totalVal = $('cart-total');
  
  if (subtotalVal) subtotalVal.textContent = formatPrice(subtotal + discount);
  if (discountVal) discountVal.textContent = `- ${formatPrice(discount)}`;
  if (totalVal) totalVal.textContent = formatPrice(subtotal);
}

function renderCartItems() {
  const container = $('cart-items-container');
  if (!container) return;

  const lang = state.currentLang;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-bag-shopping"></i>
        <p>${translations[lang].cart_empty_msg}</p>
        <button class="btn btn-outline" style="margin-top:1rem" onclick="closeCart()">${translations[lang].cart_continue_shopping}</button>
      </div>`;
    return;
  }

  container.innerHTML = state.cart.map(item => {
    const p = products.find(pr => pr.id === item.id);
    if (!p) return '';
    const name = lang === 'ar' ? p.name_ar : p.name_en;
    return `
      <div class="cart-item" data-id="${p.id}">
        <img src="${p.image}" alt="${name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-name">${name}</div>
          <div class="cart-item-price">${formatPrice(p.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${p.id}, -1)"><i class="fas fa-minus"></i></button>
            <span class="qty-val">${toLocalNumerals(item.qty, lang)}</span>
            <button class="qty-btn" onclick="changeQty(${p.id}, 1)"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${p.id})" aria-label="Remove item"><i class="fas fa-trash-can"></i></button>
      </div>`;
  }).join('');
}

window.openCart = function() {
  renderCartItems();
  $('cart-drawer').classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeCart = function() {
  $('cart-drawer').classList.remove('open');
  document.body.style.overflow = '';
};
const cartToggleBtn = $('cart-toggle-btn');
if (cartToggleBtn) cartToggleBtn.addEventListener('click', window.openCart);
const cartCloseBtn = $('cart-close-btn');
if (cartCloseBtn) cartCloseBtn.addEventListener('click', window.closeCart);
const cartDrawer = $('cart-drawer');
if (cartDrawer) {
  cartDrawer.addEventListener('click', e => { if (e.target === e.currentTarget) window.closeCart(); });
}

/* ─── WISHLIST LOGIC ─────────────────────────────────────── */
function toggleWishlist(productId, btn) {
  const idx = state.wishlist.indexOf(productId);
  if (idx === -1) {
    state.wishlist.push(productId);
    btn.classList.add('wishlisted');
    btn.querySelector('i').className = 'fas fa-heart';
    showToast('toast_added_wishlist', 'success', 'fas fa-heart');
  } else {
    state.wishlist.splice(idx, 1);
    btn.classList.remove('wishlisted');
    btn.querySelector('i').className = 'far fa-heart';
    showToast('toast_removed_wishlist', '', 'fas fa-heart-crack');
  }
  saveStorage();
  updateWishlistUI();
}

function updateWishlistUI() {
  const count = state.wishlist.length;
  const badge = $('wishlist-count');
  if (badge) badge.textContent = count;
  const drawerCount = $('wishlist-drawer-count');
  if (drawerCount) drawerCount.textContent = count;
}

function renderWishlistItems() {
  const container = $('wishlist-items-container');
  if (!container) return;
  container.innerHTML = '';

  const lang = state.currentLang;

  if (state.wishlist.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-heart-crack"></i>
        <p>${translations[lang].wishlist_empty_msg}</p>
      </div>`;
    return;
  }

  const ul = document.createElement('div');
  ul.className = 'wishlist-items';
  state.wishlist.forEach(id => {
    const p = products.find(pr => pr.id === id);
    if (!p) return;
    const name = lang === 'ar' ? p.name_ar : p.name_en;
    ul.innerHTML += `
      <div class="wishlist-item" data-id="${p.id}">
        <img src="${p.image}" alt="${name}" class="wishlist-item-img">
        <div class="wishlist-item-info">
          <div class="wishlist-item-name">${name}</div>
          <div class="wishlist-item-price">${formatPrice(p.price)}</div>
        </div>
        <button class="wishlist-to-cart" onclick="addToCart(${p.id}); removeFromWishlist(${p.id});" title="${lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}">${lang === 'ar' ? 'سلة' : 'Add'}</button>
        <button class="wishlist-remove" onclick="removeFromWishlist(${p.id})" aria-label="Remove"><i class="fas fa-times"></i></button>
      </div>`;
  });
  container.appendChild(ul);
}

window.removeFromWishlist = function(productId) {
  const idx = state.wishlist.indexOf(productId);
  if (idx !== -1) state.wishlist.splice(idx, 1);
  saveStorage();
  updateWishlistUI();
  renderWishlistItems();
  // Update card button
  const btn = document.querySelector(`.product-card[data-id="${productId}"] .wishlist-toggle`);
  if (btn) { btn.classList.remove('wishlisted'); btn.querySelector('i').className = 'far fa-heart'; }
};

const wishlistBtn = $('wishlist-btn');
if (wishlistBtn) {
  wishlistBtn.addEventListener('click', () => {
    renderWishlistItems();
    $('wishlist-drawer').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}
const wishlistCloseBtn = $('wishlist-close-btn');
if (wishlistCloseBtn) {
  wishlistCloseBtn.addEventListener('click', () => {
    $('wishlist-drawer').classList.remove('open');
    document.body.style.overflow = '';
  });
}
const wishlistDrawer = $('wishlist-drawer');
if (wishlistDrawer) {
  wishlistDrawer.addEventListener('click', e => {
    if (e.target === e.currentTarget) { $('wishlist-drawer').classList.remove('open'); document.body.style.overflow = ''; }
  });
}

/* ─── CHECKOUT FLOW ──────────────────────────────────────── */
const checkoutBtn = $('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (state.cart.length === 0) { showToast('toast_empty_cart', 'error', 'fas fa-circle-exclamation'); return; }

    let total = 0;
    state.cart.forEach(item => {
      const p = products.find(pr => pr.id === item.id);
      if (p) total += item.qty * p.price;
    });

    const now = new Date();
    const monthsAr = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const monthsEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
    if (state.currentLang === 'ar') {
      $('receipt-date').textContent = `${toLocalNumerals(now.getDate(), 'ar')} ${monthsAr[now.getMonth()]} ${toLocalNumerals(now.getFullYear(), 'ar')}`;
      $('receipt-order-id').textContent = `#BY-${toLocalNumerals(Math.floor(10000 + Math.random() * 90000), 'ar')}`;
    } else {
      $('receipt-date').textContent = `${now.getDate()} ${monthsEn[now.getMonth()]} ${now.getFullYear()}`;
      $('receipt-order-id').textContent = `#BY-${Math.floor(10000 + Math.random() * 90000)}`;
    }
    
    $('receipt-total').textContent = formatPrice(total);

    window.closeCart();
    $('checkout-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

const checkoutSuccessClose = $('checkout-success-close');
if (checkoutSuccessClose) {
  checkoutSuccessClose.addEventListener('click', () => {
    $('checkout-modal').classList.remove('open');
    document.body.style.overflow = '';
    state.cart = [];
    saveStorage();
    updateCartUI();
    renderCartItems();
    showToast('toast_checkout_done', 'success', 'fas fa-circle-check');
  });
}
const checkoutModal = $('checkout-modal');
if (checkoutModal) {
  checkoutModal.addEventListener('click', e => {
    if (e.target === e.currentTarget) { $('checkout-modal').classList.remove('open'); document.body.style.overflow = ''; }
  });
}

/* ─── PRODUCT QUICK VIEW MODAL ───────────────────────────── */
window.selectFinish = function(btn) {
  btn.closest('.finish-options').querySelectorAll('.finish-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
};

function openProductModal(productId) {
  const p = products.find(pr => pr.id === productId);
  if (!p) return;

  const lang = state.currentLang;
  const name = lang === 'ar' ? p.name_ar : p.name_en;
  const categoryLabel = lang === 'ar' ? p.categoryLabel_ar : p.categoryLabel_en;
  const desc = lang === 'ar' ? p.description_ar : p.description_en;
  const finishes = lang === 'ar' ? p.finishes_ar : p.finishes_en;
  const reviews = lang === 'ar' ? p.reviews_ar : p.reviews_en;

  const reviewsHTML = reviews.map(r => `
    <div class="review-item">
      <div class="review-author">${r.author}</div>
      <div class="review-stars">${'<i class="fas fa-star"></i>'.repeat(r.stars)}</div>
      <div class="review-text">${r.text}</div>
    </div>`).join('');

  const finishesHTML = finishes.map((f, i) =>
    `<button class="finish-btn${i === 0 ? ' selected' : ''}" onclick="selectFinish(this)">${f}</button>`
  ).join('');

  const discount = p.oldPrice ? calcDiscount(p.price, p.oldPrice) : 0;
  const detailsEl = $('modal-product-details');

  detailsEl.innerHTML = `
    <div class="modal-product-layout">
      <div class="modal-img-section">
        <img src="${p.image}" alt="${name}">
      </div>
      <div class="modal-info-section">
        <div class="modal-category">${categoryLabel}</div>
        <h2 class="modal-product-name">${name}</h2>
        <div class="modal-rating">
          ${renderStars(p.rating)}
          <span style="color:var(--text-light);font-size:.85rem;margin-right:.4rem">(${toLocalNumerals(p.reviewCount, lang)} ${lang === 'ar' ? 'تقييم' : 'reviews'})</span>
        </div>
        <div class="modal-price">
          <span class="modal-current-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="modal-old-price">${formatPrice(p.oldPrice)}</span>` : ''}
          ${discount > 0 ? `<span class="discount-tag">${lang === 'ar' ? 'خصم' : 'OFF'} ${toLocalNumerals(discount, lang)}٪</span>` : ''}
        </div>
        <div class="modal-option-label">${translations[lang].quick_view_finish_label}</div>
        <div class="finish-options">${finishesHTML}</div>
        <p class="modal-desc">${desc}</p>
        <button class="btn btn-primary modal-cart-btn" onclick="addToCart(${p.id}); window.closeModal();">
          <i class="fas fa-shopping-bag"></i>
          <span>${lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
    <div class="modal-reviews">
      <h4>${translations[lang].quick_view_title} (${toLocalNumerals(reviews.length, lang)})</h4>
      <div class="reviews-list" id="reviews-list-${p.id}">${reviewsHTML}</div>
      <div class="review-form">
        <div>
          <div class="modal-option-label">${translations[lang].quick_view_your_rating}</div>
          <div class="star-select" id="star-select">
            ${[1,2,3,4,5].map(n => `<i class="fas fa-star" data-val="${n}" onclick="selectStar(${n})"></i>`).join('')}
          </div>
        </div>
        <input type="text"  id="review-author-input" placeholder="${translations[lang].quick_view_name_placeholder}" required>
        <textarea           id="review-text-input"   placeholder="${translations[lang].quick_view_comment_placeholder}" rows="3"></textarea>
        <button class="btn btn-outline" onclick="submitReview(${p.id})">
          <i class="fas fa-paper-plane"></i>
          <span>${translations[lang].quick_view_send_btn}</span>
        </button>
      </div>
    </div>`;

  $('product-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

window.closeModal = function() {
  $('product-modal').classList.remove('open');
  document.body.style.overflow = '';
};
const modalCloseBtn = $('modal-close-btn');
if (modalCloseBtn) modalCloseBtn.addEventListener('click', window.closeModal);
const productModal = $('product-modal');
if (productModal) {
  productModal.addEventListener('click', e => { if (e.target === e.currentTarget) window.closeModal(); });
}

/* ─── REVIEW SUBMISSION ──────────────────────────────────── */
let selectedStars = 5;
window.selectStar = function(val) {
  selectedStars = val;
  $$('#star-select i').forEach((star, i) => {
    star.classList.toggle('selected', i < val);
  });
};

window.submitReview = function(productId) {
  const author = $('review-author-input')?.value?.trim();
  const text   = $('review-text-input')?.value?.trim();
  if (!author || !text) { showToast('toast_review_error', 'error', 'fas fa-circle-exclamation'); return; }

  const p = products.find(pr => pr.id === productId);
  if (!p) return;

  const reviewList = p[state.currentLang === 'ar' ? 'reviews_ar' : 'reviews_en'];
  reviewList.push({ author, stars: selectedStars, text });
  p.reviewCount++;

  const list = $(`reviews-list-${productId}`);
  const newReview = document.createElement('div');
  newReview.className = 'review-item';
  newReview.style.animation = 'cardIn .4s ease forwards';
  newReview.innerHTML = `
    <div class="review-author">${author}</div>
    <div class="review-stars">${'<i class="fas fa-star"></i>'.repeat(selectedStars)}</div>
    <div class="review-text">${text}</div>`;
  list.prepend(newReview);

  $('review-author-input').value = '';
  $('review-text-input').value   = '';
  window.selectStar(5);

  showToast('toast_review_success', 'success', 'fas fa-circle-check');
};

/* ─── LIVE SEARCH ────────────────────────────────────────── */
const searchOpenBtn = $('search-open-btn');
if (searchOpenBtn) {
  searchOpenBtn.addEventListener('click', () => {
    $('search-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('search-input').focus(), 150);
  });
}

window.closeSearch = function() {
  $('search-overlay').classList.remove('open');
  document.body.style.overflow = '';
  $('search-input').value = '';
  $('search-results-container').innerHTML = '';
};

const searchCloseBtn = $('search-close-btn');
if (searchCloseBtn) searchCloseBtn.addEventListener('click', window.closeSearch);
const searchClearBtn = $('search-clear-btn');
if (searchClearBtn) {
  searchClearBtn.addEventListener('click', () => {
    $('search-input').value = '';
    $('search-results-container').innerHTML = '';
  });
}
const searchOverlay = $('search-overlay');
if (searchOverlay) {
  searchOverlay.addEventListener('click', e => { if (e.target === e.currentTarget) window.closeSearch(); });
}

$$('.tag-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $('search-input').value = btn.dataset.search;
    performSearch(btn.dataset.search);
  });
});

const searchInput = $('search-input');
if (searchInput) {
  searchInput.addEventListener('input', e => {
    const q = e.target.value.trim();
    performSearch(q);
  });
}

function performSearch(query) {
  const container = $('search-results-container');
  if (!container) return;
  if (!query) { container.innerHTML = ''; return; }

  const lang = state.currentLang;

  const matches = products.filter(p => {
    const name = lang === 'ar' ? p.name_ar : p.name_en;
    const catLabel = lang === 'ar' ? p.categoryLabel_ar : p.categoryLabel_en;
    const desc = lang === 'ar' ? p.description_ar : p.description_en;
    return name.toLowerCase().includes(query.toLowerCase()) ||
           catLabel.toLowerCase().includes(query.toLowerCase()) ||
           desc.toLowerCase().includes(query.toLowerCase());
  });

  if (matches.length === 0) {
    container.innerHTML = `<div class="no-results"><i class="fas fa-search"></i><p>${translations[lang].search_no_results} "${query}"</p></div>`;
    return;
  }

  container.innerHTML = matches.map(p => {
    const name = lang === 'ar' ? p.name_ar : p.name_en;
    return `
      <div class="search-result-card" onclick="window.closeSearch(); openProductModal(${p.id});">
        <img src="${p.image}" alt="${name}" class="search-result-img">
        <span class="search-result-name">${name}</span>
        <span class="search-result-price">${formatPrice(p.price)}</span>
      </div>`;
  }).join('');
}

/* ─── TESTIMONIALS SLIDER ────────────────────────────────── */
const slides = $$('.testimonial-slide');
const dots   = $$('.dot-btn');

function showSlide(index) {
  if (slides.length === 0) return;
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  slides[index].classList.add('active');
  if (dots[index]) dots[index].classList.add('active');
  state.currentSlide = index;
}

dots.forEach(dot => dot.addEventListener('click', () => showSlide(+dot.dataset.slide)));

// Auto-advance
if (slides.length > 0) {
  setInterval(() => {
    showSlide((state.currentSlide + 1) % slides.length);
  }, 6000);
}

/* ─── STATS COUNTER ANIMATION ────────────────────────────── */
function animateCounter(el, target, duration = 1800) {
  if (!el) return;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(eased * target);
    el.textContent = toLocalNumerals(value.toLocaleString(), state.currentLang);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !state.statsAnimated) {
    state.statsAnimated = true;
    animateCounter($('stat-year'),         1977, 1600);
    animateCounter($('stat-products'),     5000, 2000);
    animateCounter($('stat-satisfaction'), 98,   1400);
    animateCounter($('stat-branches'),     25,   1200);
  }
}, { threshold: 0.5 });

const statsGrid = $('stats-grid');
if (statsGrid) statsObserver.observe(statsGrid);

/* ─── SCROLL-REVEAL ANIMATIONS ───────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('reveal-active');
  });
}, { threshold: 0.12 });

/* ─── NEWSLETTER ─────────────────────────────────────────── */
const newsletterForm = $('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('toast_newsletter', 'success', 'fas fa-envelope-circle-check');
    e.target.reset();
  });
}

/* ─── KEYBOARD ACCESSIBILITY ─────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    window.closeModal();
    window.closeSearch();
    window.closeCart();
    $('wishlist-drawer').classList.remove('open');
    $('checkout-modal').classList.remove('open');
    $('chat-window').classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ─── BACK TO TOP PROGRESS SVG & SCROLL ──────────────────── */
const backToTopBtn = $('back-to-top');
const progressCircle = document.querySelector('.progress-ring__circle');
let circumference = 0;

if (progressCircle) {
  const radius = progressCircle.r.baseVal.value;
  circumference = radius * 2 * Math.PI;
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;
}

function updateScrollIndicators() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = docHeight > 0 ? scrollTop / docHeight : 0;

  // 1. Scroll Progress Bar at the top
  const progressBar = $('scroll-progress');
  if (progressBar) {
    progressBar.style.transform = `scaleX(${scrollRatio})`;
  }

  // 2. Circular Back to Top progress
  if (backToTopBtn) {
    backToTopBtn.classList.toggle('visible', scrollTop > 400);
    if (progressCircle && circumference > 0) {
      const offset = circumference - (scrollRatio * circumference);
      progressCircle.style.strokeDashoffset = offset;
    }
  }
}

window.addEventListener('scroll', updateScrollIndicators, { passive: true });

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── CONTACT FORM ───────────────────────────────────────── */
const contactForm = $('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name    = $('contact-name')?.value.trim();
    const phone   = $('contact-phone-input')?.value.trim();

    if (!name || !phone) {
      showToast('toast_contact_error', 'error', 'fas fa-circle-exclamation');
      return;
    }

    const btn = $('contact-submit-btn');
    if (btn) {
      btn.disabled = true;
      btn.querySelector('span').textContent = state.currentLang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...';
    }

    setTimeout(() => {
      const lang = state.currentLang;
      const successMsg = lang === 'ar'
        ? `شكراً ${name}! سيتواصل معك فريقنا قريباً على رقم ${phone}.`
        : `Thank you ${name}! Our team will contact you soon at ${phone}.`;
      showToast(successMsg, 'success', 'fas fa-circle-check', true);
      contactForm.reset();
      if (btn) {
        btn.disabled = false;
        btn.querySelector('span').textContent = lang === 'ar' ? 'إرسال الاستفسار' : 'Send Inquiry';
      }
    }, 1200);
  });
}

/* ─── THEME MANAGER ──────────────────────────────────────── */
function applyTheme(theme, animate = false) {
  document.documentElement.setAttribute('data-theme', theme);
  state.currentTheme = theme;
  localStorage.setItem('bayouni_theme', theme);

  const themeBtn  = document.querySelector('#theme-toggle-btn');
  const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;

  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  // Animate the button icon on toggle (not on init)
  if (animate && themeBtn) {
    themeBtn.style.transform = 'scale(0.75) rotate(-20deg)';
    themeBtn.style.transition = 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)';
    setTimeout(() => {
      themeBtn.style.transform = 'scale(1) rotate(0deg)';
      setTimeout(() => { themeBtn.style.transform = ''; themeBtn.style.transition = ''; }, 260);
    }, 180);
  }

  // Flash overlay for a polished theme transition
  if (animate) {
    const flash = document.createElement('div');
    flash.style.cssText = `
      position:fixed; inset:0; z-index:9999; pointer-events:none;
      background:${theme === 'dark' ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.18)'};
      animation: themeFlash 0.38s ease forwards;
    `;
    if (!document.querySelector('#theme-flash-style')) {
      const st = document.createElement('style');
      st.id = 'theme-flash-style';
      st.textContent = '@keyframes themeFlash{0%{opacity:1}100%{opacity:0}}';
      document.head.appendChild(st);
    }
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 400);
  }
}

window.toggleTheme = function() {
  const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme, true);
};

/* ─── LANGUAGE MANAGER ───────────────────────────────────── */
function translatePage() {
  const lang = state.currentLang;
  const dict = translations[lang];

  // Set Document properties
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.body.style.direction = lang === 'ar' ? 'rtl' : 'ltr';

  // Apply scroll progress bar layout shift alignment
  const progressBar = $('scroll-progress');
  if (progressBar) {
    progressBar.style.transformOrigin = lang === 'ar' ? 'right' : 'left';
  }

  // Update i18n Elements
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      // If it's an input or textarea, translate placeholder
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', dict[key]);
      } else {
        // Preserving inner elements if they exist (like icons)
        const icon = el.querySelector('i');
        if (icon) {
          el.innerHTML = '';
          el.appendChild(icon);
          const span = document.createElement('span');
          span.textContent = ' ' + dict[key];
          el.appendChild(span);
        } else {
          el.textContent = dict[key];
        }
      }
    }
  });

  // Specifically handle contact subject dropdown translations
  const subjectSelect = $('contact-subject');
  if (subjectSelect) {
    subjectSelect.options[0].text = dict.contact_form_subject_default;
    subjectSelect.options[1].text = dict.contact_form_subject_1;
    subjectSelect.options[2].text = dict.contact_form_subject_2;
    subjectSelect.options[3].text = dict.contact_form_subject_3;
    subjectSelect.options[4].text = dict.contact_form_subject_4;
  }

  // Update categories filter tabs texts dynamically
  const tabAll = document.querySelector('.tab-btn[data-filter="all"]');
  if (tabAll) tabAll.textContent = dict.filter_all;
  const tabMix = document.querySelector('.tab-btn[data-filter="mixers"]');
  if (tabMix) tabMix.textContent = dict.filter_mixers;
  const tabMir = document.querySelector('.tab-btn[data-filter="mirrors"]');
  if (tabMir) tabMir.textContent = dict.filter_mirrors;
  const tabSho = document.querySelector('.tab-btn[data-filter="showers"]');
  if (tabSho) tabSho.textContent = dict.filter_showers;
  const tabBas = document.querySelector('.tab-btn[data-filter="basins"]');
  if (tabBas) tabBas.textContent = dict.filter_basins;
  const tabAcc = document.querySelector('.tab-btn[data-filter="accessories"]');
  if (tabAcc) tabAcc.textContent = dict.filter_accessories;

  // Lang Toggle Button labels
  const langBtnSpan = document.querySelector('#lang-toggle-btn span');
  if (langBtnSpan) {
    langBtnSpan.textContent = lang === 'ar' ? 'EN' : 'العربية';
  }

  // Update dynamic content
  renderProducts(state.currentFilter);
  updateCartUI();
  updateWishlistUI();
  
  // Re-render drawers if open
  if ($('cart-drawer').classList.contains('open')) renderCartItems();
  if ($('wishlist-drawer').classList.contains('open')) renderWishlistItems();

  // Reset chatbot initial message in new lang
  renderChatbotWelcome();
}

window.toggleLanguage = function() {
  state.currentLang = state.currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('bayouni_lang', state.currentLang);
  translatePage();
};

/* ─── FLOATING AI CHATBOT LOGIC ──────────────────────────── */
const chatbotToggle = $('chatbot-toggle-btn');
const chatWindow = $('chat-window');
const chatClose = $('chat-close-btn');
const chatForm = $('chat-form');
const chatInput = $('chat-input');
const chatMessagesContainer = $('chat-messages-container');
const chatSuggestionsContainer = $('chat-suggestions-container');

if (chatbotToggle && chatWindow) {
  chatbotToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    // Hide notification badge once opened
    const badge = chatbotToggle.querySelector('.chat-badge');
    if (badge) badge.style.display = 'none';
    
    if (chatWindow.classList.contains('open')) {
      setTimeout(() => chatInput.focus(), 300);
      scrollToBottom();
    }
  });
}

if (chatClose) {
  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });
}

function scrollToBottom() {
  if (chatMessagesContainer) {
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }
}

function addMessage(text, sender = 'agent') {
  if (!chatMessagesContainer) return;
  const msg = document.createElement('div');
  msg.className = `chat-message ${sender}`;
  msg.innerHTML = `<div class="message-bubble">${text}</div>`;
  chatMessagesContainer.appendChild(msg);
  scrollToBottom();
}

function renderChatbotWelcome() {
  if (!chatMessagesContainer) return;
  chatMessagesContainer.innerHTML = '';
  addMessage(translations[state.currentLang].chat_welcome, 'agent');
  renderSuggestions();
}

// Custom chatbot suggestions based on active language
const suggestionChips = {
  ar: [
    { text: 'تصفح الخلاطات 🚰', action: 'show_mixers' },
    { text: 'المرايات الذكية 🪞', action: 'show_mirrors' },
    { text: 'شاور الاستحمام 🚿', action: 'show_showers' },
    { text: 'فروعنا وأرقامنا 📍', action: 'show_info' },
    { text: 'ساعات العمل والضمان 🛡️', action: 'show_warranty' }
  ],
  en: [
    { text: 'Browse Mixers 🚰', action: 'show_mixers' },
    { text: 'Smart Mirrors 🪞', action: 'show_mirrors' },
    { text: 'Shower Systems 🚿', action: 'show_showers' },
    { text: 'Our Branches 📍', action: 'show_info' },
    { text: 'Hours & Warranty 🛡️', action: 'show_warranty' }
  ]
};

function renderSuggestions() {
  if (!chatSuggestionsContainer) return;
  const chips = suggestionChips[state.currentLang];
  chatSuggestionsContainer.innerHTML = chips.map(c => 
    `<button class="suggestion-chip" onclick="handleChipClick('${c.action}', '${c.text}')">${c.text}</button>`
  ).join('');
}

window.handleChipClick = function(action, chipText) {
  // Add user message
  addMessage(chipText, 'user');
  
  // Respond based on action
  setTimeout(() => {
    const lang = state.currentLang;
    let response = '';
    
    if (action === 'show_mixers') {
      response = lang === 'ar' 
        ? 'لدينا تشكيلة رائعة من خلاطات المطابخ والبانيوهات النحاسية الفاخرة! قمت بفلترة المنتجات في الصفحة لكي تتصفحها الآن. ✨'
        : 'We have a stunning selection of luxury brass kitchen and tub mixers! I have filtered the products on the page for you to browse now. ✨';
      
      // Filter products on page and scroll
      const tab = document.querySelector('.tab-btn[data-filter="mixers"]');
      if (tab) tab.click();
      $('products').scrollIntoView({ behavior: 'smooth' });
      chatWindow.classList.remove('open');
      
    } else if (action === 'show_mirrors') {
      response = lang === 'ar'
        ? 'نوفر أحدث تصاميم المرايا الذكية المضيئة LED بمقاومة كاملة للبخار وزر لمسي. قمت بفلترتها لك في الموقع! 🪞'
        : 'We offer the latest smart LED illuminated mirrors with full anti-fog features and touch sensor. Filtered them for you! 🪞';
      
      const tab = document.querySelector('.tab-btn[data-filter="mirrors"]');
      if (tab) tab.click();
      $('products').scrollIntoView({ behavior: 'smooth' });
      chatWindow.classList.remove('open');
      
    } else if (action === 'show_showers') {
      response = lang === 'ar'
        ? 'اكتشف أعمدة الدش الحرارية والمطهرية الفاخرة بطلاء أسود مطفي مقاوم للصدأ. تصفحها الآن في قسم المنتجات.'
        : 'Discover luxury thermostatic and rain shower columns with rust-proof matte black finish. Browse them now in the products section.';
      
      const tab = document.querySelector('.tab-btn[data-filter="showers"]');
      if (tab) tab.click();
      $('products').scrollIntoView({ behavior: 'smooth' });
      chatWindow.classList.remove('open');
      
    } else if (action === 'show_info') {
      response = lang === 'ar'
        ? '📍 معارضنا الرئيسية تقع في الخبر (شارع الملك خالد) والدمام. يمكنك الاتصال بنا مباشرة على الرقم **٠٥٣٩٤٧١٠٥٥** أو عبر رابط واتساب العائم.'
        : '📍 Our main showrooms are located in Khobar (King Khalid St) and Dammam. You can call us directly at **0539471055** or chat via the floating WhatsApp button.';
      
    } else if (action === 'show_warranty') {
      response = lang === 'ar'
        ? '🛡️ نحن نضمن خلاطاتنا وأنظمة الشاور لمدة 5 سنوات ضمان حقيقي ضد عيوب التصنيع وتغير الألوان. ⏰ ساعات العمل لدينا: السبت - الخميس من ٩ صباحاً حتى ١٠ مساءً، والجمعة من ٤ عصراً حتى ١٠ مساءً.'
        : '🛡️ We guarantee all mixers and shower systems with a real 5-year warranty against manufacturing defects and color change. ⏰ Hours: Sat-Thu 9am - 10pm, Fri 4pm - 10pm.';
    }
    
    addMessage(response, 'agent');
  }, 600);
};

// Chatbot input query responder
function handleChatSubmit(e) {
  e.preventDefault();
  const query = chatInput.value.trim();
  if (!query) return;

  addMessage(query, 'user');
  chatInput.value = '';

  // Simulate thinking
  setTimeout(() => {
    const lang = state.currentLang;
    const lowerQ = query.toLowerCase();
    let response = '';

    // Smart Match logic
    if (lowerQ.includes('خلاط') || lowerQ.includes('faucet') || lowerQ.includes('mixer')) {
      response = lang === 'ar'
        ? 'نوفر خلاطات مطابخ ومغاسل مصنوعة من النحاس الصلب ومطلية بالذهب أو الكروم مع ضمان ٥ سنوات. ننصحك بخلاط مطبخ نحاس ذهبي متحرك بسعر ٤٩٩ ر.س. هل تود أن أعرضها لك؟'
        : 'We offer kitchen and basin faucets made of solid brass with gold or chrome plating and a 5-year warranty. We recommend our Gold Kitchen Mixer for 499 SAR. Shall I filter them for you?';
    } 
    else if (lowerQ.includes('مراية') || lowerQ.includes('mirror') || lowerQ.includes('led')) {
      response = lang === 'ar'
        ? 'نتميز بمرايا ذكية دائرية ومستطيلة مضادة للبخار ومزودة بإضاءة LED قابلة للتعديل بلمسة زر. مرايا LED دائرية تتوفر بسعر ٧٩٩ ر.س.'
        : 'We feature smart round and rectangular anti-fog mirrors equipped with dimmable LED lighting. Dimmable round mirrors are available for 799 SAR.';
    }
    else if (lowerQ.includes('شاور') || lowerQ.includes('دش') || lowerQ.includes('shower')) {
      response = lang === 'ar'
        ? 'لدينا نظام شاور حراري متكامل باللون الأسود المطفي المقاوم للصدأ بسعر ١٢٩٩ ر.س. يوفر تجربة استحمام مطرية مريحة للغاية.'
        : 'We have an integrated thermostatic matte black shower system for 1299 SAR. It provides a luxurious rain shower experience.';
    }
    else if (lowerQ.includes('سعر') || lowerQ.includes('كم') || lowerQ.includes('price') || lowerQ.includes('cost')) {
      response = lang === 'ar'
        ? 'تبدأ أسعار الخلاطات الفاخرة من ٢٩٩ ر.س، والمرايا الذكية من ٧٩٩ ر.س، وأطقم الشاور الحراري من ١٢٩٩ ر.س. مع توصيل مجاني فوق ٥٠٠ ر.س!'
        : 'Faucets start from 299 SAR, Smart Mirrors from 799 SAR, and Thermostatic Shower systems from 1299 SAR. Plus, free delivery on orders above 500 SAR!';
    }
    else if (lowerQ.includes('ضمان') || lowerQ.includes('warranty') || lowerQ.includes('guarantee')) {
      response = lang === 'ar'
        ? '🛡️ ثقتك تهمنا! جميع خلاطاتنا وأنظمة الدش مضمونة لمدة ٥ سنوات كاملة ضد الصدأ، عيوب التصنيع، وتغير الألوان.'
        : '🛡️ Your trust is key! All mixers and shower systems are backed by a full 5-year warranty against rust, manufacturing defects, and color shifts.';
    }
    else if (lowerQ.includes('شحن') || lowerQ.includes('توصيل') || lowerQ.includes('shipping') || lowerQ.includes('delivery')) {
      response = lang === 'ar'
        ? '🚚 التوصيل مجاني لجميع مناطق المملكة للطلبات فوق ٥٠٠ ريال. للطلبات الأقل، التوصيل بسعر رمزي، ويستغرق الشحن العادي من يومين إلى ٤ أيام عمل.'
        : '🚚 Free delivery is available across KSA for orders over 500 SAR. For lower orders, shipping is at a nominal cost and takes 2 to 4 business days.';
    }
    else if (lowerQ.includes('فرع') || lowerQ.includes('عنوان') || lowerQ.includes('مكان') || lowerQ.includes('branch') || lowerQ.includes('location') || lowerQ.includes('الخبر') || lowerQ.includes('الدمام')) {
      response = lang === 'ar'
        ? '📍 نرحب بكم في معارضنا: معرض الخبر (شارع الملك خالد) ومعرض الدمام. ساعات العمل من السبت إلى الخميس (٩ص - ١٠م) والجمعة (٤م - ١٠م).'
        : '📍 We welcome you to our showrooms: Khobar showroom (King Khalid St) and Dammam showroom. Hours: Sat-Thu 9am-10pm, Fri 4pm-10pm.';
    }
    else if (lowerQ.includes('سلام') || lowerQ.includes('مرحبا') || lowerQ.includes('hello') || lowerQ.includes('hi') || lowerQ.includes('hey')) {
      response = lang === 'ar'
        ? 'أهلاً بك! كيف يمكنني مساعدتك اليوم في اختيار مستلزمات حمامك الفاخر؟ 😊'
        : 'Hello there! How can I assist you today in selecting your luxury bathroom fittings? 😊';
    }
    else {
      response = lang === 'ar'
        ? 'شكراً لاستفسارك! 💦 فريق المبيعات لدينا يمكنه إجابتك بدقة أكبر. يمكنك التواصل معنا مباشرة عبر الهاتف **٠٥٣٩٤٧١٠٥٥** أو ترك استفسار في قسم تواصل معنا في الأسفل.'
        : 'Thank you for your inquiry! 💦 Our sales team can answer this in more detail. Feel free to call us directly at **0539471055** or send a message through the contact form below.';
    }

    addMessage(response, 'agent');
  }, 750);
}

if (chatForm) chatForm.addEventListener('submit', handleChatSubmit);

/* ─── CUSTOM CURSOR ANIMATION ────────────────────────────── */
function initCustomCursor() {
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  
  if (isTouch || !isFinePointer) {
    return;
  }
  
  document.body.classList.add('has-custom-cursor');
  
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  
  if (!dot || !ring) return;
  
  let mouseX = -100;
  let mouseY = -100;
  
  let dotX = -100;
  let dotY = -100;
  let ringX = -100;
  let ringY = -100;
  
  let dotScale = 0;
  let ringScale = 0;
  
  let targetDotScale = 1;
  let targetRingScale = 1;
  
  let isHovering = false;
  let isClicking = false;
  let isTextMode = false;
  let hasMoved = false;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!hasMoved) {
      hasMoved = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      dotX = mouseX;
      dotY = mouseY;
      ringX = mouseX;
      ringY = mouseY;
      dotScale = 1;
      ringScale = 1;
    }
  });
  
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    if (hasMoved) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  });
  
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (!target) return;
    
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.closest('input') || target.closest('textarea')) {
      isTextMode = true;
      isHovering = false;
      dot.classList.add('cursor-text-mode');
      ring.classList.add('cursor-text-mode');
      targetDotScale = 1;
      targetRingScale = 0;
      return;
    }
    
    const isInteractive = target.closest('a') || 
                           target.closest('button') || 
                           target.closest('.btn') || 
                           target.closest('.product-card') || 
                           target.closest('.category-card') || 
                           target.closest('.wishlist-btn') || 
                           target.closest('.cart-toggle-btn') ||
                           target.closest('.tag-btn') ||
                           target.closest('[role="button"]') ||
                           target.closest('.accordion-header') ||
                           target.closest('.social-icon') ||
                           target.closest('.theme-toggle-btn') ||
                           target.closest('.lang-btn') ||
                           target.closest('.dropdown > a') ||
                           window.getComputedStyle(target).cursor === 'pointer';
                           
    if (isInteractive) {
      isHovering = true;
      isTextMode = false;
      dot.classList.remove('cursor-text-mode');
      ring.classList.remove('cursor-text-mode');
      dot.classList.add('is-hovering');
      ring.classList.add('is-hovering');
      targetDotScale = 1.3;
      targetRingScale = 1.6;
    } else {
      isHovering = false;
      isTextMode = false;
      dot.classList.remove('is-hovering');
      ring.classList.remove('is-hovering');
      dot.classList.remove('cursor-text-mode');
      ring.classList.remove('cursor-text-mode');
      targetDotScale = 1;
      targetRingScale = 1;
    }
  });
  
  document.addEventListener('mousedown', () => {
    isClicking = true;
    targetDotScale = 0.6;
    targetRingScale = 0.8;
  });
  
  document.addEventListener('mouseup', () => {
    isClicking = false;
    if (isHovering) {
      targetDotScale = 1.3;
      targetRingScale = 1.6;
    } else if (isTextMode) {
      targetDotScale = 1;
      targetRingScale = 0;
    } else {
      targetDotScale = 1;
      targetRingScale = 1;
    }
  });
  
  function updateCursor() {
    dotX += (mouseX - dotX) * 0.28;
    dotY += (mouseY - dotY) * 0.28;
    
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    
    dotScale += (targetDotScale - dotScale) * 0.15;
    ringScale += (targetRingScale - ringScale) * 0.15;
    
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
    
    requestAnimationFrame(updateCursor);
  }
  
  updateCursor();
}

/* ─── INIT ───────────────────────────────────────────────── */
(function init() {
  // 0. Init Custom Cursor
  initCustomCursor();

  // 1. Theme Check
  applyTheme(state.currentTheme);

  // 2. Language Check
  translatePage();

  // 3. Attach Reveal Animations to Scroll elements
  const revealElements = [
    '.hero-content > *',
    '.stat-card',
    '.offer-banner-card',
    '.section-header',
    '.filter-tabs',
    '.product-card',
    '.category-card',
    '.feature-card',
    '.testimonial-slide',
    '.contact-info-card',
    '.contact-form-card',
    '.newsletter-card'
  ];

  $$('.hero-badge, .hero h1, .hero p, .hero-buttons').forEach(el => el.classList.remove('animate-item'));

  revealElements.forEach(selector => {
    $$(selector).forEach((el, index) => {
      el.classList.add('reveal');
      // Stagger item reveals sequentially
      if (selector.includes('card') || selector.includes('slide') || selector.includes('stat-card')) {
        el.classList.add(`reveal-delay-${(index % 4) + 1}`);
      }
      revealObserver.observe(el);
    });
  });

  // Hero immediate load reveal animation
  setTimeout(() => {
    $$('.hero .reveal').forEach(el => el.classList.add('reveal-active'));
  }, 1000);
})();
