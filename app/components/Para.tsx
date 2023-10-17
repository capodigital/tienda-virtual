import React,{useEffect,useRef, useState} from 'react'
import {EditorContent, useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

interface Para{
    setDescription: React.Dispatch<React.SetStateAction<any>>
    description:string
}

const Para: React.FC<Para> = ({setDescription,description}) => {
    const [focus, setFocus] = useState<boolean>(false)
    const editor = useEditor({
        extensions: [
          StarterKit,
        ],
        editorProps:{
            attributes:{
                class: "prose w-full focus:outline-none leading-5 prose-a:text-pink-600 prose-a:font-semibold prose-a:no-underline"
            }
        },
        
        content: description,
      })
      const html = editor?.getHTML()

      useEffect(() => {
        setDescription(html)
      },[html])

      const menuRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
        const handler = (e:any) => {
            if(!menuRef.current?.contains(e.target)){
                setFocus(false)
            }
        }
        document.addEventListener('mousedown',handler)
       },[])

  return (
    <div ref={menuRef} className={`mx-auto border-[1px] mt-4 rounded-xl ${focus ? "border-pink-500 border-[2px] ml-0":""}`}>
        <EditorContent editor={editor} onClick={() => setFocus(true)} style={{padding:'18px'}}/>
    </div>
  )
}

export default Para