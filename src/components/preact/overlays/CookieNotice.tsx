import { useState, useEffect } from 'preact/hooks';
import Toast from '~/components/preact/overlays/Toast.tsx';
import Button from '~/components/preact/Button.tsx';

function wait(ms = 0) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function CookieNotice() {
    // Initialize visible to false so the toast doesn't render immediately.
  const [visible, setVisible] = useState(false);
    const [consent, setConsent] = useState({
        necessary: true,
        marketing: false,
        analytics: false,
        preferences: false,
    });

    useEffect(() => {
      const checkConsent = async () => {
          const storedConsent = localStorage.getItem('consentMode');
          if (storedConsent) {
              setConsent(JSON.parse(storedConsent));
              setVisible(false); // Do not show the toast if consent already exists.
          } else {
              await wait(2000); // Show the toast after a delay if no consent is found.
              setVisible(true);
          }
      };
      checkConsent();
  }, []);

    const updateConsent = (newConsent) => {
        setConsent(newConsent);
        localStorage.setItem('consentMode', JSON.stringify(newConsent));
        window.gtag('consent', 'update', {
            functionality_storage: newConsent.necessary ? 'granted' : 'denied',
            security_storage: newConsent.necessary ? 'granted' : 'denied',
            ad_storage: newConsent.marketing ? 'granted' : 'denied',
            analytics_storage: newConsent.analytics ? 'granted' : 'denied',
            personalization_storage: newConsent.preferences ? 'granted' : 'denied',
        });
        setVisible(false); 
    };

    return (
        <Toast id="cookie" theme="settings" isOpen={visible} onClose={() => setVisible(false)}>
            <p>
                We use cookies to understand how visitors interact with our site. This helps us provide a better user
                experience. <a class="link" href="/legal/#how-we-use-cookies">View our policy</a>
            </p>
            <div class="grid grid-cols-2 gap-2">
                <label>
                    <input type="checkbox" checked disabled /> Necessary
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={consent.analytics}
                        onChange={() => setConsent((prev) => ({ ...prev, analytics: !prev.analytics }))}
                    /> Analytics
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={consent.preferences}
                        onChange={() => setConsent((prev) => ({ ...prev, preferences: !prev.preferences }))}
                    /> Preferences
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={consent.marketing}
                        onChange={() => setConsent((prev) => ({ ...prev, marketing: !prev.marketing }))}
                    /> Marketing
                </label>
            </div>
            <div class="flex gap-2 mt-2">
                <Button size="sm" onClick={() => updateConsent({ necessary: true, marketing: false, analytics: false, preferences: false })}>
                    Reject All
                </Button>
                <Button size="sm" onClick={() => updateConsent(consent)}>Accept Choices</Button>
            </div>
        </Toast>
    );
}
