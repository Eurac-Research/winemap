"use client";

import { MouseEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";

const USER_CONSENT_COOKIE_KEY = "cookie_consent";
const USER_CONSENT_COOKIE_EXPIRE_DATE =
  new Date().getTime() + 365 * 24 * 60 * 60;

/**
 * CookieConsent component displays a cookie consent banner at the bottom of the page.
 * It checks if the user has already given consent by reading a cookie and sets the state accordingly.
 * If consent is not given, it shows a banner with a message and a button to accept cookies.
 *
 * @component
 * @returns {JSX.Element | null} The CookieConsent component or null if consent is already given.
 *
 * @example
 * <CookieConsent />
 *
 * @remarks
 * This component uses the `Cookies` library to get and set cookies.
 *
 * @hook
 * - `useState` to manage the state of cookie consent.
 * - `useEffect` to check the cookie consent status on component mount.
 *
 * @event
 * - `onClick` to handle the button click event for accepting cookies.
 */
const CookieConsent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true);

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === "true";
    setCookieConsentIsTrue(consentIsTrue);
  }, []);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, "true", {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      });
      setCookieConsentIsTrue(true);
    }
  };

  if (cookieConsentIsTrue) {
    return null;
  }

  return (
    <>
      <div className="CookieBg fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-70 blur-lg"></div>
      <section className="CookieConsent fixed bottom-0 left-0 z-20 w-full py-2 opacity-100 blur-0 md:py-4">
        <div className="flex flex-col items-start space-y-2 bg-gray-200 px-8 py-8 md:flex-row md:items-stretch md:space-x-2 md:space-y-0">
          <div className="flex flex-grow items-center text-gray-900">
            <p className="max-w-2xl text-sm font-medium">
              In order to give you a better service this site uses cookies.
              Additionally third party cookies are used. By continuing to browse
              the site you are agreeing to our use of cookies.{" "}
              <a
                className="hover:text-lightAccent text-sm underline"
                href="https://privacy.eurac.edu"
              >
                Privacy policy
              </a>
            </p>
          </div>
          <div className="flex items-center">
            <button
              className="whitespace-nowrap bg-green-600 px-6 py-3 text-sm font-bold uppercase text-white hover:bg-green-500"
              onClick={onClick}
            >
              OK
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CookieConsent;
