const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'Tecnología' },
        { name: 'Sistemas' },
        { name: 'Contaduria' },
        { name: 'Administración' },
        { name: 'Derecho' },
        { name: 'Ciencias' },
        { name: 'Ingeniería' },
        { name: 'Medicina' },
      ],
    });
    console.log('Categorías creadas correctamente');
  } catch (error) {
    console.log('Error al inicializar las categorías de la base de datos');
  } finally {
    await database.$disconnect();
  }
}

main();
