import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  // Tambahkan navigasi lainnya
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <Dialog
      open={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
      className="relative z-50 lg:hidden"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity" />
      <div className="fixed inset-0 flex">
        <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out">
          <TransitionChild>
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="-m-2.5 p-2.5"
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
              </button>
            </div>
          </TransitionChild>
          {/* Sidebar content */}
          {/* Add your sidebar content here */}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
