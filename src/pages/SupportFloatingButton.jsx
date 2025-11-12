import React, { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { apiPost } from '../services/api'
import storage from '../utils/storage'
import toast from 'react-hot-toast'
// import { useTranslation } from "react-i18next";


const SupportFloatingButton = () => {
    // const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [images, setImages] = useState([])
  const role = storage.getItem('role') // 'owner' or 'customer'

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 3) {
      toast.error('You can upload a maximum of 3 images')
      return
    }
    setImages(files)
  }

  const handleSubmit = async () => {
    if (!name || !email || !body) {
      toast.error('All required fields must be filled')
      return
    }

    try {
      const endpoint = role === 'owner' ? '/owner/support' : '/customer/support'
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('body', body)
      images.forEach((img) => formData.append('images', img))

      await apiPost(endpoint, formData)
      toast.success('Support request submitted successfully')
      setIsOpen(false)
      setName('')
      setEmail('')
      setBody('')
      setImages([])
    } catch (err) {
      console.error(err)
      toast.error('Failed to submit support request')
    }
  }

  return (
    <>
    
      <div className='fixed bottom-4 right-4 sm:bottom-5 sm:right-5 flex flex-col items-center gap-1 z-50'>
  <button
    onClick={() => setIsOpen(true)}
    className='hover:bg-orange-200 text-orange-500 p-3 sm:p-4 bg-white border rounded-full shadow-lg transition-all cursor-pointer'
  >
    <MessageCircle size={20} className='sm:w-6 sm:h-6' />
  </button>
  <span className='text-[10px] sm:text-xs font-medium bg-white text-orange-500 px-1.5 sm:px-2 py-0.5 rounded shadow-sm'>
   Support
  </span>
</div>


      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 flex  justify-end items-end bg-opacity-40 z-50 p-4'>
          <div className='bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl relative animate-fadeIn'>
            <h2 className='text-2xl font-semibold mb-2 text-gray-800'>
              {role === 'owner' ? 'Owner' : 'Customer'} Support
            </h2>
            <p className='text-gray-500 text-sm mb-6'>
              Please describe your issue below and our support team will reach out soon.
            </p>

            <div className='space-y-4'>
              <input
                type='text'
                placeholder='Your Name *'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-500'
              />

              <input
                type='email'
                placeholder='Your Email *'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-500'
              />

              <textarea
                placeholder='Describe your issue... *'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                className='w-full border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 resize-none'
              />

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Upload Issue Images (max 3)
                </label>
                <input
                  type='file'
                  accept='image/*'
                  multiple
                  onChange={handleFileChange}
                  className='w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600'
                />
              </div>
            </div>

            {/* Buttons */}
            <div className='flex justify-end mt-6 gap-3'>
              <button
                onClick={() => setIsOpen(false)}
                className='px-4 py-2 border rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition'
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className='px-4 py-2 bg-orange-500 cursor-pointer text-white rounded-lg hover:bg-orange-600 transition'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SupportFloatingButton
