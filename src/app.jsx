import React, { useEffect, useMemo, useState } from 'react';
import './style.css';
import { readStorage, writeStorage } from './script.js';
import LoginModule from './login.jsx';
import SignupModule from './signup.jsx';
import AdminModule from './admin.jsx';
import UserModule from './user.jsx';

const starterRecipes = [
  { id: 1, title: 'Creamy Tuscan Pasta', category: 'Dinner', time: 25, difficulty: 'Easy', rating: 4.9, author: 'Sofia Chen', emoji: '🍝', image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85', description: 'Silky, sun-dried tomato cream sauce with fresh spinach, parmesan and a little garlic magic.', ingredients: ['250 g pasta', '2 tbsp olive oil', '3 garlic cloves, minced', '½ cup sun-dried tomatoes', '1 cup cream', '2 cups baby spinach', '½ cup parmesan', 'Salt and black pepper'], steps: ['Cook pasta in salted water until al dente. Reserve ½ cup pasta water.', 'Warm olive oil in a pan. Add garlic and sun-dried tomatoes; cook for 2 minutes.', 'Stir in cream and parmesan, then simmer gently until silky.', 'Fold in spinach and cooked pasta. Loosen with pasta water if needed.', 'Season generously and finish with extra parmesan.'] },
  { id: 2, title: 'Avocado Breakfast Toast', category: 'Breakfast', time: 10, difficulty: 'Easy', rating: 4.8, author: 'Mia Patel', emoji: '🥑', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85', description: 'A bright, crunchy morning favourite with creamy avocado, chilli flakes and lemon.', ingredients: ['2 slices sourdough bread', '1 ripe avocado', '½ lemon', 'Chilli flakes', 'Sea salt', 'Black pepper', 'Optional: 2 eggs'], steps: ['Toast sourdough until golden and crisp.', 'Mash avocado with lemon juice, salt and pepper.', 'Spread generously over toast.', 'Finish with chilli flakes and an optional soft-boiled egg.'] },
  { id: 3, title: 'Rainbow Buddha Bowl', category: 'Healthy', time: 20, difficulty: 'Easy', rating: 4.9, author: 'Arjun Rao', emoji: '🥗', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85', description: 'A colourful, nourishing bowl of crunchy vegetables, grains and tangy tahini dressing.', ingredients: ['1 cup cooked quinoa', '1 cup chickpeas', '1 cucumber', '1 carrot', '1 cup red cabbage', '1 avocado', '2 tbsp tahini', '1 tbsp lemon juice'], steps: ['Prepare quinoa according to packet instructions.', 'Chop cucumber, carrot, cabbage and avocado.', 'Whisk tahini, lemon juice, a splash of water and salt.', 'Arrange quinoa, chickpeas and vegetables in a bowl.', 'Drizzle with dressing and serve fresh.'] },
  { id: 4, title: 'Fluffy Berry Pancakes', category: 'Breakfast', time: 18, difficulty: 'Easy', rating: 4.7, author: 'Emma Wilson', emoji: '🥞', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85', description: 'Soft, golden pancakes with juicy berries and a drizzle of maple syrup.', ingredients: ['1 cup all-purpose flour', '1 tbsp sugar', '1 tsp baking powder', '¾ cup milk', '1 egg', '2 tbsp melted butter', '1 cup mixed berries', 'Maple syrup'], steps: ['Mix flour, sugar and baking powder in a bowl.', 'Whisk milk, egg and melted butter separately.', 'Combine wet and dry ingredients without overmixing.', 'Cook small ladles on a lightly buttered pan until bubbles form; flip.', 'Serve with berries and maple syrup.'] },
  { id: 5, title: 'Spicy Paneer Tacos', category: 'Dinner', time: 30, difficulty: 'Medium', rating: 4.8, author: 'Neha Kapoor', emoji: '🌮', image: 'https://images.unsplash.com/photo-155150 joy-?auto=format&fit=crop&w=900&q=85', description: 'Smoky, spiced paneer tucked into warm tortillas with crunchy slaw and mint yogurt.', ingredients: ['250 g paneer, cubed', '6 small tortillas', '1 tsp paprika', '½ tsp cumin', '1 bell pepper', '1 cup shredded cabbage', '½ cup yogurt', 'Mint chutney'], steps: ['Toss paneer with paprika, cumin, salt and a little oil.', 'Sear paneer and sliced bell pepper until golden.', 'Mix yogurt with mint chutney for a quick sauce.', 'Warm tortillas and fill with paneer, peppers and cabbage.', 'Finish with mint yogurt and lime.'] },
  { id: 6, title: 'Chocolate Lava Cakes', category: 'Dessert', time: 22, difficulty: 'Medium', rating: 5.0, author: 'Luca Martin', emoji: '🍫', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62edad51?auto=format&fit=crop&w=900&q=85', description: 'Rich little chocolate cakes with a warm, molten centre. Date-night worthy, any night.', ingredients: ['100 g dark chocolate', '100 g butter', '2 eggs', '¼ cup sugar', '2 tbsp flour', 'Pinch of salt', 'Butter for ramekins'], steps: ['Heat oven to 220°C. Butter two ramekins.', 'Melt chocolate and butter together; cool slightly.', 'Whisk eggs and sugar until pale, then fold in chocolate.', 'Fold in flour and salt. Divide between ramekins.', 'Bake 9–11 minutes. Rest 1 minute, then turn out carefully.'] },
  { id: 7, title: 'Golden Masala Chai', category: 'Drinks', time: 12, difficulty: 'Easy', rating: 4.9, author: 'Asha Reddy', emoji: '☕', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=85', description: 'Comfort in a cup: strong tea simmered with warming spices, ginger and milk.', ingredients: ['2 cups water', '2 tsp black tea', '1 cup milk', '1 inch fresh ginger', '2 cardamom pods', '1 small cinnamon stick', 'Sugar to taste'], steps: ['Crush ginger and cardamom lightly.', 'Bring water, ginger, cardamom and cinnamon to a simmer.', 'Add tea and simmer for 2 minutes.', 'Add milk and sugar; bring back to a gentle boil.', 'Strain into cups and serve hot.'] },
  {
    id: 8,
    title: 'Lemon Herb Roast Potatoes',
    category: 'Sides',
    time: 40,
    difficulty: 'Easy',
    rating: 4.7,
    author: 'Noah Green',
    emoji: '🥔',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=85',
    description: 'Crispy-edged potatoes with lemon zest, rosemary and plenty of cracked pepper.',
    ingredients: ['600 g baby potatoes', '2 tbsp olive oil', '1 lemon', '2 garlic cloves', '1 tsp rosemary', 'Salt and pepper'],
    steps: [
      'Heat oven to 220°C. Halve the potatoes.',
      'Toss with olive oil, garlic, rosemary, salt and pepper.',
      'Roast for 30–35 minutes, turning halfway.',
      'Finish with lemon zest and a squeeze of lemon juice.'
    ]
  },
  {
    id: 9,
    title: 'Grilled Veggie Wraps',
    category: 'Lunch',
    time: 20,
    difficulty: 'Easy',
    rating: 4.8,
    author: 'Aarav Mehta',
    emoji: '🌯',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85',
    description: 'Warm wraps filled with grilled vegetables, crisp greens and a creamy herb dressing.',
    ingredients: [
      '2 large whole-wheat tortillas',
      '1 small zucchini, sliced',
      '1 red bell pepper, sliced',
      '½ red onion, sliced',
      '1 cup lettuce',
      '¼ cup plain yogurt',
      '1 tbsp lemon juice',
      '½ tsp mixed herbs',
      'Salt and black pepper'
    ],
    steps: [
      'Mix yogurt, lemon juice, mixed herbs, salt and pepper to make the dressing.',
      'Grill zucchini, bell pepper and onion until tender and lightly charred.',
      'Warm the tortillas in a dry pan for a few seconds.',
      'Spread the dressing over each tortilla and add lettuce and grilled vegetables.',
      'Roll the tortillas tightly, slice in half and serve warm.'
    ]
  }
  ,
  {
    id: 10,
    title: 'Mango Yogurt Parfait',
    category: 'Breakfast',
    time: 8,
    difficulty: 'Easy',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🥭',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85',
    description: 'Creamy yogurt layered with ripe mango, crunchy granola and a little honey.',
    ingredients: ['1 cup Greek yogurt', '1 ripe mango, diced', '½ cup granola', '1 tsp honey', 'A few mint leaves'],
    steps: ['Spoon half the yogurt into a glass.', 'Add a layer of diced mango and granola.', 'Repeat the layers with the remaining yogurt.', 'Drizzle with honey, garnish with mint and serve chilled.']
  },
  {
    id: 11,
    title: 'Tomato Basil Bruschetta',
    category: 'Lunch',
    time: 15,
    difficulty: 'Easy',
    rating: 4.9,
    author: 'Food Recipes Kitchen',
    emoji: '🍅',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=85',
    description: 'Toasted bread topped with juicy tomatoes, fresh basil, garlic and olive oil.',
    ingredients: ['1 baguette', '3 ripe tomatoes, diced', '1 garlic clove', '8 fresh basil leaves', '2 tbsp olive oil', 'Salt and black pepper'],
    steps: ['Dice tomatoes and finely chop the basil.', 'Mix tomatoes with basil, olive oil, salt and pepper.', 'Toast baguette slices until crisp.', 'Rub each toast lightly with garlic.', 'Spoon the tomato mixture over the toast and serve.']
  },
  {
    id: 12,
    title: 'Creamy Spinach Soup',
    category: 'Healthy',
    time: 25,
    difficulty: 'Easy',
    rating: 4.7,
    author: 'Food Recipes Kitchen',
    emoji: '🥣',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: 'A smooth, comforting spinach soup with onion, garlic and a gentle touch of cream.',
    ingredients: ['3 cups fresh spinach', '1 small onion, chopped', '2 garlic cloves', '2 cups vegetable stock', '¼ cup cream', '1 tbsp olive oil', 'Salt and pepper'],
    steps: ['Heat olive oil in a pot and soften the onion.', 'Add garlic and cook for 30 seconds.', 'Add spinach and vegetable stock; simmer for 8 minutes.', 'Blend until smooth, then stir in cream.', 'Season to taste and serve warm.']
  },
  {
    id: 13,
    title: 'Strawberry Banana Smoothie',
    category: 'Drinks',
    time: 5,
    difficulty: 'Easy',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🍓',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=85',
    description: 'A naturally sweet, refreshing smoothie made with strawberries, banana and milk.',
    ingredients: ['1 banana', '1 cup strawberries', '¾ cup milk', '½ cup yogurt', '1 tsp honey (optional)', '4 ice cubes'],
    steps: ['Wash and hull the strawberries.', 'Add banana, strawberries, milk and yogurt to a blender.', 'Add honey if desired and blend until smooth.', 'Add ice and blend briefly again.', 'Pour into glasses and serve immediately.']
  }
  ,
  {
    id: 14,
    title: 'Classic Vegetable Biryani',
    category: 'Dinner',
    time: 45,
    difficulty: 'Medium',
    rating: 4.9,
    author: 'Food Recipes Kitchen',
    emoji: '🍚',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=85',
    description: 'Fragrant basmati rice layered with spiced vegetables, herbs and golden onions.',
    ingredients: ['2 cups basmati rice', '2 cups mixed vegetables', '1 onion, sliced', '1 tomato, chopped', '½ cup yogurt', '2 tbsp biryani masala', 'Mint and coriander', '2 tbsp oil or ghee'],
    steps: ['Wash and soak rice for 20 minutes.', 'Fry onions until golden; add tomato, vegetables, yogurt and spices.', 'Cook the rice separately until nearly done.', 'Layer rice over the vegetables with mint and coriander.', 'Cover and cook on low heat for 15 minutes.']
  },
  {
    id: 15,
    title: 'Crispy Masala Dosa',
    category: 'Breakfast',
    time: 25,
    difficulty: 'Medium',
    rating: 4.9,
    author: 'Food Recipes Kitchen',
    emoji: '🥞',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=85',
    description: 'A golden, crisp dosa filled with gently spiced potato masala.',
    ingredients: ['2 cups dosa batter', '3 boiled potatoes', '1 onion, sliced', '½ tsp mustard seeds', '8 curry leaves', '¼ tsp turmeric', '2 tbsp oil', 'Salt to taste'],
    steps: ['Mash the boiled potatoes roughly.', 'Temper mustard seeds and curry leaves in oil.', 'Add onion, turmeric, salt and potatoes; cook for 4 minutes.', 'Spread dosa batter thinly on a hot pan.', 'Drizzle oil, cook until crisp and add potato masala before folding.']
  },
  {
    id: 16,
    title: 'Paneer Butter Masala',
    category: 'Dinner',
    time: 35,
    difficulty: 'Medium',
    rating: 4.9,
    author: 'Food Recipes Kitchen',
    emoji: '🧀',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85',
    description: 'Soft paneer cubes in a rich tomato, butter and cream gravy.',
    ingredients: ['250 g paneer', '3 tomatoes', '1 onion', '1 tbsp butter', '1 tsp ginger-garlic paste', '½ tsp garam masala', '¼ cup cream', 'Salt to taste'],
    steps: ['Cook chopped onion and tomatoes until soft.', 'Cool and blend into a smooth puree.', 'Heat butter and ginger-garlic paste in a pan.', 'Add puree and spices; simmer for 8 minutes.', 'Add paneer and cream, then simmer gently for 5 minutes.']
  },
  {
    id: 17,
    title: 'Chana Masala',
    category: 'Healthy',
    time: 30,
    difficulty: 'Easy',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🥘',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85',
    description: 'Protein-rich chickpeas simmered in a tangy onion and tomato masala.',
    ingredients: ['2 cups cooked chickpeas', '1 onion, chopped', '2 tomatoes, chopped', '1 tsp ginger-garlic paste', '1 tsp chana masala', '½ tsp cumin', '1 tbsp oil', 'Coriander leaves'],
    steps: ['Heat oil and add cumin.', 'Add onion and ginger-garlic paste; cook until soft.', 'Add tomatoes and chana masala; cook until thick.', 'Stir in chickpeas and ½ cup water.', 'Simmer for 12 minutes and garnish with coriander.']
  },
  {
    id: 18,
    title: 'Chicken Pepper Fry',
    category: 'Dinner',
    time: 40,
    difficulty: 'Medium',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🍗',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=85',
    description: 'A bold, savoury chicken stir-fry with black pepper, curry leaves and onions.',
    ingredients: ['500 g chicken pieces', '1 onion, sliced', '1 tbsp ginger-garlic paste', '1½ tsp crushed black pepper', '½ tsp turmeric', '1 tsp coriander powder', 'Curry leaves', '2 tbsp oil'],
    steps: ['Mix chicken with turmeric, coriander powder and salt.', 'Heat oil and fry curry leaves and onion.', 'Add ginger-garlic paste and chicken.', 'Cover and cook until chicken is tender, stirring occasionally.', 'Add crushed pepper and fry until the masala coats the chicken.']
  },
  {
    id: 19,
    title: 'Lemon Rice',
    category: 'Lunch',
    time: 15,
    difficulty: 'Easy',
    rating: 4.7,
    author: 'Food Recipes Kitchen',
    emoji: '🍋',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85',
    description: 'Quick South Indian rice brightened with lemon, peanuts and curry leaves.',
    ingredients: ['2 cups cooked rice', '1 lemon', '2 tbsp peanuts', '½ tsp mustard seeds', '1 green chilli', '8 curry leaves', '¼ tsp turmeric', '1 tbsp oil'],
    steps: ['Fluff the cooked rice and let it cool slightly.', 'Heat oil and add mustard seeds and peanuts.', 'Add chilli, curry leaves and turmeric.', 'Turn off the heat and stir in lemon juice.', 'Toss with rice and adjust salt before serving.']
  },
  {
    id: 20,
    title: 'Sweet Corn Soup',
    category: 'Healthy',
    time: 20,
    difficulty: 'Easy',
    rating: 4.7,
    author: 'Food Recipes Kitchen',
    emoji: '🌽',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: 'A light, comforting soup with sweet corn, carrots and spring onions.',
    ingredients: ['1 cup sweet corn', '¼ cup carrot, diced', '3 cups vegetable stock', '1 tsp cornflour', '1 tbsp water', 'Spring onion', 'Salt and pepper'],
    steps: ['Simmer corn and carrot in vegetable stock for 10 minutes.', 'Mash a few spoonfuls of corn for a thicker texture.', 'Mix cornflour with water until smooth.', 'Stir the slurry into the soup and simmer until lightly thickened.', 'Season and garnish with spring onion.']
  },
  {
    id: 21,
    title: 'Classic Margherita Pizza',
    category: 'Dinner',
    time: 30,
    difficulty: 'Medium',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🍕',
    image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85',
    description: 'A simple homemade pizza topped with tomato, mozzarella and fresh basil.',
    ingredients: ['1 pizza base', '½ cup pizza sauce', '150 g mozzarella', '1 tomato, sliced', 'Fresh basil leaves', '1 tsp olive oil', 'Dried oregano'],
    steps: ['Preheat oven according to the pizza base instructions.', 'Spread pizza sauce over the base.', 'Add mozzarella and tomato slices.', 'Bake until the crust is crisp and cheese is bubbling.', 'Finish with basil, oregano and olive oil.']
  },
  {
    id: 22,
    title: 'Greek Salad',
    category: 'Healthy',
    time: 12,
    difficulty: 'Easy',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🥒',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85',
    description: 'A refreshing salad of cucumber, tomato, olives and feta with lemon dressing.',
    ingredients: ['1 cucumber', '2 tomatoes', '½ red onion', '½ cup olives', '½ cup feta cheese', '1 tbsp olive oil', '1 tbsp lemon juice', 'Oregano'],
    steps: ['Chop cucumber and tomatoes into bite-sized pieces.', 'Thinly slice the onion.', 'Combine vegetables and olives in a bowl.', 'Whisk olive oil, lemon juice and oregano.', 'Pour over the salad and top with feta.']
  },
  {
    id: 23,
    title: 'Banana Oat Pancakes',
    category: 'Breakfast',
    time: 15,
    difficulty: 'Easy',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🍌',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85',
    description: 'Naturally sweet pancakes made with ripe banana, oats and milk.',
    ingredients: ['1 ripe banana', '1 cup rolled oats', '1 egg', '½ cup milk', '½ tsp baking powder', '¼ tsp cinnamon', 'Oil for the pan'],
    steps: ['Blend banana, oats, egg, milk, baking powder and cinnamon.', 'Rest the batter for 5 minutes.', 'Heat a lightly oiled pan over medium-low heat.', 'Pour small portions and cook until bubbles appear.', 'Flip and cook the other side until golden.']
  },
  {
    id: 24,
    title: 'Garlic Butter Mushrooms',
    category: 'Sides',
    time: 15,
    difficulty: 'Easy',
    rating: 4.7,
    author: 'Food Recipes Kitchen',
    emoji: '🍄',
    image: 'https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=900&q=85',
    description: 'Juicy mushrooms tossed in garlic butter, parsley and cracked pepper.',
    ingredients: ['300 g mushrooms', '2 tbsp butter', '3 garlic cloves', '1 tbsp chopped parsley', '½ tsp black pepper', 'Salt to taste', '1 tsp lemon juice'],
    steps: ['Clean and halve the mushrooms.', 'Melt butter in a wide pan.', 'Add mushrooms and cook until browned.', 'Stir in minced garlic, salt and pepper.', 'Finish with parsley and lemon juice.']
  },
  {
    id: 25,
    title: 'Mango Lassi',
    category: 'Drinks',
    time: 5,
    difficulty: 'Easy',
    rating: 4.9,
    author: 'Food Recipes Kitchen',
    emoji: '🥭',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=85',
    description: 'A cool, creamy mango and yogurt drink with a hint of cardamom.',
    ingredients: ['1 cup ripe mango pieces', '1 cup plain yogurt', '½ cup chilled milk', '1–2 tsp sugar or honey', 'A pinch of cardamom', 'Ice cubes'],
    steps: ['Add mango, yogurt and milk to a blender.', 'Add sugar or honey and cardamom.', 'Blend until smooth and creamy.', 'Add ice and blend briefly.', 'Pour into glasses and serve chilled.']
  },
  {
    id: 26,
    title: 'Chocolate Chip Cookies',
    category: 'Dessert',
    time: 25,
    difficulty: 'Easy',
    rating: 4.9,
    author: 'Food Recipes Kitchen',
    emoji: '🍪',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85',
    description: 'Soft-centred cookies with crisp edges and plenty of chocolate chips.',
    ingredients: ['1½ cups flour', '½ cup softened butter', '½ cup brown sugar', '¼ cup white sugar', '1 egg', '½ tsp baking soda', '¾ cup chocolate chips', '1 tsp vanilla'],
    steps: ['Heat oven to 180°C and line a baking tray.', 'Cream butter and both sugars until fluffy.', 'Mix in egg and vanilla.', 'Fold in flour and baking soda, then chocolate chips.', 'Scoop onto the tray and bake for 10–12 minutes.']
  },
  {
    id: 27,
    title: 'Vegetable Hakka Noodles',
    category: 'Lunch',
    time: 20,
    difficulty: 'Easy',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🍜',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=85',
    description: 'Street-style noodles tossed quickly with crunchy vegetables and soy sauce.',
    ingredients: ['200 g noodles', '1 carrot, julienned', '½ capsicum, sliced', '½ cup cabbage', '2 spring onions', '1 tbsp soy sauce', '1 tsp vinegar', '1 tbsp oil'],
    steps: ['Boil noodles until just tender, then drain.', 'Heat oil in a wok on high heat.', 'Stir-fry carrot, capsicum and cabbage for 2–3 minutes.', 'Add noodles, soy sauce and vinegar.', 'Toss well and finish with spring onions.']
  },
  {
    id: 28,
    title: 'Aloo Gobi',
    category: 'Lunch',
    time: 30,
    difficulty: 'Easy',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🥔',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=85',
    description: 'A homestyle dry curry of potatoes and cauliflower with warming spices.',
    ingredients: ['2 potatoes, cubed', '2 cups cauliflower florets', '1 tomato, chopped', '½ tsp cumin', '½ tsp turmeric', '1 tsp coriander powder', '1 tbsp oil', 'Coriander leaves'],
    steps: ['Heat oil and add cumin.', 'Add potatoes and cauliflower; stir for 3 minutes.', 'Mix in tomato, turmeric, coriander powder and salt.', 'Cover and cook on low heat until vegetables are tender, stirring occasionally.', 'Garnish with coriander leaves.']
  },
  {
    id: 29,
    title: 'Strawberry Cheesecake Cups',
    category: 'Dessert',
    time: 20,
    difficulty: 'Easy',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🍓',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85',
    description: 'No-bake dessert cups with buttery biscuit crumbs and creamy strawberry filling.',
    ingredients: ['8 digestive biscuits', '2 tbsp melted butter', '150 g cream cheese', '½ cup whipped cream', '2 tbsp powdered sugar', '½ cup chopped strawberries', '½ tsp vanilla'],
    steps: ['Crush biscuits and mix with melted butter.', 'Divide crumbs between serving cups and press lightly.', 'Beat cream cheese, sugar and vanilla until smooth.', 'Fold in whipped cream and spoon over the biscuit base.', 'Top with strawberries and chill before serving.']
  },
  {
    id: 30,
    title: 'Cucumber Mint Cooler',
    category: 'Drinks',
    time: 5,
    difficulty: 'Easy',
    rating: 4.7,
    author: 'Food Recipes Kitchen',
    emoji: '🥤',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=900&q=85',
    description: 'A refreshing summer drink with cucumber, mint, lemon and sparkling water.',
    ingredients: ['½ cucumber', '8 mint leaves', '1 lemon', '1 tsp honey', '1 cup chilled water or soda', 'Ice cubes'],
    steps: ['Blend cucumber with a little water and strain if desired.', 'Lightly crush mint leaves with lemon juice and honey.', 'Add cucumber juice and chilled water or soda.', 'Stir well and pour over ice.', 'Garnish with cucumber and mint.']
  },
  {
    id: 31,
    title: 'Stuffed Bell Peppers',
    category: 'Dinner',
    time: 40,
    difficulty: 'Medium',
    rating: 4.7,
    author: 'Food Recipes Kitchen',
    emoji: '🫑',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
    description: 'Colourful bell peppers filled with seasoned rice, beans and melted cheese.',
    ingredients: ['3 bell peppers', '1 cup cooked rice', '½ cup cooked beans', '½ cup corn', '½ cup tomato sauce', '½ tsp paprika', '½ cup grated cheese'],
    steps: ['Heat oven to 190°C and halve the peppers lengthwise.', 'Mix rice, beans, corn, tomato sauce and paprika.', 'Fill pepper halves with the mixture.', 'Cover and bake for 25 minutes.', 'Add cheese and bake uncovered until melted.']
  },
  {
    id: 32,
    title: 'Rava Upma',
    category: 'Breakfast',
    time: 20,
    difficulty: 'Easy',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🍲',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
    description: 'A comforting South Indian breakfast with roasted semolina, vegetables and curry leaves.',
    ingredients: ['1 cup rava (semolina)', '2½ cups water', '1 small onion, chopped', '½ cup mixed vegetables', '½ tsp mustard seeds', '8 curry leaves', '1 tbsp oil or ghee', 'Salt to taste'],
    steps: ['Dry-roast rava on low heat until aromatic; set aside.', 'Heat oil and temper mustard seeds and curry leaves.', 'Add onion and vegetables; sauté until slightly tender.', 'Add water and salt; bring to a boil.', 'Slowly add rava while stirring, then cover and cook until fluffy.']
  },
  {
    id: 33,
    title: 'Homemade Hummus',
    category: 'Sides',
    time: 10,
    difficulty: 'Easy',
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: '🧆',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=85',
    description: 'A smooth chickpea dip blended with tahini, lemon, garlic and olive oil.',
    ingredients: ['1½ cups cooked chickpeas', '2 tbsp tahini', '1 lemon', '1 garlic clove', '2 tbsp olive oil', '2–3 tbsp cold water', '½ tsp cumin', 'Salt to taste'],
    steps: ['Add chickpeas, tahini, lemon juice and garlic to a blender.', 'Add cumin, salt and olive oil.', 'Blend, adding cold water gradually until smooth.', 'Taste and adjust lemon and salt.', 'Serve with a drizzle of olive oil and vegetables or pita.']
  }
,
  {
    id: 34,
    title: "Idli with Sambar",
    category: "Breakfast",
    time: 30,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍘",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Soft steamed idlis served with a hearty lentil and vegetable sambar.",
    ingredients: ["2 cups idli batter", "1 cup toor dal", "1 tomato", "1 cup mixed vegetables", "1 tsp sambar powder", "Salt", "Coriander"],
    steps: ["Pour batter into greased idli moulds and steam for 10–12 minutes.", "Cook dal until soft.", "Simmer vegetables with tomato and sambar powder.", "Mash dal into the vegetables and simmer.", "Serve hot sambar with idlis."]
  },
  {
    id: 35,
    title: "Palak Paneer",
    category: "Dinner",
    time: 30,
    difficulty: "Medium",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🥬",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Paneer cubes simmered in a creamy spinach gravy.",
    ingredients: ["250 g paneer", "3 cups spinach", "1 onion", "1 tomato", "1 tsp ginger-garlic paste", "¼ cup cream", "½ tsp garam masala"],
    steps: ["Blanch spinach and blend to a smooth puree.", "Sauté onion and ginger-garlic paste.", "Add tomato and cook until soft.", "Stir in spinach puree and spices.", "Add paneer and cream", " simmer gently."]
  },
  {
    id: 36,
    title: "Veg Pulao",
    category: "Lunch",
    time: 30,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍚",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "A one-pot rice dish with vegetables and whole spices.",
    ingredients: ["1 cup basmati rice", "1½ cups mixed vegetables", "1 onion", "1 tsp cumin", "2 cardamom pods", "1 small cinnamon stick", "2 cups water"],
    steps: ["Rinse and soak rice for 15 minutes.", "Sauté cumin and whole spices in oil.", "Add onion and vegetables.", "Add drained rice, water and salt.", "Cover and cook until rice is fluffy."]
  },
  {
    id: 37,
    title: "Pav Bhaji",
    category: "Lunch",
    time: 35,
    difficulty: "Medium",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍞",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Mumbai-style mashed vegetable curry served with toasted pav.",
    ingredients: ["2 potatoes", "1 cup cauliflower", "½ cup peas", "1 capsicum", "2 tomatoes", "2 tbsp pav bhaji masala", "Pav buns", "Butter"],
    steps: ["Boil potatoes, cauliflower and peas until tender.", "Mash the vegetables.", "Sauté capsicum and tomatoes with pav bhaji masala.", "Add mashed vegetables and simmer.", "Toast pav with butter and serve."]
  },
  {
    id: 38,
    title: "Rajma Masala",
    category: "Dinner",
    time: 40,
    difficulty: "Medium",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🫘",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Kidney beans in a thick, comforting tomato gravy.",
    ingredients: ["2 cups cooked rajma", "1 onion", "2 tomatoes", "1 tsp ginger-garlic paste", "1 tsp cumin", "1 tsp coriander powder", "½ tsp garam masala"],
    steps: ["Sauté cumin and onion in oil.", "Add ginger-garlic paste and tomatoes.", "Cook with coriander powder until thick.", "Add cooked rajma and some cooking liquid.", "Simmer for 15–20 minutes and garnish."]
  },
  {
    id: 39,
    title: "Vegetable Manchurian",
    category: "Dinner",
    time: 35,
    difficulty: "Medium",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🥢",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Crispy vegetable balls tossed in a savoury Indo-Chinese sauce.",
    ingredients: ["2 cups grated cabbage and carrot", "3 tbsp flour", "2 tbsp cornflour", "2 garlic cloves", "1 tbsp soy sauce", "1 tbsp tomato sauce", "Spring onion"],
    steps: ["Mix vegetables with flour, cornflour and salt", " shape into balls.", "Bake or shallow-fry until golden.", "Sauté garlic in a pan.", "Add soy sauce, tomato sauce and a splash of water.", "Toss the balls in sauce and garnish."]
  },
  {
    id: 40,
    title: "Egg Fried Rice",
    category: "Lunch",
    time: 15,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍳",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Quick fried rice with egg, spring onion and crunchy vegetables.",
    ingredients: ["2 cups chilled cooked rice", "2 eggs", "½ cup mixed vegetables", "2 spring onions", "1 tbsp soy sauce", "1 tbsp oil"],
    steps: ["Scramble eggs in a hot wok and set aside.", "Stir-fry vegetables for 2 minutes.", "Add rice and soy sauce.", "Return eggs to the wok and toss.", "Finish with spring onions."]
  },
  {
    id: 41,
    title: "Fish Curry",
    category: "Dinner",
    time: 35,
    difficulty: "Medium",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🐟",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Fish simmered in a tangy tomato and tamarind gravy.",
    ingredients: ["500 g firm fish pieces", "1 onion", "2 tomatoes", "1 tsp ginger-garlic paste", "1 tsp chilli powder", "½ tsp turmeric", "1 tbsp tamarind paste", "Curry leaves"],
    steps: ["Season fish with turmeric and salt.", "Sauté onion, curry leaves and ginger-garlic paste.", "Add tomatoes and spices", " cook until soft.", "Add tamarind and water", " simmer.", "Add fish and cook gently until just done."]
  },
  {
    id: 42,
    title: "Chicken Tikka Wrap",
    category: "Lunch",
    time: 30,
    difficulty: "Medium",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🌯",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Spiced grilled chicken wrapped with crunchy salad and yogurt sauce.",
    ingredients: ["300 g boneless chicken", "½ cup yogurt", "1 tsp tikka masala", "4 tortillas", "1 cucumber", "1 tomato", "Lettuce"],
    steps: ["Mix chicken with yogurt and tikka masala.", "Cook chicken in a pan until fully cooked.", "Mix yogurt with a little lemon and salt for sauce.", "Fill tortillas with lettuce, cucumber, tomato and chicken.", "Roll tightly and serve."]
  },
  {
    id: 43,
    title: "Mushroom Pepper Masala",
    category: "Dinner",
    time: 25,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍄",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Mushrooms cooked with onions, tomatoes and freshly crushed pepper.",
    ingredients: ["300 g mushrooms", "1 onion", "1 tomato", "1 tsp ginger-garlic paste", "1 tsp crushed pepper", "½ tsp coriander powder", "Coriander leaves"],
    steps: ["Sauté onion until golden.", "Add ginger-garlic paste and tomato.", "Stir in coriander powder and pepper.", "Add sliced mushrooms and cook until tender.", "Garnish with coriander."]
  },
  {
    id: 44,
    title: "Overnight Chia Pudding",
    category: "Breakfast",
    time: 5,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🥣",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "A make-ahead breakfast with chia seeds, milk and fresh fruit.",
    ingredients: ["3 tbsp chia seeds", "1 cup milk", "1 tsp honey", "½ tsp vanilla", "½ cup berries or mango"],
    steps: ["Mix chia seeds, milk, honey and vanilla.", "Stir again after 5 minutes to prevent clumps.", "Cover and refrigerate for at least 4 hours.", "Top with fruit before serving."]
  },
  {
    id: 45,
    title: "Vegetable Poha",
    category: "Breakfast",
    time: 20,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🥜",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "A light flattened-rice breakfast with peanuts, turmeric and lemon.",
    ingredients: ["2 cups poha", "1 onion", "½ cup peas", "2 tbsp peanuts", "½ tsp mustard seeds", "¼ tsp turmeric", "1 lemon", "Coriander"],
    steps: ["Rinse poha briefly and drain.", "Toast peanuts in a pan and set aside.", "Temper mustard seeds, then sauté onion and peas.", "Add turmeric, poha and salt", " toss gently.", "Finish with peanuts, lemon juice and coriander."]
  },
  {
    id: 46,
    title: "French Toast",
    category: "Breakfast",
    time: 12,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍞",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Golden bread slices dipped in a cinnamon egg mixture.",
    ingredients: ["4 bread slices", "2 eggs", "¼ cup milk", "½ tsp cinnamon", "1 tsp sugar", "1 tbsp butter"],
    steps: ["Whisk eggs, milk, cinnamon and sugar.", "Dip bread slices briefly in the mixture.", "Heat butter in a pan.", "Cook bread on both sides until golden.", "Serve warm with fruit or honey."]
  },
  {
    id: 47,
    title: "Stuffed Paratha",
    category: "Breakfast",
    time: 30,
    difficulty: "Medium",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🫓",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Whole-wheat flatbread filled with a spiced potato mixture.",
    ingredients: ["2 cups wheat flour", "3 boiled potatoes", "1 green chilli", "½ tsp cumin", "½ tsp coriander powder", "Coriander", "Ghee"],
    steps: ["Knead wheat flour with water into a soft dough.", "Mash potatoes with spices, chilli and coriander.", "Roll dough, add filling and seal.", "Roll gently into a paratha.", "Cook on a hot pan with ghee until golden."]
  },
  {
    id: 48,
    title: "Besan Chilla",
    category: "Breakfast",
    time: 15,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🥞",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Savoury gram-flour pancakes with onion, tomato and herbs.",
    ingredients: ["1 cup besan", "½ onion", "1 tomato", "1 green chilli", "¼ tsp turmeric", "Coriander", "Water"],
    steps: ["Mix besan with chopped vegetables and spices.", "Add water gradually to make a pourable batter.", "Heat a lightly oiled pan.", "Spread batter into a thin circle.", "Cook both sides until golden."]
  },
  {
    id: 49,
    title: "Kadai Paneer",
    category: "Dinner",
    time: 30,
    difficulty: "Medium",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🧀",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Paneer and capsicum tossed in a fragrant tomato-based kadai masala.",
    ingredients: ["250 g paneer", "1 capsicum", "2 tomatoes", "1 onion", "1 tsp coriander seeds", "½ tsp chilli powder", "½ tsp garam masala"],
    steps: ["Coarsely crush coriander seeds.", "Sauté onion and capsicum until lightly tender.", "Add tomatoes and spices", " cook until thick.", "Add paneer and toss gently.", "Simmer for 4 minutes and serve."]
  },
  {
    id: 50,
    title: "Dal Tadka",
    category: "Lunch",
    time: 30,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍲",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Yellow lentils finished with a sizzling garlic and cumin tempering.",
    ingredients: ["1 cup toor dal", "½ tsp turmeric", "1 tomato", "3 garlic cloves", "1 tsp cumin", "1 dried red chilli", "1 tbsp ghee"],
    steps: ["Wash dal and pressure-cook with turmeric until soft.", "Mash lightly and simmer with tomato and salt.", "Heat ghee in a small pan.", "Add cumin, garlic and dried chilli.", "Pour the tempering over dal and garnish."]
  },
  {
    id: 51,
    title: "Vegetable Khichdi",
    category: "Healthy",
    time: 30,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍚",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "A soothing one-pot meal of rice, lentils and vegetables.",
    ingredients: ["½ cup rice", "½ cup moong dal", "1 cup mixed vegetables", "½ tsp cumin", "¼ tsp turmeric", "4 cups water", "Salt"],
    steps: ["Wash rice and dal together.", "Heat a little ghee and add cumin.", "Add vegetables, rice, dal, turmeric, salt and water.", "Pressure-cook until soft.", "Stir and serve warm with yogurt."]
  },
  {
    id: 52,
    title: "Roasted Sweet Potato Wedges",
    category: "Sides",
    time: 30,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍠",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Crispy-edged sweet potato wedges seasoned with paprika and herbs.",
    ingredients: ["2 sweet potatoes", "1 tbsp olive oil", "½ tsp paprika", "½ tsp garlic powder", "½ tsp dried herbs", "Salt"],
    steps: ["Heat oven to 220°C.", "Cut sweet potatoes into wedges.", "Toss with oil and seasonings.", "Spread in one layer on a tray.", "Roast for 20–25 minutes, turning once."]
  },
  {
    id: 53,
    title: "Caprese Sandwich",
    category: "Lunch",
    time: 10,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🥪",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "A fresh sandwich with tomato, mozzarella, basil and pesto.",
    ingredients: ["4 bread slices", "1 tomato", "100 g mozzarella", "2 tbsp pesto", "Fresh basil", "Black pepper"],
    steps: ["Spread pesto on the bread slices.", "Layer tomato, mozzarella and basil.", "Season with black pepper.", "Close the sandwiches.", "Toast lightly if desired and serve."]
  },
  {
    id: 54,
    title: "Baked Mac and Cheese",
    category: "Dinner",
    time: 35,
    difficulty: "Medium",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🧀",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Pasta baked in a creamy cheese sauce with a golden top.",
    ingredients: ["250 g macaroni", "2 tbsp butter", "2 tbsp flour", "2 cups milk", "1½ cups grated cheddar", "¼ cup breadcrumbs"],
    steps: ["Cook macaroni until just tender and drain.", "Melt butter, stir in flour and cook for 1 minute.", "Whisk in milk until smooth and thick.", "Add cheese and stir until melted.", "Mix with pasta, top with breadcrumbs and bake until golden."]
  },
  {
    id: 55,
    title: "Carrot Halwa",
    category: "Dessert",
    time: 45,
    difficulty: "Medium",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🥕",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "A classic Indian dessert of slow-cooked carrots, milk and cardamom.",
    ingredients: ["4 cups grated carrots", "3 cups milk", "¼ cup sugar", "2 tbsp ghee", "¼ tsp cardamom", "2 tbsp chopped nuts"],
    steps: ["Cook grated carrots in a heavy pan for 5 minutes.", "Add milk and simmer, stirring often.", "Cook until most milk evaporates.", "Add sugar, ghee and cardamom.", "Garnish with nuts and serve warm."]
  },
  {
    id: 56,
    title: "Rice Kheer",
    category: "Dessert",
    time: 40,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍮",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Creamy rice pudding simmered with milk, cardamom and nuts.",
    ingredients: ["¼ cup basmati rice", "1 litre milk", "¼ cup sugar", "¼ tsp cardamom", "2 tbsp chopped nuts", "A few raisins"],
    steps: ["Rinse rice and soak for 15 minutes.", "Bring milk to a gentle simmer.", "Add drained rice and cook, stirring often.", "When rice is soft, add sugar and cardamom.", "Garnish with nuts and raisins."]
  },
  {
    id: 57,
    title: "Gulab Jamun",
    category: "Dessert",
    time: 40,
    difficulty: "Medium",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍩",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Soft milk-solid dumplings soaked in fragrant cardamom syrup.",
    ingredients: ["1 cup milk powder", "¼ cup flour", "2 tbsp ghee", "¼ cup milk", "1 cup sugar", "1 cup water", "2 cardamom pods"],
    steps: ["Simmer sugar, water and cardamom to make a light syrup.", "Mix milk powder, flour and ghee.", "Add milk gradually to form a soft dough.", "Shape small smooth balls.", "Fry on low heat until evenly golden and soak in warm syrup."]
  },
  {
    id: 58,
    title: "Apple Cinnamon Oats",
    category: "Breakfast",
    time: 10,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍎",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Warm oats topped with tender apple, cinnamon and nuts.",
    ingredients: ["½ cup rolled oats", "1 cup milk", "1 apple, diced", "¼ tsp cinnamon", "1 tsp honey", "1 tbsp chopped nuts"],
    steps: ["Simmer oats in milk until creamy.", "Cook apple with cinnamon and a splash of water until tender.", "Spoon apples over the oats.", "Drizzle with honey.", "Top with chopped nuts."]
  },
  {
    id: 59,
    title: "Watermelon Mint Juice",
    category: "Drinks",
    time: 5,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍉",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "A fresh summer cooler made with watermelon, mint and lime.",
    ingredients: ["3 cups seedless watermelon", "6 mint leaves", "½ lime", "Ice cubes"],
    steps: ["Chill the watermelon pieces.", "Blend watermelon with mint until smooth.", "Add lime juice and blend briefly.", "Strain if preferred.", "Serve over ice."]
  },
  {
    id: 60,
    title: "Iced Coffee",
    category: "Drinks",
    time: 5,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🧋",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "A chilled, creamy coffee drink blended with milk and ice.",
    ingredients: ["1 cup chilled milk", "1 tsp instant coffee", "1–2 tsp sugar", "4 ice cubes", "½ tsp vanilla"],
    steps: ["Dissolve coffee and sugar in 2 tbsp warm water.", "Add chilled milk, vanilla and ice to a blender.", "Pour in the coffee mixture.", "Blend until frothy.", "Serve immediately."]
  },
  {
    id: 61,
    title: "Roasted Tomato Bruschetta",
    category: "Sides",
    time: 20,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🍅",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "Toasted bread topped with slow-roasted tomatoes, garlic and basil.",
    ingredients: ["4 bread slices", "2 tomatoes", "1 garlic clove", "1 tbsp olive oil", "Fresh basil", "Salt and pepper"],
    steps: ["Heat oven to 200°C.", "Halve tomatoes and roast with oil, salt and pepper for 15 minutes.", "Toast bread slices.", "Rub toast with garlic.", "Top with roasted tomatoes and basil."]
  },
  {
    id: 62,
    title: "Quinoa Vegetable Bowl",
    category: "Healthy",
    time: 25,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🥗",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "A colourful bowl of quinoa, roasted vegetables and lemon dressing.",
    ingredients: ["1 cup cooked quinoa", "1 zucchini", "1 carrot", "½ capsicum", "1 tbsp olive oil", "1 tbsp lemon juice", "½ tsp herbs"],
    steps: ["Cook quinoa according to packet directions.", "Chop vegetables and toss with oil and herbs.", "Roast or pan-cook vegetables until tender.", "Arrange vegetables over quinoa.", "Drizzle with lemon juice and serve."]
  },
  {
    id: 63,
    title: "Coconut Chutney",
    category: "Sides",
    time: 10,
    difficulty: "Easy",
    rating: 4.8,
    author: 'Food Recipes Kitchen',
    emoji: "🥥",
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    description: "A quick South Indian coconut chutney with a mustard seed tempering.",
    ingredients: ["1 cup grated coconut", "2 tbsp roasted chana dal", "1 green chilli", "½ inch ginger", "½ cup water", "½ tsp mustard seeds", "Curry leaves"],
    steps: ["Blend coconut, roasted chana dal, chilli, ginger and water.", "Add salt and adjust consistency.", "Heat a little oil and temper mustard seeds and curry leaves.", "Pour tempering over chutney.", "Serve fresh with idli or dosa."]
  }
].map(recipe => recipe.id === 5
  ? { ...recipe, image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=85' }
  : recipe);
const categories = ['All recipes', 'Breakfast', 'Lunch', 'Dinner', 'Healthy', 'Dessert', 'Drinks', 'Sides'];
const read = readStorage;

function getRecentLogin() {
  try {
    if (localStorage.getItem('rn_login_history_reset') !== 'done') {
      localStorage.removeItem('rn_last_login');
      localStorage.setItem('rn_login_history_reset', 'done');
    }
  } catch {
    // The app can still run when browser storage is unavailable.
  }
  return read('rn_recent_login', null);
}

function App() {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = read('rn_recipes', []);
    const savedIds = new Set(savedRecipes.map((recipe) => recipe.id));
    return [...savedRecipes, ...starterRecipes.filter((recipe) => !savedIds.has(recipe.id))];
  });
  const [users, setUsers] = useState(() => read('rn_users', []));
  const [user, setUser] = useState(() => read('rn_session', null));
  const [favorites, setFavorites] = useState(() => read('rn_favorites', []));
  const [category, setCategory] = useState('All recipes');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState('');
  const [selected, setSelected] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [view, setView] = useState('home');
  const [toast, setToast] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [lastLogin, setLastLogin] = useState(() => getRecentLogin());
  const [form, setForm] = useState({
    name: '',
    email: getRecentLogin()?.email || '',
    password: '',
  });
  const [recipeForm, setRecipeForm] = useState({ title: '', category: 'Dinner', time: '20', difficulty: 'Easy', description: '', image: '', ingredients: '', steps: '' });
  useEffect(() => localStorage.setItem('rn_recipes', JSON.stringify(recipes)), [recipes]);
  useEffect(() => localStorage.setItem('rn_users', JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem('rn_session', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('rn_favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(''), 2600); return () => clearTimeout(t) } }, [toast]);
  const filtered = useMemo(() => recipes.filter(r => (category === 'All recipes' || r.category === category) && (!showFavorites || favorites.includes(r.id)) && `${r.title} ${r.category} ${r.description} ${r.author}`.toLowerCase().includes(query.toLowerCase())), [recipes, category, query, showFavorites, favorites]);
  const isAdmin = user?.role === 'admin';
  function openAuth(mode) {
    setAuthMode(mode);
    setForm({ name: '', email: mode === 'login' ? lastLogin?.email || '' : '', password: '' });
    setModal('');
    setView(mode);
  }
  function submitAuth(e) {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const name = form.name.trim();

    if (!email || !password) {
      setToast('Please enter your email and password.');
      return;
    }

    if (authMode === 'signup') {
      if (name.length < 2) {
        setToast('Please enter your name (at least 2 characters).');
        return;
      }

      if (password.length < 4) {
        setToast('Password must contain at least 4 characters.');
        return;
      }

      const existingUsers = read('rn_users', []);
      if (existingUsers.some((account) => account.email.toLowerCase() === email)) {
        setToast('An account with this email already exists. Please log in.');
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: email === 'admin@foodrecipeapp.com' ? 'admin' : 'user',
      };
      const updatedUsers = [...existingUsers, newUser];

      // Save the account immediately so it is available on the next visit.
      const saved = writeStorage('rn_users', updatedUsers);
      if (!saved) {
        setToast('Could not save your account. Please enable browser storage and try again.');
        return;
      }

      setUsers(updatedUsers);

      const loginRecord = {
        email: newUser.email,
        loggedInAt: new Date().toISOString(),
      };
      setLastLogin(loginRecord);
      writeStorage('rn_recent_login', loginRecord);
      setUser({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      });
      setModal('');
      setView(newUser.role === 'admin' ? 'admin' : 'user');
      setToast(`Account created successfully. Welcome, ${newUser.name.split(' ')[0]}!`);
      return;
    }

    const savedUsers = read('rn_users', []);
    const found = savedUsers.find(
      (account) => account.email.toLowerCase() === email && account.password === password
    );

    if (!found) {
      setToast('Email or password is incorrect. Please sign up if you are new.');
      return;
    }

    const loginRecord = {
      email: found.email,
      loggedInAt: new Date().toISOString(),
    };
    setLastLogin(loginRecord);
    writeStorage('rn_recent_login', loginRecord);
    setUser({
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    });
    setModal('');
    setView(found.role === 'admin' ? 'admin' : 'user');
    setToast(`Welcome back, ${found.name.split(' ')[0]}!`);
  }
  function updateProfile(nextName) {
    const cleanName = nextName.trim();
    if (!cleanName || cleanName.length < 2) {
      setToast('Please enter a name with at least 2 characters.');
      return;
    }
    setUsers((previousUsers) => previousUsers.map((account) =>
      account.id === user.id ? { ...account, name: cleanName } : account
    ));
    setUser((currentUser) => ({ ...currentUser, name: cleanName }));
    setToast('Your account name has been updated.');
  }
  function logout() { setUser(null); setShowFavorites(false); setView('home'); setToast('You have been signed out.'); }
  function toggleFavorite(id) { if (!user) { openAuth('login'); setToast('Sign in to save your favourite recipes.'); return; } setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); setToast(favorites.includes(id) ? 'Removed from favourites.' : 'Saved to your favourites ♥'); }
  function submitRecipe(e) { e.preventDefault(); if (!isAdmin) { setToast('Only admins can add recipes.'); return; } const r = { ...recipeForm, id: Date.now(), time: Number(recipeForm.time) || 20, rating: 5, author: user.name, emoji: '🍽️', image: recipeForm.image || 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85', ingredients: recipeForm.ingredients.split('\n').map(s => s.trim()).filter(Boolean), steps: recipeForm.steps.split('\n').map(s => s.trim()).filter(Boolean) }; setRecipes(prev => [r, ...prev]); setModal(''); setRecipeForm({ title: '', category: 'Dinner', time: '20', difficulty: 'Easy', description: '', image: '', ingredients: '', steps: '' }); setToast('Recipe published successfully!'); }
  function deleteRecipe(id) { setRecipes(prev => prev.filter(r => r.id !== id)); setFavorites(prev => prev.filter(x => x !== id)); setToast('Recipe removed.'); }
  const scrollToRecipes = () => { document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenu(false) };
  if (view === 'login') return <LoginModule form={form} setForm={setForm} onSubmit={submitAuth} onSignup={() => openAuth('signup')} onHome={() => setView('home')} recentLogin={lastLogin} />;
  if (view === 'signup') return <SignupModule form={form} setForm={setForm} onSubmit={submitAuth} onLogin={() => openAuth('login')} onHome={() => setView('home')} />;
  if (view === 'user' && user) return <UserModule user={user} favorites={favorites} lastLogin={lastLogin} onUpdateProfile={updateProfile} onLogout={logout} onHome={() => setView('home')} onFavorites={() => { setView('home'); setShowFavorites(true); setTimeout(scrollToRecipes, 50) }} />;
  if (view === 'admin' && user?.role === 'admin') return <AdminModule user={user} recipes={recipes} users={users} favorites={favorites} recipeForm={recipeForm} setRecipeForm={setRecipeForm} onSubmit={submitRecipe} onDelete={deleteRecipe} onLogout={logout} onHome={() => setView('home')} categories={categories} />;
  return <div className="app-shell">
    <div className="announcement">
      <span className="sparkle">✳</span> A little inspiration for your everyday table <span className="announce-right">Made with love, shared with everyone <span>♡</span>
      </span>
    </div>
    <header className="navbar">
      <a className="brand" href="#top" onClick={() => { setCategory('All recipes'); setShowFavorites(false) }}>
        <span className="brand-mark">f<span>✳</span>
        </span>
        <span>Food <span className="brand-light">Recipes</span>
          <small>GOOD FOOD. GOOD MOOD.</small>
        </span>
      </a>
      <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
        <a href="#recipes" onClick={scrollToRecipes}>Explore recipes</a>
        <a href="#about">Our story</a>{user && <button className={'nav-link-button ' + (showFavorites ? 'active' : '')} onClick={() => { setShowFavorites(!showFavorites); setCategory('All recipes'); scrollToRecipes() }}>♡ Saved recipes</button>}{isAdmin && <button className="nav-link-button admin-link" onClick={() => setView('admin')}>Admin module</button>}{user && !isAdmin && <button className="nav-link-button" onClick={() => setView('user')}>User module</button>}</nav>
      <div className="nav-actions">{user ? <>
        <div className="user-chip">
          <span className="avatar">{user.name?.[0]?.toUpperCase() || 'U'}</span>
          <button className="user-name" onClick={() => setView(isAdmin ? 'admin' : 'user')}>{user.name.split(' ')[0]}</button>{isAdmin && <span className="admin-badge">ADMIN</span>}</div>
        <button className="btn btn-outline small-btn" onClick={logout}>Log out</button>
      </> : <>
        <button className="login-btn" onClick={() => openAuth('login')}>Log in</button>
        <button className="btn btn-dark small-btn" onClick={() => openAuth('signup')}>Join for free <span>↗</span>
        </button>
      </>}<button className="hamburger" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">☰</button>
      </div>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line">
            </span> YOUR DAILY DOSE OF DELICIOUS</div>
          <h1>Find your next<br /> <em>favourite.</em>
          </h1>
          <p className="hero-sub">Recipes worth slowing down for. Discover feel-good food, simple ingredients, and little moments that make every meal special.</p>
          <div className="hero-buttons">
            <button className="btn btn-dark btn-large" onClick={scrollToRecipes}>Explore recipes <span>↗</span>
            </button>
            <button className="text-button" onClick={() => setModal('story')}>Our little story <span>→</span>
            </button>
          </div>
          <div className="hero-social-proof">
            <div className="avatar-stack">
              <span>👩🏻</span>
              <span>👨🏽</span>
              <span>👩🏾</span>
              <span>👨🏻</span>
            </div>
            <div>
              <strong>Made for food lovers</strong>
              <small>One recipe at a time <span className="gold-stars">★★★★★</span>
              </small>
            </div>
          </div>
          <span className="hero-doodle doodle-one">✳</span>
          <span className="hero-doodle doodle-two">✦</span>
        </div>
        <div className="hero-visual">
          <div className="hero-image-main">
            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=90" alt="A colourful table of fresh, delicious food" />
            <div className="image-label">
              <span className="label-icon">✦</span>
              <div>
                <strong>Fresh ideas, daily</strong>
                <small>Something good is cooking</small>
              </div>
            </div>
          </div>
          <div className="floating-note note-top">
            <span>✳</span>
            <div>
              <strong>Cook something lovely</strong>
              <small>You've got this.</small>
            </div>
          </div>
          <div className="floating-note note-bottom">
            <span className="note-heart">♡</span>
            <div>
              <strong>Little joys, big flavour</strong>
              <small>Recipes made to be shared</small>
            </div>
          </div>
          <div className="hero-orbit">
          </div>
        </div>
        <div className="hero-bottom-note">
          <span>SCROLL A LITTLE</span>
          <span className="scroll-line">
          </span>
          <span>GOOD THINGS AHEAD ↓</span>
        </div>
      </section>
      <section className="stats-strip">
        <div>
          <strong>200<span>+</span>
          </strong>
          <small>Recipes to fall for</small>
        </div>
        <div>
          <strong>15<span> min</span>
          </strong>
          <small>Quick & easy favourites</small>
        </div>
        <div>
          <strong>100<span>%</span>
          </strong>
          <small>Made for real life</small>
        </div>
        <div className="stats-quote">“The secret ingredient is always a little love.” <span>— The Food Recipes way</span>
        </div>
      </section>
      <section className="recipes-section" id="recipes">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line">
              </span> THE GOOD STUFF</div>
            <h2>
              {showFavorites ? (
                <>Your saved <em>favourites.</em>
                </>
              ) : (
                <>A table full of <em>ideas.</em>
                </>
              )}
            </h2>
            <p>Something delicious for every craving, every mood, every kind of day.</p>
          </div>
          <div className="heading-side">
            <span className="handwritten">made for your kitchen <span>↙</span>
            </span>
            <div className="recipe-count">{filtered.length.toString().padStart(2, '0')} <span>RECIPES</span>
            </div>
          </div>
        </div>
        <div className="browse-toolbar">
          <div className="category-tabs">{categories.map(c => <button key={c} className={category === c ? 'category-tab selected' : 'category-tab'} onClick={() => { setCategory(c); setShowFavorites(false) }}>{c}</button>)}</div>
          <label className="search-box">
            <span>⌕</span>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find something delicious..." aria-label="Search recipes" />
            <kbd>⌘ K</kbd>
          </label>
        </div>
        {showFavorites && !user ? <div className="empty-state">
          <span>♡</span>
          <h3>Your favourites live here</h3>
          <p>Sign in to save recipes you love.</p>
          <button className="btn btn-dark" onClick={() => openAuth('login')}>Log in</button>
        </div> : filtered.length === 0 ? <div className="empty-state">
          <span>{showFavorites ? '♡' : '⌕'}</span>
          <h3>{showFavorites ? 'No saved recipes yet' : 'Nothing simmering here...'}</h3>
          <p>{showFavorites ? 'Tap the heart on any recipe to keep it close.' : 'Try another search or choose a different category.'}</p>
          <button className="btn btn-outline" onClick={() => { setQuery(''); setCategory('All recipes'); setShowFavorites(false) }}>Show all recipes</button>
        </div> : <div className="recipe-grid">{filtered.map((r, i) => <article className="recipe-card" key={r.id} style={{ '--delay': `${i * 60}ms` }}>
          <button className="recipe-image" onClick={() => { setSelected(r); setModal('recipe') }} aria-label={`View ${r.title}`}>
            <img src={r.image} alt={r.title} loading="lazy" onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85' }} />
            <span className="card-category">{r.category}</span>
            <span className="view-recipe">View recipe ↗</span>
          </button>
          <div className="recipe-info">
            <div className="recipe-meta">
              <span>◷ {r.time} min</span>
              <span className="dot">·</span>
              <span>{r.difficulty}</span>
              <span className="rating">★ {r.rating || '5.0'}</span>
            </div>
            <div className="recipe-title-row">
              <button className="recipe-title" onClick={() => { setSelected(r); setModal('recipe') }}>{r.title}</button>
              <button className={favorites.includes(r.id) ? 'heart-button loved' : 'heart-button'} onClick={() => toggleFavorite(r.id)} aria-label="Save recipe">{favorites.includes(r.id) ? '♥' : '♡'}</button>
            </div>
            <p>{r.description}</p>
            <div className="card-footer">
              <span>by <strong>{r.author}</strong>
              </span>{isAdmin && <button className="delete-btn" onClick={() => deleteRecipe(r.id)}>Remove</button>}<button className="arrow-circle" onClick={() => { setSelected(r); setModal('recipe') }} aria-label="Open recipe">↗</button>
            </div>
          </div>
        </article>)}</div>}
        <div className="browse-more">
          <span className="browse-line">
          </span>
          <span>GOOD FOOD IS NEVER OUT OF STYLE</span>
          <span className="browse-line">
          </span>
        </div>
      </section>
      <section className="newsletter" id="about">
        <div className="newsletter-art">
          <span className="art-sun">✳</span>
          <div className="art-circle">
            <span>made<br />with<br />
              <em>love</em>
            </span>
          </div>
          <span className="art-leaf">〰</span>
        </div>
        <div className="newsletter-copy">
          <div className="eyebrow">
            <span className="eyebrow-line">
            </span> A NOTE FROM OUR KITCHEN</div>
          <h2>Good things are<br /> <em>worth sharing.</em>
          </h2>
          <p>Food Recipes is a little corner of the internet for curious cooks, happy eaters, and anyone who believes the best memories happen around a table.</p>
          <button className="btn btn-dark btn-large" onClick={() => user ? setModal('story') : openAuth('signup')}>{user ? 'Read our story' : 'Come on in'} <span>↗</span>
          </button>
        </div>
        <div className="newsletter-side-note">A LITTLE MORE JOY<br />IN EVERY BITE <span>♡</span>
        </div>
      </section>
    </main>
    <footer className="footer">
      <a className="brand footer-brand" href="#top">
        <span className="brand-mark">f<span>✳</span>
        </span>
        <span>Food <span className="brand-light">Recipes</span>
          <small>GOOD FOOD. GOOD MOOD.</small>
        </span>
      </a>
      <span className="footer-center">Made with a full heart & a hungry belly.</span>
      <span className="footer-right">© 2026 Food Recipes <span>·</span> A student project</span>
    </footer>
    {toast && <div className="toast">
      <span>✳</span>{toast}</div>}
    {modal && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setModal('') }}>
      <div className={'modal-card ' + (modal === 'recipe' ? 'recipe-modal' : '')}>
        <button className="modal-close" onClick={() => setModal('')} aria-label="Close">×</button>
        {modal === 'auth' && <div className="auth-content">
          <div className="modal-brand">f<span>✳</span>
          </div>
          <div className="eyebrow centered">YOUR PLACE AT THE TABLE</div>
          <h2>{authMode === 'login' ? 'Welcome back.' : 'Come on in.'}</h2>
          <p className="modal-sub">{authMode === 'login' ? 'Your next favourite recipe is waiting.' : 'Join our little community of food lovers.'}</p>
          <div className="auth-switch">
            <button className={authMode === 'login' ? 'chosen' : ''} onClick={() => setAuthMode('login')}>Log in</button>
            <button className={authMode === 'signup' ? 'chosen' : ''} onClick={() => setAuthMode('signup')}>Create account</button>
          </div>
          <form onSubmit={submitAuth} className="form-stack">{authMode === 'signup' && <label>Your name<input required minLength="2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="How should we call you?" />
          </label>}<label>Email address<input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
            </label>
            <label>Password<input required minLength="4" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="At least 4 characters" />
            </label>
            <button className="btn btn-dark submit-btn" type="submit">{authMode === 'login' ? 'Log in to Food Recipes' : 'Create my account'} <span>↗</span>
            </button>
          </form>
          <p className="auth-foot">{authMode === 'login' ? "New around here? " : 'Already part of Food Recipes? '}<button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>{authMode === 'login' ? 'Create an account' : 'Log in'}</button>
          </p>
          <p className="demo-hint">Admin demo: create an account using <strong>admin@foodrecipeapp.com</strong> to open Admin Studio.</p>
        </div>}
        {modal === 'recipe' && selected && <div className="recipe-detail">
          <img className="detail-image" src={selected.image} alt={selected.title} />
          <div className="detail-body">
            <div className="eyebrow">
              <span className="eyebrow-line">
              </span>{selected.category.toUpperCase()} · BY {selected.author?.toUpperCase()}</div>
            <h2>{selected.title}</h2>
            <p className="detail-description">{selected.description}</p>
            <div className="detail-stats">
              <span>◷ <strong>{selected.time} min</strong>
              </span>
              <span>✦ <strong>{selected.difficulty}</strong>
              </span>
              <span>★ <strong>{selected.rating || '5.0'}</strong>
              </span>
            </div>
            <div className="detail-columns">
              <div>
                <h3>What you'll need <span>({selected.ingredients?.length || 0})</span>
                </h3>
                <ul className="ingredients">{selected.ingredients?.map((x, i) => <li key={i}>
                  <span className="check-dot">✓</span>{x}</li>)}</ul>
              </div>
              <div>
                <h3>Let's make it</h3>
                <ol className="steps">{selected.steps?.map((x, i) => <li key={i}>
                  <span>{String(i + 1).padStart(2, '0')}</span>{x}</li>)}</ol>
              </div>
            </div>
            <button className="btn btn-dark submit-btn" onClick={() => toggleFavorite(selected.id)}>{favorites.includes(selected.id) ? '♥ Saved to favourites' : '♡ Save this recipe'}</button>
          </div>
        </div>}
        {modal === 'admin' && <div className="admin-content">
          <div className="eyebrow">
            <span className="eyebrow-line">
            </span> FOOD RECIPES ADMIN</div>
          <h2>Admin <em>studio.</em>
          </h2>
          <p className="modal-sub">A little space to keep the recipe collection growing.</p>
          <div className="admin-stats">
            <div>
              <strong>{recipes.length}</strong>
              <span>Published recipes</span>
            </div>
            <div>
              <strong>{users.length}</strong>
              <span>Community members</span>
            </div>
            <div>
              <strong>{favorites.length}</strong>
              <span>Saved favourites</span>
            </div>
          </div>
          <form onSubmit={submitRecipe} className="form-stack admin-form">
            <label>Recipe title<input required value={recipeForm.title} onChange={e => setRecipeForm({ ...recipeForm, title: e.target.value })} placeholder="e.g. Sunday lemon cake" />
            </label>
            <div className="form-row">
              <label>Category<select value={recipeForm.category} onChange={e => setRecipeForm({ ...recipeForm, category: e.target.value })}>{categories.filter(c => c !== 'All recipes').map(c => <option key={c}>{c}</option>)}</select>
              </label>
              <label>Prep time (min)<input type="number" min="1" value={recipeForm.time} onChange={e => setRecipeForm({ ...recipeForm, time: e.target.value })} />
              </label>
            </div>
            <label>Short description<textarea required rows="2" value={recipeForm.description} onChange={e => setRecipeForm({ ...recipeForm, description: e.target.value })} placeholder="What makes this recipe special?" />
            </label>
            <label>Image URL <span className="optional">(optional)</span>
              <input type="url" value={recipeForm.image} onChange={e => setRecipeForm({ ...recipeForm, image: e.target.value })} placeholder="https://..." />
            </label>
            <label>Ingredients <span className="optional">(one per line)</span>
              <textarea required rows="4" value={recipeForm.ingredients} onChange={e => setRecipeForm({ ...recipeForm, ingredients: e.target.value })} placeholder={'2 cups flour\n1 lemon\nA little love'} />
            </label>
            <label>Steps <span className="optional">(one step per line)</span>
              <textarea required rows="4" value={recipeForm.steps} onChange={e => setRecipeForm({ ...recipeForm, steps: e.target.value })} placeholder={'Preheat the oven...\nMix everything together...'} />
            </label>
            <button className="btn btn-dark submit-btn" type="submit">Publish recipe <span>↗</span>
            </button>
          </form>
        </div>}
        {modal === 'story' && <div className="story-content">
          <div className="modal-brand">f<span>✳</span>
          </div>
          <div className="eyebrow centered">A LITTLE ABOUT US</div>
          <h2>Food tastes better<br />when it's <em>shared.</em>
          </h2>
          <p>Food Recipes began with a simple thought: cooking shouldn't feel complicated. It should feel like music in the kitchen, a friend asking for seconds, and the first bite of something you made yourself.</p>
          <p>We're here for weeknight wins, weekend experiments, recipes passed around, and the joy of finding a new favourite. Pull up a chair — there's always room at this table.</p>
          <button className="btn btn-dark submit-btn" onClick={() => { setModal(''); scrollToRecipes() }}>Let's find something delicious <span>↗</span>
          </button>
        </div>}
      </div>
    </div>}
  </div>
}

export default App;
