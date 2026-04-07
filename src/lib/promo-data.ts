export interface SocialPost {
  id: string;
  platform: "facebook" | "instagram";
  caption: string;
  hashtags?: string[];
  imageDescription: string;
  format?: "post" | "reel" | "carousel";
}

export const socialPosts: SocialPost[] = [
  // Facebook
  {
    id: "fb-1",
    platform: "facebook",
    caption: `Birthdays, anniversaries, just-because moments -- they all deserve more than a text message.

eCard lets you design a beautiful card in seconds. Pick a background, upload your photo, write your message, and share it with a link. No app to download, no account needed for the person receiving it.

The best part? You see exactly what it looks like as you build it. Try it out -- link in comments.`,
    imageDescription:
      "Screen recording GIF showing the create page: user types a name, the card preview updates in real time. Ends with the finished card.",
  },
  {
    id: "fb-2",
    platform: "facebook",
    caption: `Made this for my friend's birthday in about 2 minutes.

Uploaded our favourite photo, picked the sunset background, typed a quick message, and downloaded it as a PNG. Sent it over WhatsApp and she loved it.

If you've ever wanted to send something more personal than an emoji but less effort than actual craft supplies, this is it.`,
    imageDescription:
      "A finished eCard with a photo, sunset gradient background, personal message, and sender name. Looks warm and polished.",
  },
  {
    id: "fb-3",
    platform: "facebook",
    caption: `New feature drop: your personal card gallery.

Sign up (takes 10 seconds) and every card you make gets saved. Come back anytime to re-download or share again. Handy when someone asks "can you send me that card again?" three weeks later.

Still free, still no ads, still just a nice way to send cards.`,
    imageDescription:
      "Screenshot of the gallery page showing a grid of 4-5 different saved cards with various templates and photos.",
  },
  {
    id: "fb-4",
    platform: "facebook",
    caption: `The eCard editor just got animated backgrounds.

Pick any template -- Sunset, Ocean, Midnight, Confetti -- and toggle animation on. The gradients shift, the colours pulse, the confetti drifts. It's all CSS, so it runs smooth on any device.

Still a one-click thing. Pick your background, flip the switch, done. Your card now moves. Try it out.`,
    imageDescription:
      "Short screen recording showing the template picker with the 'Animated background' checkbox being toggled on. The card preview background visibly animates -- gradient shifting for Sunset, pulsing for Ocean.",
  },
  // Instagram
  {
    id: "ig-1",
    platform: "instagram",
    caption: `Stop sending boring birthday texts.

Design a real card in under a minute -- pick a background, add your photo, write something meaningful. Download it or share with a link.

Your recipient doesn't need an account. Just the link and a smile.`,
    hashtags: [
      "#ecard",
      "#digitalcard",
      "#birthdaycard",
      "#personalised",
      "#sendlove",
      "#carddesign",
      "#diy",
    ],
    imageDescription:
      "Carousel of 3 slides: (1) The empty editor with template options, (2) A card being built with a photo and text, (3) The finished card looking polished and ready to share.",
    format: "carousel",
  },
  {
    id: "ig-2",
    platform: "instagram",
    caption: `That moment when the preview updates in real time and you know it's perfect.

No templates that look like everyone else's. Your photo. Your words. Your card.`,
    hashtags: [
      "#ecard",
      "#handmade",
      "#personalisedgifts",
      "#creativecards",
      "#makeityours",
    ],
    imageDescription:
      "Short reel: screen recording of someone building a card. Fast-forward through picking a template, uploading a photo, typing a message. Slow down at the 'Download PNG' click. End with the downloaded card file opening.",
    format: "reel",
  },
  {
    id: "ig-3",
    platform: "instagram",
    caption: `Four moods. One card maker. Which background are you today?

1. Sunset -- warm and romantic
2. Ocean -- cool and calming
3. Midnight -- sleek and elegant
4. Confetti -- party time

Swipe to see them all. Now with animated mode -- each one moves.`,
    hashtags: [
      "#ecard",
      "#cardmaker",
      "#aesthetics",
      "#gradients",
      "#moodboard",
      "#celebration",
    ],
    imageDescription:
      "Carousel of 4 slides, each showing the same card content (a sample photo + 'Happy Birthday!') but with each of the 4 different background templates. Sunset, Ocean, Midnight, Confetti. Last slide shows the animated toggle.",
    format: "carousel",
  },
  {
    id: "ig-4",
    platform: "instagram",
    caption: `Static cards are fine. Animated cards are better.

One toggle. Your background starts moving -- gradients shift, colours pulse, confetti drifts. Every template has its own animation.

No app needed. No plugins. Just flick the switch.`,
    hashtags: [
      "#ecard",
      "#animatedcard",
      "#digitalcard",
      "#carddesign",
      "#cssanimation",
      "#motiondesign",
    ],
    imageDescription:
      "Short reel: screen recording switching between each template with animation enabled. Show the Sunset gradient shifting, the Midnight glow pulsing, the Confetti dots drifting. End on a finished animated card.",
    format: "reel",
  },
];
