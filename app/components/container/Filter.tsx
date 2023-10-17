'use client'
import React, { useState, useEffect, type ReactElement } from 'react'
import { BsSliders2Vertical, BsChevronUp } from 'react-icons/bs'
import axios from 'axios'

const Filter = (): ReactElement => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSize, setSelectedSize] = useState<string[]>([])
  const [allHexValues, setHexValues] = useState<string[]>([])
  const [allCategories, setAllCategories] = useState<string[]>([])
  const [selectedHexValues, setSelectedHexValues] = useState<string[]>([])
  const [price, setPrice] = useState({
    min: 0,
    max: 10
  })

  const handelMinChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.name === 'min' ? parseInt(e.target.value) : e.target.value
    setPrice({
      ...price,
      [e.target.name]: value
    })
  }

  const handlMaxChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.name === 'max' ? parseInt(e.target.value) : e.target.value
    setPrice({
      ...price,
      [e.target.name]: value
    })
  }

  const toggleCategory = (category: string): void => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    )
  }

  const togglesize = (size: string): void => {
    setSelectedSize((prevSize) =>
      prevSize.includes(size)
        ? prevSize.filter((c) => c !== size)
        : [...prevSize, size]
    )
  }

  const toggleColor = (color: string): void => {
    setSelectedHexValues((prevColor) =>
      prevColor.includes(color)
        ? prevColor.filter((c) => c !== color)
        : [...prevColor, color]
    )
  }

  const getAllColors = async (): Promise<any> => {
    try {
      const response = await axios.get('/api/color')
      // console.log("Colors:", response.data);
      return response.data
    } catch (error) {
      console.error('Error', error)
      return null
    }
  }

  const getAllCategories = async (): Promise<any> => {
    try {
      const response = await axios.get('/api/category')
      // console.log("Colors:", response.data);
      return response.data
    } catch (error) {
      console.error('Error', error)
      return null
    }
  }

  useEffect(() => {
    void getAllColors().then((allColors) => {
      if (allColors !== null) {
        const hextSet = new Set<string>()
        allColors.forEach((element: any) => {
          const colors = element.color.split(',')
          colors.forEach((color: string) => {
            const hextValue = color.replace('#', '')
            hextSet.add(hextValue)
          })
        })
        const uniqueHexValues: string[] = Array.from(hextSet)
        setHexValues(uniqueHexValues)
      }
    })
  }, [])
  useEffect(() => {
    void getAllCategories().then((allCategories) => {
      if (allCategories !== null) {
        const categorySet = new Set<string>()
        allCategories.forEach((element: any) => {
          const categories = element.category.split(',')
          categories.forEach((category: string) => {
            categorySet.add(category)
          })
        })
        const uniqueCategoryValues: string[] = Array.from(categorySet)

        setAllCategories(uniqueCategoryValues)
      }
    })
  }, [])

  const allHexValue = allHexValues

  useEffect(() => {
    axios.get('/api/filterproduct', {
      params: {
        categories: selectedCategories,
        size: selectedSize,
        price: {
          min: price.min,
          max: price.max
        },
        colors: selectedHexValues
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log('response', response.data)
      })
      .catch((error) => {
        console.log('Error', error)
      })
  })
  return (
    <div className='relative'>
        <div className={`md:w-[250px] border-l-[0.5px] border-r-[0.5px] ${showFilter ? 'max-md:w-[250px]' : 'w-0 max-md:invisible'}`}>
            <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px]'>
                <h1 className='text-neutral-800'>Filtros</h1>
                <BsSliders2Vertical size={20} className='text-neutral-600'/>
            </div>
            <div className='flex flex-col py-3 pb-5 tet-sm text-neutral-600 border-b-[0.5px]'>
                     {allCategories.map((categoria, index) => (
                        <span
                        key={index}
                        className={`py-3 px-5 ${selectedCategories.includes(categoria) ? 'bg-purple-50' : ''}`}
                        onClick={() => { toggleCategory(categoria) }}
                        >
                        {categoria}
                       </span>

                     ))}

            </div>
            <div className='border-b-[0.5px] pb-10'>
                    <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5'>
                        <h1 className='text-neutral-800'>Precios</h1>
                        <BsChevronUp size={18} className = 'text-neutral-600' />
                    </div>
                    <div className='grid grid-cols-2 gap-5 px-5 overflow-hidden'>
                        <div className='flex flex-col justify-center items-center'>
                            <label htmlFor="" className='text-[15px] opacity-75'>Min</label>
                            <div className='relative'>
                                <span className='absolute left-3 top-1'>$</span>
                                <input className='w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]' type="number" name="min" onChange={handelMinChange} value={price.min} id="" />
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <label htmlFor="" className='text-[15px] opacity-75'>Max</label>
                            <div className='relative'>
                                <span className='absolute left-3 top-1'>$</span>
                                <input className='w-full outline-none border-[1px] rounded-lg px-2 text-center py-[2px]' type="number" name="max" onChange={handlMaxChange} value={price.max} id="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b-[0.5px]'>
                    <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5'>
                        <h1 className='text-neutral-800'>Colores</h1>
                    </div>
                    <ul className='grid grid-cols-4 px-5 gap-5 mb-4'>
                        {allHexValue.map((hexvalue, index) => (
                            <li
                            key={index}
                            className={`w-[40px] h-[40px] rounded-2xl border-[0.5px] border-neutral-300 cursor-pointer ${selectedHexValues.includes(`#${hexvalue}`) ? 'shadow-2xl opacity-25' : ''}`}
                            style={{ backgroundColor: `#${hexvalue}` }}
                            onClick={() => { toggleColor(`#${hexvalue}`) }}
                            >

                            </li>
                        ))}
                    </ul>
                </div>
                <div className='sizes'>
                    <div className='flex items-center justify-between px-5 py-4 border-b-[0.5px] mb-5'>
                        <h1 className='text-neutral-800'>Sizes</h1>
                    </div>
                    <ul className='grid grid-cols-4 px-5 gap-5'>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('SM') ? 'bg-neutral-900 text-white' : ''}`}
                        onClick={() => { togglesize('s') }}
                        >
                            S
                        </li>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('MD') ? 'bg-neutral-900 text-white' : ''}`}
                        onClick={() => { togglesize('m') }}
                        >
                            M
                        </li>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('XL') ? 'bg-neutral-900 text-white' : ''}`}
                        onClick={() => { togglesize('l') }}
                        >
                            L
                        </li>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('2XL') ? 'bg-neutral-900 text-white' : ''}`}
                        onClick={() => { togglesize('xl') }}
                        >
                            XL
                        </li>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('3XL') ? 'bg-neutral-900 text-white' : ''}`}
                        onClick={() => { togglesize('2xl') }}
                        >
                            2XL
                        </li>
                        <li
                        className={`border-[0.5px] rounded-lg text-center text-[14px] py-[2px] cursor-pointer ${selectedSize.includes('4XL') ? 'bg-neutral-900 text-white' : ''}`}
                        onClick={() => { togglesize('3xl') }}
                        >
                            3XL
                        </li>
                    </ul>
                </div>
        </div>
        <div onClick={() => { setShowFilter(!showFilter) }} className='absolute md:hidden top-[20px] right-[-42px] rotate-90 bg-gray-100 px-2 rounded-t-sm cursor-pointer'>Filtros</div>
    </div>
  )
}

export default Filter
