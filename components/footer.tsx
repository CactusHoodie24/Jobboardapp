import React from 'react'
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-white py-10 mt-10 px-10">
  <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8">
    <div>
      <h3 className="font-bold mb-3 text-cyan-400">JobBoard</h3>
      <p className="text-gray-400 text-sm">Connecting talent with opportunity.</p>
    </div>
    <div>
      <h4 className="font-semibold mb-3">Quick Links</h4>
      <ul className="space-y-1 text-gray-400 text-sm">
        <li><a href="#">Jobs</a></li>
        <li><a href="#">Companies</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-3">Contact</h4>
      <p className="text-gray-400 text-sm">support@jobboard.com</p>
      <div className="flex gap-3 mt-3">
        <FaFacebook />
        <FaTwitter />
        <FaLinkedin />
      </div>
    </div>
  </div>
  <p className="text-center text-gray-500 text-xs mt-8">© 2025 JobBoard. All rights reserved.</p>
</footer>
  )
}

export default Footer