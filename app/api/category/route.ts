import prisma from "@/app/prismadb"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try{
        const allCategories = await prisma.product.findMany({
            select:{
                category:true
            }
        })

        return NextResponse.json(allCategories)
    }
    catch(error){
        console.log('Error fetching allcategories', error)
        return NextResponse.error()
    }
}