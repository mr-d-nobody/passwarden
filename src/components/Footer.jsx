import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-3 text-center text-sm fixed bottom-0 w-full ">
      © {new Date().getFullYear()} <span className="font-semibold">PassWarden</span>. All rights reserved.
    </footer>
  );
};

export default Footer;
