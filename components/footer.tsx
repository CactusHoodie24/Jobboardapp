import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
      <footer className="bg-gray-900 text-white py-10 mt-10 px-10">
  <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8">
    <div>
      <h3 className="font-bold mb-3 text-signal">JobBoard</h3>
      <p className="text-gray-400 text-sm">Connecting talent with opportunity.</p>
    </div>
    <div>
      <h4 className="font-semibold mb-3">Quick Links</h4>
      <ul className="space-y-1 text-gray-400 text-sm">
        <li><Link href="/jobs" className="hover:text-white">Jobs</Link></li>
        <li><Link href="/companies" className="hover:text-white">Companies</Link></li>
        <li><Link href="/about-us" className="hover:text-white">About</Link></li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-3">Contact</h4>
      <p className="text-gray-400 text-sm">preciousphimba@gmail.com</p>
      <div className="flex gap-3 mt-3">
        <a href="#" aria-label="Facebook"><FaFacebook /></a>
        <a href="#" aria-label="Twitter"><FaTwitter /></a>
        <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
      </div>
    </div>
  </div>
  <p className="text-center text-gray-500 text-xs mt-8">© {year} JobBoard. All rights reserved.</p>
</footer>
  )
}

export default Footer