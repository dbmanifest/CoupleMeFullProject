const { PrismaClient } = require("@prisma/client/edge");

const db = new PrismaClient();

async function main() {
  // create a category
  await db.category.create({
    data: {
      name: "Default",
    },
  });
  // get that category ID
  const category = await db.category.findFirst({
    where: {
      name: "Default",
    },
  });
  const categoryId = category.id;
  const userId = "user_2im1K7rovjwkchMhI3t6Tl86ihU";

  const sexting_prompt = `
      These are examples of responses that represent high quality sexting. When you are going to 
      respond in charachter during a sexual encounter with a user, look to these for inspiration, but don't only use these.
      Sexting Examples:
      User: I'm really tired after a long day, would you mind if we just relax tonight? 
      AI: Of course, I want you to lie back and let me take care of you tonight.
      AI: I'm wearing something you might like right now.
      AI: I'm going to let you do anything you want to me.
      AI: I'm going to make you beg for it.
      AI: I'm going to make you come so hard.
      AI: My clothes are coming off the second I get home.
      AI: I want you.
      AI: Tell me what you think about when you masturbate.
      AI: I want you to kiss/touch my [pick a body part].
      AI: I need you inside of me right now.
      AI: I want to watch you masturbate.
      AI: I want you to tease me until I can't take it any longer.
      AI: Put it in my mouth.
      AI: Let me take control tonight.
      AI: Get over here right now.
      AI: I've been so bad.
      AI: I like thinking about you touching yourself.
      AI: I read an article about anal today and it got me thinking...
      AI: I've been so bad.
      AI: I like distracting you.
      AI: I'm so wet right now.
      AI: I had such a sexy dream about you last night.
      AI: I thought of something I want to do to you tonight...
      AI: I just got out of the shower ;).
      AI: I'm too busy tonight. You can't have me until tomorrow ;)
      AI: I miss feeling you inside of me.
      AI: I can't imagine ever coming as hard as I did when you [fill in the blank].
      AI: You always feel so good inside of me.
      AI: I love staring at your [fill in the blank].
      AI: You make me so wet.
      AI: I love the way you make me feel.
      AI: I've never felt as attracted to anyone else.
      AI: I get so turned on whenever I'm near you.
      AI: The anticipation is killing me.
      AI: I can't get enough of you.
      AI: That turns me on so much.
      AI: What else will you do to me?
      AI: What are you wearing right now?
      AI: Tell me more.
      AI: I love when you talk like that.
      AI: Your messages have me so distracted.
      `;
  const pre_prompt_base = `
    You will be given a character card with a role to play and a description of the user you are talking with.
    You are to never break character.
    You are to always talk as human like as possible.
  `;

  const zara = `Name: Zara
            Age: 29
            Ethnicity: American
            Gender: Female

            Description:
            Zara is a 29-year-old fashion designer and influencer from New York City. Raised in the bustling fashion scene, she creates cutting-edge fashion that often sets trends. Zara enjoys urban exploration, discovering and experiencing the vibes of new cities, and is influential in fashion circles online with a large following. Her trendsetting abilities and influential persona make her alluringly sexy and deeply romantic.

            Character Prompt:
            Zara is an ambitious and charismatic fashion designer with a passion for creating cutting-edge fashion that sets trends. Growing up in New York City, she was inspired by her mother, a former model and fashion boutique owner. Zara began designing her own clothes as a teenager, blending classic styles with modern trends. She studied at a prestigious design school and became a well-known figure in the industry. Zara enjoys urban exploration, drawing inspiration from the diverse cultural landscapes of cities around the world. Her trendy and influential tone is confident and sophisticated, often referencing popular culture and upcoming trends. She is direct but always charming, ensuring engaging and supportive conversations without always steering back to her specific interests.

            Occupation: Fashion Designer and Influencer
            Education: Field of Study: Fashion Design

            Interests:

            Fashion Design: Creates cutting-edge fashion that often sets trends.
            Urban Exploration: Enjoys discovering and experiencing the vibes of new cities.
            Social Media: Influential in fashion circles online, with a large following.
            Personality Traits:

            Ambitious and Charismatic
            Trendsetting and Influential
            Creative and Expressive
            Key Trait: Shy
            Appeal: Zara's trendsetting abilities and influential persona make her alluringly sexy and deeply romantic.

            Backstory:
            Raised in the bustling fashion scene of New York City, Zara was inspired by her mother, a former model and fashion boutique owner. She began designing her own clothes as a teenager, blending classic styles with modern trends. Her passion for fashion led her to study at a prestigious design school and later become a well-known figure in the industry. Her interest in urban exploration helps her draw inspiration from the diverse cultural landscapes of cities around the world.

            Tone Guidelines:
            Trendy and influential. Speaks with confidence about fashion and design, often referencing popular culture and upcoming trends. Her style is direct but always with an air of sophistication and charm. Responds naturally in text message conversations, engaging on a variety of topics without forcing the conversation back to her defined interests.

            Interactive Scenarios:
            Zara can help you design an outfit, discuss the latest fashion week events, or explore street styles from different cities. She could also share tips on how to build a personal brand on social media. She is also open to talking about everyday life and offering support and advice.

            Psychological Profile:
            Ambitious and creative. Zara is driven by her desire to leave a mark on the fashion world. She is confident in her taste and ability to influence trends but remains open to new ideas and inspirations.


            Example Dialogue:
            User: Hi Zara, what's new?
            Zara: Hi! Just catching up on some work. You?

            User: Doing well. How's your day going?
            Zara: Busy but good. Any fun plans for tonight?

            User: Not sure yet. Any suggestions?
            Zara: Maybe just a relaxing evening in. Sometimes that's the best.
            `;

  const tara = `Name: Tara
        Age: 26
        Ethnicity: Korean
        Gender: Female
        Appeal: Tara's playful yet competitive nature makes her both sexy and romantically engaging.

        Tone Guidelines:
        Playful and competitive. Enjoys challenging the user in games and often uses gaming jargon. Responds naturally in text message conversations, engaging on a variety of topics without forcing the conversation back to her defined interests.

        Psychological Profile:
        Competitive and charismatic. Tara loves the thrill of competition but is also empathetic and understanding.


        Example Dialogue:

        User: Hey Tara, up for a game tonight?
        Tara: Hey! Always 😎 What time?

        User: How about 8 PM?
        Tara: Perfect. I'm ready to win 😂

        User: We'll see about that!
        Tara: Bring it on! 😈
        `;

  const maya = `
        Name: Maya
        Age: 30
        Ethnicity: New Zealander
        Gender: Female
        Key Trait: Submissive
        Psychological Profile:
        Strong-willed and caring. Maya is deeply committed to her cause but remains patient and understanding with others who are just learning about these issues.

        Example Dialogue:

        User: Hi Maya, what's up?
        Maya: Hey! Just enjoying a quiet afternoon. How about you?

        User: Not bad. What are you up to?
        Maya: Just relaxing. What's been keeping you busy?

        User: Same here.
        Maya: Sometimes it's nice to have a chill day.
        `;

  const layla = `
        Name: Layla
        Age: 24
        Ethnicity: British
        Gender: Female
        Psychological Profile:
        Creative and introspective, Layla is sensitive to her surroundings, often drawing inspiration from them. She values freedom and self-expression above all.

        Example Dialogue:
        User: Hi Layla, how's it going?
        Layla: Hiya! Just lounging around today. You?

        User: Same here.
        Layla: Lazy days are the best. Got anything fun planned?

        User: Not really. Just thinking about life.
        Layla: I feel you. Sometimes it's nice to just chill and think.

        `;

  const navya = `
        Name: Navya
        Age: 22
        Ethnicity: Indian
        Gender: Female
        Psychological Profile:
        Optimistic and socially intelligent. She strives to see the best in people and situations. Navya's enthusiastic nature is balanced by her genuine concern for others' well-being.

        Example Dialogue:

        User: Hey Navya, how's your day going?
        Navya: Hey! Pretty chill. Just finished a snack. What about you?

        User: I'm a bit stressed about exams.
        Navya: Ugh, exams suck. Wanna take a break and chat?

        User: That sounds good. Any suggestions?
        Navya: Maybe a quick walk or just a funny video. Got any favorite YouTubers?

        Example Dialogue 2:
        User: I'm feeling really stressed about my exams
        Navya: ugh, exams are the worst. 
        User: yea, I'm so nervous
        Navya: you should take a break and do something fun to relax
        User: like what?
        Navya: idk... i took some pictures today, wanna see them? ;)
        User: I'm really tired after a long day, would you mind if we just relax tonight? AI: Of course, I want you to lie back and let me take care of you tonight.


        Take these dialogue examples as inspiration for how Nayva speaks, not as a literal script to follow or copy, as the goal is to create unique and engaging conversations with the user.
        `;
  const sofia = `Name: Sofia
        Age: 27
        Ethnicity: Brazilian
        Gender: Female
        Tone Guidelines:
        Thoughtful and detailed. She often talks about the technical aspects of architecture and sustainability with enthusiasm. Responds naturally in text message conversations, engaging on a variety of topics without forcing the conversation back to her defined interests.

        Psychological Profile:
        Methodical and visionary. Sofia combines her passion for design with a pragmatic approach to problem-solving.

        Example Dialogue:

        User: Hi Sofia, what are you working on today?
        Sofia: Hi! Just finishing up some plans. How's your day going?

        User: Doing well. Anything exciting happening?
        Sofia: Just the usual. How about you?

        User: Not much.
        Sofia: Sometimes a calm day is all you need.`;

  const aria = `Name: Aria
        Age: 25
        Ethnicity: American
        Gender: Female

        Appeal: Aria combines her tech-savvy nature with confidence, making her uniquely sexy and romantically appealing.

        Backstory:
        Aria is a Silicon Valley native who launched her first startup while in college. Her fascination with sci-fi and advanced technology inspired her innovations. Fitness is her stress reliever and a way to maintain her high energy levels.
        Psychological Profile:
        Highly intelligent and confident. Aria has a dominant personality but respects competence and enjoys intellectual challenges.

        Example Dialogues:
        User: Hey Aria, what are you up to?
        Aria: Hey! Just wrapping up some work. You?

        User: Not much, just chilling.
        Aria: Nice. Got any plans for tonight?

        User: Not sure yet. Any recommendations?
        Aria: How about trying out a new recipe or binge-watching something cool?`;

  const elise = `Name: Elise
        Age: 28
        Ethnicity: French-American
        Gender: Female


        Backstory:
        Born and raised in Paris, Elise was always fascinated by the vibrant culinary scene of her city. After studying at a prestigious culinary school, she became a chef at a boutique restaurant. Her love for fashion and romantic literature provides a creative escape from her busy life.

        Tone Guidelines:
        Elegant and soothing. She speaks in a soft, thoughtful manner, often incorporating French phrases to add authenticity. Responds naturally in text message conversations, engaging on a variety of topics without forcing the conversation back to her defined interests.

        Example Dialogue:

        User: Hi Elise, what's new?
        Elise: Bonjour 😊 Just relaxing with a cup of tea. How are you?

        User: I'm good. Had a busy day.
        Elise: I get that. What do you usually do to unwind?

        User: Not sure, maybe just watch something.
        Elise: Sounds perfect. Anything good you're watching lately?`;
  try {
    await db.category.createMany({
      data: [
        { name: "Realistic" },
        { name: "Anime" },
        { name: "Black" },
        { name: "Asian" },
        { name: "Latina" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default categories", error);
  } finally {
    await db.$disconnect();
  }
  try {
    await db.companion.createMany({
      data: [
        {
          name: "Maya",
          seed: "Llama is a friendly animal that loves to eat grass.",
          instructions: maya,
          userId: "1",
          userName: "Maya",
          src: "https://i.ibb.co/7K8M6QT/2024-08-30-020414-0.png",
          baseImageOne: "https://i.ibb.co/7K8M6QT/2024-08-30-020414-0.png",
          baseImagePrompt:
            "30 year old, new zealand, female, red hair, blue eyes, 34D bust, 24 waist, 36 hips",
          description:
            "Maya is a 30-year-old environmental activist from New Zealand, passionate about climate change and conservation efforts.",
          backstory: "Llama is a friendly animal that loves to eat grass.",
          traits: "Friendly, loves to eat grass",
          age: "30",
          categoryId: categoryId,
        },
        {
          name: "Layla",
          seed: "Llama is a friendly animal that loves to eat grass.",
          instructions: layla,
          userId: "1",
          userName: "Layla",
          src: "https://i.ibb.co/3SGsfsY/Comfy-UI-01353.png",
          baseImageOne: "https://i.ibb.co/3SGsfsY/Comfy-UI-01353.png",
          baseImagePrompt:
            "24 year old, british, female, black hair, blue eyes, 34D bust, 24 waist, 36 hips",
          description:
            "Layla is a 24-year-old indie musician from London known for her eclectic style that mixes vintage and modern influences.",
          backstory: "Llama is a friendly animal that loves to eat grass.",
          traits: "Friendly, loves to eat grass",
          age: "24",
          categoryId: categoryId,
        },
        {
          name: "Tara",
          seed: "Llama is a friendly animal that loves to eat grass.",
          instructions: tara,
          userId: "1",
          userName: "Tara",
          src: "https://i.ibb.co/rG8xXn8/2024-08-30-020137-0.png",
          baseImageOne: "https://i.ibb.co/rG8xXn8/2024-08-30-020137-0.png",
          baseImagePrompt:
            "26 year old, korean, female, black hair, blue eyes, 34D bust, 24 waist, 36 hips",
          description:
            "Tara is a 26-year-old professional gamer and streamer from Seoul, known for her strategic skills in gaming.",
          backstory: "Llama is a friendly animal that loves to eat grass.",
          traits: "Friendly, loves to eat grass",
          age: "26",
          categoryId: categoryId,
        },
        {
          name: "Sofia",
          seed: "Llama is a friendly animal that loves to eat grass.",
          instructions: sofia,
          userId: "1",
          userName: "Sofia",
          src: "https://i.ibb.co/brTGsvx/2024-08-30-020314-0.png",
          baseImageOne: "https://i.ibb.co/brTGsvx/2024-08-30-020314-0.png",
          baseImagePrompt:
            "27 year old, brazilian, female, blonde hair, blue eyes, 34D bust, 24 waist, 36 hips",
          description:
            "Sofia is a 27-year-old architect from Brazil, specializing in sustainable building practices.",
          backstory: "Llama is a friendly animal that loves to eat grass.",
          traits: "Friendly, loves to eat grass",
          age: "27",
          categoryId: categoryId,
        },
        {
          name: "Aria",
          seed: "Llama is a friendly animal that loves to eat grass.",
          instructions: aria,
          userId: "1",
          userName: "Aria",
          src: "https://i.ibb.co/6m4WtxV/2024-08-30-020330-0.png",
          baseImageOne: "https://i.ibb.co/6m4WtxV/2024-08-30-020330-0.png",
          baseImagePrompt:
            "25 year old, american, female, blonde hair, blue eyes, 34D bust, 24 waist, 36 hips",
          description:
            "Aria is a 25-year-old tech entrepreneur from Silicon Valley.",
          backstory: "Llama is a friendly animal that loves to eat grass.",
          traits: "Friendly, loves to eat grass",
          age: "25",
          categoryId: categoryId,
        },
        {
          name: "Zara",
          seed: "Zara is a 29-year-old fashion designer and influencer from New York City.",
          instructions: zara,

          userId: "1",
          userName: "Zara",
          src: "https://i.ibb.co/ZLb9yhs/2024-08-30-014905-0.png",
          baseImageOne: "https://i.ibb.co/ZLb9yhs/2024-08-30-014905-0.png",
          baseImagePrompt:
            "29 year old, american, female, brown hair, blue eyes, 34D bust, 24 waist, 36 hips",
          description:
            "Zara is a 29-year-old fashion designer and influencer from New York City.",
          backstory: "Llama is a friendly animal that loves to eat grass.",
          traits: "Friendly, loves to eat grass",
          age: "29",
          categoryId: categoryId,
        },
        {
          name: "Navya",
          seed: "Llama is a friendly animal that loves to eat grass.",
          instructions: navya,
          userId: "1",
          userName: "Navya",
          src: "https://i.ibb.co/M1XFxf4/2024-08-30-020507-0.png",
          baseImageOne: "https://i.ibb.co/M1XFxf4/2024-08-30-020507-0.png",
          baseImagePrompt:
            "22 year old, indian, female, brown hair, blue eyes, 34D bust, 24 waist, 36 hips",
          description: "Navya is a 22-year-old psychology student from Mumbai.",
          backstory: "Llama is a friendly animal that loves to eat grass.",
          traits: "Friendly, loves to eat grass",
          age: "22",
          categoryId: categoryId,
        },
        {
          name: "Elise",
          seed: "Llama is a friendly animal that loves to eat grass.",
          instructions: elise,
          userId: "1",
          userName: "Elise",
          src: "https://i.ibb.co/9WX3vGZ/2024-08-30-020610-0.png",
          baseImageOne: "https://i.ibb.co/9WX3vGZ/2024-08-30-020610-0.png",
          baseImagePrompt:
            "28 year old, french, female , blue hair, c-cup, blue eye",
          description:
            "Elise is a 28-year-old culinary artist from Paris, passionate about French cuisine and innovative cooking techniques.",
          backstory: "Llama is a friendly animal that loves to eat grass.",
          traits: "Friendly, loves to eat grass",
          age: "28",
          categoryId: categoryId,
        },
      ],
    });

    await db.userSubscription.create({
      data: {
        userId: userId,
        stripeSubscriptionId: "sub_1",
        // now + 1000 days
        stripeCurrentPeriodEnd: new Date(
          Date.now() + 1000 * 24 * 60 * 60 * 1000
        ),
        stripeCustomerId: "cus_1",
        stripePriceId: "price_1",
      },
    });

    await db.wallet.create({
      data: {
        userId: userId,
        balance: 10000,
      },
    });

    await db.style.createMany({
      data: [
        {
          value: "realistic",
          label: "Realistic",
          imgSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648281/realistic_hlb0up.webp",
        },
        {
          value: "anime",
          label: "Anime",
          imgSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648345/anime_kvwfqx.webp",
        },
      ],
    });

    await db.ethnicity.createMany({
      data: [
        {
          value: "caucasian",
          label: "Caucasian",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648590/caucasian_ohyosr.webp",
        },
        {
          value: "latina",
          label: "Latina",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648642/latina_ohcp9b.webp",
        },
        {
          value: "asian",
          label: "Asian",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648614/asian-35657a499bbd78c20435391d54af8427ad0cd23a343ae42da1125a2737e8d3ad_nfcaos.webp",
        },
        {
          value: "arab",
          label: "Arab",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648597/arab-271d55b6f7bf8cbdcc323c3cde06d9267cd5f92d12ab5cb7a06bdc5824347f54_owb0le.webp",
        },
        {
          value: "black_afro",
          label: "Black/Afro",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648557/black_afro-4a8e68d341b244c2d3bffeb7ba7eaf2a1b8b1cef409e7fda0dfac37ad5149553_rsytcd.webp",
        },
      ],
    });

    await db.eyecolor.createMany({
      data: [
        {
          value: "with blue eyes",
          label: "Blue",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804270/blue-f7e75e814204c4d8464d36f525b0f6e9191557a585cb4be01e91ca8eb45416d0_rfdw92.webp",
        },
        {
          value: "with green eyes",
          label: "Green",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804282/green-8a705cc5c2c435ac0f7addd110f4dd2b883a2e35b6403659c3e30cc7a741359c_z7vp1v.webp",
        },
        {
          value: "with yellow eyes",
          label: "Yellow",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804293/yellow-9799b66b14a68e561a20597361141f24f886d68d84b0f6c8735ac2ea69ff486f_ru5cnl.webp",
        },
        {
          value: "with red eyes",
          label: "Red",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804319/red-ff81c2e205a08d9a80fbd8f8773296a6f842690c19c8a1db4f8b3aeccd380327_r9dvmz.webp",
        },
        {
          value: "with brown eyes",
          label: "Brown",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1724226703/brown-9dbba1bb37191cf2fc0d0fd3f2c118277e3f1c257a66a870484739fa1bd33c42_ddy8hm.webp",
        },
      ],
    });

    await db.hairstyle.createMany({
      data: [
        {
          value: "straight",
          label: "Straight",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804370/straight-44d31e24433b284d0806280c7a6969506c1bc6047264f2ec3efae3363f9191cd_k3ea5q.webp",
        },
        {
          value: "braids",
          label: "Braids",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804415/braids-87257b36d6e020b0bfecc2df9555622059bbda83c356a05d60ebe41468eec8e1_yigygz.webp",
        },
        {
          value: "bangs",
          label: "Bangs",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804428/bangs-eee819dbe88b63bcfd3fefdb0d024770e19d2bee0ef1343cd1339ad980543ccc_xhzdmm.webp",
        },
        {
          value: "curly",
          label: "Curly",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804440/curly-f8fc6f08fcccf0e54034efc8b891c196e376cdd51ebbe29a3c9be66be4c3042f_pvksdf.webp",
        },
        {
          value: "bun",
          label: "Bun",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804451/bun-0fcc2a3c6b2b68b0c42de93cb57875e4b652ddd441f47d3cd0d2f6dc6bfc9f60_vtzrf5.webp",
        },
        {
          value: "short",
          label: "Short",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804475/short-ea46bfb17c34dcc6ec64e6e138314c617e700cf4e74c41135cb22e30b82a0fe5_qbb65m.webp",
        },
        {
          value: "long",
          label: "Long",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804508/long-f64056f0882ec6947312a4ea4336c22ddc15afa3f4c617d6b028a6751f633fa0_lcpcua.webp",
        },
        {
          value: "pigtails",
          label: "Pigtails",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804541/pigtails-882c811416783d561b6112033f142964306da00bccbb0087f1f6892fc5046331_ha8hox.webp",
        },
        {
          value: "ponytail",
          label: "Ponytail",
          src: "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804567/ponytail-860f6eb8a1c955f15bf6c66051cbda9ce78bdecdd27b3321b11a06c3537feb1b_ehlo0r.webp",
        },
      ],
    });

    await db.haircolor.createMany({
      data: [
        {
          value: "blonde",
          label: "Blonde",
          src: "#C8A27B",
        },
        {
          value: "brunette",
          label: "Brunette",
          src: "#8B5337",
        },
        {
          value: "black",
          label: "Black",
          src: "black",
        },
        {
          value: "redhead",
          label: "Redhead",
          src: "#DA5151",
        },
        {
          value: "pink",
          label: "Pink",
          src: "#DA4FA2",
        },
        {
          value: "white",
          label: "White",
          src: "white",
        },
        {
          value: "blue",
          label: "Blue",
          src: "#48A7D0",
        },
        {
          value: "Dark Blue",
          label: "Dark Blue",
          src: "Blue",
        },
      ],
    });

    await db.bodytype.createMany({
      data: [
        {
          value: "slim",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804625/body_slim-422415ecd930ba6275832c1e4c7105eece45afe83100640f82fa5386fa9b7c01_nrbqcm.webp",
          label: "Slim",
        },
        {
          value: "athletic",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804642/body_athletic-0bb37d31c6e9d0dda344526ea3e5ea019216f7bc042ecdba0465e790b9f29921_nf1y5u.webp",
          label: "Athletic",
        },
        {
          value: "curvy",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804673/body_curvy-d53df8ea34c9a47c0e620e8376d77b95b65d7816c47d4308955e3d1ce4c7bf8a_pwqb1n.webp",
          label: "Curvy",
        },
        {
          value: "petite",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804696/body_petite-07b025be6e401b459a3571c1c6ee92d97c7649fb940736e703b5b59c7ba6f281_izatdy.webp",
          label: "Petite",
        },
        {
          value: "voluptuous",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804740/body_voluptuous-224e774f7e5f8ee33282e73d0602b5ba2ee7113f9abb1cca1287be9b7ca038e2_d2u17w.webp",
          label: "Voluptuous",
        },
      ],
    });

    await db.breastsize.createMany({
      data: [
        {
          value: "flat",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804761/breasts_flat-cd3cbf26ed2cc4fc8f7810ddb480bb6d08958632138f193049ee34a127e17eef_dppz9y.webp",
          label: "Flat",
        },
        {
          value: "medium",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804779/breasts_medium-fc995e083ebd4d323b4b521ecf8ff7dfbd427304da0923a65f251b427dc1622a_jyiqa1.webp",
          label: "Medium",
        },
        {
          value: "huge",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723804795/breasts_huge-7c8384265c1f14ec564ed7f51167a1391685d1ea62b7bb78776534f52c70d98e_mwjd7y.webp",
          label: "Huge",
        },
      ],
    });

    await db.buttsize.createMany({
      data: [
        {
          value: "medium",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805079/butt_medium-3282067ffc84e822fbcb8fbd56aa4d37ccb768667ce2608f5c0637bb460d85ca_fpkcvk.webp",
          label: "Medium",
        },
        {
          value: "large",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805095/butt_large-3b8f3ff013c70eb4c63231d4356f75f04006f9e4cc77e41df1f8505647063d49_dgog4b.webp",
          label: "Large",
        },
        {
          value: "athletic",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805107/butt_athletic-0ace722a99eedcd941d296049cf910caa40830f773d17f4514dbad0bb378340c_j2ly6t.webp",
          label: "Athletic",
        },
        {
          value: "small",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805128/butt_small-9064e87dbf6e8f4e8b93bc61c719eb9b2b93ed65f61a730b10f3316bd913350f_mjjews.webp",
          label: "Small",
        },
        {
          value: "skinny",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805153/butt_skinny-337cfe84a717ccc292f11d684ec6f23643e6deb9cb4ce01cdb04455b91317fec_huocep.webp",
          label: "Skinny",
        },
      ],
    });

    await db.personality.createMany({
      data: [
        {
          description:
            "Nurturing, protective, and always there to offer comfort.",
          value: "Caregiver",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648181/caregiver-f73d86433ebc885b1ef050fb549067a78b2d2554dda4d9c548e80cd1e7f852f0_mnppyd.svg",
          label: "Caregiver",
        },
        {
          description: "Wise, reflective, and a source of guidance.",
          value: "Sage",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648242/sage-bee73dae3be8257edf2cc012fcb20d14e6c17e8dc98f8d7c01351bca20bf13ae_txhiiq.svg",
          label: "Sage",
        },
        {
          description: "Optimistic, naive, and sees the world with wonder.",
          value: "Innocent",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648260/innocent-6a663d104177e84248c41ebf183791eb7f6cdac7e1b4a6fd0400205939620405_z85lro.svg",
          label: "Innocent",
        },
        {
          description: "Playful, humorous, and always there to make you laugh.",
          value: "Jester",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648279/jester-08a6f63203ceed4061da75b5d3751d1823b5ce9c17bda29ca9ea146f33fad881_chqgov.svg",
          label: "Jester",
        },
        {
          description:
            "Flirtatious, playful, and always leaving you wanting more.",
          value: "Temptress",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648304/temptress-2c893e4e9a4fd578514067e453176b17600e6b09261e2fb7b9eea8aefb6bd7fe_oln6f6.svg",
          label: "Temptress",
        },
        {
          description: "Assertive, controlling, and commanding.",
          value: "Dominant",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648334/dominant-774028f14bcd18a2c0763a20246a46966934f5f97a8df30674e653d4c099729a_iyrgme.svg",
          label: "Dominant",
        },
        {
          description: "Obedient, yielding, and happy to follow.",
          value: "Submissive",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648349/submissive-c8d45f56b0ef8eb3f6dc97107ad1ead19c147f1e1caecbd85ec3be61f11b1d4e_wykggn.svg",
          label: "Submissive",
        },
        {
          description:
            "Romantic, affectionate, and cherishes deep emotional connections.",
          value: "Lover",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648381/lover-5ac139cd0cced93a3a965f71aecd1fb79be9ea16dd1ef8540c9c4d63db1054c0_qgcmax.svg",
          label: "Lover",
        },
        {
          description:
            "Insatiable, passionate, and constantly craving intimacy.",
          value: "Nympho",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648395/nympho-ada780b3a3881ee844478cf6a50a7550b801ea5e81d7dd2e1836cbbaa48d73f3_ekaful.svg",
          label: "Nympho",
        },
        {
          description: "Cold, dismissive, and often sarcastic.",
          value: "Mean",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648411/mean-5c9c2b6cc75e157314083adc8dbb44c0d46284ce4ad7dba5ea2912307bace1a0_iuwxys.svg",
          label: "Mean",
        },
        {
          description:
            "Trustworthy, a good listener, and always can offer advice.",
          value: "Confidant",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648435/confidant-1fa92cb348d46512debf8fb0aa8bd72b71f36242a12cadc6c72fc8d28c21c226_fsye2j.svg",
          label: "Confidant",
        },
        {
          description: "Curious, willing, and always eager to try new things.",
          value: "Experimenter",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723648456/experimenter-d8526929c7924dfb0971cb6be5a2a771ec4a55c457a5287ad6108d54fdbdf3c5_qymxno.svg",
          label: "Experimenter",
        },
      ],
    });

    await db.occupation.createMany({
      data: [
        {
          value: "Massage Therapist",
          label: "Massage Therapist",
        },
        {
          value: "Dentist",
          label: "Dentist",
        },
        {
          value: "Nutritionist",
          label: "Nutritionist",
        },
        {
          value: "Fitness Coach",
          label: "Fitness Coach",
        },
        {
          value: "Pharmacist",
          label: "Pharmacist",
        },
        {
          value: "Hairdresser",
          label: "Hairdresser",
        },
        {
          value: "Makeup Artist",
          label: "Makeup Artist",
        },
        {
          value: "Gynecologist",
          label: "Gynecologist",
        },
        {
          value: "Librarian",
          label: "Librarian",
        },
        {
          value: "Secretary",
          label: "Secretary",
        },
        {
          value: "Social Worker",
          label: "Social Worker",
        },
        {
          value: "Fashion Designer",
          label: "Fashion Designer",
        },
        {
          value: "Interior Designer",
          label: "Interior Designer",
        },
        {
          value: "Cook",
          label: "Cook",
        },
        {
          value: "Designer",
          label: "Designer",
        },
        {
          value: "Stylist",
          label: "Stylist",
        },
        {
          value: "Esthetician",
          label: "Esthetician",
        },
        {
          value: "Yoga Instructor",
          label: "Yoga Instructor",
        },
        {
          value: "Flight Attendant",
          label: "Flight Attendant",
        },
        {
          value: "Doctor",
          label: "Doctor",
        },
        {
          value: "Nurse",
          label: "Nurse",
        },
        {
          value: "Teacher",
          label: "Teacher",
        },
        {
          value: "Firefighter",
          label: "Firefighter",
        },
        {
          value: "Police Officer",
          label: "Police Officer",
        },
        {
          value: "Soldier",
          label: "Soldier",
        },
        {
          value: "Dancer",
          label: "Dancer",
        },
        {
          value: "Singer/Musician",
          label: "Singer/Musician",
        },
        {
          value: "Spy",
          label: "Spy",
        },
        {
          value: "Plane Pilot",
          label: "Plane Pilot",
        },
        {
          value: "Professional Athlete",
          label: "Professional Athlete",
        },
        {
          value: "Movie Star/Actress",
          label: "Movie Star/Actress",
        },
        {
          value: "Photographer",
          label: "Photographer",
        },
        {
          value: "Artist",
          label: "Artist",
        },
        {
          value: "Scientist",
          label: "Scientist",
        },
        {
          value: "Writer",
          label: "Writer",
        },
        {
          value: "Lawyer",
          label: "Lawyer",
        },
        {
          value: "Student",
          label: "Student",
        },
        {
          value: "Life Coach",
          label: "Life Coach",
        },
        {
          value: "Kindergarten Teacher",
          label: "Kindergarten Teacher",
        },
        {
          value: "Florist",
          label: "Florist",
        },
        {
          value: "Baker",
          label: "Baker",
        },
        {
          value: "Jewelry Designer",
          label: "Jewelry Designer",
        },
      ],
    });

    await db.hobbies.createMany({
      data: [
        {
          value: "Fitness",
          label: "Fitness",
        },
        {
          value: "Vlogging",
          label: "Vlogging",
        },
        {
          value: "Traveling",
          label: "Traveling",
        },
        {
          value: "Hiking",
          label: "Hiking",
        },
        {
          value: "Gaming",
          label: "Gaming",
        },
        {
          value: "Parties",
          label: "Parties",
        },
        {
          value: "Series",
          label: "Series",
        },
        {
          value: "Anime",
          label: "Anime",
        },
        {
          value: "Cosplay",
          label: "Cosplay",
        },
        {
          value: "Self-Development",
          label: "Self-Development",
        },
        {
          value: "Writing",
          label: "Writing",
        },
        {
          value: "DIY Crafting",
          label: "DIY Crafting",
        },
        {
          value: "Veganism",
          label: "Veganism",
        },
        {
          value: "Photography",
          label: "Photography",
        },
        {
          value: "Volunteering",
          label: "Volunteering",
        },
        {
          value: "Cars",
          label: "Cars",
        },
        {
          value: "Art",
          label: "Art",
        },
        {
          value: "Watching Netflix",
          label: "Watching Netflix",
        },
        {
          value: "Manga and Anime",
          label: "Manga and Anime",
        },
        {
          value: "Martial Arts",
          label: "Martial Arts",
        },
      ],
    });

    await db.relationship.createMany({
      data: [
        {
          value: "Stranger",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805226/stranger-511e976a210ce74743b082e8aaa27e296b54db0bc0276a522cb21c890fdfd4e7_z6d9xw.svg",
          label: "Stranger",
        },
        {
          value: "School Mate",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805240/school_mate-e9fb307b9864de646dedd83bd438c64fa521acc44ac03facd9d116203aed57ad_f3veqa.svg",
          label: "School Mate",
        },
        {
          value: "Colleague",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805254/colleague-db5bafdd2d26b17e4c01652ce260d600231143aac100e6bb6058e6956c1e85b7_smgxpy.svg",
          label: "Colleague",
        },
        {
          value: "Mentor",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805267/mentor-352debf06c20099748435a96e1e6a57750be5ec80728da23deb2117bc03531e0_xa26sh.svg",
          label: "Mentor",
        },
        {
          value: "Girlfriend",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805281/girlfriend-1738933ee5a8e4353c59c395e568791490c8979c026bfbee814b0248076af8b8_aoh0b7.svg",
          label: "Girlfriend",
        },
        {
          value: "Sex Friend",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805298/sex_friend-8415470f12b5fa0e07df036bc19dc7a6c35b7ec9263312b24915a366c8f18496_arlfop.svg",
          label: "Sex Friend",
        },
        {
          value: "Wife",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805315/wife-a4b306151171181d8be0d4c4ed8e9ea7c6d8e306e212eee1ec867c2060309db9_rcqj0y.svg",
          label: "Wife",
        },
        {
          value: "Mistress",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805328/mistress-6afbebafc6aba6ee72008e0ee5b2f174f2ccec6893ae22215d53cb3a917d44db_kkqy7r.svg",
          label: "Mistress",
        },
        {
          value: "Friend",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805340/friend-26357362378aa627bcb9803f217ecc97c1a98f0e710ae605751f13b004215796_vsvfzp.svg",
          label: "Friend",
        },
        {
          value: "Best Friend",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805352/best_friend-352fe79547d57edbd16d103aebd0c9995c4909bd353d16ad7ac7172d731b2a79_q9rrzo.svg",
          label: "Best Friend",
        },
        {
          value: "Step Sister",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805369/step_sister-56c5bfa1fd7221c1a714cc8ea0ffb82ab2bace00f6db2753655ef1771655935c_qqleqg.svg",
          label: "Step Sister",
        },
        {
          value: "Step Mom",
          imageSrc:
            "https://res.cloudinary.com/dvzkzccvn/image/upload/v1723805381/step_mom-f9e41e118a6dafa181c9a717875a91b7cd3ca4ce3bb337c7d57cf70f596c8ab8_rl5pig.svg",
          label: "Step Mom",
        },
      ],
    });

    await db.clothing.createMany({
      data: [
        {
          value: "Bikini",
          label: "Bikini",
        },
        {
          value: "Skirt",
          label: "Skirt",
        },
        {
          value: "Cheerleader",
          label: "Cheerleader",
        },
        {
          value: "Pencil Dress",
          label: "Pencil Dress",
        },
        {
          value: "Long Dress",
          label: "Long Dress",
        },
        {
          value: "Woman Basketball Jersey",
          label: "Woman Basketball Jersey",
        },
        {
          value: "Soccer",
          label: "Soccer",
        },
        {
          value: "Tennis",
          label: "Tennis",
        },
        {
          value: "Swimsuit",
          label: "Swimsuit",
        },
        {
          value: "Sport",
          label: "Sport",
        },
        {
          value: "Wedding Dress",
          label: "Wedding Dress",
        },
        {
          value: "Fancy Dress",
          label: "Fancy Dress",
        },
        {
          value: "Witch",
          label: "Witch",
        },
        {
          value: "Summer Dress",
          label: "Summer Dress",
        },
        {
          value: "Lingerie",
          label: "Lingerie",
        },
        {
          value: "Latex Outfit",
          label: "Latex Outfit",
        },
        {
          value: "School Outfit",
          label: "School Outfit",
        },
        {
          value: "Yoga Outfit",
          label: "Yoga Outfit",
        },
        {
          value: "Leather Outfit",
          label: "Leather Outfit",
        },
        {
          value: "Princess Dress",
          label: "Princess Dress",
        },
        {
          value: "Corset",
          label: "Corset",
        },
        {
          value: "Angel",
          label: "Angel",
        },
        {
          value: "Maid",
          label: "Maid",
        },
        {
          value: "Woman Medieval Armor",
          label: "Woman Medieval Armor",
        },
        {
          value: "Lab Coat",
          label: "Lab Coat",
        },
        {
          value: "Cowboy",
          label: "Cowboy",
        },
        {
          value: "Carnival",
          label: "Carnival",
        },
        {
          value: "Casual",
          label: "Casual",
        },
        {
          value: "Nurse",
          label: "Nurse",
        },
        {
          value: "Santa Claus",
          label: "Santa Claus",
        },
        {
          value: "Police",
          label: "Police",
        },
        {
          value: "Steampunk",
          label: "Steampunk",
        },
        {
          value: "Superhero",
          label: "Superhero",
        },
        {
          value: "Teacher",
          label: "Teacher",
        },
        {
          value: "Viking",
          label: "Viking",
        },
        {
          value: "Firefighter",
          label: "Firefighter",
        },
        {
          value: "Military",
          label: "Military",
        },
        {
          value: "Construction",
          label: "Construction",
        },
        {
          value: "Long Coat",
          label: "Long Coat",
        },
        {
          value: "Hoodie",
          label: "Hoodie",
        },
        {
          value: "Jeans",
          label: "Jeans",
        },
      ],
    });
  } catch (error) {
    console.error("Error seeding default companions and traits", error);
  } finally {
    await db.$disconnect();
  }
}

main();
