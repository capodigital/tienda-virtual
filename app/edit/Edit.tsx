/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import React, { useState, useEffect, type ReactElement } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/navigation'
import Size from '../components/Size'
import Color from '../components/Color'
import Para from '../components/Para'
import ImageUpload from '../components/ImageUpload'

interface Props {
  id: string
  title: string
  description: string
  category: string
  style: string
  store: string
  size: string
  inventory: number
  color: string
  price: number
  images: string
  userId: string
}

const Edit = ({ id, title, description, category, style, store, size, inventory, color, price, images, userId }: Props): ReactElement => {
  const Id = userId
  const router = useRouter()
  const [formData, setFormData] = useState({
    id,
    title,
    description,
    category,
    style,
    store,
    size,
    inventory,
    color,
    price,
    images,
    userId: Id
  })
  const [Description, setDescription] = useState<string>('')
  const [info, updateinfo] = useState<any>()
  const [imageUrls, setImageUrls] = useState<string[]>([])

  useEffect(() => {
    if (formData.images != null) {
      const imageUrlArray = formData.images.split(',')
      setImageUrls(imageUrlArray)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.name === 'price' ? parseInt(e.target.value) : parseInt(e.target.value)
    const inventory = e.target.name === 'inventory' ? parseInt(e.target.value) : parseInt(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: value,
      [e.target.name]: inventory
    })
  }

  const handleImageChange = (): void => {
    const stringimages = JSON.stringify(imageUrls)
    setFormData({
      ...formData,
      images: stringimages,
      description: Description,
      userId: id
    })
  }

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: Description,
      images: imageUrls.toString(),
      userId: id
    }))
  }, [imageUrls])

  const updateData = async (): Promise<void> => {
    handleImageChange()
    try {
      const response = await axios.patch('/api/updateproduct', formData)
      console.log(response.data)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='px-5 max-w-[1280px] mx-auto mb-10'>
        <div>
            <Navbar/>
        </div>
        <h1 className='text-3xl font-semibold py-6'>Actualiza tu producto</h1>
        <div className='text-black mt-4'>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-5'>
                <div>
                    <label htmlFor="title" className='font-medium'>Title</label>
                    <input
                    type="text"
                    className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                     />
                </div>
                <div>
                    <label htmlFor="category" className='font-medium'>Categoría</label>
                    <input
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <label htmlFor="style" className='font-medium'>Estilo</label>
                    <input
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='style'
                        value={formData.style}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <label htmlFor="store" className='font-medium'>Marca</label>
                    <input
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='store'
                        value={formData.store}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <label htmlFor="size" className='font-medium'>Size</label>
                    <input
                        type="text"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='size'
                        value={formData.size}
                        onChange={handleChange}
                        />
                    <Size setFormData={setFormData}/>
                </div>
                <div>
                    <label htmlFor="inventory" className='font-medium'>Inventario</label>
                    <input
                        type="number"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='inventory'
                        value={formData.inventory}
                        onChange={handlePriceChange}
                        />
                </div>
                <div>
                    <label htmlFor="price" className='font-medium'>Precio</label>
                    <input
                        type="number"
                        className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                        name='price'
                        value={formData.price}
                        onChange={handlePriceChange}
                        />
                </div>
                <div>
                    <div>
                        <label htmlFor="color" className='font-medium'>Color</label>
                        <input
                            type="text"
                            className='w-full h-[50px] border-[1px] rounded-lg focus:border-pink-500 px-3 focus:border-2 outline-none'
                            name='color'
                            value={formData.color}
                            onChange={handleChange}
                            />
                    </div>
                    <Color setFormData={setFormData} Color={formData.color}/>
                </div>
            </div>
            <label htmlFor="" className='mt-10 inline-block font-medium'>Descripción de tu producto</label>
            <Para setDescription={setDescription} description={formData.description} />
            <label htmlFor="" className='mt-10 inline-block font-medium'>Subir imágenes</label>
            <ImageUpload info={info} updateInfo={updateinfo} imageUrls={imageUrls} setImageUrls={setImageUrls} handleImageChange={handleImageChange}/>
            <button onClick={updateData} className='text-white mt-10 border-[1px] bg-purple-500 rounded-lg px-5 p-2'>Actualizar</button>
        </div>
    </div>
  )
}

export default Edit
