export type Producto = {
  id: Number
  title: String
  description: String
  price: Number
  discountPercentage: Number
  rating: Number
  stock: Number
  brand: String
  category: String
  thumbnail: String
  images: String[]

}

export type ProductoRespuesta = {
  products: Producto[]
  total: Number
  skip: Number | null
  limit: number
}
