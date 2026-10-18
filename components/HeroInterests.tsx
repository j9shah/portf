'use client';

import { useEffect, useState } from 'react';

export function HeroInterests({ phrases }: { phrases: readonly [string, ...string[]] }) {
  const [text, setText] = useState(phrases[0]);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: number | undefined;
    let phraseIndex = 0;
    let characterCount = phrases[0].length;
    let deleting = true;

    function tick() {
      const phrase = phrases[phraseIndex];
      characterCount += deleting ? -1 : 1;
      setText(phrase.slice(0, characterCount));

      let delay = deleting ? 45 : 80;
      if (deleting && characterCount === 0) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        deleting = false;
        delay = 300;
      } else if (!deleting && characterCount === phrase.length) {
        deleting = true;
        delay = 1900;
      }
      timer = window.setTimeout(tick, delay);
    }

    function restart() {
      window.clearTimeout(timer);
      phraseIndex = 0;
      characterCount = phrases[0].length;
      deleting = true;
      setText(phrases[0]);
      if (!motionPreference.matches) timer = window.setTimeout(tick, 1900);
    }

    restart();
    motionPreference.addEventListener('change', restart);
    return () => {
      window.clearTimeout(timer);
      motionPreference.removeEventListener('change', restart);
    };
  }, [phrases]);

  const accessibleInterests = `${phrases.slice(0, -1).join(', ')}, and ${phrases[phrases.length - 1]}`;

  return (
    <p className="intro-description intro-interests">
      <span className="sr-only">Interested in {accessibleInterests}.</span>
      <span className="interest-line" aria-hidden="true">
        <span>Interested in</span>
        <span className="interest-words">
          {phrases.map((phrase) => <span className="interest-sizer" key={phrase}>{phrase}</span>)}
          <span className="interest-word">{text}</span>
          <span className="interest-static">{phrases[0]}</span>
        </span>
      </span>
    </p>
  );
}
