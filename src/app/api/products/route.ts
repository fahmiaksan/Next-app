import { retrieveData, retrieveDataById } from "@/app/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
const data = [
  {
    id: 1,
    name: 'sepatu baru',
    prices: 200000,
    image: '/image.png'
  },
  {
    id: 2,
    name: 'sepatu baru dong',
    prices: 300000,
    image: '/image2.png'
  },
]
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    const detailProduct = await retrieveDataById('products', id);
    return NextResponse.json({ status: 200, message: 'success', data: detailProduct })
  }
  const product = await retrieveData('products');
  return NextResponse.json({ status: 200, message: 'success', data: product })
};

