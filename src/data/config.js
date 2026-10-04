// ALL personal content lives here. Lines starting with "#" render as BIG text.
// An array = lines shown together as one beat. {slam:[...]} = words that hit one by one.
// {photo:N} shows photos[N] softly. Put images in /public/photos and list them below.
export default {
  name: 'Umesh Mama',
  music: '/music.mp3', // drop your song at public/music.mp3
  hero: {
    date: 'OCTOBER 5, 1989',
    sub1: 'Something extraordinary fell from the sky.',
    name: 'UMESH MAMA',
    sub2: 'The meteor that landed in our family.',
  },
  photos: [
  { src: '/photos/1.jpeg', caption: 'Where it all began', tag: 'Childhood' },
  { src: '/photos/cricket.jpeg', caption: 'With Saanvi', tag: 'Saanvi' },
  { src: '/photos/3.jpeg', caption: 'Family, always', tag: 'Family' },
  { src: '/photos/4.jpeg', caption: 'With Diyanshi', tag: 'Diyanshi' },
  { src: '/photos/5.jpeg', caption: 'Recent days', tag: 'Recent' },
],
  sections: [
    { type: 'story', mood: 'plain', beats: [
      'Years later, the crater had become a home.',
      ['And then... somehow,', 'I became part of the story.'],
      '#And that\'s when things got interesting.',
      'We used to...',
      { slam: ['FIGHT.', 'SHOUT.', 'ARGUE.', 'ANNOY.'] },
      'Over the smallest things. Every single time.',
      'But somehow... five minutes later, we would be talking again like nothing happened.',
      'That\'s the strange thing about us.',
      '#We could fight like enemies... and still care about each other like family.',
    ]},
    { type: 'story', mood: 'cricket', beats: [
      '#And then came cricket.',
      ['If there was one thing capable of turning a peaceful day into a full-blown argument...', 'It was probably OUR cricket matches.'],
      { slam: ['OUT!', 'NOT OUT!', 'ONE RUN!', 'FOUR!', 'THAT WAS A CATCH!'], fast: true },
      'At the time, they were just arguments.',
      '#Now, they\'re some of the memories I wouldn\'t trade for anything.',
    ]},
    { type: 'story', mood: 'funny', beats: [
      'But Mama... I still have one serious complaint.',
      '#YOU AND MUNNA.',
      ['You used to go out...', 'Eat something...', 'Have fun...'],
      'And somehow...',
      '#FORGET TO TAKE ME.',
      '#EXCUSE ME???',
      'I was part of the family too!',
      ['Maybe I was angry.', 'Maybe I was jealous.', 'Maybe I just wanted to be included.'],
      'But somewhere underneath all those complaints was something much simpler...',
      '#I just wanted to be around you.',
    ]},
    { type: 'story', mood: 'dark', beats: [
      '#That\'s what makes our relationship special.',
      ['We never really needed to say...', 'I care about you.'],
      { photo: 0 },
      ['Because somehow...', 'It was always there.'],
      'Behind the arguments.', 'Behind the shouting.', 'Behind the cricket fights.', 'Behind the stupid complaints.',
      { photo: 2 },
      '#There was always a bond.',
      'A bond that never disappeared just because we had a fight.',
    ]},
    { type: 'gallery', title: 'Scenes from our story' },
    { type: 'story', mood: 'dark', beats: [
      '#Years passed...',
      'And suddenly, those little moments became memories.',
      ['The fights became stories.', 'The cricket arguments became things we laugh about.', 'The food outings became stories I can complain about forever.'],
      'And the person I used to fight with...',
      '#became someone I realize I am incredibly lucky to have in my life.',
    ]},
    { type: 'letter', teaser: 'A letter for you.', lines: [
      'Dear Umesh Mama,', "I don't know if I've ever properly told you this.", 'But thank you.',
      'Thank you for every laugh.', 'Every argument.', 'Every piece of advice.', 'Every stupid fight.', 'Every cricket battle.', 'Every memory.',
      'Even the times you annoyed me.', 'Especially those times.', 'Because all of them became a part of our story.',
      'And honestly...', "I wouldn't want our story any other way.",
      'It was never perfect.', 'It was never completely peaceful.', 'But it was ours.', "And that's what makes it special.",
    ], sign: 'Always yours' },
    { type: 'callback', beats: [
      'On October 5, 1989...', 'Something fell from the sky.', 'Nobody knew what it would become.',
      'Nobody knew how many memories it would create.', 'Nobody knew how many cricket arguments it would start.',
      "But I'm glad that meteor landed here.", 'Because somewhere along the way...', '#It became my Mama.',
    ]},
    { type: 'final', title: ['HAPPY BIRTHDAY,', 'UMESH MAMA ❤️'], beats: [
      'May life give you countless reasons to smile.', 'May you keep creating beautiful memories.',
      'May there always be cricket to argue about.', 'May there always be food to share.',
      'And may there always be people around you who love you...',
      'Even when they\'re fighting with you.', 'Especially when they\'re fighting with you.',
      ['Here\'s to another year.', 'Another chapter.', 'And many more memories.'],
    ], finale: '❤️ HAPPY BIRTHDAY MAMA ❤️' },
  ],
}
