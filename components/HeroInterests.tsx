'use client';

import { useEffect, useState } from 'react';

const PHRASE_PAUSE_MS = 2000;

export function HeroInterests({ phrases, staticPhrase }: {
  phrases: readonly [string, ...string[]];
  staticPhrase: string;
}) {
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
        delay = PHRASE_PAUSE_MS;
      }
      timer = window.setTimeout(tick, delay);
    }

    function restart() {
      window.clearTimeout(timer);
      phraseIndex = 0;
      characterCount = phrases[0].length;
      deleting = true;
      setText(phrases[0]);
      if (!motionPreference.matches) timer = window.setTimeout(tick, PHRASE_PAUSE_MS);
    }

    restart();
    motionPreference.addEventListener('change', restart);
    return () => {
      window.clearTimeout(timer);
      motionPreference.removeEventListener('change', restart);
    };
  }, [phrases]);

  return (
    <p className="intro-description intro-interests">
      <span className="sr-only">Interested in {staticPhrase}</span>
      <span className="interest-line" aria-hidden="true">
        <span>Interested in</span>
        <span className="interest-words">
          {phrases.map((phrase) => <span className="interest-sizer" key={phrase}>{phrase}</span>)}
          <span className="interest-word">{text}</span>
        </span>
      </span>
      <span className="interest-static" aria-hidden="true">
        Interested in <span className="interest-static-words">{staticPhrase}</span>
      </span>
    </p>
  );
}
