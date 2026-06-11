import { MenuItem, SpongeOption, FrostingOption, FillingOption, ToppingOption, SizeOption, BakerSecret } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: '24K Belgian Chocolate Gold Cake',
    description: 'Decadent gourmet dark Belgian chocolate fudge layers topped with 24K edible gold dust, fresh wild forest berries, and rich velvety mocha ganache.',
    price: 68.00,
    rating: 4.9,
    category: 'cakes',
    image: '/src/assets/images/chocolate_cake_1781154713394.png',
    prepTime: '45 mins',
    cookTime: '35 mins',
    difficulty: 'Artisanal',
    yieldText: '10 Rich Slices',
    tag: 'Signature Choice',
    ingredients: [
      { name: 'Belgian Dark Chocolate (70%)', amount: 200, unit: 'g' },
      { name: 'French Cultured Butter', amount: 150, unit: 'g' },
      { name: 'Organic Soft Wheat Flour', amount: 220, unit: 'g' },
      { name: 'Madagascar Bourbon Vanilla', amount: 10, unit: 'ml' },
      { name: 'Double Espresso Shot', amount: 60, unit: 'ml' },
      { name: 'Organic Eggs (Room Temp)', amount: 4, unit: 'whole' },
      { name: '24K Edible Gold Sheets', amount: 2, unit: 'sheets' },
      { name: 'Gourmet Cocoa Powder', amount: 50, unit: 'g' }
    ],
    steps: [
      'Melt the luxury Belgian dark chocolate and cultured butter together over a hot-water bath (bain-marie) until perfectly silky. Stir in the freshly-extended double espresso shot and let it cool slightly.',
      'In a custom copper mixing bowl, whisk egg yolks and organic caster sugar until light, thick, and ribbon-like. Fold in the chocolate butter emulsion.',
      'Sift the flour and Dutch-processed cocoa powder. Delicately fold it into the chocolate mixture in 3 batches to maintain airiness.',
      'Whip egg whites to soft peaks and float-fold into the heavy batter. Pour into a 9-inch lined cake pan and bake at 170°C for exactly 35 minutes.',
      'Prepare a glistening glaze with warm heavy cream and dark chocolate. Once the cake has cooled completely, set on a metal grille and pour over the rich glaze.',
      'Carefully apply delicate gold sheets with a visual styling brush and decorate the top with fresh wild forest berries and coffee beans.'
    ]
  },
  {
    id: 'm2',
    name: 'Avant-Garde Crystalline Sculpture Cake',
    description: 'An artistic design masterpiece of deep black cocoa and smooth ivory satin tiers, accented by handmade spun sugar geodes and glowing glowing candy threads.',
    price: 185.00,
    rating: 5.0,
    category: 'sculptural',
    image: '/src/assets/images/sculpture_cake_1781154766014.png',
    prepTime: '120 mins',
    cookTime: '55 mins',
    difficulty: 'Master Baker',
    yieldText: '25 Slices',
    tag: 'Showstopper',
    ingredients: [
      { name: 'Dutch Charcoal Cocoa', amount: 120, unit: 'g' },
      { name: 'Organic Pastry Flour', amount: 450, unit: 'g' },
      { name: 'Madagascar Vanilla Pods', amount: 3, unit: 'pods' },
      { name: 'Refined German Isomalt Crystals', amount: 250, unit: 'g' },
      { name: 'Egg Whites (Swiss Meringue)', amount: 280, unit: 'g' },
      { name: 'Sweet Clover Honey', amount: 50, unit: 'ml' },
      { name: 'Edible Silver Dusting Shimmer', amount: 5, unit: 'g' }
    ],
    steps: [
      'Bake three separate tiers of deep, dense black cocoa sponge infused with real vanilla and clover honey.',
      'Whip a stable, shimmering Swiss Meringue Buttercream with seeds scraped from real organic Madagascar vanilla pods.',
      'Melt isomalt crystals slowly at 165°C, tint a portion with fine charcoal essence, and tilt on silicone mats of jagged shapes to solidify into gorgeous amethyst-like sugar geode pieces.',
      'Stack the tiers using internal structural support dowels, and crumb-coat to geometric, sharp perfection.',
      'Utilize a pastry spinner to stretch hot golden candy thread loops, spinning them repeatedly like luxurious wool strands orbiting the cake structure.',
      'Arrange the sparkling sugar geode shards and dust with edible silver shimmer under dramatic focus.'
    ]
  },
  {
    id: 'm3',
    name: 'Royal Rose & Hazelnut Macarons',
    description: 'Exquisite French macaron shells filled with hazelnut butter cream and organic Morello cherry gelee, lightly dusted in premium silver luster.',
    price: 26.00,
    rating: 4.8,
    category: 'cookies',
    image: '/src/assets/images/luxury_macarons_1781154732093.png',
    prepTime: '30 mins',
    cookTime: '15 mins',
    difficulty: 'Artisanal',
    yieldText: '12 Luxury Macarons',
    tag: 'Parisian Elite',
    ingredients: [
      { name: 'Superfine Almond Flour', amount: 150, unit: 'g' },
      { name: 'Confectioners Sugar (Double Sifted)', amount: 150, unit: 'g' },
      { name: 'Aged Egg Whites', amount: 110, unit: 'g' },
      { name: 'Toasted Hazelnut Butter', amount: 80, unit: 'g' },
      { name: 'Organic Wild Morello Cherries', amount: 120, unit: 'g' },
      { name: 'Organic Damascene Rosewater', amount: 5, unit: 'ml' }
    ],
    steps: [
      'Blend and double-sift almond flour and confectioners powder together twice to ensure perfectly smooth glass shell surfaces.',
      'Whip aged egg whites to rigid, glassy French meringue peaks. Slowly fold in the cocoa flour mixture in a rhythmic "macaronage" gesture (about 45 folds).',
      'Pipe even 4cm rounds onto premium silicone baking mats, tapping the tray sharply to expel air bubbles.',
      'Allow the macarons to rest in a dry room for 30 minutes until an dry, touch-safe crust skin forms on the surface.',
      'Bake at 150°C for precisely 15 minutes, until clean raised "feet" are displayed around the bases.',
      'Blend hazelnut butter into a luxurious buttercream. Pipe a concentric circle of hazelnut, drop wild high-acid cherry gelée in the center, and sandwich together elegantly.'
    ]
  },
  {
    id: 'm4',
    name: 'Artisanal Flaky Almond Croissants',
    description: 'Heritage-crafted 72-layer double-laminated butter pastry, stuffed with premium frangipane cream and organic bourbon almonds.',
    price: 12.00,
    rating: 4.9,
    category: 'pastries',
    image: '/src/assets/images/golden_croissants_1781154751559.png',
    prepTime: '180 mins',
    cookTime: '20 mins',
    difficulty: 'Master Baker',
    yieldText: '6 Large Pastries',
    tag: 'Warm & Cozy',
    ingredients: [
      { name: 'Stone-Milled T55 Pastry Flour', amount: 500, unit: 'g' },
      { name: 'French Normandy Butter (84% Fat)', amount: 250, unit: 'g' },
      { name: 'Organic Sliced Almonds', amount: 100, unit: 'g' },
      { name: 'Active Wet Yeast', amount: 15, unit: 'g' },
      { name: 'Bourbon Vanilla Sugar', amount: 40, unit: 'g' },
      { name: 'Sweet Almond Liqueur Syrup', amount: 20, unit: 'ml' }
    ],
    steps: [
      'Prepare a cold, hydrated yeast dough (détrempe) using gourmet stone-milled flour. proof in the cold fridge overnight.',
      'Pound butter into a uniform 15cm solid cold rectangle. Encase the butter block in the chilled dough sheet.',
      'Execute three distinct Single and Double folds in sequence, chilling the laminated pastry base for 45 minutes between each operation to develop 72 layers of structure.',
      'Roll out the dough to 3.5mm thick, cut into slender triangles, roll up tightly into crescent spirals from the wide base.',
      'Proof at a precise 26°C for 2.5 hours until super jiggly and doubled in volume.',
      'Brush with whole egg wash, top with sweet almond liqueur almonds and sugar dust, and bake in a steam-injection oven for 20 minutes to maximum flaky crispiness.'
    ]
  }
];

