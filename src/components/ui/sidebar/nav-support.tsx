import { ContactRound } from 'lucide-react';

const NavSupport = () => {
  return (
    <div>
      <span className="text-xs">Need Help?</span>
      <div className="bg-primary-100 flex gap-2 px-3 py-3">
        <ContactRound /> Get Support
      </div>
    </div>
  );
};

export default NavSupport;
