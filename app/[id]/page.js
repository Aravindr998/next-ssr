import React from 'react'

export async function generateMetadata({ params: { id } }) {
    const product = await fetch(`https://dummyjson.com/products/${id}`).then(res => res.json())

    return {
        title: product?.title,
        openGraph: {
            title: product?.title,
            description: product?.brand,
            siteName: 'Next.js',
            images: [
                {
                    url: product?.thumbnail,
                    width: 1200,
                    height: 600,
                }
            ]
        }
    }
}

export const getProductById = async (id) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function ProductPage({ params: { id } }) {
    const data = await getProductById(id)
    return (
        <div className='p-8'>
            <p>id: {data?.id}</p>
            <p>Product: {data?.title}</p>
            <p>Brand: {data?.brand}</p>
            <p>Rating: {data?.rating}/5</p>
            <p>Price: $ {data?.price}</p>
        </div>
    )
}

