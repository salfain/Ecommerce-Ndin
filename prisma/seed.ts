import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Declare ProductStock enum locally
enum ProductStock {
  ready = 'ready',
  preorder = 'preorder'
}

async function main () {
  await prisma.product.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.category.deleteMany()
  await prisma.location.deleteMany()
  // Sample Indonesian data
  const brands = [
    { name: 'Indomie', logo: 'https://picsum.photos/200/' },
    { name: 'ABC', logo: 'https://picsum.photos/200' },
    { name: 'Kapal Api', logo: 'https://picsum.photos/200/' },
    { name: 'Teh Botol Sosro', logo: 'https://picsum.photos/200/' },
    { name: 'Ultra Milk', logo: 'https://picsum.photos/200/' },
    { name: 'Indomilk', logo: 'https://picsum.photos/200/' },
    { name: 'Tango', logo: 'https://picsum.photos/200/' },
    { name: 'SilverQueen', logo: 'https://picsum.photos/200/' },
    { name: 'GarudaFood', logo: 'https://picsum.photos/200/' },
    { name: 'Le Minerale', logo: 'https://picsum.photos/200/' }
  ]

  const categories = [
    { name: 'Mie Instan' },
    { name: 'Minuman Botol' },
    { name: 'Minuman Kotak' },
    { name: 'Kopi' },
    { name: 'Cokelat' },
    { name: 'Biskuit' },
    { name: 'Air Mineral' },
    { name: 'Sereal' },
    { name: 'Sambal & Saus' },
    { name: 'Snack Ringan' }
  ]

  const locations = [
    { name: 'Jakarta' },
    { name: 'Bandung' },
    { name: 'Surabaya' },
    { name: 'Yogyakarta' },
    { name: 'Semarang' },
    { name: 'Medan' },
    { name: 'Makassar' },
    { name: 'Denpasar' },
    { name: 'Balikpapan' },
    { name: 'Padang' }
  ]

  // Seed Brand, Category, Location
  const [createdBrands, createdCategories, createdLocations] =
    await Promise.all([
      prisma.brand.createMany({ data: brands }),
      prisma.category.createMany({ data: categories }),
      prisma.location.createMany({ data: locations })
    ])

  const brandList = await prisma.brand.findMany()
  const categoryList = await prisma.category.findMany()
  const locationList = await prisma.location.findMany()

  // Seed Products - Fixed type issues
  const sampleProducts = [
    {
      name: 'Indomie Goreng',
      description: 'Mie instan goreng rasa asli khas Indonesia.',
      price: 3000,
      stock: ProductStock.ready,
      images: ['https://picsum.photos/200/']
    },
    {
      name: 'Teh Botol Sosro Original',
      description: 'Minuman teh manis dalam botol kaca.',
      price: 5000,
      stock: ProductStock.ready,
      images: ['https://picsum.photos/200/']
    },
    {
      name: 'Ultra Milk Cokelat',
      description: 'Susu UHT rasa cokelat yang lezat.',
      price: 6000,
      stock: ProductStock.ready,
      images: ['https://picsum.photos/200/']
    },
    {
      name: 'Kapal Api Special Mix',
      description: 'Kopi bubuk hitam khas Indonesia.',
      price: 4000,
      stock: ProductStock.ready,
      images: ['https://picsum.photos/200/']
    },
    {
      name: 'Tango Wafer Cokelat',
      description: 'Wafer krispi rasa cokelat.',
      price: 3500,
      stock: ProductStock.ready,
      images: ['https://picsum.photos/200/']
    },
    {
      name: 'Le Minerale 600ml',
      description: 'Air mineral sehat dan menyegarkan.',
      price: 3000,
      stock: ProductStock.ready,
      images: ['https://picsum.photos/200/']
    },
    {
      name: 'SilverQueen Almond',
      description: 'Cokelat lezat dengan almond renyah.',
      price: 15000,
      stock: ProductStock.ready,
      images: ['https://picsum.photos/200/']
    },
    {
      name: 'ABC Sambal Extra Pedas',
      description: 'Sambal botol dengan rasa ekstra pedas.',
      price: 8000,
      stock: ProductStock.preorder,
      images: ['https://picsum.photos/200/']
    },
    {
      name: 'Garuda Kacang Kulit',
      description: 'Kacang goreng kulit khas GarudaFood.',
      price: 7000,
      stock: ProductStock.ready,
      images: ['https://picsum.photos/200']
    },
    {
      name: 'Indomilk Susu Putih',
      description: 'Susu putih dengan kandungan kalsium tinggi.',
      price: 5500,
      stock: ProductStock.preorder,
      images: ['https://picsum.photos/200']
    }
  ]

  // Create products with explicit type casting if needed
  for (const product of sampleProducts) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: BigInt(product.price),
        stock: product.stock,
        images: product.images,
        brand_id: brandList[Math.floor(Math.random() * brandList.length)].id,
        category_id:
          categoryList[Math.floor(Math.random() * categoryList.length)].id,
        location_id:
          locationList[Math.floor(Math.random() * locationList.length)].id
      }
    })
  }

  console.log('✅ Seeding complete')
}

main()
  .catch(e => {
    console.error('❌ Error while seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
