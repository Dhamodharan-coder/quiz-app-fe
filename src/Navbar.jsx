import React from 'react'
import logo1 from "./assets/logo-1.png"

const Navbar = () => {
  return (
    <div>
      
      <nav class="py-4">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
     
      
      </div>
      <div class="flex items-center justify-center">
        <div class="flex items-center">
          <img class="h-16 rounded-full w-auto" src={logo1} alt="Your Company" />
        </div>
        <div>
         
        </div>
      </div>
      <div class="flex mx-auto text-xl md:text-3xl lg:text-3xl font-bold">
          
          Dhru Quiz App
         </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        
       
        <div class="relative ml-3">
          <div>
            {/* <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">Open user menu</span>
              <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  </div>

</nav>


    </div>
  )
}

export default Navbar
