import { useEffect, useState } from "react";

const STORAGE_KEY = "bsga-newsletter-popup";

const NewsletterPopup = () => {
  const [, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }, []);

  return null;
};

export default NewsletterPopup;
