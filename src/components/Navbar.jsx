import { Bars3Icon, BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default function Navbar() {
  return (
    <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm">
      <button type="button" className="-m-2.5 p-2.5 text-gray-700">
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
      </button>

      <form action="#" method="GET" className="relative flex flex-1">
        <label htmlFor="search-field" className="sr-only">Search</label>
        <MagnifyingGlassIcon aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400" />
        <input id="search-field" name="search" type="search" placeholder="Search..." className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0" />
      </form>

      <div className="flex items-center gap-x-4">
        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
          <span className="sr-only">View notifications</span>
          <BellIcon aria-hidden="true" className="h-6 w-6" />
        </button>

        <Menu as="div" className="relative">
          <MenuButton className="-m-1.5 flex items-center p-1.5">
            <span className="sr-only">Open user menu</span>
            <img alt="" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="h-8 w-8 rounded-full bg-gray-50" />
            <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">Tom Cook</span>
            <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
          </MenuButton>
          <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg">
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                <a href={item.href} className="block px-3 py-1 text-sm leading-6 text-gray-900">{item.name}</a>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  )
}
