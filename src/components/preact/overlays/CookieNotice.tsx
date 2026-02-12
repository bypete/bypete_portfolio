import { useEffect, useState } from "preact/hooks";
import Button from "~/components/preact/Button.tsx";
import Toast from "~/components/preact/overlays/Toast.tsx";

function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function CookieNotice() {
  // Initialize visible to false so the toast doesn't render immediately.
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true,
    adverts: false,
    analytics: true,
    personalisation: false,
  });

  useEffect(() => {
    const checkConsent = async () => {
      const storedConsent = localStorage.getItem("consentMode");
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
    localStorage.setItem("consentMode", JSON.stringify(newConsent));
    window.gtag("consent", "update", {
      ad_storage: newConsent.adverts ? "granted" : "denied",
      ad_user_data: newConsent.adverts ? "granted" : "denied",
      ad_personalization: newConsent.personalisation ? "granted" : "denied",
      analytics_storage: newConsent.analytics ? "granted" : "denied",
      functionality_storage: newConsent.necessary ? "granted" : "denied",
      personalization_storage: newConsent.personalisation ? "granted" : "denied",
      security_storage: newConsent.necessary ? "granted" : "denied",
    });
    setVisible(false);
  };

  return (
    <Toast
      id="cookie"
      theme="settings"
      size="md"
      isOpen={visible}
      onClose={() => setVisible(false)}
    >
      <p>
        We use cookies to understand how visitors interact with our site. This
        helps us provide a better user experience.{" "}
        <a class="link" href="/about/legal/#cookie-policy">
          View our policy
        </a>
      </p>
      <div class="grid grid-cols-2 gap-2">
        <label>
          <input type="checkbox" checked disabled /> Necessary
        </label>
        <label>
          <input
            type="checkbox"
            checked={consent.analytics}
            onChange={() =>
              setConsent((prev) => ({ ...prev, analytics: !prev.analytics }))
            }
          />{" "}
          Analytics
        </label>
        <label>
          <input
            type="checkbox"
            checked={consent.personalisation}
            onChange={() =>
              setConsent((prev) => ({
                ...prev,
                personalisation: !prev.personalisation,
              }))
            }
          /> Personalisation
        </label>
        <label>
          <input
            type="checkbox"
            checked={consent.adverts}
            onChange={() =>
              setConsent((prev) => ({ ...prev, adverts: !prev.adverts }))
            }
          /> Ad cookies
        </label>
      </div>
      <div class="mt-2 flex gap-2">
        <Button
          size="sm"
          theme="quiet"
          onClick={() =>
            updateConsent({
              necessary: true,
              adverts: false,
              analytics: false,
              personalisation: false,
            })
          }
        >
          Reject All
        </Button>
        <Button size="sm" onClick={() => updateConsent(consent)}>
          Apply Choices
        </Button>
      </div>
    </Toast>
  );
}
