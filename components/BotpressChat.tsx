'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    botpressWebChat?: {
      init: (config: { configUrl: string }) => void;
    };
  }
}

export default function BotpressChat() {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v3.0/inject.js';
    script1.defer = true;

    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/07/06/14/20250706141018-6X8HK99I.js';
    script2.defer = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    script1.onload = () => {
      const waitForBotpress = setInterval(() => {
        if (window.botpressWebChat?.init) {
          clearInterval(waitForBotpress);

          window.botpressWebChat.init({
            configUrl:
              'https://files.bpcontent.cloud/2025/07/06/14/20250706141018-05IAA8PT.json',
          });

          const waitForWidget = setInterval(() => {
            const widget = document.querySelector('.bpw-floating-button');
            if (widget) {
              widget.setAttribute(
                'style',
                'left: 20px !important; right: auto !important; bottom: 20px !important;'
              );
              clearInterval(waitForWidget);
            }
          }, 500);
        }
      }, 300);
    };
  }, []);

  return null;
}
