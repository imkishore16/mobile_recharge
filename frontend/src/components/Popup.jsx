/* eslint-disable react/no-unknown-property */
const Popup = () => {
  console.log("popup");
  return (
    <div className="bg-black hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
      <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
          <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              Privacy info
            </h3>
            <p>
              The backup created with this export functionality may contain some
              sensitive data. We suggest you save this archive in a secure
              location.
            </p>
          </div>
          <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
            <a
              href="#"
              className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
            >
              Learn more about privacy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
