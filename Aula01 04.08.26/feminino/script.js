// DADOS DOS PRODUTOS - 43 ITENS
const products = [
  { id: 1, name: 'Vestido Floral Verão', category: 'Vestidos', price: 189.90, sale_price: 149.90, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600','https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600','https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600'], is_new: true, is_promotion: true, is_featured: true, sizes: ['PP','P','M','G','GG'], colors: [{name:'Rosa',hex:'#c97b8e'},{name:'Azul',hex:'#3498db'}], occasion: 'Casual', type: 'Curto', description: 'Vestido leve e fluido, perfeito para dias de verão. Estampa floral delicada em tons pastéis.' },
  { id: 2, name: 'Vestido Longo Festa', category: 'Vestidos', price: 299.90, sale_price: null, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400', images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600'], is_new: true, is_promotion: false, is_featured: true, sizes: ['P','M','G'], colors: [{name:'Azul',hex:'#3498db'},{name:'Preto',hex:'#000000'}], occasion: 'Festa', type: 'Longo', description: 'Vestido longo elegante para festas e eventos especiais.' },
  { id: 3, name: 'Vestido Midi Elegance', category: 'Vestidos', price: 219.90, sale_price: 179.90, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600'], is_new: false, is_promotion: true, is_featured: true, sizes: ['P','M','G','GG'], colors: [{name:'Preto',hex:'#000000'},{name:'Vinho',hex:'#722f37'}], occasion: 'Trabalho', type: 'Midi', description: 'Vestido midi sofisticado para o ambiente corporativo.' },
  { id: 4, name: 'Vestido Curto Casual', category: 'Vestidos', price: 159.90, sale_price: null, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['PP','P','M','G'], colors: [{name:'Branco',hex:'#ffffff'},{name:'Bege',hex:'#f5f5dc'}], occasion: 'Casual', type: 'Curto', description: 'Vestido curto despojado para o dia a dia.' },
  { id: 5, name: 'Vestido Renda Luxo', category: 'Vestidos', price: 349.90, sale_price: 279.90, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600'], is_new: false, is_promotion: true, is_featured: true, sizes: ['P','M','G'], colors: [{name:'Rosa',hex:'#c97b8e'},{name:'Nude',hex:'#e3c4b5'}], occasion: 'Festa', type: 'Midi', description: 'Vestido de renda com acabamento luxuoso.' },
  { id: 6, name: 'Vestido Listrado', category: 'Vestidos', price: 169.90, sale_price: null, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['PP','P','M','G','GG'], colors: [{name:'Azul',hex:'#3498db'},{name:'Preto',hex:'#000000'}], occasion: 'Casual', type: 'Curto', description: 'Vestido listrado moderno e versátil.' },
  { id: 7, name: 'Vestido Cetim', category: 'Vestidos', price: 259.90, sale_price: null, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400', images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600'], is_new: false, is_promotion: false, is_featured: true, sizes: ['P','M','G'], colors: [{name:'Dourado',hex:'#ffd700'},{name:'Prata',hex:'#c0c0c0'}], occasion: 'Festa', type: 'Longo', description: 'Vestido de cetim brilhante para ocasiões especiais.' },
  { id: 8, name: 'Vestido Jeans', category: 'Vestidos', price: 139.90, sale_price: 109.90, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600'], is_new: false, is_promotion: true, is_featured: false, sizes: ['PP','P','M','G','GG'], colors: [{name:'Azul',hex:'#3498db'}], occasion: 'Casual', type: 'Curto', description: 'Vestido jeans confortável e estiloso.' },
  { id: 9, name: 'Vestido Boho Chic', category: 'Vestidos', price: 199.90, sale_price: null, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['P','M','G'], colors: [{name:'Terracota',hex:'#e2725b'},{name:'Mostarda',hex:'#e1ad01'}], occasion: 'Casual', type: 'Longo', description: 'Vestido boho chic com estampa étnica.' },
  { id: 10, name: 'Vestido Tubinho', category: 'Vestidos', price: 179.90, sale_price: null, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600'], is_new: false, is_promotion: false, is_featured: true, sizes: ['PP','P','M','G'], colors: [{name:'Preto',hex:'#000000'},{name:'Vermelho',hex:'#dc143c'}], occasion: 'Trabalho', type: 'Curto', description: 'Vestido tubinho clássico e elegante.' },
  { id: 11, name: 'Vestido Godê', category: 'Vestidos', price: 189.90, sale_price: 149.90, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400', images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600'], is_new: false, is_promotion: true, is_featured: false, sizes: ['P','M','G','GG'], colors: [{name:'Rosa',hex:'#c97b8e'},{name:'Lilás',hex:'#c8a2c8'}], occasion: 'Festa', type: 'Midi', description: 'Vestido godê com saia rodada e feminina.' },
  { id: 12, name: 'Vestido Ciganinha', category: 'Vestidos', price: 149.90, sale_price: null, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400', images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['PP','P','M','G'], colors: [{name:'Branco',hex:'#ffffff'},{name:'Azul',hex:'#3498db'}], occasion: 'Casual', type: 'Curto', description: 'Vestido ciganinha romântico e delicado.' },
  { id: 13, name: 'Blusa Seda Elegante', category: 'Blusas', price: 129.90, sale_price: null, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400', images: ['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600','https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600'], is_new: true, is_promotion: false, is_featured: true, sizes: ['P','M','G'], colors: [{name:'Branco',hex:'#ffffff'},{name:'Preto',hex:'#000000'}], occasion: 'Trabalho', type: 'Social', description: 'Blusa de seda com caimento impecável, ideal para o ambiente corporativo.' },
  { id: 14, name: 'Blusa Tricot Confort', category: 'Blusas', price: 99.90, sale_price: 79.90, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400', images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600'], is_new: false, is_promotion: true, is_featured: false, sizes: ['P','M','G','GG'], colors: [{name:'Branco',hex:'#ffffff'},{name:'Rosa',hex:'#c97b8e'}], occasion: 'Casual', type: 'Esportivo', description: 'Blusa de tricot super confortável para o dia a dia.' },
  { id: 15, name: 'Blusa Cropped', category: 'Blusas', price: 79.90, sale_price: null, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400', images: ['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['PP','P','M','G'], colors: [{name:'Preto',hex:'#000000'},{name:'Branco',hex:'#ffffff'},{name:'Rosa',hex:'#c97b8e'}], occasion: 'Casual', type: 'Curto', description: 'Blusa cropped moderna e jovem.' },
  { id: 16, name: 'Blusa Alfaiataria', category: 'Blusas', price: 149.90, sale_price: 119.90, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400', images: ['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600'], is_new: false, is_promotion: true, is_featured: true, sizes: ['P','M','G','GG'], colors: [{name:'Branco',hex:'#ffffff'},{name:'Azul',hex:'#3498db'}], occasion: 'Trabalho', type: 'Social', description: 'Blusa de alfaiataria com corte estruturado.' },
  { id: 17, name: 'Blusa Renda', category: 'Blusas', price: 119.90, sale_price: null, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400', images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600'], is_new: false, is_promotion: false, is_featured: false, sizes: ['P','M','G'], colors: [{name:'Branco',hex:'#ffffff'},{name:'Preto',hex:'#000000'}], occasion: 'Festa', type: 'Social', description: 'Blusa de renda delicada e feminina.' },
  { id: 18, name: 'Blusa Ciganinha', category: 'Blusas', price: 89.90, sale_price: null, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400', images: ['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['PP','P','M','G','GG'], colors: [{name:'Rosa',hex:'#c97b8e'},{name:'Amarelo',hex:'#f39c12'}], occasion: 'Casual', type: 'Curto', description: 'Blusa ciganinha romântica e leve.' },
  { id: 19, name: 'Blusa Regata', category: 'Blusas', price: 59.90, sale_price: 49.90, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400', images: ['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600'], is_new: false, is_promotion: true, is_featured: false, sizes: ['P','M','G','GG'], colors: [{name:'Branco',hex:'#ffffff'},{name:'Preto',hex:'#000000'},{name:'Cinza',hex:'#808080'}], occasion: 'Casual', type: 'Curto', description: 'Blusa regata básica e versátil.' },
  { id: 20, name: 'Blusa Manga Bufante', category: 'Blusas', price: 139.90, sale_price: null, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400', images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600'], is_new: true, is_promotion: false, is_featured: true, sizes: ['P','M','G'], colors: [{name:'Rosa',hex:'#c97b8e'},{name:'Verde',hex:'#27ae60'}], occasion: 'Festa', type: 'Social', description: 'Blusa com manga bufante tendência.' },
  { id: 21, name: 'Blusa Satin', category: 'Blusas', price: 109.90, sale_price: null, image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400', images: ['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600'], is_new: false, is_promotion: false, is_featured: false, sizes: ['PP','P','M','G'], colors: [{name:'Champagne',hex:'#f7e7ce'},{name:'Preto',hex:'#000000'}], occasion: 'Festa', type: 'Social', description: 'Blusa de satin com brilho sutil.' },
  { id: 22, name: 'Blusa Camiseta', category: 'Blusas', price: 69.90, sale_price: 54.90, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400', images: ['https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600'], is_new: false, is_promotion: true, is_featured: false, sizes: ['P','M','G','GG'], colors: [{name:'Branco',hex:'#ffffff'},{name:'Preto',hex:'#000000'},{name:'Rosa',hex:'#c97b8e'}], occasion: 'Casual', type: 'Curto', description: 'Blusa camiseta básica de algodão.' },
  { id: 23, name: 'Calça Alfaiataria', category: 'Calcas', price: 159.90, sale_price: 119.90, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600','https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600'], is_new: false, is_promotion: true, is_featured: true, sizes: ['P','M','G','GG'], colors: [{name:'Preto',hex:'#000000'},{name:'Branco',hex:'#ffffff'}], occasion: 'Trabalho', type: 'Social', description: 'Calça de alfaiataria com corte reto, perfeita para o dia a dia no trabalho.' },
  { id: 24, name: 'Calça Jeans Skinny', category: 'Calcas', price: 149.90, sale_price: null, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600'], is_new: false, is_promotion: false, is_featured: false, sizes: ['PP','P','M','G'], colors: [{name:'Azul',hex:'#3498db'},{name:'Preto',hex:'#000000'}], occasion: 'Casual', type: 'Curto', description: 'Calça jeans skinny com elastano para maior conforto.' },
  { id: 25, name: 'Calça Wide Leg', category: 'Calcas', price: 169.90, sale_price: null, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600'], is_new: true, is_promotion: false, is_featured: true, sizes: ['P','M','G','GG'], colors: [{name:'Bege',hex:'#f5f5dc'},{name:'Preto',hex:'#000000'}], occasion: 'Trabalho', type: 'Social', description: 'Calça wide leg elegante e confortável.' },
  { id: 26, name: 'Calça Cargo', category: 'Calcas', price: 139.90, sale_price: 109.90, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600'], is_new: false, is_promotion: true, is_featured: false, sizes: ['P','M','G'], colors: [{name:'Verde',hex:'#27ae60'},{name:'Preto',hex:'#000000'}], occasion: 'Casual', type: 'Esportivo', description: 'Calça cargo estilo militar com bolsos.' },
  { id: 27, name: 'Calça Legging', category: 'Calcas', price: 89.90, sale_price: null, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['PP','P','M','G','GG'], colors: [{name:'Preto',hex:'#000000'},{name:'Cinza',hex:'#808080'}], occasion: 'Casual', type: 'Esportivo', description: 'Calça legging confortável para treinos.' },
  { id: 28, name: 'Calça Saruel', category: 'Calcas', price: 119.90, sale_price: null, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600'], is_new: false, is_promotion: false, is_featured: false, sizes: ['P','M','G'], colors: [{name:'Terracota',hex:'#e2725b'},{name:'Mostarda',hex:'#e1ad01'}], occasion: 'Casual', type: 'Curto', description: 'Calça saruel confortável e estilosa.' },
  { id: 29, name: 'Calça Pantacourt', category: 'Calcas', price: 129.90, sale_price: 99.90, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600'], is_new: false, is_promotion: true, is_featured: false, sizes: ['P','M','G','GG'], colors: [{name:'Azul',hex:'#3498db'},{name:'Branco',hex:'#ffffff'}], occasion: 'Casual', type: 'Curto', description: 'Calça pantacourt fresca para o verão.' },
  { id: 30, name: 'Calça Jeans Mom', category: 'Calcas', price: 159.90, sale_price: null, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600'], is_new: true, is_promotion: false, is_featured: true, sizes: ['PP','P','M','G'], colors: [{name:'Azul',hex:'#3498db'}], occasion: 'Casual', type: 'Curto', description: 'Calça jeans mom fit retrô.' },
  { id: 31, name: 'Saia Midi Plissada', category: 'Saias', price: 139.90, sale_price: null, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400', images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['PP','P','M','G'], colors: [{name:'Rosa',hex:'#c97b8e'},{name:'Verde',hex:'#27ae60'}], occasion: 'Festa', type: 'Curto', description: 'Saia midi plissada com movimento elegante, ideal para eventos especiais.' },
  { id: 32, name: 'Saia Jeans Casual', category: 'Saias', price: 119.90, sale_price: 89.90, image: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=400', images: ['https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600'], is_new: false, is_promotion: true, is_featured: false, sizes: ['P','M','G'], colors: [{name:'Azul',hex:'#3498db'}], occasion: 'Casual', type: 'Curto', description: 'Saia jeans casual para looks despojados.' },
  { id: 33, name: 'Saia Lápis', category: 'Saias', price: 129.90, sale_price: null, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400', images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600'], is_new: false, is_promotion: false, is_featured: true, sizes: ['P','M','G','GG'], colors: [{name:'Preto',hex:'#000000'},{name:'Vinho',hex:'#722f37'}], occasion: 'Trabalho', type: 'Social', description: 'Saia lápis clássica e elegante.' },
  { id: 34, name: 'Saia Godê', category: 'Saias', price: 149.90, sale_price: 119.90, image: 'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=400', images: ['https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=600'], is_new: false, is_promotion: true, is_featured: false, sizes: ['PP','P','M','G'], colors: [{name:'Rosa',hex:'#c97b8e'},{name:'Azul',hex:'#3498db'}], occasion: 'Festa', type: 'Curto', description: 'Saia godê rodada e feminina.' },
  { id: 35, name: 'Saia Longa', category: 'Saias', price: 159.90, sale_price: null, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400', images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['P','M','G'], colors: [{name:'Bege',hex:'#f5f5dc'},{name:'Preto',hex:'#000000'}], occasion: 'Casual', type: 'Longo', description: 'Saia longa fluida e confortável.' },
  { id: 36, name: 'Conjunto Alfaiataria', category: 'Conjuntos', price: 289.90, sale_price: 229.90, image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400', images: ['https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600'], is_new: false, is_promotion: true, is_featured: true, sizes: ['P','M','G'], colors: [{name:'Preto',hex:'#000000'}], occasion: 'Trabalho', type: 'Social', description: 'Conjunto de alfaiataria completo, blazer e calça com corte moderno.' },
  { id: 37, name: 'Conjunto Fitness', category: 'Conjuntos', price: 179.90, sale_price: null, image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400', images: ['https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['P','M','G'], colors: [{name:'Preto',hex:'#000000'},{name:'Rosa',hex:'#c97b8e'}], occasion: 'Casual', type: 'Esportivo', description: 'Conjunto fitness top e legging para treinos.' },
  { id: 38, name: 'Conjunto Moletom', category: 'Conjuntos', price: 199.90, sale_price: 159.90, image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400', images: ['https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600'], is_new: false, is_promotion: true, is_featured: false, sizes: ['P','M','G','GG'], colors: [{name:'Cinza',hex:'#808080'},{name:'Rosa',hex:'#c97b8e'}], occasion: 'Casual', type: 'Esportivo', description: 'Conjunto de moletom confortável.' },
  { id: 39, name: 'Bolsa Couro Natural', category: 'Acessorios', price: 199.90, sale_price: null, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['U'], colors: [{name:'Amarelo',hex:'#f39c12'}], occasion: 'Casual', type: 'Social', description: 'Bolsa de couro natural com design atemporal e acabamento premium.' },
  { id: 40, name: 'Colar Dourado Delicado', category: 'Acessorios', price: 89.90, sale_price: null, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600'], is_new: true, is_promotion: false, is_featured: true, sizes: ['U'], colors: [{name:'Amarelo',hex:'#f39c12'}], occasion: 'Festa', type: 'Social', description: 'Colar dourado delicado para complementar seu look.' },
  { id: 41, name: 'Brinco Argola', category: 'Acessorios', price: 59.90, sale_price: 44.90, image: 'https://images.unsplash.com/photo-1535632056230-2f619c6816c2?w=400', images: ['https://images.unsplash.com/photo-1535632056230-2f619c6816c2?w=600'], is_new: false, is_promotion: true, is_featured: false, sizes: ['U'], colors: [{name:'Dourado',hex:'#ffd700'},{name:'Prata',hex:'#c0c0c0'}], occasion: 'Festa', type: 'Social', description: 'Brinco argola clássico e versátil.' },
  { id: 42, name: 'Cinto Fino', category: 'Acessorios', price: 49.90, sale_price: null, image: 'https://images.unsplash.com/photo-1553062407-6f7a1c3b0c54?w=400', images: ['https://images.unsplash.com/photo-1553062407-6f7a1c3b0c54?w=600'], is_new: false, is_promotion: false, is_featured: false, sizes: ['P','M','G'], colors: [{name:'Preto',hex:'#000000'},{name:'Marrom',hex:'#8b4513'}], occasion: 'Trabalho', type: 'Social', description: 'Cinto fino para marcar a cintura.' },
  { id: 43, name: 'Lenço Seda', category: 'Acessorios', price: 79.90, sale_price: null, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600'], is_new: true, is_promotion: false, is_featured: false, sizes: ['U'], colors: [{name:'Rosa',hex:'#c97b8e'},{name:'Azul',hex:'#3498db'}], occasion: 'Trabalho', type: 'Social', description: 'Lenço de seda para complementar o visual.' }
];

// ESTADO
let cart = JSON.parse(localStorage.getItem('floratta_cart') || '[]');
let favorites = JSON.parse(localStorage.getItem('floratta_favorites') || '[]');
let orders = JSON.parse(localStorage.getItem('floratta_orders') || '[]');
let currentPage = 'home';
let currentFilters = { 
  category: null, 
  sizes: [], 
  colors: [], 
  occasions: [], 
  maxPrice: 500, 
  search: null, 
  promoOnly: false,
  sort: 'newest'
};

// CARROSSEL
let currentSlide = 0;
let carouselInterval;
const SLIDE_DURATION = 5000;

function initCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('hero-dots');
  if (!dotsContainer || slides.length === 0) return;
  
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = i === 0 ? 'active' : '';
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });
  
  startAutoPlay();
}

function showSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots button');
  if (slides.length === 0) return;
  
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
  resetAutoPlay();
}

function goToSlide(index) {
  showSlide(index);
  resetAutoPlay();
}

function startAutoPlay() {
  stopAutoPlay();
  carouselInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, SLIDE_DURATION);
}

function stopAutoPlay() {
  if (carouselInterval) clearInterval(carouselInterval);
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// UTILIDADES
function fmt(p) { return 'R$ ' + parseFloat(p).toFixed(2).replace('.', ','); }

function notify(msg, type = 'success') {
  const n = document.getElementById('notification');
  if (!n) return;
  n.textContent = msg;
  n.className = 'show ' + type;
  setTimeout(() => n.className = '', 2500);
}

function saveCart() { localStorage.setItem('floratta_cart', JSON.stringify(cart)); updateCounts(); }
function saveFavs() { localStorage.setItem('floratta_favorites', JSON.stringify(favorites)); updateCounts(); }
function saveOrders() { localStorage.setItem('floratta_orders', JSON.stringify(orders)); }

function updateCounts() {
  const cartBadge = document.getElementById('cart-count');
  const favBadge = document.getElementById('fav-count');
  if (cartBadge) cartBadge.textContent = cart.length;
  if (favBadge) favBadge.textContent = favorites.length;
}

// NAVEGAÇÃO
function showPage(page) {
  document.querySelectorAll('[id^="page-"]').forEach(p => p.style.display = 'none');
  const el = document.getElementById('page-' + page);
  if (el) el.style.display = 'block';
  currentPage = page;
  window.scrollTo(0, 0);
  
  if (page === 'carrinho') renderCart();
  if (page === 'favoritos') renderFavs();
  if (page === 'pedidos') renderOrders();
}

function goHome() {
  currentFilters = { category: null, sizes: [], colors: [], occasions: [], maxPrice: 500, search: null, promoOnly: false, sort: 'newest' };
  document.getElementById('shop-title').textContent = 'Todos os Produtos';
  document.getElementById('shop-eyebrow').textContent = 'Catálogo completo';
  document.querySelectorAll('.main-nav a').forEach(l => l.classList.remove('active'));
  const homeLink = document.querySelector('.main-nav a[data-cat="all"]');
  if (homeLink) homeLink.classList.add('active');
  clearFilterCheckboxes();
  renderAllProducts();
  showPage('home');
  window.scrollTo(0, 0);
}

// FILTRO POR CATEGORIA (ABAS) - CORRIGIDO
function filterCategory(category, event) {
  if (event) event.preventDefault();
  
  currentFilters.category = category === 'all' ? null : category;
  currentFilters.sizes = [];
  currentFilters.colors = [];
  currentFilters.occasions = [];
  currentFilters.maxPrice = 500;
  currentFilters.promoOnly = false;
  
  clearFilterCheckboxes();
  
  document.querySelectorAll('.main-nav a').forEach(l => l.classList.remove('active'));
  const link = document.querySelector('.main-nav a[data-cat="' + category + '"]');
  if (link) link.classList.add('active');
  
  const title = document.getElementById('shop-title');
  const eyebrow = document.getElementById('shop-eyebrow');
  if (category === 'all') {
    title.textContent = 'Todos os Produtos';
    eyebrow.textContent = 'Catálogo completo';
  } else {
    title.textContent = category;
    eyebrow.textContent = 'Produtos da categoria ' + category;
  }
  
  renderAllProducts();
  showPage('home');
  setTimeout(() => {
    const shop = document.getElementById('shop-section');
    if (shop) shop.scrollIntoView({behavior:'smooth'});
  }, 100);
  
  return false;
}

function showPromotions() {
  currentFilters = { category: null, sizes: [], colors: [], occasions: [], maxPrice: 500, search: null, promoOnly: true, sort: 'newest' };
  document.getElementById('shop-title').textContent = 'Promoções';
  document.getElementById('shop-eyebrow').textContent = 'Ofertas especiais por tempo limitado';
  document.querySelectorAll('.main-nav a').forEach(l => l.classList.remove('active'));
  clearFilterCheckboxes();
  renderAllProducts();
  showPage('home');
  setTimeout(() => {
    const shop = document.getElementById('shop-section');
    if (shop) shop.scrollIntoView({behavior:'smooth'});
  }, 100);
  return false;
}

function clearFilterCheckboxes() {
  document.querySelectorAll('#size-filters input, #color-filters input, .filter-option input').forEach(cb => {
    cb.checked = false;
    cb.parentElement.classList.remove('checked');
  });
  document.querySelectorAll('.size-pill, .color-swatch').forEach(el => el.classList.remove('checked'));
  const priceRange = document.getElementById('price-range');
  if (priceRange) {
    priceRange.value = 500;
    const priceValue = document.getElementById('price-value');
    if (priceValue) priceValue.textContent = 'R$ 500';
  }
}

// FILTROS - CORRIGIDO E FUNCIONANDO
function applyFilters() {
  const sizeChecked = document.querySelectorAll('#size-filters input:checked');
  const colorChecked = document.querySelectorAll('#color-filters input:checked');
  const occChecked = document.querySelectorAll('.filter-option input:checked');
  const priceRange = document.getElementById('price-range');
  const sortSelect = document.getElementById('sort-select');
  
  currentFilters.sizes = Array.from(sizeChecked).map(cb => cb.value);
  currentFilters.colors = Array.from(colorChecked).map(cb => cb.value);
  currentFilters.occasions = Array.from(occChecked).map(cb => cb.value);
  currentFilters.maxPrice = priceRange ? parseFloat(priceRange.value) : 500;
  currentFilters.sort = sortSelect ? sortSelect.value : 'newest';
  
  // Atualizar visual dos checkboxes
  document.querySelectorAll('.size-pill').forEach(pill => {
    const checkbox = pill.querySelector('input');
    if (checkbox && checkbox.checked) {
      pill.classList.add('checked');
    } else {
      pill.classList.remove('checked');
    }
  });
  
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    const checkbox = swatch.querySelector('input');
    if (checkbox && checkbox.checked) {
      swatch.classList.add('checked');
    } else {
      swatch.classList.remove('checked');
    }
  });
  
  renderAllProducts();
  updateActiveFilters();
}

function clearFilters() {
  currentFilters = { category: null, sizes: [], colors: [], occasions: [], maxPrice: 500, search: null, promoOnly: false, sort: 'newest' };
  clearFilterCheckboxes();
  document.getElementById('shop-title').textContent = 'Todos os Produtos';
  document.getElementById('shop-eyebrow').textContent = 'Catálogo completo';
  document.querySelectorAll('.main-nav a').forEach(l => l.classList.remove('active'));
  const homeLink = document.querySelector('.main-nav a[data-cat="all"]');
  if (homeLink) homeLink.classList.add('active');
  renderAllProducts();
  updateActiveFilters();
}

function updateActiveFilters() {
  const container = document.getElementById('active-filters');
  if (!container) return;
  
  const chips = [];
  if (currentFilters.category) chips.push({label: currentFilters.category, type: 'category'});
  if (currentFilters.sizes && currentFilters.sizes.length) currentFilters.sizes.forEach(s => chips.push({label: 'Tam: ' + s, type: 'size', value: s}));
  if (currentFilters.colors && currentFilters.colors.length) currentFilters.colors.forEach(c => chips.push({label: c, type: 'color', value: c}));
  if (currentFilters.occasions && currentFilters.occasions.length) currentFilters.occasions.forEach(o => chips.push({label: o, type: 'occasion', value: o}));
  if (currentFilters.maxPrice && currentFilters.maxPrice < 500) chips.push({label: 'Até R$ ' + currentFilters.maxPrice, type: 'price'});
  
  container.innerHTML = chips.map(c => 
    '<span class="filter-chip">' + c.label + ' <button onclick="removeFilter(\'' + c.type + '\',\'' + (c.value || '') + '\')">×</button></span>'
  ).join('');
}

function removeFilter(type, value) {
  if (type === 'category') { 
    currentFilters.category = null; 
    document.querySelectorAll('.main-nav a').forEach(l => l.classList.remove('active'));
    const homeLink = document.querySelector('.main-nav a[data-cat="all"]');
    if (homeLink) homeLink.classList.add('active');
  }
  else if (type === 'size') { currentFilters.sizes = currentFilters.sizes.filter(s => s !== value); }
  else if (type === 'color') { currentFilters.colors = currentFilters.colors.filter(c => c !== value); }
  else if (type === 'occasion') { currentFilters.occasions = currentFilters.occasions.filter(o => o !== value); }
  else if (type === 'price') { 
    currentFilters.maxPrice = 500;
    const priceRange = document.getElementById('price-range');
    if (priceRange) priceRange.value = 500;
    const priceValue = document.getElementById('price-value');
    if (priceValue) priceValue.textContent = 'R$ 500';
  }
  renderAllProducts();
  updateActiveFilters();
}

function getFilteredProducts() {
  return products.filter(p => {
    // Filtro de categoria
    if (currentFilters.category && p.category !== currentFilters.category) return false;
    
    // Filtro de tamanhos
    if (currentFilters.sizes && currentFilters.sizes.length > 0) {
      if (!currentFilters.sizes.some(s => p.sizes.includes(s))) return false;
    }
    
    // Filtro de cores
    if (currentFilters.colors && currentFilters.colors.length > 0) {
      if (!currentFilters.colors.some(c => p.colors.find(pc => pc.name === c))) return false;
    }
    
    // Filtro de ocasiões
    if (currentFilters.occasions && currentFilters.occasions.length > 0) {
      if (!currentFilters.occasions.includes(p.occasion)) return false;
    }
    
    // Filtro de preço
    if (currentFilters.maxPrice && p.price > currentFilters.maxPrice) return false;
    
    // Filtro de busca
    if (currentFilters.search) {
      const s = currentFilters.search.toLowerCase();
      if (!p.name.toLowerCase().includes(s) && !p.category.toLowerCase().includes(s)) return false;
    }
    
    // Filtro de promoções
    if (currentFilters.promoOnly && !p.is_promotion) return false;
    
    return true;
  }).sort((a, b) => {
    const sort = currentFilters.sort || 'newest';
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'name') return a.name.localeCompare(b.name);
    return b.id - a.id; // newest
  });
}

// RENDERIZAR PRODUTOS
function productCard(p) {
  const price = p.sale_price || p.price;
  const disc = p.sale_price && p.sale_price < p.price;
  const isFav = favorites.includes(p.id);
  return '<div class="product-card">' +
    '<div class="product-image">' +
      '<img src="' + p.image + '" alt="' + p.name + '" onerror="this.style.background=\'var(--color-bg-pink)\'">' +
      '<div class="product-badges">' +
        (disc ? '<span class="product-badge sale">Promoção</span>' : '') +
        (p.is_new && !disc ? '<span class="product-badge new">Novo</span>' : '') +
      '</div>' +
      '<button class="product-favorite ' + (isFav ? 'active' : '') + '" onclick="toggleFav(' + p.id + ',event)" title="Favoritar">♥</button>' +
    '</div>' +
    '<div class="product-info">' +
      '<div class="product-category">' + p.category + '</div>' +
      '<h3 class="product-name">' + p.name + '</h3>' +
      '<div class="product-price">' +
        '<span class="price-current">' + fmt(price) + '</span>' +
        (disc ? '<span class="price-original">' + fmt(p.price) + '</span>' : '') +
      '</div>' +
    '</div>' +
    '<a href="#" class="product-link" onclick="openProduct(' + p.id + ');return false;"></a>' +
  '</div>';
}

function renderAllProducts() {
  const filtered = getFilteredProducts();
  const el = document.getElementById('all-products');
  const countEl = document.getElementById('result-count');
  
  if (countEl) countEl.textContent = filtered.length + ' produto(s) encontrado(s)';
  
  if (el) {
    if (filtered.length === 0) {
      el.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><h3>Nenhum produto encontrado</h3><p style="margin-top:10px">Tente ajustar os filtros ou limpar a seleção</p></div>';
    } else {
      el.innerHTML = filtered.map(productCard).join('');
    }
  }
}

function renderHomeSections() {
  const promo = document.getElementById('promo-products');
  const newP = document.getElementById('new-products');
  const feat = document.getElementById('featured-products');
  if (promo) promo.innerHTML = products.filter(p => p.is_promotion).slice(0,4).map(productCard).join('') || '<div class="empty-state" style="grid-column:1/-1"><p>Nenhuma promoção no momento</p></div>';
  if (newP) newP.innerHTML = products.filter(p => p.is_new).slice(0,4).map(productCard).join('') || '<div class="empty-state" style="grid-column:1/-1"><p>Nenhuma novidade no momento</p></div>';
  if (feat) feat.innerHTML = products.filter(p => p.is_featured).slice(0,4).map(productCard).join('') || '<div class="empty-state" style="grid-column:1/-1"><p>Nenhum destaque no momento</p></div>';
}

// DETALHE DO PRODUTO
let selectedSize = null, selectedColor = null, quantity = 1, currentImg = 0, currentProductImages = [];

function openProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  
  selectedSize = null;
  selectedColor = null;
  quantity = 1;
  currentImg = 0;
  currentProductImages = p.images || [p.image];
  
  const price = p.sale_price || p.price;
  const disc = p.sale_price && p.sale_price < p.price;
  
  document.getElementById('pdp-title').textContent = p.name;
  document.getElementById('pdp-breadcrumb').textContent = p.category + ' / ' + p.name;
  
  const detail = document.getElementById('product-detail');
  detail.innerHTML =
    '<div class="product-gallery">' +
      '<div class="gallery-main"><img id="main-img" src="' + currentProductImages[0] + '" alt="' + p.name + '"></div>' +
      (currentProductImages.length > 1 ? '<div class="gallery-thumbs">' + currentProductImages.map((img, i) =>
        '<img class="' + (i === 0 ? 'active' : '') + '" src="' + img + '" alt="" onclick="setImg(' + i + ')">'
      ).join('') + '</div>' : '') +
    '</div>' +
    '<div class="pdp-info">' +
      '<div class="product-category">' + p.category + '</div>' +
      '<h1>' + p.name + '</h1>' +
      '<div class="pdp-price">' +
        '<span class="price">' + fmt(price) + '</span>' +
        (disc ? '<span class="price--old">' + fmt(p.price) + '</span>' : '') +
      '</div>' +
      '<p style="color:var(--color-text-soft); margin-bottom:20px; line-height:1.7;">' + p.description + '</p>' +
      '<div class="option-block"><div class="option-block__label">Tamanho</div><div class="size-options">' +
        p.sizes.map(s => '<button class="size-btn" onclick="selSize(\'' + s + '\',this)">' + s + '</button>').join('') +
      '</div></div>' +
      '<div class="option-block"><div class="option-block__label">Cor</div><div class="color-options">' +
        p.colors.map(c => '<div class="color-btn" style="background:' + c.hex + '" onclick="selColor(\'' + c.name + '\',this)" title="' + c.name + '"></div>').join('') +
      '</div></div>' +
      '<div class="option-block"><div class="option-block__label">Quantidade</div><div class="qty-selector"><button onclick="chgQty(-1)">-</button><span id="qty">1</span><button onclick="chgQty(1)">+</button></div></div>' +
      '<div class="pdp-actions">' +
        '<button class="btn btn-primary" onclick="addCart(' + p.id + ')">Adicionar ao Carrinho</button>' +
        '<button class="btn btn-outline" onclick="buyNow(' + p.id + ')">Comprar Agora</button>' +
      '</div>' +
    '</div>';
  
  const related = document.getElementById('related-products');
  if (related) {
    const rels = products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
    related.innerHTML = rels.length ? rels.map(productCard).join('') : '<div class="empty-state" style="grid-column:1/-1"><p>Nenhum produto relacionado</p></div>';
  }
  
  showPage('produto');
}

function setImg(i) {
  currentImg = i;
  const main = document.getElementById('main-img');
  if (main && currentProductImages[i]) {
    main.style.opacity = '0';
    setTimeout(() => { main.src = currentProductImages[i]; main.style.opacity = '1'; }, 200);
  }
  document.querySelectorAll('.gallery-thumbs img').forEach((t, idx) => t.classList.toggle('active', idx === i));
}

function selSize(s, btn) {
  selectedSize = s;
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function selColor(c, btn) {
  selectedColor = c;
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

function chgQty(d) {
  quantity = Math.max(1, quantity + d);
  const el = document.getElementById('qty');
  if (el) el.textContent = quantity;
}

// CARRINHO
function addCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if (!selectedSize) { notify('Selecione um tamanho', 'error'); return; }
  if (!selectedColor) { notify('Selecione uma cor', 'error'); return; }
  cart.push({ id: Date.now(), productId: p.id, name: p.name, price: p.sale_price || p.price, size: selectedSize, color: selectedColor, quantity: quantity, image: p.image });
  saveCart();
  notify('Adicionado ao carrinho!');
}

function buyNow(id) {
  addCart(id);
  setTimeout(() => showPage('carrinho'), 500);
}

function renderCart() {
  const el = document.getElementById('cart-content');
  if (cart.length === 0) {
    el.innerHTML = '<div class="empty-state"><h3>Seu carrinho está vazio</h3><p style="margin:15px 0">Adicione produtos para continuar comprando</p><a href="#" class="btn btn-primary" onclick="goHome();return false;">Ver Produtos</a></div>';
    return;
  }
  const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  el.innerHTML =
    '<div class="cart-layout">' +
      '<div>' + cart.map((item, idx) =>
        '<div class="cart-item">' +
          '<img src="' + item.image + '" alt="' + item.name + '">' +
          '<div><div class="cart-item__name">' + item.name + '</div><div class="cart-item__meta">Tamanho: ' + item.size + ' | Cor: ' + item.color + '</div><div class="qty-selector"><button onclick="updateCartQty(' + idx + ', -1)">-</button><span>' + item.quantity + '</span><button onclick="updateCartQty(' + idx + ', 1)">+</button></div></div>' +
          '<div><div class="cart-item__price">' + fmt(item.price * item.quantity) + '</div><button class="cart-item__remove" onclick="removeFromCart(' + idx + ')">Remover</button></div>' +
        '</div>'
      ).join('') + '</div>' +
      '<div class="summary-card">' +
        '<h3>Resumo do Pedido</h3>' +
        '<div class="summary-row"><span>Subtotal</span><span>' + fmt(total) + '</span></div>' +
        '<div class="summary-row"><span>Frete</span><span style="color:var(--color-success)">Grátis</span></div>' +
        '<div class="summary-row total"><span>Total</span><span>' + fmt(total) + '</span></div>' +
        '<button class="btn btn-primary btn-block" onclick="checkout()" style="margin-top:15px">Finalizar Compra</button>' +
        '<button class="btn btn-outline btn-block" onclick="clearCart()" style="margin-top:10px">Limpar Carrinho</button>' +
      '</div>' +
    '</div>';
}

function updateCartQty(idx, delta) {
  cart[idx].quantity += delta;
  if (cart[idx].quantity < 1) cart.splice(idx, 1);
  saveCart();
  renderCart();
}

function removeFromCart(idx) {
  if (!confirm('Remover este item?')) return;
  cart.splice(idx, 1);
  saveCart();
  renderCart();
  notify('Item removido');
}

function clearCart() {
  if (!confirm('Limpar todo o carrinho?')) return;
  cart = [];
  saveCart();
  renderCart();
  notify('Carrinho limpo');
}

function checkout() {
  if (cart.length === 0) { notify('Carrinho vazio', 'error'); return; }
  const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const order = {
    id: 'ORD-' + Date.now(),
    date: new Date().toISOString(),
    items: [...cart],
    total: total,
    status: 'pending'
  };
  orders.unshift(order);
  saveOrders();
  cart = [];
  saveCart();
  notify('Pedido realizado com sucesso!');
  setTimeout(() => showPage('pedidos'), 1000);
}

// FAVORITOS
function toggleFav(id, event) {
  if (event) event.preventDefault();
  const idx = favorites.indexOf(id);
  if (idx > -1) {
    favorites.splice(idx, 1);
    notify('Removido dos favoritos', 'info');
  } else {
    favorites.push(id);
    notify('Adicionado aos favoritos');
  }
  saveFavs();
  renderAllProducts();
  renderHomeSections();
  if (currentPage === 'favoritos') renderFavs();
}

function renderFavs() {
  const el = document.getElementById('fav-content');
  const favProducts = products.filter(p => favorites.includes(p.id));
  if (favProducts.length === 0) {
    el.innerHTML = '<div class="empty-state"><h3>Nenhum favorito ainda</h3><p style="margin:15px 0">Você ainda não salvou nenhum produto</p><a href="#" class="btn btn-primary" onclick="goHome();return false;">Ver Produtos</a></div>';
    return;
  }
  el.innerHTML = '<div class="product-grid">' + favProducts.map(productCard).join('') + '</div>';
}

// PEDIDOS
function renderOrders() {
  const el = document.getElementById('orders-content');
  if (orders.length === 0) {
    el.innerHTML = '<div class="empty-state"><h3>Nenhum pedido ainda</h3><p style="margin:15px 0">Você ainda não fez nenhum pedido</p><a href="#" class="btn btn-primary" onclick="goHome();return false;">Fazer Compras</a></div>';
    return;
  }
  const statusLabels = { pending: 'Pendente', shipped: 'Enviado', completed: 'Concluído', cancelled: 'Cancelado' };
  el.innerHTML = orders.map(o =>
    '<div class="order-card">' +
      '<div class="order-card__head">' +
        '<div><div class="order-id">Pedido ' + o.id + '</div><div class="order-date">' + new Date(o.date).toLocaleDateString('pt-BR') + ' às ' + new Date(o.date).toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'}) + '</div></div>' +
        '<span class="status-badge status-' + o.status + '">' + (statusLabels[o.status] || o.status) + '</span>' +
      '</div>' +
      '<div>' + o.items.map(i =>
        '<div style="display:flex;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--color-border)">' +
          '<img src="' + i.image + '" alt="' + i.name + '" style="width:60px;height:75px;object-fit:cover;border-radius:6px">' +
          '<div style="flex:1"><strong style="color:var(--color-text)">' + i.name + '</strong><br><small style="color:var(--color-text-muted)">Tamanho: ' + i.size + ' | Cor: ' + i.color + ' | Qtd: ' + i.quantity + '</small></div>' +
          '<div style="font-weight:600;color:var(--color-primary-dark)">' + fmt(i.price * i.quantity) + '</div>' +
        '</div>'
      ).join('') + '</div>' +
      '<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--color-border);display:flex;justify-content:space-between;align-items:center">' +
        '<span style="color:var(--color-text-soft)">Total do pedido:</span>' +
        '<span style="font-size:1.2rem;font-weight:700;color:var(--color-primary-dark)">' + fmt(o.total) + '</span>' +
      '</div>' +
    '</div>'
  ).join('');
}

// MOBILE NAV
function toggleMobileNav() {
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('open');
}

function toggleFilters() {
  const panel = document.getElementById('filters-panel');
  if (panel) panel.classList.toggle('open');
}

// PERFIL
function updateProfile(e) {
  e.preventDefault();
  notify('Perfil atualizado com sucesso!');
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  renderHomeSections();
  renderAllProducts();
  updateCounts();
  
  // Pausar carrossel no hover
  const carousel = document.getElementById('hero-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }
  
  // Range de preço
  const priceRange = document.getElementById('price-range');
  if (priceRange) {
    priceRange.addEventListener('input', (e) => {
      const val = e.target.value;
      const display = document.getElementById('price-value');
      if (display) display.textContent = 'R$ ' + val;
    });
  }
  
  // Busca
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    let t;
    searchInput.addEventListener('input', e => {
      clearTimeout(t);
      t = setTimeout(() => {
        const q = e.target.value.trim();
        currentFilters.search = q.length >= 2 ? q : null;
        renderAllProducts();
        if (q.length >= 2 && currentPage !== 'home') showPage('home');
      }, 400);
    });
  }
});