export const SPONGES: SpongeOption[] = [
  { id: 's1', name: 'Dutch Black Cocoa Sponge', description: 'Intense, charcoal dark cocoa texture with rich, chocolate notes', price: 15.00, colorCode: '#111115' },
  { id: 's2', name: 'Madagascar Bourbon Vanilla', description: 'Creamy, sweet, premium French bean infused classic', price: 12.00, colorCode: '#fbf5eb' },
  { id: 's3', name: 'Toasted Saffron Pistachio', description: 'Bold golden-hued spice with nutty caramelized tones', price: 18.00, colorCode: '#ffd166' },
  { id: 's4', name: 'Velvet Espresso Latte', description: 'Rich double espresso shot folded pastry structure', price: 14.00, colorCode: '#5c3d2e' }
];

export const FROSTINGS: FrostingOption[] = [
  { id: 'f1', name: '24K Gold-Fleck Meringue', description: 'Silky Swiss meringue with real luxurious edible gold specks', price: 10.00, colorCode: '#fad02c' },
  { id: 'f2', name: '70% Dark Ganache Glaze', description: 'Glistening, mirrorship deep chocolate mirror shell', price: 12.00, colorCode: '#1a0d00' },
  { id: 'f3', name: 'Damascene Rose Cream', description: 'Fragrant, organic light pink rose essence whipped creme', price: 9.00, colorCode: '#ef476f' },
  { id: 'f4', name: 'Japanese Matcha Velvet', description: 'Earthy, high-grade stoneground green tea emulsion', price: 11.00, colorCode: '#06d6a0' }
];

