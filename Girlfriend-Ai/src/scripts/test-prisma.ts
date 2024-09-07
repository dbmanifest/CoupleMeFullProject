import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Fetching styles from database...')
    const styles = await prisma.style.findMany()
    console.log('Styles found:', styles)
    
    if (styles.length === 0) {
      console.log('No styles found in the database.')
    } else {
      console.log(`Found ${styles.length} style(s).`)
    }
  } catch (error) {
    console.error('Error fetching styles:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })