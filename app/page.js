import Link from "next/link"

export const getProducts = async () => {
  const res = await fetch('https://dummyjson.com/products')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()

}

export default async function Home() {
  const { products } = await getProducts()
  console.log('data: ', products);
  const tableHeads = ["Id", "Title", "Brand", "Rating", "Price"]

  return (
    <>
      <div className="p-8">
        <h2 className="mb-6 font-semibold">Products</h2>
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {
                tableHeads?.map((head) => {
                  return (
                    <th key={head}>
                      <h6>{head}</h6>
                    </th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              products?.map((product) => {
                return (
                  <tr key={product?.id}>
                    <td>{product?.id}</td>
                    <td><Link href={`/${product?.id}`} className="hover:underline hover:text-purple-500">{product?.title}</Link></td>
                    <td>{product?.brand}</td>
                    <td>{product?.rating}/5</td>
                    <td>$ {product?.price}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
