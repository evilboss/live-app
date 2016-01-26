let products = [
  {
    code: 'charisma',
    description: ["Normally, learning to incorporate all the external effects of Charisma would take years of intensive study. Instead, with The Charisma Installation System--anyone can be charismatic, quickly and with dramatic impact, in less than 3 short days."],
    name: 'Charisma Installation System',
    image: '/assets/images/charisma.png',
    price: {original: 249, discounted: 18675, discount: 25},
    commission: 25,
    level: ['Intermediate', 'Advanced'],
    info: ["http://www.charismainstallationsystem.com/VIP/"]
  },
  {
    code: 'attraction',
    description: ["Jason decided to decode the female brain, discover what consistently and predictably sparks sexual attraction in the female mind and the result was the Attraction God System, where he literally installs effortless, uncontrollable ATTRACTION POWERS inside your subconscious for you - so the hottest girls routinely want to hook up with you and the gorgeous, “classier women” want to do the same. And the best part? The entire installation process takes just one short day."],
    name: 'Attraction God System',
    image: '/assets/images/attraction-god.png',
    price: {original: 397, discounted: 29775, discount: 25},
    commission: 25,
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["http://www.attractiongodvip.com/EliteOnly/"]
  },
  {
    code: 'social-god',
    description: ["Jason hates the idea of “cold-approaching” women. It wastes time, rarely works on the 9’s and 10’s and you never meet any new people/make new friends doing it. So he found a better way: the Social God System. Regardless if you’re starting out with zero friends or just a few close buddies, the Social God System will have you the most connected man in your city in less than 4 weeks from today. You’ll have invitations for cool events pouring in nightly, tons of great friends and best of all, you’ll have the 8’s, 9’s and 10’s approaching you."],
    name: 'The Social God System',
    image: '/assets/images/social-god.png',
    price: {original: 297, discounted: 22275, discount: 25},
    commission: 25,
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["http://socialgodvip.com/SocialGod/"]
  },
  {
    code: 'digital-millionaire',
    description: ["Go behind the scenes of Jason’s multiple 7-figure online business, and see exactly how the entire thing was built from scratch in less than a year, with no money, no email list, and zero “tech” skills. Create the lifestyle of  your dreams, supported by a tightly-run, highly-personalized online business that throws off gobs of cash every month like clockwork."],
    name: 'The Digital Millionaire System',
    image: '/assets/images/digital-millionaire.png',
    price: {original: 297, discounted: 22275, discount: 25},
    commission: 25,
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["http://www.themillionaireswitch.com/DigitalMillionaire/"]
  },
  {
    code: 'success',
    description: ["In December 2012, Jason had less than $6,000 to his name. One year later, he was a millionaire. What changed? He stopped paying attention to the self-help, personal development trainings out there, since they clearly didn’t work for so many people. He then spent hundreds of hours researching the most successful men on the planet himself, discovered the 6 Causes of Success in common with every great man, installed each of them into his own subconscious and from that point on, he watched as those 6 Causes literally forced the exact success he was after out of him. With the Success Installation System, you’ll get all 6 Causes of Success installed into your subconscious, in less than one short day, so success becomes not something you hope happens but instead becomes fucking inevitable for you, too."],
    name: 'The Success Installation System',
    image: '/assets/images/success-installation.png',
    price: {original: 397, discounted: 29775, discount: 25},
    commission: 25,
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["http://successinstallationsystem.com/AmbitiousEliteOnly/"]
  },
  {
    code: 'power-positioning-bundle',
    description: ["The Power Positioning System teaches you the exact, Higher-Status body positions that increase your Testosterone levels by up to 40%, uncontrollably attracts hot girls for you from a distance and commands unconscious respect from both men and women. Backed and verified by Harvard researchers.",
     "17 Moves That Blow her F*cking Mind is our best-selling sex program - if you’ve ever fucked a girl’s brains, even just one time, you *know* how good it makes *YOU* feel, doesn’t it? You feel nothing short of ALL POWERFUL, GOD-LIKE. Now I want you to imagine, just for a moment if you could feel that good, EVERY SINGLE DAY. That’s what THESE 17 MOVES I’ve perfected will do for you. Every time you take her to bed, you will blow her mind, using just one or two of these moves, and easily be the best sex she’s ever had, regardless of your size. Also shows you how to increase your stamina, so you choose when you cum."],
    name: 'The Complete Power Positioning Bundle',
    image: '/assets/images/complete-power-positioning.png',
    price: {original: 231, discounted: 17325, discount: 25},
    commission: 25,
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["http://jasoncapitalbodylanguagemastery.com/VIPOnly/", "http://www.17moves.com/"]
  },
  {
    code: 'carefree',
    description: ["The Carefree Installation System will show you how to NOT to give a fvck - and still get everything you want!  We're going to unleash you — give you the balls to just be who you are. Who you were meant to be."],
    name: 'The Carefree Installation System',
    image: '/assets/images/carefree-installation.png',
    price: {original: 399, discounted: 29925, discount: 25},
    commission: 25,
    level: ['Intermediate', 'Advanced'],
    info: ["http://carefreeinstallationsystem.com/EliteOnly/"]
  },
  {
    code: 'power-switch-bundle',
    description: ["The Power Switch System will show you how to RECLAIM your Masculine Power with women, so they pursue you, work for you and ache to please you.",
    "77 Ways To Make Her Want To F*ck You is possibly Jason’s most famous book, and will show you all 77 ways to make any girl want to fuck you, regardless of your age or bank account. Named the #1 Sexual Escalation Book in the world, by Dating Skills Review. Highly X-Rated intel, 18+ only.",
    "The Make Women Want You Platinum Edition is Jason’s premium, flagship program on how to attract and seduce the women you want. #1 Best-Seller for 3 years now."],
    name: 'The Complete Power Switch Bundle',
    image: '/assets/images/complete-power-switch.png',
    price: {original: 253, discounted: 18975, discount: 25},
    commission: 25,
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["hhttp://www.thepowerswitchsystem.com/vsl", "http://www.the77ways.com/PrivatePhoto", "http://www.makewomenwantyounow.com/sale.html"],
    rating: "R-18+"
  },
  {
    code: 'email-millionaire',
    description: ["Takes you behind the scenes of Jason’s famous Daily Newsletter. Discover the subtle psychology, persuasion and influence strategies that built an online empire, in less than a year. You’ll also get the tools needed for you to start writing your own daily newsletter that spits out cash, changes lives and makes you a celebrity in your industry."],
    name: 'Email Millionaire',
    image: '/assets/images/email-millionaire.png',
    price: {original: 499, discounted: 37435, discount: 25},
    commission: 25,
    level: ['Intermediate', 'Advanced'],
    info: ["http://www.themillionaireswitch.com/EmailMillionaire/"]
  },
  {
    code: 'enchilada',
    name: 'The JC Whole Enchilada Package',
    description: ["Every Jason Capital Life-­Changing Program ever released - except STATUS and Power Influence"],
    image: '/assets/images/enchilada.png',
    price: {original: 7786, discounted: 230000, discount: 71, saving: 5486},
    commission: 25,
    includes: ["charisma", "attraction", "social-god", 'digital-millionaire', "success", 'power-positioning-bundle',
      "carefree", 'power-switch-bundle', 'email-millionaire'],
    excludes: ["status", "power-influence"],
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["#"]
  },
  {
    code: 'status',
    description: ["STATUS is our premier, flagship training on Team Capital. It is done on a per-semester basis, with a Summer Semester, Fall Semester and Spring Semester. Students go through the training everyday for 42 days straight, and then graduate on Day 42."],
    name: 'STATUS',
    image: '/assets/images/status.png',
    price: {original: 997, discounted: 74775, discount: 25},
    commission: 25,
    level: ['Intermediate', 'Advanced'],
    info: ["http://jasoncapitalstatus.com/VIPFallSession/"],
    premium: true
  },
  {
    code: 'power-influence',
    description: ["Pre-release offer exclusive to Bad-Ass Mentor Retreat attendees only"],
    name: 'Power Influence - Pre-Sale Exclusive Offer!',
    image: '/assets/images/power-influence.png',
    price: {original: 1000, discounted: 70000, discount: 30},
    commission: 10,
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["#"],
    premium: true
  },
  {
    code: 'ticket-badass-retreat-may-2016',
    description: [""],
    name: 'Pre-­Sale Ticket - Badass Mentor Retreat May 2016',
    image: '/assets/images/pre-sale-ticket.png',
    price: {original: 297, discounted: 14700, discount: 50},
    commission: 25,
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["https://www.jasoncapitalsociety.com/BadAssMentorRetreat/"]
  },
  {
    code: 'friend-ticket-badass-retreat-may-2016',
    requires: ["ticket-badass-retreat-may-2016"],
    description: [""],
    name: 'Bring-a-Friend Ticket - Badass Mentor Retreat May 2016',
    image: '/assets/images/pre-sale-ticket.png',
    price: {original: 297, discounted: 9700, discount: 68},
    commission: 25,
    limit_quantity: 10,
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["https://www.jasoncapitalsociety.com/BadAssMentorRetreat/"]
  },
  {
    code: 'gift-70-laws-dating',
    name: "The 70 Laws of Dating",
    description: ["Free with your order"],
    image: "/assets/images/70-laws.png",
    price: {free:true},
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["#"]
  },
  {
    code: 'gift-success-with-hot-women',
    name: "Success With Hot Women",
    description: ["Free with your order"],
    image: "/assets/images/hot-women.png",
    price: {free:true},
    level: ['Beginner', 'Intermediate', 'Advanced'],
    info: ["#"]
  },
  {
    code: 'gift-vinny-chase',
    name: "Vinny Chase Formula",
    description: [""],
    image: "/assets/images/vinny-chase.png",
    price: {free:true},
    level: ['Beginner', 'Intermediate', 'Advanced'],
    pick_one: true,
    info: ["#"]
  },
  {
    code: 'gift-make-money-want-you',
    name: "Make Money Want You",
    description: [""],
    image: "/assets/images/make-money-you-want.png",
    price: {free:true},
    level: ['Beginner', 'Intermediate', 'Advanced'],
    pick_one: true,
    info: ["#"]
  },
  {
    code: 'gift-ice-cold',
    name: "Ice Cold",
    description: [""],
    image: "/assets/images/ice-cold.png",
    price: {free:true},
    level: ['Beginner', 'Intermediate', 'Advanced'],
    pick_one: true,
    info: ["#"]
  },
  {
    code: 'gift-get-hotter-women',
    name: "How To Get Hotter Women",
    description: ["JC's first book ever! written 2010!"],
    image: "/assets/images/hotter-women.png",
    price: {free:true},
    level: ['Beginner', 'Intermediate', 'Advanced'],
    pick_one: true,
    info: ["#"]
  },
  {
    code: 'gift-love-code',
    name: "The Love Code",
    description: [""],
    image: "/assets/images/love-code.png",
    price: {free:true},
    level: ['Beginner', 'Intermediate', 'Advanced'],
    pick_one: true,
    info: ["#"]
  },
  {
    code: 'gift-money-lines',
    name: "Money Lines",
    description: [""],
    image: "/assets/images/money-lines.png",
    price: {free:true},
    level: ['Beginner', 'Intermediate', 'Advanced'],
    pick_one: true,
    info: ["#"]
  }
];

let generateProducts = () => {
  let productsExist = _checkIfProductsExist(products.length);

  if (!productsExist) {
    _createProducts(products);
  }
};

let _checkIfProductsExist = (count) => {
  let productCount = Products.find().count();
  return productCount >= count;
};

let _createProducts = (products) => {
  for (let i = 0; i < products.length; i++) {
    let product = products[i],
      productExists = _checkIfProductExists(product.code);

    if (!productExists) {
      product.order = i+1;
      product.price.free = !!product.price.free;
      if (product.price.free) product.commission = 0;
      product.pick_one = !!product.pick_one;
      product.premium = !!product.premium;
      _createProduct(product);
    }
  }
};

let _checkIfProductExists = (code) => {
  return Products.findOne({'code': code});
};

let _createProduct = (product) => {
  console.dir(product);
  Products.insert(
    product
  );
};

Modules.server.generateProducts = generateProducts;
