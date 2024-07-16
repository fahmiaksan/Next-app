'use client';
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DetailProduct({ params }: { params: { slug: string[] } }) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
    fetcher
  );
  const products = {
    data: data?.data
  }
  return (
    <>
      <h1>
        {
          params.slug ? 'Detail Product' : 'Products Page'
        }
      </h1>
      <div className="grid grid-cols-2 relative p-8">
        {
          products?.data?.length > 0 &&
          products?.data?.map((item: any) => (
            <Link
              href={`/products/detail/${item.id}`}
              key={item.id}
              className="w-3/5 bg-indigo-500 text-white text-left space-y-3 p-3 h-max flex flex-col justify-between">
              <Image
                src={item.image}
                alt="product"
                width={300}
                height={300}
                priority
                className="object-cover bg-center bg-no-repeat mx-auto"
              />
              <div>
                <p className="z-10">{item.name}</p>
                <p className="z-10">{item.price}</p>
              </div>
            </Link>
          ))
        }
        {
          params.slug && params.slug.map((slug, i) => (
            <p key={i}>{slug}</p>
          ))
        }
      </div >
    </>
  )
};