export const FILLINGS: FillingOption[] = [
  { id: 'l1', name: 'Wild Morello Cherry Coulis', description: 'Tart, high-acidity forest cherries reduced with honey', price: 8.00, colorCode: '#a0001c' },
  { id: 'l2', name: 'Fleur de Sel Caramel', description: 'Ooey-gooey, slightly salted gold toffee drizzle', price: 6.00, colorCode: '#e08f24' },
  { id: 'l3', name: 'Artisan Hazelnut Praline', description: 'Crunchy, sweet, roasted premium Piedmont praline cream', price: 9.00, colorCode: '#8a5c32' },
  { id: 'l4', name: 'Silky Custard Parfait', description: 'Creamy, smooth vanilla custard with subtle cardamon hints', price: 7.00, colorCode: '#f1e4c3' }
];

export const TOPPINGS: ToppingOption[] = [
  { id: 't1', name: '24K Edible Gold Leaf Sheets', price: 16.00 },
  { id: 't2', name: 'Spun Glowing Sugar Halo', price: 10.00 },
  { id: 't3', name: 'Crystalline Isomalt Shards', price: 12.00 },
  { id: 't4', name: 'Bespoke Fresh Alpine Berries', price: 8.00 },
  { id: 't5', name: 'White Chocolate Rose Petals', price: 9.00 },
  { id: 't6', name: 'Crisp Gold-Salted Pistachios', price: 7.00 }
];

export const SIZES: SizeOption[] = [
  { id: 'z1', name: 'Atelier Boutique Single Tier (6")', sizeInches: 6, priceMultiplier: 1.0, servingEstimate: '6 - 10 servings' },
  { id: 'z2', name: 'Imperial Grand Double Tier (8" + 6")', sizeInches: 8, priceMultiplier: 1.6, servingEstimate: '15 - 22 servings' },
  { id: 'z3', name: 'Royal Majestic Triple Tier (10" + 8" + 6")', sizeInches: 10, priceMultiplier: 2.3, servingEstimate: '25 - 40 servings' }
];

export const BAKER_SECRETS: BakerSecret[] = [
  {
    title: 'The Art of the Perfect Crumb Texture',
    category: 'Sponge Science',
    readTime: '3 min read',
    secretText: 'Always ensure your eggs and butter are strictly at 21°C before beginning. Whipping cold butter traps insufficient micro-bubbles relative to sugar crystals, which leads to dense crumb structural collapses during baking.'
  },
  {
    title: 'Achieving Glossy, Crack-Free Macaron Shells',
    category: 'Meringue Art',
    readTime: '4 min read',
    secretText: 'Age your organic egg whites in a clean container for 48 hours in the fridge to allow water molecules to evaporate. Whipping aged proteins results in highly resilient air pockets that prevent expansion fractures under high shell heat.'
  },
  {
    title: 'The 72-Layer Golden Lamination Protocol',
    category: 'Pastry Precision',
    readTime: '5 min read',
    secretText: 'Your lamination butter must match the exact flexibility coefficient of the flour dough. If butter is too warm, it absorbs into layers (forming bread); if too cold, it breaks into internal shards. Aim for exactly 12°C for both.'
  },
  {
    title: 'Assembling Stable Multi-Tiered Masterpieces',
    category: 'Cake Engineering',
    readTime: '6 min read',
    secretText: 'Never stack tiers directly. Always rest upper tiers on 1mm cake plates, anchored below by hollow food-grade dowel tubes placed in hexagonal orientation. Dowels must be leveled to the exact micrometer with a clean carpenter scale.'
  }
];
